import { TYPE_C_31_M_12 } from './imports/C165948'
import { USBLC6_2SC6 } from './imports/C7519'
export const boardRules = {
 width:24, height:30, layers:2, thickness:1.6,
 fabricatorPreset:'jlcpcb_economy', autorouter:'auto-local',
 minTraceWidth:0.2, minTraceToPadEdgeClearance:0.15,
 minPadEdgeToPadEdgeClearance:0.15, minViaEdgeToPadEdgeClearance:0.2,
 minViaHoleDiameter:0.3, minViaPadDiameter:0.6,
 minViaHoleEdgeToViaHoleEdgeClearance:0.3, minBoardEdgeClearance:0.3,
 pcbStyle:{viaHoleDiameter:0.3,viaPadDiameter:0.6},
} as const
const resistors={
 '5.1k':['C23186','0603WAF5101T5E'],
 '10k':['C25804','0603WAF1002T5E'],
 '220':['C22962','0603WAF2200T5E'],
 '2k':['C22975','0603WAF2001T5E'],
} as const
const capacitors={
 '100nF':['C14663','CC0603KRX7R9BB104'],
 '1uF':['C15849','CL10A105KB8NNNC'],
 '4.7uF':['C19666','CL10A475KO8NNNC'],
 '33pF':['C1663','CL10C330JB8NNNC'],
} as const
export function R({name,value,x,y,a,b,rotation=0}:{name:string,value:keyof typeof resistors,x:number,y:number,a:string,b:string,rotation?:number}){
 const [id,mpn]=resistors[value]
 return <resistor name={name} resistance={value} footprint="0603" pcbX={x} pcbY={y} pcbRotation={rotation} supplierPartNumbers={{jlcpcb:[id]}} manufacturerPartNumber={mpn} connections={{pin1:a,pin2:b}} />
}
export function C({name,value,x,y,a,b='net.GND',rotation=0}:{name:string,value:keyof typeof capacitors,x:number,y:number,a:string,b?:string,rotation?:number}){
 const [id,mpn]=capacitors[value]
 return <capacitor name={name} capacitance={value} footprint="0603" pcbX={x} pcbY={y} pcbRotation={rotation} supplierPartNumbers={{jlcpcb:[id]}} manufacturerPartNumber={mpn} connections={{pin1:a,pin2:b}} />
}
export function Wiring({nets}:{nets:Record<string,string[]>}){
 return <>{Object.entries(nets).flatMap(([net,pins])=>pins.map(pin=><trace name={`${net}_${pin.replace(/[^a-zA-Z0-9]/g,'')}`} key={pin} from={pin} to={`net.${net}`} />))}</>
}
export function UsbInput({distance=false,button=false,dial=false,compactDistance=false}:{distance?:boolean,button?:boolean,dial?:boolean,compactDistance?:boolean}={}){
 return <>
 <copperpour name="GROUND" layer="bottom" connectsTo="net.GND" clearance={0.2} boardEdgeMargin={0.6}/><net name="VBUS"/><net name="GND"/>
 <TYPE_C_31_M_12 name="J1" pcbX={0} pcbY={distance?-11.8:-9.2} pcbRotation={0} noConnect={["pin5","pin11"]} pinAttributes={{pin13:{requiresGround:true},pin14:{requiresGround:true},pin15:{providesPower:true,providesVoltage:5},pin16:{providesPower:true,providesVoltage:5}}}/>
 <USBLC6_2SC6 name="D1" pcbX={8} pcbY={distance?-11.5:compactDistance?-6:-5} pinAttributes={{pin1:{},pin2:{requiresGround:true},pin3:{},pin4:{},pin5:{requiresPower:true},pin6:{}}} internallyConnectedPins={[["pin1","pin6"],["pin3","pin4"]]}/>
 <R name="R1" value="5.1k" x={-8} y={distance?-13:(button||compactDistance)?-7.3:-7} a="net.CC1" b="net.GND" />
 <R name="R2" value="5.1k" x={distance?6.9:8} y={distance?-15:compactDistance?-8.8:-8.5} a="net.CC2" b="net.GND" />
 <C name="C1" value="1uF" x={-8} y={distance?-9.4:dial?-5:(button||compactDistance)?-5.3:-4} a="net.VBUS"/>
 <Wiring nets={{CC1:['.J1 > .pin6'],CC2:['.J1 > .pin12'],GND:['.J1 > .pin1','.J1 > .pin2','.J1 > .pin3','.J1 > .pin4','.J1 > .pin13','.J1 > .pin14','.D1 > .pin2'],VBUS:['.J1 > .pin15','.J1 > .pin16','.D1 > .pin5'],DP:['.J1 > .pin8','.J1 > .pin10','.D1 > .pin1','.D1 > .pin6'],DM:['.J1 > .pin7','.J1 > .pin9','.D1 > .pin3','.D1 > .pin4']}}/>
 </>
}
export function Mounts({width=24,height=30}:{width?:number,height?:number}={}){return <>
 {[-1,1].flatMap(sx=>[-1,1].map(sy=>{const x=sx*(width/2-2.5),y=sy*(height/2-2.5);return <>
 <hole name={`H${sx}_${sy}`} diameter={2.2} pcbX={x} pcbY={y}/>
 <keepout shape="circle" radius={2.3} pcbX={x} pcbY={y} layers={["top","bottom"]}/>
 </>}))}
 </>}
