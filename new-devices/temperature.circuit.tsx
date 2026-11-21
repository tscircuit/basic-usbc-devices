import { boardRules, R, C, Wiring } from "../common";
import { TYPE_C_31_M_12 } from "../imports/C165948";
import { USBLC6_2SC6 } from "../imports/C7519";
import { CH552E } from "../imports/C967938";
import { Regulator } from "./regulator";
import { TMP102AIDRLR } from "../imports/C99269";

export default function Temperature() {
  return (
    <board
      {...boardRules}
      name="temperature"
      minTraceWidth={0.15}
      width={18}
      height={24}
    >
      <schematicsheet
        name="temperature_sheet"
        displayName="USB ambient temperature"
        sheetSize="A4"
      >
        <copperpour
          name="GROUND"
          layer="bottom"
          connectsTo="net.GND"
          clearance={0.2}
          boardEdgeMargin={0.6}
          outline={[
            { x: -8.4, y: -11.4 },
            { x: 8.4, y: -11.4 },
            { x: 8.4, y: 5.9 },
            { x: -8.4, y: 5.9 },
          ]}
        />
        {[-5, 5].map((x) => (
          <group key={x}>
            <hole
              name={x < 0 ? "H1" : "H2"}
              diameter={2.2}
              pcbX={x}
              pcbY={8.8}
            />
            <keepout
              pcbX={x}
              pcbY={8.8}
              shape="circle"
              radius={2.3}
              layers={["top", "bottom"]}
            />
          </group>
        ))}
        <TYPE_C_31_M_12
          name="J1"
          pcbX={0}
          pcbY={-6.2}
          noConnect={["pin5", "pin11"]}
          pinAttributes={{
            pin15: { providesPower: true, providesVoltage: 5 },
            pin16: { providesPower: true, providesVoltage: 5 },
          }}
        />
        <USBLC6_2SC6
          name="D1"
          pcbX={6.95}
          pcbY={-2.8}
          pinAttributes={{
            pin1: {},
            pin2: { requiresGround: true },
            pin3: {},
            pin4: {},
            pin5: { requiresPower: true },
            pin6: {},
          }}
          internallyConnectedPins={[
            ["pin1", "pin6"],
            ["pin3", "pin4"],
          ]}
        />
        <R
          name="R1"
          value="5.1k"
          x={-6.7}
          y={-8}
          rotation={90}
          a="net.CC1"
          b="net.GND"
        />
        <R
          name="R2"
          value="5.1k"
          x={6.7}
          y={-8}
          rotation={90}
          a="net.CC2"
          b="net.GND"
        />
        <Regulator voltage={3.3} name="U2" pcbX={-5.8} pcbY={-1.2} />
        <C name="C1" value="1uF" x={-7} y={-4.7} rotation={90} a="net.VBUS" />
        <C name="C2" value="1uF" x={-6.6} y={1.8} a="net.V3V3" />
        <CH552E
          name="U1"
          pcbX={0}
          pcbY={1.3}
          noConnect={["pin1", "pin4", "pin5"]}
        />
        <C name="C3" value="100nF" x={3.8} y={0} a="net.V3V3" />
        <C name="C4" value="100nF" x={3.8} y={2} a="net.V3V3" />
        <R name="R3" value="5.1k" x={-2.8} y={5.65} a="net.V3V3" b="net.SDA" />
        <R name="R4" value="5.1k" x={1} y={5.65} a="net.V3V3" b="net.SCL" />
        <R
          name="R5"
          value="10k"
          x={6.7}
          y={1}
          rotation={90}
          a="net.V3V3"
          b="net.BOOT"
        />
        <testpoint
          name="TP1"
          pcbX={6.5}
          pcbY={3.5}
          padDiameter={1}
          footprintVariant="pad"
          doNotPlace
          connections={{ pin1: "net.BOOT" }}
        />
        <testpoint
          name="TP2"
          pcbX={6.5}
          pcbY={5.5}
          padDiameter={1}
          footprintVariant="pad"
          doNotPlace
          connections={{ pin1: "net.DP" }}
        />
        <TMP102AIDRLR name="U3" pcbX={0} pcbY={10.35} noConnect={["pin3"]} />
        <C name="C5" value="100nF" x={0} y={8} a="net.V3V3" />
        <Wiring
          nets={{
            CC1: [".J1 > .pin6"],
            CC2: [".J1 > .pin12"],
            VBUS: [
              ".J1 > .pin15",
              ".J1 > .pin16",
              ".D1 > .pin5",
              ".U2 > .pin3",
            ],
            DP: [
              ".J1 > .pin8",
              ".J1 > .pin10",
              ".D1 > .pin1",
              ".D1 > .pin6",
              ".U1 > .pin6",
            ],
            DM: [
              ".J1 > .pin7",
              ".J1 > .pin9",
              ".D1 > .pin3",
              ".D1 > .pin4",
              ".U1 > .pin7",
            ],
            GND: [
              ...[1, 2, 3, 4, 13, 14].map((p) => `.J1 > .pin${p}`),
              ".D1 > .pin2",
              ".U2 > .pin1",
              ".U1 > .pin8",
              ".U3 > .pin2",
              ".U3 > .pin4",
            ],
            V3V3: [".U2 > .pin2", ".U1 > .pin9", ".U1 > .pin10", ".U3 > .pin5"],
            SDA: [".U1 > .pin2", ".U3 > .pin6"],
            SCL: [".U1 > .pin3", ".U3 > .pin1"],
          }}
        />
      </schematicsheet>
    </board>
  );
}
