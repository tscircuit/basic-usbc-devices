import routes from './hub-routes.json'
// Replay the checked Freerouting result through tscircuit's normal rendering,
// copper-pour and DRC pipeline. Rerun route-hub.ts and import-hub-routes.ts after
// changing hub placement or connectivity; the normal checks still run on rebuild.
export async function hubRouter(input:any):Promise<any>{
 const handlers:Record<string,(event:any)=>void>={}
 return {input,isRouting:false,on:(name:string,cb:(event:any)=>void)=>{handlers[name]=cb},
  start(){handlers.complete?.({type:'complete',traces:routes})},stop(){},solveSync(){return routes}}
}
