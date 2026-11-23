// M2 clearance holes; horizontal and vertical pitches are multiples of 10 mm.
export function DisplayMounts({
  spanX = 20,
  centerX = 0,
  centerY = 0,
  spanY = 20,
  layers = ["top", "bottom"],
}: {
  spanX?: number;
  centerX?: number;
  centerY?: number;
  spanY?: number;
  layers?: ("top" | "bottom" | "inner1" | "inner2")[];
} = {}) {
  if (![spanX, spanY].every((span) => span > 0 && span % 10 === 0))
    throw Error("Mount spacing must be a positive multiple of 10 mm");
  return (
    <>
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((y) => (
          <group key={`${x}_${y}`}>
            <hole
              name={`H${x}_${y}`}
              pcbX={centerX + (x * spanX) / 2}
              pcbY={centerY + (y * spanY) / 2}
              diameter={2.2}
            />
            <keepout
              shape="circle"
              pcbX={centerX + (x * spanX) / 2}
              pcbY={centerY + (y * spanY) / 2}
              radius={2.3}
              layers={layers}
            />
          </group>
        )),
      )}
    </>
  );
}
