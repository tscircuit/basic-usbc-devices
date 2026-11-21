# Compact USB devices

Use a 10 mm mounting grid on every new device. For enclosure CAD, put the first mounting-hole center at (0, 0) and dimension every other hole from that point in whole 10 mm steps. The board outline and the connector center may fall between grid lines.

Use Ø2.2 mm unplated clearance holes for M2 screws. Start with two holes 10 mm apart for small rigid accessories. Use four holes for a rotary control, toggle or cable-loaded board when needed to resist twisting. Allow screw-head and printed-boss clearance on both sides. Keep the FPC bend, cable plug, sensor aperture and moving actuator clear in the mounted assembly.

| Device | First layout to try | What sets the lower bound |
| --- | --- | --- |
| Button, buzzer, distance sensor | Two holes on 10 mm centers | USB shell and retention tabs, actuator or acoustic opening, sensor field of view |
| Rotary encoder, potentiometer, toggle, limit switch | 10 × 20 mm hole rectangle | Control body, shaft load and lever travel |
| Display carriers | Start at 10 × 20 mm, widen in 10 mm steps | FPC latch access, bend allowance, backlight power and cable exit |
| Hub and resetter | Fit receptacles and plugs first, then use a four-hole rectangle | Adjacent USB plugs, power routing and connector insertion forces |

These are mounting spans for layout studies. Determine each finished outline from the actual parts, routing, fastener clearance and printed fit test. The 0.0.8 button fix uses the existing mount for replacement compatibility.

The first routed study is `compact-button.circuit.tsx`, a 20 × 26 mm version of the 24 × 30 mm button. Its two Ø2.2 mm mounting holes are at (−7.5, −6) and (−7.5, 4) mm relative to the board center. Each has a 2.3 mm keepout radius. This study has a separate entry point for enclosure and bench evaluation.
