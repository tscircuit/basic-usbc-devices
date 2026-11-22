// CH552E, 24 MHz internal. P1.4 drives the AC-coupled passive piezo, P1.5 sinks the LED.
#include "src/userUsbCdc/USBCDC.h"
#include "frame.h"
#include <string.h>

extern __xdata volatile uint8_t UsbConfig;
static __xdata char line[40];
static uint8_t used;
static bool discard;
static uint32_t started, lastByte;
static uint16_t duration;

static void stopTimer(void) {
  ET2 = 0;
  TR2 = 0;
  TF2 = 0;
}

static void armDuration(uint16_t ms) {
  stopTimer();
  started = millis();
  duration = ms;
  P1_4 = ms != 0;
}

// Timer 2 auto-reloads at F_CPU/12. Each interrupt is one half period.
static void squareWave(uint16_t hz, uint16_t ms) {
  uint16_t reload = 0 - (uint16_t)((F_CPU / 24UL + hz / 2) / hz);
  armDuration(ms);
  T2CON = 0;
  T2MOD &= ~bT2_CLK;
  RCAP2H = TH2 = reload >> 8;
  RCAP2L = TL2 = reload & 0xff;
  ET2 = 1;
  TR2 = 1;
}

static void beep(uint16_t ms) {
  if (ms) squareWave(4000, ms);
  else armDuration(0);
}

static bool number(const char *text, uint16_t *value) {
  uint16_t n = 0;
  if (!*text) return false;
  while (*text) {
    if (*text < '0' || *text > '9' || n > 1000) return false;
    n = n * 10 + (*text++ - '0');
  }
  *value = n;
  return n <= 10000;
}

static void reply(const char *message) {
  while (*message) USBSerial_write(*message++);
  USBSerial_write('\r');
  USBSerial_write('\n');
  USBSerial_flush();
}

static void command(void) {
  uint16_t ms = 0;
  uint16_t hz;
  char *arg;
  if (!strcmp(line, "id")) reply("DEVICE tscircuit buzzer 2.0.0");
  else if (!strcmp(line, "help") || !strcmp(line, "?"))
    reply("id | help | beep [0-10000 ms, default 250] | tone <20-4000 Hz> <1-10000 ms> | stop | status | led on | led off");
  else if (!strcmp(line, "status")) reply(duration ? "STATUS buzzing" : "STATUS idle");
  else if (!strcmp(line, "led on") || !strcmp(line, "led off")) {
    P1_5 = !strcmp(line, "led off");
    reply("OK");
  } else if (!strcmp(line, "stop") || !strcmp(line, "beep")) {
    beep(line[0] == 's' ? 0 : 250);
    reply("OK");
  } else if (!strncmp(line, "beep ", 5) && line[5]) {
    if (!number(line + 5, &ms)) reply("ERR duration must be 0-10000 ms");
    else { beep(ms); reply("OK"); }
  } else if (!strncmp(line, "tone ", 5)) {
    arg = strchr(line + 5, ' ');
    if (arg) *arg++ = 0;
    if (!arg || !number(line + 5, &hz) || hz < 20 || hz > 4000 ||
        !number(arg, &ms) || ms == 0) reply("ERR tone <20-4000 Hz> <1-10000 ms>");
    else { squareWave(hz, ms); reply("OK"); }
  } else reply("ERR unknown command; try help");
}

static void receive(uint8_t b) {
  if (state || b == 0xa5) {
    used = 0;
    discard = false;
    uint8_t result = frame_byte(b);
    if (!result) return;
    uint8_t status = result == 1 ? 4 : result;
    if (result == 1 && opcode == 0x10 && length == 2) {
      uint16_t ms = payload[0] | ((uint16_t)payload[1] << 8);
      if (ms <= 10000) { beep(ms); status = 0; }
    }
    if (result == 1 && opcode == 0x20 && length == 1 && payload[0] <= 1) {
      P1_5 = !payload[0];
      status = 0;
    }
    USBSerial_write(0xac);
    USBSerial_write(sequence);
    USBSerial_write(status);
    USBSerial_flush();
  } else if (b == '\n' || b == '\r') {
    if (discard) reply("ERR invalid or long line");
    else if (used) { line[used] = 0; command(); }
    used = 0;
    discard = false;
  } else if (b < 32 || b > 126 || used >= sizeof(line) - 1) discard = true;
  else if (!discard) line[used++] = b;
}

void setup() {
  P1_5 = 1;
  pinMode(15, OUTPUT);
  P1_4 = 0;
  pinMode(14, OUTPUT);
  USBInit();
}

void loop() {
  if (!UsbConfig || (USB_MIS_ST & bUMS_SUSPEND)) {
    P1_5 = 1;
    stopTimer();
    P1_4 = 0;
    duration = 0;
    used = 0;
    discard = false;
    frame_reset();
    if (USB_MIS_ST & bUMS_SUSPEND) {
      SAFE_MOD = 0x55; SAFE_MOD = 0xaa; WAKE_CTRL = bWAK_BY_USB; SAFE_MOD = 0;
      if (USB_MIS_ST & bUMS_SUSPEND) PCON |= PD;
      SAFE_MOD = 0x55; SAFE_MOD = 0xaa; WAKE_CTRL = 0; SAFE_MOD = 0;
    }
    return;
  }
  if (duration && (uint32_t)(millis() - started) >= duration) beep(0);
  if (state && (uint32_t)(millis() - lastByte) > 250) frame_reset();
  if (USBSerial_available()) {
    lastByte = millis();
    receive((uint8_t)USBSerial_read());
  }
}
