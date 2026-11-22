import { readFileSync,writeFileSync,mkdirSync } from "node:fs"
import { convertCircuitJsonToGerberFiles } from "circuit-json-to-gerber"
import { assemblyFiles,csv } from "../assembly-bom"

const dir="dist/motherboard"
const board=JSON.parse(readFileSync(dir+"/motherboard.circuit.json","utf8"))
const stamp=board.find((e:any)=>e.type==="source_component" && e.name==="U_CPU")
if (stamp?.manufacturer_part_number!=="RP2350 Stamp") throw Error("Missing processor module")
const position=board.find((e:any)=>e.type==="pcb_component" && e.source_component_id===stamp.source_component_id)
const standard=board.filter((e:any)=>e!==stamp)
const {bom,cpl}=assemblyFiles(standard)
writeFileSync(dir+"/motherboard-bom.csv",bom)
writeFileSync(dir+"/motherboard-cpl.csv",cpl)
writeFileSync(dir+"/motherboard-manual-assembly.csv",csv([
 ["Designator","Manufacturer","Module","Side","X (mm)","Y (mm)","Rotation (deg)"],
 [stamp.name,"Solder Party",stamp.manufacturer_part_number,position.layer,position.center.x,position.center.y,position.rotation??0],
]))
mkdirSync(dir+"/gerbers",{recursive:true})
for (const [file,content] of Object.entries(convertCircuitJsonToGerberFiles(board))) writeFileSync(dir+"/gerbers/"+file,content)
