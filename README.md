# Basic USB-C devices

Ten USB-C boards, including a computer-powered four-port USB 2.0 hub, designed in tscircuit. The six original input modules and the buzzer are 24 × 30 mm with the same 19 × 25 mm mounting pattern. The display adapter is 32 × 42 mm and retains that pattern; the hub and resetter have separate mounting patterns. The distance board is 29% smaller in area than the previous 28 × 36 mm revision, using a CH341T SSOP20 instead of CH341A SOP28.

| Board | Interface | Host reading |
|---|---|---|
| Limit switch | CH340C + JL010 roller-lever SPDT switch, NC contact | `triggered` / `not_triggered` |
| Pushbutton | CH340C + K2-1102SP-Q4SC-04 normally open button, 12 mm tall actuator | `pressed` / `released` |
| Maintained toggle | CH340C + Dailywell 1MS1T1B1M1QES-5 SPDT lever | `on` / `off` |
| Rotary dial | CH552E + ALPS EC11E15244B2, 20 mm D-shaft, push switch | Relative detent count and push state |
| Absolute-position dial | CH552E + ALPS RK09K1130A5R 10 kΩ linear potentiometer | Absolute 0–255 reading / calibrated 0–100% |
| Distance | CH341T + VL53L0CXV0DH/1 | millimeters and threshold state; target 30–300 mm |
| Display adapter | CH552T + ILI9488 50-pin parallel LCD interface | Host sends RGB565 pixels and commands over USB CDC |
| USB resetter | RP2040 + TPS22918, adapted from seveibar/usb-reseter | Host switches downstream USB power, passthrough data |
| Buzzer | CH552E + 5 V active buzzer | Host commands timed 2.8 kHz beeps |
| Four-port hub | CH334F + four TUSB321AI USB-C controllers | One upstream + four downstream USB-C ports, USB 2.0, computer-powered |

The 177 × 46 mm panel has side breakaway tabs, 0.5 mm mouse-bite holes, 3 mm routing slots, tooling holes, and exposed 1 mm fiducials. Each board has four 2.2 mm non-plated M2 clearance holes, 2.5 mm in from each edge, with 4.6 mm diameter copper and placement keepouts for screw heads. All assembled parts are on the top side. The boards are independent USB devices; the panel is a manufacturing panel, not a USB hub.

## Enclosure interface

