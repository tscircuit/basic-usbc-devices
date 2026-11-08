# USB rotary dial firmware

Both dial boards require programming, using separate firmware builds. The other four boards use fixed-function USB bridge chips.

`dial/dial.ino` targets CH552E with CH55xDuino 0.0.26, 24 MHz internal oscillator, USB CDC, P3.6 bootloader entry. The compiled `build/dial.ino.hex` is included. Build with:

```
arduino-cli compile --fqbn CH55xDuino:mcs51:ch552:clock=24internal,usb_settings=usbcdc,bootloader_pin=p36 --output-dir firmware/build firmware/dial
```

Install CH55xDuino using its official board index:
https://raw.githubusercontent.com/DeqingSun/ch55xduino/ch55xduino/package_ch55xduino_mcs51_index.json

For initial programming, bridge TP1–TP2 while plugging in USB (this pulls D+ high through 10 kΩ), then remove the bridge. Upload the HEX using the CH55xDuino uploader / WCH ISP bootloader tools. Replug normally afterward. Do not short either pad to ground. JLCPCB does not automatically program this board from the BOM; provide the HEX to a compatible programming service or flash it yourself.

The encoder reports newline-delimited JSON at up to 50 Hz and a 250 ms heartbeat. `count` is an unsigned 32-bit cumulative detent count, wrapping in both directions; use `host/dial.py` for signed deltas. `pressed` is the encoder's push switch. `invalid` counts illegal quadrature transitions modulo 65536. `uptime_ms` supports reset detection. Position is relative and resets at power-up; it is not an absolute angular measurement.

A 4 kHz Timer2 interrupt counts encoder transitions independently of USB transfers. The EC11E15244B2 has 30 detents / 15 pulses per revolution (two quadrature transitions per detent). Push debounce is 20 ms. Check direction, actual debounce performance, USB enumeration, and missed-step behavior on an assembled sample; firmware compilation is not a hardware test.

## Absolute-position dial

Flash `build-position/position.ino.hex` on the potentiometer board. Source is `position/position.ino`; use the same FQBN above, replacing the sketch/output paths. TP1–TP2 bootloader entry is the same on both boards. Do not interchange the two firmware images.

The fixed-range dial reads P1.4 with the CH552E 8-bit ADC (0–255), referenced to the same VCC used across the 10 kΩ potentiometer. Eight samples are averaged at 2 ms intervals; reports carry `module: "position"`, `raw`, `max: 255`, and `uptime_ms`. Heartbeat is 250 ms. No position counter is stored: the physical potentiometer supplies the absolute reading at every startup. Host endpoint calibration maps this to 0–1; mechanical travel is nominally 280°. ADC quantization, potentiometer linearity and end travel limit angular accuracy. This board has no encoder push switch.
