import { DisplayUsb } from "./display-usb";
import { StatusLed } from "../status-led";
import { DisplayMounts } from "./mounts";
import { CH552T } from "../imports/C111367";
import { AFC07_S50ECC_00 } from "../imports/C11098";
import { AO3400A } from "../imports/C20917";
import { boardRules, R, C, Wiring } from "../common";
// ER-TFT028A2-4, four-wire serial interface II (IM3:0 = 1110).
export default function SmallIps() {
  return (
    <board
      {...boardRules}
      width={36}
      height={38}
      name="small_ips"
      minTraceWidth={0.15}
    >
      <schematicsheet
        name="display_sheet"
        displayName="USB-C display / 2.8 inch IPS SPI"
        sheetSize="A4"
      >
        <DisplayMounts spanX={30} spanY={10} />
        <schematictext
          text="USB-C / 100 mA"
          schX={-10}
          schY={9}
          fontSize={0.35}
        />
        <schematictext
          text="CH552T / 3.2 V / 16 MHz"
          schX={0}
          schY={9}
          fontSize={0.35}
        />
        <schematictext
          text="ER-TFT028A2-4"
          schX={11}
          schY={9}
          fontSize={0.35}
        />
        <schematictext
          text="4-wire SPI / interface II / no touch"
          schX={0}
          schY={-9}
          fontSize={0.3}
        />
        <copperpour
          name="GROUND"
          layer="bottom"
          connectsTo="net.GND"
          clearance={0.2}
          boardEdgeMargin={0.6}
        />
        <DisplayUsb voltage={3.2} />
        <CH552T
          name="U1"
          pcbX={0}
          pcbY={2}
          pcbRotation={180}
          schX={0}
          schY={5}
          noConnect={[
            "pin1",
            "pin6",
            "pin7",
            "pin8",
            "pin10",
            "pin16",
            "pin17",
          ]}
        />
        <AFC07_S50ECC_00
          pinAttributes={{
            pin40: { requiresPower: true },
            pin41: { requiresPower: true },
            pin42: { requiresPower: true },
            pin43: { requiresGround: true },
          }}
          name="J2"
          pcbX={0}
          pcbY={16}
          schX={11}
          schY={1.5}
          noConnect={[
            "pin39",
            "pin44",
            "pin45",
            "pin46",
            "pin47",
            "pin51",
            "pin52",
          ]}
        />
        <C
          name="C6"
          value="1uF"
          x={-5}
          y={9}
          schX={7}
          schY={-6.7}
          a="net.LOGIC"
        />
        <C
          name="C7"
          value="1uF"
          x={-5}
          y={10.7}
          schX={10}
          schY={-6.7}
          a="net.LOGIC"
        />
        <AO3400A
          pinAttributes={{
            pin1: { isPassive: true },
            pin2: { isPassive: true, requiresGround: true },
            pin3: { isPassive: true },
          }}
          name="MOSFET1"
          pcbX={10}
          pcbY={6}
          schX={1}
          schY={-6}
        />
        <R
          name="R4"
          value="10k"
          x={6}
          y={7}
          schX={-2}
          schY={-6}
          a="net.BL"
          b="net.GND"
        />
        {/* One ballast per LED string. At 5 V and 3.2 V Vf each draws about 8 mA. */}
        {[2, 3, 4, 5].map((pin, i) => (
          <R
            key={pin}
            name={`R_BL${pin}`}
            value="220"
            x={9 + i * 1.6}
            y={11}
            rotation={90}
            a="net.VBUS"
            b={`net.LEDA${pin}`}
          />
        ))}
        <Wiring
          nets={{
            LOGIC: [7, 8, 9, 35, 40, 41, 42].map((p) => `.J2 > .pin${p}`),
            GND: [
              ".MOSFET1 > .pin2",
              ...[
                6,
                ...Array.from({ length: 22 }, (_, i) => 11 + i),
                43,
                48,
                49,
                50,
              ].map((p) => `.J2 > .pin${p}`),
            ],
            MOSI: [".U1 > .pin3", ".J2 > .pin34"],
            MISO: [".U1 > .pin4", ".J2 > .pin33"],
            SCK: [".U1 > .pin5", ".J2 > .pin37"],
            CS: [".U1 > .pin2", ".J2 > .pin38"],
            DC: [".U1 > .pin11", ".J2 > .pin36"],
            RESET: [".U1 > .pin9", ".J2 > .pin10"],
            BL: [".U1 > .pin12", ".MOSFET1 > .pin1"],
            LEDK: [".J2 > .pin1", ".MOSFET1 > .pin3"],
            ...Object.fromEntries(
              [2, 3, 4, 5].map((pin) => [`LEDA${pin}`, [`.J2 > .pin${pin}`]]),
            ),
          }}
        />
        <silkscreentext
          text="USB IPS / 2.8"
          pcbX={0}
          pcbY={8.4}
          fontSize={0.65}
        />
        <silkscreentext text="BOOT" pcbX={11} pcbY={1.5} fontSize={0.6} />
        <StatusLed
          x={-11}
          y={-12}
          rx={-13}
          ry={-8.5}
          sink=".U1 > .pin13"
          anodeSupply="net.LOGIC"
          schX={-10}
          schY={-8.4}
        />
      </schematicsheet>
    </board>
  );
}
