import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["GND"],
  pin2: ["Vin"],
  pin3: ["Vout"]
} as const

const pinAttributes = {
  pin1: {requiresGround: true},
  pin2: {requiresPower: true}
} as const

export const XC6206P332MR_G = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C5446"
  ]
}}
      manufacturerPartNumber="XC6206P332MR-G"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="1.235075mm" pcbY="-0.94996mm" width="1.0700004mm" height="0.5999988mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.235075mm" pcbY="0.94996mm" width="1.0700004mm" height="0.5999988mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-1.235075mm" pcbY="0mm" width="1.0700004mm" height="0.5999988mm" shape="rect" />
<silkscreenpath route={[{"x":0.8760714000002281,"y":1.5361919999999145},{"x":-0.8763253999998142,"y":1.5361919999999145},{"x":-0.8763253999998142,"y":0.49458879999997407}]} />
<silkscreenpath route={[{"x":0.8760714000002281,"y":-1.5361920000000282},{"x":-0.8763253999998142,"y":-1.5361920000000282},{"x":-0.8763253999998142,"y":-0.49458879999997407}]} />
<silkscreenpath route={[{"x":0.8760714000002281,"y":0.45539659999997184},{"x":0.8760714000002281,"y":-0.45539659999985815}]} />
<silkscreentext text="{NAME}" pcbX="-0.012827mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.020075199999951,"y":1.6999844000000621},{"x":2.020075200000065,"y":1.6999844000000621},{"x":2.020075200000065,"y":-1.7000097999999753},{"x":-2.020075199999951,"y":-1.7000097999999753},{"x":-2.020075199999951,"y":1.6999844000000621}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5446.obj?uuid=cefd4596db214da394d9632b2b88f8f2",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5446.step?uuid=cefd4596db214da394d9632b2b88f8f2",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012699999956566899, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}