#include <stdio.h>
#include "ff.h"
#include "hw_config.h"
#include "pico/multicore.h"
#include "storage.h"

static spi_t bus = {
    .hw_inst = spi0, .miso_gpio = 4, .sck_gpio = 6, .mosi_gpio = 7,
    .baud_rate = 12000000,
};
static sd_spi_if_t interface = { .spi = &bus, .ss_gpio = 5 };
static sd_card_t card = { .type = SD_IF_SPI, .spi_if_p = &interface };
static FATFS volume;
static bool pending;

size_t sd_get_num(void) { return 1; }
sd_card_t *sd_get_by_num(size_t index) { return index == 0 ? &card : NULL; }

// Mount on demand. A missing or slow card must not stall USB host polling.
static void storage_worker(void) {
    for (;;) {
        multicore_fifo_pop_blocking();
        FRESULT rc = f_mount(&volume, "0:", 1);
        unsigned type = rc == FR_OK ? volume.fs_type : 0;
        f_mount(NULL, "0:", 0);
        // Each request probes the current card, including a card swapped since the last mount.
        card.state.m_Status |= STA_NOINIT;
        multicore_fifo_push_blocking(((unsigned)rc << 8) | type);
    }
}
void storage_init(void) { multicore_launch_core1(storage_worker); }

void storage_request(void) {
    if (pending) {
        puts("ERR sd busy");
        return;
    }
    pending = true;
    multicore_fifo_push_blocking(1);
}

void storage_poll(void) {
    if (!pending || !multicore_fifo_rvalid()) return;
    unsigned result = multicore_fifo_pop_blocking();
    pending = false;
    unsigned error = result >> 8;
    if (error) {
        printf("ERR sd %u\n", error);
        return;
    }
    static const char *const formats[] = {"unknown", "FAT12", "FAT16", "FAT32", "exFAT"};
    unsigned type = result & 0xff;
    printf("SD %s\n", type < sizeof(formats)/sizeof(formats[0]) ? formats[type] : "unknown");
}
