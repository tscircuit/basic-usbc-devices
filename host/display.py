"""Send an image or color bars to the ER-TFT035IPS-6 USB-C adapter.
Usage: python host/display.py /dev/ttyACM0 [image.png]
Requires the included CH552T display firmware; this is a CDC display, not an OS monitor.
"""
import argparse
import struct
import time
from module_transport import Module, MAX_PAYLOAD

WIDTH, HEIGHT = 480, 320

class Display(Module):
    def lcd(self, command, data=()):
        self.command(2, bytes([command, *data]))

    def initialize(self):
        self.command(1)
        # ILI9488 power/gamma settings used by the referenced ER-TFT035IPS-6.
        for command, data in [
            (0xe0, [0,3,9,8,22,10,63,120,76,9,10,8,22,26,15]),
            (0xe1, [0,22,25,3,15,5,50,69,70,4,14,13,53,55,15]),
            (0xc0, [0x17,0x15]), (0xc1, [0x41]), (0xc5, [0,0x12,0x80]),
            (0x36, [0x28]), (0x3a, [0x55]), # landscape BGR; RGB565 on 8080
            (0xb0, [0]), (0xb1, [0xa0]), (0xb4, [2]), (0xb6, [2,2]),
            (0xe9, [0]), (0xf7, [0xa9,0x51,0x2c,0x82]),
        ]:
            self.lcd(command, data)
        self.lcd(0x11)
        time.sleep(.15)
        self.lcd(0x21)
        self.lcd(0x29)
        time.sleep(.05)

    def rectangle(self, x, y, width, height, rgb565):
        if not (0 <= x < WIDTH and 0 <= y < HEIGHT and 0 < width <= WIDTH-x and 0 < height <= HEIGHT-y):
            raise ValueError('rectangle outside 480x320 display')
        data = bytes(rgb565)
        if len(data) != width * height * 2:
            raise ValueError('RGB565 payload length does not match rectangle')
        self.lcd(0x2a, struct.pack('>HH', x, x+width-1))
        self.lcd(0x2b, struct.pack('>HH', y, y+height-1))
        self.lcd(0x2c)
        for offset in range(0, len(data), MAX_PAYLOAD):
            self.command(3, data[offset:offset+MAX_PAYLOAD])

    def backlight(self, enabled):
        self.command(4, bytes([bool(enabled)]))

def color_bars():
    colors = [0xf800, 0x07e0, 0x001f, 0xffff, 0xffe0, 0x07ff]
    row = b''.join(struct.pack('>H', c)*(WIDTH//len(colors)) for c in colors)
    return row * HEIGHT

def image_pixels(path):
    from PIL import Image, ImageOps
    im = ImageOps.pad(Image.open(path).convert('RGB'), (WIDTH, HEIGHT))
    return b''.join(struct.pack('>H', ((r>>3)<<11)|((g>>2)<<5)|(b>>3)) for r,g,b in im.getdata())

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('port')
    parser.add_argument('image', nargs='?')
    args = parser.parse_args()
    import serial
    pixels = image_pixels(args.image) if args.image else color_bars()
    with serial.Serial(args.port, 115200, timeout=2, write_timeout=2) as port:
        time.sleep(.3)
        port.reset_input_buffer()
        display = Display(port)
        display.initialize()
        display.rectangle(0, 0, WIDTH, HEIGHT, pixels)
        display.backlight(True)
    print('Image acknowledged. Backlight stays on until USB suspend, reset, or an explicit off command.')

if __name__ == '__main__':
    main()
