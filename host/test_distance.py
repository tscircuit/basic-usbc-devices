import unittest
from distance import Threshold

class DistanceTests(unittest.TestCase):
    def test_hysteresis(self):
        g = Threshold()
        self.assertEqual(g.update(100), 'not_triggered')
        self.assertEqual(g.update(49), 'triggered')
        self.assertEqual(g.update(53), 'triggered')
        self.assertEqual(g.update(56), 'not_triggered')
        self.assertEqual(g.update(53), 'not_triggered')

    def test_invalid_is_never_a_normal_clear_state(self):
        g = Threshold()
        self.assertEqual(g.update(40), 'triggered')
        for mm, valid in [(20, True), (301, True), (8190, True), (100, False)]:
            self.assertEqual(g.update(mm, valid), 'invalid_range')
            self.assertIsNone(g.active)

    def test_threshold_bounds(self):
        for trip,release in [(20,55),(55,50),(50,301)]:
            with self.assertRaises(ValueError):Threshold(trip,release)

if __name__ == '__main__':unittest.main()
