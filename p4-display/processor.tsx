import { ESP32_P4NRW32X } from "../imports/C54540373";
import { TLV62569DBVR } from "../imports/C141836";
import { ASWPA4035S2R2MT } from "../imports/C340207";
import { W25Q128JVSIQ } from "../imports/C113767";
import { X322540MMB4SI } from "../imports/C5210647";
import { TYPE_C_31_M_12 } from "../imports/C165948";
import { USBLC6_2SC6 } from "../imports/C7519";
import { Wiring } from "../common";

export function Res({
  name,
  value,
  x,
  y,
  a,
  b = "GND",
}: {
  name: string;
  value: number;
  x: number;
  y: number;
  a: string;
  b?: string;
}) {
  return (
    <resistor
      name={name}
      resistance={value}
      footprint="0402"
      pcbX={x}
      pcbY={y}
      connections={{ pin1: "net." + a, pin2: "net." + b }}
    />
  );
}
export function Cap({
  name,
  value,
  x,
  y,
  a,
  b = "GND",
  footprint = "0402",
  manufacturerPartNumber,
}: {
  name: string;
  value: string;
  x: number;
  y: number;
  a: string;
  b?: string;
  footprint?: string;
  manufacturerPartNumber?: string;
}) {
  return (
    <capacitor
      name={name}
      capacitance={value}
      manufacturerPartNumber={manufacturerPartNumber}
      footprint={footprint}
      pcbX={x}
      pcbY={y}
      connections={{ pin1: "net." + a, pin2: "net." + b }}
    />
  );
}
const pin = (p: number) => ".U1 > .pin" + p;
export const signal = (gpio: number) => ".U1 > .GPIO" + gpio;

