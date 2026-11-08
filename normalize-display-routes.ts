import {readFileSync,writeFileSync} from 'node:fs'
import assert from 'node:assert/strict'

// SES stores vias independently from wires. Join each via to the wires that
// physically terminate on it, instead of creating a zero-length wire on each
// layer. This preserves the copper while giving Circuit JSON real endpoints.
const traces:any[]=JSON.parse(readFileSync('display-routes.json','utf8'))
const at=(a:any,b:any)=>Math.hypot(a.x-b.x,a.y-b.y)<1e-5
const copper=(ts:any[])=>ts.flatMap(t=>{
 const result:string[]=[]
 for(const p of t.route)if(p.route_type==='via')result.push(JSON.stringify(['via',t.source_trace_id,p.x,p.y]))
 for(let i=1;i<t.route.length;i++){
  const a=t.route[i-1],b=t.route[i]
  if(a.route_type==='wire'&&b.route_type==='wire'&&a.layer===b.layer&&!at(a,b))result.push(JSON.stringify(['wire',t.source_trace_id,a.layer,a.width,[[a.x,a.y],[b.x,b.y]].sort()]))
 }
 return result
}).sort()
const before=copper(traces)
let joined=0
for(const stub of [...traces]){
 const via=stub.route.find((p:any)=>p.route_type==='via')
 if(!via||stub.route.some((p:any)=>!at(p,via)))continue
 const halves:any[][]=[]
 for(const layer of [via.from_layer,via.to_layer]){
  const wire=traces.find(t=>t!==stub&&t.source_trace_id===stub.source_trace_id&&t.route.length>1&&[t.route[0],t.route.at(-1)].some(p=>p.route_type==='wire'&&p.layer===layer&&at(p,via)))
  if(!wire){halves.push([]);continue}
  // Orient each half from its remote endpoint toward this via.
  const toward=at(wire.route.at(-1),via)&&wire.route.at(-1).layer===layer
  const route=toward?wire.route:[...wire.route].reverse().map(p=>p.route_type==='via'?{...p,from_layer:p.to_layer,to_layer:p.from_layer}:p)
  halves.push(route);traces.splice(traces.indexOf(wire),1)
 }
 const [a,b]=halves
 const reverse=(r:any[])=>[...r].reverse().map(p=>p.route_type==='via'?{...p,from_layer:p.to_layer,to_layer:p.from_layer}:p)
 stub.route=[...a,via,...reverse(b)]
 joined++
}
// A via may terminate directly in a copper pour. Represent that terminal as a
// via, without a fictitious zero-length wire on the pour's layer.
for(const t of traces){
 if(t.route[0]?.route_type==='wire'&&t.route[1]?.route_type==='via'&&at(t.route[0],t.route[1]))t.route.shift()
 if(t.route.at(-1)?.route_type==='wire'&&t.route.at(-2)?.route_type==='via'&&at(t.route.at(-1),t.route.at(-2)))t.route.pop()
}
assert.deepEqual(copper(traces),before,'Route normalization must preserve every copper segment and via')
writeFileSync('display-routes.json',JSON.stringify(traces,null,2)+'\n')
console.log({joinedVias:joined,traceRecords:traces.length})
