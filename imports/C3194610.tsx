// TI DGK0008A land pattern: 0.45 x 1.4 mm, 0.65 mm pitch, 4.4 mm row spacing.
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["P0"],
  pin2: ["P1"],
  pin3: ["P2"],
  pin4: ["GND"],
  pin5: ["P3","INT"],
  pin6: ["SCL"],
  pin7: ["SDA"],
  pin8: ["VCC"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin8: {requiresPower: true}
} as const

export const TCA9536DGKR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C3194610"
  ]
}}
      manufacturerPartNumber="TCA9536DGKR"
      footprint={<footprint>
        <smtpad portHints={["pin8"]} pcbX="-0.975106mm" pcbY="2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-0.32512mm" pcbY="2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.32512mm" pcbY="2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.975106mm" pcbY="2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.975106mm" pcbY="-2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.32512mm" pcbY="-2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.32512mm" pcbY="-2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-0.975106mm" pcbY="-2.1999956mm" width="0.45mm" height="1.4mm" shape="rect" />
<silkscreenpath route={[{"x":-1.4784323999999742,"y":-0.6476999999999862},{"x":-1.4784323999999742,"y":-1.2999973999999384},{"x":1.4999716000000944,"y":-1.2999973999999384},{"x":1.4999716000000944,"y":1.2999973999999384},{"x":-1.4784323999999742,"y":1.2999973999999384},{"x":-1.4784323999999742,"y":0.6476999999998725}]} />
<silkscreenpath route={[{"x":-1.4784323999999742,"y":0.6476999999998725},{"x":-1.2782821219902871,"y":0.6159992753716779},{"x":-1.097723955021138,"y":0.5240002641270394},{"x":-0.9544321862840661,"y":0.3807084683346602},{"x":-0.8624332091311544,"y":0.20015028399495804},{"x":-0.8307325222936015,"y":0},{"x":-0.8624332091311544,"y":-0.20015028399518542},{"x":-0.9544321862840661,"y":-0.3807084683348876},{"x":-1.097723955021138,"y":-0.5240002641273804},{"x":-1.2782821219902871,"y":-0.6159992753717916},{"x":-1.4784323999999742,"y":-0.6476999999999862}]} />
<silkscreencircle pcbX="-0.8890254mm" pcbY="-0.889mm" radius="0.119888mm" />
<silkscreentext text="{NAME}" pcbX="-0.024384mm" pcbY="3.795524mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.7500223999999207,"y":3.049994399999946},{"x":1.7499716000000944,"y":3.049994399999946},{"x":1.7499716000000944,"y":-3.049994399999946},{"x":-1.7500223999999207,"y":-3.049994399999946},{"x":-1.7500223999999207,"y":3.049994399999946}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3194610.obj?uuid=893d5e5d93e24378aa2fc7cb7a646c1e",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3194610.step?uuid=893d5e5d93e24378aa2fc7cb7a646c1e",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000025399999913133797, y: 0.000012700000070253736, z: -0.53 },
      }}
      {...props}
    />
  )
}