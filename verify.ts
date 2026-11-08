import { readFileSync,writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { runAllChecks } from '@tscircuit/checks'
const panelName=process.argv[2]??'panel'
const report:any={generatedAt:new Date().toISOString(),boards:[],assembly:{status:'BLOCKED_PENDING_USER_CHOICE',reason:'C91199 is JLCPCB Standard-only; Economic assembly with the onboard sensor is not available.'},hardwareTested:false}
for(const name of ['limit','button','toggle','dial','position','distance',panelName]){
 const j=JSON.parse(readFileSync(`output/${name}.circuit.json`,'utf8'))
 const render=JSON.parse(readFileSync(`output/${name}.checks.json`,'utf8')).render
 assert.equal(render.length,0,`${name}: render findings`)
 const checks=await runAllChecks(j)
 assert.equal(checks.length,0,`${name}: ${JSON.stringify(checks)}`)
 const boards=j.filter((e:any)=>e.type==='pcb_board')
 assert.equal(boards.length,1)
 assert.equal(boards[0].num_layers,2)
 const vias=j.filter((e:any)=>e.type==='pcb_via')
 for(const v of vias){assert.equal(v.hole_diameter,0.3);assert.equal(v.outer_diameter,0.6);assert.deepEqual(v.layers,['top','bottom'])}
 const traces=j.filter((e:any)=>e.type==='pcb_trace')
 assert.ok(traces.length>0)
 for(const t of traces)for(const p of t.route)if(p.route_type==='wire'){assert.ok(['top','bottom'].includes(p.layer));assert.ok(p.width>=0.2-1e-6)}
 const parts=j.filter((e:any)=>e.type==='source_component')
 for(const p of parts.filter((p:any)=>!(p.ftype==='simple_test_point'&&p.footprint_variant==='pad'&&p.pad_diameter===1)))assert.match(p.supplier_part_numbers?.jlcpcb?.[0]??'',/^C\d+$/,`${name} ${p.name} lacks JLCPCB source`)
 assert.equal(new Set(parts.map((p:any)=>p.name)).size,parts.length)
 if(name===panelName){
  assert.equal(boards[0].width,panelName==='panel2'?96:177);assert.equal(boards[0].height,panelName==='panel2'?79:46)
  assert.equal(j.filter((e:any)=>e.type==='pcb_hole'&&e.hole_diameter===2.2).length,24)
  for(const [i,module] of ['limit','button','toggle','dial','position','distance'].entries()){
   const direction=panelName==='panel2'&&i<3?-1:1
   const dx=panelName==='panel2'?(i%3-1)*27:(i-2.5)*27,dy=panelName==='panel2'?(i<3?16.5:-16.5):0
   const original=JSON.parse(readFileSync(`output/${module}.circuit.json`,'utf8'))
   for(const t of original.filter((e:any)=>e.type==='pcb_trace')){
    const placed=j.find((e:any)=>e.pcb_trace_id===`${module}_${t.pcb_trace_id}`);assert.ok(placed);assert.equal(placed.route.length,t.route.length)
    t.route.forEach((p:any,k:number)=>{const q=placed.route[k];const pairs='x' in p?[[p,q]]:[[p.start,q.start],[p.end,q.end]];for(const [a,b] of pairs){assert.ok(Math.abs(b.x-direction*a.x-dx)<1e-8);assert.ok(Math.abs(b.y-direction*a.y-dy)<1e-8)}assert.equal(q.layer,p.layer);assert.equal(q.start_layer,p.start_layer);assert.equal(q.end_layer,p.end_layer)})
   }
  }
 }
 if(name!==panelName){
  const sheets=j.filter((e:any)=>e.type==='schematic_sheet')
  assert.equal(sheets.length,1,`${name}: exactly one schematic sheet`)
  const schematicComponents=j.filter((e:any)=>e.type==='schematic_component')
  assert.equal(schematicComponents.length,parts.length)
  for(const c of schematicComponents)assert.equal(c.schematic_sheet_id,sheets[0].schematic_sheet_id)
  const holes=j.filter((e:any)=>e.type==='pcb_hole'&&e.hole_diameter===2.2)
  assert.equal(holes.length,4,`${name}: four M2 clearance holes`)
  assert.deepEqual(holes.map((h:any)=>[h.x??h.center?.x,h.y??h.center?.y]).sort(),[[-9.5,-12.5],[-9.5,12.5],[9.5,-12.5],[9.5,12.5]].sort())
  const keepouts=j.filter((e:any)=>e.type==='pcb_keepout'&&e.shape==='circle')
  assert.equal(keepouts.length,4,`${name}: four screw-head keepouts`)
  assert.equal(boards[0].width,24)
  assert.equal(boards[0].height,30)

  const parent=new Map<string,string>()
  const root=(x:string):string=>parent.has(x)?root(parent.get(x)!):x
  const union=(xs:string[])=>xs.slice(1).forEach(x=>{const a=root(xs[0]),b=root(x);if(a!==b)parent.set(a,b)})
  for(const t of j.filter((e:any)=>e.type==='source_trace'))union([...(t.connected_source_port_ids??[]),...(t.connected_source_net_ids??[])])
  const pin=(n:string,k:number)=>{
   const c=parts.find((e:any)=>e.name===n);assert.ok(c)
   const p=j.find((e:any)=>e.type==='source_port'&&e.source_component_id===c.source_component_id&&String(e.pin_number)===String(k));assert.ok(p,`${n}.${k}`);return root(p.source_port_id)
  }
  const eq=(a:string,ap:number,b:string,bp:number)=>assert.equal(pin(a,ap),pin(b,bp),`${name}: ${a}.${ap} vs ${b}.${bp}`)
  eq('J1',8,'J1',10);eq('J1',7,'J1',9)
  eq('J1',6,'R1',1);eq('J1',12,'R2',1)
  assert.notEqual(pin('J1',6),pin('J1',12))
  assert.notEqual(pin('J1',8),pin('J1',7))
  eq('J1',13,'D1',2);eq('J1',15,'D1',5)
  if(name==='distance'){
   eq('J1',8,'U1',7);eq('J1',7,'U1',8)
   eq('J1',15,'U2',2);eq('U2',3,'U1',20);eq('U1',20,'U1',13);eq('U1',20,'U1',6);eq('U1',11,'J1',13);eq('U1',12,'J1',13)
   eq('U2',3,'U3',1);eq('U2',3,'U3',11)
   assert.notEqual(pin('J1',15),pin('U3',1))
   for(const p of [2,3,4,6,12])eq('U3',p,'J1',13)
   eq('U1',15,'U3',9);eq('U1',16,'U3',10)
   eq('U1',1,'R3',1);eq('R3',2,'J1',13)
  }else if(name==='position'){
   eq('J1',8,'U1',6);eq('J1',7,'U1',7);eq('J1',15,'U1',9);eq('POT1',3,'J1',15);eq('POT1',1,'J1',13);eq('POT1',2,'R3',1);eq('R3',2,'U1',1);eq('C4',1,'U1',1);assert.notEqual(pin('U1',10),pin('U1',9))
  }else if(name==='dial'){
   eq('J1',8,'U1',6);eq('J1',7,'U1',7);eq('J1',15,'U1',9);eq('U1',8,'J1',13);eq('U1',1,'ENC1',8);eq('U1',3,'ENC1',10);eq('U1',4,'ENC1',12);eq('ENC1',9,'J1',13);eq('ENC1',11,'J1',13);assert.notEqual(pin('U1',10),pin('U1',9))
   const encoder=parts.find((e:any)=>e.name==='ENC1')
   for(const [number,x,y] of [[6,-5.5,6.5],[7,5.5,6.5],[8,-2.5,-1],[9,0,-1],[10,2.5,-1],[11,-2.5,13.5],[12,2.5,13.5]]){
    const sp=j.find((e:any)=>e.type==='source_port'&&e.source_component_id===encoder.source_component_id&&e.pin_number===number)
    const pp=j.find((e:any)=>e.type==='pcb_port'&&e.source_port_id===sp.source_port_id);assert.ok(Math.abs(pp.x-x)<1e-6&&Math.abs(pp.y-y)<1e-6,'ALPS drawing 3 footprint mismatch')
   }
  }else{
   eq('J1',8,'U1',5);eq('J1',7,'U1',6);eq('J1',15,'U1',16)
   eq('U1',9,'R4',1);eq('SW1',3,'R4',2);eq('SW1',name==='toggle'?2:1,'J1',13)
   if(name==='button'){eq('SW1',1,'SW1',2);eq('SW1',3,'SW1',4)}
  }
 }
 report.boards.push({name,components:parts.length,traces:traces.length,vias:vias.length,errors:0,warnings:0,layers:2,viaDrillMm:0.3,viaPadMm:0.6,...(name!==panelName?{schematicSheets:1,allComponentsAssignedToSheet:true}:{})})
}
writeFileSync(panelName==='panel'?'output/validation.json':'output/panel2.validation.json',JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))
