# Parallel-display USB-C prototypes

| Bare panel | Controller board | M2 hole spacing, center to center |
| --- | --- | --- |
| 3.5-inch ER-TFT035IPS-6 | 56 × 48 mm, four copper layers | 40 × 30 mm |
| 7-inch ER-TFT070-2 | 54 × 54 mm, four copper layers | 40 × 40 mm |

Both boards use the revision 3 ESP32-P4 with integrated 32 MB PSRAM, external 16 MB quad flash and a native full-speed USB port. The third test pad is CHIP_PU. To enter the ROM loader, hold BOOT low while resetting CHIP_PU, then release BOOT. Check the core supply, flash voltage at boot and USB enumeration on an assembled sample. The panel FPC must match the top-contact 50-pin connector. [Espressif reference schematic](https://dl.espressif.com/schematics/ESP32_P4X_C5_Function_EV_board-2.0-schematics.pdf)

## 3.5-inch video player

The top-mounted microSD socket opens toward the left edge. Both display boards use top-side assembly. The 16-bit i80 bus writes one RGB565 pixel per strobe. At 320 × 480 and 30 frames/s, the active pixel payload is 9.216 MB/s and needs at least 4.608 million write strobes per second, plus command and timing overhead. A 4-bit SD bus at 40 MHz has a theoretical 20 MB/s transfer ceiling. Local playback can read packed RGB565 frames or decode stored MJPEG through the P4 JPEG engine. Full-frame playback at 30 fps is a design target pending native firmware and an end-to-end test using the actual card and panel. [Panel datasheet](https://www.buydisplay.com/download/manual/ER-TFT035IPS-6_Datasheet.pdf)

GPIO1–16 drive DB0–15. GPIO17–20 drive WR, D/C, RESET and backlight PWM. GPIO39–44 carry SD D0, D1, D2, D3, CLK and CMD respectively. IM2:IM0 are strapped 010. The 100 Ω backlight resistor retains the existing carrier’s brightness range.

## 7-inch RGB carrier

The processor continuously scans an RGB565 framebuffer to the most significant color bits of the 800 × 480 panel. GPIO17–20 drive DE, VSYNC, HSYNC and pixel clock. GPIO21 drives active-low reset. GPIO23 switches the bias supply on after the logic supply has settled. GPIO22 controls the backlight. Keep RESET and backlight low during power-up. Verify rail sequence, reset timing and current draw at full brightness before fitting the panel to an enclosure. [Panel datasheet](https://www.buydisplay.com/download/manual/ER-TFT070-2_Datasheet.pdf)

The TPS65150 generates nominal 10.4 V AVDD, +16 V VGH, −7 V VGL and 3.9 V VCOM. Use 25 V or higher X7R ceramics on AVDD, CPI, VGH, VGL, and flying-capacitor nodes. The LED output uses a 50 V capacitor and a 60 V diode to withstand an unplugged backlight. Select the 22 µF AVDD capacitor by its capacitance under DC bias. Use 0.1% feedback resistors for the panel rails. The TPS61165 regulates the backlight to approximately 75 mA using a 2.67 Ω sense resistor. [LCD bias supply](https://www.ti.com/lit/ds/symlink/tps65150.pdf) · [Backlight driver](https://www.ti.com/lit/ds/symlink/tps61165.pdf)

## Inspection

Run `bun install --frozen-lockfile` followed by `bun p4-display/inspect.tsx`. Run `bun p4-display/export-gerbers.ts` after inspection to export all four copper films and drill files. Each board's Circuit JSON is written to `dist/p4-display`. Both drawings use ANSI B to fit the 104-pin controller and 50-pin connector. The check reports the sheet-size advisory and fails on electrical, placement and routing findings. Run `python3 verify-module-copper.py --check-shorts --directory dist/p4-display video-player large-rgb` for independent four-layer continuity and copper overlap checks. Before fabrication, review the QFN thermal pad and vias, USB pair geometry, switch-node current loops, return paths, power trace widths and enclosure clearances, then compare the assembly BOM with the specified voltage ratings.

For placement changes, route the carrier with the default local tscircuit autorouter and repeat the checks above. The finished via is 0.45 mm with a 0.20 mm drill. The [autorouter handoff](../AUTOROUTER-HANDOFF.md) includes separate fixtures and pass criteria for both carriers.

The L1 and L2 enclosure models use the nominal 4 × 4 × 3.5 mm package with bottom terminations. Allow for the ±0.2 mm height tolerance. [Sunlord package drawing](https://www.sunlordinc.com/uploads/files/20220630/ASWPA%20series%20of%20SMD%20Power%20Inductor%2020210707.pdf)
