import { hubRouter } from './hub-router'
import { CH334F } from './imports/C5187527'
import { TUSB321AIRWBR } from './imports/C2674046'
import { TPS2552DBVR } from './imports/C46506'
import { SN74LVC2G32DCUR } from './imports/C91874'
import { A_2N7002 } from './imports/C8545'
import { TYPE_C_31_M_12 } from './imports/C165948'
import { USBLC6_2SC6 } from './imports/C7519'
import { X322512MSB4SI } from './imports/C9002'
import { boardRules, C, R, Wiring } from './common'

const hres = {'220k':['C22961','0603WAF2203T5E'], '910k':['C23263','0603WAF9103T5E'], '1k':['C21190','0603WAF1001T5E']} as const
function HR({name,value,x,y,a,b}:{name:string,value:keyof typeof hres,x:number,y:number,a:string,b:string}){
 const [id,mpn]=hres[value]; return <resistor name={name} resistance={value} footprint="0603" pcbX={x} pcbY={y} manufacturerPartNumber={mpn} supplierPartNumbers={{jlcpcb:[id]}} connections={{pin1:`net.${a}`,pin2:`net.${b}`}}/>
}
function Bulk({name,x,y,net}:{name:string,x:number,y:number,net:string}){
 // Wurth 865060243005 manufacturer drawing: 3.5 x 1.6 lands, 2.1 gap.
 return <capacitor name={name} capacitance="150uF" polarized maxVoltageRating="10V" pcbX={x} pcbY={y} manufacturerPartNumber="865060243005" supplierPartNumbers={{jlcpcb:['C1972424']}} connections={{pin1:`net.${net}`,pin2:'net.GND'}} footprint={<footprint>
 <smtpad portHints={['pin1']} pcbX={2.8} pcbY={0} width={3.5} height={1.6} shape="rect"/>
 <smtpad portHints={['pin2']} pcbX={-2.8} pcbY={0} width={3.5} height={1.6} shape="rect"/>
 <silkscreencircle pcbX={0} pcbY={0} radius={3.3}/><silkscreentext text="+" pcbX={3.8} pcbY={1.6} fontSize={1}/>
 <courtyardoutline outline={[{x:-4.8,y:-3.6},{x:4.8,y:-3.6},{x:4.8,y:3.6},{x:-4.8,y:3.6},{x:-4.8,y:-3.6}]}/>
 </footprint>}/>
}
function USB({i,x,y,rotation=180}:{i:number,x:number,y:number,rotation?:number}){
 const v=i===0?'VBUS':`VBUS${i}`,dp=`DP${i}`,dm=`DM${i}`;
 return <>
 <TYPE_C_31_M_12 name={`J${i+1}`} pcbX={x} pcbY={y} pcbRotation={rotation} noConnect={['pin5','pin11']} pinAttributes={{pin13:{requiresGround:true},pin14:{requiresGround:true},pin15:i===0?{providesPower:true,providesVoltage:5}:{requiresPower:true},pin16:i===0?{providesPower:true,providesVoltage:5}:{requiresPower:true}}}/>
 <Wiring nets={{GND:[1,2,3,4,13,14].map(p=>`.J${i+1} > .pin${p}`),[v]:[15,16].map(p=>`.J${i+1} > .pin${p}`),[dp]:[8,10].map(p=>`.J${i+1} > .pin${p}`),[dm]:[7,9].map(p=>`.J${i+1} > .pin${p}`),[`CC${i}A`]:[`.J${i+1} > .pin6`],[`CC${i}B`]:[`.J${i+1} > .pin12`]}}/>
 </>
}
function ESD({i,x,y}:{i:number,x:number,y:number}) {return <USBLC6_2SC6 name={`D${i+1}`} pcbX={x} pcbY={y} pinAttributes={{pin1:{},pin2:{requiresGround:true},pin3:{},pin4:{},pin5:{requiresPower:true},pin6:{}}} internallyConnectedPins={[["pin1","pin6"],["pin3","pin4"]]} connections={{pin1:`net.DP${i}`,pin6:`net.DP${i}`,pin3:`net.DM${i}`,pin4:`net.DM${i}`,pin2:'net.GND',pin5:`net.${i===0?'VBUS':`VBUS${i}`}`}}/>}
export function HubBoard({routingDisabled=false}:{routingDisabled?:boolean}={}){return <board routingDisabled={routingDisabled} {...boardRules} name="hub" minTraceWidth={0.15} autorouter={{local:true,algorithmFn:hubRouter}} routeRemaining width={64} height={48} thickness={1} schMaxTraceDistance={2} schStyle={{defaultPassiveSize:"xs"}} schLayout={{grid:true,gridCols:10,gridGap:0.3}}>
 <schematicsheet name="hub_sheet" displayName="USB-C 4-port USB 2.0 hub / bus powered" sheetSize="A4">
 <net name="GND"/><net name="VBUS"/>
 {["XI","XO"].map(n=><net name={n}/>)}
 {[0,1,2,3,4].flatMap(i=>[`DP${i}`,`DM${i}`].map(n=><net name={n}/>))}
 {[1,2,3,4].flatMap(i=>[`CC${i}A`,`CC${i}B`,`DET${i}`,`ID${i}_N`,`EN${i}_N`,`ILIM${i}`,`DIS${i}`,`VBUS${i}`].map(n=><net name={n}/>))}
 {["CC0A","CC0B","PWREN_N","OC_N"].map(n=><net name={n}/>)}
 <net name="V3V3"/>
 <copperpour name="GROUND" layer="bottom" connectsTo="net.GND" clearance={0.2} boardEdgeMargin={0.6}/>
 {[-9.5,9.5].flatMap(x=>[-20.5,4.5].map(y=><><hole diameter={2.2} pcbX={x} pcbY={y}/><keepout shape="circle" radius={2.3} pcbX={x} pcbY={y} layers={['top','bottom']}/></>))}
 <USB i={0} x={0} y={-18.2} rotation={0}/>
 <ESD i={0} x={0} y={-7}/>
 <R name="R1" value="5.1k" x={-3.5} y={-13} a="net.CC0A" b="net.GND"/>
 <R name="R2" value="5.1k" x={3.5} y={-13} a="net.CC0B" b="net.GND"/>
 <C name="C1" value="1uF" x={0} y={-4} a="net.VBUS"/>
 <CH334F name="U1" pcbX={0} pcbY={4.5} pcbRotation={90} noConnect={['pin2','pin13','pin16','pin17','pin21','pin22','pin23']} pinAttributes={{pin25:{requiresGround:true},pin19:{requiresPower:true},pin20:{providesPower:true,providesVoltage:3.3}}}/>
 <C name="C2" value="1uF" x={-4.5} y={3} a="net.VBUS"/>
 <C name="C3" value="1uF" x={-4.5} y={5} a="net.V3V3"/>
 <C name="C4" value="100nF" x={0} y={-1} a="net.V3V3"/>
 <X322512MSB4SI name="Y1" loadCapacitance="20pF" pcbX={5.2} pcbY={4.5} pcbRotation={90}/>
 <C name="C5" value="33pF" x={5.5} y={8} a="net.XI"/>
 <C name="C6" value="33pF" x={5.5} y={1} a="net.XO"/>
 <R name="R3" value="10k" x={4} y={-5} a="net.V3V3" b="net.OC_N"/>
 <R name="R4" value="10k" x={-3.7} y={-9.5} a="net.V3V3" b="net.PWREN_N"/>
 <Wiring nets={{GND:['.U1 > .pin18','.U1 > .pin25','.Y1 > .pin2','.Y1 > .pin4'],VBUS:['.U1 > .pin19'],V3V3:['.U1 > .pin20'],OC_N:['.U1 > .pin1'],PWREN_N:['.U1 > .pin24'],XI:['.U1 > .pin4','.Y1 > .pin3'],XO:['.U1 > .pin3','.Y1 > .pin1'],DP0:['.U1 > .pin15'],DM0:['.U1 > .pin14'],DP1:['.U1 > .pin12'],DM1:['.U1 > .pin11'],DP2:['.U1 > .pin10'],DM2:['.U1 > .pin9'],DP3:['.U1 > .pin8'],DM3:['.U1 > .pin7'],DP4:['.U1 > .pin6'],DM4:['.U1 > .pin5']}}/>
 {[1,2].map(g=><><SN74LVC2G32DCUR name={`U${g+1}`} pcbX={g===1?-15:15} pcbY={-20} connections={{pin1:`net.ID${g*2-1}_N`,pin2:'net.PWREN_N',pin7:`net.EN${g*2-1}_N`,pin5:`net.ID${g*2}_N`,pin6:'net.PWREN_N',pin3:`net.EN${g*2}_N`,pin4:'net.GND',pin8:'net.V3V3'}}/><C name={`C${g+6}`} value="100nF" x={g===1?-15:15} y={-22.5} a="net.V3V3"/></>)}
 {[-23.25,-7.75,7.75,23.25].map((x,k)=>{const i=k+1,u=4+k*3,base=10+k*10;return <>
 <USB i={i} x={x} y={18.2}/><ESD i={i} x={x} y={12}/>
 <TUSB321AIRWBR name={`U${u}`} pcbX={x-5.6} pcbY={11.5} noConnect={['pin6','pin7','pin8','pin11']} connections={{pin1:`net.CC${i}A`,pin2:`net.CC${i}B`,pin3:'net.GND',pin4:'net.VBUS',pin5:`net.DET${i}`,pin9:`net.ID${i}_N`,pin10:'net.GND',pin12:'net.VBUS'}}/>
 <C name={`C${base}`} value="100nF" x={x-5.5} y={8} a="net.VBUS"/>
 <HR name={`R${base}`} value="910k" x={x-5.8} y={14} a={`VBUS${i}`} b={`DET${i}`}/>
 <R name={`R${base+1}`} value="10k" x={x-6} y={20.5} rotation={90} a="net.V3V3" b={`net.ID${i}_N`}/>
 <TPS2552DBVR name={`U${u+1}`} pcbX={x} pcbY={-4} pinAttributes={{pin1:{requiresPower:true},pin2:{requiresGround:true},pin6:{providesPower:true,providesVoltage:5}}} connections={{pin1:'net.VBUS',pin2:'net.GND',pin3:`net.EN${i}_N`,pin4:'net.OC_N',pin5:`net.ILIM${i}`,pin6:`net.VBUS${i}`}}/>
 <HR name={`R${base+2}`} value="220k" x={x-3} y={-6.5} a={`ILIM${i}`} b="GND"/>
 <C name={`C${base+1}`} value="100nF" x={x+3} y={-6.5} a="net.VBUS"/>
 <Bulk name={`C${base+2}`} x={[-24,-12,12,24][k]} y={-13} net={`VBUS${i}`}/>
 <C name={`C${base+3}`} value="100nF" x={x+4.5} y={8} a={`net.VBUS${i}`}/>
 <A_2N7002 name={`MOSFET${i}`} pcbX={[-25,-20,20,25][k]} pcbY={-19.5} pinAttributes={{pin1:{isPassive:true},pin2:{isPassive:true,requiresGround:true},pin3:{isPassive:true}}} connections={{pin1:`net.EN${i}_N`,pin2:'net.GND',pin3:`net.DIS${i}`}}/>
 <HR name={`R${base+3}`} value="1k" x={[-25,-20,20,25][k]} y={-22.4} a={`VBUS${i}`} b={`DIS${i}`}/>
 <silkscreentext text={`P${i} / 100mA`} pcbX={x} pcbY={22.5} fontSize={0.65}/>
 </>})}
 <trace name="CLOCK_XI" from=".U1 > .pin4" to=".Y1 > .pin3" pcbPath={[{x:0.249936,y:-3.1},{x:1.1000746,y:-3.1},{x:1.1000746,y:-4.35}]}/>
 <trace name="CLOCK_XO" from=".U1 > .pin3" to=".Y1 > .pin1" pcbPath={[{x:-0.249936,y:-3.1},{x:-2.3,y:-3.1},{x:-2.3,y:-6.05},{x:-1.1000746,y:-6.05}]}/>
 <trace name="CLOCK_C5" from=".C5 > .pin1" to=".Y1 > .pin3" pcbPath={[{x:-1.15,y:-0.7},{x:-1.15,y:-2.3999254}]}/>
 <trace name="CLOCK_C6" from=".C6 > .pin1" to=".Y1 > .pin1" pcbPath={[{x:-0.825,y:1.2},{x:0.55,y:1.2},{x:0.55,y:2.3999254}]}/>
 <silkscreentext text="USB 2.0 HUB / CH334F / HOST POWER" pcbX={1} pcbY={-23} fontSize={0.8}/>
 </schematicsheet></board>}
export default HubBoard
