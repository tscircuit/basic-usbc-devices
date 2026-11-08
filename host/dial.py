#!/usr/bin/env python3
"""Read CH552E encoder CDC reports; modulo count supports both directions."""
import argparse
import json
import time

def delta32(current, previous):
    return ((current - previous + 0x80000000) & 0xffffffff) - 0x80000000

def decode(line):
    item = json.loads(line)
    if item.get('module') != 'dial':
        raise ValueError('wrong module')
    for key, maximum in [('count', 0xffffffff), ('uptime_ms', 0xffffffff), ('invalid', 65535), ('pressed', 1)]:
        if type(item.get(key)) is not int or not 0 <= item[key] <= maximum:
            raise ValueError('invalid '+key)
    return item

def main():
    import serial
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('port')
    args = parser.parse_args()
    previous = None
    try:
        with serial.Serial(args.port, 115200, timeout=1) as port:
            while True:
                line = port.readline(512)
                if not line:
                    print(json.dumps({'module': 'dial', 'state': 'stale'}), flush=True)
                    previous = None
                    continue
                try:
                    item = decode(line)
                except (ValueError, UnicodeError):
                    print(json.dumps({'module': 'dial', 'state': 'invalid_report'}), flush=True)
                    previous = None
                    continue
                reset = previous is not None and delta32(item['uptime_ms'], previous['uptime_ms']) < 0
                item['delta'] = None if previous is None or reset else delta32(item['count'], previous['count'])
                item['state'] = 'reset' if reset else 'ok'
                item['timestamp'] = time.time()
                previous = item
                print(json.dumps(item), flush=True)
    except (serial.SerialException, OSError) as error:
        print(json.dumps({'module': 'dial', 'state': 'disconnected', 'error': str(error)}), flush=True)
        return 1
    except KeyboardInterrupt:
        return 0

if __name__ == '__main__':
    raise SystemExit(main())
