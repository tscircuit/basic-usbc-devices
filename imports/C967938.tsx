import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["P1_4","T2_","CAP1_","SCS","TIN2","UCC1","AIN1"],
  pin2: ["P1_5","MOSI","PWM1","TIN3","UCC2","AIN2"],
  pin3: ["P1_6","MISO","RXD1","TIN4"],
  pin4: ["P1_7","SCK","TXD1","TIN5"],
  pin5: ["RST","T2EX_","CAP2_"],
  pin6: ["P3_6","UDP"],
  pin7: ["P3_7","UDM"],
  pin8: ["GND","VSS"],
  pin9: ["VCC","VDD"],
  pin10: ["V33"]
} as const

const pinAttributes = {
  pin8: {requiresGround: true},
  pin9: {requiresPower: true}
} as const

export const CH552E = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C967938"
  ]
}}
      manufacturerPartNumber="CH552E"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.999998mm" pcbY="-2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-0.499872mm" pcbY="-2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="0mm" pcbY="-2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="0.500126mm" pcbY="-2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="0.999998mm" pcbY="-2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="-0.999998mm" pcbY="2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="-0.499872mm" pcbY="2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="0mm" pcbY="2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0.500126mm" pcbY="2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="0.999998mm" pcbY="2.109978mm" width="0.2800096mm" height="1.620012mm" radius="0.1400048mm" shape="pill" />
<silkscreenpath route={[{"x":-1.5761970000000929,"y":-1.0713974000000235},{"x":-1.5761970000000929,"y":1.0713974000000235},{"x":1.5761969999998655,"y":1.0713974000000235},{"x":1.5761969999998655,"y":-1.0713974000000235},{"x":-1.5761970000000929,"y":-1.0713974000000235}]} />
<silkscreencircle pcbX="-0.999998mm" pcbY="-0.319024mm" radius="0.150114mm" />
<silkscreencircle pcbX="-1.592326mm" pcbY="-2.109978mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.0889mm" pcbY="3.7686mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.7499970000000076,"y":3.169984000000113},{"x":1.7499969999998939,"y":3.169984000000113},{"x":1.7499969999998939,"y":-3.1699839999999995},{"x":-1.7499970000000076,"y":-3.1699839999999995},{"x":-1.7499970000000076,"y":3.169984000000113}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C967938.obj?uuid=a8ab40c7a7c54773a59b712bf86c7131",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C967938.step?uuid=a8ab40c7a7c54773a59b712bf86c7131",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}