import {readFileSync} from 'node:fs'
import {transformPCBElement} from '@tscircuit/circuit-json-util'
import assert from 'node:assert/strict'
// Translate verified modules without rerouting or reinflating component types.
// The inflator currently loses pin attributes and cannot inflate crystals.
export function composePanel(positions:{x:number,y:number,rotation?:number,name?:string}[]=Array.from({length:6},(_,i)=>({x:(i-2.5)*27,y:0}))){
 const raw:any[]=[]
 for(const [i,name] of positions.map((p,i)=>p.name??['limit','button','toggle','dial','position','distance'][i]).entries()){
  const j:any[]=JSON.parse(readFileSync(`output/${name}.circuit.json`,'utf8'))
  assert.equal(j.filter(e=>e.type.endsWith('_error')||e.type.endsWith('_warning')).length,0)
  const ids=new Map<string,string>()
  const collect=(v:any,k='')=>{if(Array.isArray(v)){v.forEach(x=>collect(x,k));return}if(v&&typeof v==='object'){for(const [key,x] of Object.entries(v))collect(x,key);return}if(typeof v==='string'&&(k.endsWith('_id')||k.endsWith('_ids')))ids.set(v,`${name}_${v}`)}
  collect(j)
  const rename=(v:any):any=>typeof v==='string'?(ids.get(v)??v):Array.isArray(v)?v.map(rename):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,rename(x)])):v
  const {x:dx,y:dy,rotation=0}=positions[i], shifted=rename(j)
  const angle=rotation*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle)
  const shiftPoints=(v:any)=>{if(Array.isArray(v)){v.forEach(shiftPoints);return}if(v&&typeof v==='object'){if(typeof v.x==='number'&&typeof v.y==='number'){const x=v.x,y=v.y;v.x=c*x-s*y+dx;v.y=s*x+c*y+dy;return}Object.values(v).forEach(shiftPoints)}}
  for(const e of shifted){
   transformPCBElement(e,{a:c,b:s,c:-s,d:c,e:dx,f:dy})
   // The single-element helper does not rotate axis-aligned pads/board
   // extents or plated-slot orientations (its array helper only covers pads).
   if(Math.abs(Math.round(rotation/90))%2===1){
    if(e.type==='pcb_board'||(e.type==='pcb_smtpad'&&['rect','pill'].includes(e.shape))||(e.type==='pcb_solder_paste'&&e.shape==='pill'))[e.width,e.height]=[e.height,e.width]
    if(['pcb_silkscreen_rect','pcb_silkscreen_pill','pcb_silkscreen_oval'].includes(e.type))[e.width,e.height]=[e.height,e.width]
   }
   if(e.type==='pcb_plated_hole')e.ccw_rotation=((e.ccw_rotation??0)+rotation)%360
   // transformPCBElement does not yet translate BREP copper pours.
   if(e.type==='cad_component')e.rotation.z=(e.rotation.z+rotation)%360
   if(e.type==='pcb_copper_pour'||e.type==='pcb_silkscreen_graphic')shiftPoints(e.brep_shape)
  }
  raw.push(...shifted)
 }
 return raw
}
