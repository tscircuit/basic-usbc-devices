import { displayRules, savedRouter } from "./router";
import copper from "./video-player-copper.json";
import { Processor, Cap, Res, signal } from "./processor";
import { DisplayMounts } from "../new-devices/mounts";
import { TF_01A } from "../imports/C91145";
import { AFC07_S50ECC_00 } from "../imports/C11098";
import { AO3400A } from "../imports/C20917";
import { Wiring } from "../common";

const dataGpios = Array.from({ length: 16 }, (_, i) => i + 1);
const usedGpio = [...dataGpios, 17, 18, 19, 20, 39, 40, 41, 42, 43, 44];
const sdSignals = [
  ["SD0", 39, 7],
  ["SD1", 40, 8],
  ["SD2", 41, 1],
  ["SD3", 42, 2],
  ["SDCLK", 43, 5],
  ["SDCMD", 44, 3],
] as const;

export default function VideoPlayer() {
  return (
    <board
      {...displayRules}
      autorouter={{ local: true, algorithmFn: savedRouter(copper) }}
      width={48}
      height={48}
      schStyle={{ defaultPassiveSize: "xs" }}
      schMaxTraceDistance={1.2}
      name="video_player"
      routeRemaining
    >
      <schematicsheet
        name="player_sheet"
        sheetSize="ANSI_B"
        displayName="Local video player, 320 × 480"
      >
        <copperpour
          name="GROUND"
          layer="inner1"
          connectsTo="net.GND"
          clearance={0.2}
          boardEdgeMargin={0.5}
        />
        <DisplayMounts
          layers={["top", "inner1", "inner2", "bottom"]}
          spanX={40}
          spanY={30}
        />
        <Processor usedGpio={usedGpio} />
        <AFC07_S50ECC_00
          name="J2"
          pcbX={0}
          pcbY={21}
          noConnect={[
            "pin4",
            "pin5",
            "pin6",
            "pin33",
            "pin39",
            "pin44",
            "pin45",
            "pin46",
            "pin47",
            "pin51",
            "pin52",
          ]}
          pinAttributes={{
            pin40: { requiresPower: true },
            pin41: { requiresPower: true },
            pin42: { requiresPower: true },
            pin43: { requiresGround: true },
          }}
        />
        <TF_01A
          name="J3"
          layer="bottom"
          pcbX={-14}
          pcbY={1.3}
          pcbRotation={270}
          noConnect={["pin9"]}
        />
        {sdSignals
          .filter(([name]) => name !== "SDCLK")
          .map(([name], i) => (
            <Res
              key={name}
              name={"RSD" + (i + 1)}
              value={10000}
              a="LOGIC"
              b={name}
              x={-16 + i * 2.2}
              y={10.5}
            />
          ))}
        <Cap name="CSD1" value="100nF" x={-16} y={-7} a="LOGIC" />
        <Cap
          name="CSD2"
          value="10uF"
          footprint="0805"
          x={-19}
          y={-7}
          a="LOGIC"
        />
        <Cap name="CLCD" value="1uF" x={8} y={17} a="LOGIC" />
        <AO3400A
          name="MOSFET1"
          pcbX={11}
          pcbY={14}
          pinAttributes={{
            pin1: { isPassive: true },
            pin2: { isPassive: true, requiresGround: true },
            pin3: { isPassive: true },
          }}
        />
        <Res name="RBL" value={10000} x={8} y={14} a="BL" />
        <resistor
          name="RA"
          resistance={100}
          footprint="1206"
          pcbX={15.5}
          pcbY={10.7}
          connections={{ pin1: "net.VBUS", pin2: "net.LEDA" }}
          manufacturerPartNumber="1206W4F1000T5E"
          supplierPartNumbers={{ jlcpcb: ["C17901"] }}
        />
        <Wiring
          nets={{
            ...Object.fromEntries(
              dataGpios.map((gpio, i) => [
                "LCD" + i,
                [signal(gpio), ".J2 > .pin" + (32 - i)],
              ]),
            ),
            ...Object.fromEntries(
              sdSignals.map(([name, gpio, pin]) => [
                name,
                [signal(gpio), ".J3 > .pin" + pin],
              ]),
            ),
            LOGIC: [
              ".J3 > .pin4",
              ...[8, 35, 40, 41, 42].map((n) => ".J2 > .pin" + n),
            ],
            GND: [
              ...[6, 10, 11, 12, 13].map((n) => ".J3 > .pin" + n),
              ...[7, 9, 11, 12, 13, 14, 15, 16, 34, 38, 43, 48, 49, 50].map(
                (n) => ".J2 > .pin" + n,
              ),
              ".MOSFET1 > .pin2",
            ],
            WR: [signal(17), ".J2 > .pin36"],
            DC: [signal(18), ".J2 > .pin37"],
            RESET: [signal(19), ".J2 > .pin10"],
            BL: [signal(20), ".MOSFET1 > .pin1"],
            LEDA: [".J2 > .pin1"],
            LEDK: [".J2 > .pin2", ".J2 > .pin3", ".MOSFET1 > .pin3"],
          }}
        />
      </schematicsheet>
    </board>
  );
}
