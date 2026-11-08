import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const K2_1102SP_Q4SC_04 = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2930544"
  ]
}}
      manufacturerPartNumber="K2-1102SP-Q4SC-04"
      footprint={<footprint>
        <smtpad portHints={["pin4"]} pcbX="4.19989mm" pcbY="-2.250186mm" width="1.999996mm" height="1.2999974mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="4.19989mm" pcbY="2.250186mm" width="1.999996mm" height="1.2999974mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-4.19989mm" pcbY="-2.250186mm" width="1.999996mm" height="1.2999974mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-4.19989mm" pcbY="2.250186mm" width="1.999996mm" height="1.2999974mm" shape="rect" />
<silkscreenpath route={[{"x":-2.999994000000015,"y":2.999994000000015},{"x":2.999994000000129,"y":2.999994000000015},{"x":2.999994000000129,"y":-2.999994000000015},{"x":-2.999994000000015,"y":-2.999994000000015},{"x":-2.999994000000015,"y":2.999994000000015}]} />
<silkscreencircle pcbX="1.999996mm" pcbY="-2.00025mm" radius="0.36068mm" />
<silkscreencircle pcbX="-1.999996mm" pcbY="-2.00025mm" radius="0.36068mm" />
<silkscreencircle pcbX="-1.999996mm" pcbY="1.999742mm" radius="0.36068mm" />
<silkscreencircle pcbX="1.999996mm" pcbY="1.999742mm" radius="0.36068mm" />
<silkscreencircle pcbX="0mm" pcbY="0mm" radius="1.400048mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="4.0226mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.449887999999987,"y":3.249994000000015},{"x":5.449887999999987,"y":3.249994000000015},{"x":5.449887999999987,"y":-3.249994000000015},{"x":-5.449887999999987,"y":-3.249994000000015},{"x":-5.449887999999987,"y":3.249994000000015}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2930544.obj?uuid=e31e79b02e4346b1bb81607866957ab0",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2930544.step?uuid=e31e79b02e4346b1bb81607866957ab0",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...restProps}
    />
  )
}