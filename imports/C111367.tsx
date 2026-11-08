import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["P3_2","TXD1_","INT0","VBUS1","AIN3"],
  pin2: ["P1_4","T2_","CAP1_","SCS","TIN2","UCC1","AIN1"],
  pin3: ["P1_5","MOSI","PWM1","TIN3","UCC2","AIN2"],
  pin4: ["P1_6","MISO","RXD1","TIN4"],
  pin5: ["P1_7","SCK","TXD1","TIN5"],
  pin6: ["RST","T2EX_","CAP2_"],
  pin7: ["P1_0","T2","CAP1","TIN0"],
  pin8: ["P1_1","T2EX","CAP2","TIN1","VBUS2","AIN0"],
  pin9: ["P3_1","PWM2_","TXD"],
  pin10: ["P3_0","PWM1_","RXD"],
  pin11: ["P3_3","INT1"],
  pin12: ["P3_4","PWM2","RXD1_","T0"],
  pin13: ["P3_5","T1"],
  pin14: ["P3_6","UDP"],
  pin15: ["P3_7","UDM"],
  pin16: ["P1_3","XO","TXD_"],
  pin17: ["P1_2","XI","RXD_"],
  pin18: ["GND","VSS"],
  pin19: ["VCC","VDD"],
  pin20: ["V33"]
} as const

const pinAttributes = {
  pin18: {requiresGround: true},
  pin19: {requiresPower: true}
} as const

export const CH552T = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C111367"
  ]
}}
      manufacturerPartNumber="CH552T"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.925064mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-2.275078mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-1.625092mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-0.975106mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-0.324866mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="0.32512mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0.975106mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="1.625092mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="2.275078mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="2.925064mm" pcbY="-2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="-2.925064mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="-2.275078mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="-1.625092mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="-0.975106mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="-0.324866mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="0.32512mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="0.975106mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="1.625092mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="2.275078mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="2.925064mm" pcbY="2.870962mm" width="0.3640074mm" height="1.7420082mm" radius="0.1820037mm" shape="pill" />
<silkscreenpath route={[{"x":-3.326206200000115,"y":-1.7713960000000952},{"x":-3.326206200000115,"y":1.7713959999999815},{"x":3.3262061999998878,"y":1.7713959999999815},{"x":3.3262061999998878,"y":-1.7713960000000952},{"x":-3.326206200000115,"y":-1.7713960000000952}]} />
<silkscreencircle pcbX="-2.925064mm" pcbY="-1.019048mm" radius="0.150114mm" />
<silkscreencircle pcbX="-3.559302mm" pcbY="-2.870962mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.1905mm" pcbY="4.556mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.499980800000003,"y":3.9919661000000133},{"x":3.50000620000003,"y":3.9919661000000133},{"x":3.50000620000003,"y":-3.9919661000000133},{"x":-3.499980800000003,"y":-3.9919661000000133},{"x":-3.499980800000003,"y":3.9919661000000133}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C111367.obj?uuid=f8ba5b4174b9490d8c445fbe2ed40b80",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C111367.step?uuid=f8ba5b4174b9490d8c445fbe2ed40b80",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0, y: 0.000012700000070253736, z: -0.019205 },
      }}
      {...props}
    />
  )
}