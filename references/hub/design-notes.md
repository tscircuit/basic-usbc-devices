# Four-port USB-C hub

The hub is a separate 64 × 48 mm board. J1 is the computer connection; J2–J5 are downstream USB-C ports. All ports carry USB 2.0 data only. No USB Power Delivery or charging modes are advertised. Use passive USB 2.0 data cables and the low-power input/sensor modules in this repository.

## Electrical design

- CH334F (C5187527), QFN24, is a four-port 480 Mbit/s USB 2.0 hub with multiple transaction translators. PSELF is grounded for bus-powered operation. The external 12 MHz crystal avoids the manufacturer's caveats for crystal-free operation. Unused reset/configuration pins remain open as specified.
- Each downstream receptacle has a TUSB321AI (C2674046). PORT is high for source/DFP mode; CURRENT_MODE is grounded for USB default current. Its open-drain ID output goes low only after sink attachment. The 910 kΩ ±1% VBUS sense resistor falls within TI's 855–920 kΩ permitted range.
- Two SN74LVC2G32 dual OR gates combine each active-low ID signal with the hub's active-low PWREN. A TPS2552 output is enabled only when the hub enables power AND that port has detected an attached sink. This prevents always-on VBUS on empty USB-C receptacles.
- Each TPS2552 has a 220 kΩ ±1% current-setting resistor. Its limit is approximately 123 mA typical (use the datasheet equations/tolerances, not a precise 100 mA trip). All four open-drain fault outputs feed the hub's ganged OVCUR input. Faults therefore affect the whole group.
- Each switched output has 150 µF ±20%, 10 V bulk capacitance (minimum nominal tolerance value 120 µF), plus 100 nF ceramic. These capacitors are isolated from the upstream bus when disabled. A 2N7002 and 1 kΩ resistor discharge each output when disabled; the nominal 150 ms time constant takes 5 V below 0.8 V in about 275 ms.
- Upstream CC1 and CC2 each have their own 5.1 kΩ Rd. USBLC6-2SC6 arrays protect all five data interfaces. The TUSB321AI implements the downstream Rp advertisement.

## Power budget and limits

The intended allocation is at most 100 mA per downstream device after configuration. The CH334F lists 85 mA typical with four high-speed devices, giving about 485 mA before small control overhead at full allocation. With the full-speed input modules, its listed consumption is substantially lower (25 mA typical with four full-speed devices). These are typical values, not guaranteed system maxima. Do not treat this as a four-port charging hub or attach high-power devices/active cables. Verify total upstream current, enumeration descriptors, suspend current, simultaneous startup and fault recovery on assembled hardware. Per-port current limiting and ganged fault reporting are not a precision 500 mA upstream limiter.

## PCB and mounting

Two copper layers, 1.0 mm FR-4, 0.30 mm via drills, 0.60 mm via pads, 1 oz copper, 0.20 mm nominal traces with 0.15 mm neck-downs and 0.15 mm pad clearance. All components are on top. Four 2.2 mm M2 holes form the same 19 × 25 mm rectangle as the six modules; the hub pattern is centered at (0, −8) mm, hence holes at (±9.5, −20.5) and (±9.5, 4.5). Keepouts are 4.6 mm diameter.

CAD routing/connectivity checks do not establish 90 Ω USB differential impedance, return-path quality, pair skew, an eye diagram, or USB compliance. High-speed layout and assembled electrical validation must be completed before treating the hub as production-ready at 480 Mbit/s. The controller's rated speed is not a measured board result.

## Sources

- [WCH CH334/335 manufacturer datasheet, English](https://cdn-learn.adafruit.com/assets/assets/000/131/435/original/CH334DS1.PDF)
- [TI TUSB321AI datasheet](https://www.ti.com/lit/ds/symlink/tusb321ai.pdf)
- [TI TPS2552 datasheet](https://www.ti.com/lit/ds/symlink/tps2552.pdf)
- [TI SN74LVC2G32 datasheet](https://www.ti.com/lit/ds/symlink/sn74lvc2g32.pdf)
- [Wurth 865060243005 drawing and specifications](https://www.we-online.com/components/products/datasheet/865060243005.pdf)

The bulk-capacitor footprint follows the manufacturer's 3.5 × 1.6 mm pads with a 2.1 mm inner gap. JLCPCB lists the selected hub IC, CC controllers, logic gates, power switches and bulk capacitors for Economic and Standard assembly. Availability is not reserved. The separate distance module still contains the Standard-only VL53L0X.

## Routing reproduction

`hub-routes.json` holds the imported copper. `hub-router.ts` replays it through the normal tscircuit renderer, which regenerates the ground pour and reruns the checks. Placement or connectivity changes require rerouting; do not reuse the cache without checking the rebuilt board. The crystal uses four explicit `pcbPath` traces. Three local routes (DM2, DP3, and the adjacent VBUS decoupler connection) were completed after the automatic routing pass. Those paths are included in the checked cache.

For a placement-only render, run `HUB_PLACEMENT_ONLY=1 bun build.tsx hub`; unconnected-net findings are expected at this stage. To reroute from that newly rendered placement, run `bun route-hub.ts`, route `output/hub.dsn` in Freerouting (tested with Java release 2.5.0), save `output/hub.ses`, then run `bun import-hub-routes.ts` and `bun run build:hub`. The DSN/SES files are temporary routing handoffs; the checked final copper is in `hub-routes.json`. A new automatic pass may need local completion before checks pass. Nominal width is 0.20 mm with 0.15 mm neck-downs. Automatic routing uses 0.18 mm clearance; the local completion uses at least 0.15 mm copper clearance. Via-to-SMD clearance is 0.20 mm. Mounting exclusions use their square bounding boxes in the router to satisfy the tscircuit keepout checks; locator-hole obstacles include an extra 0.03 mm radial margin.

The 0.15 mm minimum trace width exceeds JLCPCB’s published 0.10 mm minimum for 1 oz, two-layer boards ([fabrication capabilities](https://jlcpcb.com/capabilities/pcb-capabilities)). Use 1 oz copper; the thicker-copper rules differ.
