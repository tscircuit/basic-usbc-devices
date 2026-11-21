import assert from "node:assert/strict"
import { runAllChecks } from "@tscircuit/checks"
import { Circuit } from "tscircuit"
import CompactButton from "./compact-button.circuit"

const circuit = new Circuit()
circuit.add(<CompactButton />)
await circuit.renderUntilSettled()
const elements = circuit.getCircuitJson()
const findings = [
  ...elements.filter(e => e.type.endsWith("_warning") || e.type.endsWith("_error")),
  ...await runAllChecks(elements),
]
assert.deepEqual(findings, [])
const board = elements.find(e => e.type === "pcb_board")
assert.deepEqual([board?.width, board?.height], [20, 26])
const mounts = elements.filter(e => e.type === "pcb_hole").filter(e => e.hole_shape === "circle" && e.hole_diameter === 2.2)
assert.deepEqual(mounts.map(e => [e.x, e.y]), [[-7.5, -6], [-7.5, 4]])
