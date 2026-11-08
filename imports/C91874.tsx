import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["1A"],
  pin2: ["1B"],
  pin3: ["2Y"],
  pin4: ["GND"],
  pin5: ["2A"],
  pin6: ["2B"],
  pin7: ["1Y"],
  pin8: ["VCC"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin8: {requiresPower: true}
} as const

export const SN74LVC2G32DCUR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C91874"
  ]
}}
      manufacturerPartNumber="SN74LVC2G32DCUR"
      footprint={<footprint>
        <smtpad portHints={["pin5"]} pcbX="-1.402588mm" pcbY="0.750062mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="-1.402588mm" pcbY="0.249936mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="-1.402588mm" pcbY="-0.249936mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="-1.402588mm" pcbY="-0.750062mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="1.402588mm" pcbY="0.750062mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="1.402588mm" pcbY="0.249936mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="1.402588mm" pcbY="-0.249936mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin1"]} pcbX="1.402588mm" pcbY="-0.750062mm" width="0.905002mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<silkscreenpath route={[{"x":0.721436199999971,"y":-1.0761979999999767},{"x":-0.7213345999999774,"y":-1.0761979999999767},{"x":-0.7213345999999774,"y":1.0762234000000035},{"x":0.721436199999971,"y":1.0762234000000035},{"x":0.721436199999971,"y":-1.0761979999999767}]} />
<silkscreencircle pcbX="1.402588mm" pcbY="-1.34239mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="0.191008mm" pcbY="2.086866mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.105088999999907,"y":1.249998000000005},{"x":2.105088999999907,"y":1.249998000000005},{"x":2.105088999999907,"y":-1.249998000000005},{"x":-2.105088999999907,"y":-1.249998000000005},{"x":-2.105088999999907,"y":1.249998000000005}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C91874.obj?uuid=4ba1a5485b0b4bfe8267dec7566677a7",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C91874.step?uuid=4ba1a5485b0b4bfe8267dec7566677a7",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0, y: 0.000012699999956566899, z: -0.535 },
      }}
      {...props}
    />
  )
}