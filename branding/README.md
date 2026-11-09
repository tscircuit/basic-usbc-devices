# tscircuit board artwork

The official TS mark comes from [tscircuit/design, ts-logo/tsdot.svg](https://github.com/tscircuit/design/blob/main/ts-logo/tsdot.svg), Git blob `10081df29fa1dcff335c226ab6eea66493937096`. The original SVG is retained here. `generate-assets.ts` converts its blue areas to solid white silkscreen, preserving the negative-space t, s and dot. This is the official mark converted to one color, not a newly drawn substitute.

Every board has a 5 mm logo (4.5 mm on the distance module) on the back alongside the exact attribution “Made by AI with tscircuit”, split over two left-aligned lines. Text uses a 1.7 mm font setting and 0.153 mm strokes. Both text and logo are mirrored in top-view manufacturing coordinates so they read normally when viewed from the back. The front has a 4 mm logo, except distance and hub (3 mm), and buzzer (3.5 mm).

`placements.json` records each board's coordinates in millimetres. Artwork avoids exposed pads, plated and nonplated holes, vias, existing legends and front component bodies, with a 0.5 mm board-edge margin. Front marks fit without increasing the board outlines. The build applies `branding.ts` after routing; `refresh-branding.ts` updates checked outputs without rerouting. Panel composition rotates and translates the actual artwork, including its polygon rings.

`verify-branding.py` checks all ten boards, rear mirroring, separation between artwork elements, clearances, and all 20 logos / 20 text lines on panel4. With the local pre-branding baseline available, it also asserts that every non-branding Circuit JSON record is unchanged. The front/back silkscreen PNGs in `output` are rendered from the exported Gerbers and show actual ink, mask openings and mounting holes; back previews are viewed from the back.

Regenerate the artwork assets with `bun branding/generate-assets.ts`. Run `bun run brand`, export boards and panels, then `bun run check`. Placement regeneration requires Shapely and can be run with `python3 branding/place.py`; inspect the Gerber previews after any placement changes.
