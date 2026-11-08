import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["GND"],
  pin2: ["DIN"],
  pin3: ["VDD"],
  pin4: ["DOUT"],
} as const

export const SK6812_B = (props: ChipProps<typeof pinLabels>) => (
  <chip
    pinLabels={pinLabels}
    pinAttributes={{ pin1: { requiresGround: true }, pin3: { requiresPower: true } }}
    supplierPartNumbers={{ jlcpcb: ["C5380881"] }}
    manufacturerPartNumber="SK6812-B"
    footprint={
      <footprint>
        {/* OPSCO SK6812-B-012 Rev B/0, top view and recommended lands. */}
        <smtpad portHints={["pin1"]} pcbX={2.55} pcbY={-1.6} width={1.8} height={1.2} shape="rect" />
        <smtpad portHints={["pin2"]} pcbX={2.55} pcbY={1.6} width={1.8} height={1.2} shape="rect" />
        <smtpad portHints={["pin3"]} pcbX={-2.55} pcbY={1.6} width={1.8} height={1.2} shape="rect" />
        <smtpad portHints={["pin4"]} pcbX={-2.55} pcbY={-1.6} width={1.8} height={1.2} shape="rect" />
        <silkscreenpath route={[{x:-2.7,y:2.65},{x:2.7,y:2.65}]} />
        <silkscreenpath route={[{x:-2.7,y:-2.65},{x:2.2,y:-2.65},{x:2.7,y:-2.45}]} />
        <silkscreencircle pcbX={3.25} pcbY={-2.65} radius={0.2} />
      </footprint>
    }
    {...props}
  />
)
