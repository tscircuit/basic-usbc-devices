# Basic USB-C devices

Six compact USB-C peripherals and a separate computer-powered four-port USB 2.0 hub, designed in tscircuit. Each peripheral board is 24 × 30 mm with the same 19 × 25 mm mounting pattern. The distance board is 29% smaller in area than the previous 28 × 36 mm revision, using a CH341T SSOP20 instead of CH341A SOP28.

| Board | Interface | Host reading |
|---|---|---|
| Limit switch | CH340C + JL010 roller-lever SPDT switch, NC contact | `triggered` / `not_triggered` |
| Pushbutton | CH340C + K2-1102SP-Q4SC-04 normally open button, 12 mm tall actuator | `pressed` / `released` |
| Maintained toggle | CH340C + Dailywell 1MS1T1B1M1QES-5 SPDT lever | `on` / `off` |
| Rotary dial | CH552E + ALPS EC11E15244B2, 20 mm D-shaft, push switch | Relative detent count and push state |
| Absolute-position dial | CH552E + ALPS RK09K1130A5R 10 kΩ linear potentiometer | Absolute 0–255 reading / calibrated 0–100% |
| Distance | CH341T + VL53L0CXV0DH/1 | millimeters and threshold state; target 30–300 mm |
| Four-port hub | CH334F + four TUSB321AI USB-C controllers | One upstream + four downstream USB-C ports, USB 2.0, computer-powered |

The 177 × 46 mm panel has side breakaway tabs, 0.5 mm mouse-bite holes, 3 mm routing slots, tooling holes, and exposed 1 mm fiducials. Each board has four 2.2 mm non-plated M2 clearance holes, 2.5 mm in from each edge, with 4.6 mm diameter copper and placement keepouts for screw heads. All assembled parts are on the top side. The boards are independent USB devices; the panel is a manufacturing panel, not a USB hub.

## Enclosure interface

