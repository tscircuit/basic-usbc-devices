import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["COMP"],
  pin2: ["GD"],
  pin3: ["FDLY"],
  pin4: ["FB"],
  pin5: ["DLY1"],
  pin6: ["DLY2"],
  pin7: ["VIN"],
  pin8: ["SW2"],
  pin9: ["SW1"],
  pin10: ["PGND2"],
  pin11: ["PGND1"],
  pin12: ["SUP"],
  pin13: ["VCOM"],
  pin14: ["IN"],
  pin15: ["FBP"],
  pin16: ["CTRL"],
  pin17: ["ADJ"],
  pin18: ["VGH"],
  pin19: ["CPI"],
  pin20: ["DRVP"],
  pin21: ["DRVN"],
  pin22: ["GND2"],
  pin23: ["REF"],
  pin24: ["FBN"],
  pin25: ["GND1"]
} as const

const pinAttributes = {
  pin7: {requiresPower: true},
  pin10: {requiresGround: true},
  pin11: {requiresGround: true},
  pin22: {requiresGround: true},
  pin25: {requiresGround: true}
} as const

export const TPS65150RGER = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C468258"
  ]
}}
      manufacturerPartNumber="TPS65150RGER"
      footprint={<footprint>
        <smtpad portHints={["pin25"]} pcbX="0.000762mm" pcbY="-0.000889mm" width="2.5999948mm" height="2.5999948mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="-1.94818mm" pcbY="-1.250061mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="-1.94818mm" pcbY="-0.749935mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="-1.94818mm" pcbY="-0.250063mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="-1.94818mm" pcbY="0.249809mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-1.94818mm" pcbY="0.749935mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-1.94818mm" pcbY="1.249807mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="-1.249934mm" pcbY="1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="-0.750062mm" pcbY="1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-0.249936mm" pcbY="1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="0.249936mm" pcbY="1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="0.750062mm" pcbY="1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="1.249934mm" pcbY="1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="1.94818mm" pcbY="1.249807mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="1.94818mm" pcbY="0.749935mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="1.94818mm" pcbY="0.249809mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.94818mm" pcbY="-0.250063mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="1.94818mm" pcbY="-0.749935mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.94818mm" pcbY="-1.250061mm" width="0.6999986mm" height="0.299974mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.249934mm" pcbY="-1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.750062mm" pcbY="-1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.249936mm" pcbY="-1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.249936mm" pcbY="-1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.750062mm" pcbY="-1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-1.249934mm" pcbY="-1.941957mm" width="0.299974mm" height="0.6999986mm" shape="rect" />
<silkscreenpath route={[{"x":1.69992040000011,"y":-2.1000466000000415},{"x":2.1000212000000147,"y":-2.1000466000000415},{"x":2.1000212000000147,"y":-1.7000220000001036}]} />
<silkscreenpath route={[{"x":1.6000222000001258,"y":2.0999449999999342},{"x":2.1000212000000147,"y":2.0999449999999342},{"x":2.1000212000000147,"y":1.6999457999997958}]} />
<silkscreenpath route={[{"x":-2.1000973999998678,"y":1.6956278000000111},{"x":-2.1000973999998678,"y":2.095601600000009},{"x":-1.7001235999998698,"y":2.095601600000009}]} />
<silkscreenpath route={[{"x":-1.7001235999998698,"y":-2.1043392000001404},{"x":-2.1000973999998678,"y":-2.1043392000001404},{"x":-2.0999703999998474,"y":-1.7000220000001036}]} />
<silkscreencircle pcbX="-1.905mm" pcbY="-2.540127mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="0.011938mm" pcbY="3.285111mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.5481792999999016,"y":2.5419562999999243},{"x":2.5481793000000152,"y":2.5419562999999243},{"x":2.5481793000000152,"y":-2.541956300000038},{"x":-2.5481792999999016,"y":-2.541956300000038},{"x":-2.5481792999999016,"y":2.5419562999999243}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C468258.obj?uuid=3654f3e3e10f4db0800aff4bd5674e66",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C468258.step?uuid=3654f3e3e10f4db0800aff4bd5674e66",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}