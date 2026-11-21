import { parseDsnToDsnJson } from "dsn-converter";
import { readFileSync, writeFileSync } from "node:fs";
const board = process.argv[2],
  prefix = "dist/p4-display/" + board;
if (!["video-player", "large-rgb"].includes(board))
  throw Error("Pass video-player or large-rgb");
const base = JSON.parse(readFileSync(prefix + ".circuit.json", "utf8"));
const sourceMap = JSON.parse(readFileSync(prefix + ".map.json", "utf8"));
const ses = parseDsnToDsnJson(readFileSync(prefix + ".ses", "utf8"));
if (!ses.is_dsn_session) throw Error("Invalid SES");
const r = ses.routes.resolution;
if (r.unit !== "um") throw Error("Expected micrometres");
const mul = 0.001 / r.value;
const convert = (x: number) => Number((x * mul).toFixed(5));
const layer = {
  "F.Cu": "top",
  "In1.Cu": "inner1",
  "In2.Cu": "inner2",
  "B.Cu": "bottom",
};
const sources = base.filter((e: any) => e.type === "source_trace");
const pps = base.filter((e: any) => e.type === "pcb_port");
// Reserve 0.5 mm in the router. Finish with a 0.45 mm land and 0.20 mm drill.
const viadia = 0.45,
  drill = 0.2;
const data: any = {};
for (const net of ses.routes.network_out.nets) {
  if (net.name.startsWith("NC_") || !(net.wires.length || net.vias?.length))
    continue;
  const id = sourceMap[net.name];
  if (!id) throw Error(net.name);
  const src = sources.find((e: any) => e.source_trace_id === id);
  const port = pps.find((e: any) =>
    src.connected_source_port_ids.includes(e.source_port_id),
  );
  const paths = net.wires.map((wire: any) => {
    const path = wire.path ?? wire.polyline_path;
    if (!path) throw Error("Missing wire path");
    return [
      layer[path.layer as keyof typeof layer],
      convert(path.width),
      ...path.coordinates.map(convert),
    ];
  });
  const vias = (net.vias ?? []).map((v: any) => [convert(v.x), convert(v.y)]);
  data[net.name] = { anchor: [port.x, port.y], paths, vias };
}
writeFileSync(
  "p4-display/" + board + "-copper.json",
  JSON.stringify({ viadia, drill, nets: data }) + "\n",
);
