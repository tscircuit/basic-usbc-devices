type NetGeometry = {
  anchor: number[];
  paths: (number | string)[][];
  vias: number[][];
};

type RoutingInput = {
  connections: {
    name: string;
    source_trace_id?: string;
    pointsToConnect: { x: number; y: number }[];
  }[];
};

// Map saved copper to the generated source trace for each physical net.
export function savedRouter(geometry: {
  viadia: number;
  drill: number;
  nets: Record<string, NetGeometry>;
}) {
  return async (input: RoutingInput) => {
    const traces = Object.entries(geometry.nets).flatMap(([name, net]) => {
      const [ax, ay] = net.anchor;
      const connection = input.connections.find((c) =>
        c.pointsToConnect.some((p) => Math.hypot(p.x - ax, p.y - ay) < 0.0001),
      );
      if (!connection)
        throw Error("No router connection at the saved pad for " + name);
      const source_trace_id = connection.source_trace_id ?? connection.name;
      const wires = net.paths.map(([layer, width, ...coordinates], i) => {
        const route = [];
        for (let j = 0; j < coordinates.length; j += 2)
          route.push({
            route_type: "wire",
            layer,
            width,
            x: coordinates[j],
            y: coordinates[j + 1],
          });
        return {
          type: "pcb_trace",
          pcb_trace_id: name + "_w" + i,
          source_trace_id,
          connection_name: source_trace_id,
          route,
        };
      });
      const vias = net.vias.map(([x, y], i) => ({
        type: "pcb_trace",
        pcb_trace_id: name + "_v" + i,
        source_trace_id,
        connection_name: source_trace_id,
        route: [
          {
            route_type: "via",
            x,
            y,
            from_layer: "top",
            to_layer: "bottom",
            via_diameter: geometry.viadia,
            via_hole_diameter: geometry.drill,
          },
        ],
      }));
      return [...wires, ...vias];
    });
    const handlers: Record<string, (event: unknown) => void> = {};
    return {
      input,
      isRouting: false,
      on(name: string, cb: (event: unknown) => void) {
        handlers[name] = cb;
      },
      start() {
        handlers.complete?.({ type: "complete", traces });
      },
      stop() {},
      solveSync() {
        return traces;
      },
    };
  };
}
