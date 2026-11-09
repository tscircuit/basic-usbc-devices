# Panel4 stock and cost audit — 9 November 2026

All **252 assembled positions**, grouped into **55 JLCPCB part numbers**, have
manufacturer part numbers, package names and sufficient publicly available order
quantity for **five panels**, including the estimated assembly allowance. This is
a dated stock check, not a reservation or purchase.

Use `output/panel4-bom.csv` and `output/panel4-cpl.csv` together with the **v0.0.7
Gerbers**. The potentiometer footprint and nearby routing changed. Do not use the
new BOM with earlier Gerbers. Map **JLCPCB Part #** explicitly on import; do not
accept a different automatically selected part number. Quantity is **per panel**;
select five assembled panels in the order, without multiplying BOM quantities.

## Replacements and mapping corrections

| Function | Previous part | Selected part | Available order quantity | Unit price at estimated five-panel quantity |
|---|---|---|---:|---:|
| Four hub output capacitors | C1972424, unavailable | [C7469982 / FOSAN FVH010ADA221M0654](https://jlcpcb.com/partdetail/C7469982), 220 µF / 10 V | 5,744 | $0.0360 |
| Absolute-position potentiometer | C209779, zero available order quantity | [C470399 / ALPS RK09K1130D62](https://jlcpcb.com/partdetail/C470399), 10 kΩ linear | 1,497 | $0.9519 |
| Distance status LED controller | C14674 / PCA9536DP,118, $2.2275 | [C3194610 / TI TCA9536DGKR](https://jlcpcb.com/partdetail/C3194610) | 777 | $1.1596 |
| Three CH340C bridges | Uploaded order selected C7464026, zero available order quantity | Retain design's [C84681 / WCH CH340C](https://jlcpcb.com/partdetail/C84681) | 99,047 | $0.5447 |

The FOSAN capacitor retains the 6.3 mm can diameter and is 5.4 mm high. Its
manufacturer land pattern is 3.5 × 1.6 mm with a 1.9 mm gap; the hub now uses that
pattern. The output capacitor remains behind each TPS2552 current-limited switch;
220 µF exceeds the 120 µF minimum port bulk capacitance. Inrush and USB electrical
compliance still need hardware verification. The positive land is on +X in the
custom footprint, opposite the supplier CAD footprint: the CPL includes a 180°
correction. Check all four positive markers in JLCPCB's assembly preview.

The replacement potentiometer has 300° ±5° mechanical travel, a 20 mm-high clear
knurled shaft and 10 mm mounting-lug spacing. Its shaft centre remains (0, 6.5) mm;
the 24 × 30 mm board and common mounting-hole pattern are unchanged. The existing
round 6 mm knob socket and endpoint-calibration protocol still apply. Datasheet:
[ALPS product specifications and drawings](https://tech.alpsalpine.com/e/products/detail/RK09K1130D62/).

The TCA9536 DGK package has the same pin functions and I²C address 0x41 as the
previous expander. Output register 0x01 and configuration register 0x03 preserve
the existing host LED commands. The layout uses TI's 0.45 × 1.4 mm lands at
0.65 mm pitch. [TI datasheet](https://www.ti.com/lit/ds/symlink/tca9536.pdf).
Capacitor dimensional and land-pattern evidence comes from the
[FOSAN FVH catalog, printed pages 8–9 and 46](https://datasheet.lcsc.com/datasheet/pdf/78747037895f4dfcbb69d9b4162e3b9f.pdf?productCode=C7469982).

## Cost review

Estimated components: **$165.7012 for five panels**, approximately **$33.14 per
ten-device panel**. This uses the applicable public quantity-price tier, not a
full-reel or high-volume headline price. Assembly allowances use the uploaded
order quantities where present, otherwise the catalog loss/minimum-patch figures.
JLCPCB determines the final order allowance and quote.

No selected component exceeds **$2.5481 each** at the audited quantities. The
higher-cost items were reviewed:

| Part | Unit cost | Reason retained |
|---|---:|---|
| VL53L0X distance sensor | $2.5481 | Optical time-of-flight sensor for the specified homing range |
| ALPS EC11 encoder | $2.3878 | Projecting D-shaft, detents and push switch for the printable knob |
| CH341T bridge | $1.6208 | Compact USB-to-I²C interface without application firmware |
| TUSB321A, four per hub | $1.4164 | USB-C attachment/orientation control for four downstream ports |
| W25Q16JVSNIQ flash | $1.1661 | Existing RP2040 resetter's compatible boot-flash package |
| TCA9536 | $1.1596 | Replaces the $2.23 status expander with a compatible stocked IC |
| Maintained toggle | $1.1563 | Required projecting lever and maintained switch action |
| RP2040 | $1.0860 | Existing resetter controller |

There are **25 Basic and 30 Extended part types**. The estimate excludes PCB
fabrication, assembly/setup/extended-part charges, X-ray, through-hole soldering,
programming, shipping, tax and the separately purchased LCD. These service costs
can be material on a small order; this is not a final checkout total.

The uploaded spreadsheet's input `JLCPCB Part #` column was empty on all 252 rows.
The previous CSV did contain IDs under `LCSC Part #`, but they were not mapped into
that input column. The new grouped BOM uses the explicit JLCPCB heading. The
uploaded $564.2176 figure adds repeated group costs on individual reference rows.
Counting each matched group once gives $149.1334, **an incomplete subtotal** because
unconfirmed items have zero quantities/prices. Neither figure is a valid complete
comparison against the new estimate.

## Assembly and verification

The [VL53L0X C91199](https://jlcpcb.com/partdetail/C91199) has 20,257 available units,
but requires **Standard assembly and X-ray inspection**. Therefore the complete
panel is **not Economic-PCBA-only**. The other 54 selected part types list Economic
and Standard eligibility; through-hole controls need the corresponding soldering
service. The external BuyDisplay LCD is outside this PCB assembly BOM.

All ten boards and panel4 pass the circuit checks. Physical copper connectivity
is verified, all 468 panel vias have 0.30 mm drills, and the panel remains two
layers, 112 × 140 mm, with four mounting holes per device. Hardware remains untested.

Detailed per-part stock, prices, quantities, timestamps and source links are in
`output/panel4-stock-cost-audit.csv`. The captured catalog data is in
`references/stock-2026-11-09.json`; `python3 audit-bom.py` validates every BOM/CPL
reference and rejects insufficient captured stock or a unit price above the $3
review threshold. Refresh the catalog snapshot before a later purchase. No parts
have been ordered or reserved by this work.
