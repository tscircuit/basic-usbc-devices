import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["VDD"],
  pin2: ["VSS"],
  pin3: ["GND"],
  pin4: ["GND2"],
  pin5: ["SHT"],
  pin6: ["GND3"],
  pin7: ["GP1"],
  pin8: ["DNC"],
  pin9: ["SDA"],
  pin10: ["SCL"],
  pin11: ["AVDD"],
  pin12: ["GND4"]
} as const

const pinAttributes = {
  pin1: {requiresPower: true},
  pin2: {requiresGround: true},
  pin3: {requiresGround: true},
  pin4: {requiresGround: true},
  pin6: {requiresGround: true},
  pin12: {requiresGround: true}
} as const

export const VL53L0CXV0DH_1 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C91199"
  ]
}}
      manufacturerPartNumber="VL53L0CXV0DH/1"
      footprint={<footprint>
        <smtpad portHints={["pin5"]} pcbX="-1.599946mm" pcbY="-0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-0.8001mm" pcbY="-0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0mm" pcbY="-0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.8001mm" pcbY="-0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="1.599946mm" pcbY="-0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="1.599946mm" pcbY="0mm" width="0.5500116mm" height="0.5500116mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="1.599946mm" pcbY="0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="0.8001mm" pcbY="0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="0mm" pcbY="0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-0.8001mm" pcbY="0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-1.599946mm" pcbY="0.87503mm" width="0.499999mm" height="0.6500114mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-1.599946mm" pcbY="0mm" width="0.5500116mm" height="0.5500116mm" shape="rect" />
<silkscreenpath route={[{"x":-2.2761956000001646,"y":0.4145025999999916},{"x":-2.2761956000001646,"y":1.2761975999999322},{"x":-2.014499399999977,"y":1.2761975999999322}]} />
<silkscreenpath route={[{"x":2.276195600000051,"y":0.4145025999999916},{"x":2.276195600000051,"y":1.2761975999999322},{"x":2.0144993999998633,"y":1.2761975999999322}]} />
<silkscreenpath route={[{"x":-2.2761956000001646,"y":-0.41450259999987793},{"x":-2.2761956000001646,"y":-1.2761975999999322},{"x":-2.014499399999977,"y":-1.2761975999999322}]} />
<silkscreenpath route={[{"x":2.276195600000051,"y":-0.41450259999987793},{"x":2.276195600000051,"y":-1.2761975999999322},{"x":2.0144993999998633,"y":-1.2761975999999322}]} />
<silkscreencircle pcbX="1.649984mm" pcbY="-1.599946mm" radius="0.124968mm" />
<silkscreencircle pcbX="-0.94996mm" pcbY="0mm" radius="0.07493mm" />
<silkscreencircle pcbX="0.94996mm" pcbY="0mm" radius="0.124968mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="2.27mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":2.1999955999999656,"y":1.1999975999999606},{"x":-2.1999956000000793,"y":1.1999975999999606},{"x":-2.1999956000000793,"y":-1.1999975999999606},{"x":-2.099995799999988,"y":-1.1999975999999606},{"x":-2.099995799999988,"y":1.0999978000000965},{"x":2.099995799999874,"y":1.0999978000000965},{"x":2.099995799999874,"y":-1.0999977999999828},{"x":-2.0499832000000424,"y":-1.0999977999999828},{"x":-2.0499832000000424,"y":-1.1999975999999606},{"x":2.1999955999999656,"y":-1.1999975999999606},{"x":2.1999955999999656,"y":0.999998000000005},{"x":2.1999955999999656,"y":1.1999975999999606}]} strokeWidth="0mm" isFilled hasStroke={false} />
<fabricationnotepath route={[{"x":1.6749776000000338,"y":-0.6000242000000071},{"x":1.6749776000000338,"y":-0.9500107999999727},{"x":1.5749777999999424,"y":-0.9500107999999727},{"x":1.5749777999999424,"y":-0.7000239999998712},{"x":1.524965199999997,"y":-0.7000239999998712},{"x":1.524965199999997,"y":-0.6000242000000071},{"x":1.5749777999999424,"y":-0.550011599999948},{"x":1.6749776000000338,"y":-0.550011599999948},{"x":1.6749776000000338,"y":-0.6000242000000071}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-2.4499955999999656,"y":1.4500357000000577},{"x":2.4499955999999656,"y":1.4500357000000577},{"x":2.4499955999999656,"y":-1.4500357000000577},{"x":-2.4499955999999656,"y":-1.4500357000000577},{"x":-2.4499955999999656,"y":1.4500357000000577}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C91199.obj?uuid=afc46bf8465a4294b3cb60010b4499bf",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C91199.step?uuid=afc46bf8465a4294b3cb60010b4499bf",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0, y: 0, z: -1.02 },
      }}
      {...props}
    />
  )
}