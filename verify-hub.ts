import {hubSize,hubMounts} from './hub-layout'
import {readFileSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'
import {runAllChecks} from '@tscircuit/checks'
const j=JSON.parse(readFileSync('output/hub.circuit.json','utf8'))
assert.deepEqual(JSON.parse(readFileSync('output/hub.checks.json','utf8')).render,[])
assert.deepEqual(await runAllChecks(j),[])
const of=(t:string)=>j.filter((e:any)=>e.type===t)
const board=of('pcb_board')[0];assert.equal(of('pcb_board').length,1)
assert.equal(board.num_layers,2);assert.equal(board.width,hubSize.width);assert.equal(board.height,hubSize.height)
for(const v of of('pcb_via')){assert.equal(v.hole_diameter,.3);assert.equal(v.outer_diameter,.6)}
assert.ok(of('pcb_trace').length>0)
for(const t of of('pcb_trace'))for(const p of t.route)if(p.route_type==='wire')assert.ok(p.width>=.11-1e-6)
const holes=of('pcb_hole').filter((e:any)=>e.hole_diameter===2.2)
assert.deepEqual(holes.map((h:any)=>[h.x??h.center.x,h.y??h.center.y]).sort(),hubMounts.map(({x,y})=>[x,y]).sort())
const parts=of('source_component'), sheets=of('schematic_sheet')
assert.equal(sheets.length,1);assert.equal(of('schematic_component').length,parts.length)
for(const c of of('schematic_component'))assert.equal(c.schematic_sheet_id,sheets[0].schematic_sheet_id)
// Sheet membership alone does not detect an unreadable pile of symbols.
const symbols=of('schematic_component')
for(let i=0;i<symbols.length;i++)for(let k=0;k<i;k++){
 const a=symbols[i],b=symbols[k]
 const separated=Math.abs(a.center.x-b.center.x)>=(a.size.width+b.size.width)/2+.1||Math.abs(a.center.y-b.center.y)>=(a.size.height+b.size.height)/2+.1
 assert.ok(separated,`Overlapping schematic symbols ${a.source_component_id}, ${b.source_component_id}`)
}
assert.equal(board.thickness,1.6)

for(const p of parts)assert.match(p.supplier_part_numbers?.jlcpcb?.[0]??'',/^C\d+$/)
const parent=new Map<string,string>()
const root=(x:string):string=>parent.has(x)?root(parent.get(x)!):x
const union=(xs:string[])=>xs.slice(1).forEach(x=>{const a=root(xs[0]),b=root(x);if(a!==b)parent.set(a,b)})
for(const t of of('source_trace'))union([...(t.connected_source_port_ids??[]),...(t.connected_source_net_ids??[])])
const pin=(n:string,k:number)=>{const c=parts.find((e:any)=>e.name===n);assert.ok(c);const p=of('source_port').find((e:any)=>e.source_component_id===c.source_component_id&&String(e.pin_number)===String(k));assert.ok(p,`${n}.${k}`);return root(p.source_port_id)}
const eq=(a:string,ap:number,b:string,bp:number)=>assert.equal(pin(a,ap),pin(b,bp),`${a}.${ap} vs ${b}.${bp}`)
const ne=(a:string,ap:number,b:string,bp:number)=>assert.notEqual(pin(a,ap),pin(b,bp),`${a}.${ap} must be separate from ${b}.${bp}`)
eq('J1',15,'U1',19);eq('J1',13,'U1',18);eq('J1',13,'U1',25)
eq('J1',6,'R1',1);eq('J1',12,'R2',1);ne('J1',6,'J1',12)
eq('R1',2,'J1',13);eq('R2',2,'J1',13)
for(let i=0;i<=4;i++){
 const J=`J${i+1}`,D=`D${i+1}`
 eq(J,8,J,10);eq(J,7,J,9);ne(J,8,J,7)
 eq(J,8,'U1',[15,12,10,8,6][i]);eq(J,7,'U1',[14,11,9,7,5][i])
 eq(J,8,D,1);eq(J,7,D,3);eq(J,15,D,5);eq(J,13,D,2)
 if(!i)continue
 const cc=`U${4+(i-1)*3}`,sw=`U${5+(i-1)*3}`,gate=`U${Math.ceil(i/2)+1}`,r=10+(i-1)*10
 eq(cc,1,J,6);eq(cc,2,J,12);eq(cc,3,'J1',13);eq(cc,4,'J1',15);eq(cc,12,'J1',15)
 eq(cc,9,gate,i%2?1:5);eq('U1',24,gate,i%2?2:6);eq(gate,i%2?7:3,sw,3)
 eq(sw,1,'J1',15);eq(sw,6,J,15);ne(sw,1,sw,6);eq(sw,4,'U1',1)
 eq(sw,5,`R${r+2}`,1);eq(`R${r+2}`,2,'J1',13)
 eq(sw,3,`MOSFET${i}`,1);eq(`MOSFET${i}`,2,'J1',13);eq(`MOSFET${i}`,3,`R${r+3}`,2);eq(`R${r+3}`,1,J,15)
 eq(`C${r+2}`,1,J,15);eq(`C${r+2}`,2,'J1',13)
 for(let other=1;other<i;other++)ne(J,15,`J${other+1}`,15)
}
const report={generatedAt:new Date().toISOString(),board:'hub',widthMm:hubSize.width,heightMm:hubSize.height,actualMinTraceWidthMm:Math.min(...of('pcb_trace').flatMap((t:any)=>t.route.filter((p:any)=>p.route_type==='wire').map((p:any)=>p.width))),components:parts.length,traces:of('pcb_trace').length,vias:of('pcb_via').length,errors:0,warnings:0,layers:2,viaDrillMm:.3,minTraceWidthMm:.11,schematicSheets:1,mountingPatternMm:[38,10],hardwareTested:false,usbHighSpeedComplianceTested:false}
writeFileSync('output/hub.validation.json',JSON.stringify(report,null,2)+'\n');console.log(report)
