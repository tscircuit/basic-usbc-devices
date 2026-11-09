"""Package checked panel4 fabrication outputs and required programming files.

Run after all builds/checks: python3 package-panel4.py /absolute/output/directory
"""
import hashlib
import io
import json
from pathlib import Path
import sys
import zipfile

root = Path(__file__).resolve().parent
out = root / 'output'
destination = Path(sys.argv[1])
destination.mkdir(parents=True, exist_ok=True)
for name in ['limit', 'button', 'toggle', 'dial', 'position', 'distance',
             'hub', 'display', 'resetter', 'buzzer', 'panel4', 'panel4.viewer']:
    checks = json.loads((out / f'{name}.checks.json').read_text())
    assert not checks['render'] and not checks['checks'], name
for name in ['limit', 'button', 'toggle', 'dial', 'position', 'distance',
             'hub', 'display', 'resetter', 'buzzer']:
    assert not json.loads((out / f'{name}.physical-connectivity.json').read_text())['disconnectedNets'], name
assert len(json.loads((out / 'status-leds.validation.json').read_text())) == 10

gerber = io.BytesIO()
with zipfile.ZipFile(gerber, 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in sorted((out / 'panel4-gerbers').iterdir()):
        archive.writestr(path.name, path.read_bytes())
(destination / 'panel4-gerbers.zip').write_bytes(gerber.getvalue())
files = {'panel4-gerbers.zip': gerber.getvalue()}
for name in ['panel4-bom.csv', 'panel4-cpl.csv', 'panel4.validation.json',
             'status-leds.validation.json', 'panel4.pcb.png', 'panel4.pcb.svg']:
    files[name] = (out / name).read_bytes()
for name in ['STATUS-LEDS.md', 'firmware/USB-OUTPUTS.md',
             'firmware/hub/ch334f-status.bin', 'firmware/hub/build-eeprom.py',
             'firmware/resetter/main.py', 'firmware/build/dial.ino.hex',
             'firmware/build-position/position.ino.hex',
             'firmware/build-display/display.ino.hex',
             'firmware/build-buzzer/buzzer.ino.hex']:
    files[name] = (root / name).read_bytes()
files['README.txt'] = b'''Panel4, version 0.0.4: ten USB-C devices with computer-controlled LEDs
112 x 140 mm, 2 layers, 1.6 mm FR-4, 1 oz copper, 0.30/0.60 mm vias.
Upload panel4-gerbers.zip for fabrication; use the BOM and CPL for assembly.
All coordinates in CPL are millimetres. Review the assembler's orientation preview.
Four mounting holes per module. Depanelize and deburr before connecting modules.

REQUIRED PROGRAMMING: The hub's U_STATUS AT24C02D must be programmed with
firmware/hub/ch334f-status.bin; an ordinary blank assembled EEPROM does not
enable host LED control. Arrange preprogramming before assembly. Updated CH552
HEX files and RP2040 MicroPython main.py are included; see STATUS-LEDS.md.

ASSEMBLY EXCEPTIONS: VL53L0X C91199 requires JLCPCB Standard assembly.
The BuyDisplay ER-TFT035IPS-6 non-touch LCD is purchased separately.
This panel is therefore not entirely eligible for Economic PCBA.
Through-hole controls need the corresponding soldering service.

CAD, connectivity and software checks pass. Hardware and USB high-speed
compliance have not been tested. No order-specific JLCPCB DFM has been run.
'''
files['SHA256SUMS.txt'] = ''.join(
    f'{hashlib.sha256(data).hexdigest()}  {name}\n'
    for name, data in sorted(files.items())
).encode()
with zipfile.ZipFile(destination / 'panel4-fabrication.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for name, data in files.items():
        archive.writestr(name, data)
print(destination / 'panel4-fabrication.zip')
