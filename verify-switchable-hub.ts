import assert from "node:assert/strict"
import { readFileSync, writeFileSync } from "node:fs"
import { runAllChecks } from "@tscircuit/checks"

const boardName = "switchable-hub"
const json = JSON.parse(readFileSync(`output/${boardName}.circuit.json`, "utf8"))
const of = (type: string): any[] => json.filter((e: any) => e.type === type)
assert.deepEqual(
  json.filter((e: any) => /_(error|warning)$/.test(e.type)),
  [],
)
assert.deepEqual(await runAllChecks(json), [])
const [board] = of("pcb_board")
assert.deepEqual([board.width, board.height, board.num_layers], [66, 46, 4])
assert.deepEqual(
  of("pcb_hole")
    .filter((h) => h.hole_diameter === 2.2)
    .map((h) => [h.x, h.y])
    .sort(),
  [
    [-30, -20],
    [-30, 20],
    [30, -20],
    [30, 20],
  ].sort(),
)

const parts = new Map(of("source_component").map((p) => [p.source_component_id, p]))
const names = new Map(of("source_net").map((n) => [n.source_net_id, n.name]))
const byNet = new Map<string, string[]>()
const pinNet = new Map<string, string>()
const portNames = new Map(
  of("source_port").map((p) => [
    p.source_port_id,
    `${parts.get(p.source_component_id).name}.${p.pin_number}`,
  ]),
)
for (const t of of("source_trace")) {
  // A two-net trace would silently bypass independent switches or change a strap.
  assert.equal(t.connected_source_net_ids.length, 1, t.display_name)
  const n = names.get(t.connected_source_net_ids[0])
  for (const id of t.connected_source_port_ids) {
    const p = portNames.get(id)!
    assert.ok(!pinNet.has(p) || pinNet.get(p) === n, `${p} joins two nets`)
    pinNet.set(p, n)
    byNet.set(n, [...(byNet.get(n) ?? []), p])
  }
}
function pins(n: string, ...ps: string[]) {
  for (const p of ps) assert.equal(pinNet.get(p), n, `${p} should connect to ${n}`)
}
function only(n: string, ...ps: string[]) {
  assert.deepEqual((byNet.get(n) ?? []).toSorted(), ps.toSorted(), n)
}
for (const [p, n] of [
  [24, "CFG_SEL0"],
  [25, "CFG_SEL1"],
  [28, "NON_REM0"],
  [22, "NON_REM1"],
] as const) {
  const resistor = { CFG_SEL0: "R6", CFG_SEL1: "R7", NON_REM0: "R8", NON_REM1: "R9" }[n]
  only(n, `U1.${p}`, `${resistor}.1`)
  pins("GND", `${resistor}.2`)
}
only("HOST_VBUS", "J1.15", "J1.16", "C1.1", "R3.1")
only("VBUS_DET", "R3.2", "R4.1", "U1.27")
only("CC1_0", "J1.6", "R1.1")
only("CC2_0", "J1.12", "R2.1")
pins("GND", "R1.2", "R2.2", "R4.2", "J6.2", "U1.37", "U2.2")
pins("EXT_5V", "J6.1", "U2.1", "U2.3")
pins("V3V3", "U2.5", ...[5, 10, 15, 23, 29, 36].map((p) => `U1.${p}`))
only("CRFILT", "U1.14", "C11.1")
only("PLLFILT", "U1.34", "C12.1")
only("RBIAS", "U1.35", "R5.1")
assert.equal(of("source_component").find((p) => p.name === "R5").resistance, 12000)

for (let i = 0; i <= 4; i++) {
  const j = `J${i + 1}`,
    d = `D${i + 1}`
  only(`DP${i}`, `${j}.8`, `${j}.10`, `${d}.1`, `U1.${[31, 2, 4, 7, 9][i]}`)
  only(`DM${i}`, `${j}.7`, `${j}.9`, `${d}.2`, `U1.${[30, 1, 3, 6, 8][i]}`)
  pins("GND", `${d}.3`, ...[1, 2, 3, 4, 13, 14].map((p) => `${j}.${p}`))
  if (i === 0) continue
  const u = `U${i + 2}`,
    b = 20 + 10 * (i - 1)
  only(`EN${i}`, `U1.${[12, 16, 18, 20][i - 1]}`, `${u}.4`, `R${b + 1}.1`)
  only(`OC${i}_N`, `U1.${[13, 17, 19, 21][i - 1]}`, `${u}.5`)
  only(`CC1_${i}`, `${j}.6`, `${u}.9`)
  only(`CC2_${i}`, `${j}.12`, `${u}.11`)
  only(`REF${i}`, `${u}.8`, `R${b}.1`)
  // The OUT pin alone feeds the receptacle, local ceramic, bleeder and indicator.
  only(`VBUS${i}`, `${j}.15`, `${j}.16`, `${u}.12`, `C${b + 2}.1`, `R${b + 2}.1`, `R${b + 3}.1`)
  only(`LED${i}_A`, `R${b + 3}.2`, `LED${i}.1`)
  pins("EXT_5V", `${u}.1`, `${u}.2`, `${u}.3`, `C${b}.1`, `C${b + 1}.1`)
  pins("GND", `${u}.10`, `${u}.13`, `R${b}.2`, `R${b + 1}.2`, `R${b + 2}.2`, `LED${i}.2`)
  assert.equal(
    of("source_component").find((p) => p.name === `R${b}`).manufacturer_part_number,
    "RT0603BRD07100KL",
  )
  assert.equal(of("source_component").find((p) => p.name === `R${b + 2}`).resistance, 1000)
}

