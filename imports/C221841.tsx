import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

const pinAttributes = {
  pin1: {isPassive: true},
  pin2: {isPassive: true},
  pin3: {isPassive: true}
} satisfies NonNullable<SwitchProps["pinAttributes"]>

export const PCM12SMTR = (props: SwitchProps) => {
  return (
    <switch type="spdt"
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C221841"
  ]
}}
      manufacturerPartNumber="PCM12SMTR"
      footprint={<footprint>
        <hole pcbX="-1.49987mm" pcbY="-0.57492265mm" diameter="0.999998mm" />
<hole pcbX="1.500124mm" pcbY="-0.57492265mm" diameter="0.999998mm" />
<smtpad portHints={["pin1"]} pcbX="-2.249932mm" pcbY="1.22492135mm" width="0.6999986mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.750062mm" pcbY="1.22492135mm" width="0.6999986mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="2.249932mm" pcbY="1.22492135mm" width="0.6999986mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="3.64998mm" pcbY="0.42507535mm" width="0.999998mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="3.64998mm" pcbY="-1.57492065mm" width="0.999998mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.64998mm" pcbY="-1.57492065mm" width="0.999998mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.64998mm" pcbY="0.42507535mm" width="0.999998mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":0.009093200000052093,"y":-1.8749200500000143},{"x":0.009093200000052093,"y":-3.3849246499999026},{"x":1.3101319999999532,"y":-3.3849246499999026},{"x":1.3101319999999532,"y":-1.8749200500000143}]} />
<silkscreenpath route={[{"x":3.359937399999808,"y":-0.9248330499999611},{"x":3.359937399999808,"y":-0.23484204999999747}]} />
<silkscreenpath route={[{"x":-3.3598612000000685,"y":-0.2249360499999966},{"x":-3.3598612000000685,"y":-0.9149270499999602}]} />
<silkscreenpath route={[{"x":-2.729865000000018,"y":-1.8749200500000143},{"x":2.7401265999999396,"y":-1.8749200500000143}]} />
<silkscreenpath route={[{"x":-1.4999970000000076,"y":0.7250747500002035},{"x":0.16885920000004262,"y":0.7250747500002035}]} />
<silkscreenpath route={[{"x":1.3311631999999918,"y":0.7250747500002035},{"x":1.6688561999999365,"y":0.7250747500002035}]} />
<silkscreenpath route={[{"x":-1.4999970000000076,"y":0.7250747500002035},{"x":-1.668830800000137,"y":0.7250747500002035}]} />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="2.96507735mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-4.399978999999917,"y":2.224919849999992},{"x":4.399978999999917,"y":2.224919849999992},{"x":4.399978999999917,"y":-3.5089152499999727},{"x":-4.399978999999917,"y":-3.5089152499999727},{"x":-4.399978999999917,"y":2.224919849999992}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C221841.obj?uuid=e1101fbc9b794272b747d9f489f7885e",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C221841.step?uuid=e1101fbc9b794272b747d9f489f7885e",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.00005080000005364127, y: 0.5699188499999273, z: -0.7065009999999999 },
      }}
      {...props}
    />
  )
}