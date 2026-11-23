import type { InductorProps } from "@tscircuit/props"

export const MWSA0402S_3R3MT = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="3.3uH"
      supplierPartNumbers={{
  "jlcpcb": [
    "C408336"
  ]
}}
      manufacturerPartNumber="MWSA0402S-3R3MT"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="2.027936mm" pcbY="0mm" width="1.3999972mm" height="2.120011mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-2.027936mm" pcbY="0mm" width="1.3999972mm" height="2.120011mm" shape="rect" />
<silkscreenpath route={[{"x":-2.2761956000001646,"y":1.2123928000000888},{"x":-2.2761956000001646,"y":2.1761957999999595},{"x":2.276195600000051,"y":2.1761957999999595},{"x":2.276195600000051,"y":1.2123928000000888}]} />
<silkscreenpath route={[{"x":-2.2761956000001646,"y":-1.212392799999975},{"x":-2.2761956000001646,"y":-2.1761957999999595},{"x":2.276195600000051,"y":-2.1761957999999595},{"x":2.276195600000051,"y":-1.212392799999975}]} />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="3.1844mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.9779345999999123,"y":2.349995799999988},{"x":2.9779345999997986,"y":2.349995799999988},{"x":2.9779345999997986,"y":-2.349995799999874},{"x":-2.9779345999999123,"y":-2.349995799999874},{"x":-2.9779345999999123,"y":2.349995799999988}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C408336.obj?uuid=6e6184a556a149ae9f259e9ef2fd1e0f",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C408336.step?uuid=6e6184a556a149ae9f259e9ef2fd1e0f",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}