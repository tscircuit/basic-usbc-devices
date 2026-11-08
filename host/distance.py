#!/usr/bin/env python3
"""Linux CH341A /dev/i2c-N reader for the VL53L0X distance board."""
import argparse
import json
import time
from threading import Lock

class I2CBus:
    """CircuitPython I2C protocol backed by Linux i2c-dev, not GPIO bit-banging."""
    def __init__(self, number):
        from smbus2 import SMBus
        self.bus = SMBus(number)
        self.lock = Lock()

    def try_lock(self): return self.lock.acquire(False)
    def unlock(self): self.lock.release()
    def deinit(self): self.bus.close()

    def writeto(self, address, buffer, *, start=0, end=None, stop=True):
        from smbus2 import i2c_msg
        self.bus.i2c_rdwr(i2c_msg.write(address, bytes(buffer[start:end])))

    def readfrom_into(self, address, buffer, *, start=0, end=None):
        from smbus2 import i2c_msg
        end = len(buffer) if end is None else end
        msg = i2c_msg.read(address, end-start)
        self.bus.i2c_rdwr(msg)
        buffer[start:end] = bytes(msg)

    def writeto_then_readfrom(self, address, out_buffer, in_buffer, *,
                             out_start=0, out_end=None, in_start=0, in_end=None):
        from smbus2 import i2c_msg
        in_end = len(in_buffer) if in_end is None else in_end
        read = i2c_msg.read(address, in_end-in_start)
        self.bus.i2c_rdwr(i2c_msg.write(address, bytes(out_buffer[out_start:out_end])), read)
        in_buffer[in_start:in_end] = bytes(read)

class Threshold:
    def __init__(self, trip=50, release=55):
        if not 30 <= trip < release <= 300:
            raise ValueError('Thresholds must satisfy 30 <= trip < release <= 300 mm')
        self.trip, self.release, self.active = trip, release, None

    def update(self, mm, valid=True):
        if not valid or not 30 <= mm <= 300:
            self.active = None
            return 'invalid_range'
        if mm <= self.trip:
            self.active = True
        elif mm >= self.release or self.active is None:
            self.active = False
        return 'triggered' if self.active else 'not_triggered'

def main():
    import adafruit_vl53l0x
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--bus', type=int, required=True, help='CH341 adapter number from i2cdetect -l')
    p.add_argument('--trip-mm', type=int, default=50)
    p.add_argument('--release-mm', type=int, default=55)
    args = p.parse_args()
    gate = Threshold(args.trip_mm, args.release_mm)
    bus = None
    try:
        bus = I2CBus(args.bus)
        sensor = adafruit_vl53l0x.VL53L0X(bus, io_timeout_s=1.0)
        sensor.measurement_timing_budget = 33000
        while True:
            sensor.do_range_measurement()
            start = time.monotonic()
            while not sensor.data_ready:
                if time.monotonic()-start > 1.0:
                    raise TimeoutError('No distance sample within 1 second')
                time.sleep(0.002)
            # Read status and distance BEFORE the driver clears the interrupt.
            frame = bytes(bus.bus.read_i2c_block_data(0x29, 0x14, 12))
            raw_status = (frame[0] >> 3) & 0x0F
            mm = int.from_bytes(frame[10:12], 'big')
            sensor.read_range()  # acknowledge/clear the completed sample
            # ST device status 11 = valid range-complete; reject all other codes.
            state = gate.update(mm, raw_status == 11)
            print(json.dumps({'module':'distance', 'distance_mm':mm,
                              'state':state, 'device_status':raw_status,
                              'timestamp':time.time()}), flush=True)
            time.sleep(0.01)
    except (OSError, RuntimeError, TimeoutError) as error:
        print(json.dumps({'module':'distance','state':'fault','error':str(error),
                          'timestamp':time.time()}), flush=True)
        return 1
    except KeyboardInterrupt:
        return 0
    finally:
        if bus is not None: bus.deinit()
    return 0

if __name__ == '__main__': raise SystemExit(main())
