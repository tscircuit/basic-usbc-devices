import { CH340C } from "../imports/C84681"
import { TXU0202DCUR } from "../imports/C5186957"
import { C } from "../common"

// Public-domain Solder Party RP2xxx_Stamp_SMD land pattern. Numbering is the
// component-side view. Placing the chip on the bottom mirrors it once.
const used = {1:"UART_TX",2:"UART_RX",31:"GND",33:"VBUS",34:"CPU_3V3",
  35:"DM0",36:"DP0",37:"SWDIO",38:"SWCLK"} as const
const pins = Array.from({length:40}, (_,i) => i+1)
const labels = Object.fromEntries(pins.map(n => ["pin"+n,
  [n<=30 ? "GPIO"+(n-1) : ["GND","BAT","5V","3V3","USB_DM","USB_DP","SWDIO","SWCLK","RUN","BOOTSEL"][n-31]]]))

function Stamp() {
  return <chip name="U_CPU" manufacturerPartNumber="RP2350 Stamp" layer="bottom"
    cadModel={{
      objUrl:"https://raw.githubusercontent.com/tscircuit/basic-usbc-devices/d03f07a353d1a16af8965d547cc9be66b7b130ee/motherboard/rp2350-stamp.obj",
      stepUrl:"https://raw.githubusercontent.com/solderparty/rp2xxx_stamp_footprints/7676fac43f12f672d9faf6230b40fd48681d7bda/KiCad/RP2xxx_Stamp.3dshapes/RP2350_Stamp.step",
      modelOriginPosition:{x:0,y:0,z:0},
    }}
    pcbX={0} pcbY={0} schX={-7} schY={0} pinLabels={labels}
    pinAttributes={{pin31:{requiresGround:true},pin33:{requiresPower:true},pin34:{providesPower:true,providesVoltage:3.3}}}
    noConnect={pins.filter(n=>!(n in used)).map(n=>"pin"+n)}
    connections={Object.fromEntries(Object.entries(used).map(([n,net])=>["pin"+n,"net."+net]))}
    footprint={<footprint>
      {pins.map(n=>{
        const side=Math.floor((n-1)/10), offset=-9+2*((n-1)%10)
        const horizontal=side===0||side===2
        const x=[-11.65,offset,11.65,-offset][side], y=[-offset,-11.65,offset,11.65][side]
        return <smtpad portHints={["pin"+n]} shape="rect" pcbX={x} pcbY={y}
          width={horizontal?2.8:1.5} height={horizontal?1.5:2.8}/>
      })}
      <courtyardoutline outline={[{x:-13.25,y:-13.25},{x:13.25,y:-13.25},{x:13.25,y:13.25},{x:-13.25,y:13.25},{x:-13.25,y:-13.25}]}/>
      <silkscreentext text="1" pcbX={-10} pcbY={9} fontSize={0.8}/>
    </footprint>}/>
}

export function HostProcessor() {
  return <schematicsheet name="processor_sheet" displayName="Product power, USB host and programming" sheetSize="A4">
    <Stamp/>
    <CH340C name="U_PC" pcbX={-11.8} pcbY={-18.2} layer="bottom" schX={1} schY={3.8}
      noConnect={["pin7","pin8","pin9","pin10","pin11","pin12","pin13","pin14"]}
      connections={{pin1:"net.GND", pin2:"net.PC_TX", pin3:"net.PC_RX",pin4:"net.BRIDGE_V3",
        pin5:"net.PC_DP",pin6:"net.PC_DM",pin15:"net.GND",pin16:"net.PC_5V"}}/>
    <C layer="bottom" name="C_PC" x={-18.8} y={-18.2} value="100nF" a="net.PC_5V" schX={5} schY={7}/>
    <C layer="bottom" name="C_V3" x={-17.5} y={-13.1} value="100nF" a="net.BRIDGE_V3" schX={9} schY={7}/>
    <TXU0202DCUR name="U_UART" pcbX={-17.8} pcbY={-9} layer="bottom" schX={6} schY={0}
      connections={{pin1:"net.UART_TX",pin2:"net.GND",pin3:"net.PC_5V",pin4:"net.PC_RX",
        pin5:"net.PC_TX",pin6:"net.CPU_3V3",pin7:"net.CPU_3V3",pin8:"net.UART_RX"}}/>
    <C layer="bottom" name="C_IOA" x={-18.6} y={-11.3} value="100nF" a="net.PC_5V" schX={5} schY={-4}/>
    <C layer="bottom" name="C_IOB" x={-16.2} y={-6.6} value="100nF" a="net.CPU_3V3" schX={9} schY={-4}/>
    {/* Soldered product harness and Cortex SWD pogo pads. */}
    {["VBUS","GND"].map((net,i)=><testpoint key={net} name={"TP_PWR"+(i+1)} doNotPlace
      footprintVariant="pad" padDiameter={2.5} pcbX={8+i*3.5} pcbY={-17} layer="bottom"
      schX={-1+i*4} schY={-6} pinAttributes={i===0?{pin1:{providesPower:true,providesVoltage:5}}:undefined}
      connections={{pin1:"net."+net}}/>)}
    <silkscreentext text="5V    GND" pcbX={9.75} pcbY={-19.4} layer="bottom" fontSize={0.85}/>
    {["CPU_3V3","SWDIO","SWCLK","GND"].map((net,i)=><testpoint key={net} name={"TP_DBG"+(i+1)}
      doNotPlace footprintVariant="pad" padDiameter={1.2} pcbX={15+i*1.9} pcbY={-13.4}
      layer="bottom" schX={-6+i*4} schY={-9} connections={{pin1:"net."+net}}/>)}
    <silkscreentext text="V   D   C   G" pcbX={17.85} pcbY={-15.3} layer="bottom" fontSize={0.65}/>
  </schematicsheet>
}
