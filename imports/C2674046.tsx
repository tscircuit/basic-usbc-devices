import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["CC1"],
  pin2: ["CC2"],
  pin3: ["CURRENT_MODE"],
  pin4: ["PORT"],
  pin5: ["VBUS_DET"],
  pin6: ["N_VCONN_FAULT"],
  pin7: ["OUT1"],
  pin8: ["OUT2"],
  pin9: ["ID"],
  pin10: ["GND"],
  pin11: ["DIR"],
  pin12: ["VDD"]
} as const

const pinAttributes = {
  pin10: {requiresGround: true},
  pin12: {requiresPower: true}
} as const

export const TUSB321AIRWBR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2674046"
  ]
}}
      manufacturerPartNumber="TUSB321AIRWBR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.199898mm" pcbY="-0.6500622mm" width="0.1999996mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.199898mm" pcbY="-0.6500622mm" width="0.1999996mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.750062mm" pcbY="-0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.750062mm" pcbY="-0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.750062mm" pcbY="0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.750062mm" pcbY="0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="0.199898mm" pcbY="0.6500622mm" width="0.1999996mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-0.199898mm" pcbY="0.6500622mm" width="0.1999996mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-0.750062mm" pcbY="0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-0.750062mm" pcbY="0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-0.750062mm" pcbY="-0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-0.750062mm" pcbY="-0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
<silkscreenpath route={[{"x":0.8700261999998702,"y":0.8598916000000827},{"x":0.8700261999998702,"y":0.8099551999999903}]} />
<silkscreenpath route={[{"x":0.8698991999998498,"y":0.8598916000000827},{"x":0.5099303999999165,"y":0.8598916000000827}]} />
<silkscreenpath route={[{"x":-0.8699500000000171,"y":-0.8598153999998885},{"x":-0.5099558000001707,"y":-0.8598153999998885}]} />
<silkscreenpath route={[{"x":-0.8700261999999839,"y":-0.8598153999998885},{"x":-0.8700261999999839,"y":-0.8098535999999967}]} />
<silkscreenpath route={[{"x":0.8699245999999903,"y":-0.8599169999999958},{"x":0.5099050000001171,"y":-0.8599169999999958}]} />
<silkscreenpath route={[{"x":0.8699245999999903,"y":-0.8599169999999958},{"x":0.8699245999999903,"y":-0.8099551999998766}]} />
<silkscreenpath route={[{"x":-0.8700008000000707,"y":0.8599932000000763},{"x":-0.8700008000000707,"y":0.8100059999999303}]} />
<silkscreenpath route={[{"x":-0.8700008000000707,"y":0.8599932000000763},{"x":-0.510006599999997,"y":0.8599932000000763}]} />
<silkscreencircle pcbX="-0.199898mm" pcbY="-1.279906mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="1.9906mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.2525633999999854,"y":1.250061500000129},{"x":1.2525633999999854,"y":1.250061500000129},{"x":1.2525633999999854,"y":-1.2500615000000153},{"x":-1.2525633999999854,"y":-1.2500615000000153},{"x":-1.2525633999999854,"y":1.250061500000129}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2674046.obj?uuid=9f2a197c284b419e823be50844907f19",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2674046.step?uuid=9f2a197c284b419e823be50844907f19",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}