# USB display and buzzer

Both are CDC serial devices. Flash the included HEX with the WCH CH55x USB bootloader (for example `wchisp flash firmware/build-display/display.ino.hex`). Bridge TP1–TP2 while plugging in, release the bridge, then flash. This pulls D+ high through 10 kΩ; do not ground D+. The CH552T display uses **16 MHz at 3.3 V**; the CH552E buzzer uses **24 MHz at 5 V**. Use CH55xDuino 0.0.26 and `usb_settings=user148`, not its default CDC implementation, to retain the included 100 mA USB descriptor.

`firmware/build-output-modules.sh` builds both sketches after installing that Arduino core. `ARDUINO_CLI` may select an alternate CLI path. The USB CDC code is the CH55xDuino CDCinUserCode example by Deqing Sun (public-domain example); the bundled files retain its attribution. Framing and application logic are new. The shared frame parser is exercised by native C tests in `host/test_usb_output.py`.

## Display

Connect the **non-touch BuyDisplay ER-TFT035IPS-6** bare panel to the 50-pin, 0.5 mm, 0.3 mm-thick top-contact FPC connector with power unplugged. Pin 1 is LEDA. This is the connector and 8080 8-bit pinout from [abse/gameboy-advance 0.0.45](https://tscircuit.com/abse/gameboy-advance). It is not a native GBA LCD connector. The LCD is purchased separately, outside JLCPCB assembly.

The computer supplies RGB565 pixels over USB CDC; the MCU writes them directly into the ILI9488's display RAM. There is no frame buffer in the CH552. The included host client uses 480×320 landscape mode. Run `python host/display.py PORT` for color bars or `python host/display.py PORT image.png` for an image. Pillow is needed only for images. This is a script-controlled display, not a plug-and-play operating-system monitor or a gaming-rate video adapter. Throughput has not been measured on hardware.

Firmware starts with backlight off and LCD reset asserted. The host initializes the panel before enabling the backlight. On USB reset/deconfiguration, backlight turns off; on USB suspend it also sends display-off/sleep-in and puts the MCU into power-down with USB wake enabled. Reinitialize after resume. The hardware 100 Ω, 1% backlight resistor intentionally reduces brightness: nominal 5 V and 3.0–3.2 V LED Vf give 18–20 mA; even the conservative 5.25 V / 99 Ω bound is 53.1 mA. Budget 40 mA for controller/LCD logic/regulator, leaving the design below one 100 mA hub unit load. That allocation and suspend current require bench validation; full-rated 120 mA backlight brightness is not supported by this hub-powered design.

## Buzzer

The onboard INGHAi GSD9605YB-5V2800 is a 5 V, 30 mA active magnetic buzzer. A MOSFET and flyback diode switch it; the MCU does not supply the coil current. Run `python host/buzzer.py PORT --ms 250`. A duration of zero stops it; accepted duration is 0–10000 ms. Timing runs on the MCU, so closing the host program cannot leave a timed beep running indefinitely. USB reset/deconfiguration and suspend turn it off. Its pitch is fixed at approximately 2.8 kHz. This is the requested buzzer; the speaker module was omitted.

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
