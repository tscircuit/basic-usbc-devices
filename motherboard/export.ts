import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { topSideGerbers } from "../top-side-gerbers";
import { assemblyFiles } from "../assembly-bom";

const dir = "dist/motherboard";
const board = JSON.parse(
  readFileSync(dir + "/motherboard.circuit.json", "utf8"),
);
if (
  !board.some(
    (e: any) =>
      e.type === "source_component" &&
      e.name === "U_CPU" &&
      e.manufacturer_part_number === "RP2350A",
  )
)
  throw Error("Expected the direct-mounted RP2350A");
const { bom, cpl } = assemblyFiles(board);
writeFileSync(dir + "/motherboard-bom.csv", bom);
writeFileSync(dir + "/motherboard-cpl.csv", cpl);
if (
  !board.some((e: any) => e.type === "pcb_trace") ||
  board.some(
    (e: any) => e.type.endsWith("_error") || e.type.endsWith("_warning"),
  )
)
  throw Error(
    "Fabrication export requires a fully routed motherboard with clean design checks.",
  );
mkdirSync(dir + "/gerbers", { recursive: true });
for (const [file, content] of Object.entries(topSideGerbers(board)))
  writeFileSync(dir + "/gerbers/" + file, content);
