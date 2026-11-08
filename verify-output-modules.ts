import {readFileSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
import {runAllChecks} from '@tscircuit/checks'
for(const name of ['display','buzzer','resetter']){
 const j:any[]=JSON.parse(readFileSync(`output/${name}.circuit.json`,'utf8'))
 assert.deepEqual(await runAllChecks(j),[])
 const of=(t:string)=>j.filter(e=>e.type===t),b=of('pcb_board')[0]
 assert.equal(of('pcb_board').length,1);assert.equal(b.num_layers,2);assert.equal(b.thickness,1.6)
 const sheets=of('schematic_sheet');assert.equal(sheets.length,1)
 for(const c of of('schematic_component')){
  const sheet=sheets[0],u=10.16/1.1
  assert.equal(c.schematic_sheet_id,sheet.schematic_sheet_id)
  assert.ok(Math.abs(c.center.x-sheet.center.x)+c.size.width/2<sheet.sheet_width/u/2-.5,`${name}/${c.schematic_component_id} outside sheet width`)
  assert.ok(Math.abs(c.center.y-sheet.center.y)+c.size.height/2<sheet.sheet_height/u/2-.5,`${name}/${c.schematic_component_id} outside sheet height`)
 }
 assert.equal(of('pcb_hole').filter(e=>e.hole_diameter===(name==='resetter'?3.2:2.2)).length,4)
 for(const v of of('pcb_via')){assert.equal(v.hole_diameter,.3);assert.equal(v.outer_diameter,.6)}
 for(const c of of('source_component').filter(e=>!e.do_not_place&&e.ftype!=='simple_test_point'))assert.ok(c.supplier_part_numbers?.jlcpcb?.length,`${name}/${c.name} has no JLCPCB part`)
 if(name==='display'||name==='buzzer'){
  const pts=of('pcb_hole').filter(e=>e.hole_diameter===2.2).map(e=>[e.x,e.y]).sort()
  assert.deepEqual(pts,[[-9.5,-12.5],[-9.5,12.5],[9.5,-12.5],[9.5,12.5]].sort())
 }
 for(const t of of('pcb_trace'))for(const p of t.route)if(p.route_type==='wire')assert.ok(p.width>=.1-1e-6,`${name} trace below fabrication minimum`)
 const report={name,width:b.width,height:b.height,layers:2,viaDrillMm:.3,viaPadMm:.6,schematicSheets:1,mountingHoles:4,traces:of('pcb_trace').length,vias:of('pcb_via').length,errors:0,warnings:0,hardwareTested:false}
 writeFileSync(`output/${name}.validation.json`,JSON.stringify(report,null,2)+'\n');console.log(report)
}