The button uses JLCPCB [C2930544](https://jlcpcb.com/partdetail/3267880-K2_1102SP_Q4SC04/C2930544), a 6 × 6 mm switch with a projecting plastic stem and **12 mm nominal total height** above PCB top, centered at (0, 8) mm. A lid outer face 10 mm above PCB top gives 2 mm nominal projection. Allow actual travel and tolerances; do not preload the stem. The vendor's linked model was 8 mm tall; `mechanical/button-12mm.obj` corrects the stem height while preserving the body and pads. It is a visual model, not a tolerance drawing.

The maintained toggle uses [C496154](https://jlcpcb.com/partdetail/C496154), a projecting metal lever, centered at (0, 8) mm. Its model is an approximate nominal envelope; confirm the bushing, nut and lever sweep against the Dailywell drawing/sample before designing a tight enclosure. The toggle and encoder require through-hole assembly; JLCPCB lists them as Economic/Standard with wave soldering, which is an extra assembly operation.

The dial uses [C470754](https://jlcpcb.com/partdetail/C470754), an ALPS EC11E15244B2 continuous encoder, centered at (0, 6.5) mm. It has 30 detents, 15 pulses per revolution, a push switch, and a 6 mm D-shaft with 4.5 mm flat dimension. ALPS specifies 20 mm shaft length from the case datum; shaft tip is approximately 24.5 mm above PCB top. `mechanical/dial-knob.scad` and `.stl` provide an 18 mm printed knob with an 8 mm-deep D socket and adjustable 0.25 mm clearance. Print a fit coupon first. Leave at least 1.5 mm axial travel plus tolerance if using the push function. The PCB footprint was corrected to the ALPS drawing 3 (2.5 mm contact pitch, 11 mm anchor-center spacing, A/B/C at −7.5 mm and D/E at +7 mm from the anchor centerline).

The absolute-position dial uses [C209779](https://jlcpcb.com/partdetail/ALPSALPINE-RK09K1130A5R/C209779), an ALPS RK09K1130A5R 10 kΩ linear potentiometer with 280° ±5° mechanical travel and a 20 mm-high, 6 mm-diameter knurled plastic shaft. The shaft center is (0, 6.5) mm. `mechanical/position-knob.stl` has a 6 mm round friction-fit socket for its 7 mm knurled section; adjust `shaft_style="round"` and `round_diameter` in `dial-knob.scad` to suit printing tolerances. This potentiometer has no push switch. It retains physical position without power.

The six original modules, buzzer and display adapter have mounting centers **(±9.5, ±12.5) mm**, with four 2.2 mm NPTH holes and 4.6 mm diameter screw-head keepouts. PCB thickness is 1.6 mm. Use M2 hardware without larger washers; hardware and printed parts are not assembly BOM items. USB connectors face negative Y. The identical base pattern supports a common enclosure mounting plate; lid openings differ by actuator. Keep the sensor optics and limit lever unobstructed.

## Unresolved assembly constraint

**Do not submit this panel as Economic PCBA.** JLCPCB lists the onboard sensor [C91199](https://jlcpcb.com/partdetail/STMicroelectronics-VL53L0CXV0DH1/C91199) as **Standard Only** with required X-ray inspection. The other selected components are Basic parts or Economic-compatible Extended parts. Their C-numbers and catalog links are recorded in `sourcing.json` and the BOM.

The current files preserve a complete onboard distance sensor as a reviewable **Standard-assembly candidate**. The requested Economic-only panel is not yet fulfilled. A pending choice is to accept Standard assembly, or redesign the distance board for a plug-in sensor. JLCPCB lists Waveshare [C431944](https://jlcpcb.com/partdetail/Waveshare-VL53L0X_DistanceSensor/C431944) as Economic-compatible, but its current stock and assembly arrangement have not been established. It is not silently substituted into these files. No parts have been bought or reserved.

## Fabrication rules

- Two copper layers, 1.6 mm FR-4; JLCPCB economy fabrication preset.
- All routing vias: **0.30 mm drill / 0.60 mm pad**, through both layers.
- Original six modules and buzzer: minimum trace width 0.20 mm, trace-to-pad/pad-to-pad clearance 0.15 mm, via-to-pad clearance 0.20 mm. Hub and display: 0.15 mm nominal routing with 0.1124 mm neck-downs. Resetter: 0.15 mm or wider traces with 0.10 mm copper clearance. Panel4 uses the strictest common fabrication minimum of 0.10 mm, with every module checked separately against its own rules.
- Minimum copper-to-board-edge clearance 0.30 mm; ground-pour inset 0.60 mm also clears panel mouse bites.
- Top assembly, 0402/0603 passives (1206 backlight resistor), no via-in-pad or blind/buried vias.
- Milled slot corners may have the fabricator's normal cutter radius. No component depends on a sharp internal corner.

Both CC pins have independent 5.1 kΩ pull-downs for USB-C device operation. D+/D− are connected for both cable orientations. USBLC6-2SC6 protection is provided on every USB interface. Use USB data cables, not charge-only cables.

## Electrical behavior

The CH340C CTS# input has a 10 kΩ pull-up, 220 Ω contact resistor, and 100 nF filter. Firmware is not needed. The host debounces for 20 ms. A released NC limit switch asserts CTS; triggering opens the contact. An open switch path therefore reports triggered. The button has the opposite polarity. The toggle reports on when its selected throw closes to common. USB disconnection is reported separately, never treated as a released switch.

The distance board powers both CH341T and VL53L0X from 3.3 V through XC6206P332MR-G. CH341T V3 and both VCC pins are tied to 3.3 V, and both GND pins are grounded. A 2 kΩ ACT# pull-down selects the I²C USB personality at startup without holding SDA low. The 12 MHz crystal has 33 pF load capacitors. The host initializes and calibrates the sensor using the Adafruit VL53L0X driver; there is no MCU to flash. I²C address is 0x29 (7-bit).

Distance thresholds default to trip at 50 mm and release at 55 mm. Invalid sensor status and measurements outside the requested 30–300 mm window report `invalid_range`, not a clear homing input. Offset/crosstalk calibration and threshold repeatability must be checked on the actual target and any cover window. USB and host scheduling do not provide a deterministic emergency-stop path.

Both dial boards require their respective included CH552E firmware to be flashed once. See `firmware/README.md`; compiled HEX and source are included. Local interrupt-based counting avoids relying on USB polling to observe every encoder edge.

The absolute-position board uses a VCC-referenced 8-bit ADC, a 220 Ω / 100 nF wiper filter, and eight-sample averaging. `host/position.py` reports normalized position using adjustable endpoint calibration (`--minimum`, `--maximum`, `--reverse`). Averaging reduces noise; it does not provide more than 8-bit ADC resolution. The reported position is not a precision calibrated angle, and a disconnected wiper is not reliably detectable.

## Schematics

Each board has exactly one populated schematic sheet (A4, or A2 for the wider inherited resetter diagram). All components and wiring are children of that sheet, so they render in the interactive viewer. The panel4 viewer contains ten sheets, one per independent board, with references matching the fabrication panel. `make-viewer.ts` combines those schematic drawings with the unchanged manufacturing geometry and verifies sheet membership and CAD checks.

## Files and reproducibility

- `digital.circuit.tsx`, `dial.circuit.tsx`, `position.circuit.tsx`, `distance.circuit.tsx`, `common.tsx`: circuits and placement.
- `panel.circuit.tsx`: panel arrangement and manufacturing frame.
- `imports/`: exact EasyEDA/JLCPCB imported footprints plus original metadata. Connector and switch element types are corrected; the switch's NC contact is not a “do not connect” pin.
- `output/*-gerbers/`: copper, solder mask, paste, silkscreen, board outline and drill files.
- `output/*-bom.csv`, `output/*-cpl.csv`: JLCPCB BOMs and placement files, using the same centered origin and positive-up Y coordinates as the Gerbers.
- `output/*.pcb.svg`, `output/*.schematic.svg`: previews and schematics.
- `output/validation.json`, `output/*.checks.json`: machine-readable checks.

Run with Bun 1.4.0 or compatible:

```sh
bun install
bun run build
bun run check
bun run test
```

`compose-panel.ts` translates each checked board, preserving all copper, drills, component attributes and schematic sheets without rerouting. `export.tsx` converts the selected six-, seven-, or ten-board design into one physical fabrication-panel outline, merges touching routing slots, and assigns unique references and net names. It preserves routed copper. This normalization is needed because the standalone checks API applies the first board outline to the entire input; running it directly on unrelated board envelopes produces false edge-clearance findings. Individual boards run the full `runAllChecks` suite. The fabrication panel runs the same suite with connector orientation evaluated against each retained module outline: connectors are used after depanelization, and the upstream rule otherwise compares them to the outer manufacturing rails. A reversed-connector regression verifies that this scoped check still catches real orientation errors. Individual schematics are checked before the manufacturing export removes schematic drawing records.

The build also verifies power and USB pin connectivity, distinct CC resistors and USB data nets, switch polarity connections, two layers, minimum trace widths, exact via sizes, unique references, and JLCPCB part coverage. Python tests cover debounce, polarity, invalid readings and distance hysteresis. These are CAD/software checks: no physical boards have been fabricated or tested, and no JLCPCB order-specific DFM review has been run. Review the assembler's component orientation preview, especially the USB connectors, switch, crystal, and optical sensor.

## Computer connection

```sh
python3 -m venv .venv
.venv/bin/pip install -r host/requirements.txt
.venv/bin/python host/digital.py limit /dev/serial/by-path/YOUR_USB_PORT
.venv/bin/python host/digital.py button /dev/serial/by-path/BUTTON_PORT
.venv/bin/python host/digital.py toggle /dev/serial/by-path/TOGGLE_PORT
.venv/bin/python host/dial.py /dev/serial/by-path/DIAL_PORT
.venv/bin/python host/position.py /dev/serial/by-path/POSITION_PORT --minimum 0 --maximum 255
```

On Windows use `COM3`, etc. and install the WCH CH340 driver if needed. CH340C does not provide a programmed unique serial number in this design: identify multiple boards by their USB port path, not an assumed stable ttyUSB number. The reader emits JSON on changes and a heartbeat every 250 ms; consumers should reject stale data.

For the distance reader on Linux, install the [CH341 I²C driver](https://github.com/gschorcht/i2c-ch341-usb), enable `i2c-dev`, and locate its bus using `i2cdetect -l`. Grant the user access to that specific adapter. It uses the CH341 parallel driver, not the CH340 serial driver. The reader's register transfers fit within the driver's 26-byte transfer limit.

```sh
.venv/bin/python host/distance.py --bus 3 --trip-mm 50 --release-mm 55
```

The distance reader is implemented for Linux; the digital reader supports pyserial-compatible systems. The [CH341A tool](https://www.tomeko.net/software/CH341A_tool/) is a separate Windows application with VL53L0X support. Host programs have unit tests but have not been exercised against real hardware.

## Design references

- [WCH CH340 datasheet](https://datasheet.lcsc.com/datasheet/pdf/e2f14e51aaa60c793f1f0cbc8a5d5faa.pdf?productCode=C84681)
- [WCH CH341 datasheet mirror](https://www.hestore.hu/prod_getfile.php?id=15356), especially §5.3 ACT# configuration strap.
- [ST VL53L0X datasheet](https://www.st.com/resource/en/datasheet/vl53l0x.pdf).
- [JLCPCB CH340C](https://jlcpcb.com/partdetail/WCH_Jiangsu_Qin_Heng-CH340C/C84681), [CH341T](https://jlcpcb.com/partdetail/C23971), [JL010](https://jlcpcb.com/partdetail/SHOUHAN-JL010/C2681582).

## Alternate 2 × 3 panel

`panel2.tsx` arranges the six modules in two rows and three columns on a **96 × 79 mm** manufacturing panel. Top row: limit, button, toggle. Bottom row: encoder dial, absolute-position dial, distance. The top row is rotated 180° so USB connectors face outward. Individual board outlines, mounting patterns, routed copper, two-layer construction and 0.30 mm vias are preserved. The frame uses the same 3 mm routing slots and mouse-bite tabs as the original panel.

After building the individual modules, run `bun run build:panel2`. Outputs include `panel2.circuit.json`, the six-sheet `panel2.viewer.circuit.json`, Gerbers, BOM, placement CSV, PCB preview and `panel2.validation.json` in `output/`.

## Four-port hub

`hub.circuit.tsx` is a 44 × 42 mm, two-layer, 1.6 mm board (40% less area than the previous 64 × 48 mm revision), with four M2 holes on a 38 × 10 mm pattern. Hub routing uses 0.15 mm nominal traces with 0.1124 mm neck-downs, above JLCPCB’s 0.10 mm minimum for two-layer 1 oz copper. Its four outputs use attach detection, current-limited switching, ganged overcurrent reporting and switched discharge. Allocate up to 100 mA per downstream module; this is not a charging hub. `panel3.tsx` includes the hub and all six modules; `panel2.tsx` remains the original six-module grid.

The hub's components are selected from JLCPCB Economic-compatible listings. See [hub design notes](references/hub/design-notes.md) for the circuit, power budget, footprint sources and required hardware validation. CAD checks do not certify 480 Mbit/s signal integrity or USB compliance; no assembled hardware has been tested.

```sh
bun run build:hub
bun run build:panel2
bun run check
bun run test
tsci check output/hub.circuit.json
tsci build --site --use-cdn-javascript
```

The default published preview uses the checked, routed `output/panel4.viewer.circuit.json`. All TSX design sources, firmware, host tools and generated manufacturing files are included. `tscircuit.config.json` lists each board and all four panels for the site viewer.

## Hub-inclusive panel

`panel3.tsx` is **67 × 157 mm**, containing all seven independent boards. Six 24 × 30 mm modules form two columns and three rows; the 44 × 42 mm hub sits at one end. This is the minimum-area guillotine packing among the rectangular board orientations evaluated, including 3 mm channels and 5 mm solid outer rails. All seven share a two-layer, 1.6 mm stackup and 0.30 mm via drills. Each board has four mounting holes; the hub alone uses the narrower 38 × 10 mm pattern.

Run `bun run build:panel3` after building the individual boards. The exported panel preserves every checked route, includes breakaway tabs and tooling features, and provides seven schematic sheets (one per board). The hub schematic uses explicit functional sections; validation rejects overlapping schematic symbols as well as electrical and PCB errors.

## Panel4: ten boards

`panel4.tsx` packs all ten boards into **112 × 140 mm**, with 3 mm routed channels, breakaway mouse-bite tabs and 5 mm solid handling rails. `pack-panel4.py` exhaustively searches guillotine arrangements with quarter-turn rotations; this is the minimum area within that search class. It is a fabrication panel: depanelize and connect modules separately. The four-port hub connects up to four devices at once, not all nine peripherals.

The display adapter uses the 8-bit ILI9488 interface from [abse/gameboy-advance@0.0.45](https://tscircuit.com/abse/gameboy-advance). Its **32 × 42 mm** PCB retains the common four-hole M2 pattern. The actual 3.5-inch LCD is larger and mounts separately. Order the **BuyDisplay ER-TFT035IPS-6 non-touch LCD** separately; it is not a JLCPCB component. The adapter supports host-controlled images through USB CDC, not an operating-system monitor interface. The 100 Ω backlight resistor intentionally limits brightness to fit the low-power budget. See [display provenance](references/display/README.md) and [firmware and host instructions](firmware/USB-OUTPUTS.md).

The **42 × 42 mm resetter** adapts [seveibar/usb-reseter@1.1.4](https://tscircuit.com/seveibar/usb-reseter), preserving its RP2040 control circuit and three USB ports. Its four M3 holes use a **35 × 21 mm** pattern. The source's two-hole outline was extended, routing vias changed to 0.30/0.60 mm, affected copper repaired, and all components assigned to one schematic sheet. Original editable blocks and MicroPython firmware are in `references/resetter/`. The checked `resetter-layout.json` is the manufacturing source of truth; `build-resetter.ts` validates and exports it. Use the original firmware's `on`, `off`, `cycle`, and `status` commands on the control port. Confirm the installed MicroPython USB power descriptor before connecting its control port through the 100 mA-per-port hub; a direct computer connection avoids that unverified descriptor dependency. Its separate passthrough input supplies the switched output load.

The **24 × 30 mm buzzer** has the common four M2 holes and a 5 V active 2.8 kHz buzzer driven by a MOSFET with a flyback diode. Its firmware accepts bounded timed beeps and switches off on USB reset, disconnect or suspend. The speaker module was omitted as requested.

```sh
bun run build:display
bun run build:buzzer
bun run build:resetter
bun run build:panel4
bun run check
bun run check:physical
bun run test
tsci check output/display.circuit.json
tsci check output/buzzer.circuit.json
tsci check output/resetter.circuit.json
```

Panel4 validation checks all ten populated schematic sheets, 40 mounting holes, routing continuity, exact copper transformations including pad/slot rotation, and 0.30/0.60 mm vias. The display and buzzer firmware compile with CH55xDuino 0.0.26; host/parser regression tests exercise the actual C frame parser. Firmware has not been tested on hardware. JLCPCB eligibility is recorded in `references/new-parts-jlcpcb.json`: every newly added PCB part is Economic-compatible, but the existing distance sensor still requires Standard assembly. The display glass is an external purchase.
