import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"]
} as const

export const A_1MS1T1B1M1QES_5 = (props: SwitchProps) => {
  return (
    <switch type="spdt"
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C496154"
  ]
}}
      manufacturerPartNumber="1MS1T1B1M1QES-5"
      footprint={<footprint>
        <platedhole  portHints={["pin1"]} pcbX="0mm" pcbY="-4.700016mm" holeWidth="0.999998mm" holeHeight="2.1999956mm" outerWidth="1.5999968mm" outerHeight="2.999994mm" pcbRotation="90deg" shape="pill" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="0mm" holeWidth="0.999998mm" holeHeight="2.1999956mm" outerWidth="1.5999968mm" outerHeight="2.999994mm" pcbRotation="90deg" shape="pill" />
<platedhole  portHints={["pin3"]} pcbX="0mm" pcbY="4.700016mm" holeWidth="0.999998mm" holeHeight="2.1999956mm" outerWidth="1.5999968mm" outerHeight="2.999994mm" pcbRotation="90deg" shape="pill" />
<silkscreenpath route={[{"x":0.2999993999999333,"y":-1.0999977999999828},{"x":0.5999987999999803,"y":-2.999994000000015}]} />
<silkscreenpath route={[{"x":-3.4500057999999854,"y":6.400012600000082},{"x":-3.4500057999999854,"y":-6.400012599999968}]} />
<silkscreenpath route={[{"x":3.4500057999999854,"y":6.400012600000082},{"x":3.4500057999999854,"y":-6.400012599999968}]} />
<silkscreenpath route={[{"x":-3.4500057999999854,"y":-6.400012599999968},{"x":3.4500057999999854,"y":-6.400012599999968}]} />
<silkscreenpath route={[{"x":-3.4500057999999854,"y":6.400012600000082},{"x":3.4500057999999854,"y":6.400012600000082}]} />
<silkscreenpath route={[{"x":-0.299999400000047,"y":-1.0999977999999828},{"x":-0.5999987999999803,"y":-2.999994000000015}]} />
<silkscreenpath route={[{"x":-0.5977636000002349,"y":-2.9836871999998493},{"x":-0.49129357110621186,"y":-3.1791872901635543},{"x":-0.3236809976403947,"y":-3.3256870428012917},{"x":-0.11569117175770316,"y":-3.4050368042125},{"x":0.10690833188755278,"y":-3.407406041138074},{"x":0.316539965673428,"y":-3.332501232060281},{"x":0.487232753613398,"y":-3.189602231182107},{"x":0.5978397999998606,"y":-2.9964125999998714}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="7.4008mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.549993400000062,"y":6.600000000000023},{"x":3.5499933999999485,"y":6.600000000000023},{"x":3.5499933999999485,"y":-6.599974599999996},{"x":-3.549993400000062,"y":-6.599974599999996},{"x":-3.549993400000062,"y":6.600000000000023}]} />
      </footprint>}

      {...props}
    />
  )
}
