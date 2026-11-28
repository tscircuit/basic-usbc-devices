import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["D_POS"],
  pin2: ["D_NEG"],
  pin3: ["GND"]
} as const

const pinAttributes = {pin1:{isPassive:true},pin2:{isPassive:true},pin3:{isPassive:true,requiresGround:true}} as const

export const TPD2EUSB30DRTR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      symbol={
        <symbol>
          <schematicrect schX={0} schY={0} width={1.6} height={1.6} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0.12},{"x":0,"y":0.12}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0,"y":0.12},{"x":0.1,"y":0.12}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.14,"y":0.16},{"x":0.1,"y":0.12}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.1,"y":-0.08},{"x":0,"y":0.12},{"x":-0.1,"y":-0.08},{"x":0.1,"y":-0.08}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.8,"y":0},{"x":-0.4,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.5,"y":0.4},{"x":-0.4,"y":0.4}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.4,"y":0.4},{"x":-0.3,"y":0.4}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.3,"y":0.2},{"x":-0.4,"y":0.4},{"x":-0.5,"y":0.2},{"x":-0.3,"y":0.2}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.5,"y":-0.2},{"x":-0.4,"y":-0.2}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.4,"y":-0.2},{"x":-0.3,"y":-0.2}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.3,"y":-0.4},{"x":-0.4,"y":-0.2},{"x":-0.5,"y":-0.4},{"x":-0.3,"y":-0.4}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematiccircle center={{ x: -0.4, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":-0.4,"y":-0.6},{"x":-0.4,"y":0.6}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.8,"y":0},{"x":0.4,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.5,"y":0.4},{"x":0.4,"y":0.4}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.4,"y":0.4},{"x":0.3,"y":0.4}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.3,"y":0.2},{"x":0.4,"y":0.4},{"x":0.5,"y":0.2},{"x":0.3,"y":0.2}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.5,"y":-0.2},{"x":0.4,"y":-0.2}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.4,"y":-0.2},{"x":0.3,"y":-0.2}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.3,"y":-0.4},{"x":0.4,"y":-0.2},{"x":0.5,"y":-0.4},{"x":0.3,"y":-0.4}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematiccircle center={{ x: 0.4, y: 0 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":0.4,"y":-0.6},{"x":0.4,"y":0.6}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.8},{"x":0,"y":0.6}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":0.6},{"x":-0.4,"y":0.6}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":-0.6},{"x":-0.4,"y":-0.6}]} strokeColor="#880000" />
          <schematiccircle center={{ x: 0, y: 0.6 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <schematiccircle center={{ x: 0, y: -0.6 }} radius={0.02} strokeWidth={0.02} color="#880000" />
          <port name="pin2" pinNumber={2} aliases={["D_NEG"]} direction="left" schX={-1} schY={0} schStemLength={0.2} />
          <port name="pin1" pinNumber={1} aliases={["D_POS"]} direction="right" schX={1} schY={0} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["GND"]} direction="down" schX={0} schY={-1} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.1,"y":0.12},{"x":-0.14,"y":0.08}]} strokeColor="#8D2323" />
          <schematictext schX={-0.44} schY={-0.768125} text="GND" fontSize={0.2} anchor="left" color="#0000FF" schRotation={0} />
          <schematictext schX={-0.001} schY={1} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C97502"
  ]
}}
      manufacturerPartNumber="TPD2EUSB30DRTR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="0.499999mm" pcbY="-0.350012mm" width="0.2999994mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.499999mm" pcbY="0.350012mm" width="0.2999994mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.499999mm" pcbY="0mm" width="0.2999994mm" height="0.1999996mm" shape="rect" />
<silkscreenpath route={[{"x":0.3998467999999775,"y":0.018872200000146222},{"x":0.3998467999999775,"y":-0.018846799999892028}]} />
<silkscreenpath route={[{"x":-0.40010080000013204,"y":0.4999990000000025},{"x":-0.40010080000013204,"y":0.3311398000000736}]} />
<silkscreenpath route={[{"x":-0.40010080000013204,"y":-0.3311397999999599},{"x":-0.40010080000013204,"y":-0.49999899999988884}]} />
<silkscreenpath route={[{"x":-0.40010080000013204,"y":0.4999990000000025},{"x":0.12428219999992507,"y":0.4999990000000025}]} />
<silkscreenpath route={[{"x":-0.40010080000013204,"y":-0.49999899999988884},{"x":0.12428219999992507,"y":-0.49999899999988884}]} />
<silkscreentext text="{NAME}" pcbX="0.101473mm" pcbY="1.508mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-0.8999987000000829,"y":0.7480940000000373},{"x":0.8999986999999692,"y":0.7480940000000373},{"x":0.8999986999999692,"y":-0.7481193999999505},{"x":-0.8999987000000829,"y":-0.7481193999999505},{"x":-0.8999987000000829,"y":0.7480940000000373}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C97502.obj?uuid=7e46175b4c3341ab8d7b74e33c98b337",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C97502.step?uuid=7e46175b4c3341ab8d7b74e33c98b337",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012700000070253736, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}