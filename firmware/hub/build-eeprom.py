"""CH334F external 24C02 configuration; datasheet v2.5 section 3.5."""
from pathlib import Path
image=bytearray([255]*256)
image[:11]=bytes([0x86,0x1a,0x91,0x80,0xb2,0xff,0,4,50,0x5a,0x13])
# Keep manufacturer VID/PID; checksum, four removable ports, 100 mA,
# bus-powered, ganged overcurrent, indicators enabled, USB rewrite disabled.
assert image[4]==(sum(image[:4])+1)&255
Path(__file__).with_name('ch334f-status.bin').write_bytes(image)
