import { Circuit } from "tscircuit"
import { convertCircuitJsonToPcbSvg, convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { runAllChecks } from "@tscircuit/checks"
import { mkdir, writeFile } from "node:fs/promises"
import { HubBoard } from "../hub.circuit"

import { checkFrontEdge } from "./check-front-edge"
import { checkMotherboardNetlist } from "./check-netlist"

const wifi = process.argv.includes("--esp32")
const slug = wifi ? "esp32-motherboard" : "motherboard"
const circuit = new Circuit()
circuit.add(<HubBoard embedded wifi={wifi} routingDisabled={process.argv.includes("--placement")}/>)
await circuit.renderUntilSettled()
const data = circuit.getCircuitJson()
checkMotherboardNetlist(data, wifi)
checkFrontEdge(data)
await mkdir("dist/"+slug,{recursive:true})
const prefix=`dist/${slug}/${slug}`
await writeFile(prefix+".circuit.json",JSON.stringify(data))
await writeFile(prefix+".svg",convertCircuitJsonToPcbSvg(data))
await writeFile(prefix+".schematic.svg",convertCircuitJsonToSchematicSvg(data))
const issues=[...new Set([...data.filter(e=>/_warning$|_error$/.test(e.type)),...await runAllChecks(data)].map(e=>"message" in e?String(e.message):e.type))]
console.log(issues)
if(issues.length) process.exitCode=1
