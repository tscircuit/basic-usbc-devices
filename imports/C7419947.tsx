import type { MosfetProps } from "@tscircuit/props"

export const SI1304BDL = (props: Omit<MosfetProps, "channelType" | "mosfetMode">) => {
  return (
    <mosfet channelType="n" mosfetMode="enhancement"
      supplierPartNumbers={{
  "jlcpcb": [
    "C7419947"
  ]
}}
      manufacturerPartNumber="SI1304BDL"
      footprint={<footprint>
        <smtpad portHints={["gate","pin1"]} pcbX="-0.649986mm" pcbY="-0.839978mm" width="0.499999mm" height="0.7800086mm" shape="rect" />
<smtpad portHints={["source","pin2"]} pcbX="0.649986mm" pcbY="-0.839978mm" width="0.499999mm" height="0.7800086mm" shape="rect" />
<smtpad portHints={["drain","pin3"]} pcbX="0mm" pcbY="0.839978mm" width="0.499999mm" height="0.7800086mm" shape="rect" />
<silkscreenpath route={[{"x":0.999998000000005,"y":0.6499859999999984},{"x":0.999998000000005,"y":-0.29999940000000436}]} />
<silkscreenpath route={[{"x":-0.4301489999999859,"y":0.6499859999999984},{"x":-0.999998000000005,"y":0.6499859999999984},{"x":-0.999998000000005,"y":-0.29999940000000436}]} />
<silkscreenpath route={[{"x":0.999998000000005,"y":0.6499859999999984},{"x":0.4301490000000001,"y":0.6499859999999984}]} />
<silkscreenpath route={[{"x":0.2198370000000125,"y":-0.650011400000011},{"x":-0.21983699999998407,"y":-0.650011400000011}]} />
<silkscreencircle pcbX="-1.149858mm" pcbY="-0.850138mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="-0.0635mm" pcbY="2.2192mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.325004199999995,"y":1.4799823000000032},{"x":1.325004199999995,"y":1.4799823000000032},{"x":1.325004199999995,"y":-1.4799823000000174},{"x":-1.325004199999995,"y":-1.4799823000000174},{"x":-1.325004199999995,"y":1.4799823000000032}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7419947.obj?uuid=9a1ebdf1b2064fd1ba1b59ffd197ed37",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7419947.step?uuid=9a1ebdf1b2064fd1ba1b59ffd197ed37",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.65 },
      }}
      {...props}
    />
  )
}