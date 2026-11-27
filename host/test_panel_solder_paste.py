import json
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PanelSolderPasteTests(unittest.TestCase):
    def test_rotated_pill_paste_rotates_with_its_module(self):
        paste = {
            'type': 'pcb_solder_paste',
            'pcb_solder_paste_id': 'paste_test',
            'layer': 'top',
            'shape': 'rotated_pill',
            'radius': 0.5,
            'ccw_rotation': 45,
            'width': 1.0,
            'height': 2.0,
            'x': 1.0,
            'y': 2.0,
            'subcircuit_id': 'subcircuit_test',
        }
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            (tmp_path / 'output').mkdir()
            (tmp_path / 'output/limit.circuit.json').write_text(json.dumps([paste]))
            compose_path = json.dumps(str(ROOT / 'compose-panel.ts'))
            script = f'''
const mod = await import({compose_path})
const placed = mod.composePanel([{{x: 10, y: 20, rotation: 90, name: 'limit'}}])
console.log(JSON.stringify(placed))
'''
            result = subprocess.run(
                ['bun', '-e', script], cwd=tmp, check=True, capture_output=True, text=True,
            )
        placed = json.loads(result.stdout)[0]
        self.assertEqual(placed['pcb_solder_paste_id'], 'limit_paste_test')
        self.assertAlmostEqual(placed['x'], 8.0)
        self.assertAlmostEqual(placed['y'], 21.0)
        self.assertEqual(placed['ccw_rotation'] % 360, 135)


if __name__ == '__main__':
    unittest.main()
