# Embedded USB motherboard

A 46 × 46 mm, four-layer controller for an enclosure. The upper edge carries four downstream USB-C sockets. The lower edge carries the computer service socket. Allow clearance beneath the PCB for the castellated, bottom-mounted RP2350 Stamp and access to the power wires. Four M2 clearance holes are centered at (±20, ±5) mm relative to board center.

## Integration

- Supply regulated 5 V and ground at the two underside power pads. Budget 1 A at the input for the controller, hub, four 100 mA peripherals and startup margin. The computer port powers its USB-to-UART interface independently. A dual-supply translator isolates the UART when either rail is off.
- The processor's native USB D+/D− connect to the hub upstream pins. Each downstream port has attachment detection, a current-limited power switch and data-line ESD protection. The hub reports faults as a group. Program the hub status EEPROM with the existing firmware/hub/ch334f-status.bin if using the configurable indicator.
- Fit the 16 MB Solder Party RP2350 Stamp separately on the underside. Align its pin 1 to the footprint mark. The manual-assembly CSV is separate from the machine BOM/CPL. The Stamp includes the processor, flash, clock, regulator and USB series termination. [Module and schematic](https://www.solder.party/docs/rp2xxx-stamp-related/rp2350-stamp/downloads/) · [Land pattern](https://github.com/solderparty/rp2xxx_stamp_footprints/tree/7676fac43f12f672d9faf6230b40fd48681d7bda/KiCad)
- Flash the compiled ELF through the four labeled SWD pads with product power applied. The pads in order are 3.3 V reference, SWDIO, SWCLK and ground. The computer socket provides a 115200-baud runtime console on GPIO0/TX and GPIO1/RX.

## Standalone program

The native example in `firmware/motherboard/main.c` identifies CDC devices by sending `id`. A USB potentiometer selects one of three built-in 480 × 320 drawings. A three-count deadband stabilizes each transition. The host coalesces knob changes during a frame and initializes a reconnected display. Edit `artwork()` to change the graphics. Rebuild with Pico SDK 2.3.1 and a CMake-supported Arm compiler.

```sh
cmake -S firmware/motherboard -B dist/host-fw -DPICO_NO_PICOTOOL=1
cmake --build dist/host-fw
```

| Console command | Reply |
| --- | --- |
| `id` | `DEVICE tscircuit motherboard 1.0.0` |
| `help` | Supported commands |
| `devices` | Connected serial device types and interface slots, followed by `OK` |
| `status` | `SCENE 1` through `SCENE 3`, or `SCENE 0` while waiting for a knob |

## Rebuild and check

```sh
bun motherboard/build.tsx
python3 verify-module-copper.py --check-shorts --directory dist/motherboard motherboard
bun motherboard/export.ts
```

Check first-article power-up, host enumeration, hot-plug recovery, per-port fault handling and USB signal quality before embedding the board in a product. Prototype routing has been checked for physical continuity and shorts. USB eye diagrams and enclosure fit require hardware.
