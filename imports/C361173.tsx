import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"]
} as const

export const RK09D1130C2P = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={0} schY={0.4} schStemLength={0.2} />
          <schematiccircle center={{ x: 0.22, y: 0.06 }} radius={0.02} strokeWidth={0.02} color="#A00000" />
          <schematicpath points={[{"x":-0.04,"y":0.2},{"x":0,"y":0.12},{"x":0.04,"y":0.2},{"x":-0.04,"y":0.2}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":0,"y":0.2},{"x":0,"y":0.12}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.18,"y":-0.08},{"x":0.2,"y":0}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.12,"y":0.08},{"x":0.18,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.08,"y":-0.08},{"x":0.12,"y":0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.02,"y":0.08},{"x":0.08,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.02,"y":-0.08},{"x":0.02,"y":0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.06,"y":0.08},{"x":-0.02,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.12,"y":-0.08},{"x":-0.06,"y":0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.16,"y":0.08},{"x":-0.12,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.2,"y":0},{"x":-0.16,"y":0.08}]} strokeColor="#8D2323" />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={0.4} schY={-0.2} schStemLength={0.2} />
          <port name="pin5" pinNumber={5} aliases={["5"]} direction="left" schX={-0.4} schY={-0.2} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.2,"y":-0.2},{"x":0.2,"y":-0.2}]} strokeColor="#880000" />
          <schematictext schX={0} schY={0.62} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C361173"
  ]
}}
      manufacturerPartNumber="RK09D1130C2P"
      footprint={<footprint>
        <platedhole  portHints={["pin1"]} pcbX="-2.499868mm" pcbY="-3.09999385mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="-3.09999385mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin3"]} pcbX="2.500122mm" pcbY="-3.09999385mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin4"]} pcbX="4.400042mm" pcbY="3.89999215mm" holeWidth="1.9000216mm" holeHeight="2.200021mm" outerWidth="2.499995mm" outerHeight="2.999994mm" pcbRotation="180deg" shape="pill" />
<platedhole  portHints={["pin5"]} pcbX="-4.400042mm" pcbY="3.89999215mm" holeWidth="1.9000216mm" holeHeight="2.1999956mm" outerWidth="2.499995mm" outerHeight="2.999994mm" pcbRotation="180deg" shape="pill" />
<silkscreenpath route={[{"x":-2.5400000000000773,"y":5.336997150000002},{"x":-2.5400000000000773,"y":5.282006149999916},{"x":-2.032000000000039,"y":4.774006149999991},{"x":1.9770089999999527,"y":4.774006149999991},{"x":2.5399999999999636,"y":5.336997150000002}]} />
<silkscreenpath route={[{"x":2.5399999999999636,"y":5.336997150000002},{"x":-2.5400000000000773,"y":5.336997150000002}]} />
<silkscreenpath route={[{"x":3.51160080000011,"y":-2.7189938500000608},{"x":4.899990199999934,"y":-2.7189938500000608}]} />
<silkscreenpath route={[{"x":1.0116057999998702,"y":-2.7189938500000608},{"x":1.4883892000000287,"y":-2.7189938500000608}]} />
<silkscreenpath route={[{"x":-1.4883892000000287,"y":-2.7189938500000608},{"x":-1.0116058000000976,"y":-2.7189938500000608}]} />
<silkscreenpath route={[{"x":-4.900015599999961,"y":-2.7189938500000608},{"x":-3.5116007999999965,"y":-2.7189938500000608}]} />
<silkscreenpath route={[{"x":4.899990199999934,"y":2.2559771499999215},{"x":4.899990199999934,"y":-2.7189938500000608}]} />
<silkscreenpath route={[{"x":4.899990199999934,"y":9.400006549999944},{"x":4.899990199999934,"y":5.544057950000024}]} />
<silkscreenpath route={[{"x":-4.900015599999961,"y":2.2559771499999215},{"x":-4.900015599999961,"y":-2.7189938500000608}]} />
<silkscreenpath route={[{"x":-4.900015599999961,"y":9.400006549999944},{"x":-4.900015599999961,"y":5.544057950000024}]} />
<silkscreenpath route={[{"x":4.899990199999934,"y":9.400006549999944},{"x":-4.900015599999961,"y":9.400006549999944}]} />
<silkscreenpath route={[{"x":-2.032000000000039,"y":4.774006149999991},{"x":-2.09793215757918,"y":4.532291301888677},{"x":-2.1348203364293568,"y":4.284476089559689},{"x":-2.1421469599608827,"y":4.034037598532109},{"x":-2.119809228606414,"y":3.7844897214453113},{"x":-2.068120562197919,"y":3.5393338547697795},{"x":-1.9878062023852863,"y":3.3020097708498497},{"x":-1.879993036799533,"y":3.075847354593634},{"x":-1.7461937877354785,"y":2.864019881987929},{"x":-1.5882857872064733,"y":2.6694994959883616},{"x":-1.408484636170897,"y":2.4950155044967914},{"x":-1.209313117522811,"y":2.3430160855508575},{"x":-0.9935657990239406,"y":2.2156339370324076},{"x":-0.7642698228338531,"y":2.1146563528685647},{"x":-0.524642431795769,"y":2.0415001455800166},{"x":-0.27804582842986747,"y":1.997191767040249},{"x":-0.02793999999994412,"y":1.9823529063697833},{"x":0.22216582842975185,"y":1.997191767040249},{"x":0.4687624317959944,"y":2.0415001455800166},{"x":0.7083898228339649,"y":2.1146563528685647},{"x":0.937685799024166,"y":2.2156339370324076},{"x":1.153433117522809,"y":2.3430160855508575},{"x":1.3526046361710087,"y":2.4950155044967914},{"x":1.5324057872066987,"y":2.6694994959883616},{"x":1.6903137877355903,"y":2.864019881987929},{"x":1.824113036799531,"y":3.075847354593634},{"x":1.931926202385398,"y":3.3020097708498497},{"x":2.012240562197917,"y":3.5393338547697795},{"x":2.063929228606412,"y":3.784489721445425},{"x":2.0862669599609944,"y":4.034037598532109},{"x":2.078940336429355,"y":4.284476089559689},{"x":2.042052157579292,"y":4.532291301888677},{"x":1.9761200000000372,"y":4.774006149999991}]} />
<silkscreencircle pcbX="0mm" pcbY="3.89999215mm" radius="2.999994mm" />
<silkscreencircle pcbX="-3.81mm" pcbY="8.33000615mm" radius="0.635mm" />
<silkscreencircle pcbX="3.81mm" pcbY="8.33000615mm" radius="0.635mm" />
<silkscreencircle pcbX="3.81mm" pcbY="-1.57599385mm" radius="0.635mm" />
<silkscreencircle pcbX="-3.81mm" pcbY="-1.57599385mm" radius="0.635mm" />
<silkscreentext text="{NAME}" pcbX="-0.0254mm" pcbY="10.52380615mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.900039499999934,"y":9.00802155000008},{"x":5.900039499999821,"y":9.00802155000008},{"x":5.900039499999821,"y":-4.199992150000071},{"x":-5.900039499999934,"y":-4.199992150000071},{"x":-5.900039499999934,"y":9.00802155000008}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C361173.obj?uuid=a47842ffcc044b3aa025737855d068bb",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C361173.step?uuid=a47842ffcc044b3aa025737855d068bb",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012700000070253736, y: -2.74320255000005, z: 14.999991999999999 },
      }}
      {...props}
    />
  )
}