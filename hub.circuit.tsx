import {StatusLed} from './status-led'
import {AT24C02D_STUM_T} from './imports/C79996'
import { createHubRouter } from './hub-router'
import { CH334F } from './imports/C5187527'
import { TUSB321AIRWBR } from './imports/C2674046'
import { TPS2552DBVR } from './imports/C46506'
import { SN74LVC2G32DCUR } from './imports/C91874'
import { A_2N7002 } from './imports/C8545'
import { TYPE_C_31_M_12 } from './imports/C165948'
import { USBLC6_2SC6 } from './imports/C7519'
import { X322512MSB4SI } from './imports/C9002'
import { boardRules, C as BaseC, R as BaseR, Wiring } from './common'
import { hubSize, hubMounts, pcb, position, sch } from './hub-layout'
function C(props:Omit<Parameters<typeof BaseC>[0],"x"|"y">){const p=position(props.name);return <BaseC {...props} x={p.x} y={p.y} rotation={p.rotation??0} {...sch(props.name)}/>}
function R(props:Omit<Parameters<typeof BaseR>[0],"x"|"y">){const p=position(props.name);return <BaseR {...props} x={p.x} y={p.y} rotation={p.rotation??0} {...sch(props.name)}/>}

const hres = {'220k':['C22961','0603WAF2203T5E'], '910k':['C23263','0603WAF9103T5E'], '1k':['C21190','0603WAF1001T5E']} as const
function HR({name,value,a,b}:{name:string,value:keyof typeof hres,a:string,b:string}){
 const [id,mpn]=hres[value]; return <resistor name={name} resistance={value} footprint="0603" {...pcb(name)} {...sch(name)} manufacturerPartNumber={mpn} supplierPartNumbers={{jlcpcb:[id]}} connections={{pin1:`net.${a}`,pin2:`net.${b}`}}/>
}
function Bulk({name,net}:{name:string,net:string}){
 // FOSAN FVH datasheet p46: 3.5 x 1.6 mm lands, 1.9 mm gap.
 // 220 uF / 10 V, 6.3 x 5.4 mm; positive terminal remains on the right.
 return <capacitor name={name} capacitance="220uF" polarized maxVoltageRating="10V" {...pcb(name)} {...sch(name)} manufacturerPartNumber="FVH010ADA221M0654" supplierPartNumbers={{jlcpcb:['C7469982']}} connections={{pin1:`net.${net}`,pin2:'net.GND'}} footprint={<footprint>
 <smtpad portHints={['pin1']} pcbX={2.7} pcbY={0} width={3.5} height={1.6} shape="rect"/>
 <smtpad portHints={['pin2']} pcbX={-2.7} pcbY={0} width={3.5} height={1.6} shape="rect"/>
 <silkscreencircle pcbX={0} pcbY={0} radius={3.3}/><silkscreentext text="+" pcbX={3.8} pcbY={1.6} fontSize={1}/>
 <courtyardoutline outline={[{x:-4.8,y:-3.6},{x:4.8,y:-3.6},{x:4.8,y:3.6},{x:-4.8,y:3.6},{x:-4.8,y:-3.6}]}/>
 </footprint>}/>
}
function USB({i}:{i:number}){
 const v=i===0?'VBUS':`VBUS${i}`,dp=`DP${i}`,dm=`DM${i}`;
 return <>
 <TYPE_C_31_M_12 name={`J${i+1}`} {...pcb(`J${i+1}`)} {...sch(`J${i+1}`)} noConnect={['pin5','pin11']} pinAttributes={{pin13:{requiresGround:true},pin14:{requiresGround:true},pin15:i===0?{providesPower:true,providesVoltage:5}:{requiresPower:true},pin16:i===0?{providesPower:true,providesVoltage:5}:{requiresPower:true}}}/>
 <Wiring nets={{GND:[1,2,3,4,13,14].map(p=>`.J${i+1} > .pin${p}`),[v]:[15,16].map(p=>`.J${i+1} > .pin${p}`),[dp]:[8,10].map(p=>`.J${i+1} > .pin${p}`),[dm]:[7,9].map(p=>`.J${i+1} > .pin${p}`),[`CC${i}A`]:[`.J${i+1} > .pin6`],[`CC${i}B`]:[`.J${i+1} > .pin12`]}}/>
 </>
}
function ESD({i}:{i:number}) {return <USBLC6_2SC6 name={`D${i+1}`} {...pcb(`D${i+1}`)} {...sch(`D${i+1}`)} pinAttributes={{pin1:{},pin2:{requiresGround:true},pin3:{},pin4:{},pin5:{requiresPower:true},pin6:{}}} internallyConnectedPins={[["pin1","pin6"],["pin3","pin4"]]} connections={{pin1:`net.DP${i}`,pin6:`net.DP${i}`,pin3:`net.DM${i}`,pin4:`net.DM${i}`,pin2:'net.GND',pin5:`net.${i===0?'VBUS':`VBUS${i}`}`}}/>}
export function HubBoard({routingDisabled=false,pcbX=0,pcbY=0,pcbRotation=0}:{routingDisabled?:boolean,pcbX?:number,pcbY?:number,pcbRotation?:number}={}){return <board pcbX={pcbX} pcbY={pcbY} pcbRotation={pcbRotation} routingDisabled={routingDisabled} {...boardRules} name="hub" minTraceWidth={0.11} autorouter={{local:true,algorithmFn:createHubRouter(pcbX,pcbY,pcbRotation)}} routeRemaining {...hubSize} thickness={1.6} schMaxTraceDistance={1.2} schStyle={{defaultPassiveSize:"xs"}} schLayout={{layoutMode:"none"}}>
 <schematicsheet name="hub_sheet" displayName="USB-C 4-port USB 2.0 hub / bus powered" sheetSize="A4">
 <schematictext text="HOST / USB-C INPUT" schX={-10.5} schY={10} fontSize={0.35}/><schematictext text="CH334F / 12 MHz / BUS POWERED" schX={-.8} schY={10} fontSize={0.35}/><schematictext text="PORT POWER ENABLE" schX={10.5} schY={10} fontSize={0.35}/>
 {[-11.4,-3.8,3.8,11.4].map((x,i)=><schematictext text={`PORT ${i+1} / USB-C / 100 mA`} schX={x} schY={2.1} fontSize={0.32}/>)}
 <net name="GND"/><net name="VBUS"/>
 {["XI","XO"].map(n=><net name={n}/>)}
 {[0,1,2,3,4].flatMap(i=>[`DP${i}`,`DM${i}`].map(n=><net name={n}/>))}
 {[1,2,3,4].flatMap(i=>[`CC${i}A`,`CC${i}B`,`DET${i}`,`ID${i}_N`,`EN${i}_N`,`ILIM${i}`,`DIS${i}`,`VBUS${i}`].map(n=><net name={n}/>))}
 {["CC0A","CC0B","PWREN_N","OC_N"].map(n=><net name={n}/>)}
 <net name="V3V3"/>
 <copperpour name="GROUND" layer="bottom" connectsTo="net.GND" clearance={0.2} boardEdgeMargin={0.6}/>
 {hubMounts.map(({x,y})=><><hole diameter={2.2} pcbX={x} pcbY={y}/><keepout shape="circle" radius={2.3} pcbX={x} pcbY={y} layers={['top','bottom']}/></>)}
 <USB i={0}/>
 <ESD i={0}/>
 <R name="R1" value="5.1k" a="net.CC0A" b="net.GND"/>
 <R name="R2" value="5.1k" a="net.CC0B" b="net.GND"/>
 <C name="C1" value="1uF" a="net.VBUS"/>
 <CH334F name="U1" {...pcb("U1")} {...sch("U1")} noConnect={['pin2','pin16','pin17','pin22']} pinAttributes={{pin25:{requiresGround:true},pin19:{requiresPower:true},pin20:{providesPower:true,providesVoltage:3.3}}}/>
 <C name="C2" value="1uF" a="net.VBUS"/>
 <C name="C3" value="1uF" a="net.V3V3"/>
 <C name="C4" value="100nF" a="net.V3V3"/>
 <X322512MSB4SI name="Y1" loadCapacitance="20pF" {...pcb("Y1")} {...sch("Y1")}/>
 <C name="C5" value="33pF" a="net.XI"/>
 <C name="C6" value="33pF" a="net.XO"/>
 <R name="R3" value="10k" a="net.V3V3" b="net.OC_N"/>
 <R name="R4" value="10k" a="net.V3V3" b="net.PWREN_N"/>
 <Wiring nets={{GND:['.U1 > .pin18','.U1 > .pin25','.Y1 > .pin2','.Y1 > .pin4'],VBUS:['.U1 > .pin19'],V3V3:['.U1 > .pin20'],OC_N:['.U1 > .pin1'],PWREN_N:['.U1 > .pin24'],XI:['.U1 > .pin4','.Y1 > .pin3'],XO:['.U1 > .pin3','.Y1 > .pin1'],DP0:['.U1 > .pin15'],DM0:['.U1 > .pin14'],DP1:['.U1 > .pin12'],DM1:['.U1 > .pin11'],DP2:['.U1 > .pin10'],DM2:['.U1 > .pin9'],DP3:['.U1 > .pin8'],DM3:['.U1 > .pin7'],DP4:['.U1 > .pin6'],DM4:['.U1 > .pin5']}}/>
 {[1,2].map(g=><><SN74LVC2G32DCUR name={`U${g+1}`} {...pcb(`U${g+1}`)} {...sch(`U${g+1}`)} connections={{pin1:`net.ID${g*2-1}_N`,pin2:'net.PWREN_N',pin7:`net.EN${g*2-1}_N`,pin5:`net.ID${g*2}_N`,pin6:'net.PWREN_N',pin3:`net.EN${g*2}_N`,pin4:'net.GND',pin8:'net.V3V3'}}/><C name={`C${g+6}`} value="100nF" a="net.V3V3"/></>)}
 {[0,1,2,3].map(k=>{const i=k+1,u=4+k*3,base=10+k*10;return <>
 <USB i={i}/><ESD i={i}/>
 <TUSB321AIRWBR name={`U${u}`} {...pcb(`U${u}`)} {...sch(`U${u}`)} noConnect={['pin6','pin7','pin8','pin11']} connections={{pin1:`net.CC${i}A`,pin2:`net.CC${i}B`,pin3:'net.GND',pin4:'net.VBUS',pin5:`net.DET${i}`,pin9:`net.ID${i}_N`,pin10:'net.GND',pin12:'net.VBUS'}}/>
 <C name={`C${base}`} value="100nF" a="net.VBUS"/>
 <HR name={`R${base}`} value="910k" a={`VBUS${i}`} b={`DET${i}`}/>
 <R name={`R${base+1}`} value="10k" a="net.V3V3" b={`net.ID${i}_N`}/>
 <TPS2552DBVR name={`U${u+1}`} {...pcb(`U${u+1}`)} {...sch(`U${u+1}`)} pinAttributes={{pin1:{requiresPower:true},pin2:{requiresGround:true},pin6:{providesPower:true,providesVoltage:5}}} connections={{pin1:'net.VBUS',pin2:'net.GND',pin3:`net.EN${i}_N`,pin4:'net.OC_N',pin5:`net.ILIM${i}`,pin6:`net.VBUS${i}`}}/>
 <HR name={`R${base+2}`} value="220k" a={`ILIM${i}`} b="GND"/>
 <C name={`C${base+1}`} value="100nF" a="net.VBUS"/>
 <Bulk name={`C${base+2}`} net={`VBUS${i}`}/>
 <C name={`C${base+3}`} value="100nF" a={`net.VBUS${i}`}/>
 <A_2N7002 name={`MOSFET${i}`} {...pcb(`MOSFET${i}`)} {...sch(`MOSFET${i}`)} pinAttributes={{pin1:{isPassive:true},pin2:{isPassive:true,requiresGround:true},pin3:{isPassive:true}}} connections={{pin1:`net.EN${i}_N`,pin2:'net.GND',pin3:`net.DIS${i}`}}/>
 <HR name={`R${base+3}`} value="1k" a={`VBUS${i}`} b={`DIS${i}`}/>
 <silkscreentext text={`P${i} / 100mA`} pcbX={[-16.2,-5.4,5.4,16.2][k]} pcbY={18.5} fontSize={0.65}/>
 </>})}
 <trace width={0.2} name="CLOCK_XI" from=".U1 > .pin4" to=".Y1 > .pin3" pcbPath={[{x:0.249936,y:-3.1},{x:1.1000746,y:-3.1},{x:1.1000746,y:-4.35}]}/>
 <trace width={0.2} name="CLOCK_XO" from=".U1 > .pin3" to=".Y1 > .pin1" pcbPath={[{x:-0.249936,y:-3.1},{x:-2.3,y:-3.1},{x:-2.3,y:-6.05},{x:-1.1000746,y:-6.05}]}/>
 <trace width={0.2} name="CLOCK_C5" from=".C5 > .pin1" to=".Y1 > .pin3" pcbPath={[{x:-1.15,y:-0.7},{x:-1.15,y:-2.3999254}]}/>
 <trace width={0.2} name="CLOCK_C6" from=".C6 > .pin1" to=".Y1 > .pin1" pcbPath={[{x:-0.825,y:1.2},{x:0.55,y:1.2},{x:0.55,y:2.3999254}]}/>
 <silkscreentext text="USB 2.0 HUB / CH334F / HOST POWER" pcbX={0} pcbY={-20.2} fontSize={0.65}/>
 <StatusLed x={-19} y={-8} rx={-20.8} ry={-10.5} resistance="1k" sink="net.HUB_LED4" anodeSupply="net.HUB_LED2" schX={-4} schY={-10}/>
 <AT24C02D_STUM_T name="U_STATUS" pcbX={-11.5} pcbY={8.25} pcbRotation={90} schX={-9} schY={-10} connections={{pin1:'net.HUB_SCL',pin2:'net.GND',pin3:'net.HUB_LED4',pin4:'net.V3V3',pin5:'net.GND'}}/>
 <BaseC name="C_STATUS" value="100nF" x={-4} y={-10.5} a="net.V3V3" schX={-12} schY={-10}/>
 <Wiring nets={{HUB_SCL:['.U1 > .pin13'],HUB_LED4:['.U1 > .pin21'],HUB_LED2:['.U1 > .pin23']}}/>
 </schematicsheet></board>}
export default HubBoard
