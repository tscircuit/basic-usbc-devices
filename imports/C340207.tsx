import type { InductorProps } from "@tscircuit/props"

export const ASWPA4035S2R2MT = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="2.2uH"
      supplierPartNumbers={{
  "jlcpcb": [
    "C340207"
  ]
}}
      manufacturerPartNumber="ASWPA4035S2R2MT"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.500124mm" pcbY="0mm" width="1.499997mm" height="3.6999926mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.500124mm" pcbY="0mm" width="1.499997mm" height="3.6999926mm" shape="rect" />
<silkscreenpath route={[{"x":-0.609142800000086,"y":2.032000000000039},{"x":0.6091427999999723,"y":2.032000000000039}]} />
<silkscreenpath route={[{"x":-0.609142800000086,"y":-2.032000000000039},{"x":0.6091427999999723,"y":-2.032000000000039}]} />
<silkscreentext text="{NAME}" pcbX="-0mm" pcbY="3.032mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.500122499999975,"y":2.2499959999998964},{"x":2.500122499999975,"y":2.2499959999998964},{"x":2.500122499999975,"y":-2.2499959999998964},{"x":-2.500122499999975,"y":-2.2499959999998964},{"x":-2.500122499999975,"y":2.2499959999998964}]} />
      </footprint>}
      cadModel={{
        // Nominal envelope and terminations from the Sunlord ASWPA4035S drawing.
        objUrl: "https://raw.githubusercontent.com/tscircuit/basic-usbc-devices/f4af684de703843c12220b64ed5d30eb2bc95835/mechanical/aswpa4035s.obj",
        stepUrl: "https://raw.githubusercontent.com/tscircuit/basic-usbc-devices/f4af684de703843c12220b64ed5d30eb2bc95835/mechanical/aswpa4035s.step",
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}