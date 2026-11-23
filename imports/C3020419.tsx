import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"]
} as const

export const SK12D07VG5 = (props: SwitchProps) => {
  return (
    <switch type="spdt"
      pinAttributes={{pin1:{isPassive:true},pin2:{isPassive:true},pin3:{isPassive:true}}}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C3020419"
  ]
}}
      manufacturerPartNumber="SK12D07VG5"
      footprint={<footprint>
        <platedhole  portHints={["pin1"]} pcbX="-1.9999706mm" pcbY="-0.0000381mm" holeWidth="0.999998mm" holeHeight="0.999998mm" outerWidth="1.599946mm" outerHeight="1.5999968mm" shape="pill" />
<platedhole  portHints={["pin3"]} pcbX="1.999996mm" pcbY="0.0000381mm" holeWidth="0.999998mm" holeHeight="0.999998mm" outerWidth="1.599946mm" outerHeight="1.5999968mm" shape="pill" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="0.0000381mm" holeWidth="0.999998mm" holeHeight="0.999998mm" outerWidth="1.599946mm" outerHeight="1.5999968mm" shape="pill" />
<platedhole  portHints={["pin4"]} pcbX="4.150106mm" pcbY="0.0000381mm" holeWidth="1.5999968mm" holeHeight="0.700024mm" outerWidth="2.1999956mm" outerHeight="1.1999976mm" pcbRotation="270deg" shape="pill" />
<platedhole  portHints={["pin5"]} pcbX="-4.150106mm" pcbY="0.0000381mm" holeWidth="1.5999968mm" holeHeight="0.700024mm" outerWidth="2.1999956mm" outerHeight="1.1999976mm" pcbRotation="270deg" shape="pill" />
<silkscreenpath route={[{"x":4.399991199999931,"y":-1.2925171000000546},{"x":4.399991199999931,"y":-2.1999574999999822}]} />
<silkscreenpath route={[{"x":4.399991199999931,"y":2.200033699999949},{"x":4.399991199999931,"y":1.2925932999999077}]} />
<silkscreenpath route={[{"x":-4.399991200000045,"y":-1.2925171000000546},{"x":-4.399991200000045,"y":-2.1999574999999822}]} />
<silkscreenpath route={[{"x":-4.399991200000045,"y":2.200033699999949},{"x":-4.399991200000045,"y":1.2925932999999077}]} />
<silkscreenpath route={[{"x":4.399991199999931,"y":2.200033699999949},{"x":-4.399991200000045,"y":2.200033699999949}]} />
<silkscreenpath route={[{"x":4.399991199999931,"y":-2.1999574999999822},{"x":-4.399991200000045,"y":-2.1999574999999822}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.3114381mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.9050000000000864,"y":-2.285961899999961},{"x":-1.9050000000000864,"y":-7.15895189999992},{"x":-0.1590040000000954,"y":-7.15895189999992},{"x":-0.1590040000000954,"y":-2.1999574999999822},{"x":-0.032004000000142696,"y":-2.0729575000000295},{"x":0.0949959999999237,"y":-2.1999574999999822},{"x":0.0949959999999237,"y":-7.285951899999986},{"x":0.05779856121057492,"y":-7.375754461210704},{"x":-0.032004000000142696,"y":-7.412951899999939},{"x":-2.032000000000039,"y":-7.412951899999939},{"x":-2.1218025612107567,"y":-7.375754461210704},{"x":-2.158999999999992,"y":-7.285951899999986},{"x":-2.158999999999992,"y":-2.285961899999961},{"x":-2.032000000000039,"y":-2.1589619000000084},{"x":-1.9050000000000864,"y":-2.285961899999961}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-5.000104800000031,"y":2.5500335000000405},{"x":5.000104799999917,"y":2.5500335000000405},{"x":5.000104799999917,"y":-2.30},{"x":-5.000104800000031,"y":-2.30},{"x":-5.000104800000031,"y":2.5500335000000405}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3020419.obj?uuid=ef5d986769694ddda17bd35bc3d51600",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C3020419.step?uuid=ef5d986769694ddda17bd35bc3d51600",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012700000070253736, y: -0.000042999999959825175, z: -4.200006999999999 },
      }}
      {...props}
    />
  )
}
