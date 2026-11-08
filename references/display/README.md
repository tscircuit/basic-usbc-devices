# Display interface provenance

Adapted electrically from https://tscircuit.com/abse/gameboy-advance, version 0.0.45, release `8f884cec-505d-486b-9121-6bb0e1a6dedf`, inspected 2026-11-08. The latest circuit uses the ILI9488 8080 8-bit interface: its older external-parts prose mentions SPI and is not the wiring used here.

LCD: BuyDisplay ER-TFT035IPS-6 non-touch, 50-pin FPC, 320 × 480 pixels. Connector: JLCPCB C11098, AFC07-S50ECC-00, top contact, 0.5 mm pitch, 0.3 mm cable. Verify cable contact orientation on the actual LCD before assembly. No LCD glass is included in the JLCPCB BOM.

LCD D0..D7 are FPC pins 32..25, WR 36, DC 37, reset 10, CS 38 grounded, RD 35 held high. IM2:0 = 011. CH552T replaces the reference controller and operates at 3.3 V / 16 MHz; its V33 and VCC are both 3.3 V. See firmware/USB-OUTPUTS.md for the full map and software.

The 100 Ω 1206 backlight resistor and low-side MOSFET provide deliberately reduced brightness for the bus-powered hub. Hardware current, backlight brightness, LCD timing and USB operation remain unmeasured.

Routing is replayed from `display-routes.json`. For a placement revision: build with `DISPLAY_PLACEMENT_ONLY=1`, run `bun route-display.ts`, route the resulting DSN with Freerouting, then run `bun import-display-routes.ts` and `bun normalize-display-routes.ts`. The importer enforces the 0.1124 mm neck-down minimum. Rebuild and rerun CAD and physical connectivity checks after any reroute.
