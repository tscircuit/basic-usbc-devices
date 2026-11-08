import {displaySize} from './display.circuit'
import {readFileSync,writeFileSync} from 'node:fs'
// Emit physical, globally placed pads and unioned source nets. This avoids
// footprint rotation/deduplication and multi-trace-net ambiguity in DSN export.
const original=JSON.parse(readFileSync('output/display.circuit.json','utf8'))
const manual=new Set(original.filter((e:any)=>e.type==='source_trace'&&e.name?.startsWith('CLOCK_')).map((e:any)=>e.source_trace_id))
const base=original.filter((e:any)=>!e.type.endsWith('_error')&&!e.type.endsWith('_warning')&&e.type!=='pcb_via'&&(e.type!=='pcb_trace'||manual.has(e.source_trace_id)))
const of=(t:string)=>base.filter((e:any)=>e.type===t)
const parent=new Map<string,string>()
const root=(x:string):string=>parent.has(x)?root(parent.get(x)!):x
const union=(xs:string[])=>xs.slice(1).forEach(x=>{const a=root(xs[0]),b=root(x);if(a!==b)parent.set(a,b)})
for(const t of of('source_trace'))union([...(t.connected_source_port_ids??[]),...(t.connected_source_net_ids??[])])
const netNames=new Map<string,string>(of('source_net').map((e:any)=>[root(e.source_net_id),e.name]))
const spById=new Map(of('source_port').map((e:any)=>[e.source_port_id,e])) as Map<string,any>
const ppById=new Map(of('pcb_port').map((e:any)=>[e.pcb_port_id,e])) as Map<string,any>
const netPins:Record<string,string[]>={},netSourceTrace:Record<string,string>={}
const q=(s:string)=>JSON.stringify(s),num=(x:number)=>Number((x*1000).toFixed(4))
const lib:string[]=[],placements:string[]=[],padstacks:string[]=[]
for(const c of of('pcb_component')){
 const pads=base.filter((e:any)=>['pcb_smtpad','pcb_plated_hole'].includes(e.type)&&e.pcb_component_id===c.pcb_component_id)
 const image=c.pcb_component_id;const pins:string[]=[]
 for(const [i,p] of pads.entries()){
  const pp=ppById.get(p.pcb_port_id),sp=spById.get(pp?.source_port_id);if(!sp)throw new Error('Pad lacks source port')
  const name=String(sp.pin_number),net=netNames.get(root(sp.source_port_id))??`NC_${sp.source_port_id}`
  ;(netPins[net]??=[]).push(`${image}-${name}`)
  const st=of('source_trace').find((t:any)=>(t.connected_source_port_ids??[]).includes(sp.source_port_id));if(st)netSourceTrace[net]=st.source_trace_id
  let x=p.x,y=p.y,w=p.width??p.outer_width??p.radius*2,h=p.height??p.outer_height??p.radius*2
  if(p.shape==='polygon'){const xs=p.points.map((v:any)=>v.x),ys=p.points.map((v:any)=>v.y);x=(Math.min(...xs)+Math.max(...xs))/2;y=(Math.min(...ys)+Math.max(...ys))/2;w=Math.max(...xs)-Math.min(...xs);h=Math.max(...ys)-Math.min(...ys)}
  else {const a=(p.ccw_rotation??0)*Math.PI/180;const ww=Math.abs(w*Math.cos(a))+Math.abs(h*Math.sin(a));h=Math.abs(w*Math.sin(a))+Math.abs(h*Math.cos(a));w=ww}
  const stack=`pad_${image}_${i}`,layers=p.type==='pcb_plated_hole'?['F.Cu','B.Cu']:[p.layer==='bottom'?'B.Cu':'F.Cu']
  padstacks.push(`(padstack ${q(stack)} ${layers.map(l=>`(shape (rect ${l} ${num(-w/2)} ${num(-h/2)} ${num(w/2)} ${num(h/2)}))`).join(' ')} (attach off))`)
  pins.push(`(pin ${q(stack)} ${name} ${num(x-c.center.x)} ${num(y-c.center.y)})`)
 }
 lib.push(`(image ${q(image)} ${pins.join('\n')})`);placements.push(`(component ${q(image)} (place ${image} ${num(c.center.x)} ${num(c.center.y)} front 0))`)
}
const keepouts=of('pcb_keepout').filter((e:any)=>e.shape==='circle').map((e:any)=>({x:e.center.x,y:e.center.y,diameter:e.radius*2,rect:true}))
for(const h of of('pcb_hole').filter((e:any)=>e.hole_diameter!==2.2))keepouts.push({x:h.x??h.center?.x,y:h.y??h.center?.y,diameter:h.hole_diameter+0.06,rect:false})
// Circular fixed pads model mechanical copper exclusions on both layers.
// Each belongs to its own isolated net and is never part of a routed signal.
for(const [i,h] of keepouts.entries()){
 const name=`mechanical_keepout_${i}`
 const shape=(layer:string)=>h.rect?`(rect ${layer} ${num(-h.diameter/2)} ${num(-h.diameter/2)} ${num(h.diameter/2)} ${num(h.diameter/2)})`:`(circle ${layer} ${num(h.diameter)})`
 padstacks.push(`(padstack "${name}" (shape ${shape('F.Cu')}) (shape ${shape('B.Cu')}) (attach off))`)
 lib.push(`(image "${name}" (pin "${name}" 1 0 0))`)
 placements.push(`(component "${name}" (place ${name} ${num(h.x)} ${num(h.y)} front 0))`)
 netPins[`NC_${name}`]=[`${name}-1`]
}
const shapes=''
const wiring=of('pcb_trace').map((t:any)=>{
 const st=of('source_trace').find((e:any)=>e.source_trace_id===t.source_trace_id)
 const net=netNames.get(root(st.connected_source_port_ids[0]));if(!net)throw new Error('Manual wire net missing')
 if(t.route.some((p:any)=>p.route_type!=='wire'))throw new Error('Expected top-layer protected crystal wires')
 return `(wire (path F.Cu 200 ${t.route.map((p:any)=>`${num(p.x)} ${num(p.y)}`).join(' ')}) (net ${q(net)}) (type protect))`
})

