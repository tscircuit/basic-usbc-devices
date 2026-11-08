import unittest
from dial import delta32, decode
class DialProtocol(unittest.TestCase):
    def test_wrap_both_directions(self):
        self.assertEqual(delta32(0, 0xffffffff), 1)
        self.assertEqual(delta32(0xffffffff, 0), -1)
        self.assertEqual(delta32(123, 120), 3)
    def test_report_validation(self):
        self.assertEqual(decode('{"module":"dial","count":0,"pressed":1,"invalid":0,"uptime_ms":50}')['pressed'], 1)
        for bad in ['{}', '{"module":"dial","count":-1}', '{"module":"dial","count":0,"pressed":2,"invalid":0,"uptime_ms":0}']:
            with self.assertRaises(ValueError): decode(bad)
