import {createStatusRouter} from './status-router'
import {StatusLed} from './status-led'
import { CH552E } from './imports/C967938'
import { EC11E15244B2 } from './imports/C470754'
import { boardRules, UsbInput, R, C, Wiring, Mounts } from './common'
export function DialBoard({pcbX=0,pcbY=0,pcbRotation=0}:{pcbX?:number,pcbY?:number,pcbRotation?:number}={}){return <board {...boardRules} name="dial" autorouter={{local:true,algorithmFn:createStatusRouter('dial',pcbX,pcbY,pcbRotation)}} pcbX={pcbX} pcbY={pcbY} pcbRotation={pcbRotation}>
 <schematicsheet name="dial_sheet" displayName="USB-C rotary dial" sheetSize="A4"><UsbInput dial/><Mounts/>
 <CH552E name="U1" pcbX={0} pcbY={-4.15} pcbRotation={90} noConnect={["pin5"]}/>
 <EC11E15244B2 name="ENC1" pcbX={0} pcbY={6.5}/>
 <C name="C2" value="100nF" x={-8} y={-3} a="net.VBUS"/>
 <C name="C3" value="100nF" x={-8} y={-1} a="net.V33"/>
 <R name="R3" value="10k" x={9.5} y={-0.5} a="net.VBUS" b="net.A"/>
 <R name="R4" value="10k" x={9.5} y={2} a="net.VBUS" b="net.B"/>
 <R name="R5" value="10k" x={9.5} y={4} a="net.VBUS" b="net.PUSH"/>
 <R name="R6" value="10k" x={-8} y={3.5} a="net.VBUS" b="net.BOOT"/>
 <testpoint name="TP1" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={-9} pcbY={1} connections={{pin1:'net.BOOT'}}/>
 <testpoint name="TP2" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={-7} pcbY={1} connections={{pin1:'net.DP'}}/>
 <Wiring nets={{VBUS:['.U1 > .pin9'],GND:['.U1 > .pin8','.ENC1 > .pin6','.ENC1 > .pin7','.ENC1 > .pin9','.ENC1 > .pin11'],V33:['.U1 > .pin10'],DP:['.U1 > .pin6'],DM:['.U1 > .pin7'],A:['.U1 > .pin1','.ENC1 > .pin8'],B:['.U1 > .pin3','.ENC1 > .pin10'],PUSH:['.U1 > .pin4','.ENC1 > .pin12']}}/>
 <silkscreentext text="USB DIAL / CH552E" pcbY={14.3} fontSize={0.65}/>
 <StatusLed rx={-10.8} ry={-6.4} sink=".U1 > .pin2"/></schematicsheet></board>}
export default DialBoard
