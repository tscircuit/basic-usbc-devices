import { StandardJstSwdResetUpward } from "@tsci/tscircuit.standard-jst-programmer";
import { TF_01A } from "../imports/C91145";
import { C, R } from "../common";

export function DebugAndStorage({ wifi = false } = {}) {
  return (
    <schematicsheet
      name="debug_storage"
      displayName="Programming and removable storage"
      sheetSize="A4"
    >
      {/* Product power supplies the target. A straight-through cable can safely carry either probe voltage on contact 1. */}
      {!wifi && (
        <>
          <StandardJstSwdResetUpward
            name="J_SWD"
            pcbX={33}
            pcbY={-2}
            pcbRotation={90}
            schX={-7}
            schY={6}
            noConnect={["VOUT"]}
            connections={{
              SWDIO: "net.PROBE_DIO",
              GND: "net.GND",
              SWCLK: "net.PROBE_CLK",
              NRST: "net.CPU_RUN",
            }}
          />
          <R
            name="R_SWD_DIO"
            value="100"
            x={18.75}
            y={-0.75}
            a="net.PROBE_DIO"
            b="net.SWDIO"
            schX={-2}
            schY={7}
          />
          <R
            name="R_SWD_CLK"
            value="100"
            x={18.75}
            y={-2.5}
            a="net.PROBE_CLK"
            b="net.SWCLK"
            schX={-2}
            schY={5}
          />
          <R
            name="R_RUN"
            value="10k"
            x={34}
            y={3.25}
            a="net.CPU_3V3"
            b="net.CPU_RUN"
            schX={-2}
            schY={3}
          />
          <silkscreentext text="SWD" pcbX={33} pcbY={-7} fontSize={0.8} />
        </>
      )}
      <TF_01A
        name="J_SD"
        pcbX={23.4}
        pcbY={-13.2}
        pcbRotation={0}
        schX={4}
        schY={0}
        noConnect={["pin9"]}
        connections={{
          pin1: "net.SD_D2",
          pin2: "net.SD_CS",
          pin3: "net.SD_MOSI",
          pin4: "net.CPU_3V3",
          pin5: "net.SD_SCK",
          pin6: "net.GND",
          pin7: "net.SD_MISO",
          pin8: "net.SD_D1",
          pin10: "net.GND",
          pin11: "net.GND",
          pin12: "net.GND",
          pin13: "net.GND",
        }}
      />
      {(
        [
          ["SD_CS", wifi ? 33.75 : 18.75, wifi ? -14.7 : 1],
          ["SD_MOSI", 34, -7.75],
          ["SD_MISO", 33.75, -9.5],
          ["SD_D1", 33.75, -11.25],
          ["SD_D2", 33.75, -13],
        ] as const
      ).map(([net, x, y], i) => (
        <R
          key={net}
          name={"R_SD" + (i + 1)}
          value="10k"
          x={x}
          y={y}
          a="net.CPU_3V3"
          b={"net." + net}
          schX={-7 + i * 3}
          schY={-7}
        />
      ))}
      <C
        name="C_SD"
        value="100nF"
        x={20}
        y={-5.75}
        a="net.CPU_3V3"
        schX={8}
        schY={4}
      />
      <C
        name="C_SD_BULK"
        value="4.7uF"
        x={29}
        y={-5.5}
        a="net.CPU_3V3"
        schX={11}
        schY={4}
      />
    </schematicsheet>
  );
}
