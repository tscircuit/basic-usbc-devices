import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const FVH010ADA221M0654 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":-0.04,"y":0.14},{"x":-0.04,"y":-0.14}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.2,"y":0},{"x":-0.04,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.04,"y":0},{"x":0.2,"y":0}]} strokeColor="#880000" />
          <schematicpath svgPath="M 0.0888 -0.138 A 0.2 0.2 0 0 0 0.0906 0.1406" strokeColor="#880000" />
          <schematicpath points={[{"x":-0.18,"y":0.1},{"x":-0.1,"y":0.1}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.14,"y":0.14},{"x":-0.14,"y":0.06}]} strokeColor="#880000" />
          <schematictext schX={0} schY={0.34} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C7469982"
  ]
}}
      manufacturerPartNumber="FVH010ADA221M0654"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.670048mm" pcbY="0mm" width="3.499993mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="2.670048mm" pcbY="0mm" width="3.499993mm" height="1.1999976mm" shape="rect" />
<silkscreenpath route={[{"x":3.3019999999999072,"y":0.8310880000000225},{"x":3.3019999999999072,"y":1.1429491999999755}]} />
<silkscreenpath route={[{"x":-3.3020000000001346,"y":-0.8311896000001298},{"x":-3.3020000000001346,"y":-2.032050799999979},{"x":-2.032000000000153,"y":-3.302050799999961},{"x":3.3019999999999072,"y":-3.302050799999961},{"x":3.3019999999999072,"y":-0.8311896000001298}]} />
<silkscreenpath route={[{"x":3.3019999999999072,"y":0.8310880000000225},{"x":3.3019999999999072,"y":3.301949200000081},{"x":-1.9049999999999727,"y":3.301949200000081},{"x":-2.032000000000153,"y":3.301949200000081},{"x":-3.3020000000001346,"y":2.0319491999999855},{"x":-3.3020000000001346,"y":0.8310880000000225}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="4.294888mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":3.102000399999838,"y":0.09895840000001499},{"x":3.102000399999838,"y":-0.09906000000000859},{"x":2.310002999999938,"y":-0.09906000000000859},{"x":2.310002999999938,"y":0.09895840000001499},{"x":3.102000399999838,"y":0.09895840000001499}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-3.1020003999999517,"y":0.09895840000001499},{"x":-3.1020003999999517,"y":-0.09906000000000859},{"x":-2.3100030000000515,"y":-0.09906000000000859},{"x":-2.3100030000000515,"y":0.09895840000001499},{"x":-3.1020003999999517,"y":0.09895840000001499}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-2.8049982,"y":0.6599427999999534},{"x":-2.8049982,"y":-0.6600444000000607},{"x":-2.6070052000000032,"y":-0.6600444000000607},{"x":-2.6070052000000032,"y":0.6599427999999534},{"x":-2.8049982,"y":0.6599427999999534}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-4.670044500000131,"y":3.5000316000000566},{"x":4.670044500000017,"y":3.5000316000000566},{"x":4.670044500000017,"y":-3.49995540000009},{"x":-4.670044500000131,"y":-3.49995540000009},{"x":-4.670044500000131,"y":3.5000316000000566}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7469982.obj?uuid=598b475098c54ca7bbe8879f37d2b014",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7469982.step?uuid=598b475098c54ca7bbe8879f37d2b014",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000025400000026820635, y: -0.000038099999983387534, z: -1 },
      }}
      {...props}
    />
  )
}