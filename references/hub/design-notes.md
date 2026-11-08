# Four-port USB-C hub

The hub is a 44 × 42 mm board. J1 is the computer connection; J2–J5 are downstream USB-C ports. All ports carry USB 2.0 data only. No USB Power Delivery or charging modes are advertised. Use passive USB 2.0 data cables and the low-power input/sensor modules in this repository.

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

Two copper layers, 1.6 mm FR-4, 0.30 mm via drills, 0.60 mm via pads, 1 oz copper, 0.15 mm signal traces and 0.20 mm clock traces and 0.15 mm pad clearance. All components are on top. Four 2.2 mm M2 holes are located at (±19, ±5) mm, a 38 × 10 mm pattern. Keepouts are 4.6 mm diameter. This revised pattern permits a 40% area reduction from the earlier 64 × 48 mm board. The 1.6 mm stackup matches the six modules for fabrication together on panel3.

CAD routing/connectivity checks do not establish 90 Ω USB differential impedance, return-path quality, pair skew, an eye diagram, or USB compliance. High-speed layout and assembled electrical validation must be completed before treating the hub as production-ready at 480 Mbit/s. The controller's rated speed is not a measured board result.

## Sources

- [WCH CH334/335 manufacturer datasheet, English](https://cdn-learn.adafruit.com/assets/assets/000/131/435/original/CH334DS1.PDF)
- [TI TUSB321AI datasheet](https://www.ti.com/lit/ds/symlink/tusb321ai.pdf)
- [TI TPS2552 datasheet](https://www.ti.com/lit/ds/symlink/tps2552.pdf)
- [TI SN74LVC2G32 datasheet](https://www.ti.com/lit/ds/symlink/sn74lvc2g32.pdf)
- [Wurth 865060243005 drawing and specifications](https://www.we-online.com/components/products/datasheet/865060243005.pdf)

The bulk-capacitor footprint follows the manufacturer's 3.5 × 1.6 mm pads with a 2.1 mm inner gap. JLCPCB lists the selected hub IC, CC controllers, logic gates, power switches and bulk capacitors for Economic and Standard assembly. Availability is not reserved. The separate distance module still contains the Standard-only VL53L0X.

## Routing reproduction

`hub-routes.json` holds the final copper, and `hub-route-ports.json` maps its nets to physical pads. `hub-router.ts` transforms both when the hub is placed on a panel, then replays the copper through the normal tscircuit renderer. The renderer regenerates the ground pour and checks the result. The crystal uses four explicit `pcbPath` traces.

To reroute after a placement or connectivity change:

1. Run `HUB_PLACEMENT_ONLY=1 bun build.tsx hub`, then `bun route-hub.ts`. Unconnected-net findings are expected in this intermediate render.
2. Install `requirements-routing.txt`, then run `python prepare-hub-fanouts.py` and `bun check-hub-fanout-geometry.ts`. This reserves the critical controller pin escapes before global routing. The intermediate geometry check excludes the stale ground pour; the final build regenerates and checks it.
3. Run `HUB_INCLUDE_FANOUT=1 bun route-hub.ts`, then `java -Xmx3g -Djava.awt.headless=true -jar freerouting-2.5.0.jar -de output/hub.dsn -do output/hub.ses --gui.enabled=false --router.fanout.enabled=false --router.autorouter.max_passes=60 --router.optimizer.max_threads=2 --router.optimizer.max_passes=3 --profile.allow_telemetry=false`.
4. Run `bun import-hub-routes.ts`, `bun normalize-hub-routes.ts`, `bun run build:hub`, and `bun verify-hub-transform.tsx`. Run `tsci check` and the shorts check on the final circuit JSON.

The final cache includes a local CC1A route and ground stitching; rebuilding the cache after placement changes requires rechecking physical ground continuity. The normalization step joins independently exported vias to their adjoining wire records and asserts that every copper segment and via is preserved. The DSN/SES files are temporary handoffs; checked copper and its pad metadata are committed. Automatic routing uses 0.15 mm nominal traces with 0.1124 mm neck-downs, 0.16 mm copper clearance, 0.21 mm via-to-SMD clearance, and 0.30/0.60 mm vias. Crystal routes are 0.20 mm wide. Mounting exclusions use square bounding boxes to satisfy tscircuit's keepout checks. Locator-hole obstacles include 0.03 mm additional radial margin. A completed search does not establish that all final checks pass.

The 0.11 mm minimum trace-width rule (0.1124 mm narrowest actual copper) exceeds JLCPCB’s published 0.10 mm minimum for 1 oz, two-layer boards ([fabrication capabilities](https://jlcpcb.com/capabilities/pcb-capabilities)). Use 1 oz copper; the thicker-copper rules differ.

## Routing regeneration

The normal build replays the checked `hub-routes.json` through tscircuit's pour and DRC pipeline. `hub-route-ports.json` maps the saved nets by pad positions, so the hub can also be translated or rotated inside a parent panel. `hub-placements.json` holds the compact component coordinates; `hub-layout.ts` contains the single-sheet schematic positions.

`complete-hub-routing.py` can finish local gaps with clearance-aware searches and trace rip-up; its dependencies are in `requirements-routing.txt`. After any manual cache edits, run `bun update-hub-route-metadata.ts`. Always rebuild and run `bun verify-hub.ts` and `tsci check` afterward. A routing search completing is not itself a passing electrical or manufacturing check.

The physical audit (`pip install -r requirements-routing.txt`, then `bun run check:physical`) independently unions pads, wires, vias, internal component connections, and the final ground-pour polygons. It requires every used net, including ground, to form one connected copper network. CI runs this alongside the tscircuit checks.
