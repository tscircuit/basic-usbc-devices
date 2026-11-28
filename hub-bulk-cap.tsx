import type { CapacitorProps } from "@tscircuit/props"

export function HubBulkCap({
  name,
  net,
  ...placement
}: {
  name: string
  net: string
  cadModel?: CapacitorProps["cadModel"]
  pcbX: number
  pcbY: number
  pcbRotation?: number
  schX: number
  schY: number
}) {
  // FOSAN FVH datasheet p46: 3.5 x 1.6 mm lands, 1.9 mm gap.
  // 220 uF / 10 V, 6.3 x 5.4 mm; positive terminal remains on the right.
  return (
    <capacitor
      name={name}
      capacitance="220uF"
      polarized
      maxVoltageRating="10V"
      {...placement}
      manufacturerPartNumber="FVH010ADA221M0654"
      supplierPartNumbers={{ jlcpcb: ["C7469982"] }}
      connections={{ pin1: `net.${net}`, pin2: "net.GND" }}
      footprint={
        <footprint>
          <smtpad portHints={["pin1"]} pcbX={2.7} pcbY={0} width={3.5} height={1.6} shape="rect" />
          <smtpad portHints={["pin2"]} pcbX={-2.7} pcbY={0} width={3.5} height={1.6} shape="rect" />
          <silkscreencircle pcbX={0} pcbY={0} radius={3.3} />
          <silkscreentext text="+" pcbX={3.8} pcbY={1.6} fontSize={1} />
          <courtyardoutline
            outline={[
              { x: -4.8, y: -3.6 },
              { x: 4.8, y: -3.6 },
              { x: 4.8, y: 3.6 },
              { x: -4.8, y: 3.6 },
              { x: -4.8, y: -3.6 },
            ]}
          />
        </footprint>
      }
    />
  )
}
