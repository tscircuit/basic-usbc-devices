import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["IN1"],
  pin2: ["IN2"],
  pin3: ["CHG"],
  pin4: ["EN"],
  pin5: ["N_FAULT"],
  pin6: ["N_SINK"],
  pin7: ["N_POL"],
  pin8: ["REF"],
  pin9: ["CC1"],
  pin10: ["GND"],
  pin11: ["CC2"],
  pin12: ["OUT"],
  pin13: ["pin13"]
} as const

const pinAttributes = {
        pin1:{requiresPower:true}, pin2:{requiresPower:true}, pin10:{requiresGround:true},
        pin12:{providesPower:true,providesVoltage:5}, pin13:{requiresGround:true}
      } as const

export const TPS25821DSSR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2861545"
  ]
}}
      manufacturerPartNumber="TPS25821DSSR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.249934mm" pcbY="-0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-1.249934mm" pcbY="0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.750062mm" pcbY="-0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-0.750062mm" pcbY="0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.249936mm" pcbY="-0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-0.249936mm" pcbY="0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.249936mm" pcbY="-0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="0.249936mm" pcbY="0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.750062mm" pcbY="-0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="0.750062mm" pcbY="0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.249934mm" pcbY="-0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.249934mm" pcbY="0.947547mm" width="0.2599944mm" height="0.5050028mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="0mm" pcbY="-0.000127mm" width="2.6500074mm" height="0.999998mm" shape="rect" />
<silkscreenpath route={[{"x":-1.5500349999999798,"y":1.0999977999999828},{"x":-1.5999459999999317,"y":1.0999977999999828}]} />
<silkscreenpath route={[{"x":1.5501112000000603,"y":-1.0999724000000697},{"x":1.6000222000000122,"y":-1.0999724000000697},{"x":1.6000222000000122,"y":1.0999977999999828},{"x":1.5501112000000603,"y":1.0999977999999828}]} />
<silkscreenpath route={[{"x":-1.5999459999999317,"y":1.0999977999999828},{"x":-1.5999459999999317,"y":-1.0999724000000697},{"x":-1.5500349999999798,"y":-1.0999724000000697}]} />
<silkscreencircle pcbX="-1.599946mm" pcbY="-1.400175mm" radius="0.100076mm" />
<silkscreentext text="{NAME}" pcbX="-0.0508mm" pcbY="2.193673mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.7499970000000076,"y":1.4500484000000142},{"x":1.7499970000001213,"y":1.4500484000000142},{"x":1.7499970000001213,"y":-1.450048400000128},{"x":-1.7499970000000076,"y":-1.450048400000128},{"x":-1.7499970000000076,"y":1.4500484000000142}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2861545.obj?uuid=e673532f99fb4687aa199193162a47d0",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2861545.step?uuid=e673532f99fb4687aa199193162a47d0",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.02 },
      }}
      {...props}
    />
  )
}