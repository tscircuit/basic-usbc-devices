import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["SCL"],
  pin2: ["GND"],
  pin3: ["ALERT"],
  pin4: ["ADD0"],
  pin5: ["V_POS"],
  pin6: ["SDA"]
} as const

const pinAttributes = {
  pin2: {requiresGround: true},
  pin5: {requiresPower: true}
} as const

export const TMP102AIDRLR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C99269"
  ]
}}
      manufacturerPartNumber="TMP102AIDRLR"
      footprint={<footprint>
        <smtpad portHints={["pin6"]} pcbX="-0.499999mm" pcbY="0.799973mm" width="0.2999994mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-0.000127mm" pcbY="0.799973mm" width="0.2999994mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.499999mm" pcbY="0.799973mm" width="0.2999994mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-0.499999mm" pcbY="-0.799973mm" width="0.2999994mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.000127mm" pcbY="-0.799973mm" width="0.2999994mm" height="0.499999mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.499999mm" pcbY="-0.799973mm" width="0.2999994mm" height="0.499999mm" shape="rect" />
<silkscreenpath route={[{"x":-0.7801355999997668,"y":-0.6000749999999471},{"x":-0.8500871999997344,"y":-0.6000749999999471},{"x":-0.8500871999997344,"y":0.5898641999999654},{"x":-0.7901177999997344,"y":0.5898641999999654}]} />
<silkscreenpath route={[{"x":0.7498842000002242,"y":0.6099301999998943},{"x":0.8198612000002186,"y":0.6099301999998943},{"x":0.8198612000002186,"y":-0.5800852000000987},{"x":0.7598664000001918,"y":-0.5800852000000987}]} />
<silkscreencircle pcbX="-0.505079mm" pcbY="-1.215009mm" radius="0.050038mm" />
<silkscreentext text="{NAME}" pcbX="2.1mm" pcbY="0mm" anchorAlignment="center" fontSize="0.6mm" />
<courtyardoutline outline={[{"x":-1.049134799999706,"y":1.2999724999999671},{"x":1.0508620000002793,"y":1.2999724999999671},{"x":1.0508620000002793,"y":-1.2999724999999671},{"x":-1.049134799999706,"y":-1.2999724999999671},{"x":-1.049134799999706,"y":1.2999724999999671}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C99269.obj?uuid=16f62fa8a78d4cfc92151eff9dc54a6e",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C99269.step?uuid=16f62fa8a78d4cfc92151eff9dc54a6e",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.0008636000002297806, y: -0.00993140000002768, z: -0.02 },
      }}
      {...props}
    />
  )
}