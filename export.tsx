import polygonClipping from 'polygon-clipping'
import { Circuit } from 'tscircuit'
import { convertCircuitJsonToGerberFiles } from 'circuit-json-to-gerber'
import { convertCircuitJsonToPcbSvg } from 'circuit-to-svg'
import {runPanelChecks} from './check-panel'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import * as rowPanel from './panel.circuit'
import * as gridPanel from './panel2'
import * as hubPanel from './panel3'
import * as allPanel from './panel4'
const panelName=process.argv[2]??'panel'
if(!['panel','panel2','panel3','panel4'].includes(panelName))throw new Error('Expected panel, panel2, panel3, or panel4')
const {PanelFrame,panelSize,modules}=panelName==='panel4'?allPanel:panelName==='panel3'?hubPanel:panelName==='panel2'?gridPanel:rowPanel
import {composePanel} from './compose-panel'
const raw=composePanel(modules)
const frame=new Circuit();frame.add(<PanelFrame/>);await frame.renderUntilSettled()
const mechanical=frame.getCircuitJson().filter((e:any)=>['pcb_cutout','pcb_hole','pcb_smtpad','pcb_solder_mask'].includes(e.type)).map((original:any)=>{
 const e={...original};delete e.subcircuit_id
 if(e.type==='pcb_smtpad'){e.is_covered_with_solder_mask=false;e.soldermask_margin=0.5}
 const idKey=`${e.type}_id`;e[idKey]=`panel_${e[idKey]}`
 return e
})
const rects=mechanical.filter((e:any)=>e.type==='pcb_cutout') as any[]
const rectangles=rects.map(e=>{const x=e.center.x,y=e.center.y,w=e.width/2,h=e.height/2;return [[[x-w,y-h],[x+w,y-h],[x+w,y+h],[x-w,y+h],[x-w,y-h]]]})
const merged=polygonClipping.union(rectangles[0] as any,...rectangles.slice(1) as any)
raw.push(...mechanical.filter((e:any)=>e.type!=='pcb_cutout'))
merged.forEach((polygon:any,i:number)=>raw.push({type:'pcb_cutout',pcb_cutout_id:`panel_slot_${i}`,shape:'polygon',points:polygon[0].slice(0,-1).map(([x,y]:number[])=>({x,y}))} as any))
await writeFile(`output/${panelName}.design.json`,JSON.stringify(raw,null,2))
// A fabrication panel is ONE physical PCB. The checks API otherwise applies
// its first pcb_board boundary to every module on a multi-board panel.
// Keep all copper, drills and cutouts; replace only the board envelopes.
const boards=raw.filter((e:any)=>e.type==='pcb_board') as any[]
const prefixes=new Map(boards.map((b,i)=>[b.subcircuit_id,['L','B','T','E','A','D','H','S','R','Z'][i]]))
const refs=new Map<string,{old:string,new:string}>()
const counts:Record<string,number>={}
for(const e of raw as any[]) if(e.type==='source_component'){
 const prefix=e.name.match(/^[A-Za-z]+/)?.[0]??'U'
 const num=(counts[prefix]=(counts[prefix]??0)+1)
 refs.set(e.source_component_id,{old:e.name,new:`${prefix}${num}`})
}
const pcToSc=new Map((raw as any[]).filter(e=>e.type==='pcb_component').map(e=>[e.pcb_component_id,e.source_component_id]))
const json:any[]=JSON.parse(JSON.stringify(raw)).filter((e:any)=>e.type!=='pcb_board'&&e.type!=='pcb_panel'&&!e.type.startsWith('schematic_'))
json.unshift({...boards[0],pcb_board_id:'pcb_board_panel',center:{x:0,y:0},...panelSize,...(panelName==='panel4'?{min_trace_to_pad_edge_clearance:.1,min_pad_edge_to_pad_edge_clearance:.1,min_via_edge_to_pad_edge_clearance:.1,min_board_edge_clearance:.2}:{}),min_trace_width:panelName==='panel4'?.1:panelName==='panel3'?.11:.2,subcircuit_id:undefined,position_mode:undefined,display_offset_x:undefined,display_offset_y:undefined})
for(const e of json){
 if(e.type==='source_net') e.name=`${prefixes.get(e.subcircuit_id)??'P'}_${e.name}`
 if(e.type==='source_component')e.name=refs.get(e.source_component_id)!.new
 if(e.type==='pcb_silkscreen_text'){
  const ref=refs.get(pcToSc.get(e.pcb_component_id)!)
  if(ref&&e.text===ref.old)e.text=ref.new
 }
 if(e.pcb_panel_id){delete e.pcb_panel_id;e.pcb_board_id='pcb_board_panel'}
}
await writeFile(`output/${panelName}.circuit.json`,JSON.stringify(json,null,2))
await writeFile(`output/${panelName}.pcb.svg`,convertCircuitJsonToPcbSvg(json))
const errors=raw.filter((e:any)=>e.type.endsWith('_error')||e.type.endsWith('_warning'))
const checks=await runPanelChecks(json,boards)
await writeFile(`output/${panelName}.checks.json`,JSON.stringify({render:errors,checks},null,2))
console.log('Panel findings:',JSON.stringify([...errors,...checks],null,2))
for(const name of panelName!=='panel'?[panelName]:['limit','button','toggle','dial','position','distance','panel']){
 const cj=JSON.parse(await readFile(`output/${name}.circuit.json`,'utf8'))
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
}
