import type { ConnectorProps } from "@tscircuit/props"

// Locating-peg holes of the TYPE-C-31-M-12 footprint (local frame)
const LOCATING_HOLES = [
  { x: -2.9, y: 0.9056 },
  { x: 2.9, y: 0.9056 },
]

// Thin VBUS1 -> VBUS2 tie between the pad row and the locating holes, in the
// footprint's local frame. The plug shorts all four VBUS contacts, so one wide
// trace to either pad carries the current; the tie only has to exist.
const VBUS_TIE_PATH = [
  { x: 2.25, y: 1.52 },
  { x: 1.95, y: 1.2 },
  { x: -1.95, y: 1.2 },
  { x: -2.25, y: 1.52 },
]

// HRO TYPE-C-31-M-12, 16-pin USB 2.0 receptacle (mouth faces -Y unrotated).
// The VBUS pads sit right next to the locating holes; small keepouts stop the
// router from squeezing a trace past a hole.
export const UsbC = ({
  name,
  pcbX = 0,
  pcbY = 0,
  pcbRotation = 0,
  ...props
}: ConnectorProps & { pcbX?: number; pcbY?: number; pcbRotation?: number }) => {
  const theta = (pcbRotation * Math.PI) / 180
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  return (
    <>
      <connector
        name={name}
        standard="usb_c"
        supplierPartNumbers={{ jlcpcb: ["C165948"] }}
        pcbX={pcbX}
        pcbY={pcbY}
        pcbRotation={pcbRotation}
        {...props}
      />
      <trace
        from={`.${name} > .VBUS1`}
        to={`.${name} > .VBUS2`}
        pcbPath={VBUS_TIE_PATH}
        thickness="0.25mm"
      />
      {LOCATING_HOLES.map((hole, i) => (
        <keepout
          key={i}
          shape="circle"
          radius={0.45}
          pcbX={pcbX + hole.x * cos - hole.y * sin}
          pcbY={pcbY + hole.x * sin + hole.y * cos}
          layers={["top", "bottom"]}
          allowPlacements
        />
      ))}
    </>
  )
}
