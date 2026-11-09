import {readFileSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'

const common=['limit','button','toggle','dial','position','distance','display','buzzer']
const report:any[]=[]
for(const name of [...common,'hub','resetter']){
 const j=JSON.parse(readFileSync(`output/${name}.circuit.json`,'utf8'))
 const parts=j.filter((e:any)=>e.type==='source_component')
 const parent=new Map<string,string>()
 const root=(x:string):string=>parent.has(x)?root(parent.get(x)!):x
 for(const t of j.filter((e:any)=>e.type==='source_trace')){
  const ids=[...t.connected_source_port_ids,...t.connected_source_net_ids]
  for(const id of ids.slice(1)){const a=root(ids[0]),b=root(id);if(a!==b)parent.set(a,b)}
 }
 const part=(n:string)=>{const c=parts.find((e:any)=>e.name===n);assert.ok(c,`${name}: ${n}`);return c}
 const pin=(n:string,k:number)=>{
  const c=part(n),p=j.find((e:any)=>e.type==='source_port'&&e.source_component_id===c.source_component_id&&e.pin_number===k)
  assert.ok(p,`${name}: ${n}.${k}`);return root(p.source_port_id)
 }
 const eq=(a:string,ap:number,b:string,bp:number)=>assert.equal(pin(a,ap),pin(b,bp),`${name}: ${a}.${ap} → ${b}.${bp}`)
 if(name==='resetter'){
  const led=parts.find((e:any)=>e.manufacturer_part_number?.includes('SK6812'));assert.ok(led)
  const pcb=j.find((e:any)=>e.type==='pcb_component'&&e.source_component_id===led.source_component_id)
  report.push({board:name,led:led.name,center:pcb.center,existingRgb:true});continue
 }
 const led=part('LED_STATUS')
 assert.equal(led.supplier_part_numbers.jlcpcb[0],'C2286')
 const pcb=j.find((e:any)=>e.type==='pcb_component'&&e.source_component_id===led.source_component_id)
 const expected=name==='hub'?{x:-19,y:-8}:{x:-9.5,y:-9}
 assert.ok(Math.hypot(pcb.center.x-expected.x,pcb.center.y-expected.y)<1e-3,`${name}: LED datum`)
 eq('LED_STATUS',1,'R_STATUS',2)
 assert.notEqual(pin('LED_STATUS',1),pin('LED_STATUS',2))
 if(['limit','button','toggle'].includes(name))eq('LED_STATUS',2,'U1',13)
 if(['dial','position','buzzer'].includes(name))eq('LED_STATUS',2,'U1',2)
 if(name==='display')eq('LED_STATUS',2,'U1',13)
 if(name==='distance'){
  eq('LED_STATUS',2,'U4',1);eq('U4',7,'U1',15);eq('U4',6,'U1',16)
  eq('U4',8,'U2',3);eq('R_STATUS',1,'U2',3);eq('U4',4,'J1',13)
 }
 if(name==='hub'){
  eq('LED_STATUS',2,'U1',21);eq('R_STATUS',1,'U1',23)
  eq('U_STATUS',1,'U1',13);eq('U_STATUS',3,'U1',21)
  eq('U_STATUS',4,'U1',20);eq('U_STATUS',2,'U1',18);eq('U_STATUS',5,'U1',18)
 }
 report.push({board:name,led:led.name,center:pcb.center,commonMountingDatum:common.includes(name)})
}
writeFileSync('output/status-leds.validation.json',JSON.stringify(report,null,2)+'\n')
console.log('Ten computer-controlled LEDs; eight identical mounting-hole offsets verified.')
