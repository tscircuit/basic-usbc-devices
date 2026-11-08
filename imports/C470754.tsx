import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["A"],
  pin9: ["C"],
  pin10: ["B"],
  pin11: ["D"],
  pin12: ["E"]
} as const

export const EC11E15244B2 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin7" pinNumber={7} aliases={["7"]} direction="left" schX={-0.6} schY={0} schStemLength={0.26} />
          <port name="pin6" pinNumber={6} aliases={["6"]} direction="right" schX={0.6} schY={0} schStemLength={0.26} />
          <port name="pin12" pinNumber={12} aliases={["E"]} direction="up" schX={0.2} schY={0.6} schStemLength={0.2} />
          <port name="pin11" pinNumber={11} aliases={["D"]} direction="up" schX={-0.2} schY={0.6} schStemLength={0.2} />
          <port name="pin9" pinNumber={9} aliases={["C"]} direction="down" schX={0} schY={-0.6} schStemLength={0.2} />
          <port name="pin10" pinNumber={10} aliases={["B"]} direction="down" schX={0.2} schY={-0.6} schStemLength={0.2} />
          <port name="pin8" pinNumber={8} aliases={["A"]} direction="down" schX={-0.2} schY={-0.6} schStemLength={0.2} />
          <schematicpath points={[{"x":0.2,"y":0.3},{"x":0.2,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":0.3},{"x":-0.2,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.26},{"x":0.2,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.26},{"x":0,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":-0.26},{"x":-0.2,"y":-0.4},{"x":-0.2,"y":-0.4}]} strokeColor="#880000" />
          <schematiccircle center={{ x: 0, y: 0.02 }} radius={0.23} strokeWidth={0.02} color="#880000" />
          <schematicpath points={[{"x":-0.34,"y":-0.34},{"x":-0.28,"y":-0.34},{"x":-0.26,"y":-0.34},{"x":-0.26,"y":-0.26},{"x":0.26,"y":-0.26},{"x":0.26,"y":-0.34},{"x":0.34,"y":-0.34},{"x":0.34,"y":0.38},{"x":0.26,"y":0.38},{"x":0.26,"y":0.3},{"x":-0.26,"y":0.3},{"x":-0.26,"y":0.38},{"x":-0.34,"y":0.38},{"x":-0.34,"y":-0.34}]} strokeColor="#880000" />
          <schematictext schX={0} schY={0.84} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C470754"
  ]
}}
      manufacturerPartNumber="EC11E15244B2"
      pinAttributes={{pin6:{isPassive:true},pin7:{isPassive:true},pin8:{isPassive:true},pin9:{isPassive:true,requiresGround:true},pin10:{isPassive:true},pin11:{isPassive:true},pin12:{isPassive:true}}}
      footprint={<footprint>
        {/* ALPS EC11E drawing 3; catalog footprint had incorrect pitch/anchors. */}
        {[[-2.5,-7.5,8],[0,-7.5,9],[2.5,-7.5,10],[-2.5,7,11],[2.5,7,12]].map(([x,y,p])=><platedhole portHints={['pin'+p]} pcbX={x} pcbY={y} holeDiameter={1.1} outerDiameter={1.7} shape="circle"/>)}
        {[-1,1].map((s,i)=><platedhole portHints={['pin'+(6+i)]} pcbX={s*5.5} pcbY={0} holeWidth={1.6} holeHeight={2.8} outerWidth={2.2} outerHeight={3.4} shape="pill"/>)}
        <silkscreenrect pcbX={0} pcbY={0} width={11.7} height={12}/>
        <courtyardoutline outline={[[-6.1,-6.25],[-3.6,-6.25],[-3.6,-8.6],[3.6,-8.6],[3.6,-6.25],[6.1,-6.25],[6.1,-1.95],[6.85,-1.95],[6.85,1.95],[6.1,1.95],[6.1,6.25],[3.6,6.25],[3.6,8.1],[-3.6,8.1],[-3.6,6.25],[-6.1,6.25],[-6.1,1.95],[-6.85,1.95],[-6.85,-1.95],[-6.1,-1.95],[-6.1,-6.25]].map(([x,y])=>({x,y}))}/>
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C470754.obj?uuid=98040a81456e4e72ba6314de5f862cda",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C470754.step?uuid=98040a81456e4e72ba6314de5f862cda",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012700000070253736, y: -0.24998729999992975, z: -0.000006999999999646178 },
      }}
      {...props}
    />
  )
}