import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["_POS"],
  pin2: ["_NEG"]
} as const

export const PKLCS1212E4001_R1 = (props: ChipProps) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={{pin1:{isPassive:true},pin2:{isPassive:true,requiresGround:true}}}
      symbol={
        <symbol>
          <port name="pin2" pinNumber={2} aliases={["_NEG"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <port name="pin1" pinNumber={1} aliases={["_POS"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <schematicrect schX={0} schY={0} width={0.4} height={0.4} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":-0.06,"y":-0.2},{"x":-0.06,"y":-0.16},{"x":0.06,"y":-0.16},{"x":0.06,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.1,"y":0.02},{"x":0.1,"y":-0.02},{"x":0.18,"y":0},{"x":0.1,"y":0.02}]} strokeColor="#880000" />
          <schematictext schX={0} schY={0.408} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C113159"
  ]
}}
      manufacturerPartNumber="PKLCS1212E4001-R1"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="5.499989mm" pcbY="0mm" width="1.499997mm" height="4.499991mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-5.499989mm" pcbY="0mm" width="1.499997mm" height="4.499991mm" shape="rect" />
<silkscreenpath route={[{"x":0.000025399999913133797,"y":6.096000000000004},{"x":-6.0959746000000905,"y":6.096000000000004},{"x":-6.0959746000000905,"y":2.5400000000000773}]} />
<silkscreenpath route={[{"x":-6.0959746000000905,"y":-2.5400000000000773},{"x":-6.0959746000000905,"y":-6.096000000000004},{"x":6.096025399999917,"y":-6.096000000000004},{"x":6.096025399999917,"y":-2.5400000000000773}]} />
<silkscreenpath route={[{"x":6.095085600000061,"y":2.5400000000000773},{"x":6.095085600000061,"y":6.096000000000004},{"x":-0.0009143999999423613,"y":6.096000000000004}]} />
<silkscreenpath route={[{"x":-2.539974599999937,"y":-6.096000000000004},{"x":-2.539974599999937,"y":-4.572000000000003},{"x":2.5400253999999904,"y":-4.572000000000003},{"x":2.5400253999999904,"y":-6.096000000000004}]} />
<silkscreentext text="{NAME}" pcbX="-0.011811mm" pcbY="7.096mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":1.5240000000001146,"y":-1.2699999999999818},{"x":3.639743800000133,"y":-0.008940800000004856},{"x":1.5315438000001222,"y":1.2610592000000906},{"x":1.5240000000001146,"y":-1.2699999999999818}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-2.561412199999836,"y":-4.597958799999901},{"x":2.5500838000000385,"y":-4.622774599999957},{"x":2.5768300000000863,"y":-5.9997339999999895},{"x":-2.553614400000015,"y":-6.006414199999995},{"x":-2.561412199999836,"y":-4.597958799999901}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-6.499987499999861,"y":6.249987999999917},{"x":6.499987499999975,"y":6.249987999999917},{"x":6.499987499999975,"y":-6.249987999999917},{"x":-6.499987499999861,"y":-6.249987999999917},{"x":-6.499987499999861,"y":6.249987999999917}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C113159.obj?uuid=f7607a9699d849ec8f54e5e83abf494f",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C113159.step?uuid=f7607a9699d849ec8f54e5e83abf494f",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}