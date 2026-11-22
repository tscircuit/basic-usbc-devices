import { Circuit } from "tscircuit"
import { convertCircuitJsonToPcbSvg, convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { runAllChecks } from "@tscircuit/checks"
import { mkdir, writeFile } from "node:fs/promises"
import { HubBoard } from "../hub.circuit"

const circuit = new Circuit()
circuit.add(<HubBoard embedded routingDisabled={process.argv.includes("--placement")}/>)
await circuit.renderUntilSettled()
const data = circuit.getCircuitJson()
await mkdir("dist/motherboard",{recursive:true})
const prefix="dist/motherboard/motherboard"
await writeFile(prefix+".circuit.json",JSON.stringify(data))
await writeFile(prefix+".svg",convertCircuitJsonToPcbSvg(data))
await writeFile(prefix+".schematic.svg",convertCircuitJsonToSchematicSvg(data))
const issues=[...new Set([...data.filter(e=>/_warning$|_error$/.test(e.type)),...await runAllChecks(data)].map(e=>"message" in e?String(e.message):e.type))]
console.log(issues)
if(issues.length) process.exitCode=1
