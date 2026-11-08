"""Framed CDC transport shared by display and buzzer firmware."""
import struct

MAX_PAYLOAD = 48

def crc8(data):
    value = 0
    for byte in data:
        value ^= byte
        for _ in range(8):
            value = ((value << 1) ^ (7 if value & 128 else 0)) & 255
    return value

def frame(opcode, sequence, payload=b''):
    payload = bytes(payload)
    if len(payload) > MAX_PAYLOAD:
        raise ValueError('payload exceeds 48 bytes')
    body = bytes([opcode, sequence, len(payload)]) + payload
    return b'\xa5\x5a' + body + bytes([crc8(body)])

class Module:
    def __init__(self, serial_port):
        self.port = serial_port
        self.sequence = 0

    def command(self, opcode, payload=b''):
        packet = frame(opcode, self.sequence, payload)
        if self.port.write(packet) != len(packet):
            raise IOError('short USB write')
        reply = bytearray()
        while len(reply) < 3:
            part = self.port.read(3 - len(reply))
            if not part:
                raise TimeoutError('USB module did not acknowledge; reconnect and retry')
            reply.extend(part)
        if reply[:2] != bytes([0xac, self.sequence]):
            raise IOError('out-of-sequence USB acknowledgement; reconnect')
        self.sequence = (self.sequence + 1) & 255
        if reply[2]:
            raise IOError(f'USB module rejected command (status {reply[2]})')

    def beep(self, milliseconds):
        if not isinstance(milliseconds, int) or not 0 <= milliseconds <= 10000:
            raise ValueError('beep duration must be 0–10000 ms')
        self.command(0x10, struct.pack('<H', milliseconds))
