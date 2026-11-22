import { Circuit } from "tscircuit";
import { runAllChecks } from "@tscircuit/checks";
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg";
import { mkdir, writeFile } from "node:fs/promises";
import SmallIps from "./small-ips.circuit";
import Temperature from "./temperature.circuit";
import Ereader from "./ereader.circuit";
import Speaker from "./speaker.circuit";
const designs = {
  speaker: Speaker,
  temperature: Temperature,
  "small-ips": SmallIps,
  ereader: Ereader,
};
const out = "dist/new-devices";
await mkdir(out, { recursive: true });
for (const name of process.argv.length > 2
  ? process.argv.slice(2)
  : Object.keys(designs)) {
  const Board = designs[name as keyof typeof designs];
  if (!Board) throw Error("Unknown board " + name);
  const circuit = new Circuit();
  circuit.add(<Board />);
  await circuit.renderUntilSettled();
  const json = circuit.getCircuitJson();
  const issues = [
    ...new Set(
      [
        ...json.filter((e) => /_warning$|_error$/.test(e.type)),
        ...(await runAllChecks(json)),
      ].map((e) => ("message" in e ? String(e.message) : JSON.stringify(e))),
    ),
  ];
  await writeFile(out + "/" + name + ".circuit.json", JSON.stringify(json));
  await writeFile(out + "/" + name + ".svg", convertCircuitJsonToPcbSvg(json));
  console.log(name, issues);
  if (issues.length) process.exitCode = 1;
}
