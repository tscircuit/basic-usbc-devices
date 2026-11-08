# USB resetter firmware (MicroPython, RP2040 / Raspberry Pi Pico build)
#
# Send newline-terminated commands over the control USB serial port:
#   off            cut power to the output port
#   on             restore power to the output port
#   cycle [secs]   cut power, wait (default 1s), restore
#   status         report state and VBUS voltages
# Every command replies with one "OK ..." or "ERR ..." line.

import select
import sys
import time

import neopixel
from machine import ADC, Pin

PWR_CUT = Pin(18, Pin.OUT, value=0)  # high = output VBUS off
VBUS_IN = ADC(26)
VBUS_OUT = ADC(27)
led = neopixel.NeoPixel(Pin(29), 1)

DIVIDER = (100 + 150) / 150  # 100k / 150k sense dividers
PRESENT_V = 4.0


def volts(adc):
    return adc.read_u16() * 3.3 / 65535 * DIVIDER


def show():
    vin, vout = volts(VBUS_IN), volts(VBUS_OUT)
    if vin < PRESENT_V:
        color = (0, 0, 8)  # blue: no power on the input
    elif PWR_CUT.value():
        color = (16, 0, 0)  # red: output cut
    elif vout > PRESENT_V:
        color = (0, 16, 0)  # green: passing power through
    else:
        color = (16, 8, 0)  # amber: enabled but output is low
    led[0] = color
    led.write()


def status():
    state = "off" if PWR_CUT.value() else "on"
    return "OK out=%s vin=%.2f vout=%.2f" % (state, volts(VBUS_IN), volts(VBUS_OUT))


def handle(line):
    parts = line.split()
    if not parts:
        return None
    cmd, args = parts[0].lower(), parts[1:]
    if cmd == "off":
        PWR_CUT.value(1)
    elif cmd == "on":
        PWR_CUT.value(0)
    elif cmd in ("cycle", "reset"):
        PWR_CUT.value(1)
        show()
        time.sleep(float(args[0]) if args else 1.0)
        PWR_CUT.value(0)
    elif cmd != "status":
        return "ERR unknown command: " + cmd
    return status()


poller = select.poll()
poller.register(sys.stdin, select.POLLIN)
buf = ""
while True:
    show()
    if not poller.poll(100):
        continue
    ch = sys.stdin.read(1)
    if ch not in ("\n", "\r"):
        buf += ch
        continue
    try:
        reply = handle(buf)
    except Exception as e:
        reply = "ERR " + str(e)
    buf = ""
    if reply:
        print(reply)
