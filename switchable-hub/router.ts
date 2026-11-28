import savedRoutes from "./routes.json"

type Connection = {
  netConnectionName?: string
  name: string
  source_trace_id?: string
  pointsToConnect: { x: number; y: number; layer: string }[]
}
type Copper = {
  pads: number[][]
  top: number[][]
  bottom: number[][]
  vias: number[][]
}

const coordinateKey = (x: number, y: number) => `${Math.round(x * 1000)},${Math.round(y * 1000)}`

// A set of positioned pads identifies a routed net without relying on generated
// source IDs. A moved pad or a change in connectivity invalidates the saved copper.
export async function switchableHubRouter(input: { connections: Connection[] }) {
  const byPads = new Map(
    input.connections
      .filter((c) => !c.netConnectionName)
      .map((connection) => [
        connection.pointsToConnect
          .map((p) => coordinateKey(p.x, p.y))
          .sort()
          .join("/"),
        connection,
      ]),
  )
  const routes = savedRoutes as Record<string, Copper>
  if (byPads.size !== Object.keys(routes).length)
    throw new Error("Switchable hub net count changed. Reroute the board.")
  const traces = Object.entries(routes).flatMap(([net, copper]) => {
    const key = copper.pads
      .map(([x, y]) => coordinateKey(x, y))
      .sort()
      .join("/")
    const connection = byPads.get(key)
    if (!connection || connection.pointsToConnect.some((p) => p.layer !== "top")) {
      throw new Error(
        `Switchable hub pad positions or connectivity changed on ${net}. Reroute the board.`,
      )
    }
    const ids = {
      source_trace_id: connection.source_trace_id ?? connection.name,
      connection_name: connection.name,
    }
    const segments = (["top", "bottom"] as const).flatMap((layer) =>
      copper[layer].map(([width, ...xy], i) => {
        const route = []
        for (let k = 0; k < xy.length; k += 2)
          route.push({ route_type: "wire", layer, width, x: xy[k], y: xy[k + 1] })
        return { type: "pcb_trace", pcb_trace_id: `sw_${net}_${layer}_${i}`, ...ids, route }
      }),
    )
    const vias = copper.vias.map(([x, y], i) => ({
      type: "pcb_trace",
      pcb_trace_id: `sw_${net}_via_${i}`,
      ...ids,
      route: [
        {
          route_type: "via",
          x,
          y,
          from_layer: "top",
          to_layer: "bottom",
          via_diameter: 0.6,
          via_hole_diameter: 0.3,
        },
      ],
    }))
    return [...segments, ...vias]
  })
  let complete: ((event: unknown) => void) | undefined
  return {
    input,
    isRouting: false,
    on(event: string, handler: (e: unknown) => void) {
      if (event === "complete") complete = handler
    },
    start() {
      complete?.({ type: "complete", traces })
    },
    stop() {},
    solveSync() {
      return traces
    },
  }
}
