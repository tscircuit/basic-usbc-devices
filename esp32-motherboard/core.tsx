import { ESP32_S3_WROOM_1U_N16R8 } from "../imports/C3013946";
import { AP63203WU_7 } from "../imports/C780769";
import { MWSA0402S_3R3MT } from "../imports/C408336";
import { B3U_1000P } from "../imports/C231329";
import { CL10A106KP8NNNC } from "../imports/C19702";
import { C, R } from "../common";

export function WifiCore() {
  return (
    <schematicsheet
      name="wifi_core"
      displayName="Wi-Fi host and 3.3 V regulator"
      sheetSize="A4"
    >
      <net name="CPU_3V3" nominalTraceWidth={0.35} />
      <net name="REG_SW" nominalTraceWidth={0.45} />
      <ESP32_S3_WROOM_1U_N16R8
        name="U_CPU"
        pcbX={27}
        pcbY={6.5}
        schX={5}
        schY={1}
        noConnect={[
          "IO4",
          "IO5",
          "IO6",
          "IO7",
          "IO15",
          "IO16",
          "IO17",
          "IO18",
          "IO8",
          "IO3",
          "IO46",
          "IO14",
          "IO21",
          "IO47",
          "IO48",
          "IO45",
          "IO35",
          "IO36",
          "IO37",
          "IO38",
          "IO39",
          "IO40",
          "IO41",
          "IO42",
          "IO2",
          "IO1",
          "IO9",
        ]}
        connections={{
          GND1: "net.GND",
          GND40: "net.GND",
          EP1: "net.GND",
          EP2: "net.GND",
          EP3: "net.GND",
          EP4: "net.GND",
          EP5: "net.GND",
          EP6: "net.GND",
          EP7: "net.GND",
          EP8: "net.GND",
          EP9: "net.GND",
          pin2: "net.CPU_3V3",
          EN: "net.CPU_EN",
          IO0: "net.BOOT_N",
          IO19: "net.DM0",
          IO20: "net.DP0",
          TXD0: "net.UART_TX",
          RXD0: "net.UART_RX",
          IO10: "net.SD_CS",
          IO11: "net.SD_MOSI",
          IO12: "net.SD_SCK",
          IO13: "net.SD_MISO",
        }}
      />
      <R
        name="R_EN"
        value="10k"
        x={14.5}
        y={6.5}
        schX={0}
        schY={6}
        a="net.CPU_3V3"
        b="net.CPU_EN"
      />
      <C
        name="C_EN"
        value="1uF"
        x={11.25}
        y={6.5}
        schX={0}
        schY={3}
        a="net.CPU_EN"
      />
      <R
        name="R_BOOT"
        value="10k"
        x={34.5}
        y={-5}
        schX={0}
        schY={0}
        a="net.CPU_3V3"
        b="net.BOOT_N"
      />
      <B3U_1000P
        name="SW_RESET"
        pcbX={14.5}
        pcbY={9}
        schX={-5}
        schY={5}
        connections={{ pin1: "net.CPU_EN", pin2: "net.GND" }}
      />
      <B3U_1000P
        name="SW_BOOT"
        pcbX={30}
        pcbY={18.75}
        schX={-5}
        schY={0}
        connections={{ pin1: "net.BOOT_N", pin2: "net.GND" }}
      />
      <silkscreentext text="RST" pcbX={11.05} pcbY={9} fontSize={0.6} />
      <silkscreentext text="BOOT" pcbX={26.55} pcbY={18.75} fontSize={0.6} />
      <CL10A106KP8NNNC
        name="C_RF"
        pcbX={14.5}
        pcbY={13.75}
        schX={8}
        schY={6}
        connections={{ pin1: "net.CPU_3V3", pin2: "net.GND" }}
      />
      <AP63203WU_7
        name="U_BUCK"
        pcbX={13}
        pcbY={19.25}
        schX={-10}
        schY={-5}
        connections={{
          FB: "net.CPU_3V3",
          EN: "net.VBUS",
          VIN: "net.VBUS",
          GND: "net.GND",
          SW: "net.REG_SW",
          BST: "net.REG_BST",
        }}
      />
      <MWSA0402S_3R3MT
        name="L_BUCK"
        pcbX={18.75}
        pcbY={19.75}
        schX={-5}
        schY={-4}
        connections={{ pin2: "net.REG_SW", pin1: "net.CPU_3V3" }}
      />
      <CL10A106KP8NNNC
        name="C_IN"
        pcbX={11.75}
        pcbY={15.75}
        pcbRotation={90}
        schX={-14}
        schY={-5}
        connections={{ pin1: "net.VBUS", pin2: "net.GND" }}
      />
      <C
        name="C_BST"
        value="100nF"
        x={15.25}
        y={16.25}
        schX={-7}
        schY={-7}
        a="net.REG_BST"
        b="net.REG_SW"
      />
      {[
        [11.25, 13.0],
        [15.25, 11.75],
      ].map(([x, y], i) => (
        <capacitor
          key={x}
          name={`C_OUT${i + 1}`}
          capacitance="22uF"
          footprint="0805"
          pcbX={x}
          pcbY={y}
          schX={-1 + i * 3}
          schY={-6}
          manufacturerPartNumber="CL21A226MAQNNNE"
          supplierPartNumbers={{ jlcpcb: ["C45783"] }}
          connections={{ pin1: "net.CPU_3V3", pin2: "net.GND" }}
        />
      ))}
    </schematicsheet>
  );
}
