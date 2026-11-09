import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["IO0"],
  pin2: ["IO1"],
  pin3: ["IO2"],
  pin4: ["VSS"],
  pin5: ["IO3"],
  pin6: ["SCL"],
  pin7: ["SDA"],
  pin8: ["VDD"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin8: {requiresPower: true}
} as const

export const PCA9536DP_118 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C14674"
  ]
}}
      manufacturerPartNumber="PCA9536DP,118"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.975106mm" pcbY="-2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-0.324866mm" pcbY="-2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="0.32512mm" pcbY="-2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="0.975106mm" pcbY="-2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="-0.975106mm" pcbY="2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="-0.324866mm" pcbY="2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="0.32512mm" pcbY="2.220214mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="0.975106mm" pcbY="2.21996mm" width="0.3700018mm" height="1.35001mm" radius="0.1850009mm" shape="pill" />
<silkscreenpath route={[{"x":1.5519400000000587,"y":1.2975081999999247},{"x":1.5519400000000587,"y":-1.3083540000000085}]} />
<silkscreenpath route={[{"x":-1.5519400000001724,"y":-0.5080000000000382},{"x":-1.5519400000001724,"y":-1.3083540000000085}]} />
<silkscreenpath route={[{"x":-1.5519400000001724,"y":1.3022072000001117},{"x":-1.5519400000001724,"y":0.5080000000000382}]} />
<silkscreenpath route={[{"x":-1.5519400000001724,"y":-1.3083540000000085},{"x":1.5519400000000587,"y":-1.3083540000000085}]} />
<silkscreenpath route={[{"x":-1.5519400000001724,"y":1.3022072000001117},{"x":1.5519400000000587,"y":1.3022072000001117}]} />
<silkscreenpath route={[{"x":-1.5519400000001724,"y":-0.5080000000000382},{"x":-1.3575368163585608,"y":-0.4693308025157421},{"x":-1.192729755157302,"y":-0.3592102448426431},{"x":-1.082609197484203,"y":-0.1944031836414979},{"x":-1.0439400000000205,"y":0},{"x":-1.082609197484203,"y":0.19440318364161158},{"x":-1.192729755157302,"y":0.35921024484275677},{"x":-1.3575368163585608,"y":0.4693308025157421},{"x":-1.5519400000001724,"y":0.5080000000000382}]} />
<silkscreencircle pcbX="-1.016mm" pcbY="-0.889mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.7178mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.7499970000000076,"y":3.145219000000111},{"x":1.7499969999998939,"y":3.145219000000111},{"x":1.7499969999998939,"y":-3.1452189999999973},{"x":-1.7499970000000076,"y":-3.1452189999999973},{"x":-1.7499970000000076,"y":3.145219000000111}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14674.obj?uuid=d6419c302e4e4880b11e69fd39742cf6",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C14674.step?uuid=d6419c302e4e4880b11e69fd39742cf6",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0.000012700000070253736, z: -0.175 },
      }}
      {...props}
    />
  )
}