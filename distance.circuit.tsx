import { CH341T } from './imports/C23971'
import { VL53L0CXV0DH_1 } from './imports/C91199'
import { XC6206P332MR_G } from './imports/C5446'
import { X322512MSB4SI } from './imports/C9002'
import { boardRules, UsbInput, R, C, Wiring, Mounts } from './common'
export function DistanceBoard({pcbX=0,pcbY=0}:{pcbX?:number,pcbY?:number}={}){return <board {...boardRules} name="distance" pcbX={pcbX} pcbY={pcbY}>
 <schematicsheet name="distance_sheet" displayName="USB-C distance sensor" sheetSize="A4"><UsbInput compactDistance/><Mounts/><net name="V3V3"/>
 <CH341T name="U1" pcbX={0} pcbY={0}/>
 <XC6206P332MR_G name="U2" pcbX={-8.5} pcbY={0}/>
 <VL53L0CXV0DH_1 name="U3" pcbX={0} pcbY={10}/>
 <X322512MSB4SI name="Y1" loadCapacitance="20pF" pcbX={7} pcbY={0} pcbRotation={90}/>
 <C name="C2" value="1uF" x={-8} y={3} a="net.VBUS"/>
 <C name="C3" value="1uF" x={-8} y={5.5} a="net.V3V3"/>
 <C name="C4" value="100nF" x={-3} y={6} a="net.V3V3"/>
 <C name="C5" value="100nF" x={1} y={6.5} a="net.V3V3"/>
 <C name="C6" value="33pF" x={5.5} y={3} a="net.XI"/>
 <C name="C7" value="33pF" x={9.8} y={-2.8} a="net.XO"/>
 <C name="C8" value="100nF" x={4} y={9} a="net.V3V3"/>
 <C name="C9" value="4.7uF" x={4} y={12} a="net.V3V3"/>
 <R name="R3" value="2k" x={-8} y={8} a="net.MODE" b="net.GND"/>
 <R name="R4" value="2k" x={4} y={7} a="net.V3V3" b="net.SDA"/>
 <R name="R5" value="2k" x={8} y={6} a="net.V3V3" b="net.SCL"/>
 <R name="R6" value="10k" x={-4} y={10} a="net.V3V3" b="net.XSHUT"/>
 <Wiring nets={{
 MODE:['.U1 > .pin1'],XSHUT:['.U3 > .pin5'],GND:['.U1 > .pin11','.U1 > .pin12','.U2 > .pin1','.Y1 > .pin2','.Y1 > .pin4','.U3 > .pin2','.U3 > .pin3','.U3 > .pin4','.U3 > .pin6','.U3 > .pin12'],
 VBUS:['.U2 > .pin2'],V3V3:['.U2 > .pin3','.U1 > .pin6','.U1 > .pin13','.U1 > .pin20','.U3 > .pin1','.U3 > .pin11'],
 DP:['.U1 > .pin7'],DM:['.U1 > .pin8'],XI:['.U1 > .pin9','.Y1 > .pin3'],XO:['.U1 > .pin10','.Y1 > .pin1'],
 SDA:['.U1 > .pin15','.U3 > .pin9'],SCL:['.U1 > .pin16','.U3 > .pin10']}}/>
 <trace name="CRYSTAL_0" from=".U1 > .pin9" to=".Y1 > .pin3" pcbPathRelativeTo=".U1 > .pin9" pcbPath={[{x:2.275078,y:-1.7},{x:4.5,y:-1.7},{x:4.5,y:1.1}]}/>
 <trace name="CRYSTAL_1" from=".U1 > .pin10" to=".Y1 > .pin1" pcbPathRelativeTo=".U1 > .pin10" pcbPath={[{x:4.2,y:-3.482086},{x:7.85,y:-3.482086}]}/>
 <trace name="CRYSTAL_2" from=".C6 > .pin1" to=".Y1 > .pin3" pcbPathRelativeTo=".C6 > .pin1" pcbPath={[{x:-0.825,y:-1.9}]}/>
 <trace name="CRYSTAL_3" from=".C7 > .pin1" to=".Y1 > .pin1" pcbPathRelativeTo=".C7 > .pin1" pcbPath={[{x:-1.95,y:0}]}/>
 <silkscreentext text="USB DISTANCE / 30-300mm" pcbY={13.7} fontSize={0.7}/>
 </schematicsheet></board>}
export default DistanceBoard
