import { CH340C } from "../imports/C84681";
import { TXU0202DCUR } from "../imports/C5186957";
import { DebugAndStorage } from "./debug-and-storage";
import { C } from "../common";

import { ProductPower } from "./power";
import { WifiCore } from "../esp32-motherboard/core";
import { ProcessorCore } from "./core";

export function HostProcessor({ wifi = false } = {}) {
  return (
    <>
      {wifi ? <WifiCore /> : <ProcessorCore />}
      <DebugAndStorage wifi={wifi} />
      <ProductPower />
      <schematicsheet
        name="processor_sheet"
        displayName="Product power, USB host and programming"
        sheetSize="A4"
      >
        <CH340C
          name="U_PC"
          pcbRotation={90}
          pcbX={13}
          pcbY={-1}
          layer="top"
          schX={1}
          schY={3.8}
          noConnect={[
            "pin7",
            "pin8",
            "pin9",
            "pin10",
            "pin11",
            "pin12",
            "pin13",
            "pin14",
          ]}
          connections={{
            pin1: "net.GND",
            pin2: "net.PC_TX",
            pin3: "net.PC_RX",
            pin4: "net.BRIDGE_V3",
            pin5: "net.PC_DP",
            pin6: "net.PC_DM",
            pin15: "net.GND",
            pin16: "net.PC_5V",
          }}
        />
        <C
          layer="top"
          name="C_PC"
          x={12}
          y={-14}
          value="100nF"
          a="net.PC_5V"
          schX={5}
          schY={7}
        />
        <C
          layer="top"
          name="C_V3"
          x={11}
          y={-15.75}
          value="100nF"
          a="net.BRIDGE_V3"
          schX={9}
          schY={7}
        />
        <TXU0202DCUR
          name="U_UART"
          pcbX={25}
          pcbY={21}
          layer="top"
          schX={6}
          schY={0}
          connections={{
            pin1: "net.UART_TX",
            pin2: "net.GND",
            pin3: "net.PC_5V",
            pin4: "net.PC_RX",
            pin5: "net.PC_TX",
            pin6: "net.CPU_3V3",
            pin7: "net.CPU_3V3",
            pin8: "net.UART_RX",
          }}
        />
        <C
          layer="top"
          name="C_IOA"
          x={23.75}
          y={18.75}
          value="100nF"
          a="net.PC_5V"
          schX={5}
          schY={-4}
        />
        <C
          layer="top"
          name="C_IOB"
          x={wifi ? 28.75 : 22.75}
          y={wifi ? 21.25 : 15}
          value="100nF"
          a="net.CPU_3V3"
          schX={9}
          schY={-4}
        />
        {/* Soldered product harness. */}
        {["INPUT_5V", "GND"].map((net, i) => (
          <testpoint
            key={net}
            name={"TP_PWR" + (i + 1)}
            doNotPlace
            footprintVariant="pad"
            padDiameter={2.5}
            pcbX={8 + i * 3.5}
            pcbY={-17}
            layer="bottom"
            schX={-1 + i * 4}
            schY={-6}
            pinAttributes={
              i === 0
                ? { pin1: { providesPower: true, providesVoltage: 5 } }
                : undefined
            }
            connections={{ pin1: "net." + net }}
          />
        ))}
        <silkscreentext
          text="5V    GND"
          pcbX={9.75}
          pcbY={-19.4}
          layer="bottom"
          fontSize={0.85}
        />
      </schematicsheet>
    </>
  );
}
