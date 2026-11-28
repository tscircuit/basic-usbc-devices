import { createElement, Fragment, type PropsWithChildren } from "react"
import { C, R, boardRules } from "./common"
import { HubBulkCap } from "./hub-bulk-cap"
import { TYPE_C_31_M_12 } from "./imports/C165948"
import { USB2514B_AEZC_TR } from "./imports/C16251"
import { TAXM24M4RFBCCT2T } from "./imports/C164058"
import { KT_0603R } from "./imports/C2286"
import { fosanBulkCapModel } from "./imports/C7469982"
import { TPS25821DSSR } from "./imports/C2861545"
import { KF128_5_08_2P_AA } from "./imports/C474952"
import { AP2112K_3_3TRG1 } from "./imports/C51118"
import { TPD2EUSB30DRTR } from "./imports/C97502"
import { switchableHubRouter } from "./switchable-hub/router"

const net = (name: string) => `net.${name}`
const ground = net("GND")
const supply = net("EXT_5V")
const logic = net("V3V3")

const portCenters = [-22.5, -7.5, 7.5, 22.5]
function placement(pcbX: number, pcbY: number, schX: number, schY: number, pcbRotation = 0) {
  return { pcbX, pcbY, schX, schY, pcbRotation }
}

function Section({
  name,
  displayName,
  children,
}: PropsWithChildren<{ name: string; displayName: string }>) {
  return createElement("schematicsection", { name, displayName }, children)
}

function UsbConnector({
  port,
  x,
  y,
  sx,
  sy,
}: {
  port: number
  x: number
  y: number
  sx: number
  sy: number
}) {
  const isHost = port === 0
  const vbus = net(isHost ? "HOST_VBUS" : `VBUS${port}`)
  const dp = net(`DP${port}`),
    dm = net(`DM${port}`)
  const powerPin = isHost ? { providesPower: true, providesVoltage: 5 } : { requiresPower: true }
  return (
    <>
      <TYPE_C_31_M_12
        name={`J${port + 1}`}
        {...placement(x, y, sx, sy, isHost ? -90 : 0)}
        noConnect={["pin5", "pin11"]}
        pinAttributes={{
          pin13: { requiresGround: true },
          pin14: { requiresGround: true },
          pin15: powerPin,
          pin16: powerPin,
        }}
        connections={{
          pin1: ground,
          pin2: ground,
          pin3: ground,
          pin4: ground,
          pin13: ground,
          pin14: ground,
          pin6: net(`CC1_${port}`),
          pin12: net(`CC2_${port}`),
          pin7: dm,
          pin9: dm,
          pin8: dp,
          pin10: dp,
          pin15: vbus,
          pin16: vbus,
        }}
      />
      <TPD2EUSB30DRTR
        name={`D${port + 1}`}
        {...placement(isHost ? x + 4.95 : x, isHost ? y : y + 4.95, sx + 3.7, sy, isHost ? 0 : 90)}
        connections={{ pin1: dp, pin2: dm, pin3: ground }}
      />
    </>
  )
}

function DownstreamPort({ port }: { port: number }) {
  const x = portCenters[port - 1],
    sx = port % 2 ? -7 : 7,
    sy = port <= 2 ? 5 : -4.8
  const base = 20 + 10 * (port - 1)
  const vbus = net(`VBUS${port}`),
    enable = net(`EN${port}`)
  return (
    <Section name={`port${port}`} displayName={`P${port} • 5 V / 1.5 A`}>
      <UsbConnector port={port} x={x} y={-17.3} sx={sx - 3.7} sy={sy + 2.3} />
      <TPS25821DSSR
        name={`U${port + 2}`}
        {...placement(x + 4.2, -10.9, sx + 3.3, sy + 2.1, 180)}
        noConnect={["pin6", "pin7"]}
        connections={{
          pin1: supply,
          pin2: supply,
          pin3: supply,
          pin4: enable,
          pin5: net(`OC${port}_N`),
          pin8: net(`REF${port}`),
          pin9: net(`CC1_${port}`),
          pin10: ground,
          pin11: net(`CC2_${port}`),
          pin12: vbus,
          pin13: ground,
        }}
      />
      <R
        name={`R${base}`}
        value="100k"
        x={x + 1.72}
        y={-9.8}
        rotation={90}
        schX={sx - 3}
        schY={sy - 0.6}
        a={net(`REF${port}`)}
        b={ground}
      />
      <R
        name={`R${base + 1}`}
        value="100k"
        x={x + 1.4}
        y={-6.8}
        rotation={90}
        schX={sx}
        schY={sy - 0.6}
        a={enable}
        b={ground}
      />
      <C
        name={`C${base}`}
        value="100nF"
        x={x + 7.15}
        y={-11.45}
        rotation={90}
        schX={sx + 3}
        schY={sy - 0.6}
        a={supply}
      />
      <HubBulkCap
        name={`C${base + 1}`}
        net="EXT_5V"
        cadModel={{ ...fosanBulkCapModel, pcbRotationOffset: 180 }}
        {...placement(x + 6.5, -4.3, sx - 3, sy - 2.5, 270)}
      />
      <C name={`C${base + 2}`} value="4.7uF" x={x - 3.5} y={-12.8} schX={sx} schY={sy - 2.5} a={vbus} />
      <R
        name={`R${base + 2}`}
        value="1k"
        x={x - 3.5}
        y={-10.9}
        schX={sx + 3}
        schY={sy - 2.5}
        a={vbus}
        b={ground}
      />
      <R
        name={`R${base + 3}`}
        value="1k"
        x={x - 3.0}
        y={-8.9}
        schX={sx - 1.5}
        schY={sy - 4.1}
        a={vbus}
        b={net(`LED${port}_A`)}
      />
      <KT_0603R
        name={`LED${port}`}
        {...placement(x - 6.5, -16.0, sx + 1.5, sy - 4.1, 90)}
        connections={{ anode: net(`LED${port}_A`), cathode: ground }}
      />
      <silkscreentext text={`P${port}`} pcbX={x - 1.8} pcbY={-4.2} fontSize={1.45} />
    </Section>
  )
}

