import unittest
from digital import Debouncer, active_from_cts

class InputTests(unittest.TestCase):
    def test_electrical_polarity(self):
        self.assertFalse(active_from_cts(True, 'limit'))
        self.assertTrue(active_from_cts(False, 'limit'))
        self.assertTrue(active_from_cts(True, 'button'))
        self.assertFalse(active_from_cts(False, 'button'))

    def test_bounce_and_initial_unknown(self):
        d = Debouncer()
        self.assertIsNone(d.update(False, 0))
        self.assertIsNone(d.update(True, .005))
        self.assertIsNone(d.update(False, .010))
        self.assertFalse(d.update(False, .031))
        self.assertFalse(d.update(True, .035))
        self.assertFalse(d.update(False, .040))
        self.assertFalse(d.update(True, .045))
        self.assertTrue(d.update(True, .066))

if __name__ == '__main__': unittest.main()
