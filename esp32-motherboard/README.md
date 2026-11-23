# ESP32-S3 Wi-Fi USB Motherboard

The ESP32-S3-WROOM-1U-N16R8 hosts four downstream USB-C sockets through the onboard hub. It has 16 MiB flash, 8 MiB octal PSRAM and an external antenna connector. The PCB is 76 × 46 × 1.6 mm. Four Ø2.2 mm M2 holes sit on a 70 × 40 mm grid. All assembled parts are on top. The front edge carries J1 (console and ROM programming), the projecting power lever and the microSD slot.

Connect a 50 Ω, 2.4 GHz external antenna before using the radio. Espressif specifies a U.FL or MHF I mating plug and recommends a maximum gain of 2.33 dBi. Its reference antenna is TFPD05H08750011. The antenna and cable are separate enclosure parts. Supply regulated 5 V at TP_PWR1 and ground at TP_PWR2. Allow 1.5 A at the product input for simultaneous radio, SD and peripheral operation. Budget 100 mA per downstream port. J1 supplies the console interface separately. [Espressif module datasheet, sections 3 and 10](https://documentation.espressif.com/esp32-s3-wroom-1_wroom-1u_datasheet_en.pdf)

| Function | Connection |
| --- | --- |
| USB host | GPIO19 D−, GPIO20 D+ to the hub upstream pair |
| J1 console and ROM loader | UART0 on GPIO43 TX and GPIO44 RX at 115200 baud |
| ROM download | Hold BOOT (GPIO0), tap RESET (EN), then release BOOT |
| microSD on SPI2 | GPIO10 CS, GPIO11 MOSI, GPIO12 SCK, GPIO13 MISO |
| Processor rail | AP63203 fixed 3.3 V buck supplied from switched 5 V |

## Build and verify the PCB

```sh
bun install
bun run build:esp32-motherboard
python3 -m pip install -r requirements-routing.txt
python3 verify-module-copper.py --check-shorts --directory dist/esp32-motherboard esp32-motherboard
python3 motherboard/verify-gerbers.py esp32-motherboard
```

The inner ground plane is on layer 2. The checked route is stored in `esp32-motherboard/copper.json`. The board build runs native DRC, package-pin checks and mechanical assertions on the shared front panel. The separate film check reads the plotted copper and drill data back and compares it with the source netlist.

## Build the firmware

In an ESP-IDF v5.5.1 shell, run the following commands. Select the J1 serial port and enter ROM download mode before flashing. Tap RESET after flashing.

```sh
cd firmware/esp32-motherboard
idf.py set-target esp32s3
idf.py build
idf.py -p PORT flash monitor
```

The sample starts the USB host and external hub driver, checks a FAT microSD card on demand and can scan or join a Wi-Fi network. Its `devices` command lists USB addresses including the hub. Add a USB class driver to exchange application data with a particular peripheral. The ESP32-S3 has eight host channels. The endpoint requirements of attached devices determine how many can transfer at once. [USB host documentation](https://docs.espressif.com/projects/esp-idf/en/v5.5.1/esp32s3/api-reference/peripherals/usb_host.html)

[Console commands, enclosure drawing and downloads](https://devices.tscircuit.com/docs/esp32-motherboard/)
