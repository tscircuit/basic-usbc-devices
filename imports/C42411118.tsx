import { Fragment } from "react"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["IOVDD6"],
  pin2: ["GPIO0"],
  pin3: ["GPIO1"],
  pin4: ["GPIO2"],
  pin5: ["GPIO3"],
  pin6: ["DVDD3"],
  pin7: ["GPIO4"],
  pin8: ["GPIO5"],
  pin9: ["GPIO6"],
  pin10: ["GPIO7"],
  pin11: ["IOVDD5"],
  pin12: ["GPIO8"],
  pin13: ["GPIO9"],
  pin14: ["GPIO10"],
  pin15: ["GPIO11"],
  pin16: ["GPIO12"],
  pin17: ["GPIO13"],
  pin18: ["GPIO14"],
  pin19: ["GPIO15"],
  pin20: ["IOVDD4"],
  pin21: ["XIN"],
  pin22: ["XOUT"],
  pin23: ["DVDD2"],
  pin24: ["SWCLK"],
  pin25: ["SWDIO"],
  pin26: ["RUN"],
  pin27: ["GPIO16"],
  pin28: ["GPIO17"],
  pin29: ["GPIO18"],
  pin30: ["IOVDD3"],
  pin31: ["GPIO19"],
  pin32: ["GPIO20"],
  pin33: ["GPIO21"],
  pin34: ["GPIO22"],
  pin35: ["GPIO23"],
  pin36: ["GPIO24"],
  pin37: ["GPIO25"],
  pin38: ["IOVDD2"],
  pin39: ["DVDD1"],
  pin40: ["GPIO26_ADC0"],
  pin41: ["GPIO27_ADC1"],
  pin42: ["GPIO28_ADC2"],
  pin43: ["GPIO29_ADC3"],
  pin44: ["ADC_AVDD"],
  pin45: ["IOVDD1"],
  pin46: ["VREG_AVDD"],
  pin47: ["VREG_PGND"],
  pin48: ["VREG_LX"],
  pin49: ["VREG_VIN"],
  pin50: ["VREG_FB"],
  pin51: ["USB_DM"],
  pin52: ["USB_DP"],
  pin53: ["USB_OTP_VDD"],
  pin54: ["QSPI_IOVDD"],
  pin55: ["QSPI_SD3"],
  pin56: ["QSPI_SCLK"],
  pin57: ["QSPI_SD0"],
  pin58: ["QSPI_SD2"],
  pin59: ["QSPI_SD1"],
  pin60: ["QSPI_SS"],
  pin61: ["GND"]
} as const

const pinAttributes = {
  pin61: {isPassive: true, capabilities: [], requiresGround: true, mustBeConnected: true},
  pin60: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin59: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin58: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin57: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin56: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin55: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin54: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin53: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin52: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["uart_tx","i2c_sda"], canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin51: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["uart_rx","i2c_scl"], canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin50: {isInput: true, capabilities: [], mustBeConnected: true},
  pin49: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "4.7uF"},
  pin48: {isOutput: true, canUseTriState: true, capabilities: [], providesPower: true},
  pin47: {isPassive: true, capabilities: [], requiresGround: true, mustBeConnected: true},
  pin46: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "4.7uF"},
  pin45: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin44: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin43: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin42: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin41: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin40: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin39: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin38: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin37: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin36: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin35: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin34: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin33: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin32: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin31: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx","spi_cs"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin30: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin29: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin28: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin27: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin26: {isInput: true, capabilities: [], canUseInternalPullup: true},
  pin25: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: [], canUseInternalPullup: true, canUseInternalPulldown: true, canUsePushPull: true},
  pin24: {isInput: true, capabilities: [], canUseInternalPullup: true, canUseInternalPulldown: true},
  pin23: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "4.7uF"},
  pin22: {isOutput: true, capabilities: []},
  pin21: {isInput: true, capabilities: []},
  pin20: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin19: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin18: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin17: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin16: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin15: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin14: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin13: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin12: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda","spi_cs"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin11: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin10: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin9: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin8: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin7: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin6: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"},
  pin5: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_mosi","i2c_scl","uart_rx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin4: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_sck","i2c_sda","uart_tx"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin3: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_cs","uart_rx","i2c_scl"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin2: {isInput: true, isOutput: true, isBidirectional: true, canUseTriState: true, capabilities: ["spi_miso","uart_tx","i2c_sda","spi_cs"], canUseInternalPullup: true, canUseInternalPulldown: true, canUseOpenDrain: true, canUsePushPull: true, isGpio: true},
  pin1: {isInput: true, capabilities: [], requiresPower: true, mustBeConnected: true, shouldHaveDecouplingCapacitor: true, recommendedDecouplingCapacitorCapacitance: "100nF"}
} satisfies NonNullable<ChipProps["pinAttributes"]>

