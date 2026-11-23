import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { topSideGerbers } from "../top-side-gerbers";
import { assemblyFiles } from "../assembly-bom";

const wifi = process.argv.includes("--esp32");
const slug = wifi ? "esp32-motherboard" : "motherboard";
const dir = "dist/" + slug;
const board = JSON.parse(
  readFileSync(`${dir}/${slug}.circuit.json`, "utf8"),
);
if (
  !board.some(
    (e: any) =>
      e.type === "source_component" &&
      e.name === "U_CPU" &&
      e.manufacturer_part_number === (wifi ? "ESP32-S3-WROOM-1U-N16R8" : "RP2350A"),
  )
)
  throw Error("Unexpected host processor for " + slug);
const { bom, cpl } = assemblyFiles(board);
writeFileSync(`${dir}/${slug}-bom.csv`, bom);
writeFileSync(`${dir}/${slug}-cpl.csv`, cpl);
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
