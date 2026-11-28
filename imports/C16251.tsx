import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["USBDM_DN1","PRT_DIS_M1"],
  pin2: ["USBDP_DN1","PRT_DIS_P1"],
  pin3: ["USBDM_DN2","PRT_DIS_M2"],
  pin4: ["USBDP_DN2","PRT_DIS_P2"],
  pin5: ["VDDA331"],
  pin6: ["USBDM_DN3","PRT_DIS_M3"],
  pin7: ["USBDP_DN3","PRT_DIS_P3"],
  pin8: ["USBDM_DN4","PRT_DIS_M4"],
  pin9: ["USBDP_DN4","PRT_DIS_P4"],
  pin10: ["VDDA333"],
  pin11: ["TEST"],
  pin12: ["PRTPWR1","BC_EN1"],
  pin13: ["OCS_N1"],
  pin14: ["CRFILT"],
  pin15: ["VDD333"],
  pin16: ["PRTPWR2","BC_EN2"],
  pin17: ["OCS_N2"],
  pin18: ["PRTPWR3","BC_EN3"],
  pin19: ["OCS_N3"],
  pin20: ["PRTPWR4","BC_EN4"],
  pin21: ["OCS_N4"],
  pin22: ["SDA","SMBDATA","NON_REM1"],
  pin23: ["VDD331"],
  pin24: ["SCL","SMBCLK","CFG_SEL0"],
  pin25: ["HS_IND","CFG_SEL1"],
  pin26: ["RESET_N"],
  pin27: ["VBUS_DET"],
  pin28: ["SUSP_IND","LOCAL_PWR","NON_REM0"],
  pin29: ["VDDA332"],
  pin30: ["USBDM_UP"],
  pin31: ["USBDP_UP"],
  pin32: ["XTALOUT"],
  pin33: ["XTALIN","CLKIN"],
  pin34: ["PLLFILT"],
  pin35: ["RBIAS"],
  pin36: ["VDDA33_36"],
  pin37: ["EP"]
} as const

const pinAttributes = {pin5:{requiresPower:true},pin10:{requiresPower:true},pin15:{requiresPower:true},pin23:{requiresPower:true},pin29:{requiresPower:true},pin36:{requiresPower:true},pin37:{requiresGround:true}} as const

export const USB2514B_AEZC_TR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C16251"
  ]
}}
      manufacturerPartNumber="USB2514B-AEZC-TR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.999996mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-1.49987mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-0.999998mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-0.499872mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="0mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="0.500126mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0.999998mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="1.500124mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="1.999996mm" pcbY="-2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="1.999996mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="1.500124mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="0.999998mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="0.500126mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="0mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="-0.499872mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="-0.999998mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin26"]} pcbX="-1.49987mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin27"]} pcbX="-1.999996mm" pcbY="2.9718mm" width="0.2800096mm" height="1.0999978mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin36"]} pcbX="-2.9718mm" pcbY="-1.999996mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin35"]} pcbX="-2.9718mm" pcbY="-1.500124mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin34"]} pcbX="-2.9718mm" pcbY="-0.999998mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin33"]} pcbX="-2.9718mm" pcbY="-0.500126mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin32"]} pcbX="-2.9718mm" pcbY="0mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin31"]} pcbX="-2.9718mm" pcbY="0.499872mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin30"]} pcbX="-2.9718mm" pcbY="0.999998mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin29"]} pcbX="-2.9718mm" pcbY="1.49987mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin28"]} pcbX="-2.9718mm" pcbY="1.999996mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="2.9718mm" pcbY="1.999996mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="2.9718mm" pcbY="1.49987mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="2.9718mm" pcbY="0.999998mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="2.9718mm" pcbY="0.499872mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="2.9718mm" pcbY="0mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="2.9718mm" pcbY="-0.500126mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="2.9718mm" pcbY="-0.999998mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="2.9718mm" pcbY="-1.500124mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="2.9718mm" pcbY="-1.999996mm" width="1.0999978mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin37"]} pcbX="0mm" pcbY="0mm" width="4.0999918mm" height="4.0999918mm" shape="rect" />
<silkscreenpath route={[{"x":-2.500223599999998,"y":-3.199790400000012},{"x":-3.199993599999992,"y":-3.199790400000012},{"x":-3.199993599999992,"y":-2.500020399999997}]} />
<silkscreenpath route={[{"x":-3.199993599999992,"y":2.500223599999998},{"x":-3.199993599999992,"y":3.199993599999999},{"x":-2.499969599999993,"y":3.199993599999999}]} />
<silkscreenpath route={[{"x":3.1997903999999977,"y":-2.500020399999997},{"x":3.1997903999999977,"y":-3.199790400000012},{"x":2.500020400000004,"y":-3.199790400000012}]} />
<silkscreenpath route={[{"x":3.1997903999999977,"y":2.500223599999998},{"x":3.1997903999999977,"y":3.199993599999999},{"x":2.500020400000004,"y":3.199993599999999}]} />
<silkscreenpath route={[{"x":-3.025241599999994,"y":-3.5990783999999962},{"x":-3.173982655997669,"y":-3.7497204297039133},{"x":-3.023971599999996,"y":-3.8990978240147314},{"x":-2.873960544002337,"y":-3.7497204297039275},{"x":-3.0227015999999978,"y":-3.5990783999999962}]} />
<silkscreentext text="{NAME}" pcbX="-0.008128mm" pcbY="4.526028mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-3.771798899999993,"y":3.7717989000000074},{"x":3.771798899999993,"y":3.7717989000000074},{"x":3.771798899999993,"y":-3.7717989000000074},{"x":-3.771798899999993,"y":-3.7717989000000074},{"x":-3.771798899999993,"y":3.7717989000000074}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C16251.obj?uuid=a868fa497c2c4d2881485360e9d0d1ef",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C16251.step?uuid=a868fa497c2c4d2881485360e9d0d1ef",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.00008889999999439624, y: -0.00011429999999990059, z: -0.02 },
      }}
      {...props}
    />
  )
}