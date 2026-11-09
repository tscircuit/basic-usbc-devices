# Computer-controlled status LEDs

Each of the ten boards has a host-controlled LED. The nine new LEDs are red
KT-0603R (JLCPCB C2286). The resetter reuses its existing addressable RGB LED.
The controls are independent of the switch, dial, sensor, display, buzzer, and
hub port-power functions.

## Enclosure datum

Coordinates are millimetres, viewed from the component side in the standalone
PCB viewer; +Y points toward the switch/sensor end on the common boards.

| Boards | Mounting-hole datum | LED centre | Offset from datum |
|---|---|---|---|
| Limit, button, toggle, encoder dial, position dial, distance, display, buzzer | Lower-left M2: (-9.5, -12.5) | (-9.5, -9.0) | (0, +3.5) |
| Hub | Lower-left M2: (-19, -5) | (-19, -8) | (0, -3.0) |
| Resetter | Upper-right M3: (17.5, 3.5) | Existing RGB: (14, 15.5) | (-3.5, +12.0) |

All eight boards with the 19 × 25 mm mounting pattern share the exact LED centre
and orientation. The hub and resetter retain their different mounting patterns.
Use a light pipe or enclosure window over the LED centre; these are surface-mount
LEDs, not protruding panel lamps. Panel rotations also rotate this datum; use the
standalone board coordinates when designing an enclosure. Board outlines and
mounting holes have not grown for this feature.

## Host commands

Install `host/requirements.txt`. Examples:

```sh
python host/status_led.py button /dev/ttyUSB0 on
python host/digital.py button /dev/ttyUSB0 --led follow
python host/status_led.py dial /dev/ttyACM0 on
python host/status_led.py position /dev/ttyACM1 off
python host/status_led.py distance 3 on
python host/status_led.py display /dev/ttyACM2 on
python host/status_led.py buzzer /dev/ttyACM3 off
python host/status_led.py hub 1:2 on
python host/status_led.py resetter /dev/ttyACM4 auto
```

`limit`, `button`, and `toggle` use CH340C DTR# as an active-low sink. The LED
control process holds the serial port open; closing a port can change DTR on
some operating systems. Use the reader's `--led on|off|follow` option to read
the input and control the LED in the same process. Other applications opening
the port may briefly assert DTR.

The CH552E dial, position and buzzer use P1.5; the display's CH552T uses P3.5.
Install the updated HEX files in `firmware/build*/`. Dial/position accept ASCII
`0`/`1` and report the acknowledged state as `led` in their normal JSON reports.
Display/buzzer use framed CDC opcode `0x20`, with one byte `0` or `1` and the
existing CRC and acknowledgement. These firmware LEDs start off and turn off
on USB deconfiguration or suspend. `firmware/build-status-firmware.sh` rebuilds
all four with CH55xDuino 0.0.26.

The distance board uses a TCA9536 (C3194610) at I²C address `0x41`, on the existing
CH341T bus. IO0 sinks the LED from 3.3 V through 2 kΩ. The host tool preloads its
output latch before changing direction and preserves the other IO bits. It
requires the same Linux CH341 I²C driver as the distance reader. Its power-on
state is input/LED off; it retains the commanded state until power is removed
or another command is sent.

Copy `firmware/resetter/main.py` to the RP2040's MicroPython filesystem. Its
`led on`, `led off`, and `led auto` commands override or restore the original
power-status RGB indication without changing output power. It starts off;
`on` selects dim green, and `auto` restores the existing status colours.

## Hub configuration is required

Program the new AT24C02D EEPROM (C79996, U_STATUS) with
`firmware/hub/ch334f-status.bin` **before assembly**, or program it in circuit
using a suitable 3.3 V I²C fixture while the hub is unpowered and its controller
is isolated from the programming bus. Read back and compare all 256 bytes.
Do not assume that JLCPCB's placement service programs EEPROMs automatically.
Power-cycle after programming. `build-eeprom.py` regenerates the binary.

The image preserves the CH334F VID/PID, enables four removable ports, declares
100 mA hub consumption, bus power and ganged overcurrent, and enables USB port
indicators. EEPROM byte `0x0a` is `0x13`; USB EEPROM rewriting is disabled.
See the [WCH CH334/335 datasheet v2.5](https://cdn-learn.adafruit.com/assets/assets/000/131/435/original/CH334DS1.PDF),
sections 3.3 and 3.5. The LED follows the CH334F port-1 indicator circuit between
LED2 and LED4, with a 1 kΩ series resistor; the EEPROM shares LED3/SCL and LED4/SDA.

The host tool verifies the hub descriptor's indicator-support bit, then sends
USB 2.0 hub-class `SetPortFeature(PORT_INDICATOR=22)` for port 1. `on` selects
the green-indicator channel (the installed LED is physically red), `off` forces
off, and `auto` restores port-1 automatic indication. It does not detach the
hub driver or change port power. Supply the explicit USB bus and device address
from `lsusb`; these numbers can change on reconnect. Linux permissions must
allow control requests to that hub. A blank EEPROM will not enable this feature.

## Fabrication and validation

All newly added PCB parts are listed for JLCPCB Economic assembly; evidence is
in `references/status-parts-jlcpcb.json`. The existing VL53L0X remains
Standard-only, and the LCD glass remains a separate purchase. New firmware and
the hub EEPROM image are part of the manufacturing handoff, not Gerber data.
CAD and software checks do not replace testing an assembled board.

Panel mouse-bite drill centres are offset 0.15 mm outward from each module edge. The 0.50 mm holes still intersect the edge by 0.10 mm while preserving at least 0.20 mm clearance to edge-adjacent copper; panel outlines and tab widths remain unchanged. Deburr after separation.

For routing edits, `prepare-small-status-routes.py limit|dial` seeds the small-board caches from a render; `complete-status-routing.py <board>` completes gaps with clearance-aware searches. Regenerate `*-route-ports.json` with `bun update-status-route-metadata.ts limit|dial`, then rebuild and run all CAD and physical checks. Hub/display use their existing DSN exporters and metadata scripts. The hub fanout generator now reserves its added indicator/I²C pins. Routing-helper completion alone is not a passing manufacturing check.
