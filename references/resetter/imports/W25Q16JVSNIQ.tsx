import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_CS"],
  pin2: ["DO","IO1"],
  pin3: ["N_WP","IO2"],
  pin4: ["GND"],
  pin5: ["DI","IO0"],
  pin6: ["CLK"],
  pin7: ["N_HOLD","N_RESET","IO3"],
  pin8: ["VCC"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin8: {requiresPower: true}
} as const

export const W25Q16JVSNIQ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2456211"
  ]
}}
      manufacturerPartNumber="W25Q16JVSNIQ"
      footprint="dfn8_pillpads_w7.22mm_pw0.63mm_pl1.86mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2456211.obj?uuid=a8bf75347d3a44d9bc6814f39c22bf07",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2456211.step?uuid=a8bf75347d3a44d9bc6814f39c22bf07",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.0099948999999242, y: -0.06982459999994717, z: -0.8 },
      }}
      {...props}
    />
  )
}