import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["VIN"],
  pin2: ["GND"],
  pin3: ["ON"],
  pin4: ["CT"],
  pin5: ["QOD"],
  pin6: ["VOUT"]
} as const

const pinAttributes = {
  pin1: {isInput: true, requiresPower: true, mustBeConnected: true},
  pin2: {isPassive: true, requiresGround: true, mustBeConnected: true},
  pin3: {isInput: true, mustBeConnected: true},
  pin6: {isOutput: true, providesPower: true},
  pin5: {isOutput: true},
  pin4: {isOutput: true}
} satisfies NonNullable<ChipProps["pinAttributes"]>

export const TPS22918DBVR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C131941"
  ]
}}
      manufacturerPartNumber="TPS22918DBVR"
      footprint="soic6_p0.95mm_w3.8mm_pl1.1mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C131941.obj?uuid=229b69761e2c45dba6a83d8866dec72d",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C131941.step?uuid=229b69761e2c45dba6a83d8866dec72d",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000025399999913133797, y: -0.0000889000000370288, z: -0.048939 },
      }}
      {...props}
    />
  )
}