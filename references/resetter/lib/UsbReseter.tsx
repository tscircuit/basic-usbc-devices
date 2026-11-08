import { Rp2040Core } from "./Rp2040Core"
import { ControlUsb } from "./ControlUsb"
import { Passthrough } from "./Passthrough"
import { StatusLed } from "./StatusLed"
import groundFanout from "./ground-fanout.json"
import { MountingHoles } from "./MountingHoles"

// USB resetter: an RP2040 (top USB-C) switches VBUS of a USB-C passthrough
// (right = input from host, left = output to device). A status LED shows the
// state of the switched port.
export const UsbReseter = ({ name }: { name?: string }) => (
  <board
    name={name}
    width="42mm"
    height="36mm"
    layers={2}
    minViaHoleDiameter="0.3mm"
    minViaPadDiameter="0.48mm"
  >
    <schematicsection name="mcu" displayName="RP2040" />
    <schematicsection name="control" displayName="Control USB + 3V3" />
    <schematicsection name="passthrough" displayName="Switched passthrough" />
    <schematicsection name="status" displayName="Status LED" />

    {/* Drop ground to the bottom pour before routing the remaining nets.
        The saved paths place the C4 drop clear of the neighboring C3 via. */}
    <net name="GND" routingPhaseIndex={0} />
    <autoroutingphase
      phaseIndex={0}
      pcbTracePaths={groundFanout}
      autorouter="fanout"
      fanoutPourNetMap={{ bottom: "GND" }}
    />
    <copperpour connectsTo="net.GND" layer="bottom" cutoutMargin="0.3mm" />

    {/* Passthrough power gets wide traces */}
    <net name="VBUS_IN" nominalTraceWidth="0.6mm" />
    <net name="VBUS_OUT" nominalTraceWidth="0.6mm" />

    <ControlUsb />
    <Rp2040Core />
    <Passthrough />
    <StatusLed />
    <MountingHoles />
  </board>
)

export default UsbReseter
