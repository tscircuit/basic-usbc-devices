import { DigitalBoard } from './digital.circuit'
import { DistanceBoard } from './distance.circuit'
import {PositionBoard} from './position.circuit'
import { DialBoard } from './dial.circuit'
export const panelSize={width:177,height:46}
export const modules=[-67.5,-40.5,-13.5,13.5,40.5,67.5].map(x=>({x,y:0,w:24,h:30}))
// Source-level layout. export.tsx places the individually checked routes verbatim.
export default function Panel(){return <panel name="usb_homing_panel" {...panelSize} layoutMode="none" panelizationMethod="none">
 <DigitalBoard kind="limit" pcbX={-67.5}/><DigitalBoard kind="button" pcbX={-40.5}/><DigitalBoard kind="toggle" pcbX={-13.5}/>
 <DialBoard pcbX={13.5}/><PositionBoard pcbX={40.5}/><DistanceBoard pcbX={67.5}/>
 </panel>}
export function PanelFrame(){return <board {...panelSize} layers={2}><schematicsheet name="mechanical_frame"/>
 {modules.flatMap((b,i)=>[
 ...[-1,1].map(s=><cutout name={`horizontal_${i}_${s}`} shape="rect" pcbX={b.x} pcbY={s*16.5} width={30} height={3}/>),
 ...[-1,1].flatMap(s=>[[-15,-9],[-5,5],[9,15]].map(([a,z])=><cutout name={`slot_${i}_${s}_${a}`} shape="rect" pcbX={b.x+s*13.5} pcbY={(a+z)/2} width={3} height={z-a}/>)),
 ...[-1,1].flatMap(s=>[-7,7].flatMap(y=>[-1.5,-0.75,0,0.75,1.5].map(d=><hole name={`bite_${i}_${s}_${y}_${d}`} diameter={0.5} pcbX={b.x+s*12.15} pcbY={y+d}/>)))
 ])}
 <hole name="TOOL1" diameter={3} pcbX={-84.5} pcbY={20}/><hole name="TOOL2" diameter={3} pcbX={84.5} pcbY={20}/><hole name="TOOL3" diameter={3} pcbX={-84.5} pcbY={-20}/>
 <fiducial padDiameter={1} name="FID1" pcbX={-77.5} pcbY={20}/><fiducial padDiameter={1} name="FID2" pcbX={77.5} pcbY={20}/><fiducial padDiameter={1} name="FID3" pcbX={77.5} pcbY={-20}/>
 </board>}
