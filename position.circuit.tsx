import { CH552E } from './imports/C967938'
import { RK09K1130A5R } from './imports/C209779'
import { boardRules, UsbInput, R, C, Wiring, Mounts } from './common'
export function PositionBoard({pcbX=0,pcbY=0}:{pcbX?:number,pcbY?:number}={}){return <board {...boardRules} name="position" pcbX={pcbX} pcbY={pcbY}>
 <schematicsheet name="position_sheet" displayName="USB-C absolute position dial" sheetSize="A4"><UsbInput dial/><Mounts/>
 <CH552E name="U1" pcbX={0} pcbY={-4.15} pcbRotation={90} noConnect={["pin2","pin3","pin4","pin5"]}/>
 <RK09K1130A5R name="POT1" pcbX={0} pcbY={2.65} pinAttributes={{pin1:{isPassive:true,requiresGround:true},pin2:{isPassive:true},pin3:{isPassive:true},pin4:{isPassive:true},pin5:{isPassive:true},EH1:{isPassive:true},EH2:{isPassive:true}}}/>
 <C name="C2" value="100nF" x={-8} y={-3} a="net.VBUS"/>
 <C name="C3" value="100nF" x={-8} y={-1} a="net.V33"/>
 <R name="R3" value="220" x={-8} y={2.5} a="net.WIPER" b="net.ADC"/>
 <C name="C4" value="100nF" x={-8} y={5} a="net.ADC"/>
 <R name="R4" value="10k" x={8.5} y={0} a="net.VBUS" b="net.BOOT"/>
 <testpoint name="TP1" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={8} pcbY={2.5} connections={{pin1:'net.BOOT'}}/>
 <testpoint name="TP2" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={10} pcbY={2.5} connections={{pin1:'net.DP'}}/>
 <Wiring nets={{VBUS:['.U1 > .pin9','.POT1 > .pin3'],GND:['.U1 > .pin8','.POT1 > .pin1','.POT1 > .pin4','.POT1 > .pin5'],V33:['.U1 > .pin10'],DP:['.U1 > .pin6'],DM:['.U1 > .pin7'],ADC:['.U1 > .pin1'],WIPER:['.POT1 > .pin2']}}/>
 <silkscreentext text="USB POSITION / 280deg" pcbY={14} fontSize={0.65}/>
 </schematicsheet></board>}
export default PositionBoard
