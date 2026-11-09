import {createStatusRouter} from './status-router'
import {StatusLed} from './status-led'
import { buttonModel, toggleModel } from './mechanical/models'
import { CH340C } from './imports/C84681'
import { JL010 } from './imports/C2681582'
import { K2_1102SP_Q4SC_04 } from './imports/C2930544'
import { A_1MS1T1B1M1QES_5 } from './imports/C496154'
import { boardRules, UsbInput, R, C, Wiring, Mounts } from './common'
export function DigitalBoard({kind='limit',pcbX=0,pcbY=0,pcbRotation=0}:{kind?:'limit'|'button'|'toggle',pcbX?:number,pcbY?:number,pcbRotation?:number}){
 return <board {...boardRules} name={kind} autorouter={kind==='limit'?{local:true,algorithmFn:createStatusRouter('limit',pcbX,pcbY,pcbRotation)}:boardRules.autorouter} pcbX={pcbX} pcbY={pcbY} pcbRotation={pcbRotation}>
 <schematicsheet name={kind+'_sheet'} displayName={kind==='limit'?'USB-C limit switch':kind==='toggle'?'USB-C toggle':'USB-C button'} sheetSize="A4"><UsbInput button={kind==='button'}/><Mounts/>
 <CH340C name="U1" pcbX={0} pcbY={0}/>
 <C name="C2" value="100nF" x={-8} y={0} a="net.VBUS"/>
 <C name="C3" value="100nF" x={-2} y={-4.8} a="net.V3"/>
 <R name="R3" value="10k" x={8} y={0} a="net.VBUS" b="net.SENSE"/>
 <R name="R4" value="220" x={8} y={3} a="net.SENSE" b="net.CONTACT"/>
 <C name="C4" value="100nF" x={-8} y={3} a="net.SENSE"/>
 {kind==='limit'? <JL010 name="SW1" pcbX={-0.3} pcbY={7.3} noConnect={["pin2"]}/>:
 kind==='toggle'?<A_1MS1T1B1M1QES_5 cadModel={toggleModel} name="SW1" pcbX={0} pcbY={8} pcbRotation={90} noConnect={["pin1"]}/>:<K2_1102SP_Q4SC_04 cadModel={buttonModel} name="SW1" pcbX={0} pcbY={8} internallyConnectedPins={[["pin1","pin2"],["pin3","pin4"]]}/>}
 <Wiring nets={{GND:['.U1 > .pin1','.U1 > .pin15',kind==='toggle'?'.SW1 > .pin2':'.SW1 > .pin1',...(kind==='button'?['.SW1 > .pin2']:[])],V3:['.U1 > .pin4'],VBUS:['.U1 > .pin16'],DP:['.U1 > .pin5'],DM:['.U1 > .pin6'],SENSE:['.U1 > .pin9'],CONTACT:['.SW1 > .pin3',...(kind==='button'?['.SW1 > .pin4']:[])]}}/>
 <silkscreentext text={kind==='limit'?'USB LIMIT / NC':kind==='toggle'?'USB TOGGLE':'BUTTON / 12mm'} pcbX={0} pcbY={13.5} fontSize={0.8}/>
 <silkscreentext text="CH340C / CTS" pcbX={0} pcbY={-7} fontSize={0.6}/>
 <StatusLed rx={kind==='limit'?-10.8:-11} ry={kind==='limit'?-6.4:-6.2} sink=".U1 > .pin13"/></schematicsheet></board>
}
export default ()=> <DigitalBoard kind="limit"/>
