import polygons from './branding/logo-polygons.json'
import placements from './branding/placements.json'

export const brandedBoards=Object.keys(placements)
const signedArea=(points:{x:number,y:number}[])=>points.reduce((s,p,i)=>{const q=points[(i+1)%points.length];return s+p.x*q.y-q.x*p.y},0)/2
/** Apply manufacturing artwork after routing, without changing electrical geometry. */
export function addBoardBranding(input:any[],name:string):any[]{
 const config=(placements as Record<string,any>)[name]
 if(!config)throw new Error(`No branding placement for ${name}`)
 const j=input.filter(e=>!Object.entries(e).some(([k,v])=>k.endsWith('_id')&&typeof v==='string'&&v.startsWith('branding_')))
 const board=j.find(e=>e.type==='pcb_board'),subcircuit_id=board.subcircuit_id
 for(const [layer,position]of [['bottom',config.back.logo],['top',config.front]] as const){
  if(!position)continue
  polygons.forEach((polygon,index)=>{
   const rings=polygon.map((ring,i)=>{
    let vertices=ring.slice(0,-1).map(([x,y])=>({x:position.x+(layer==='bottom'?-x:x)*position.size,y:position.y+y*position.size}))
    if((signedArea(vertices)>0)===(i===0))vertices=vertices.reverse()
    return {vertices}
   })
   j.push({type:'pcb_silkscreen_graphic',pcb_silkscreen_graphic_id:`branding_${name}_${layer}_logo_${index}`,pcb_component_id:'',subcircuit_id,layer,shape:'brep',brep_shape:{outer_ring:rings[0],inner_rings:rings.slice(1)}})
  })
 }
 config.back.text.forEach((line:any,index:number)=>j.push({type:'pcb_silkscreen_text',pcb_silkscreen_text_id:`branding_${name}_attribution_${index}`,subcircuit_id,layer:'bottom',text:line.text,font:'tscircuit2024',font_size:line.fontSize,anchor_position:{x:line.x,y:line.y},anchor_alignment:'center',ccw_rotation:0,is_mirrored:true}))
 return j
}
