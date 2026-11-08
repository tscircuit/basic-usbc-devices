import { readFileSync, writeFileSync } from 'node:fs'
import { parseDsnToDsnJson } from 'dsn-converter'
const ses=parseDsnToDsnJson(readFileSync('output/display.ses','utf8'))
if(!ses.is_dsn_session)throw new Error('Expected a Freerouting session')
const r=ses.routes.resolution
const scale=({um:.001,mm:1,mil:.0254,inch:25.4} as Record<string,number>)[r.unit]/r.value
if(!Number.isFinite(scale))throw new Error(`Unknown resolution ${JSON.stringify(r)}`)
const sourceMap=JSON.parse(readFileSync('output/display.net-map.json','utf8'))
const traces:any[]=[]
for(const n of ses.routes.network_out.nets){
 if(["XI","XO"].includes(n.name))continue // Already fixed by explicit pcbPath routes.
 const source_trace_id=sourceMap[n.name]
 if(!source_trace_id && (n.wires.length||n.vias?.length))throw new Error(`Missing net ${n.name}`)
 for(const w of n.wires){
  const path=w.path??w.polyline_path;if(!path)throw new Error('Missing wire path')
  const route=[];for(let i=0;i<path.coordinates.length;i+=2)route.push({route_type:'wire',x:path.coordinates[i]*scale,y:path.coordinates[i+1]*scale,width:Math.max(.1124,path.width*scale),layer:path.layer==='F.Cu'?'top':'bottom'})
  traces.push({type:'pcb_trace',pcb_trace_id:`freeroute_${traces.length}`,source_trace_id,connection_name:source_trace_id,route})
 }
 for(const v of n.vias??[]){const x=v.x*scale,y=v.y*scale;traces.push({type:'pcb_trace',pcb_trace_id:`freeroute_${traces.length}`,source_trace_id,connection_name:source_trace_id,route:[{route_type:'wire',x,y,width:.2,layer:'top'},{route_type:'via',x,y,from_layer:'top',to_layer:'bottom',via_diameter:.6,via_hole_diameter:.3},{route_type:'wire',x,y,width:.2,layer:'bottom'}]})}
}
writeFileSync('display-routes.json',JSON.stringify(traces,null,2)+'\n')
console.log({resolution:r,scale,traces:traces.length})

import {writeDisplayRouteMetadata} from './update-display-route-metadata'
writeDisplayRouteMetadata(traces)
