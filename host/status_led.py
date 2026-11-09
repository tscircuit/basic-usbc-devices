#!/usr/bin/env python3
"""Control a panel4 status LED without changing its primary function.
Examples: status_led.py digital /dev/ttyUSB0 on
          status_led.py distance 3 on
          status_led.py hub 1:2 on
The hub target is explicit USB bus:address; the distance target is an I2C bus.
"""
import argparse,json,time
from module_transport import Module

def distance_led(bus,on):
    # TCA9536 address 0x41: preload output before enabling IO0 to avoid a flash.
    value=bus.read_byte_data(0x41,1)
    bus.write_byte_data(0x41,1,(value & ~1) if on else (value | 1))
    config=bus.read_byte_data(0x41,3)
    bus.write_byte_data(0x41,3,config & ~1)

def hub_led(device,state):
    # Standard USB 2.0 hub-class request, no device reconfiguration/detachment.
    descriptor=bytes(device.ctrl_transfer(0xa0,6,0x2900,0,9,timeout=2000))
    if len(descriptor)<5 or descriptor[1]!=0x29 or descriptor[2]<1:
        raise ValueError('target is not a USB 2.0 hub')
    if not int.from_bytes(descriptor[3:5],'little') & 0x80:
        raise RuntimeError('hub indicator control disabled; program the supplied EEPROM image and reconnect')
    selector={'auto':0,'on':2,'off':3}[state]
    # Port 1 indicator: green selector drives the physical red status LED.
    device.ctrl_transfer(0x23,3,22,(selector<<8)|1,b'',timeout=2000)

def dial_led(port,on,kind):
    port.write(b'1' if on else b'0')
    deadline=time.monotonic()+3
    while time.monotonic()<deadline:
        try: report=json.loads(port.readline(512))
        except (ValueError,UnicodeError):continue
        if report.get('module')==kind and report.get('led')==int(on):return
    raise TimeoutError('no matching LED state report; install updated firmware')

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('module',choices=['digital','limit','button','toggle','dial','position','distance','display','buzzer','hub','resetter'])
    p.add_argument('target');p.add_argument('state',choices=['on','off','auto']);a=p.parse_args()
    if a.state=='auto' and a.module not in ['hub','resetter']:p.error('auto is supported only by hub and resetter')
    on=a.state=='on'
    if a.module=='distance':
        from smbus2 import SMBus
        with SMBus(int(a.target)) as bus:distance_led(bus,on)
    elif a.module=='hub':
        import usb.core
        bus,address=map(int,a.target.split(':'))
        dev=usb.core.find(bus=bus,address=address)
        if dev is None:raise RuntimeError('USB hub not found at specified bus:address')
        hub_led(dev,a.state)
    else:
        import serial
        digital=a.module in ['digital','limit','button','toggle']
        port=serial.Serial(port=None,baudrate=9600 if digital else 115200,timeout=.5,write_timeout=2,rtscts=False,dsrdtr=False)
        # Set DTR before open to minimize the initial flash on CH340C.
        port.dtr=on if digital else True;port.port=a.target
        with port:
            if digital:
                port.dtr=on
                print('DTR set; keep this process open to retain the LED state. Ctrl-C exits.')
                try:
                    while True:time.sleep(1)
                except KeyboardInterrupt:return
            time.sleep(.3);port.reset_input_buffer()
            if a.module in ['display','buzzer']:Module(port).command(0x20,bytes([on]))
            elif a.module in ['dial','position']:dial_led(port,on,a.module)
            else:
                port.write(('led '+a.state+'\n').encode())
                response=port.readline().decode().strip()
                if response!='OK led='+a.state:raise RuntimeError('resetter rejected LED command: '+response)
    print(a.module+': LED '+a.state+' acknowledged')

if __name__=='__main__':main()
