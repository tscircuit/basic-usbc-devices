# USB Reseter

A USB-C passthrough whose power can be cut on command. Plug a device into the
left port, the host into the right port, and a control cable into the top port.
An RP2040 on the control port switches the passthrough's VBUS, so you can
power-cycle a hung dev board, hub or peripheral from a script.

```
            ┌──── CONTROL (USB-C, RP2040) ────┐
            │                         [LED]   │
 OUTPUT  ◄──┤  data passes straight through   ├──◄  INPUT
 (device)   │  VBUS goes through a load switch│     (host)
            └─────────────────────────────────┘
```

## How it works

- **Data**: USB 2.0 D+/D- are wired straight from the input jack to the output
  jack (hand-routed pair on the top layer over the bottom GND pour).
- **Power**: input VBUS → TPS22918 load switch (U4) → output VBUS. The switch
  has a ~1 ms soft start (C18) and quick output discharge, so the device
  really loses power when cut.
- **Fail-safe on**: the switch enable is pulled up to the input VBUS. With no
  control cable (or no firmware), the passthrough just works. Driving
  `PWR_CUT` high turns a 2N7002 on and the output off.
- **USB-C roles**: the input presents 5.1k Rd (sink); the output presents 56k Rp
  to the *switched* VBUS, so the device sees a clean detach when power is cut.
- **Status LED**: a WS2812-class RGB LED (with built-in driver IC), powered from
  the control port through a diode drop so 3.3 V logic drives it reliably.
- **Sensing**: 100k/150k dividers report input and output VBUS on the RP2040
  ADC.

Sized for typical USB 2.0 loads, about 1 A continuous. The TPS22918 handles
2 A; the VBUS traces are 0.6 mm but neck down at the jack pad rows.

## RP2040 pin map

| GPIO | Function |
| --- | --- |
| 18 | `PWR_CUT` (high = output off) |
| 26 / ADC0 | input VBUS sense (×5/3) |
| 27 / ADC1 | output VBUS sense (×5/3) |
| 29 | status LED data |

The flash (W25Q16, 2 MB) and 12 MHz crystal match the Raspberry Pi Pico, so
stock Pico firmware builds run unmodified.

## Firmware

1. Hold **BOOTSEL** (SW1) while plugging in the control port, then copy the
   MicroPython UF2 for the Raspberry Pi Pico onto the `RPI-RP2` drive.
2. Copy the firmware: `mpremote cp firmware/main.py :main.py`, then reset.

Send newline-terminated commands to the control port's serial device:

| Command | Effect |
| --- | --- |
| `off` | cut output power |
| `on` | restore output power |
| `cycle [secs]` | cut, wait (default 1 s), restore |
| `status` | report state and voltages |

```bash
printf 'cycle 2\n' > /dev/cu.usbmodem1101
```

LED colours: green = passing power, red = output cut, blue = no input power,
amber = enabled but output low.

## Board

42 × 36 mm, 2 layers: signals mostly on top, a GND pour on the bottom with a
via at every ground pad, and VBUS on 0.6 mm traces. Two M3 mounting holes
(3.2 mm, copper kept clear of the screw head) sit on the left and right edges.
All parts are JLCPCB-assemblable (RP2040 C2040, TPS22918DBVR C131941,
TYPE-C-31-M-12 C165948).

## Four-up fabrication panel

Revision 1.1.4 places four copies of the 42 × 36 mm board in a
104.2 × 92.2 mm, 1.6 mm-thick panel. The board uses 0.30 mm plated via drills. The panel copies the
validated single-board layout in `lib/usb-reseter-layout.json`, so generating
the panel does not reroute the boards. The editable single-board entry is
`lib/UsbReseter.tsx`. If the single board changes, rebuild that entry and
refresh the layout snapshot before exporting the panel.

The panel uses routed slots, mouse-bite tabs, tooling holes, and top-side
fiducials. Assembly reference designators have suffixes A through D, from
top left to bottom right.

LED1 uses the OPSCO SK6812-B-012 datasheet pinout and recommended lands.
The JLCPCB footprint labels VDD as pin 1, while the physical pin 1 is GND
at the lower-right bevel in the supplier's unrotated view. Use the physical
bevel when checking the assembly rotation.
