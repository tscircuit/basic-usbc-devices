import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["EH1"],
  pin5: ["EH2"]
} as const

export const RK09K113004U = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-1} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={-0.2} schY={0.4} schStemLength={0.2} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.6} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.2,"y":0.1},{"x":-0.22,"y":0.18}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":0.2},{"x":-0.2,"y":0.2},{"x":-0.2,"y":0.1},{"x":-0.18,"y":0.18}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.1,"y":0},{"x":0.4,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.5,"y":0},{"x":-0.8,"y":0}]} strokeColor="#880000" />
          <schematicrect schX={-0.2} schY={0} width={0.6} height={0.2} strokeWidth={0.02} color="#880000" />
          <port name="pin4" pinNumber={4} aliases={["EH1"]} direction="left" schX={-1} schY={-0.2} schStemLength={0.2} />
          <port name="pin5" pinNumber={5} aliases={["EH2"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.8,"y":-0.2},{"x":0.4,"y":-0.2}]} strokeColor="#880000" />
          <schematictext schX={-0.2} schY={0.64} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C202382"
  ]
}}
      manufacturerPartNumber="RK09K113004U"
      footprint={<footprint>
        <platedhole  portHints={["pin1"]} pcbX="-2.499868mm" pcbY="-3.09999385mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="-3.09999385mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin3"]} pcbX="2.500122mm" pcbY="-3.09999385mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin4"]} pcbX="4.99999mm" pcbY="3.89999215mm" holeWidth="1.999996mm" holeHeight="2.3000208mm" outerWidth="2.999994mm" outerHeight="3.2999934mm" shape="pill" />
<platedhole  portHints={["pin5"]} pcbX="-4.99999mm" pcbY="3.89999215mm" holeWidth="1.999996mm" holeHeight="2.3000208mm" outerWidth="2.999994mm" outerHeight="3.2999934mm" shape="pill" />
<silkscreenpath route={[{"x":-4.8999902000000475,"y":9.400158950000105},{"x":4.899990199999934,"y":9.400133550000078}]} />
<silkscreenpath route={[{"x":4.899990199999934,"y":9.400133550000078},{"x":4.899990199999934,"y":5.778372950000062}]} />
<silkscreenpath route={[{"x":4.899990199999934,"y":2.0218907500002388},{"x":4.899990199999934,"y":-2.5998678499997823}]} />
<silkscreenpath route={[{"x":-4.8999902000000475,"y":9.400133550000078},{"x":-4.8999902000000475,"y":5.778372950000062}]} />
<silkscreenpath route={[{"x":-4.8999902000000475,"y":2.0218907500002388},{"x":-4.8999902000000475,"y":-2.5998678499997823}]} />
<silkscreenpath route={[{"x":-4.8999902000000475,"y":-2.5998678499997823},{"x":-3.498240399999986,"y":-2.5998678499997823}]} />
<silkscreenpath route={[{"x":-1.5817596000001686,"y":-2.5998678499997823},{"x":-0.9582404000000224,"y":-2.5998678499997823}]} />
<silkscreenpath route={[{"x":0.9582403999999087,"y":-2.5998678499997823},{"x":1.5817596000000549,"y":-2.5998678499997823}]} />
<silkscreenpath route={[{"x":4.899990199999934,"y":-2.5998678499997823},{"x":3.498240399999986,"y":-2.5998678499997823}]} />
<silkscreenpath route={[{"x":-0.2540000000001328,"y":6.877126150000095},{"x":-0.2540000000001328,"y":5.353126150000094},{"x":0.2540000000000191,"y":5.353126150000094},{"x":0.2540000000000191,"y":6.877126150000095}]} />
<silkscreencircle pcbX="0mm" pcbY="3.89999215mm" radius="2.999994mm" />
<silkscreencircle pcbX="-3.302mm" pcbY="7.89312615mm" radius="0.718312mm" />
<silkscreencircle pcbX="3.302mm" pcbY="7.89312615mm" radius="0.718312mm" />
<silkscreencircle pcbX="-3.302mm" pcbY="-0.99687385mm" radius="0.718312mm" />
<silkscreencircle pcbX="3.302mm" pcbY="-0.99687385mm" radius="0.718312mm" />
<silkscreencircle pcbX="-4.2899838mm" pcbY="-3.31000105mm" radius="0.2641854mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="10.39274215mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-6.749987000000033,"y":9.050109350000184},{"x":6.749986999999919,"y":9.050109350000184},{"x":6.749986999999919,"y":-4.199992149999957},{"x":-6.749987000000033,"y":-4.199992149999957},{"x":-6.749987000000033,"y":9.050109350000184}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C202382.obj?uuid=0f200d0c8be74b5a8484cb8b3a00a62d",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C202382.step?uuid=0f200d0c8be74b5a8484cb8b3a00a62d",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999842880061, y: -2.788486850000154, z: 12.499991999999999 },
      }}
      {...props}
    />
  )
}