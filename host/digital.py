#!/usr/bin/env python3
"""Read a CH340C CTS input. USB failures are distinct from switch states."""
import argparse
import json
import time

class Debouncer:
    def __init__(self, interval=0.020):
        self.interval = interval
        self.candidate = None
        self.since = 0.0
        self.state = None

    def update(self, value, now):
        if value != self.candidate:
            self.candidate, self.since = value, now
        if now - self.since >= self.interval:
            self.state = self.candidate
        return self.state

def active_from_cts(cts, kind):
    # CTS# is asserted LOW. NC limit opens on trigger; NO button closes on press.
    return not cts if kind == 'limit' else cts

def main():
    import serial
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('kind', choices=['limit', 'button', 'toggle'])
    parser.add_argument('port', help='/dev/serial/by-path/... or COM3')
    args = parser.parse_args()
    previous = None
    try:
        with serial.Serial(args.port, 9600, timeout=0.1, rtscts=False,
                           dsrdtr=False, xonxoff=False) as port:
            debounce = Debouncer()
            while True:
                active = debounce.update(active_from_cts(port.cts, args.kind), time.monotonic())
                state = ('unknown' if active is None else
                         ('triggered' if active else 'not_triggered') if args.kind == 'limit' else
                         ('on' if active else 'off') if args.kind == 'toggle' else
                         ('pressed' if active else 'released'))
                # Heartbeat enables the consumer to detect stale data.
                if state != previous or time.monotonic() - last_report >= 0.25:
                    print(json.dumps({'module': args.kind, 'state': state,
                                      'timestamp': time.time()}), flush=True)
                    previous, last_report = state, time.monotonic()
                time.sleep(0.005)
    except (serial.SerialException, OSError) as error:
        print(json.dumps({'module': args.kind, 'state': 'disconnected',
                          'error': str(error), 'timestamp': time.time()}), flush=True)
        return 1
    except KeyboardInterrupt:
        return 0
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
