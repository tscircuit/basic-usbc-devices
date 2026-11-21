import { displayRules, savedRouter } from "./router";
import copper from "./large-rgb-copper.json";
import { Processor, Cap, Res, signal } from "./processor";
import { DisplayMounts } from "../new-devices/mounts";
import { Wiring } from "../common";
import { TPS65150RGER } from "../imports/C468258";
import { TPS61165DBVR } from "../imports/C58756";
import { TPS22919DCKR } from "../imports/C2149796";
import { SWPA4030S4R7MT } from "../imports/C57269";
import { SWPA4030S100MT } from "../imports/C38117";
import { MBR0530 } from "../imports/C699108";
import { AFC07_S50ECC_00 } from "../imports/C11098";

const panel = (n: number) => ".J2 > .pin" + n;
// Controller bit zero is blue LSB. Drive the most significant inputs on each color channel.
const pixels = [16, 15, 14, 13, 12, 25, 24, 23, 22, 21, 20, 32, 31, 30, 29, 28];
const bias = (...pins: number[]) => pins.map((n) => ".U5 > .pin" + n);
const boostCaps = [
  ["CAF", "22uF", "AVDD", "GND", -17.0, 14.8, "1210"],
  ["CAS", "1uF", "AVDD", "GND", -11, 11, "0805"],
  ["CNF", "330nF", "DRVN", "NFLY", -18.2, 6.0, "0603"],
  ["CNG", "1uF", "VGL", "GND", -22, 6, "0805"],
  ["CPF", "330nF", "DRVP", "PFLY", -24.4, 19.0, "0603"],
  ["CPI", "1uF", "CPI", "GND", -24.6, 16.8, "0805"],
  ["CGH", "1uF", "VGH", "GND", -22.0, 23.8, "0805"],
  ["CREF", "220nF", "REF", "GND", -19.0, 3.6, "0603"],
  ["CVIN", "1nF", "VCOMREF", "GND", -12, 14, "0402"],
  ["CVCOM", "1uF", "VCOM", "GND", -12.0, 15.6, "0603"],
  ["CDLY1", "10nF", "DLY1", "GND", -15, 6, "0402"],
  ["CDLY2", "22nF", "DLY2", "GND", -12.6, 6.0, "0402"],
  ["CFD", "100nF", "FDLY", "BIASIN", -17.6, 1.6, "0603"],
  ["CCOMP", "2.2nF", "COMP", "GND", -22.0, 4.0, "0402"],
  ["CADJ", "22pF", "ADJ", "GND", -10.2, 17.2, "0402"],
  ["CFDA", "22pF", "AVDD", "FBA", -12.0, 7.4, "0402"],
  ["CBIAS", "4.7uF", "BIASIN", "GND", -17.8, -2.0, "0805"],
  ["CBL1", "4.7uF", "BIASIN", "GND", 19.6, 11.0, "0805"],
  ["CBL2", "1uF", "LEDA", "GND", 15.0, 17.8, "0805"],
  ["CBL3", "220nF", "BLCOMP", "GND", 10.8, 11.0, "0603"],
  ["CPANEL", "1uF", "LOGIC", "GND", 7.0, 19.6, "0603"],
] as const;
const biasCapParts: Record<string, string> = {
  CAF: "GRM32ER71E226ME15L",
  CAS: "GRM21BR71H105KA12L",
  CNG: "GRM21BR71H105KA12L",
  CPI: "GRM21BR71H105KA12L",
  CGH: "GRM21BR71H105KA12L",
  CBL2: "GRM21BR71H105KA12L",
  CNF: "GRM188R71E334KA01D",
  CPF: "GRM188R71E334KA01D",
};
const biasRes = [
  ["RAV1", 80600, "AVDD", "FBA", -9, 9],
  ["RAV2", 10000, "FBA", "GND", -7.8, 11.0],
  ["RNG1", 576000, "VGL", "FBN", -24.4, 3.0],
  ["RNG2", 100000, "REF", "FBN", -24, 1],
  ["RPG1", 1220000, "CPI", "FBP", -20.8, 16.4],
  ["RPG2", 100000, "FBP", "GND", -10.2, 18.8],
  ["RVC1", 167000, "AVDD", "VCOMREF", -7.8, 18.0],
  ["RVC2", 100000, "VCOMREF", "GND", -9.0, 15.6],
  ["RPWM", 10000, "BL", "GND", 11.2, 13.0],
  ["RENA", 10000, "BIASEN", "GND", -21.2, -5.0],
  ["RRST", 10000, "RESET", "GND", 3, 20],
] as const;
export default function LargeRgb() {
  return (
    <board
      {...displayRules}
      routeRemaining
      autorouter={{ local: true, algorithmFn: savedRouter(copper) }}
      width={54}
      height={54}
      schStyle={{ defaultPassiveSize: "xs" }}
      schMaxTraceDistance={1.2}
      name="large_rgb"
    >
      <schematicsheet
        name="rgb_sheet"
        displayName="7 inch bare RGB panel"
        sheetSize="ANSI_B"
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
          spanY={40}
        />
        <Processor
          usedGpio={[...Array.from({ length: 22 }, (_, i) => i + 1), 23]}
          usbY={-21}
        />
        <AFC07_S50ECC_00
          name="J2"
          pcbX={0}
          pcbY={23.8}
          noConnect={["pin45", "pin49", "pin50", "pin51", "pin52"]}
          pinAttributes={{
            pin7: { requiresPower: true },
            pin5: { requiresGround: true },
            pin36: { requiresGround: true },
            pin38: { requiresGround: true },
            pin48: { requiresGround: true },
          }}
        />
        <TPS65150RGER name="U5" pcbX={-16} pcbY={10} noConnect={["pin2"]} />
        <TPS61165DBVR name="U6" pcbX={15} pcbY={12} />
        <TPS22919DCKR name="U7" pcbX={-18} pcbY={-5} noConnect={["pin4"]} />
        <SWPA4030S4R7MT
          name="L3"
          pcbX={-13}
          pcbY={0}
          connections={{ pin1: "net.BIASIN", pin2: "net.SWA" }}
        />
        <SWPA4030S100MT
          name="L4"
          pcbX={20}
          pcbY={14.7}
          connections={{ pin1: "net.BIASIN", pin2: "net.SWBL" }}
        />
        {(
          [
            ["D2", "SWA", "AVDD", -13.0, 4.0],
            ["D3", "VGL", "NFLY", -21.8, 8.6],
            ["D4", "NFLY", "GND", -21.8, 11.5],
            ["D5", "AVDD", "PFLY", -22.6, 14.2],
            ["D6", "PFLY", "CPI", -14.4, 18.2],
          ] as const
        ).map(([name, a, k, x, y]) => (
          <MBR0530
            key={name}
            name={name}
            pcbX={x}
            pcbY={y}
            connections={{ anode: "net." + a, cathode: "net." + k }}
          />
        ))}
        {/* Same SOD-123 land pattern; the backlight open-load clamp requires a higher rated diode. */}
        <MBR0530
          name="D7"
          manufacturerPartNumber="MBR0560"
          supplierPartNumbers={{ jlcpcb: ["C77338"] }}
          pcbX={14.2}
          pcbY={15.3}
          connections={{ anode: "net.SWBL", cathode: "net.LEDA" }}
        />
        {boostCaps.map(([name, value, a, b, x, y, footprint]) => (
          <Cap
            key={name}
            {...{ name, value, a, b, x, y, footprint }}
            manufacturerPartNumber={biasCapParts[name]}
          />
        ))}
        {biasRes.map(([name, value, a, b, x, y]) => (
          <Res key={name} {...{ name, value, a, b, x, y }} />
        ))}
        <resistor
          name="RSET"
          resistance={2.67}
          footprint="0603"
          pcbX={18.5}
          pcbY={8.7}
          connections={{ pin1: "net.LEDK", pin2: "net.GND" }}
        />
        <Wiring
          nets={{
            ...Object.fromEntries(
              pixels.map((p, i) => ["RGB" + i, [signal(i + 1), panel(p)]]),
            ),
            DE: [signal(17), panel(9)],
            VS: [signal(18), panel(10)],
            HS: [signal(19), panel(11)],
            PCLK: [signal(20), panel(37)],
            RESET: [signal(21), panel(44)],
            BL: [signal(22), ".U6 > .pin2"],
            BIASEN: [signal(23), ".U7 > .pin3"],
            LOGIC: [7, 8, 39, 47].map(panel),
            GND: [
              ...[5, 17, 18, 19, 26, 27, 33, 34, 35, 36, 38, 40, 48].map(panel),
              ...bias(10, 11, 22, 25),
              ".U6 > .pin4",
              ".U7 > .pin2",
            ],
            VBUS: [".U7 > .pin1"],
            BIASIN: [
              ".U7 > .pin6",
              ".U7 > .pin5",
              ...bias(7, 16),
              ".U6 > .pin1",
            ],
            AVDD: [panel(43), ...bias(12)],
            VGH: [panel(41), ...bias(18)],
            VGL: [panel(42)],
            VCOM: [panel(6), panel(46), ...bias(13)],
            FBA: bias(4),
            SWA: bias(8, 9),
            CPI: bias(19),
            DRVN: bias(21),
            DRVP: bias(20),
            FBN: bias(24),
            FBP: bias(15),
            REF: bias(23),
            VCOMREF: bias(14),
            FDLY: bias(3),
            DLY1: bias(5),
            DLY2: bias(6),
            COMP: bias(1),
            ADJ: bias(17),
            LEDA: [panel(1), panel(2)],
            LEDK: [panel(3), panel(4), ".U6 > .pin6"],
            BLCOMP: [".U6 > .pin5"],
            SWBL: [".U6 > .pin3"],
          }}
        />
      </schematicsheet>
    </board>
  );
}
