import { StatusLed } from "./status-led"
import { CH552E } from "./imports/C967938"
import { PKLCS1212E4001_R1 } from "./imports/C113159"
import { boardRules, UsbInput, R, C, Wiring } from "./common"
import { DisplayMounts } from "./new-devices/mounts"

export function BuzzerBoard({ pcbX=0, pcbY=0, pcbRotation=0 } = {}) {
  return <board {...boardRules} name="buzzer" pcbX={pcbX} pcbY={pcbY} pcbRotation={pcbRotation}>
    <schematicsheet name="buzzer_sheet" displayName="USB-C variable-pitch piezo" sheetSize="A4">
      <UsbInput dial/><DisplayMounts spanX={20} spanY={20} centerY={-2.5}/>
      <CH552E name="U1" pcbX={0} pcbY={-4.15} pcbRotation={90} noConnect={["pin3","pin4","pin5"]}/>
      {/* The series capacitor blocks DC. R6 discharges the transducer after stop or suspend. */}
      <R name="R5" value="2k" x={-4} y={-0.4} a="net.BEEP" b="net.DRIVE"/>
      <C name="C5" value="1uF" x={-8} y={0.55} a="net.DRIVE" b="net.AUDIO"/>
      <R name="R6" value="10k" x={-8.7} y={2.4} a="net.AUDIO" b="net.GND"/>
      <PKLCS1212E4001_R1 name="BUZZER1" pcbX={0} pcbY={7} connections={{pin1:"net.AUDIO",pin2:"net.GND"}}/>
      <C name="C2" value="100nF" x={-8} y={-3} a="net.VBUS"/>
      <C name="C3" value="100nF" x={-8} y={-1} a="net.V33"/>
      <R name="R4" value="10k" x={8.5} y={3.5} a="net.VBUS" b="net.BOOT"/>
      <testpoint name="TP1" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={9} pcbY={1} connections={{pin1:"net.BOOT"}}/>
      <testpoint name="TP2" doNotPlace footprintVariant="pad" padDiameter={1} pcbX={7} pcbY={1} connections={{pin1:"net.DP"}}/>
      <Wiring nets={{VBUS:[".U1 > .pin9"],GND:[".U1 > .pin8"],V33:[".U1 > .pin10"],DP:[".U1 > .pin6"],DM:[".U1 > .pin7"],BEEP:[".U1 > .pin1"]}}/>
      <silkscreentext text="USB PIEZO" pcbY={14.3} fontSize={0.65}/>
      <StatusLed x={-10} sink=".U1 > .pin2"/>
    </schematicsheet>
  </board>
}
export default BuzzerBoard
