# Individually switched USB-C hub

| Connection | Role |
|---|---|
| J1, marked HOST | USB 2.0 upstream data and hub-class port control. The hub senses host VBUS through a resistive divider. |
| J2–J5, marked P1–P4 | Four USB-C downstream ports in order from left to right with the screw terminal at the top. Each advertises 1.5 A at 5 V to an attached sink. |
| J6, marked GND / +5V | External regulated 5 V rail. Use 5.1 V at the terminal and a current-limited 8 A supply for the full four-port load. Ground is common with USB. |

## Power and control

The USB2514B uses its ROM defaults. CFG_SEL0 and CFG_SEL1 are strapped low for self-powered operation, individual switching and individual overcurrent reporting. NON_REM0 and NON_REM1 are low for four removable ports. Each PRTPWR output enables its own TPS25821 and each active-low FAULT output returns to the matching OCS_N input. The enable pull-downs also select ordinary USB data operation when the hub samples the BC_EN straps. The host can control all four ports with standard hub-class requests over J1. No firmware or EEPROM programming is required. [Microchip design checklist, §§5 and 8](https://ww1.microchip.com/downloads/aemDocuments/documents/UNG/ProductDocuments/DesignChecklist/USB2512B-Hardware-Design-Checklist-00004541.pdf) · [USB2514B datasheet](https://ww1.microchip.com/downloads/aemDocuments/documents/UNG/ProductDocuments/DataSheets/USB251xB-xBi-Data-Sheet-DS00001692.pdf)

Each TPS25821 detects attachment on its own CC1/CC2 pins before applying VBUS. CHG is high for the 1.5 A advertisement and the typical current limit is 1.67 A. Each switch has 220 µF input bulk, a local 100 nF bypass, and 4.7 µF at the switched receptacle. A 1 kΩ bleeder discharges port capacitance and the adjacent red LED is powered from that port’s switched VBUS. An empty or disabled port has its LED off. The upstream positive supply only feeds a sense divider and 1 µF capacitor. The external rail feeds the downstream switches and the 3.3 V hub regulator. The design supports 5 V USB-C and USB 2.0 high speed (480 Mbit/s signaling). [TPS25821 datasheet, §§7.3 and 8.2](https://www.ti.com/lit/ds/symlink/tps25820.pdf)

## Fabrication

The 66 × 46 × 1.6 mm board has four 2.2 mm M2 clearance holes on a 60 × 40 mm grid. L1 carries all five USB pairs, L2 is their ground reference, L3 distributes the external 5 V, and L4 carries switched VBUS and control routing. The nominal differential geometry is 0.20 mm trace width and 0.18 mm edge gap. Specify a 90 Ω differential L1-to-L2 stackup and have the fabricator confirm it against this artwork before ordering. The routed centerline length mismatch is below 0.1 mm for either cable orientation at every receptacle. TPD2EUSB30 arrays sit at each connector. [TI ESD array datasheet](https://www.ti.com/lit/ds/symlink/tpd2eusb30.pdf)

The two sheets, manufacturing layers, drill files, assembly BOM and placements come from the same circuit. All 75 components are on the top side. On November 28, 2026, JLCPCB listed matching manufacturer part numbers and stock for all 19 BOM lines. The through-hole screw terminal needs through-hole assembly. The four polarized capacitors use the FOSAN land drawing on page 46 (3.5 × 1.6 mm pads and 1.9 mm gap). The supplier CAD library has narrower pads, which triggers a footprint comparison warning. Check their polarity and J6 orientation in the assembler preview. [FOSAN land pattern](https://datasheet.lcsc.com/datasheet/pdf/78747037895f4dfcbb69d9b4162e3b9f.pdf?productCode=C7469982) [Core and input schematic](../../output/switchable-hub.schematic.svg) · [Downstream schematic](../../output/switchable-hub.ports.schematic.svg) · [Gerbers and drill files](../../output/switchable-hub-gerbers/) · [BOM](../../output/switchable-hub-bom.csv) · [Placement file](../../output/switchable-hub-cpl.csv)

## Prototype acceptance

The CAD checks cover topology, copper connectivity, shorts and routed USB pair skew. The following measurements are pending on an assembled board.

1. With J1 unplugged and J6 powered, check the 3.3 V rail and verify the host connector stays below 0.8 V on VBUS. Connect J1 and run `lsusb -v -d 0424:2514` on Linux. Look for four ports, per-port power switching and per-port overcurrent protection in the hub descriptor.
2. Attach USB 2.0 devices to all four ports and identify the hub location with `uhubctl`. Run `uhubctl -e -l "$hub" -p 2 -a off`, substituting the location and target port. With a compliant sink attached, measure the target VBUS falling below 0.8 V. Check that its LED goes out and that traffic and VBUS continue on the other three ports. Switch it back on with `-a on` and verify re-enumeration. Repeat for each port and with the cables flipped. [uhubctl usage](https://github.com/mvp/uhubctl#usage)
3. Use four Type-C electronic loads that present Rd. Increase each to 1.5 A and measure at the receptacles with all four loaded. Confirm VBUS stays at least 4.75 V, record the terminal voltage and temperatures of J6 and each switch after thermal stabilization, and test with the intended enclosure and supply wiring.
4. With an adjustable load on one port, raise its current until that switch limits and reports overcurrent. Confirm data and VBUS remain available on the other three, then remove the overload and check recovery. Verify high-speed signal integrity on a prototype using the fabricator’s actual stackup.

To rebuild, run `bun run build:switchable-hub`, then `python3 verify-module-copper.py --check-shorts switchable-hub` with the packages in `requirements-routing.txt`. The saved routes in `switchable-hub/routes.json` are in millimeters and are matched to the full set of pad positions on each net. Update those routes when changing a pad location or a connection.
