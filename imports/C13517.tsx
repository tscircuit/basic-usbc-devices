import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_ACT"],
  pin2: ["RSTI"],
  pin3: ["N_AS"],
  pin4: ["N_DS"],
  pin5: ["N_ERR"],
  pin6: ["PEMP"],
  pin7: ["N_INT"],
  pin8: ["SLCT"],
  pin9: ["V3"],
  pin10: ["UD_POS"],
  pin11: ["UD_NEG"],
  pin12: ["GND"],
  pin13: ["XI"],
  pin14: ["XO"],
  pin15: ["D0"],
  pin16: ["D1"],
  pin17: ["D2"],
  pin18: ["D3"],
  pin19: ["D4"],
  pin20: ["D5"],
  pin21: ["D6"],
  pin22: ["D7"],
  pin23: ["SDA"],
  pin24: ["SCL"],
  pin25: ["N_WR"],
  pin26: ["N_RST"],
  pin27: ["N_WT"],
  pin28: ["VCC"]
} as const

const pinAttributes = {
  pin12: {requiresGround: true},
  pin28: {requiresPower: true}
} as const

export const CH341A = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C13517"
  ]
}}
      manufacturerPartNumber="CH341A"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-8.255mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-6.985mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-5.715mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-4.445mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-3.175mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="-1.905mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="-0.635mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="0.635mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="1.905mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="3.175mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="4.445mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="5.715mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="6.985mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="8.255mm" pcbY="-4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin28"]} pcbX="-8.255mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin27"]} pcbX="-6.985mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin26"]} pcbX="-5.715mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="-4.445mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="-3.175mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="-1.905mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="-0.635mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="0.635mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="1.905mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="3.175mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="4.445mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="5.715mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="6.985mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="8.255mm" pcbY="4.743958mm" width="0.5739892mm" height="2.3880064mm" radius="0.2869946mm" shape="pill" />
<silkscreenpath route={[{"x":-9.026194799999985,"y":-3.3214056000000483},{"x":-9.026194799999985,"y":3.3214055999999346},{"x":9.026194799999985,"y":3.3214055999999346},{"x":9.026194799999985,"y":-3.3214056000000483},{"x":-9.026194799999985,"y":-3.3214056000000483}]} />
<silkscreencircle pcbX="-8.255mm" pcbY="-2.568956mm" radius="0.150114mm" />
<silkscreencircle pcbX="-8.994394mm" pcbY="-4.743958mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.0508mm" pcbY="6.6388mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-9.099969600000009,"y":6.187961200000018},{"x":9.299994599999991,"y":6.187961200000018},{"x":9.299994599999991,"y":-6.187961200000018},{"x":-9.099969600000009,"y":-6.187961200000018},{"x":-9.099969600000009,"y":6.187961200000018}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C13517.obj?uuid=1787df1233ec4c78b05b202f6f794fef",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C13517.step?uuid=1787df1233ec4c78b05b202f6f794fef",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.10001250000004802, y: 0, z: -0.049425 },
      }}
      {...props}
    />
  )
}