import { convertCircuitJsonToPcbSvg } from "circuit-to-svg";
import { Circuit } from "tscircuit";
import { mkdir, writeFile } from "node:fs/promises";
import { runAllChecks } from "@tscircuit/checks";
import VideoPlayer from "./video-player.circuit";
import LargeRgb from "./large-rgb.circuit";
const designs = { "video-player": VideoPlayer, "large-rgb": LargeRgb };
for (const name of process.argv.slice(2).length
  ? process.argv.slice(2)
  : Object.keys(designs)) {
  const Board = designs[name as keyof typeof designs];
  if (!Board) throw Error("Unknown design " + name);
  const circuit = new Circuit();
  circuit.add(<Board />);
  await circuit.renderUntilSettled();
  const data = circuit.getCircuitJson();
  await mkdir("dist/p4-display", { recursive: true });
  await writeFile(
    "dist/p4-display/" + name + ".circuit.json",
    JSON.stringify(data),
  );
  await writeFile(
    "dist/p4-display/" + name + ".svg",
    convertCircuitJsonToPcbSvg(data),
  );
  const findings = [
    ...data.filter((e) => /_error$|_warning$/.test(e.type)),
    ...(await runAllChecks(data)),
  ];
  const messages = [
    ...new Set(
      findings.map((e) => ("message" in e ? String(e.message) : e.type)),
    ),
  ];
  console.log(name, messages);
  // The 104-pin processor and panel connector use the larger ANSI B drawing sheet.
  if (
    findings.some(
      (e) =>
        !(
          e.type === "schematic_sheet_styling_warning" &&
          "message" in e &&
          String(e.message).includes("uses a non-default size")
        ),
    )
  )
    process.exitCode = 1;
}
