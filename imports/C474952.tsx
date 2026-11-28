import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const KF128_5_08_2P_AA = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C474952"
  ]
}}
      manufacturerPartNumber="KF128-5.08-2P-AA"
      footprint={<footprint insertionDirection="from_y_neg">
        <platedhole  portHints={["pin1"]} pcbX="-2.54mm" pcbY="0mm" outerDiameter="2.3999952mm" holeDiameter="1.5999968mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="2.54mm" pcbY="0mm" outerDiameter="2.3999952mm" holeDiameter="1.5999968mm" shape="circle" />
<silkscreenpath route={[{"x":5.079999999999927,"y":-3.893820000000005},{"x":5.679440000000113,"y":-3.6118799999999283}]} />
<silkscreenpath route={[{"x":5.079999999999927,"y":-4.33578},{"x":5.679440000000113,"y":-4.612639999999828}]} />
<silkscreenpath route={[{"x":5.679440000000113,"y":2.588260000000105},{"x":5.079999999999927,"y":2.870200000000068}]} />
<silkscreenpath route={[{"x":5.679440000000113,"y":3.5864799999999377},{"x":5.079999999999927,"y":3.3070800000000418}]} />
<silkscreenpath route={[{"x":5.679998800000021,"y":-3.61238800000001},{"x":5.679998800000021,"y":-4.612386000000015}]} />
<silkscreenpath route={[{"x":5.679998800000021,"y":3.5876230000001215},{"x":5.679998800000021,"y":2.5876250000000027}]} />
<silkscreenpath route={[{"x":5.079999999999927,"y":5.399989199999936},{"x":5.079999999999927,"y":-5.2999893999999586}]} />
<silkscreenpath route={[{"x":-5.079974600000014,"y":5.399989199999936},{"x":5.079999999999927,"y":5.399989199999936}]} />
<silkscreenpath route={[{"x":-5.079974600000014,"y":-5.2999893999999586},{"x":-5.079974600000014,"y":5.399989199999936}]} />
<silkscreenpath route={[{"x":5.079999999999927,"y":-5.2999893999999586},{"x":-5.079974600000014,"y":-5.2999893999999586}]} />
<silkscreentext text="{NAME}" pcbX="0.2921mm" pcbY="6.4102mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":2.040000999999961,"y":-2.999994000000015},{"x":3.0399989999998525,"y":-2.999994000000015},{"x":3.0399989999998525,"y":-4.999989999999912},{"x":2.040000999999961,"y":-4.999989999999912},{"x":2.040000999999961,"y":-2.999994000000015}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":2.5399999999999636,"y":-1.9999959999998964},{"x":1.5400020000000723,"y":-2.999994000000015},{"x":3.539997999999855,"y":-2.999994000000015},{"x":2.5399999999999636,"y":-1.9999959999998964}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-2.5400000000000773,"y":-1.9999959999998964},{"x":-3.5399979999999687,"y":-2.999994000000015},{"x":-1.540002000000186,"y":-2.999994000000015},{"x":-2.5400000000000773,"y":-1.9999959999998964}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":-3.039998999999966,"y":-2.999994000000015},{"x":-2.040001000000075,"y":-2.999994000000015},{"x":-2.040001000000075,"y":-4.999989999999912},{"x":-3.039998999999966,"y":-4.999989999999912},{"x":-3.039998999999966,"y":-2.999994000000015}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-5.329974600000014,"y":5.6349778000000015},{"x":5.929998800000021,"y":5.6349778000000015},{"x":5.929998800000021,"y":-5.565000800000007},{"x":-5.329974600000014,"y":-5.565000800000007},{"x":-5.329974600000014,"y":5.6349778000000015}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C474952.obj?uuid=be36e72b75ac4dee8d6e181eb7e8d784",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C474952.step?uuid=be36e72b75ac4dee8d6e181eb7e8d784",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.0000621000000036176, y: -0.01501149999994622, z: -0.000006999999999646178 },
      }}
      {...props}
    />
  )
}