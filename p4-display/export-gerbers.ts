import { mkdir, readFile, writeFile } from "node:fs/promises";
import { topSideGerbers } from "../top-side-gerbers";
import type { AnyCircuitElement } from "circuit-json";

for (const name of ["video-player", "large-rgb"]) {
  const dir = "dist/p4-display";
  const data: AnyCircuitElement[] = JSON.parse(
    await readFile(dir + "/" + name + ".circuit.json", "utf8"),
  );
  const output = dir + "/" + name + "-gerbers";
  await mkdir(output, { recursive: true });
  for (const [file, contents] of Object.entries(topSideGerbers(data))) {
    await writeFile(output + "/" + file, contents);
  }
}
