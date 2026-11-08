import {readFileSync} from 'node:fs'
import {runAllChecks} from '@tscircuit/checks'
import assert from 'node:assert/strict'
const base=JSON.parse(readFileSync('output/hub.unrouted.json','utf8')).filter((e:any)=>e.type!=='pcb_copper_pour')
const routes=JSON.parse(readFileSync('hub-fanouts.json','utf8'))
const vias=routes.flatMap((t:any)=>t.route.filter((p:any)=>p.route_type==='via').map((p:any,i:number)=>({type:'pcb_via',pcb_via_id:`${t.pcb_trace_id}_via_${i}`,pcb_trace_id:t.pcb_trace_id,x:p.x,y:p.y,hole_diameter:.3,outer_diameter:.6,layers:['top','bottom'],from_layer:'top',to_layer:'bottom',subcircuit_id:base.find((e:any)=>e.type==='pcb_board').subcircuit_id})))
const checks=await runAllChecks([...base,...routes,...vias])
const incomplete=(e:any)=>e.type==='pcb_port_not_connected_error'||(e.type==='pcb_trace_error'&&e.message.includes('is missing a connection'))
const geometry=checks.filter(e=>!incomplete(e))
assert.deepEqual(geometry,[])
console.log({protectedEscapes:routes.length,geometryFindings:geometry.length,unfinishedConnections:checks.filter(incomplete).length})
