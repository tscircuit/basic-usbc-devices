import pathlib
import unittest
from unittest.mock import Mock
from status_led import distance_led, hub_led, dial_led


class StatusLedTests(unittest.TestCase):
    def test_distance_preserves_other_outputs_and_preloads_latch(self):
        for on, expected in [(True, 0b1010), (False, 0b1011)]:
            bus = Mock()
            bus.read_byte_data.side_effect = [0b1010, 0b1101]
            distance_led(bus, on)
            self.assertEqual(bus.method_calls, [
                unittest.mock.call.read_byte_data(0x41, 1),
                unittest.mock.call.write_byte_data(0x41, 1, expected),
                unittest.mock.call.read_byte_data(0x41, 3),
                unittest.mock.call.write_byte_data(0x41, 3, 0b1100),
            ])

    def test_hub_indicator_request_does_not_switch_port_power(self):
        for state, selector in [('on', 2), ('off', 3), ('auto', 0)]:
            dev = Mock()
            dev.ctrl_transfer.return_value = bytes([9, 0x29, 4, 0x80, 0, 0, 0, 0, 255])
            hub_led(dev, state)
            self.assertEqual(dev.ctrl_transfer.call_args_list, [
                unittest.mock.call(0xa0, 6, 0x2900, 0, 9, timeout=2000),
                unittest.mock.call(0x23, 3, 22, selector * 256 + 1, b'', timeout=2000),
            ])

    def test_hub_refuses_unconfigured_or_wrong_device(self):
        for descriptor in [b'', bytes([9, 0x29, 4, 0, 0]), bytes([9, 1, 4, 0x80, 0])]:
            dev = Mock()
            dev.ctrl_transfer.return_value = descriptor
            with self.assertRaises((ValueError, RuntimeError)):
                hub_led(dev, 'on')
            self.assertEqual(dev.ctrl_transfer.call_count, 1)

    def test_dial_ignores_stale_and_unrelated_reports(self):
        port = Mock()
        port.readline.side_effect = [b'noise', b'{"module":"dial","led":0}',
                                    b'{"module":"position","led":1}',
                                    b'{"module":"dial","led":1}']
        dial_led(port, True, 'dial')
        port.write.assert_called_once_with(b'1')
        self.assertEqual(port.readline.call_count, 4)

    def test_eeprom_has_valid_checksum_and_bus_powered_indicator_configuration(self):
        data = (pathlib.Path(__file__).resolve().parents[1] /
                'firmware/hub/ch334f-status.bin').read_bytes()
        self.assertEqual(len(data), 256)
        self.assertEqual(data[4], (sum(data[:4]) + 1) & 255)
        self.assertEqual(data[7:10], bytes([4, 50, 0x5a]))
        self.assertEqual(data[10] & 0x02, 0x02)  # Indicator enabled.
        self.assertEqual(data[10] & 0x04, 0)  # Bus powered.
        self.assertEqual(data[10] & 0x40, 0)  # USB EEPROM writes disabled.


if __name__ == '__main__':
    unittest.main()
