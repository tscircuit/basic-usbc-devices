import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const TS_1140SP_4x4x7_0H_A = (props: SwitchProps & { internallyConnectedPins?: string[][] }) => {
  return (
    <switch type="spst"
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematiccircle center={{ x: 0, y: -0.06 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: 0, y: 0.06 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.4} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-0.6} schY={-0.2} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.4} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.6} schY={0.2} schStemLength={0.4} />
          <schematicpath points={[{"x":-0.1,"y":-0.08},{"x":-0.02,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.12},{"x":0,"y":-0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.2},{"x":0,"y":0.06}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.2},{"x":0,"y":-0.12}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":-0.2},{"x":0.2,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":0.2},{"x":0.2,"y":0.2}]} strokeColor="#880000" />
          <schematictext schX={-0.001} schY={0.61} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C53433411"
  ]
}}
      manufacturerPartNumber="TS-1140SP-4x4x7.0H-A"
      footprint={<footprint>
        <smtpad portHints={["pin4"]} pcbX="3.099943mm" pcbY="-1.850009mm" width="1.7999964mm" height="1.0999978mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-3.099943mm" pcbY="-1.850009mm" width="1.7999964mm" height="1.0999978mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-3.099943mm" pcbY="1.850009mm" width="1.7999964mm" height="1.0999978mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="3.099943mm" pcbY="1.850009mm" width="1.7999964mm" height="1.0999978mm" shape="rect" />
<silkscreenpath route={[{"x":2.086660800000004,"y":2.5001220000001467},{"x":-2.086660800000004,"y":2.5001220000001467}]} />
<silkscreenpath route={[{"x":-2.0867878000000246,"y":-2.499944199999959},{"x":2.086660800000004,"y":-2.499944199999959}]} />
<silkscreenpath route={[{"x":-2.499969599999986,"y":1.068832000000043},{"x":-2.499969599999986,"y":-1.0689081999998962}]} />
<silkscreenpath route={[{"x":2.4999696000000995,"y":-1.0689081999998962},{"x":2.4999696000000995,"y":1.068832000000043}]} />
<silkscreenpath route={[{"x":-1.949983399999951,"y":-0.6500113999999257},{"x":-0.6500368000000663,"y":-1.9500342000000046},{"x":0.6500368000000663,"y":-1.9500342000000046},{"x":1.9500596000000314,"y":-0.6500113999999257},{"x":1.9500596000000314,"y":0.6499352000001863},{"x":0.6500368000000663,"y":1.9500088000000915},{"x":-0.6500368000000663,"y":1.9500088000000915},{"x":-1.949983399999951,"y":0.6499352000001863},{"x":-1.949983399999951,"y":-0.6500113999999257}]} />
<silkscreencircle pcbX="-0.000127mm" pcbY="0.000127mm" radius="1.299972mm" />
<silkscreentext text="{NAME}" pcbX="0.003175mm" pcbY="4.720211mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-4.249941199999967,"y":2.799906000000078},{"x":4.249941199999967,"y":2.799906000000078},{"x":4.249941199999967,"y":-2.800083799999925},{"x":-4.249941199999967,"y":-2.800083799999925},{"x":-4.249941199999967,"y":2.799906000000078}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C53433411.obj?uuid=3ec8d8f6525046d0a8a4a71f743f9e5f",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C53433411.step?uuid=3ec8d8f6525046d0a8a4a71f743f9e5f",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.0000762000000804619, y: 0.00008889999992334197, z: -0.7 },
      }}
      {...props}
    />
  )
}