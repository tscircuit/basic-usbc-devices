// Hand-routed USB 2.0 data passthrough between J3 (input, right) and J2
// (output, left). The pair runs straight across the top layer over the bottom
// GND pour as 0.2mm traces at 0.5mm pitch. J3's inner D-/D+ pads (DM1/DP1)
// line up with J2's outer ones (DM2/DP2), so the pair never crosses; each
// jack's remaining D+/D- pad is tied in through two vias and a short
// bottom-layer jumper.

const DN_Y = -9.75
const DP_Y = -10.25
const JOG_START_X = -10.4
const JOG_END_X = -10.9
const PAIR_WIDTH = "0.2mm"

const VIAS = {
  // J3 side
  VDP1: { x: 10.8, y: -9.25 }, // from J3 DP2
  VDP2: { x: 10.8, y: DP_Y },
  VDN1: { x: 11.6, y: -10.75 }, // from J3 DM2
  VDN2: { x: 11.6, y: DN_Y },
  // J2 side
  VDP3: { x: -11.9, y: -9.75 }, // from J2 DP1
  VDP4: { x: -11.9, y: -10.75 },
  VDN3: { x: -11.2, y: -10.25 }, // from J2 DM1
  VDN4: { x: -11.2, y: -9.25 },
}

// pcbPath points are offsets from the anchor (an unrotated via)
const offsetFrom = (anchor: { x: number; y: number }, x: number, y: number) => ({
  x: x - anchor.x,
  y: y - anchor.y,
})

const Segment = ({ from, to }: { from: string; to: string }) => (
  <trace from={from} to={to} pcbPath={[]} thickness={PAIR_WIDTH} />
)

export const PassthroughData = () => (
  <>
    {Object.entries(VIAS).map(([name, { x, y }]) => (
      <via
        key={name}
        name={name}
        pcbX={x}
        pcbY={y}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.3mm"
        outerDiameter="0.5mm"
      />
    ))}

    {/* D- */}
    <Segment from=".J3 > .DM1" to=".VDN2 > .top" />
    <trace
      from=".VDN2 > .top"
      to=".VDN4 > .top"
      thickness={PAIR_WIDTH}
      pcbPath={[
        offsetFrom(VIAS.VDN2, JOG_START_X, DN_Y),
        offsetFrom(VIAS.VDN2, JOG_END_X, VIAS.VDN4.y),
      ]}
    />
    <Segment from=".VDN4 > .top" to=".J2 > .DM2" />
    <Segment from=".J3 > .DM2" to=".VDN1 > .top" />
    <Segment from=".VDN1 > .bottom" to=".VDN2 > .bottom" />
    <Segment from=".J2 > .DM1" to=".VDN3 > .top" />
    <Segment from=".VDN3 > .bottom" to=".VDN4 > .bottom" />

    {/* D+ */}
    <Segment from=".J3 > .DP1" to=".VDP2 > .top" />
    <trace
      from=".VDP2 > .top"
      to=".VDP4 > .top"
      thickness={PAIR_WIDTH}
      pcbPath={[
        offsetFrom(VIAS.VDP2, JOG_START_X, DP_Y),
        offsetFrom(VIAS.VDP2, JOG_END_X, VIAS.VDP4.y),
      ]}
    />
    <Segment from=".VDP4 > .top" to=".J2 > .DP2" />
    <Segment from=".J3 > .DP2" to=".VDP1 > .top" />
    <Segment from=".VDP1 > .bottom" to=".VDP2 > .bottom" />
    <Segment from=".J2 > .DP1" to=".VDP3 > .top" />
    <Segment from=".VDP3 > .bottom" to=".VDP4 > .bottom" />
  </>
)