assert.deepEqual(
  of("pcb_copper_pour")
    .map((p) => [p.layer, names.get(p.source_net_id)])
    .sort(),
  [
    ["inner1", "GND"],
    ["inner2", "EXT_5V"],
  ],
)
for (const via of of("pcb_via")) {
  assert.equal(via.hole_diameter, 0.3)
  assert.equal(via.outer_diameter, 0.6)
  assert.deepEqual(via.layers.toSorted(), ["bottom", "inner1", "inner2", "top"])
}

// Walk copper centerlines from each PHY pin to the two contact rows of the
// reversible receptacle. Both orientations must have a closely matched pair.
const pcbPins = new Map(of("pcb_port").map((p) => [portNames.get(p.source_port_id)!, p]))
const vertex = (x: number, y: number) => `${Math.round(x * 1000)},${Math.round(y * 1000)}`
function pairLengths(n: string, start: string, contactA: string, contactB: string) {
  const edges = new Map<string, Map<string, number>>()
  const netId = of("source_net").find((e) => e.name === n).source_net_id
  const sourceIds = new Set([
    netId,
    ...of("source_trace")
      .filter((t) => t.connected_source_net_ids.includes(netId))
      .map((t) => t.source_trace_id),
  ])
  for (const trace of of("pcb_trace").filter((t) => sourceIds.has(t.source_trace_id))) {
    for (const p of trace.route) assert.ok(p.route_type === "wire" && p.layer === "top", n)
    for (let i = 1; i < trace.route.length; i++) {
      const a = trace.route[i - 1],
        b = trace.route[i],
        va = vertex(a.x, a.y),
        vb = vertex(b.x, b.y)
      const length = Math.hypot(a.x - b.x, a.y - b.y)
      for (const [from, to] of [
        [va, vb],
        [vb, va],
      ]) {
        if (!edges.has(from)) edges.set(from, new Map())
        edges.get(from)!.set(to, length)
      }
    }
  }
  const key = (pin: string) => vertex(pcbPins.get(pin).x, pcbPins.get(pin).y)
  const distance = new Map<string, number>([[key(start), 0]])
  const pending = new Set(edges.keys())
  while (pending.size) {
    const current = [...pending].reduce((a, b) =>
      (distance.get(a) ?? Infinity) < (distance.get(b) ?? Infinity) ? a : b,
    )
    pending.delete(current)
    for (const [next, length] of edges.get(current)!) {
      const proposed = (distance.get(current) ?? Infinity) + length
      if (proposed < (distance.get(next) ?? Infinity)) distance.set(next, proposed)
    }
  }
  return [contactA, contactB].map((p) => {
    const d = distance.get(key(p))
    assert.ok(d !== undefined && Number.isFinite(d), `${n} has no copper path to ${p}`)
    return d
  })
}
const usbPairs = Array.from({ length: 5 }, (_, i) => {
  const j = `J${i + 1}`
  const dp = pairLengths(`DP${i}`, `U1.${[31, 2, 4, 7, 9][i]}`, `${j}.8`, `${j}.10`)
  const dm = pairLengths(`DM${i}`, `U1.${[30, 1, 3, 6, 8][i]}`, `${j}.9`, `${j}.7`)
  const skewMm = dp.map((d, k) => Number(Math.abs(d - dm[k]).toFixed(3)))
  assert.ok(
    skewMm.every((s) => s < 0.1),
    `${j} differential skew ${skewMm} mm`,
  )
  return { connector: j, skewMm }
})
const sheets = of("schematic_sheet")
assert.equal(sheets.length, 2)
for (const s of sheets)
  assert.ok(of("schematic_component").some((c) => c.schematic_sheet_id === s.schematic_sheet_id))
const fab = (file: string) => readFileSync(`output/${boardName}-gerbers/${file}`, "utf8")
for (const [file, layer] of [
  ["F_Cu", "L1,Top"],
  ["In1_Cu", "L2,Inr"],
  ["In2_Cu", "L3,Inr"],
  ["B_Cu", "L4,Bot"],
]) {
  const gerber = fab(`${file}.gbr`)
  assert.ok(gerber.includes(`TF.FileFunction,Copper,${layer}`), file)
  assert.ok(gerber.includes(file.startsWith("In") ? "G36*" : "D01*"), file)
}
assert.ok(fab("drill-L1-L4.drl").includes("TF.FileFunction,Plated,1,4,PTH"))
assert.ok(fab("drill_npth.drl").includes("TF.FileFunction,NonPlated,1,4,NPTH"))

const report = {
  components: parts.size,
  copperLayers: 4,
  traces: of("pcb_trace").length,
  vias: of("pcb_via").length,
  usbPairs,
  renderFindings: 0,
  checkFindings: 0,
  hardwareTested: false,
}
writeFileSync(`output/${boardName}.validation.json`, JSON.stringify(report, null, 2) + "\n")
console.log(report)
