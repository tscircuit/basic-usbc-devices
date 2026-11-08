import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["EH2"],
  pin5: ["EH1"]
} as const

export const RK09K1130A5R = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-0.8} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={0} schY={0.4} schStemLength={0.2} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.8} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":0,"y":0.1},{"x":-0.02,"y":0.18}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.2},{"x":0,"y":0.2},{"x":0,"y":0.1},{"x":0.02,"y":0.18}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.3,"y":0},{"x":0.6,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.3,"y":0},{"x":-0.6,"y":0}]} strokeColor="#880000" />
          <schematicrect schX={0} schY={0} width={0.6} height={0.2} strokeWidth={0.02} color="#880000" />
          <port name="pin4" pinNumber={4} aliases={["EH2"]} direction="left" schX={-0.8} schY={-0.2} schStemLength={0.2} />
          <port name="pin5" pinNumber={5} aliases={["EH1"]} direction="right" schX={0.8} schY={-0.2} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.6,"y":-0.2},{"x":0.6,"y":-0.2}]} strokeColor="#880000" />
          <schematictext schX={0} schY={0.62} text="{NAME}" fontSize={0.2} anchor="bottom_center" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C209779"
  ]
}}
      manufacturerPartNumber="RK09K1130A5R"
      footprint={<footprint>
        <platedhole  portHints={["pin5"]} pcbX="-4.400042mm" pcbY="3.84999225mm" holeWidth="1.999996mm" holeHeight="2.2999954mm" outerWidth="2.999994mm" outerHeight="3.2999934mm" shape="pill" />
<platedhole  portHints={["pin4"]} pcbX="4.400042mm" pcbY="3.84999225mm" holeWidth="1.999996mm" holeHeight="2.2999954mm" outerWidth="2.999994mm" outerHeight="3.2999934mm" shape="pill" />
<platedhole  portHints={["pin3"]} pcbX="2.500122mm" pcbY="-3.14999375mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="-3.14999375mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
<platedhole  portHints={["pin1"]} pcbX="-2.499868mm" pcbY="-3.14999375mm" outerDiameter="1.499997mm" holeDiameter="0.999998mm" shape="circle" />
<silkscreenpath route={[{"x":4.900040999999987,"y":5.657227649999982},{"x":4.900040999999987,"y":9.349981250000042},{"x":-4.849926800000048,"y":9.349981250000042}]} />
<silkscreenpath route={[{"x":3.131337399999893,"y":-2.400007950000031},{"x":4.900040999999987,"y":-2.400007950000031},{"x":4.900040999999987,"y":2.0427568499999325}]} />
<silkscreenpath route={[{"x":0.6312153999999737,"y":-2.400007950000031},{"x":1.8690081999999393,"y":-2.400007950000031}]} />
<silkscreenpath route={[{"x":-1.8686526000000185,"y":-2.400007950000031},{"x":-0.6311138000000938,"y":-2.400007950000031}]} />
<silkscreenpath route={[{"x":-4.899939399999994,"y":2.0427568499999325},{"x":-4.899939399999994,"y":-2.400007950000031},{"x":-3.130981800000086,"y":-2.400007950000031}]} />
<silkscreenpath route={[{"x":-4.899939399999994,"y":9.349981250000042},{"x":-4.899939399999994,"y":5.657227649999982}]} />
<silkscreencircle pcbX="0.004064mm" pcbY="3.84999225mm" radius="2.549906mm" />
<silkscreentext text="{NAME}" pcbX="-0.006858mm" pcbY="10.36179225mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":2.42712240000003,"y":3.849992250000014},{"x":2.2184346292099235,"y":4.833651256710027},{"x":1.8070843791804236,"y":5.468630345234033},{"x":0.9946729206812961,"y":6.0611868819948995},{"x":0.011661149708288576,"y":6.2729024583882165},{"x":-0.7360017875492986,"y":6.157111252704794},{"x":-1.6089219114699063,"y":5.657965898711154},{"x":-2.204034441932208,"y":4.847424904531408},{"x":-2.418845258006513,"y":3.865084871520139},{"x":-2.3054096150200394,"y":3.1170609240676868},{"x":-1.8090162604178204,"y":2.242572922625868},{"x":-1.0003537721465818,"y":1.6449103027289311},{"x":-0.2713268095443482,"y":1.4426056837488659},{"x":0.7296823131573547,"y":1.5380853330324271},{"x":1.6057295160967442,"y":2.031721763395126},{"x":2.0884129730688983,"y":2.6143229575473015},{"x":2.410536200000024,"y":3.566883849999954},{"x":2.5516500077504816,"y":3.679504667868173},{"x":2.662783599999898,"y":3.537216649999891},{"x":2.357799404439561,"y":2.574668167266509},{"x":1.7179711072744794,"y":1.7935569771658493},{"x":0.8343231095485635,"y":1.3050069211136588},{"x":-0.16743347204794645,"y":1.1785209836280046},{"x":-1.1447849455834103,"y":1.4320935340595042},{"x":-1.9586895823903205,"y":2.0296503793368856},{"x":-2.493358220907112,"y":2.886180815538978},{"x":-2.6578683582052918,"y":4.13324949577202},{"x":-2.3636075749155907,"y":5.099130198846524},{"x":-1.7325056234726617,"y":5.887308648208659},{"x":-0.8543454618707074,"y":6.385655587327051},{"x":0.14594251358835209,"y":6.523274289929304},{"x":1.1260535404531993,"y":6.280586597262527},{"x":1.9465533055301876,"y":5.692118181234832},{"x":2.4907143992888905,"y":4.841586791341797},{"x":2.6811224000000493,"y":3.849992250000014},{"x":2.554122399999983,"y":3.7229922499999475},{"x":2.42712240000003,"y":3.849992250000014}]} strokeWidth="0mm" isFilled hasStroke={false} />
<courtyardoutline outline={[{"x":-6.1500389999999925,"y":9.606966250000028},{"x":6.1500389999999925,"y":9.606966250000028},{"x":6.1500389999999925,"y":-4.149992250000082},{"x":-6.1500389999999925,"y":-4.149992250000082},{"x":-6.1500389999999925,"y":9.606966250000028}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C209779.obj?uuid=ea51a10892da4a269037d2cc2c9ea23f",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C209779.step?uuid=ea51a10892da4a269037d2cc2c9ea23f",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.00005080000005364127, y: -3.846981449999994, z: -9.500008000000001 },
      }}
      {...props}
    />
  )
}