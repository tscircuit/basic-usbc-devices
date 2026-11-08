import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_OVCUR"],
  pin2: ["NC_"],
  pin3: ["XO"],
  pin4: ["XI"],
  pin5: ["DM4"],
  pin6: ["DP4"],
  pin7: ["DM3"],
  pin8: ["DP3"],
  pin9: ["DM2"],
  pin10: ["DP2"],
  pin11: ["DM1"],
  pin12: ["DP1"],
  pin13: ["LED3","SCL"],
  pin14: ["DMU"],
  pin15: ["DPU"],
  pin16: ["N_RESET","CDP"],
  pin17: ["NC"],
  pin18: ["PSELF"],
  pin19: ["V5"],
  pin20: ["VDD33"],
  pin21: ["LED4","SDA"],
  pin22: ["LED1"],
  pin23: ["LED2"],
  pin24: ["N_PWREN"],
  pin25: ["GND"]
} as const

const pinAttributes = {
  pin17: {doNotConnect: true},
  pin25: {requiresGround: true}
} as const

export const CH334F = (props: ChipProps) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C5187527"
  ]
}}
      manufacturerPartNumber="CH334F"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.249934mm" pcbY="-1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-0.750062mm" pcbY="-1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-0.249936mm" pcbY="-1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="0.249936mm" pcbY="-1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="0.750062mm" pcbY="-1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="1.249934mm" pcbY="-1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="1.999996mm" pcbY="-1.249934mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="1.999996mm" pcbY="-0.750062mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="1.999996mm" pcbY="-0.249936mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="1.999996mm" pcbY="0.249936mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="1.999996mm" pcbY="0.750062mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="1.999996mm" pcbY="1.249934mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="1.249934mm" pcbY="1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="0.750062mm" pcbY="1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="0.249936mm" pcbY="1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="-0.249936mm" pcbY="1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="-0.750062mm" pcbY="1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="-1.249934mm" pcbY="1.999996mm" width="0.2800096mm" height="0.6999986mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="-1.999996mm" pcbY="1.249934mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="-1.999996mm" pcbY="0.750062mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="-1.999996mm" pcbY="0.249936mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="-1.999996mm" pcbY="-0.249936mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="-1.999996mm" pcbY="-0.750062mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="-1.999996mm" pcbY="-1.249934mm" width="0.6999986mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="0.0127mm" pcbY="0mm" width="2.7999944mm" height="2.7999944mm" shape="rect" />
<silkscreenpath route={[{"x":2.1628099999998085,"y":1.7500345999999354},{"x":2.1628099999998085,"y":2.1501353999999537},{"x":1.7627599999999575,"y":2.1501353999999537}]} />
<silkscreenpath route={[{"x":-2.137384599999905,"y":1.7500345999999354},{"x":-2.137384599999905,"y":2.1501353999999537},{"x":-1.737359999999967,"y":2.1501353999999537}]} />
<silkscreenpath route={[{"x":-1.737359999999967,"y":-2.1501353999999537},{"x":-2.137384599999905,"y":-2.1501353999999537},{"x":-2.137384599999905,"y":-1.750085399999989}]} />
<silkscreenpath route={[{"x":2.1628099999998085,"y":-1.750085399999989},{"x":2.1628099999998085,"y":-2.1501353999999537},{"x":1.7627599999999575,"y":-2.1501353999999537}]} />
<silkscreentext text="{NAME}" pcbX="-0mm" pcbY="3.343404mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.599995300000046,"y":2.599995300000046},{"x":2.5999953000001597,"y":2.599995300000046},{"x":2.5999953000001597,"y":-2.599995300000046},{"x":-2.599995300000046,"y":-2.599995300000046},{"x":-2.599995300000046,"y":2.599995300000046}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5187527.obj?uuid=f4a3249710724deb990f62f343cd4553",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5187527.step?uuid=f4a3249710724deb990f62f343cd4553",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999842880061, y: -0.000012700000070253736, z: 0 },
      }}
      {...props}
    />
  )
}