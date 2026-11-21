import { boardRules, R, C, Wiring } from "../common";
import { DisplayUsb } from "./display-usb";
import { DisplayMounts } from "./mounts";
import { CH552T } from "../imports/C111367";
import { A_0_5K_AS_24PWB } from "../imports/C2911766";
import { MBR0530 } from "../imports/C699108";
import { SI1304BDL } from "../imports/C7419947";
import { SWPA5040S470MT } from "../imports/C86617";

// ER-EPD0583-1, figures 7-1 and 7-2. All boosted nodes have 50 V ceramics.
function BiasCap({
  name,
  net,
  other = "GND",
  bulk = false,
  x,
  y,
  rotation = 0,
}: {
  name: string;
  net: string;
  other?: string;
  bulk?: boolean;
  x: number;
  y: number;
  rotation?: number;
}) {
  return (
    <capacitor
      name={name}
      pcbX={x}
      pcbY={y}
      pcbRotation={rotation}
      capacitance={bulk ? "4.7uF" : "1uF"}
      footprint={bulk ? "1210" : "0805"}
      manufacturerPartNumber={
        bulk ? "GRM32ER71H475KA88L" : "GRM21BR71H105KA12L"
      }
      connections={{ pin1: "net." + net, pin2: "net." + other }}
    />
  );
}

export default function Ereader() {
  return (
    <board
      {...boardRules}
      name="ereader"
      width={36}
      height={38}
      minTraceWidth={0.15}
    >
      <schematicsheet
        name="epaper_sheet"
        displayName="5.83 inch USB-C e-paper reader"
        sheetSize="A4"
      >
        <DisplayMounts spanX={30} spanY={20} />
        <copperpour
          name="GROUND"
          layer="bottom"
          connectsTo="net.GND"
          clearance={0.2}
          boardEdgeMargin={0.6}
        />
        <DisplayUsb voltage={3.3} />
        <CH552T
          name="U1"
          pcbX={0}
          pcbY={2}
          pcbRotation={180}
          noConnect={[
            "pin1",
            "pin6",
            "pin7",
            "pin8",
            "pin10",
            "pin12",
            "pin13",
            "pin16",
            "pin17",
          ]}
        />
        <A_0_5K_AS_24PWB
          name="J2"
          pcbX={0}
          pcbY={15.2}
          pcbRotation={180}
          noConnect={["pin1", "pin4", "pin19", "pin25", "pin26"]}
          pinAttributes={{
            pin15: { requiresPower: true },
            pin16: { requiresPower: true },
            pin17: { requiresGround: true },
          }}
        />
        <SWPA5040S470MT
          name="L1"
          pcbX={-10}
          pcbY={5}
          connections={{ pin1: "net.LOGIC", pin2: "net.SW" }}
        />
        <SI1304BDL name="Q1" pcbX={-5.8} pcbY={10.8} />
        <resistor
          name="RS"
          resistance={2.2}
          footprint="0805"
          manufacturerPartNumber="CRCW08052R20FKEA"
          pcbX={-3.4}
          pcbY={8.8}
          pcbRotation={90}
          connections={{ pin1: "net.RESE", pin2: "net.GND" }}
        />
        <R name="RG" value="10k" x={11} y={5} a="net.GDR" b="net.GND" />
        <MBR0530
          name="D2"
          pcbX={-12}
          pcbY={14.7}
          connections={{ anode: "net.VGL", cathode: "net.FLY" }}
        />
        <MBR0530
          name="D3"
          pcbX={-12}
          pcbY={17.1}
          connections={{ anode: "net.FLY", cathode: "net.GND" }}
        />
        <MBR0530
          name="D4"
          pcbX={-9.9}
          pcbY={9.5}
          connections={{ anode: "net.SW", cathode: "net.VGH" }}
        />
        <BiasCap name="CF" net="SW" other="FLY" x={-11} y={12.6} />
        <BiasCap name="CH" bulk net="VGH" x={0.8} y={8.2} />
        <BiasCap name="CL" bulk net="VGL" x={6.5} y={8.2} />
        <C name="C6" value="4.7uF" a="net.LOGIC" x={-15.4} y={1.4} />
        <C name="C7" value="1uF" a="net.LOGIC" x={6.6} y={11.3} />
        {["VSHR", "VDD_CORE", "VSH", "VSL", "VCOM"].map((net, i) => (
          <BiasCap
            key={net}
            name={"CB" + (i + 1)}
            net={net}
            x={10.8}
            y={7 + i * 2}
          />
        ))}
        <Wiring
          nets={{
            LOGIC: [".J2 > .pin15", ".J2 > .pin16"],
            GND: [6, 7, 8, 17].map((p) => ".J2 > .pin" + p),
            BUSY: [".J2 > .pin9", ".U1 > .pin4"],
            RESET: [".J2 > .pin10", ".U1 > .pin9"],
            DC: [".J2 > .pin11", ".U1 > .pin11"],
            CS: [".J2 > .pin12", ".U1 > .pin2"],
            SCK: [".J2 > .pin13", ".U1 > .pin5"],
            MOSI: [".J2 > .pin14", ".U1 > .pin3"],
            GDR: [".J2 > .pin2", ".Q1 > .gate"],
            RESE: [".J2 > .pin3", ".Q1 > .source"],
            SW: [".Q1 > .drain"],
            VSHR: [".J2 > .pin5"],
            VDD_CORE: [".J2 > .pin18"],
            VSH: [".J2 > .pin20"],
            VGH: [".J2 > .pin21"],
            VSL: [".J2 > .pin22"],
            VGL: [".J2 > .pin23"],
            VCOM: [".J2 > .pin24"],
          }}
        />
      </schematicsheet>
    </board>
  );
}
