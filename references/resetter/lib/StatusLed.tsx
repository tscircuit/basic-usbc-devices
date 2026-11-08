import { SK6812_B } from "../imports/SK6812_B"
import { A_1N4148WS } from "../imports/A_1N4148WS"

const SECTION = "status"

// WS2812-class RGB LED. Running it from VBUS minus a diode drop (~4.2V) puts
// its logic-high threshold (0.7 * VDD) below the RP2040's 3.3V output.
export const StatusLed = () => (
  <>
    <SK6812_B
      name="LED1"
      pcbX={14}
      pcbY={12.5}
      pcbRotation={90}
      schSectionName={SECTION}
      connections={{ VDD: "net.LED_VDD", GND: "net.GND", DIN: "net.LED_DIN" }}
    />
    <A_1N4148WS
      name="D1"
      pcbX={12.5}
      pcbY={8}
      schSectionName={SECTION}
      connections={{ anode: "net.VBUS_CTRL", cathode: "net.LED_VDD" }}
    />
    <capacitor
      name="C19"
      capacitance="100nF"
      footprint="0402"
      schSectionName={SECTION}
      maxDecouplingTraceLength={8}
      pcbX={17.6}
      pcbY={7.8}
      connections={{ pos: "net.LED_VDD", neg: "net.GND" }}
    />
  </>
)