export const RP2350A = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C42411118"
  ]
}}
      manufacturerPartNumber="RP2350A"
      footprint={<footprint>
        {/* RP2350A Minimal R4 uses a 3 × 3 ground-via array in the exposed pad. */}
        {[-1.2,0,1.2].flatMap(x => [-1.2,0,1.2].map(y => <Fragment key={x+","+y}><platedhole
          portHints={["pin61"]} pcbX={x} pcbY={y} shape="circle" holeDiameter={0.25} outerDiameter={0.6}/></Fragment>))}
        <smtpad portHints={["pin61"]} pcbX="0mm" pcbY="-0.000127mm" width="3.3999932mm" height="3.3999932mm" shape="rect" />
<smtpad portHints={["pin60"]} pcbX="-2.799842mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin59"]} pcbX="-2.400046mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin58"]} pcbX="-1.999996mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin57"]} pcbX="-1.599946mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin56"]} pcbX="-1.199896mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin55"]} pcbX="-0.799846mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin54"]} pcbX="-0.40005mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin53"]} pcbX="0mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin52"]} pcbX="0.40005mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin51"]} pcbX="0.8001mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin50"]} pcbX="1.20015mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin49"]} pcbX="1.599946mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin48"]} pcbX="1.999996mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin47"]} pcbX="2.400046mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin46"]} pcbX="2.800096mm" pcbY="3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin45"]} pcbX="3.57505mm" pcbY="2.799969mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin44"]} pcbX="3.57505mm" pcbY="2.399919mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin43"]} pcbX="3.57505mm" pcbY="1.999615mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin42"]} pcbX="3.57505mm" pcbY="1.600073mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin41"]} pcbX="3.57505mm" pcbY="1.200023mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin40"]} pcbX="3.57505mm" pcbY="0.799973mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin39"]} pcbX="3.57505mm" pcbY="0.399923mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin38"]} pcbX="3.57505mm" pcbY="-0.000381mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin37"]} pcbX="3.57505mm" pcbY="-0.399923mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin36"]} pcbX="3.57505mm" pcbY="-0.799973mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin35"]} pcbX="3.57505mm" pcbY="-1.200023mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin34"]} pcbX="3.57505mm" pcbY="-1.600073mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin33"]} pcbX="3.57505mm" pcbY="-2.000377mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin32"]} pcbX="3.57505mm" pcbY="-2.399919mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin31"]} pcbX="3.57505mm" pcbY="-2.799969mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin30"]} pcbX="2.800096mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin29"]} pcbX="2.400046mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin28"]} pcbX="1.999996mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin27"]} pcbX="1.599946mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin26"]} pcbX="1.20015mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin25"]} pcbX="0.8001mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="0.40005mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="0mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="-0.40005mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="-0.799846mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-1.199896mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-1.599946mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="-1.999996mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="-2.400046mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-2.799842mm" pcbY="-3.574923mm" width="0.1999996mm" height="0.8750046mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="-3.57505mm" pcbY="-2.799969mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-3.57505mm" pcbY="-2.400173mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-3.57505mm" pcbY="-2.000123mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-3.57505mm" pcbY="-1.600073mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-3.57505mm" pcbY="-1.200023mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-3.57505mm" pcbY="-0.799973mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-3.57505mm" pcbY="-0.399923mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-3.57505mm" pcbY="-0.000127mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-3.57505mm" pcbY="0.399923mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-3.57505mm" pcbY="0.799973mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-3.57505mm" pcbY="1.200023mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.57505mm" pcbY="1.599819mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-3.57505mm" pcbY="1.999869mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-3.57505mm" pcbY="2.399919mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-3.57505mm" pcbY="2.799969mm" width="0.8750046mm" height="0.1999996mm" shape="rect" />
<silkscreenpath route={[{"x":-3.1310834000000796,"y":3.5999673999999686},{"x":-3.199917400000004,"y":3.5999673999999686}]} />
<silkscreenpath route={[{"x":3.6000182000000223,"y":3.131083399999966},{"x":3.6000182000000223,"y":3.5999673999999686},{"x":3.1311596000000463,"y":3.5999673999999686}]} />
<silkscreenpath route={[{"x":3.1311596000000463,"y":-3.600043600000049},{"x":3.6000182000000223,"y":-3.600043600000049},{"x":3.6000182000000223,"y":-3.1311596000000463}]} />
<silkscreenpath route={[{"x":-3.5999673999999686,"y":-3.1311596000000463},{"x":-3.5999673999999686,"y":-3.600043600000049},{"x":-3.1310834000000796,"y":-3.600043600000049}]} />
<silkscreenpath route={[{"x":-3.199917400000004,"y":3.5999673999999686},{"x":-3.5999673999999686,"y":3.5999673999999686},{"x":-3.5999673999999686,"y":3.131083399999966}]} />
<silkscreencircle pcbX="-4.191mm" pcbY="3.555873mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="-0.1524mm" pcbY="5.013073mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-4.262552299999925,"y":4.262425300000018},{"x":4.262552299999925,"y":4.262425300000018},{"x":4.262552299999925,"y":-4.262425300000132},{"x":-4.262552299999925,"y":-4.262425300000132},{"x":-4.262552299999925,"y":4.262425300000018}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C42411118.obj?uuid=6af829ad488a4e1689b27543b3583581",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C42411118.step?uuid=6af829ad488a4e1689b27543b3583581",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}