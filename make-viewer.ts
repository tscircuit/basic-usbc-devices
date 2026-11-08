import {readFileSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
import {runPanelChecks} from './check-panel'
const read=(n:string)=>JSON.parse(readFileSync(`output/${n}`,'utf8'))
const panelName=process.argv[2]??'panel'
const native:any[]=read(`${panelName}.design.json`), fab:any[]=read(`${panelName}.circuit.json`)
const sc=new Map(fab.filter(e=>e.type==='source_component').map(e=>[e.source_component_id,e]))
const original=new Map(native.filter(e=>e.type==='source_component').map(e=>[e.source_component_id,e]))
const schToSc=new Map(native.filter(e=>e.type==='schematic_component').map(e=>[e.schematic_component_id,e.source_component_id]))
const nets=new Map(fab.filter(e=>e.type==='source_net').map(e=>[e.source_net_id,e.name]))
const traces=new Map(native.filter(e=>e.type==='source_trace').map(e=>[e.source_trace_id,e]))
const oldNets=new Map(native.filter(e=>e.type==='source_net').map(e=>[e.source_net_id,e.name]))
const schematic=structuredClone(native.filter(e=>e.type.startsWith('schematic_')))
for(const e of schematic){
 if(e.type==='schematic_text'){
  const id=schToSc.get(e.schematic_component_id)
  if(id&&e.text===original.get(id)?.name)e.text=sc.get(id)?.name
  for(const net of traces.get(e.source_trace_id)?.connected_source_net_ids??[])if(e.text===oldNets.get(net))e.text=nets.get(net)
 }
 if(e.type==='schematic_net_label'&&e.source_net_id&&nets.has(e.source_net_id))e.text=nets.get(e.source_net_id)
}
const viewer=[...fab,...schematic]
const checks=await runPanelChecks(viewer,read(`${panelName}.design.json`).filter((e:any)=>e.type==='pcb_board'))
assert.equal(checks.length,0,JSON.stringify(checks,null,2))
for(const name of ['limit','button','toggle','dial','position','distance',panelName]){
 const j=name===panelName?viewer:read(`${name}.circuit.json`)
 const sheets=j.filter((e:any)=>e.type==='schematic_sheet')
 assert.equal(sheets.length,name===panelName?(panelName==='panel4'?10:panelName==='panel3'?7:6):1)
 const ids=new Set(sheets.map((e:any)=>e.schematic_sheet_id))
 const components=j.filter((e:any)=>e.type==='schematic_component')
 for(const c of components)assert.ok(ids.has(c.schematic_sheet_id),`${name}: ${c.schematic_component_id} is not on its sheet`)
 for(const s of sheets)assert.ok(components.some((c:any)=>c.schematic_sheet_id===s.schematic_sheet_id),`${name}: empty sheet`)
 console.log(`${name}: ${sheets.length} populated sheet(s), ${components.length} components assigned`)
}
writeFileSync(`output/${panelName}.viewer.circuit.json`,JSON.stringify(viewer,null,2))
writeFileSync(`output/${panelName}.viewer.checks.json`,JSON.stringify({render:[],checks},null,2))
