import routes from './hub-routes.json'
import ports from './hub-route-ports.json'
// Replay checked copper through the normal pour/DRC pipeline. Regenerate both
// cache files with route-hub.ts and import-hub-routes.ts after circuit edits.
export function createHubRouter(x=0,y=0,rotation=0){return async(input:any):Promise<any>=>{
 const angle=rotation*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle)
 const transform=(p:{x:number,y:number})=>({x:c*p.x-s*p.y+x,y:s*p.x+c*p.y+y})
 const mapped=new Map<string,string>()
 const meta=ports as Record<string,{net:string,points:{x:number,y:number}[],selectors:string[]}>
 for(const m of Object.values(meta)){
  if(mapped.has(m.net))continue
  const points=m.points.map(transform)
  const connection=input.connections.find((v:any)=>v.pointsToConnect.some((p:any)=>points.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<1e-5)))
  if(connection)mapped.set(m.net,connection.source_trace_id??connection.name)
 }
 const placed=routes.map(t=>{
  const m=meta[t.source_trace_id],target=mapped.get(m.net)
  if(!target)throw new Error(`Hub cached net is missing: ${m.selectors.join(', ')}`)
  return {...t,source_trace_id:target,connection_name:target,route:t.route.map(p=>({...p,...transform(p)}))}
 })
 const handlers:Record<string,(event:any)=>void>={}
 return {input,isRouting:false,on:(name:string,cb:(event:any)=>void)=>{handlers[name]=cb},
  start(){handlers.complete?.({type:'complete',traces:placed})},stop(){},solveSync(){return placed}}
}}
