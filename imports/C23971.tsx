import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_ACT"],
  pin2: ["N_ROV"],
  pin3: ["TXD"],
  pin4: ["RXD"],
  pin5: ["N_INT"],
  pin6: ["V3"],
  pin7: ["UD_POS"],
  pin8: ["UD_NEG"],
  pin9: ["XI"],
  pin10: ["XO"],
  pin11: ["GND2"],
  pin12: ["GND1"],
  pin13: ["VCC2"],
  pin14: ["NC"],
  pin15: ["SDA"],
  pin16: ["SCL"],
  pin17: ["N_RDY"],
  pin18: ["TNOW"],
  pin19: ["N_TEN"],
  pin20: ["VCC1"]
} as const

const pinAttributes = {
  pin11: {requiresGround: true},
  pin12: {requiresGround: true},
  pin13: {requiresPower: true},
  pin14: {doNotConnect: true},
  pin20: {requiresPower: true}
} as const

export const CH341T = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      symbol={
        <symbol>
          <schematicpath points={[{"x":-0.7,"y":1.1},{"x":0.7,"y":1.1},{"x":0.7,"y":-1.1},{"x":-0.7,"y":-1.1},{"x":-0.7,"y":1.1}]} strokeWidth={0.02} strokeColor="#800000" isFilled fillColor="#FFFFB0" />
          <port name="pin3" pinNumber={3} aliases={["TXD"]} direction="left" schX={-1.1} schY={0.5} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["N_ROV"]} direction="left" schX={-1.1} schY={0.7} schStemLength={0.4} />
          <port name="pin1" pinNumber={1} aliases={["N_ACT"]} direction="left" schX={-1.1} schY={0.9} schStemLength={0.4} />
          <port name="pin4" pinNumber={4} aliases={["RXD"]} direction="left" schX={-1.1} schY={0.3} schStemLength={0.4} />
          <port name="pin5" pinNumber={5} aliases={["N_INT"]} direction="left" schX={-1.1} schY={0.1} schStemLength={0.4} />
          <port name="pin6" pinNumber={6} aliases={["V3"]} direction="left" schX={-1.1} schY={-0.1} schStemLength={0.4} />
          <port name="pin7" pinNumber={7} aliases={["UD_POS"]} direction="left" schX={-1.1} schY={-0.3} schStemLength={0.4} />
          <port name="pin8" pinNumber={8} aliases={["UD_NEG"]} direction="left" schX={-1.1} schY={-0.5} schStemLength={0.4} />
          <port name="pin9" pinNumber={9} aliases={["XI"]} direction="left" schX={-1.1} schY={-0.7} schStemLength={0.4} />
          <port name="pin10" pinNumber={10} aliases={["XO"]} direction="left" schX={-1.1} schY={-0.9} schStemLength={0.4} />
          <port name="pin18" pinNumber={18} aliases={["TNOW"]} direction="right" schX={1.1} schY={0.5} schStemLength={0.4} />
          <port name="pin19" pinNumber={19} aliases={["N_TEN"]} direction="right" schX={1.1} schY={0.7} schStemLength={0.4} />
          <port name="pin20" pinNumber={20} aliases={["VCC1"]} direction="right" schX={1.1} schY={0.9} schStemLength={0.4} />
          <port name="pin17" pinNumber={17} aliases={["N_RDY"]} direction="right" schX={1.1} schY={0.3} schStemLength={0.4} />
          <port name="pin16" pinNumber={16} aliases={["SCL"]} direction="right" schX={1.1} schY={0.1} schStemLength={0.4} />
          <port name="pin15" pinNumber={15} aliases={["SDA"]} direction="right" schX={1.1} schY={-0.1} schStemLength={0.4} />
          <port name="pin14" pinNumber={14} aliases={["NC"]} direction="right" schX={1.1} schY={-0.3} schStemLength={0.4} />
          <port name="pin13" pinNumber={13} aliases={["VCC2"]} direction="right" schX={1.1} schY={-0.5} schStemLength={0.4} />
          <port name="pin12" pinNumber={12} aliases={["GND1"]} direction="right" schX={1.1} schY={-0.7} schStemLength={0.4} />
          <port name="pin11" pinNumber={11} aliases={["GND2"]} direction="right" schX={1.1} schY={-0.9} schStemLength={0.4} />
          <schematicpath svgPath="M -0.1 1.1 A 0.1 0.1 0 0 1 0.1 1.1" strokeColor="#800000" />
          <schematictext schX={0} schY={1.57} text="CH341T" fontSize={0.2} anchor="bottom_center" />
          <schematictext schX={0} schY={1.31} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C23971"
  ]
}}
      manufacturerPartNumber="CH341T"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.925064mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-2.275078mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-1.625092mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-0.975106mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-0.324866mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="0.32512mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0.975106mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="1.625092mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="2.275078mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="2.925064mm" pcbY="-3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="-2.925064mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="-2.275078mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="-1.625092mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="-0.975106mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="-0.324866mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="0.32512mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="0.975106mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="1.625092mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="2.275078mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="2.925064mm" pcbY="3.482086mm" width="0.3640074mm" height="2.069211mm" radius="0.1820037mm" shape="pill" />
<silkscreenpath route={[{"x":-3.6761928000000808,"y":-2.2188931999999113},{"x":-3.6761928000000808,"y":2.218893200000025},{"x":3.676192799999967,"y":2.218893200000025},{"x":3.676192799999967,"y":-2.2188931999999113},{"x":-3.6761928000000808,"y":-2.2188931999999113}]} />
<silkscreencircle pcbX="-2.925064mm" pcbY="-1.466596mm" radius="0.150114mm" />
<silkscreencircle pcbX="-3.559302mm" pcbY="-3.482086mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="5.3434mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.8999800000000278,"y":4.766691499999979},{"x":3.900005399999941,"y":4.766691499999979},{"x":3.900005399999941,"y":-4.766691499999865},{"x":-3.8999800000000278,"y":-4.766691499999865},{"x":-3.8999800000000278,"y":4.766691499999979}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C23971.obj?uuid=9fb3fc81ab644235a4eb27cf8e4c8bdd",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C23971.step?uuid=9fb3fc81ab644235a4eb27cf8e4c8bdd",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0, z: -0.1 },
      }}
      {...props}
    />
  )
}