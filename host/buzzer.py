"""Usage: python host/buzzer.py /dev/ttyACM0 --ms 250 (0 stops)."""
import argparse
import time
from module_transport import Module

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('port')
    parser.add_argument('--ms', type=int, default=250)
    args = parser.parse_args()
    if not 0 <= args.ms <= 10000:
        parser.error('--ms must be between 0 and 10000')
    import serial
    with serial.Serial(args.port, 115200, timeout=2, write_timeout=2) as port:
        time.sleep(.3)
        port.reset_input_buffer()
        Module(port).beep(args.ms)
    print(f'Buzzer acknowledged {args.ms} ms')

if __name__ == '__main__':
    main()
