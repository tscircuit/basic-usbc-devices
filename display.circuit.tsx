import {createDisplayRouter} from './display-router'
import {CH552T} from './imports/C111367'
import {AFC07_S50ECC_00} from './imports/C11098'
import {AO3400A} from './imports/C20917'
import {XC6206P332MR_G} from './imports/C5446'
import {TYPE_C_31_M_12} from './imports/C165948'
import {USBLC6_2SC6} from './imports/C7519'
import {boardRules, R, C, Wiring, Mounts} from './common'
export const displaySize={width:32,height:42}
// ER-TFT035IPS-6 / ILI9488: same top-contact FPC and 8080 pinout as
// abse/gameboy-advance@0.0.45. New USB controller and power implementation.
export function DisplayBoard({pcbX=0,pcbY=0,pcbRotation=0,routingDisabled=false}:{pcbX?:number,pcbY?:number,pcbRotation?:number,routingDisabled?:boolean}={}){return <board {...boardRules} {...displaySize} name="display" pcbX={pcbX} pcbY={pcbY} pcbRotation={pcbRotation} routingDisabled={routingDisabled} minTraceWidth={.11} autorouter={{local:true,algorithmFn:createDisplayRouter(pcbX,pcbY,pcbRotation)}} routeRemaining schLayout={{layoutMode:'none'}} schMaxTraceDistance={1.2} schStyle={{defaultPassiveSize:'xs'}}>
 <schematicsheet name="display_sheet" displayName="USB-C display / ILI9488 8080" sheetSize="A4">
 <Mounts/>
 <schematictext text="USB-C / 100 mA" schX={-10} schY={9} fontSize={.35}/>
 <schematictext text="CH552T / 3.3 V / 16 MHz" schX={0} schY={9} fontSize={.35}/>
 <schematictext text="50-PIN TOP-CONTACT FPC / ILI9488" schX={11} schY={9} fontSize={.35}/>
 <schematictext text="8080 8-bit: IM2:0 = 011. No touch. LCD purchased separately." schX={0} schY={-9} fontSize={.3}/>
 <copperpour name="GROUND" layer="bottom" connectsTo="net.GND" clearance={.2} boardEdgeMargin={.6}/>
 {['VBUS','GND','V3V3','DP','DM','CC1','CC2','BOOT','WR','DC','RESET','BL','LEDA','LEDK',...Array.from({length:8},(_,i)=>`D${i}`)].map(n=><net name={n}/>)}
 <TYPE_C_31_M_12 name="J1" pcbX={0} pcbY={-15.2} schX={-11} schY={6} noConnect={['pin5','pin11']} pinAttributes={{pin13:{requiresGround:true},pin14:{requiresGround:true},pin15:{providesPower:true,providesVoltage:5},pin16:{providesPower:true,providesVoltage:5}}}/>
 <USBLC6_2SC6 name="D1" pcbX={5.8} pcbY={-8} schX={-7} schY={6} pinAttributes={{pin1:{},pin2:{requiresGround:true},pin3:{},pin4:{},pin5:{requiresPower:true},pin6:{}}} internallyConnectedPins={[["pin1","pin6"],["pin3","pin4"]]}/>
 <R name="R1" value="5.1k" x={-6} y={-10.2} schX={-12} schY={2.7} a="net.CC1" b="net.GND"/>
 <R name="R2" value="5.1k" x={5.3} y={-11.2} schX={-9} schY={2.7} a="net.CC2" b="net.GND"/>
 <C name="C1" value="1uF" x={-6} y={-7.8} schX={-6} schY={2.7} a="net.VBUS"/>
 <XC6206P332MR_G name="U2" pcbX={-9} pcbY={-4.5} schX={-10} schY={-1}/>
 <C name="C2" value="1uF" x={-13} y={-4.5} schX={-12} schY={-4} a="net.VBUS"/>
 <C name="C3" value="1uF" x={-9} y={-1} schX={-8} schY={-4} a="net.V3V3"/>
 <CH552T name="U1" pcbX={0} pcbY={2} pcbRotation={180} schX={0} schY={5} noConnect={['pin6','pin10','pin13']}/>
 <C name="C4" value="100nF" x={2.6} y={-3} schX={-2} schY={0} a="net.V3V3"/>
 <C name="C5" value="100nF" x={6} y={-3} schX={2} schY={0} a="net.V3V3"/>
 <R name="R3" value="10k" x={7} y={0} schX={-2} schY={-3} a="net.V3V3" b="net.BOOT"/>
 <testpoint name="TP1" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={10} pcbY={0} schX={1} schY={-3} connections={{pin1:'net.BOOT'}}/>
 <testpoint name="TP2" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={12} pcbY={0} schX={3} schY={-3} connections={{pin1:'net.DP'}}/>
 <AFC07_S50ECC_00 pinAttributes={{pin40:{requiresPower:true},pin41:{requiresPower:true},pin42:{requiresPower:true},pin43:{requiresGround:true}}} name="J2" pcbX={0} pcbY={18} schX={11} schY={1.5} noConnect={['pin4','pin5','pin6','pin33','pin39','pin44','pin45','pin46','pin47','pin51','pin52']}/>
 <C name="C6" value="1uF" x={-5} y={13.4} schX={7} schY={-6.7} a="net.V3V3"/>
 <C name="C7" value="1uF" x={-5} y={10.7} schX={10} schY={-6.7} a="net.V3V3"/>
 <AO3400A pinAttributes={{pin1:{isPassive:true},pin2:{isPassive:true,requiresGround:true},pin3:{isPassive:true}}} name="MOSFET1" pcbX={12.5} pcbY={8} schX={1} schY={-6}/>
 <R name="R4" value="10k" x={9} y={6} schX={-2} schY={-6} a="net.BL" b="net.GND"/>
 {/* 100 ohms bounds backlight current below 53.1 mA even at zero LED Vf.
     Normal Vf 3.0-3.2 V gives 18-23 mA. 1206 0.25 W, normal dissipation <60 mW. */}
 <resistor name="R5" resistance="100" footprint="1206" pcbX={13} pcbY={12} pcbRotation={90} schX={5} schY={-3} manufacturerPartNumber="1206W4F1000T5E" supplierPartNumbers={{jlcpcb:['C17901']}} connections={{pin1:'net.VBUS',pin2:'net.LEDA'}}/>
 <Wiring nets={{
  CC1:['.J1 > .pin6'],CC2:['.J1 > .pin12'],
  DP:['.J1 > .pin8','.J1 > .pin10','.D1 > .pin1','.D1 > .pin6','.U1 > .pin14'],
  DM:['.J1 > .pin7','.J1 > .pin9','.D1 > .pin3','.D1 > .pin4','.U1 > .pin15'],
  VBUS:['.J1 > .pin15','.J1 > .pin16','.D1 > .pin5','.U2 > .pin2'],
  V3V3:['.U2 > .pin3','.U1 > .pin19','.U1 > .pin20',...[7,8,35,40,41,42].map(p=>`.J2 > .pin${p}`)],
  GND:['.J1 > .pin1','.J1 > .pin2','.J1 > .pin3','.J1 > .pin4','.J1 > .pin13','.J1 > .pin14','.D1 > .pin2','.U1 > .pin18','.U2 > .pin1','.MOSFET1 > .pin2',...[9,...Array.from({length:14},(_,i)=>i+11),34,38,43,48,49,50].map(p=>`.J2 > .pin${p}`)],
  ...Object.fromEntries([7,8,17,16,2,3,4,5].map((pin,i)=>[`D${i}`,[`.U1 > .pin${pin}`,`.J2 > .pin${32-i}`]])),
  WR:['.U1 > .pin1','.J2 > .pin36'],DC:['.U1 > .pin11','.J2 > .pin37'],RESET:['.U1 > .pin9','.J2 > .pin10'],BL:['.U1 > .pin12','.MOSFET1 > .pin1'],LEDA:['.J2 > .pin1'],LEDK:['.J2 > .pin2','.J2 > .pin3','.MOSFET1 > .pin3'],
 }}/>
 <silkscreentext text="USB DISPLAY / ILI9488" pcbX={0} pcbY={8.4} fontSize={.65}/>
 <silkscreentext text="BOOT" pcbX={11} pcbY={1.5} fontSize={.6}/>
 </schematicsheet></board>}
export default DisplayBoard
