import {readFileSync,writeFileSync} from 'node:fs'
export function writeStatusRouteMetadata(module:string,traces:any[]){
// Stable selectors allow replay when a parent panel changes generated source IDs.
const base=JSON.parse(readFileSync(`output/${module}.unrouted.json`,'utf8'))
const ports=new Map(base.filter((e:any)=>e.type==='source_port').map((e:any)=>[e.source_port_id,e])) as Map<string,any>
const parts=new Map(base.filter((e:any)=>e.type==='source_component').map((e:any)=>[e.source_component_id,e])) as Map<string,any>

const parent=new Map<string,string>()
const root=(x:string):string=>parent.has(x)?root(parent.get(x)!):x
for(const t of base.filter((e:any)=>e.type==='source_trace')){const xs=[...t.connected_source_port_ids,...t.connected_source_net_ids];for(const id of xs.slice(1)){const a=root(xs[0]),b=root(id);if(a!==b)parent.set(a,b)}}
const usedIds=new Set([...traces.map(t=>t.source_trace_id),...Object.values(JSON.parse(readFileSync(`output/${module}.net-map.json`,'utf8')))])
const metadata=Object.fromEntries(base.filter((e:any)=>e.type==='source_trace'&&usedIds.has(e.source_trace_id)).map((t:any)=>{
 const r=root(t.connected_source_port_ids[0])
 const net=base.find((e:any)=>e.type==='source_net'&&root(e.source_net_id)===r)
 return [t.source_trace_id,{net:net?.source_net_id,points:base.filter((e:any)=>e.type==='pcb_port'&&root(e.source_port_id)===r).map((p:any)=>({x:p.x,y:p.y})),selectors:[...ports.values()].filter(p=>root(p.source_port_id)===r).map(p=>`${parts.get(p.source_component_id).name}.${p.name}`)}]
}))
writeFileSync(`${module}-route-ports.json`,JSON.stringify(metadata,null,2)+'\n')

}
if(import.meta.main)writeStatusRouteMetadata(process.argv[2],JSON.parse(readFileSync(`${process.argv[2]}-routes.json`,'utf8')))