const text=`(pcb display
(parser (string_quote ") (space_in_quoted_tokens on) (host_cad "tscircuit") (host_version "0.0.3069"))
(resolution um 10) (unit um)
(structure (layer F.Cu (type signal) (property (index 0))) (layer B.Cu (type signal) (property (index 1)))
(boundary (rect pcb ${num(-displaySize.width/2+.3)} ${num(-displaySize.height/2+.3)} ${num(displaySize.width/2-.3)} ${num(displaySize.height/2-.3)}))
${shapes}
(via "Via[0-1]_600:300_um") (rule (width 150) (clearance 160) (clearance 210 (type via_smd))))
(placement ${placements.join('\n')})
(library ${lib.join('\n')} ${padstacks.join('\n')}
(padstack "Via[0-1]_600:300_um" (shape (circle F.Cu 600)) (shape (circle B.Cu 600)) (attach off)))
(network ${Object.entries(netPins).map(([n,p])=>`(net ${q(n)} (pins ${p.join(' ')}))`).join('\n')}
(class default ${Object.keys(netPins).map(q).join(' ')} (circuit (use_via "Via[0-1]_600:300_um")) (rule (width 150) (clearance 160))))
(wiring ${wiring.join('\n')}))`
writeFileSync('output/display.unrouted.json',JSON.stringify(base,null,2))
writeFileSync('output/display.net-map.json',JSON.stringify(netSourceTrace,null,2))
writeFileSync('output/display.dsn',text)
console.log({nets:Object.keys(netPins).length,protectedWires:wiring.length,keepouts:keepouts.length})
