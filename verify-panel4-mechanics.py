"""Check emitted slots/drills and each board's independent connection to the frame."""
import json
from pathlib import Path
from shapely.affinity import rotate, translate
from shapely.geometry import Point, Polygon, box
from shapely.ops import unary_union


def verify_panel(json_path='output/panel4.circuit.json', layout_path='panel4-layout.json'):
    circuit = json.loads(Path(json_path).read_text())
    layout = json.loads(Path(layout_path).read_text())
    board = next(e for e in circuit if e['type'] == 'pcb_board')
    material = box(-board['width']/2, -board['height']/2, board['width']/2, board['height']/2)
    slots = unary_union([Polygon([(p['x'], p['y']) for p in e['points']])
                         for e in circuit if e['type'] == 'pcb_cutout'])
    drills = unary_union([Point(e['x'], e['y']).buffer(e['hole_diameter']/2)
                          for e in circuit if e['type'] == 'pcb_hole'])
    material = material.difference(unary_union([slots, drills]))
    assert material.is_valid and material.geom_type == 'Polygon', 'Unattached board or rail island'
    # Remove every module: the remaining carrier must still be one connected frame.
    envelopes = [box(b['x']-b['w']/2, b['y']-b['h']/2,
                     b['x']+b['w']/2, b['y']+b['h']/2) for b in layout['modules']]
    carrier = material.difference(unary_union(envelopes))
    assert carrier.geom_type == 'Polygon', 'Carrier relies on neighboring boards for support'
    failed_tabs = []
    for b in layout['modules']:
        assert material.contains(Point(b['x'], b['y'])), b['name']
        ow = b['h'] if abs(b['rotation']/90) % 2 == 1 else b['w']
        tabs = [-11, 11] if b['name'] == 'hub' else [-10, 10] if b['name'] == 'display' else [-16, 10] if b['name'] == 'resetter' else [-7, 7]
        for sign in [-1, 1]:
            for y in tabs:
                # Beyond the intentional perforation row, the full 4 mm tab must
                # reach solid carrier material across the 3 mm routing channel.
                x1, x2 = sorted([sign*(ow/2+.5), sign*(ow/2+3.5)])
                bridge = translate(rotate(box(x1, y-2, x2, y+2), b['rotation'], origin=(0, 0)), b['x'], b['y'])
                if bridge.difference(carrier).area > 1e-7:
                    failed_tabs.append(f"{b['name']} side {sign}, tab {y}")
    assert not failed_tabs, 'Severed/unsupported tabs: ' + '; '.join(failed_tabs)
    print('Panel4: all 40 tabs reach one independent continuous carrier')


if __name__ == '__main__':
    verify_panel()
