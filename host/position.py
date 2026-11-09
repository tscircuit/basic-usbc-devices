#!/usr/bin/env python3
"""Read the fixed-range USB dial, with calibrated endpoint normalization."""
import argparse
import json
import time

def normalize(raw, low=0, high=255, reverse=False):
    if not 0 <= low < high <= 255:
        raise ValueError('calibration requires 0 <= minimum < maximum <= 255')
    value = min(1.0, max(0.0, (raw-low)/(high-low)))
    return 1.0-value if reverse else value

def decode(line):
    item=json.loads(line)
    if item.get('module')!='position' or item.get('max')!=255:
        raise ValueError('wrong module or ADC range')
    for key, maximum in [('raw',255),('uptime_ms',0xffffffff)]:
        if type(item.get(key)) is not int or not 0 <= item[key] <= maximum:
            raise ValueError('invalid '+key)
    return item

def main():
    import serial
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('port')
    parser.add_argument('--minimum',type=int,default=0)
    parser.add_argument('--maximum',type=int,default=255)
    parser.add_argument('--reverse',action='store_true')
    parser.add_argument('--led',choices=['on','off'],default='off')
    args=parser.parse_args()
    try: normalize(0,args.minimum,args.maximum)
    except ValueError as error: parser.error(str(error))
    try:
        with serial.Serial(args.port,115200,timeout=1) as port:
            port.write(b'1' if args.led=='on' else b'0')
            while True:
                line=port.readline(512)
                if not line:
                    print(json.dumps({'module':'position','state':'stale'}),flush=True)
                    continue
                try: item=decode(line)
                except (ValueError,UnicodeError):
                    print(json.dumps({'module':'position','state':'invalid_report'}),flush=True)
                    continue
                item['position']=normalize(item['raw'],args.minimum,args.maximum,args.reverse)
                item['state']='ok'
                item['timestamp']=time.time()
                print(json.dumps(item),flush=True)
    except (serial.SerialException,OSError) as error:
        print(json.dumps({'module':'position','state':'disconnected','error':str(error)}),flush=True)
        return 1
    except KeyboardInterrupt: return 0

if __name__=='__main__':raise SystemExit(main())
