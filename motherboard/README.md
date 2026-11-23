# RP2350 USB Motherboard

A 76 × 46 mm, four-layer controller for an enclosure. The upper edge carries four downstream USB-C sockets. The front edge carries the computer console, power switch and microSD opening, in that order from left to right when viewed from above with the four downstream sockets at the back. The RP2350A is soldered directly to the board in a 7 × 7 mm QFN-60 package. Leave room for the power harness at the underside pads. Four M2 clearance holes are on a 70 × 40 mm grid, at X = ±35 mm, Y = ±20 mm from board center.

## Integration

- Supply regulated 5 V and ground at the two underside power pads. The edge-facing OFF/ON slider on the J1 edge enables a TPS22918 load switch between input power and the processor, hub and four device supplies. Its contacts only carry the enable signal. Budget 1 A at the input for the controller, hub, four 100 mA peripherals and startup margin. The computer port powers its USB-to-UART interface independently. A dual-supply translator isolates the UART when either rail is off.
- U_CPU uses the RP2350A internal core buck with an external 3.3 µH inductor, a dedicated 3.3 V regulator, a 12 MHz crystal and 16 MiB of external QSPI flash. The exposed ground pad uses nine 0.25 mm plated holes. Specify filled and capped via-in-pad for assembly. [Raspberry Pi hardware design guide](https://datasheets.raspberrypi.com/rp2350/hardware-design-with-rp2350.pdf)
- The processor hosts J2–J5 and J1 provides the 115200-baud runtime UART. Each downstream port has attachment detection, a current-limited power switch and ESD protection. The hub reports faults as a group. The optional indicator uses `firmware/hub/ch334f-status.bin`.
- Program or debug with the [standard JST programmer](https://github.com/tscircuit/standard-jst-programmer). Supply normal product power, switch ON and plug a straight-through cable into the top-entry J_SWD (JST SH, 5 pins, 1 mm). Contacts 1–5 are unconnected programmer power, SWDIO, ground, SWCLK and active-low RUN/reset. The signal lines use 100 Ω series resistors. RUN has a 10 kΩ pull-up to 3.3 V. J1 is a runtime console.
- The power switch is a Shou Han SK12D07VG5. Its 5 mm actuator slides parallel to the front edge and projects 4.75 mm past the PCB in the assembly model. Provide clearance for the through-hole leads, which extend 1.9 mm below the PCB.
- The TF-01A microSD socket opens at the front, beside the power lever. The 3D assembly places its mouth 0.30 mm inside the PCB edge and leaves 5.0 mm between the switch and socket housings. Its 3.3 V SPI0 signals are GP4 MISO, GP5 CS, GP6 SCK and GP7 MOSI. Board pull-ups hold CS and the data lines high during reset. Firmware boots from the external QSPI flash with the card inserted or removed. The `sd` command mounts the card on demand and reports the filesystem. The display demo generates its three patterns in code.

## Standalone program

The native example in `firmware/motherboard/main.c` identifies CDC devices by sending `id`. A USB potentiometer selects one of three built-in 480 × 320 drawings. A three-count deadband stabilizes each transition. The host coalesces knob changes during a frame and initializes a reconnected display. Edit `artwork()` to change the graphics. Rebuild with Pico SDK 2.3.1 and a CMake-supported Arm compiler.

```sh
cmake -S firmware/motherboard -B dist/host-fw -DPICO_NO_PICOTOOL=1
cmake --build dist/host-fw
```

| Console command | Reply |
| --- | --- |
| `id` | `DEVICE tscircuit motherboard 1.2.0` |
| `help` | Supported commands |
| `devices` | Connected serial device types and interface slots, followed by `OK` |
| `status` | `SCENE 1` through `SCENE 3`, or `SCENE 0` while waiting for a knob |
| `sd` | `SD FAT32`, `SD exFAT` or the detected FAT variant. A mount failure returns `ERR sd <FatFs result number>`. |

## PCB fabrication

The board uses four copper layers. Inner layer 1 carries the ground plane. Top, inner layer 2 and bottom carry routed traces. All components mount on top. The tscircuit design checks pass, and the exported Gerber and drill files pass an independent check for open and shorted nets. The USB traces were routed individually. Differential impedance and USB operation still need verification on the chosen stackup and first article.

[Gerbers and drills (ZIP)](https://github.com/tscircuit/basic-usbc-devices/releases/download/rp2350-usb-motherboard-compact-routed-v1/motherboard-gerbers.zip) · [BOM](https://github.com/tscircuit/basic-usbc-devices/releases/download/rp2350-usb-motherboard-compact-routed-v1/motherboard-bom.csv) · [Component placements](https://github.com/tscircuit/basic-usbc-devices/releases/download/rp2350-usb-motherboard-compact-routed-v1/motherboard-cpl.csv)

## Rebuild and check

```sh
python3 -m pip install -r requirements-routing.txt
bun run build:motherboard
python3 verify-module-copper.py --check-shorts --directory dist/motherboard motherboard
python3 motherboard/verify-gerbers.py
```

Check first-article power-up, host enumeration, hot-plug recovery, per-port fault handling and USB signal quality before embedding the board in a product. USB eye diagrams and enclosure fit require hardware.
