import { readFile, writeFile, mkdir } from "node:fs/promises";
import { topSideGerbers } from "../top-side-gerbers";
import { assemblyFiles } from "../assembly-bom";

const name = "compact-resetter";
const directory = "dist/new-devices/" + name;
const board = JSON.parse(await readFile(directory + ".circuit.json", "utf8"));
const { bom, cpl } = assemblyFiles(board);
await mkdir(directory + "/gerbers", { recursive: true });
await writeFile(directory + "/" + name + "-bom.csv", bom);
await writeFile(directory + "/" + name + "-cpl.csv", cpl);
for (const [file, film] of Object.entries(topSideGerbers(board))) {
	await writeFile(directory + "/gerbers/" + file, film);
}
