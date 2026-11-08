import {readFileSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
import {runPanelChecks,checkPanelConnectorOrientation} from './check-panel'
import {modules,panelSize} from './panel3'
const read=(n:string)=>JSON.parse(readFileSync(`output/${n}`,'utf8'))
const j=read('panel3.viewer.circuit.json'), of=(type:string)=>j.filter((e:any)=>e.type===type)
const moduleBoards=read('panel3.design.json').filter((e:any)=>e.type==='pcb_board')
assert.deepEqual(await runPanelChecks(j,moduleBoards),[])
// A backwards-facing connector must still fail the board-scoped rule.
const reversed=structuredClone(j),connector=reversed.find((e:any)=>e.type==='pcb_component'&&e.cable_insertion_center)
connector.cable_insertion_center={x:2*connector.center.x-connector.cable_insertion_center.x,y:2*connector.center.y-connector.cable_insertion_center.y}
assert.equal(checkPanelConnectorOrientation(reversed,moduleBoards).length,1)
assert.deepEqual(read('panel3.checks.json'),{render:[],checks:[]})
const boards=of('pcb_board');assert.equal(boards.length,1)
assert.equal(boards[0].width,panelSize.width);assert.equal(boards[0].height,panelSize.height)
assert.equal(boards[0].thickness,1.6);assert.equal(boards[0].num_layers,2)
assert.equal(of('schematic_sheet').length,7)
assert.equal(of('pcb_hole').filter((e:any)=>e.hole_diameter===2.2).length,28)
assert.equal(new Set(of('source_component').map((e:any)=>e.name)).size,of('source_component').length)
for(const v of of('pcb_via')){assert.equal(v.hole_diameter,.3);assert.equal(v.outer_diameter,.6)}
for(const t of of('pcb_trace'))for(const p of t.route)if(p.route_type==='wire')assert.ok(p.width>=.11-1e-6)
for(const b of modules){
 const original=read(`${b.name}.circuit.json`),angle=b.rotation*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle)
 assert.equal(original.find((e:any)=>e.type==='pcb_board').thickness,1.6)
 const point=(p:any,q:any)=>{assert.ok(Math.abs(q.x-(c*p.x-s*p.y+b.x))<1e-8);assert.ok(Math.abs(q.y-(s*p.x+c*p.y+b.y))<1e-8)}
 for(const t of original.filter((e:any)=>e.type==='pcb_trace')){
  const placed=j.find((e:any)=>e.pcb_trace_id===`${b.name}_${t.pcb_trace_id}`);assert.ok(placed);assert.equal(placed.route.length,t.route.length)
  t.route.forEach((p:any,k:number)=>{const q=placed.route[k];if('x'in p)point(p,q);else{point(p.start,q.start);point(p.end,q.end)}assert.equal(q.layer,p.layer);assert.equal(q.width,p.width)})
 }
 const sheet=of('schematic_sheet').find((e:any)=>e.schematic_sheet_id.startsWith(`${b.name}_`));assert.ok(sheet)
 assert.equal(of('schematic_component').filter((e:any)=>e.schematic_sheet_id===sheet.schematic_sheet_id).length,original.filter((e:any)=>e.type==='source_component').length)
}
const report={panel:'panel3',...panelSize,boards:7,schematicSheets:7,mountingHoles:28,traces:of('pcb_trace').length,vias:of('pcb_via').length,errors:0,warnings:0,layers:2,thicknessMm:1.6,viaDrillMm:.3,hardwareTested:false}
writeFileSync('output/panel3.validation.json',JSON.stringify(report,null,2)+'\n');console.log(report)
