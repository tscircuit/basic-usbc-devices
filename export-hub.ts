import { convertCircuitJsonToGerberFiles } from 'circuit-json-to-gerber'
import {readFile,writeFile,mkdir} from 'node:fs/promises'
const name='hub'
const cj=JSON.parse(await readFile('output/hub.circuit.json','utf8'))
 const files=convertCircuitJsonToGerberFiles(cj)
 await mkdir(`output/${name}-gerbers`,{recursive:true})
 for(const [file,content] of Object.entries(files)) await writeFile(`output/${name}-gerbers/${file}`,content)
 console.log(name,Object.keys(files))
 const csv=(rows:any[][])=>rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n'
 const bom:any[][]=[['Comment','Designator','Footprint','LCSC Part #']]
 const cpl:any[][]=[['Designator','Mid X','Mid Y','Layer','Rotation']]
 for(const part of cj.filter((e:any)=>e.type==='source_component'&&e.supplier_part_numbers?.jlcpcb?.length)){
  const pcb=cj.find((e:any)=>e.type==='pcb_component'&&e.source_component_id===part.source_component_id)
  bom.push([part.manufacturer_part_number??part.name,part.name,pcb?.footprinter_string??part.manufacturer_part_number,part.supplier_part_numbers.jlcpcb[0]])
  cpl.push([part.name,`${pcb.center.x.toFixed(4)}mm`,`${pcb.center.y.toFixed(4)}mm`,pcb.layer==='bottom'?'Bottom':'Top',pcb.rotation??0])
 }
 await writeFile(`output/${name}-bom.csv`,csv(bom))
 await writeFile(`output/${name}-cpl.csv`,csv(cpl))
