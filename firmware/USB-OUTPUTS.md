# USB display and buzzer

Both are CDC serial devices. Flash the included HEX with the WCH CH55x USB bootloader (for example `wchisp flash firmware/build-display/display.ino.hex`). Bridge TP1–TP2 while plugging in, release the bridge, then flash. This pulls D+ high through 10 kΩ; do not ground D+. The CH552T display uses **16 MHz at 3.3 V**; the CH552E buzzer uses **24 MHz at 5 V**. Use CH55xDuino 0.0.26 and `usb_settings=user148`, not its default CDC implementation, to retain the included 100 mA USB descriptor.

`firmware/build-output-modules.sh` builds both sketches after installing that Arduino core. `ARDUINO_CLI` may select an alternate CLI path. The USB CDC code is the CH55xDuino CDCinUserCode example by Deqing Sun (public-domain example); the bundled files retain its attribution. Framing and application logic are new. The shared frame parser is exercised by native C tests in `host/test_usb_output.py`.

## Display

Connect the **non-touch BuyDisplay ER-TFT035IPS-6** bare panel to the 50-pin, 0.5 mm, 0.3 mm-thick top-contact FPC connector with power unplugged. Pin 1 is LEDA. This is the connector and 8080 8-bit pinout from [abse/gameboy-advance 0.0.45](https://tscircuit.com/abse/gameboy-advance). It is not a native GBA LCD connector. The LCD is purchased separately, outside JLCPCB assembly.

The computer supplies RGB565 pixels over USB CDC; the MCU writes them directly into the ILI9488's display RAM. There is no frame buffer in the CH552. The included host client uses 480×320 landscape mode. Run `python host/display.py PORT` for color bars or `python host/display.py PORT image.png` for an image. Pillow is needed only for images. This is a script-controlled display, not a plug-and-play operating-system monitor or a gaming-rate video adapter. Throughput has not been measured on hardware.

Firmware starts with backlight off and LCD reset asserted. The host initializes the panel before enabling the backlight. On USB reset/deconfiguration, backlight turns off; on USB suspend it also sends display-off/sleep-in and puts the MCU into power-down with USB wake enabled. Reinitialize after resume. The hardware 100 Ω, 1% backlight resistor intentionally reduces brightness: nominal 5 V and 3.0–3.2 V LED Vf give 18–20 mA; even the conservative 5.25 V / 99 Ω bound is 53.1 mA. Budget 40 mA for controller/LCD logic/regulator, leaving the design below one 100 mA hub unit load. That allocation and suspend current require bench validation; full-rated 120 mA backlight brightness is not supported by this hub-powered design.

## Buzzer

Revision 2 uses the externally driven Murata PKLCS1212E4001-R1. P1.4 drives the piezo through 2 kΩ and a 1 µF DC-blocking capacitor. A 10 kΩ resistor discharges the sounder. Firmware 2.0.0 plays a 4 kHz tone for `beep` and accepts `tone <20–4000 Hz> <1–10000 ms>`. `stop`, USB suspend and disconnect clear the timer and drive output low. The framed duration command remains available. Older assembled boards use the 1.x firmware.

## Protocol

Each request is `A5 5A opcode sequence length payload CRC8`. Payload length is 0–48 bytes. CRC-8 polynomial 0x07, initial zero, covers opcode through payload, excluding the sync bytes. A command executes only after CRC validation. A partial frame expires after 250 ms. Reply is `AC sequence status`: 0 success, 2 CRC error, 3 oversize, 4 invalid command, 5 display requires reset/init.

| Device | Opcode | Payload |
|---|---|---|
| Display | 01 | none: hardware reset; wait 170 ms |
| Display | 02 | ILI9488 command byte, then zero or more parameters |
| Display | 03 | raw data bytes, RGB565 high byte first after RAMWR |
| Display | 04 | 00 off / 01 on backlight |
| Buzzer | 10 | unsigned little-endian duration in milliseconds |

A failed or missing acknowledgement stops the host client; it does not blindly retransmit writes that might already have executed. Reconnect/reinitialize after a transport failure. USB VID/PID is the CH55xDuino development identity; select the serial port explicitly. Validate hardware, FPC mating orientation, LED current, and USB suspend/resume before production.
