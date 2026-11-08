// M3 mounting holes in the free space between the side jacks and the
// button / LED. Copper is kept clear of the screw head (M3 pan head ~5.5mm).
const M3_HOLES = [
  { name: "MH1", pcbX: -17.5, pcbY: 0.5 },
  { name: "MH2", pcbX: 17.5, pcbY: 0.5 },
]

export const MountingHoles = () => (
  <>
    {M3_HOLES.map(({ name, pcbX, pcbY }) => (
      <hole key={name} name={name} diameter="3.2mm" pcbX={pcbX} pcbY={pcbY} />
    ))}
    {M3_HOLES.map(({ name, pcbX, pcbY }) => (
      <keepout
        key={`${name}_keepout`}
        shape="circle"
        radius={3}
        pcbX={pcbX}
        pcbY={pcbY}
        layers={["top", "bottom"]}
      />
    ))}
  </>
)
