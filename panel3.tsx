import { DigitalBoard } from './digital.circuit'
import { DistanceBoard } from './distance.circuit'
import { PositionBoard } from './position.circuit'
import { DialBoard } from './dial.circuit'
import { HubBoard } from './hub.circuit'

// Minimum-area guillotine packing of the seven rectangles, allowing rotations:
// 3 mm routed channels and 5 mm solid outer rails (8 mm from board to edge).
export const panelSize = { width: 67, height: 157 }
export const modules = [
  ...['limit','button','toggle','dial','position','distance'].map((name,i)=>({
    name,x:i%2===0?-13.5:13.5,y:55.5-Math.floor(i/2)*33,w:24,h:30,rotation:180,
  })),
  {name:'hub',x:0,y:-49.5,w:44,h:42,rotation:0},
]
export default function Panel3(){return <panel name="usb_homing_panel3" {...panelSize} layoutMode="none" panelizationMethod="none">
  {modules.map(b=>b.name==='hub'?<HubBoard pcbX={b.x} pcbY={b.y}/>:b.name==='distance'?<DistanceBoard pcbX={b.x} pcbY={b.y} pcbRotation={b.rotation}/>:b.name==='position'?<PositionBoard pcbX={b.x} pcbY={b.y} pcbRotation={b.rotation}/>:b.name==='dial'?<DialBoard pcbX={b.x} pcbY={b.y} pcbRotation={b.rotation}/>:<DigitalBoard kind={b.name as 'limit'|'button'|'toggle'} pcbX={b.x} pcbY={b.y} pcbRotation={b.rotation}/>)}
 </panel>}
export function PanelFrame(){return <board {...panelSize} layers={2} thickness={1.6}>
 <schematicsheet name="mechanical_frame"/>
 {modules.flatMap((b,i)=>{
  const tab=b.name==='hub'?11:7
  return [
   ...[-1,1].map(s=><cutout name={`horizontal_${i}_${s}`} shape="rect" pcbX={b.x} pcbY={b.y+s*(b.h/2+1.5)} width={b.w+6} height={3}/>),
   ...[-1,1].flatMap(s=>[[-b.h/2,-tab-2],[-tab+2,tab-2],[tab+2,b.h/2]].map(([a,z])=><cutout name={`slot_${i}_${s}_${a}`} shape="rect" pcbX={b.x+s*(b.w/2+1.5)} pcbY={b.y+(a+z)/2} width={3} height={z-a}/>)),
   ...[-1,1].flatMap(s=>[-tab,tab].flatMap(y=>[-1.5,-.75,0,.75,1.5].map(d=><hole name={`bite_${i}_${s}_${y}_${d}`} diameter={.5} pcbX={b.x+s*b.w/2} pcbY={b.y+y+d}/>))),
  ]
 })}
 <hole name="TOOL1" diameter={3} pcbX={-30.5} pcbY={75.5}/><hole name="TOOL2" diameter={3} pcbX={30.5} pcbY={75.5}/><hole name="TOOL3" diameter={3} pcbX={-30.5} pcbY={-75.5}/>
 <fiducial name="FID1" padDiameter={1} pcbX={-23.5} pcbY={75.5}/><fiducial name="FID2" padDiameter={1} pcbX={23.5} pcbY={75.5}/><fiducial name="FID3" padDiameter={1} pcbX={23.5} pcbY={-75.5}/>
 </board>}
