// Standalone example: a dial selects three drawings on all attached flex displays.
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "pico/stdlib.h"
#include "pico/stdio_uart.h"
#include "tusb.h"

enum role { probing, potentiometer, display, other };
enum transfer { idle, waiting_init, waiting_ready, pixels, waiting_frame, failed };
struct port {
    enum role role;
    enum transfer stage;
    char line[128], name[32];
    unsigned used;
    bool overflow;
    int visible, sending;
    unsigned offset;
    uint32_t deadline;
};
static struct port ports[CFG_TUH_CDC];
static int desired = -1;
static uint32_t now_ms(void) { return to_ms_since_boot(get_absolute_time()); }

uint32_t tusb_time_millis_api(void) { return now_ms(); }

static bool send_line(uint8_t i, const char *line) {
    size_t n = strlen(line);
    if (tuh_cdc_write_available(i) < n) return false;
    if (tuh_cdc_write(i, line, n) != n) return false;
    tuh_cdc_write_flush(i);
    return true;
}

static uint16_t artwork(int scene, unsigned x, unsigned y) {
    // White circle, rising diagonal, or checkerboard on contrasting backgrounds.
    if (scene == 0) {
        int dx = (int)x - 240, dy = (int)y - 160;
        return dx*dx + dy*dy < 95*95 ? 0xffff : 0x0353;
    }
    if (scene == 1) return abs(3*(int)y + 2*(int)x - 960) < 70 ? 0xffe0 : 0x780c;
    return ((x / 40 + y / 40) & 1) ? 0x07b0 : 0x19a5;
}

static void feedback(uint8_t i, char *line) {
    struct port *p = &ports[i];
    if (p->role == probing && sscanf(line,"DEVICE tscircuit %31s",p->name) == 1) {
        p->role = !strcmp(p->name,"display") ? display :
                  !strcmp(p->name,"potentiometer") ? potentiometer : other;
        return;
    }
    if (p->role == potentiometer) {
        const char *pos = strstr(line,"\"raw\":");
        if (!pos || !strstr(line,"\"module\":\"position\"")) return;
        char *end;
        long v = strtol(pos+6,&end,10);
        if (end == pos+6 || (*end != ',' && *end != '}') || v<0 || v>255) return;
        if (desired < 0) desired = v / 85 > 2 ? 2 : v / 85;
        while (desired < 2 && v >= (desired+1)*85 + 3) ++desired;
        while (desired > 0 && v < desired*85 - 3) --desired;
    }
    if (p->role != display) return;
    if (p->stage == waiting_init && !strcmp(line,"OK init")) p->stage = idle;
    else if (p->stage == waiting_ready && !strcmp(line,"READY")) {
        p->stage = pixels; p->offset = 0; p->deadline = now_ms()+10000;
    } else if (p->stage == waiting_frame && !strcmp(line,"OK frame")) {
        p->visible = p->sending; p->stage = idle;
    } else if (!strncmp(line,"ERR",3)) p->stage = failed;
}

void tuh_cdc_mount_cb(uint8_t i) {
    ports[i] = (struct port){.visible=-1};
}
void tuh_cdc_umount_cb(uint8_t i) {
    if (ports[i].role == potentiometer) desired = -1;
    ports[i] = (struct port){.visible=-1};
}
static void service_port(uint8_t i) {
    struct port *p = &ports[i];
    uint8_t buf[256];
    unsigned n = tuh_cdc_read(i,buf,sizeof(buf));
    for (unsigned k=0;k<n;k++) {
        if (buf[k]=='\n') {
            p->line[p->used]=0;
            if (!p->overflow) feedback(i,p->line);
            p->used=0; p->overflow=false;
        } else if (buf[k]!='\r') {
            if (p->used+1<sizeof(p->line)) p->line[p->used++]=buf[k];
            else p->overflow=true;
        }
    }
    uint32_t now=now_ms();
    if (p->role==probing) {
        if ((!p->deadline || (int32_t)(now-p->deadline)>=0) && send_line(i,"id\n")) p->deadline=now+1000;
        return;
    }
    if (p->role!=display || p->stage==failed) return;
    // -2 marks a display which has accepted its init command.
    if (p->stage==idle && p->visible==-1 && send_line(i,"init\n")) {
        p->visible=-2; p->stage=waiting_init; p->deadline=now+10000;
    } else if (p->stage==idle && desired>=0 && p->visible!=desired && send_line(i,"image\n")) {
        p->sending=desired; p->stage=waiting_ready; p->deadline=now+10000;
    } else if (p->stage==pixels) {
        const unsigned bytes=480u*320u*2u;
        unsigned count=tuh_cdc_write_available(i);
        if (count>sizeof(buf)) count=sizeof(buf);
        if (count>bytes-p->offset) count=bytes-p->offset;
        for (unsigned k=0;k<count;k++) {
            unsigned off=p->offset+k, pixel=off/2;
            uint16_t rgb=artwork(p->sending,pixel%480,pixel/480);
            buf[k]=off%2 ? (uint8_t)rgb : (uint8_t)(rgb>>8);
        }
        if (count) {
            unsigned sent=tuh_cdc_write(i,buf,count);
            if (sent) { p->offset+=sent; tuh_cdc_write_flush(i); p->deadline=now+10000; }
        }
        if (p->offset==bytes) p->stage=waiting_frame;
    }
    // Recover by unplugging the display so an incomplete pixel payload is discarded.
    if (p->stage!=idle && (int32_t)(now-p->deadline)>=0) p->stage=failed;
}

static void console_task(void) {
    static char cmd[48];
    static unsigned used;
    static bool overflow;
    int ch=getchar_timeout_us(0);
    if (ch<0 || ch=='\r') return;
    if (ch!='\n') {
        if (used+1<sizeof(cmd)) cmd[used++]=ch;
        else overflow=true;
        return;
    }
    cmd[used]=0;
    if (overflow) puts("ERR command too long");
    else if (!strcmp(cmd,"id")) puts("DEVICE tscircuit motherboard 1.0.0");
    else if (!strcmp(cmd,"help")) puts("id | help | devices | status");
    else if (!strcmp(cmd,"devices")) {
        for (unsigned i=0;i<CFG_TUH_CDC;i++) if (tuh_cdc_mounted(i))
            printf("PORT %u %s%s\n",i+1,ports[i].name[0]?ports[i].name:"identifying",
                   ports[i].stage==failed?" (reconnect display)":"");
        puts("OK");
    } else if (!strcmp(cmd,"status")) printf("SCENE %d\n",desired+1);
    else puts("ERR unknown command");
    used=0; overflow=false;
}

int main(void) {
    stdio_uart_init_full(uart0,115200,0,1);
    tuh_init(0);
    while (true) {
        tuh_task();
        for (uint8_t i=0;i<CFG_TUH_CDC;i++) if (tuh_cdc_mounted(i)) service_port(i);
        console_task();
    }
}
