import ctypes
import pathlib
import subprocess
import tempfile
import unittest
from module_transport import frame, Module
from display import Display, color_bars

class Port:
    def __init__(self, reply=b'\xac\x00\x00'):
        self.reply, self.writes = reply, []
    def write(self, data):
        self.writes.append(data)
        return len(data)
    def read(self, size):
        # Exercise fragmented acknowledgements.
        part, self.reply = self.reply[:1], self.reply[1:]
        return part

class OutputTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        root = pathlib.Path(__file__).resolve().parents[1]
        header = root/'firmware/shared/frame.h'
        for name in ['display','buzzer']:
            assert (root/f'firmware/{name}/frame.h').read_bytes() == header.read_bytes()
        source = pathlib.Path(cls.tmp.name)/'parser.c'
        source.write_text(f'#include "{header}"\nint feed(unsigned char b){{return frame_byte(b);}}\nvoid reset(void){{frame_reset();}}\nint value(int i){{return payload[i];}}\n')
        lib = pathlib.Path(cls.tmp.name)/'parser.so'
        subprocess.run(['cc','-shared','-fPIC','-O2',str(source),'-o',str(lib)],check=True)
        cls.parser = ctypes.CDLL(str(lib))
    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()
    def setUp(self):
        self.parser.reset()
    def test_firmware_accepts_all_payload_lengths(self):
        for n in range(49):
            data = bytes(range(n))
            outcomes = [self.parser.feed(b) for b in frame(3, n, data)]
            self.assertEqual(outcomes, [0]*(len(outcomes)-1)+[1])
            self.assertEqual(bytes(self.parser.value(i) for i in range(n)), data)
    def test_crc_rejects_every_corrupted_payload_byte(self):
        packet = frame(3, 7, bytes(range(48)))
        for i in range(5, len(packet)-1):
            self.parser.reset()
            damaged = bytearray(packet)
            damaged[i] ^= 1
            self.assertEqual([self.parser.feed(b) for b in damaged][-1], 2)
    def test_oversize_and_resynchronization(self):
        self.assertEqual([self.parser.feed(b) for b in b'\xa5\x5a\x03\x01\x31'][-1],3)
        self.assertEqual([self.parser.feed(b) for b in b'noise'+frame(1,2)][-1],1)
    def test_partial_timeout_reset(self):
        for b in frame(3,0,b'hello')[:6]: self.parser.feed(b)
        self.parser.reset()
        self.assertEqual([self.parser.feed(b) for b in frame(1,1)][-1],1)
    def test_ack_and_buzzer_bounds(self):
        p=Port();m=Module(p);m.beep(250)
        self.assertEqual(p.writes,[frame(0x10,0,b'\xfa\x00')])
        for ms in [-1,10001]:
            with self.assertRaises(ValueError):m.beep(ms)
    def test_failures_are_not_silently_retried(self):
        for reply,error in [(b'',TimeoutError),(b'\xac\x01\x00',IOError),(b'\xac\x00\x04',IOError)]:
            p=Port(reply)
            with self.assertRaises(error):Module(p).command(1)
            self.assertEqual(len(p.writes),1)
    def test_rectangle_and_pixels(self):
        d=Display(Port())
        for params in [(-1,0,1,1,b'\0\0'),(479,0,2,1,b'\0'*4),(0,0,1,1,b'')]:
            with self.assertRaises(ValueError):d.rectangle(*params)
        self.assertEqual(len(color_bars()),480*320*2)
        self.assertEqual(color_bars()[:2],b'\xf8\x00')
