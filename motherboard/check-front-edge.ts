import assert from "node:assert/strict";
import type { AnyCircuitElement } from "circuit-json";

/** Check the transformed mechanical outlines on the assembled PCB. */
export function checkFrontEdge(data: AnyCircuitElement[]) {
  const board = data.find((e) => e.type === "pcb_board");
  assert(board?.height);
  const front = board.center.y - board.height / 2;

  function placement(name: string) {
    const source = data.find(
      (e) => e.type === "source_component" && e.name === name,
    );
    assert(source?.type === "source_component", name);
    const part = data.find(
      (e) =>
        e.type === "pcb_component" &&
        e.source_component_id === source.source_component_id,
    );
    assert(part?.type === "pcb_component", name);
    return part;
  }

  function frontOfDrawing(partId: string) {
    const points = data.flatMap((e) =>
      e.type === "pcb_fabrication_note_path" && e.pcb_component_id === partId
        ? e.route
        : [],
    );
    assert(points.length, "Missing front-edge mechanical drawing");
    return Math.min(...points.map((point) => point.y));
  }

  const socket = placement("J_SD");
  const power = placement("SW_POWER");
  const consolePort = placement("J1");
  // The TF-01A accepts a card from local -Y. Its mouth must reach the front panel.
  assert.equal(socket.rotation, 0);
  assert(
    Math.abs(frontOfDrawing(socket.pcb_component_id) - front) < 0.5,
    "microSD mouth is recessed or on the wrong edge",
  );
  assert(
    frontOfDrawing(power.pcb_component_id) < front,
    "Power lever must project beyond the front edge",
  );
  assert(
    consolePort.center.x + consolePort.width / 2 <
      power.center.x - power.width / 2,
  );
  assert(power.center.x + power.width / 2 < socket.center.x - socket.width / 2);
}