export function Processor({
  bypass,
  usedGpio,
  usbY = -18,
}: {
  bypass: readonly (readonly [string, string, number, number])[];
  usedGpio: number[];
  usbY?: number;
}) {
  const powerPins = [9, 21, 62, 75, 77, 85, 96, 101, 102];
  const hpPins = [26, 54, 76, 91];
  const nets = {
    LOGIC: [...powerPins.map(pin), ".U3 > .pin4"],
    HP: hpPins.map(pin),
    PSRAM: [59, 67, 72].map(pin),
    FLASHV: [pin(30), pin(71), ".U4 > .pin8"],
    LDO3: [pin(73)],
    LDO4: [pin(74)],
    USBPHY: [pin(51)],
    FB_HP: [pin(78), ".U3 > .pin5"],
    EN_HP: [pin(79), ".U3 > .pin1"],
    PU: [pin(103)],
    GND: [
      pin(105),
      ".U2 > .pin2",
      ".U3 > .pin2",
      ".U4 > .pin4",
      ".X1 > .pin2",
      ".X1 > .pin4",
      ".D1 > .pin2",
      ...[1, 2, 3, 4, 13, 14].map((p) => ".J1 > .pin" + p),
    ],
    FXP: [pin(100), ".X1 > .pin1"],
    FXN: [pin(99), ".X1 > .pin3"],
    FCS: [pin(27), ".U4 > .pin1"],
    FQ: [pin(28), ".U4 > .pin2"],
    FWP: [pin(29), ".U4 > .pin3"],
    FHD: [pin(31), ".U4 > .pin7"],
    FCLK: [pin(32), ".U4 > .pin6"],
    FD: [pin(33), ".U4 > .pin5"],
    VBUS: [
      ".J1 > .pin15",
      ".J1 > .pin16",
      ".D1 > .pin5",
      ".U2 > .pin4",
      ".U2 > .pin1",
    ],
    CC1: [".J1 > .pin6"],
    CC2: [".J1 > .pin12"],
    DP: [".J1 > .pin8", ".J1 > .pin10", ".D1 > .pin1", ".D1 > .pin6"],
    DM: [".J1 > .pin7", ".J1 > .pin9", ".D1 > .pin3", ".D1 > .pin4"],
    USB_DP: [signal(25)],
    USB_DM: [signal(24)],
    BOOT: [signal(35)],
    DOWNLOAD: [signal(36)],
    SW_MAIN: [".U2 > .pin3", ".L1 > .pin1"],
    FB_MAIN: [".U2 > .pin5"],
    SW_HP: [".U3 > .pin3", ".L2 > .pin1"],
  };
  // Pin 54 became a core supply in revision 3. MIPI and the HS USB data pair are unused.
  const used = new Set([...usedGpio, 24, 25, 35, 36]);
  const unused = Array.from({ length: 55 }, (_, i) => i)
    .filter((n) => !used.has(n))
    .map((n) => "GPIO" + n);
  return (
    <>
      <ESP32_P4NRW32X
        name="U1"
        pcbX={0}
        pcbY={0}
        noConnect={[
          ...unused,
          ...[
            34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
          ].map((n) => "pin" + n),
        ]}
      />
      <Wiring nets={nets} />
      <TYPE_C_31_M_12
        name="J1"
        pcbX={0}
        pcbY={usbY}
        noConnect={["pin5", "pin11"]}
        pinAttributes={{
          pin15: { providesPower: true, providesVoltage: 5 },
          pin16: { providesPower: true, providesVoltage: 5 },
        }}
      />
      <USBLC6_2SC6
        name="D1"
        pcbX={7.2}
        pcbY={usbY + 4.6}
        internallyConnectedPins={[
          ["pin1", "pin6"],
          ["pin3", "pin4"],
        ]}
        pinAttributes={{
          pin1: {},
          pin2: { requiresGround: true },
          pin3: {},
          pin4: {},
          pin5: { requiresPower: true },
          pin6: {},
        }}
      />
      <Res name="RCC1" value={5100} x={-6.7} y={usbY + 1} a="CC1" />
      <Res name="RCC2" value={5100} x={6.7} y={usbY + 1} a="CC2" />
      <Res name="RDP" value={33} x={7} y={-5} a="DP" b="USB_DP" />
      <Res name="RDM" value={33} x={7} y={-6.5} a="DM" b="USB_DM" />
      <TLV62569DBVR name="U2" pcbX={-9} pcbY={usbY + 5} />
      <ASWPA4035S2R2MT
        name="L1"
        pcbX={-14}
        pcbY={usbY + 5}
        connections={{ pin2: "net.LOGIC" }}
      />
      <Res name="RF1" value={430000} x={-12} y={-9} a="LOGIC" b="FB_MAIN" />
      <Res name="RF2" value={100000} x={-9.5} y={-9} a="FB_MAIN" />
      <Cap
        name="CIN"
        value="4.7uF"
        footprint="0805"
        x={-10}
        y={usbY + 1}
        a="VBUS"
      />
      <Cap
        name="CMAIN"
        value="22uF"
        footprint="0805"
        x={-15}
        y={-9}
        a="LOGIC"
      />
      <TLV62569DBVR name="U3" pcbX={8.4} pcbY={0} />
      <ASWPA4035S2R2MT
        name="L2"
        pcbX={13.5}
        pcbY={0}
        connections={{ pin2: "net.HP" }}
      />
      <Res name="RF3" value={499000} x={9} y={3} a="HP" b="FB_HP" />
      <Res name="RF4" value={499000} x={11.6} y={3} a="FB_HP" />
      <Cap name="CFF" value="22pF" x={8.8} y={4.4} a="HP" b="FB_HP" />
      <Cap
        name="CHPIN"
        value="4.7uF"
        footprint="0603"
        x={8.7}
        y={-2.9}
        a="LOGIC"
      />
      <Cap
        name="CHPOUT"
        value="22uF"
        footprint="0805"
        x={13.7}
        y={-3.8}
        a="HP"
      />
      <X322540MMB4SI loadCapacitance="10pF" name="X1" pcbX={-3.1} pcbY={7.6} />
      <Cap name="CX1" value="15pF" x={-6.6} y={7.5} a="FXP" />
      <Cap name="CX2" value="15pF" x={0.4} y={7.8} a="FXN" />
      <W25Q128JVSIQ name="U4" pcbX={0} pcbY={-9.1} pcbRotation={90} />
      <Res name="RPU" value={10000} x={-8} y={5.7} a="LOGIC" b="PU" />
      <Cap name="CPU" value="1uF" x={-9.7} y={7.5} a="PU" />
      <Res name="RBOOT" value={10000} x={10} y={7} a="LOGIC" b="BOOT" />
      <Res name="RDL" value={10000} x={10} y={8.6} a="LOGIC" b="DOWNLOAD" />
      {["GND", "BOOT", "PU"].map((net, i) => (
        <testpoint
          key={net}
          name={"TP" + (i + 1)}
          pcbX={12 + i * 2}
          pcbY={8}
          padDiameter={1}
          footprintVariant="pad"
          doNotPlace
          connections={{ pin1: "net." + net }}
        />
      ))}
      <Res name="RPHY" value={0} x={5.9} y={-8.5} a="LOGIC" b="USBPHY" />
      {/* Place bypass capacitors on the assembly side around the package fanout. */}
      {bypass.map(([name, net, x, y]) => (
        <Cap
          key={name}
          name={name}
          value={
            name.startsWith("CD")
              ? "100nF"
              : name.startsWith("CB")
                ? "10uF"
                : net === "USBPHY"
                  ? "4.7uF"
                  : "1uF"
          }
          footprint={
            name.startsWith("CD")
              ? "0402"
              : name.startsWith("CB")
                ? "0805"
                : "0603"
          }
          x={x}
          y={y}
          a={net}
        />
      ))}
    </>
  );
}
