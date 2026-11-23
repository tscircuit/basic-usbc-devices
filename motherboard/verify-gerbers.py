"""Compare the four plotted copper films and through drills with the source netlist."""

from collections import defaultdict
from itertools import groupby
import json
from pathlib import Path
import warnings

from gerbonara import ExcellonFile, GerberFile
from gerbonara.graphic_primitives import ArcPoly, Circle, Line, Rectangle
from gerbonara.utils import MM
from shapely.affinity import rotate
from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import unary_union
from shapely.strtree import STRtree

OUTPUT = Path(__file__).resolve().parents[1] / "dist/motherboard"
FILMS = {"top": "F_Cu", "inner1": "In1_Cu", "inner2": "In2_Cu", "bottom": "B_Cu"}


class Connectivity:
    def __init__(self):
        self.parent = {}

    def root(self, key):
        while key in self.parent:
            key = self.parent[key]
        return key

    def join(self, keys):
        roots = list(dict.fromkeys(self.root(key) for key in keys))
        for other in roots[1:]:
            self.parent[other] = roots[0]


def primitive_shape(p):
    if isinstance(p, Circle):
        return Point(p.x, p.y).buffer(p.r, quad_segs=24)
    if isinstance(p, Line):
        return LineString([(p.x1, p.y1), (p.x2, p.y2)]).buffer(
            p.width / 2, quad_segs=24
        )
    if isinstance(p, Rectangle):
        rectangle = box(p.x - p.w / 2, p.y - p.h / 2, p.x + p.w / 2, p.y + p.h / 2)
        return rotate(rectangle, p.rotation, origin=(p.x, p.y), use_radians=True)
    if isinstance(p, ArcPoly):
        return Polygon(p.approximate_arcs(0.001).outline).buffer(0)
    raise ValueError(f"Unsupported plotted primitive {type(p)}")


def polygons(geometry):
    if geometry.geom_type == "Polygon":
        return [geometry]
    return [part for part in geometry.geoms if part.geom_type == "Polygon"]


def drill_shapes(path):
    return [
        primitive_shape(p)
        for o in ExcellonFile.open(path).objects
        for p in o.to_primitives(MM)
    ]


def read_film(path, drills):
    primitives = (p for o in GerberFile.open(path).objects for p in o.to_primitives(MM))
    film = Polygon()
    for dark, group in groupby(primitives, key=lambda p: p.polarity_dark):
        region = unary_union([primitive_shape(p) for p in group])
        film = film.union(region) if dark else film.difference(region)
    return STRtree(polygons(film.difference(drills)))


def verify():
    gerbers = OUTPUT / "gerbers"
    board = json.loads((OUTPUT / "motherboard.circuit.json").read_text())
    # A routed slot can consist of overlapping drill strokes.
    barrels = polygons(unary_union(drill_shapes(gerbers / "drill-L1-L4.drl")))
    nonplated = drill_shapes(gerbers / "drill_npth.drl")
    drills = unary_union(barrels + nonplated)
    barrel_tree = STRtree(barrels)
    copper = Connectivity()
    films = {}
    rings = defaultdict(list)
    for layer, filename in FILMS.items():
        islands = read_film(gerbers / (filename + ".gbr"), drills)
        films[layer] = islands
        for index, barrel in enumerate(barrels):
            hits = islands.query(barrel.buffer(0.002), predicate="intersects")
            assert len(hits) == 1, ("missing or split annulus", layer, barrel.centroid)
            rings[index].append((layer, int(hits[0])))
    for stack in rings.values():
        copper.join(stack)

    vias = [e for e in board if e["type"] == "pcb_via"]
    for via in vias:
        point = Point(via["x"], via["y"])
        bore = barrels[barrel_tree.nearest(point)]
        assert bore.centroid.distance(point) < 0.00015, ("misplaced via", point)
        assert abs(bore.bounds[2] - bore.bounds[0] - via["hole_diameter"]) < 0.00015, (
            "via drill diameter",
            point,
        )

    ports = {p["pcb_port_id"]: p for p in board if p["type"] == "pcb_port"}
    physical = defaultdict(list)
    for pad in board:
        if pad["type"] not in ("pcb_smtpad", "pcb_plated_hole") or not pad.get(
            "pcb_port_id"
        ):
            continue
        port = ports[pad["pcb_port_id"]]
        center = port if pad["shape"] == "polygon" else pad
        point = Point(center["x"], center["y"])
        layer = pad.get("layer", "top")
        hits = films[layer].query(point.buffer(0.002), predicate="intersects")
        if pad["type"] == "pcb_plated_hole" or not len(hits):
            # Some exposed-pad centres lie inside a plated thermal via.
            index = barrel_tree.nearest(point)
            assert barrels[index].distance(point) < 0.001, (
                "missing plated land",
                port,
                point,
            )
            lands = rings[index]
        else:
            assert len(hits) == 1, ("ambiguous land", port, point, layer)
            lands = [(layer, int(hits[0]))]
        physical[port["source_port_id"]].extend(lands)

    schematic = Connectivity()
    for item in board:
        if item["type"] == "source_trace":
            schematic.join(
                item["connected_source_port_ids"] + item["connected_source_net_ids"]
            )
        if item["type"] == "source_component_internal_connection":
            pins = item["source_port_ids"]
            schematic.join(pins)
            copper.join(land for pin in pins for land in physical[pin])

    names = {
        schematic.root(e["source_net_id"]): e["name"]
        for e in board
        if e["type"] == "source_net"
    }
    nets_per_island = defaultdict(set)
    islands_per_net = defaultdict(set)
    for pin, lands in physical.items():
        key = schematic.root(pin)
        net = names.get(key, key)
        for land in lands:
            island = copper.root(land)
            nets_per_island[island].add(net)
            islands_per_net[net].add(island)
    shorts = [sorted(nets) for nets in nets_per_island.values() if len(nets) > 1]
    opens = [net for net, islands in islands_per_net.items() if len(islands) > 1]
    assert not shorts and not opens, {"opens": opens, "shorts": shorts}
    assert not GerberFile.open(gerbers / "B_Paste.gbr").objects, (
        "Unexpected bottom paste"
    )
    report = {
        "copperLayers": list(FILMS.values()),
        "platedBarrels": len(barrels),
        "vias": len(vias),
        "nonplatedDrillFeatures": len(nonplated),
        "namedNets": len(set(names.values()) & islands_per_net.keys()),
        "opens": opens,
        "shorts": shorts,
    }
    (OUTPUT / "motherboard.gerber-check.json").write_text(
        json.dumps(report, indent=2) + "\n"
    )
    print(json.dumps(report))


if __name__ == "__main__":
    warnings.filterwarnings("ignore", message=".*G90 header statement.*")
    verify()
