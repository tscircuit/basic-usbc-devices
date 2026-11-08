import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["COM"],
  pin2: ["NO"],
  pin3: ["NC"]
} as const

const pinAttributes = {
  pin3: {doNotConnect: true}
} as const

export const JL010 = (props: SwitchProps) => {
  return (
    <switch type="spdt"
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin2" pinNumber={2} aliases={["NO"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.4} />
          <port name="pin1" pinNumber={1} aliases={["COM"]} direction="left" schX={-0.6} schY={0} schStemLength={0.4} />
          <schematicpath points={[{"x":-0.2,"y":0},{"x":0.24,"y":0.12}]} strokeColor="#880000" />
          <schematiccircle center={{ x: 0.2, y: -0.2 }} radius={0.06} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: -0.2, y: 0 }} radius={0.06} strokeWidth={0.02} color="#880000" />
          <port name="pin3" pinNumber={3} aliases={["NC"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.4} />
          <schematiccircle center={{ x: 0.2, y: 0.2 }} radius={0.06} strokeWidth={0.02} color="#880000" />
          <schematictext schX={-0.001} schY={0.6} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C2681582"
  ]
}}
      manufacturerPartNumber="JL010"
      footprint={<footprint>
        <platedhole  portHints={["pin1"]} pcbX="-5.100066mm" pcbY="0mm" holeWidth="0.999998mm" holeHeight="0.999998mm" outerWidth="1.7999964mm" outerHeight="1.7999964mm" rectPad={true} pcbRotation="0deg" shape="pill" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="0mm" outerDiameter="1.7999964mm" holeDiameter="0.999998mm" shape="circle" />
<platedhole  portHints={["pin3"]} pcbX="5.100066mm" pcbY="0mm" outerDiameter="1.7999964mm" holeDiameter="0.999998mm" shape="circle" />
<silkscreenpath route={[{"x":-6.400012599999968,"y":2.850007000000005},{"x":6.400012600000082,"y":2.850007000000005}]} />
<silkscreenpath route={[{"x":-6.400012599999968,"y":-2.850007000000005},{"x":6.400012600000082,"y":-2.850007000000005}]} />
<silkscreenpath route={[{"x":-6.400012599999968,"y":2.850007000000005},{"x":-6.400012599999968,"y":-2.850007000000005}]} />
<silkscreenpath route={[{"x":6.400012600000082,"y":2.850007000000005},{"x":6.400012600000082,"y":-2.850007000000005}]} />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="3.9718mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-6.639979600000061,"y":3.2099889999999505},{"x":8.439976000000115,"y":3.2099889999999505},{"x":8.439976000000115,"y":-3.2100143999999773},{"x":-6.639979600000061,"y":-3.2100143999999773},{"x":-6.639979600000061,"y":3.2099889999999505}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2681582.obj?uuid=1d5f964f58d84481b66ec290956a6372",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2681582.step?uuid=1d5f964f58d84481b66ec290956a6372",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.010623200000027033, y: 0.000012699999956566899, z: -0.5000069999999996 },
      }}
      {...props}
    />
  )
}