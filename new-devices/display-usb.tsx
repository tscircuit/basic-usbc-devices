import { Regulator } from "./regulator";
import { TYPE_C_31_M_12 } from "../imports/C165948";
import { USBLC6_2SC6 } from "../imports/C7519";
import { R, C, Wiring } from "../common";
export function DisplayUsb({ voltage }: { voltage: 3.2 | 3.3 }) {
  return (
    <>
      <TYPE_C_31_M_12
        name="J1"
        pcbX={0}
        pcbY={-13.2}
        schX={-11}
        schY={6}
        noConnect={["pin5", "pin11"]}
        pinAttributes={{
          pin13: { requiresGround: true },
          pin14: { requiresGround: true },
          pin15: { providesPower: true, providesVoltage: 5 },
          pin16: { providesPower: true, providesVoltage: 5 },
        }}
      />
      <USBLC6_2SC6
        name="D1"
        pcbX={5.8}
        pcbY={-8}
        schX={-7}
        schY={6}
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
        x={-7}
        y={-10.2}
        schX={-12}
        schY={2.7}
        a="net.CC1"
        b="net.GND"
      />
      <R
        name="R2"
        value="5.1k"
        x={7}
        y={-11.2}
        schX={-9}
        schY={2.7}
        a="net.CC2"
        b="net.GND"
      />
      <C
        name="C1"
        value="1uF"
        x={-6}
        y={-7.8}
        schX={-6}
        schY={2.7}
        a="net.VBUS"
      />
      <Regulator
        voltage={voltage}
        name="U2"
        pcbX={-9}
        pcbY={-4.5}
        schX={-10}
        schY={-1}
      />
      <C
        name="C2"
        value="1uF"
        x={-12.6}
        y={-0.8}
        schX={-12}
        schY={-4}
        a="net.VBUS"
      />
      <C
        name="C3"
        value="1uF"
        x={-9}
        y={-1}
        schX={-8}
        schY={-4}
        a="net.LOGIC"
      />

      <C
        name="C4"
        value="100nF"
        x={2.6}
        y={-3}
        schX={-2}
        schY={0}
        a="net.LOGIC"
      />
      <C name="C5" value="100nF" x={6} y={-3} schX={2} schY={0} a="net.LOGIC" />
      <R
        name="R3"
        value="10k"
        x={7}
        y={0}
        schX={-2}
        schY={-3}
        a="net.LOGIC"
        b="net.BOOT"
      />
      <testpoint
        name="TP1"
        doNotPlace
        footprintVariant="pad"
        padDiameter={1}
        pcbX={10}
        pcbY={0}
        schX={1}
        schY={-3}
        connections={{ pin1: "net.BOOT" }}
      />
      <testpoint
        name="TP2"
        doNotPlace
        footprintVariant="pad"
        padDiameter={1}
        pcbX={12}
        pcbY={0}
        schX={3}
        schY={-3}
        connections={{ pin1: "net.DP" }}
      />
      <Wiring
        nets={{
          CC1: [".J1 > .pin6"],
          CC2: [".J1 > .pin12"],
          DP: [
            ".J1 > .pin8",
            ".J1 > .pin10",
            ".D1 > .pin1",
            ".D1 > .pin6",
            ".U1 > .pin14",
          ],
          DM: [
            ".J1 > .pin7",
            ".J1 > .pin9",
            ".D1 > .pin3",
            ".D1 > .pin4",
            ".U1 > .pin15",
          ],
          VBUS: [".J1 > .pin15", ".J1 > .pin16", ".D1 > .pin5", ".U2 > .pin3"],
          LOGIC: [".U2 > .pin2", ".U1 > .pin19", ".U1 > .pin20"],
          GND: [
            ...[1, 2, 3, 4, 13, 14].map((p) => `.J1 > .pin${p}`),
            ".D1 > .pin2",
            ".U1 > .pin18",
            ".U2 > .pin1",
          ],
        }}
      />
    </>
  );
}
