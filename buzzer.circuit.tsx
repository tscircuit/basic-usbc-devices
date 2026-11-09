import {StatusLed} from './status-led'
import {CH552E} from './imports/C967938'
import {GSD9605YB_5V2800} from './imports/C530415'
import {AO3400A} from './imports/C20917'
import {A_1N4148WS} from './imports/C2128'
import {boardRules,UsbInput,R,C,Wiring,Mounts} from './common'
export function BuzzerBoard({pcbX=0,pcbY=0,pcbRotation=0}:{pcbX?:number,pcbY?:number,pcbRotation?:number}={}){return <board {...boardRules} name="buzzer" pcbX={pcbX} pcbY={pcbY} pcbRotation={pcbRotation}>
 <schematicsheet name="buzzer_sheet" displayName="USB-C buzzer / 2.8 kHz" sheetSize="A4"><UsbInput dial/><Mounts/>
 <CH552E name="U1" pcbX={0} pcbY={-4.15} pcbRotation={90} noConnect={['pin3','pin4','pin5']}/>
 <GSD9605YB_5V2800 name="BUZZER1" pcbX={0} pcbY={7} pcbRotation={90} pinAttributes={{pin1:{requiresPower:true},pin2:{requiresGround:true}}}/>
 <AO3400A name="MOSFET1" pcbX={8.5} pcbY={4} pinAttributes={{pin1:{isPassive:true},pin2:{isPassive:true,requiresGround:true},pin3:{isPassive:true}}}/>
 <A_1N4148WS name="D2" pcbX={0} pcbY={13.2} connections={{cathode:'net.VBUS',anode:'net.BUZZ_NEG'}}/>
 <C name="C2" value="100nF" x={-8} y={-3} a="net.VBUS"/>
 <C name="C3" value="100nF" x={-8} y={-1} a="net.V33"/>
 <C name="C4" value="4.7uF" x={-8} y={7} a="net.VBUS" rotation={90}/>
 <R name="R3" value="10k" x={8.5} y={.5} a="net.BEEP" b="net.GND"/>
 <R name="R4" value="10k" x={-9} y={3.5} a="net.VBUS" b="net.BOOT"/>
 <testpoint name="TP1" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={-9} pcbY={1} connections={{pin1:'net.BOOT'}}/>
 <testpoint name="TP2" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={-7} pcbY={1} connections={{pin1:'net.DP'}}/>
 <Wiring nets={{VBUS:['.U1 > .pin9','.BUZZER1 > .pin1'],GND:['.U1 > .pin8','.MOSFET1 > .pin2'],V33:['.U1 > .pin10'],DP:['.U1 > .pin6'],DM:['.U1 > .pin7'],BEEP:['.U1 > .pin1','.MOSFET1 > .pin1'],BUZZ_NEG:['.BUZZER1 > .pin2','.MOSFET1 > .pin3']}}/>
 <silkscreentext text="USB BUZZER / 2.8kHz" pcbY={14.4} fontSize={.65}/>
 <StatusLed sink=".U1 > .pin2"/></schematicsheet></board>}
export default BuzzerBoard
