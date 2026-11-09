import {KT_0603R} from './imports/C2286'
// Common M2 datum: lower-left mounting hole (-9.5,-12.5), +3.5 mm in Y.
// LED and series resistor are separate top-side assembly parts.
export function StatusLed({sink,anodeSupply='net.VBUS',x=-9.5,y=-9,rx=-11,ry=-6.2,rotation=0,resistance='2k',schX,schY}:{sink:string,anodeSupply?:string,x?:number,y?:number,rx?:number,ry?:number,rotation?:number,resistance?:'2k'|'1k',schX?:number,schY?:number}){
 return <>
 <KT_0603R name="LED_STATUS" pcbX={x} pcbY={y} pcbRotation={rotation} schX={schX} schY={schY} connections={{anode:'net.STATUS_ANODE',cathode:'net.STATUS_SINK'}}/>
 <resistor name="R_STATUS" resistance={resistance} footprint="0603" pcbX={rx} pcbY={ry} pcbRotation={90} schX={schX===undefined?undefined:schX-2} schY={schY} manufacturerPartNumber={resistance==='2k'?'0603WAF2001T5E':'0603WAF1001T5E'} supplierPartNumbers={{jlcpcb:[resistance==='2k'?'C22975':'C21190']}} connections={{pin1:anodeSupply,pin2:'net.STATUS_ANODE'}}/>
 {sink!=='net.STATUS_SINK'&&<trace name="STATUS_DRIVER" from="net.STATUS_SINK" to={sink}/>}
 </>
}
