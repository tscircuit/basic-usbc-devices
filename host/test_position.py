import unittest
from position import normalize,decode
class PositionTests(unittest.TestCase):
    def test_calibrated_endpoints_midpoint_and_clamping(self):
        self.assertEqual(normalize(4,4,244),0)
        self.assertEqual(normalize(244,4,244),1)
        self.assertEqual(normalize(124,4,244),0.5)
        self.assertEqual(normalize(255,4,244),1)
        self.assertEqual(normalize(0,4,244,True),1)
    def test_invalid_calibration_and_reports(self):
        for low,high in [(10,10),(100,20),(-1,255),(0,256)]:
            with self.assertRaises(ValueError):normalize(1,low,high)
        self.assertEqual(decode('{"module":"position","raw":255,"max":255,"uptime_ms":1}')['raw'],255)
        with self.assertRaises(ValueError):decode('{"module":"position","raw":256,"max":255,"uptime_ms":1}')
