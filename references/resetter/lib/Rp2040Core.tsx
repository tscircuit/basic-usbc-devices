import { RP2040 } from "../imports/RP2040"
import { W25Q16JVSNIQ } from "../imports/W25Q16JVSNIQ"
import { X322512MSB4SI } from "../imports/X322512MSB4SI"
import { TS_1187A_B_A_B } from "../imports/TS_1187A_B_A_B"

const SECTION = "mcu"

// RP2040 GPIO assignments used by the firmware
export const PINOUT = {
  PWR_CUT: "GPIO18",
  VBUS_IN_SENSE: "GPIO26_ADC0",
  VBUS_OUT_SENSE: "GPIO27_ADC1",
  LED_DIN: "GPIO29_ADC3",
} as const

const Decoupling = ({
  name,
  pin,
  capacitance = "100nF",
  pcbX,
  pcbY,
  pcbRotation,
}: {
  name: string
  pin: string
  capacitance?: string
  pcbX: number
  pcbY: number
  pcbRotation?: number
}) => (
  <capacitor
    name={name}
    capacitance={capacitance}
    footprint="0402"
    schSectionName={SECTION}
    maxDecouplingTraceLength={6}
    pcbX={pcbX}
    pcbY={pcbY}
    pcbRotation={pcbRotation}
    connections={{ pos: `U1.${pin}`, neg: "net.GND" }}
  />
)

export const Rp2040Core = () => (
  <>
    <RP2040
      name="U1"
      pcbX={-1}
      pcbY={0}
      schSectionName={SECTION}
      connections={{
        IOVDD1: "net.V3V3",
        IOVDD2: "net.V3V3",
        IOVDD3: "net.V3V3",
        IOVDD4: "net.V3V3",
        IOVDD5: "net.V3V3",
        IOVDD6: "net.V3V3",
        USB_VDD: "net.V3V3",
        ADC_AVDD: "net.V3V3",
        VREG_IN: "net.V3V3",
        VREG_VOUT: "net.V1V1",
        DVDD1: "net.V1V1",
        DVDD2: "net.V1V1",
        GND: "net.GND",
        TESTEN: "net.GND",
        // RUN has an internal pull-up; BOOTSEL + replug is the reset path
        QSPI_SS: "net.QSPI_SS",
        QSPI_SCLK: "net.QSPI_SCLK",
        QSPI_SD0: "net.QSPI_SD0",
        QSPI_SD1: "net.QSPI_SD1",
        QSPI_SD2: "net.QSPI_SD2",
        QSPI_SD3: "net.QSPI_SD3",
        USB_DP: "net.MCU_DP",
        USB_DM: "net.MCU_DN",
        XIN: "net.XIN",
        XOUT: "net.XOUT",
        [PINOUT.PWR_CUT]: "net.PWR_CUT",
        [PINOUT.VBUS_IN_SENSE]: "net.VBUS_IN_SENSE",
        [PINOUT.VBUS_OUT_SENSE]: "net.VBUS_OUT_SENSE",
        [PINOUT.LED_DIN]: "net.LED_DIN",
      }}
    />

    {/* Decoupling, one cap per supply pin group */}
    <Decoupling name="C1" pin="IOVDD6" pcbX={-5.8} pcbY={2.6} pcbRotation={90} />
    <Decoupling name="C2" pin="IOVDD5" pcbX={-5.8} pcbY={-1} pcbRotation={90} />
    <Decoupling name="C3" pin="IOVDD4" pcbX={-0.1} pcbY={-5.4} pcbRotation={270} />
    <Decoupling name="C4" pin="DVDD2" pcbX={0.9} pcbY={-5.4} pcbRotation={270} />
    <Decoupling name="C5" pin="IOVDD3" pcbX={4.25} pcbY={-1} pcbRotation={90} />
    <Decoupling name="C6" pin="IOVDD2" pcbX={3.8} pcbY={4.4} pcbRotation={90} />
    <Decoupling name="C7" pin="VREG_IN" capacitance="1uF" pcbX={2.2} pcbY={6.3} />
    <Decoupling name="C8" pin="VREG_VOUT" capacitance="1uF" pcbX={2.2} pcbY={5.2} />
    <Decoupling name="C9" pin="IOVDD1" pcbX={-0.8} pcbY={5.3} pcbRotation={90} />

    {/* QSPI flash */}
    <W25Q16JVSNIQ
      name="U2"
      pcbX={-7}
      pcbY={8.4}
      schSectionName={SECTION}
      connections={{
        N_CS: "net.QSPI_SS",
        CLK: "net.QSPI_SCLK",
        IO0: "net.QSPI_SD0",
        IO1: "net.QSPI_SD1",
        IO2: "net.QSPI_SD2",
        IO3: "net.QSPI_SD3",
        VCC: "net.V3V3",
        GND: "net.GND",
      }}
    />
    <capacitor
      name="C11"
      capacitance="100nF"
      footprint="0402"
      schSectionName={SECTION}
      maxDecouplingTraceLength={6}
      pcbX={-11.2}
      pcbY={8.6}
      pcbRotation={90}
      connections={{ pos: "net.V3V3", neg: "net.GND" }}
    />

    {/* 12MHz crystal, 1k series resistor on XOUT per RP2040 hardware guide */}
    <X322512MSB4SI
      name="Y1"
      loadCapacitance="20pF"
      pcbX={-3.6}
      pcbY={-7.2}
      pcbRotation={270}
      schSectionName={SECTION}
      connections={{ pin1: "net.XIN", pin3: "net.XTAL_OUT", pin2: "net.GND", pin4: "net.GND" }}
    />
    <capacitor
      name="C12"
      capacitance="27pF"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={-6.2}
      pcbY={-6.1}
      pcbRotation={90}
      connections={{ pos: "net.XIN", neg: "net.GND" }}
    />
    <capacitor
      name="C13"
      capacitance="27pF"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={-0.9}
      pcbY={-8}
      pcbRotation={90}
      connections={{ pos: "net.XTAL_OUT", neg: "net.GND" }}
    />
    <resistor
      name="R2"
      resistance="1k"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={-1.1}
      pcbY={-5.4}
      pcbRotation={270}
      connections={{ pin1: "net.XOUT", pin2: "net.XTAL_OUT" }}
    />

    {/* BOOTSEL: hold while plugging in to enter the USB bootloader.
        Diagonal pads are never internally bridged on a 4-pin tact switch. */}
    <TS_1187A_B_A_B
      name="SW1"
      pcbX={-14.5}
      pcbY={13.6}
      schSectionName={SECTION}
      connections={{ A: "net.BOOTSEL", D: "net.GND" }}
    />
    <resistor
      name="R3"
      resistance="1k"
      footprint="0402"
      schSectionName={SECTION}
      pcbX={-12.6}
      pcbY={4.6}
      pcbRotation={90}
      connections={{ pin1: "net.BOOTSEL", pin2: "net.QSPI_SS" }}
    />
  </>
)
