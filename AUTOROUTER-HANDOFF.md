# USB device autorouter handoff

The November 22 audit covered 18 layouts. Pipeline 9 could not complete the four-port hub. Four more boards routed with electrical or copper-clearance violations. Six others passed physical continuity and short checks but failed the project's trace-angle check. Each row below has an independent PR, the original public bug report and the pinned hardware source.

## Compact USB resetter

The initial two-layer routing input drops the crystal net's zero-via constraint. Pipeline 9 uses two vias on XTAL_OUT. In the autorouter PR, run `bun fixtures/bug-reports/bugreport112-28cf0a/reproduce.ts`. Trace the missing constraint through core's SimpleRouteJson export and the solver. Verify all three XTAL_OUT pins connect on top, then check the plotted Gerbers for opens and shorts. [Reproduction PR #4165](https://github.com/tscircuit/tscircuit-autorouter/pull/4165) · [Original routing input](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=28cf0a7c-24eb-441d-84ff-7b90d96bd0a3)

## Direct-mounted RP2350A revision

The RP2350A revision adds a separate 12 MHz crystal for the processor. Pipeline 9 routed CORE_XIN and XTAL_OUT through two vias each. CORE_XIN also exceeded 10 mm in the board build. The original Stamp motherboard repro below exercises the hub oscillator.

- [PR #4144 with the Cosmos fixture](https://github.com/tscircuit/tscircuit-autorouter/pull/4144) and [captured routing input](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=93b336d7-63fc-4422-9a98-38546708e123).
- Check out the PR, install dependencies and run `bun fixtures/bug-reports/bugreport131-93b336/reproduce.ts`. Check how the zero-via and length limits reach the simplified connections, then verify the solver honors them. The motherboard now gives the oscillator explicit top-layer paths.

- The [fully placed switch revision](https://github.com/tscircuit/basic-usbc-devices/tree/1aacad3/motherboard) has a [second report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=2cbaf60a-6b88-49fe-bfe4-591b7b8fa8de) in the same PR. Run `bun fixtures/bug-reports/bugreport132-2cbaf6/reproduce.ts`. Pipeline 9 fails to connect FLASH_IO1 (U_CPU pin 59 to U_FLASH pin 2) and its fallback fails at cmn_229. Success requires a complete route, zero shorts and zero disconnected nets in the independent physical audit.

### SWD and microSD layout

The 88 × 46 mm motherboard removes both USB multiplexers, adds J_SWD and J_SD and uses a through-hole edge power switch. The default autorouter returned traces. Clearance checks failed and the independent copper audit found physical shorts, including FLASH_CS to DP0 on inner2. Keep fabrication export blocked until that audit passes.

- [Router fixture in PR #4144](https://github.com/tscircuit/tscircuit-autorouter/pull/4144), [exact submitted routing input](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=43ae842c-60a6-483a-adbc-dc77c99cb23c).
- In the autorouter checkout, run `bun fixtures/bug-reports/bugreport133-43ae84/reproduce.ts`. In this hardware checkout, run `bun motherboard/build.tsx`, then `python3 verify-module-copper.py --directory dist/motherboard --check-shorts motherboard`. Check all four layers, including the fixed crystal traces and generated vias. Require zero shorts, disconnected nets and clearance errors before generating Gerbers.

### Compact front-loading microSD revision

The 76 × 46 mm board has J1, the power lever and the card slot on its front edge. Placement and package-pin checks pass. Pipeline 9 exhausts 200 rip-up attempts and the regional fallback fails at `cmn_40`. The partial board also reports contact between the bottom ground pour and the flash chip-select trace. This failure is preserved in the router fixture. The released board uses the checked routes in `motherboard/copper.json` with ground on inner layer 1. Both the routed Circuit JSON and the exported Gerbers pass independent connectivity checks.

- [Exact routing input](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=350521c5-f57e-40dd-8a5b-33fa28ea56bf) and [motherboard reproduction PR #4144](https://github.com/tscircuit/tscircuit-autorouter/pull/4144).
- Run `bun fixtures/bug-reports/bugreport134-350521/reproduce.ts` in the router PR. To exercise a new solver on this board, replace the embedded board’s saved router with `"auto-local"`, then run `bun motherboard/build.tsx` and `python3 verify-module-copper.py --directory dist/motherboard --check-shorts motherboard`. Check the ground pour after routing, require zero disconnected nets and shorts, and retain the front-edge mechanical checks.

## Reproduce one board

Choose a PR number from the table. In a checkout of `tscircuit/tscircuit-autorouter`, run:

```sh
pr=4130
gh pr checkout "$pr"
bun install --frozen-lockfile
fixture=$(gh pr view "$pr" --json files --jq '.files[].path | select(endswith("/reproduce.ts"))')
bun "$fixture"
```

The command currently exits 1 with the named defect. After the fix it should exit 0. For the graphical debugger, run `bun run start`, open the Cosmos fixture in the same directory and select Pipeline 9. The JSON beside it is the captured router input. Each PR can be checked out on its own.

## Cases to assign

| Board source | Reproduction | Observed result and fix target |
| --- | --- | --- |
| [Four-port USB hub](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/hub.circuit.tsx) | [#4130](https://github.com/tscircuit/tscircuit-autorouter/pull/4130) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=0535adf0-8deb-4d71-82db-27c320495fb7) | High-density routing fails on GND branch `source_net_0_mst76` in B01. Regional fallback fails at `cmn_29`. The board reports 302 unconnected ports. Route the whole board and verify GND continuity. |
| [USB-C speaker](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/new-devices/speaker.circuit.tsx) | [#4131](https://github.com/tscircuit/tscircuit-autorouter/pull/4131) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=62c8ae18-08af-4a22-80c7-9fef297e929e) | Three XTI/XTO branches take two vias each. Both crystal nets require zero vias. |
| [RP2350 USB Motherboard](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/hub.circuit.tsx) | [#4132](https://github.com/tscircuit/tscircuit-autorouter/pull/4132) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=76a50565-95a5-4230-9afa-f174611e8482) | The XO crystal branch to C6.1 takes two vias. It requires zero. |
| [7-inch RGB display](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/p4-display/large-rgb.circuit.tsx) | [#4133](https://github.com/tscircuit/tscircuit-autorouter/pull/4133) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=4d61a061-152e-43b0-bb60-2a29c0711174) | FXP and FXN each take two vias. Both require zero. The FXN branch also measures 10.64 mm against a 10 mm limit. |
| [Distance sensor](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/distance.circuit.tsx) | [#4134](https://github.com/tscircuit/tscircuit-autorouter/pull/4134) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=aad734f9-81ab-489a-b6bb-e9efc0a9a71c) | Via lands at (4.782, 14.421) and (11.461, −2.018) mm clear the edge by 0.279 and 0.239 mm. Both must clear it by at least 0.300 mm. |
| [3.5-inch video player](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/p4-display/video-player.circuit.tsx) | [#4135](https://github.com/tscircuit/tscircuit-autorouter/pull/4135) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=2789c6f3-bcc2-406f-92ff-d53f4533b584) | 30 trace-angle findings. The WR segment measures 10.17 mm at 96.76°. |
| [5.83-inch e-reader](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/new-devices/ereader.circuit.tsx) | [#4136](https://github.com/tscircuit/tscircuit-autorouter/pull/4136) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=511b60ad-1eed-4316-8414-246a82d5286a) | 4 trace-angle findings. One bottom segment measures 5.61 mm at 230.06°. |
| [3.5-inch flex display](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/display.circuit.tsx) | [#4137](https://github.com/tscircuit/tscircuit-autorouter/pull/4137) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=70634474-dacb-454b-8421-506d77bc2853) | 5 trace-angle findings. One bottom segment measures 5.75 mm at 30.62°. |
| [Rotary encoder](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/dial.circuit.tsx) | [#4138](https://github.com/tscircuit/tscircuit-autorouter/pull/4138) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=4dc54316-8f9d-4c8b-ac20-b0236ff11e62) | 2 trace-angle findings. One top segment measures 6.08 mm at 204.15°. |
| [Potentiometer](https://github.com/tscircuit/basic-usbc-devices/blob/4a134c7046b91a66ba77106b4bca589d7c00aaa8/position.circuit.tsx) | [#4139](https://github.com/tscircuit/tscircuit-autorouter/pull/4139) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=7158319e-de21-4d1e-8ee5-c8e2d2a0f70e) | 2 trace-angle findings. One top segment measures 5.22 mm at 264.51°. |
| [Compact pushbutton](https://github.com/tscircuit/basic-usbc-devices/blob/1cad4c4a3072661d1b668b8998d1cfa033275587/compact-button.circuit.tsx) | [#4140](https://github.com/tscircuit/tscircuit-autorouter/pull/4140) · [report](https://api.tscircuit.com/autorouting/bug_reports/view?autorouting_bug_report_id=15c0ffc4-9c52-4fe9-a020-1dc7d557ce7e) | 1 trace-angle finding. A 5.84 mm bottom VBUS segment deviates by 12.28°. |

## Where to investigate

- **Hub**. Examine the failed high-density connection and regional retry. Verify that every required pad has copper connectivity after pouring GND.
- **Crystal constraints**. The source Circuit JSON specifies `max_via_count: 0`. The public Simple Route JSON captures omit that limit on the affected connections. Trace the constraint through Core's `getSimpleRouteJsonFromCircuitJson`, then through the router's connection splitting and output. Rebuild from TSX to verify the full contract. Keep the original bug-report input as a record of what Core supplied.
- **Distance sensor**. Check the clearance from the outer copper of the via land to the board edge. Use the land radius when checking candidate via locations.
- **Trace angles**. All six style cases must produce zero `checkPcbTraceStyle` warnings. The board flags segments longer than 5 mm when the angle deviates more than 4° from the nearest multiple of 45°. Start with the single compact-button warning, then replay the other five boards before generalizing the fix.

## Verify a fix against the hardware

The captures use the [board revision](https://github.com/tscircuit/basic-usbc-devices/tree/4a134c7046b91a66ba77106b4bca589d7c00aaa8) and [compact button revision](https://github.com/tscircuit/basic-usbc-devices/tree/1cad4c4a3072661d1b668b8998d1cfa033275587). The boards used `tscircuit@0.0.3271`, Core `0.0.2450`, checks `0.0.268` and capacity-autorouter `0.0.1147`. All eleven defects also reproduced on [upstream Pipeline 9, version 0.0.1157](https://github.com/tscircuit/tscircuit-autorouter/commit/e0a8be662f59c297fee9395691049b4da95e0b6a).

1. Build the board with the patched router. For boards that replay saved copper via a custom router, set `autorouter="auto-local"` on the root `<board>` for the audit. Keep explicit traces, placement, layer count, mounting holes and board rules. The four-port hub uses `HubBoard({embedded: false})`. The motherboard uses `HubBoard({embedded: true})`.
2. Run `renderUntilSettled()`, inspect errors on the board's Circuit JSON, then run `runAllChecks` from `@tscircuit/checks`. Save the final poured layout as `<board>.circuit.json`. Confirm the target finding is gone and compare the other findings with the PR baseline.
3. In the hardware repo, install `requirements-routing.txt` and run `python3 verify-module-copper.py --check-shorts --directory <output-dir> <board>`. Require zero disconnected nets and zero copper shorts. A solver success alone cannot establish these.
4. For a fresh failing revision, capture `simpleRouteJson` from the board's `autorouting:start` event and submit it with `tsci report autorouter <capture.json> --title "<board and failure>" --yes`. Use the default tscircuit router for new routing work.

## Layouts without a PR

The standard pushbutton, toggle switch, limit switch, variable-frequency buzzer, 2.8-inch IPS display and temperature sensor passed the default-route audit. The compact pushbutton is a separate revision with its own PR above.

The USB resetter ships from an archived 42 × 42 mm Circuit JSON. Its replay kept 70 preloaded traces (17 fixed traces and 53 ground fanouts) and rerouted the remaining 44 connections. Both router versions completed. Upstream's relaxed routing DRC and trace-style check returned zero findings. This covers the archived board with its fixed copper. A fresh end-to-end TSX build of that board was not verified.
