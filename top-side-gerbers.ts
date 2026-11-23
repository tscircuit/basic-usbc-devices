import { convertCircuitJsonToGerberFiles } from "circuit-json-to-gerber";
import type { AnyCircuitElement } from "circuit-json";

export function topSideGerbers(data: AnyCircuitElement[]) {
  // Single-sided stencil. The default connector geometry also generates
  // bottom paste openings for its through-hole shell tabs and service pads.
  const films = data.filter(
    (item) => item.type !== "pcb_solder_paste" || item.layer !== "bottom",
  );
  // Buried copper has no mask film. An uncovered pour would request an
  // opening in a nonexistent inner-layer solder mask from the Gerber writer.
  return convertCircuitJsonToGerberFiles(
    films.map((item) =>
      item.type === "pcb_copper_pour" && item.layer.startsWith("inner")
        ? { ...item, covered_with_solder_mask: true }
        : item,
    ),
  );
}
