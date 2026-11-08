import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["_POS"],
  pin2: ["_NEG"]
} as const

export const GSD9605YB_5V2800 = (props: ChipProps) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":0.32,"y":-0.32},{"x":0,"y":-0.32},{"x":0,"y":0.12},{"x":0.32,"y":0.12},{"x":0.6,"y":0.4},{"x":0.6,"y":-0.6},{"x":0.32,"y":-0.32}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["_POS"]} direction="left" schX={-0.4} schY={0} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["_NEG"]} direction="left" schX={-0.4} schY={-0.2} schStemLength={0.4} />
          <schematicpath points={[{"x":0.16,"y":0},{"x":0.04,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.1,"y":0.06},{"x":0.1,"y":-0.06}]} strokeColor="#880000" />
          <schematictext schX={0.09} schY={0.6} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C530415"
  ]
}}
      manufacturerPartNumber="GSD9605YB-5V2800"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-4.899914mm" width="2.2999954mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="0mm" pcbY="4.899914mm" width="2.2999954mm" height="2.999994mm" shape="rect" />
<silkscreenpath route={[{"x":4.862982400000192,"y":4.826000000000022},{"x":1.2329922000000124,"y":4.826000000000022}]} />
<silkscreenpath route={[{"x":4.799914200000103,"y":-4.800066599999923},{"x":4.799914200000103,"y":4.799965000000157}]} />
<silkscreenpath route={[{"x":-2.286101599999938,"y":6.349949200000083},{"x":-2.286101599999938,"y":5.079949199999987}]} />
<silkscreenpath route={[{"x":-1.6511015999998335,"y":5.714949200000092},{"x":-2.9211015999998153,"y":5.714949200000092}]} />
<silkscreenpath route={[{"x":-1.231214199999954,"y":-4.8260508000000755},{"x":-2.9211015999998153,"y":-4.8260508000000755}]} />
<silkscreenpath route={[{"x":4.825898400000142,"y":-4.8260508000000755},{"x":1.2310110000000805,"y":-4.8260508000000755}]} />
<silkscreenpath route={[{"x":-4.826101599999788,"y":-2.7940507999999227},{"x":-2.9211015999998153,"y":-4.8260508000000755}]} />
<silkscreenpath route={[{"x":-4.826101599999788,"y":-2.7940507999999227},{"x":-4.800117399999863,"y":4.799965000000157}]} />
<silkscreenpath route={[{"x":-4.800117399999863,"y":4.799965000000157},{"x":-1.3971015999998144,"y":4.799965000000157}]} />
<silkscreentext text="{NAME}" pcbX="0.023114mm" pcbY="7.4008mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.3886687999998912,"y":4.622139600000082},{"x":-1.3886687999998912,"y":5.003139600000054},{"x":1.1513312000000724,"y":5.003139600000054},{"x":1.1513312000000724,"y":4.622139600000082},{"x":-1.3886687999998912,"y":4.622139600000082}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":0.1268984000000728,"y":3.5559491999999864},{"x":-0.2541016000000127,"y":3.5559491999999864},{"x":-0.2541016000000127,"y":6.095949200000064},{"x":0.1268984000000728,"y":6.095949200000064},{"x":0.1268984000000728,"y":3.5559491999999864}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-1.2629895999998553,"y":-5.189778799999999},{"x":-1.2629895999998553,"y":-4.808778800000027},{"x":1.277010400000222,"y":-4.808778800000027},{"x":1.277010400000222,"y":-5.189778799999999},{"x":-1.2629895999998553,"y":-5.189778799999999}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-4.825999999999908,"y":-2.7939999999999827},{"x":-4.825999999999908,"y":-4.826000000000022},{"x":-2.7939999999999827,"y":-4.826000000000022},{"x":-4.825999999999908,"y":-2.7939999999999827}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-5.050091999999836,"y":6.649911000000088},{"x":5.04988880000019,"y":6.649911000000088},{"x":5.04988880000019,"y":-6.649911000000088},{"x":-5.050091999999836,"y":-6.649911000000088},{"x":-5.050091999999836,"y":6.649911000000088}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C530415.obj?uuid=01837209aada41dc9731c0ff01df96cf",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C530415.step?uuid=01837209aada41dc9731c0ff01df96cf",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.00005080000005364127, y: -0.00010159999976622203, z: -0.2 },
      }}
      {...props}
    />
  )
}