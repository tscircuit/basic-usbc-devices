import layout from './panel4-layout.json'
import preview from './output/panel4.viewer.circuit.json'
// Run bun run build:panel4 after changing the layout. The published entry uses
// the checked composite, preserving all copper and one sheet per module.
export const panelSize=layout.panelSize
export const modules=[...layout.modules].sort((a,b)=>['limit','button','toggle','dial','position','distance','hub','display','resetter','buzzer'].indexOf(a.name)-['limit','button','toggle','dial','position','distance','hub','display','resetter','buzzer'].indexOf(b.name))
export const circuitJson=preview
export function PanelFrame(){const {width:w,height:h}=panelSize;return <board {...panelSize} layers={2} thickness={1.6}>
 <schematicsheet name="mechanical_frame"/>
 {modules.flatMap((b,i)=>{
  // Breakaway tabs follow each board's original side edges, so rotating a
  // board never puts perforations through its USB or display connector.
  const quarter=Math.abs(b.rotation/90)%2===1
  const ow=quarter?b.h:b.w,oh=quarter?b.w:b.h
  const tabs=b.name==='hub'?[-11,11]:b.name==='display'?[-10,10]:b.name==='resetter'?[-16,10]:[-7,7]
  const angle=b.rotation*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle)
  const p=(x:number,y:number)=>({pcbX:b.x+c*x-s*y,pcbY:b.y+s*x+c*y})
  const rect=(x:number,y:number,w:number,h:number)=><cutout shape="rect" {...p(x,y)} width={quarter?h:w} height={quarter?w:h}/>
  const intervals=[[-oh/2,tabs[0]-2],[tabs[0]+2,tabs[1]-2],[tabs[1]+2,oh/2]]
  return [
   ...[-1,1].map(sign=>rect(0,sign*(oh/2+1.5),ow+6,3)),
   ...[-1,1].flatMap(sign=>intervals.filter(([a,z])=>z>a).map(([a,z])=>rect(sign*(ow/2+1.5),(a+z)/2,3,z-a))),
   ...[-1,1].flatMap(sign=>tabs.flatMap(y=>[-1.5,-.75,0,.75,1.5].map(d=><hole diameter={.5} {...p(sign*(ow/2+.15),y+d)}/>))),
  ]
 })}
 <hole name="TOOL1" diameter={3} pcbX={-w/2+3} pcbY={h/2-3}/><hole name="TOOL2" diameter={3} pcbX={w/2-3} pcbY={h/2-3}/><hole name="TOOL3" diameter={3} pcbX={-w/2+3} pcbY={-h/2+3}/>
 <fiducial name="FID1" padDiameter={1} pcbX={-w/2+10} pcbY={h/2-3}/><fiducial name="FID2" padDiameter={1} pcbX={w/2-10} pcbY={h/2-3}/><fiducial name="FID3" padDiameter={1} pcbX={w/2-10} pcbY={-h/2+3}/>
 </board>}