export function SwitchableHubBoard({ routingDisabled = false }: { routingDisabled?: boolean } = {}) {
  return (
    <board
      name="switchable_hub"
      {...boardRules}
      width={66}
      height={46}
      layers={4}
      minTraceWidth={0.15}
      minTraceToPadEdgeClearance={0.15}
      routeRemaining
      routingDisabled={routingDisabled}
      autorouter={{ local: true, algorithmFn: switchableHubRouter }}
      schLayout={{ layoutMode: "none" }}
      schMaxTraceDistance={0.8}
      schStyle={{ defaultPassiveSize: "xs" }}
    >
      <copperpour
        name="L2_GND"
        layer="inner1"
        connectsTo={ground}
        clearance={0.25}
        boardEdgeMargin={0.5}
        useThermalReliefs={false}
      />
      <copperpour
        name="L3_5V"
        layer="inner2"
        connectsTo={supply}
        clearance={0.25}
        boardEdgeMargin={0.5}
        useThermalReliefs={false}
      />
      {[-30, 30].flatMap((x) =>
        [-20, 20].map((y) => (
          <Fragment key={`${x}_${y}`}>
            <hole diameter={2.2} pcbX={x} pcbY={y} />
            <keepout
              shape="circle"
              radius={2.3}
              pcbX={x}
              pcbY={y}
              layers={["top", "inner1", "inner2", "bottom"]}
            />
          </Fragment>
        )),
      )}
      <schematicsheet
        name="switchable_hub_sheet"
        displayName="Individually switched USB-C hub"
        sheetSize="A4"
      >
        <Section name="upstream" displayName="USB host • data and VBUS sense">
          <UsbConnector port={0} x={-27.3} y={8.0} sx={-11.8} sy={3.5} />
          <R
            name="R1"
            value="5.1k"
            x={-22.3}
            y={10.8}
            schX={-12.7}
            schY={0}
            a={net("CC1_0")}
            b={ground}
          />
          <R
            name="R2"
            value="5.1k"
            x={-22.3}
            y={5.0}
            schX={-10.5}
            schY={0}
            a={net("CC2_0")}
            b={ground}
          />
          <C name="C1" value="1uF" x={-22.5} y={2.6} schX={-8.3} schY={0} a={net("HOST_VBUS")} />
          <R
            name="R3"
            value="100k"
            x={-18.2}
            y={11.6}
            schX={-12}
            schY={-2.5}
            a={net("HOST_VBUS")}
            b={net("VBUS_DET")}
          />
          <R
            name="R4"
            value="100k"
            x={-15.2}
            y={11.6}
            schX={-9}
            schY={-2.5}
            a={net("VBUS_DET")}
            b={ground}
          />
        </Section>
        <Section name="core" displayName="USB2514B • self-powered, individual switching">
          <USB2514B_AEZC_TR
            name="U1"
            {...placement(0, 7, -2, 3.5)}
            noConnect={["pin11"]}
            connections={{
              pin1: net("DM1"),
              pin2: net("DP1"),
              pin3: net("DM2"),
              pin4: net("DP2"),
              pin5: logic,
              pin6: net("DM3"),
              pin7: net("DP3"),
              pin8: net("DM4"),
              pin9: net("DP4"),
              pin10: logic,
              pin12: net("EN1"),
              pin13: net("OC1_N"),
              pin14: net("CRFILT"),
              pin15: logic,
              pin16: net("EN2"),
              pin17: net("OC2_N"),
              pin18: net("EN3"),
              pin19: net("OC3_N"),
              pin20: net("EN4"),
              pin21: net("OC4_N"),
              pin22: net("NON_REM1"),
              pin23: logic,
              pin24: net("CFG_SEL0"),
              pin25: net("CFG_SEL1"),
              pin26: net("RESET_N"),
              pin27: net("VBUS_DET"),
              pin28: net("NON_REM0"),
              pin29: logic,
              pin30: net("DM0"),
              pin31: net("DP0"),
              pin32: net("XTALOUT"),
              pin33: net("XTALIN"),
              pin34: net("PLLFILT"),
              pin35: net("RBIAS"),
              pin36: logic,
              pin37: ground,
            }}
          />
          <TAXM24M4RFBCCT2T
            name="Y1"
            {...placement(-8.1, 5.0, 2.2, 6.5, 90)}
            loadCapacitance="12pF"
            connections={{ pin1: net("XTALIN"), pin2: ground, pin3: net("XTALOUT"), pin4: ground }}
          />
          <C name="C2" value="18pF" x={-10.1} y={2.0} schX={1.0} schY={4.3} a={net("XTALIN")} />
          <C
            name="C3"
            value="18pF"
            x={-11.6}
            y={5.65}
            rotation={90}
            schX={4}
            schY={4.3}
            a={net("XTALOUT")}
          />
          <R name="R5" value="12k" x={-5.0} y={2.17} schX={1.0} schY={2.3} a={net("RBIAS")} b={ground} />
          {(["CFG_SEL0", "CFG_SEL1", "NON_REM0", "NON_REM1"] as const).map((signal, i) => (
            <R
              key={signal}
              name={`R${6 + i}`}
              value="100k"
              x={[-1.6, -4.0, -8.8, 1.0][i]}
              y={[15.1, 15.1, 10.9, 15.1][i]}
              rotation={90}
              schX={-5.8 + i * 2.6}
              schY={-3.0}
              a={net(signal)}
              b={ground}
            />
          ))}
          <R name="R10" value="10k" x={-8} y={16.1} schX={1.0} schY={0} a={logic} b={net("RESET_N")} />
          <C name="C4" value="1uF" x={-8} y={13.7} schX={4.0} schY={0} a={net("RESET_N")} />
          <capacitor
            name="C5"
            footprint="cap_w1_h0.5_p0.84_pw0.5_ph0.54_cyw1.6_cyh0.9"
            capacitance="100nF"
            {...placement(0, 1.9, -7.5, -5.8, 270)}
            manufacturerPartNumber="CL05B104KO5NNNC"
            supplierPartNumbers={{ jlcpcb: ["C1525"] }}
            connections={{ pin1: logic, pin2: ground }}
          />
          {[
            [8.4, 4.0, 0],
            [-6.2, 11.8, 180],
            [-6.6, 0.65, 0],
            [8.5, 8.5, 0],
            [3.75, 14.5, 90],
          ].map(([x, y, rotation], i) => (
            <C
              key={i}
              name={`C${6 + i}`}
              value="100nF"
              x={x}
              y={y}
              rotation={rotation}
              schX={-4.9 + i * 2.6}
              schY={-5.8}
              a={logic}
            />
          ))}
          <C name="C11" value="100nF" x={8.4} y={6.3} schX={4} schY={2.3} a={net("CRFILT")} />
          <C
            name="C12"
            value="100nF"
            x={-5.25}
            y={5.0}
            rotation={270}
            schX={5}
            schY={-3.0}
            a={net("PLLFILT")}
          />
        </Section>
        <Section name="power" displayName="Regulated 5 V input and hub supply">
          <KF128_5_08_2P_AA
            name="J6"
            {...placement(20, 17, 10.5, 6, 180)}
            pinAttributes={{
              pin1: { providesPower: true, providesVoltage: 5 },
              pin2: { requiresGround: true },
            }}
            connections={{ pin1: supply, pin2: ground }}
          />
          <AP2112K_3_3TRG1
            name="U2"
            {...placement(9.4, 16.0, 10.5, 2.3)}
            noConnect={["pin4"]}
            connections={{ pin1: supply, pin2: ground, pin3: supply, pin5: logic }}
          />
          <C name="C13" value="1uF" x={11.8} y={10.6} schX={7.8} schY={-1} a={supply} />
          <C name="C14" value="4.7uF" x={8.1} y={19.4} schX={10} schY={-1} a={logic} />
          <C name="C15" value="1uF" x={7.3} y={11.15} schX={12.2} schY={-1} a={logic} />
        </Section>
      </schematicsheet>
      <schematicsheet name="port_power_sheet" displayName="USB-C downstream ports" sheetSize="A4">
        {[1, 2, 3, 4].map((port) => (
          <DownstreamPort key={port} port={port} />
        ))}
      </schematicsheet>
      <silkscreentext text="HOST" pcbX={-27} pcbY={1.6} fontSize={1.15} />
      <silkscreentext text="GND" pcbX={17.46} pcbY={8.8} fontSize={1.2} />
      <silkscreentext text="+5V" pcbX={22.54} pcbY={8.8} fontSize={1.2} />
      <silkscreentext text="SWITCHED USB 2.0 HUB" pcbX={-5} pcbY={20.3} fontSize={1.2} />
    </board>
  )
}

export default SwitchableHubBoard
