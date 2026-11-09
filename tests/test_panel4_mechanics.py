"""Regress the connected-but-unsupported original manufacturing panel."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('mechanics', root / 'verify-panel4-mechanics.py')
mechanics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mechanics)


class PanelMechanicsTest(unittest.TestCase):
    def test_original_panel_is_rejected(self):
        original = json.loads((root / 'tests/fixtures/panel4-unsupported.json').read_text())
        with tempfile.TemporaryDirectory() as temp:
            circuit, layout = Path(temp) / 'circuit.json', Path(temp) / 'layout.json'
            circuit.write_text(json.dumps(original['circuit']))
            layout.write_text(json.dumps(original['layout']))
            with self.assertRaisesRegex(AssertionError, 'Carrier relies on neighboring boards'):
                mechanics.verify_panel(circuit, layout)

    def test_current_panel_has_independent_support(self):
        mechanics.verify_panel(root / 'output/panel4.circuit.json', root / 'panel4-layout.json')

    def test_notching_one_tab_fails_even_when_panel_stays_connected(self):
        circuit = json.loads((root / 'output/panel4.circuit.json').read_text())
        layout = json.loads((root / 'panel4-layout.json').read_text())
        board = next(b for b in layout['modules'] if b['rotation'] == 0)
        x, y = board['x'] + board['w']/2, board['y'] + 7
        circuit.append({'type': 'pcb_cutout', 'shape': 'polygon', 'points': [
            {'x': x+.5, 'y': y-1}, {'x': x+3.5, 'y': y-1},
            {'x': x+3.5, 'y': y+1}, {'x': x+.5, 'y': y+1}]})
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'cut-tab.json'
            path.write_text(json.dumps(circuit))
            with self.assertRaisesRegex(AssertionError, 'Severed/unsupported tabs'):
                mechanics.verify_panel(path, root / 'panel4-layout.json')


if __name__ == '__main__':
    unittest.main()
