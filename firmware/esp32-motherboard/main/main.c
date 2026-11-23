#include "driver/sdspi_host.h"
#include "driver/uart.h"
#include "esp_event.h"
#include "esp_netif.h"
#include "esp_vfs_fat.h"
#include "esp_wifi.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "nvs_flash.h"
#include "usb/usb_host.h"
#include <stdio.h>
#include <string.h>

static esp_netif_t *station;
static void usb_events(void *unused) {
  for (;;) {
    uint32_t events;
    ESP_ERROR_CHECK(usb_host_lib_handle_events(portMAX_DELAY, &events));
  }
}

static void list_devices(void) {
  uint8_t addresses[8];
  int count = 0;
  esp_err_t err =
      usb_host_device_addr_list_fill(sizeof(addresses), addresses, &count);
  if (err != ESP_OK) {
    printf("ERR usb %s\n", esp_err_to_name(err));
    return;
  }
  for (int i = 0; i < count; ++i)
    printf("USB %u\n", addresses[i]);
  puts("OK");
}

static void check_sd(void) {
  sdmmc_host_t host = SDSPI_HOST_DEFAULT();
  spi_bus_config_t bus = {.mosi_io_num = 11,
                          .miso_io_num = 13,
                          .sclk_io_num = 12,
                          .quadwp_io_num = -1,
                          .quadhd_io_num = -1};
  esp_err_t err = spi_bus_initialize(host.slot, &bus, SDSPI_DEFAULT_DMA);
  if (err != ESP_OK) {
    printf("ERR sd %s\n", esp_err_to_name(err));
    return;
  }
  sdspi_device_config_t slot = SDSPI_DEVICE_CONFIG_DEFAULT();
  slot.gpio_cs = 10;
  slot.host_id = host.slot;
  esp_vfs_fat_sdmmc_mount_config_t mount = {.format_if_mount_failed = false,
                                            .max_files = 2};
  sdmmc_card_t *card;
  err = esp_vfs_fat_sdspi_mount("/sd", &host, &slot, &mount, &card);
  if (err == ESP_OK) {
    printf("SD %llu MiB\n", (unsigned long long)card->csd.capacity *
                                card->csd.sector_size / 1048576);
    esp_vfs_fat_sdcard_unmount("/sd", card);
  } else
    printf("ERR sd %s\n", esp_err_to_name(err));
  spi_bus_free(host.slot);
}

static void scan_wifi(void) {
  wifi_ap_record_t records[12];
  uint16_t count = sizeof(records) / sizeof(records[0]);
  esp_err_t err = esp_wifi_scan_start(NULL, true);
  if (err == ESP_OK)
    err = esp_wifi_scan_get_ap_records(&count, records);
  if (err != ESP_OK) {
    printf("ERR wifi %s\n", esp_err_to_name(err));
    return;
  }
  for (int i = 0; i < count; ++i) {
    char *name = (char *)records[i].ssid;
    for (size_t n = 0; n < 32 && name[n]; ++n)
      if ((unsigned char)name[n] < 32 || name[n] == 127)
        name[n] = '?';
    printf("AP %d %.32s\n", records[i].rssi, name);
  }
  puts("OK");
}

static void join_wifi(char *args) {
  char *password = strchr(args, '\t');
  if (!password) {
    puts("ERR wifi expected SSID, tab, password");
    return;
  }
  *password++ = 0;
  size_t ssid_len = strlen(args), pass_len = strlen(password);
  if (!ssid_len || ssid_len > 32 || pass_len < 8 || pass_len > 63) {
    puts("ERR wifi invalid SSID or passphrase length");
    return;
  }
  wifi_config_t config = {.sta.threshold.authmode = WIFI_AUTH_WPA2_PSK};
  memcpy(config.sta.ssid, args, ssid_len);
  memcpy(config.sta.password, password, pass_len);
  esp_wifi_disconnect();
  esp_err_t err = esp_wifi_set_config(WIFI_IF_STA, &config);
  explicit_bzero(&config, sizeof(config));
  if (err == ESP_OK)
    err = esp_wifi_connect();
  if (err == ESP_OK)
    puts("OK connecting");
  else
    printf("ERR wifi %s\n", esp_err_to_name(err));
}

static void command(char *line) {
  if (!strcmp(line, "id"))
    puts("DEVICE tscircuit esp32-motherboard 1.0.0");
  else if (!strcmp(line, "help"))
    puts("id | help | devices | sd | wifi scan | wifi join "
         "<ssid><TAB><passphrase> | wifi status | wifi leave");
  else if (!strcmp(line, "devices"))
    list_devices();
  else if (!strcmp(line, "sd"))
    check_sd();
  else if (!strcmp(line, "wifi scan"))
    scan_wifi();
  else if (!strncmp(line, "wifi join ", 10))
    join_wifi(line + 10);
  else if (!strcmp(line, "wifi status")) {
    wifi_ap_record_t ap;
    esp_netif_ip_info_t ip;
    if (esp_wifi_sta_get_ap_info(&ap) != ESP_OK)
      puts("WIFI disconnected");
    else if (esp_netif_get_ip_info(station, &ip) == ESP_OK && ip.ip.addr)
      printf("WIFI connected " IPSTR "\n", IP2STR(&ip.ip));
    else
      puts("WIFI waiting for DHCP");
  } else if (!strcmp(line, "wifi leave")) {
    esp_wifi_disconnect();
    wifi_config_t empty = {0};
    esp_err_t err = esp_wifi_set_config(WIFI_IF_STA, &empty);
    if (err == ESP_OK)
      puts("OK");
    else
      printf("ERR wifi %s\n", esp_err_to_name(err));
  } else
    puts("ERR unknown command");
}

void app_main(void) {
  setvbuf(stdout, NULL, _IONBF, 0);
  ESP_ERROR_CHECK(nvs_flash_init());
  ESP_ERROR_CHECK(esp_netif_init());
  ESP_ERROR_CHECK(esp_event_loop_create_default());
  station = esp_netif_create_default_wifi_sta();
  wifi_init_config_t init = WIFI_INIT_CONFIG_DEFAULT();
  ESP_ERROR_CHECK(esp_wifi_init(&init));
  ESP_ERROR_CHECK(esp_wifi_set_storage(WIFI_STORAGE_RAM));
  ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
  ESP_ERROR_CHECK(esp_wifi_start());
  usb_host_config_t usb = {.intr_flags = ESP_INTR_FLAG_LEVEL1};
  ESP_ERROR_CHECK(usb_host_install(&usb));
  if (xTaskCreate(usb_events, "usb_host", 4096, NULL, 5, NULL) != pdPASS)
    abort();
  ESP_ERROR_CHECK(uart_driver_install(UART_NUM_0, 512, 0, 0, NULL, 0));
  char line[128];
  size_t len = 0;
  bool overflow = false;
  for (;;) {
    uint8_t ch;
    if (uart_read_bytes(UART_NUM_0, &ch, 1, portMAX_DELAY) != 1 || ch == '\r')
      continue;
    if (ch == '\n') {
      line[len] = 0;
      if (overflow)
        puts("ERR line too long");
      else if (len)
        command(line);
      explicit_bzero(line, sizeof(line));
      len = 0;
      overflow = false;
    } else if (len + 1 < sizeof(line))
      line[len++] = (char)ch;
    else
      overflow = true;
  }
}
