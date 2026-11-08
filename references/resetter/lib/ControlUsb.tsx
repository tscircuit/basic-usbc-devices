import { UsbC } from "./UsbC"
import { XC6206P332MR_G } from "../imports/XC6206P332MR_G"

const SECTION = "control"

// Top-edge USB-C: the host talks to the RP2040 here, and this port powers the
// controller. The passthrough keeps working without it (switch fails on).
export const ControlUsb = () => (
  <>
    <UsbC
      name="J1"
      pcbX={4}
      pcbY={12.3}
      pcbRotation={180}
      schSectionName={SECTION}
      connections={{
        VBUS1: "net.VBUS_CTRL",
        VBUS2: "net.VBUS_CTRL",
        GND1: "net.GND",
        GND2: "net.GND",
        SHELL1: "net.GND",
        SHELL2: "net.GND",
        SHELL3: "net.GND",
        SHELL4: "net.GND",
        DP1: "net.CTRL_DP",
        DP2: "net.CTRL_DP",
        DM1: "net.CTRL_DN",
        DM2: "net.CTRL_DN",
        CC1: "net.CTRL_CC1",
        CC2: "net.CTRL_CC2",
      }}
    />

    {/* 5.1k Rd: identify as a USB device (sink) */}
    <resistor
      name="R4"
      resistance="5.1k"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={6.2}
      pcbY={8.2}
      pcbRotation={270}
      connections={{ pin1: "net.CTRL_CC1", pin2: "net.GND" }}
    />
    <resistor
      name="R5"
      resistance="5.1k"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={0.4}
      pcbY={8.1}
      pcbRotation={270}
      connections={{ pin1: "net.CTRL_CC2", pin2: "net.GND" }}
    />

    {/* 27R USB series termination */}
    <resistor
      name="R6"
      resistance="27"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={1.6}
      pcbY={8.1}
      pcbRotation={90}
      connections={{ pin1: "net.MCU_DP", pin2: "net.CTRL_DP" }}
    />
    <resistor
      name="R7"
      resistance="27"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={2.6}
      pcbY={8.1}
      pcbRotation={90}
      connections={{ pin1: "net.MCU_DN", pin2: "net.CTRL_DN" }}
    />

    {/* 3.3V LDO for the RP2040 */}
    <XC6206P332MR_G
      name="U3"
      pcbX={8.4}
      pcbY={5.4}
      schSectionName={SECTION}
      connections={{ Vin: "net.VBUS_CTRL", Vout: "net.V3V3", GND: "net.GND" }}
    />
    <capacitor
      name="C14"
      capacitance="10uF"
      footprint="0603"
      schSectionName={SECTION}
      maxDecouplingTraceLength={8}
      pcbX={12.0}
      pcbY={5.4}
      pcbRotation={270}
      connections={{ pos: "net.VBUS_CTRL", neg: "net.GND" }}
    />
    <capacitor
      name="C15"
      capacitance="10uF"
      footprint="0603"
      // drawn as the bulk cap of the RP2040's 3V3 decoupling bank
      schSectionName="mcu"
      maxDecouplingTraceLength={8}
      pcbX={8.4}
      pcbY={2.2}
      connections={{ pos: "net.V3V3", neg: "net.GND" }}
    />
  </>
)