The button uses JLCPCB [C2930544](https://jlcpcb.com/partdetail/3267880-K2_1102SP_Q4SC04/C2930544), a 6 × 6 mm switch with a projecting plastic stem and **12 mm nominal total height** above PCB top, centered at (0, 8) mm. A lid outer face 10 mm above PCB top gives 2 mm nominal projection. Allow actual travel and tolerances; do not preload the stem. The vendor's linked model was 8 mm tall; `mechanical/button-12mm.obj` corrects the stem height while preserving the body and pads. It is a visual model, not a tolerance drawing.

The maintained toggle uses [C496154](https://jlcpcb.com/partdetail/C496154), a projecting metal lever, centered at (0, 8) mm. Its model is an approximate nominal envelope; confirm the bushing, nut and lever sweep against the Dailywell drawing/sample before designing a tight enclosure. The toggle and encoder require through-hole assembly; JLCPCB lists them as Economic/Standard with wave soldering, which is an extra assembly operation.

The dial uses [C470754](https://jlcpcb.com/partdetail/C470754), an ALPS EC11E15244B2 continuous encoder, centered at (0, 6.5) mm. It has 30 detents, 15 pulses per revolution, a push switch, and a 6 mm D-shaft with 4.5 mm flat dimension. ALPS specifies 20 mm shaft length from the case datum; shaft tip is approximately 24.5 mm above PCB top. `mechanical/dial-knob.scad` and `.stl` provide an 18 mm printed knob with an 8 mm-deep D socket and adjustable 0.25 mm clearance. Print a fit coupon first. Leave at least 1.5 mm axial travel plus tolerance if using the push function. The PCB footprint was corrected to the ALPS drawing 3 (2.5 mm contact pitch, 11 mm anchor-center spacing, A/B/C at −7.5 mm and D/E at +7 mm from the anchor centerline).

The absolute-position dial uses [C209779](https://jlcpcb.com/partdetail/ALPSALPINE-RK09K1130A5R/C209779), an ALPS RK09K1130A5R 10 kΩ linear potentiometer with 280° ±5° mechanical travel and a 20 mm-high, 6 mm-diameter knurled plastic shaft. The shaft center is (0, 6.5) mm. `mechanical/position-knob.stl` has a 6 mm round friction-fit socket for its 7 mm knurled section; adjust `shaft_style="round"` and `round_diameter` in `dial-knob.scad` to suit printing tolerances. This potentiometer has no push switch. It retains physical position without power.

All mounting centers are **(±9.5, ±12.5) mm**, with four 2.2 mm NPTH holes and 4.6 mm diameter screw-head keepouts. PCB thickness is 1.6 mm. Use M2 hardware without larger washers; hardware and printed parts are not assembly BOM items. USB connectors face negative Y. The identical base pattern supports a common enclosure mounting plate; lid openings differ by actuator. Keep the sensor optics and limit lever unobstructed.

## Unresolved assembly constraint

**Do not submit this panel as Economic PCBA.** JLCPCB lists the onboard sensor [C91199](https://jlcpcb.com/partdetail/STMicroelectronics-VL53L0CXV0DH1/C91199) as **Standard Only** with required X-ray inspection. The other selected components are Basic parts or Economic-compatible Extended parts. Their C-numbers and catalog links are recorded in `sourcing.json` and the BOM.

The current files preserve a complete onboard distance sensor as a reviewable **Standard-assembly candidate**. The requested Economic-only panel is not yet fulfilled. A pending choice is to accept Standard assembly, or redesign the distance board for a plug-in sensor. JLCPCB lists Waveshare [C431944](https://jlcpcb.com/partdetail/Waveshare-VL53L0X_DistanceSensor/C431944) as Economic-compatible, but its current stock and assembly arrangement have not been established. It is not silently substituted into these files. No parts have been bought or reserved.

## Fabrication rules

- Two copper layers, 1.6 mm FR-4; JLCPCB economy fabrication preset.
- All routing vias: **0.30 mm drill / 0.60 mm pad**, through both layers.
- Minimum trace width 0.20 mm; trace-to-pad and pad-to-pad clearance 0.15 mm; via-to-pad clearance 0.20 mm.
- Minimum copper-to-board-edge clearance 0.30 mm; ground-pour inset 0.60 mm also clears panel mouse bites.
- Top assembly, 0603 passives, no via-in-pad or blind/buried vias.
- Milled slot corners may have the fabricator's normal cutter radius. No component depends on a sharp internal corner.

Both CC pins have independent 5.1 kΩ pull-downs for USB-C device operation. D+/D− are connected for both cable orientations. USBLC6-2SC6 protection is provided on every USB interface. Use USB data cables, not charge-only cables.

## Electrical behavior

The CH340C CTS# input has a 10 kΩ pull-up, 220 Ω contact resistor, and 100 nF filter. Firmware is not needed. The host debounces for 20 ms. A released NC limit switch asserts CTS; triggering opens the contact. An open switch path therefore reports triggered. The button has the opposite polarity. The toggle reports on when its selected throw closes to common. USB disconnection is reported separately, never treated as a released switch.

The distance board powers both CH341T and VL53L0X from 3.3 V through XC6206P332MR-G. CH341T V3 and both VCC pins are tied to 3.3 V, and both GND pins are grounded. A 2 kΩ ACT# pull-down selects the I²C USB personality at startup without holding SDA low. The 12 MHz crystal has 33 pF load capacitors. The host initializes and calibrates the sensor using the Adafruit VL53L0X driver; there is no MCU to flash. I²C address is 0x29 (7-bit).

Distance thresholds default to trip at 50 mm and release at 55 mm. Invalid sensor status and measurements outside the requested 30–300 mm window report `invalid_range`, not a clear homing input. Offset/crosstalk calibration and threshold repeatability must be checked on the actual target and any cover window. USB and host scheduling do not provide a deterministic emergency-stop path.

Both dial boards require their respective included CH552E firmware to be flashed once. See `firmware/README.md`; compiled HEX and source are included. Local interrupt-based counting avoids relying on USB polling to observe every encoder edge.

The absolute-position board uses a VCC-referenced 8-bit ADC, a 220 Ω / 100 nF wiper filter, and eight-sample averaging. `host/position.py` reports normalized position using adjustable endpoint calibration (`--minimum`, `--maximum`, `--reverse`). Averaging reduces noise; it does not provide more than 8-bit ADC resolution. The reported position is not a precision calibrated angle, and a disconnected wiper is not reliably detectable.

## Schematics

Each board has exactly one populated A4 schematic sheet. All components and wiring are children of that sheet, so they render in the interactive viewer. The panel viewer contains six sheets, one per independent board, with references matching the fabrication panel. `make-viewer.ts` combines those schematic drawings with the unchanged manufacturing geometry and verifies sheet membership and CAD checks.

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

`compose-panel.ts` translates each checked board, preserving all copper, drills, component attributes and schematic sheets without rerouting. `export.tsx` converts the six-board design into one physical fabrication-panel outline, merges touching routing slots, and assigns unique references and net names. It preserves routed copper. This normalization is needed because the standalone checks API applies the first board outline to the entire input; running it directly on unrelated board envelopes produces false edge-clearance findings. Individual boards and the normalized physical panel each run the full `runAllChecks` suite. Individual schematics are checked before the manufacturing export removes schematic drawing records.

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

`hub.circuit.tsx` is a separate 64 × 48 mm, two-layer, 1.0 mm board with the same 19 × 25 mm mounting-hole spacing. Its four outputs use attach detection, current-limited switching, ganged overcurrent reporting and switched discharge. Allocate up to 100 mA per downstream module; this is not a charging hub. The six modules remain on `panel2.tsx` in two rows and three columns.

The hub's components are selected from JLCPCB Economic-compatible listings. See [hub design notes](references/hub/design-notes.md) for the circuit, power budget, footprint sources and required hardware validation. CAD checks do not certify 480 Mbit/s signal integrity or USB compliance; no assembled hardware has been tested.

```sh
bun run build:hub
bun run build:panel2
bun run check
bun run test
tsci check output/hub.circuit.json
tsci build --site --use-cdn-javascript
```

The default published preview uses the checked, routed `output/panel2.viewer.circuit.json`. All TSX design sources, firmware, host tools and generated manufacturing files are included. `tscircuit.config.json` lists each board and both panels for the site viewer.
