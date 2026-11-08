const slot = 1.6
const halfTab = 2.3
const biteDiameter = 0.6

export const panelId = "pcb_panel_0"
export const panel = {
  type: "pcb_panel",
  pcb_panel_id: panelId,
  center: { x: 0, y: 0 },
  width: 104.2,
  height: 92.2,
  thickness: 1.6,
  covered_with_solder_mask: true,
}

function hole(id: string, x: number, y: number, diameter: number) {
  return {
    type: "pcb_hole",
    pcb_hole_id: id,
    pcb_panel_id: panelId,
    hole_shape: "circle",
    hole_diameter: diameter,
    x, y,
  }
}

export function machiningForBoard(name: string, x: number, y: number) {
  // Route one L-shaped opening around each corner. Leave the tabs away
  // from the USB-C receptacles on the top and side edges.
  const slots = [-1, 1].flatMap((sx) =>
    [-1, 1].map((sy) => {
      const horizontalEnd = sx * (sy > 0 ? -10 : 0) + halfTab
      const verticalEnd = sy * 6 + halfTab
      const points = [
        [horizontalEnd, 18], [21, 18], [21, verticalEnd],
        [21 + slot, verticalEnd], [21 + slot, 18 + slot],
        [horizontalEnd, 18 + slot],
      ].map(([u, v]) => ({ x: x + sx * u, y: y + sy * v }))
      return {
        type: "pcb_cutout",
        pcb_cutout_id: `panel_slot_${name}_${sx}_${sy}`,
        pcb_panel_id: panelId,
        shape: "polygon",
        points,
      }
    }),
  )
  // The hole nearest the finished PCB is tangent to the board edge.
  const bites = [-1.5, -0.5, 0.5, 1.5].flatMap((offset, i) => [
    hole(`panel_bite_${name}_top_${i}`, x - 10 + offset, y + 18.3, biteDiameter),
    hole(`panel_bite_${name}_bottom_${i}`, x + offset, y - 18.3, biteDiameter),
    hole(`panel_bite_${name}_left_${i}`, x - 21.3, y + 6 + offset, biteDiameter),
    hole(`panel_bite_${name}_right_${i}`, x + 21.3, y + 6 + offset, biteDiameter),
  ])
  return [...slots, ...bites]
}

export const tooling = [
  ...[-47, 47].flatMap((x) => [-41.75, 41.75].map((y) => hole(`panel_tool_${x}_${y}`, x, y, 2))),
  ...[[-37, -42.25], [37, -42.25], [-37, 42.25]].map(([x, y], i) => ({
    type: "pcb_smtpad",
    pcb_smtpad_id: `panel_fiducial_${i}`,
    pcb_panel_id: panelId,
    layer: "top",
    shape: "circle",
    radius: 0.5,
    soldermask_margin: 0.5,
    is_covered_with_solder_mask: false,
    x, y,
  })),
]
