import type { ConnectorProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"],
  pin9: ["pin9"],
  pin10: ["pin10"],
  pin11: ["pin11"],
  pin12: ["pin12"],
  pin13: ["pin13"],
  pin14: ["pin14"],
  pin15: ["pin15"],
  pin16: ["pin16"],
  pin17: ["pin17"],
  pin18: ["pin18"],
  pin19: ["pin19"],
  pin20: ["pin20"],
  pin21: ["pin21"],
  pin22: ["pin22"],
  pin23: ["pin23"],
  pin24: ["pin24"],
  pin25: ["pin25"],
  pin26: ["pin26"]
} as const

export const A_0_5K_AS_24PWB = (props: ConnectorProps) => {
  return (
    <connector
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2911766"
  ]
}}
      manufacturerPartNumber="0.5K-AS-24PWB"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="5.750052mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="5.25018mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="4.750054mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="4.250182mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="3.750056mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="3.250184mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="2.750058mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="2.250186mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.75006mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="1.250188mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0.750062mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="0.25019mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-0.249936mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-0.750062mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="-1.249934mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-1.75006mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="-2.249932mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="-2.750058mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="-3.24993mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="-3.750056mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="-4.249928mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="-4.750054mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="-5.249926mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="-5.750052mm" pcbY="1.59992695mm" width="0.2999994mm" height="1.2500102mm" shape="rect" />
<smtpad portHints={["pin25"]} pcbX="-7.290054mm" pcbY="-0.72493505mm" width="1.999996mm" height="2.999994mm" shape="rect" />
<smtpad portHints={["pin26"]} pcbX="7.290054mm" pcbY="-0.72493505mm" width="1.999996mm" height="2.999994mm" shape="rect" />
<silkscreenpath route={[{"x":-8.819997599999965,"y":-3.5190620499998886},{"x":-8.819997599999965,"y":-2.229504049999946},{"x":-8.521141199999875,"y":-2.229504049999946}]} />
<silkscreenpath route={[{"x":8.820073800000046,"y":-3.5190620499998886},{"x":-8.819997599999965,"y":-3.5190620499998886}]} />
<silkscreenpath route={[{"x":-6.058992199999921,"y":-2.227522850000014},{"x":6.058890600000041,"y":-2.227522850000014}]} />
<silkscreenpath route={[{"x":8.820073800000046,"y":-2.227522850000014},{"x":8.820073800000046,"y":-3.5190620499998886}]} />
<silkscreenpath route={[{"x":8.521141200000102,"y":-2.227522850000014},{"x":8.820073800000046,"y":-2.227522850000014}]} />
<silkscreencircle pcbX="6.494018mm" pcbY="2.36192695mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="0.011176mm" pcbY="3.50086495mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-9.08000519999996,"y":2.4749320500000067},{"x":9.079979800000046,"y":2.4749320500000067},{"x":9.079979800000046,"y":-3.7305048499998748},{"x":-9.08000519999996,"y":-3.7305048499998748},{"x":-9.08000519999996,"y":2.4749320500000067}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2911766.obj?uuid=4cbcd557a0f14711935c6d39d1c89a6e",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2911766.step?uuid=4cbcd557a0f14711935c6d39d1c89a6e",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012699999956566899, y: 0.8305101499998955, z: -1.01 },
      }}
      {...props}
    />
  )
}