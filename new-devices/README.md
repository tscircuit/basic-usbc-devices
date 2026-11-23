# Compact USB-C prototypes

| Board | PCB | M2 hole spacing, center to center | Interface |
| --- | --- | --- | --- |
| USB resetter | 36 × 30 mm | 30 × 20 mm, four holes | USB CDC power control and two voltage measurements |
| Temperature | 18 × 24 mm | 10 mm, two holes | USB to TMP102 over I²C |
| Small IPS | 36 × 38 mm | 30 × 10 mm, four holes | Four-wire SPI to the 2.8-inch ER-TFT028A2-4 |
| E-reader | 36 × 38 mm | 30 × 20 mm, four holes | Four-wire SPI to the 5.83-inch ER-EPD0583-1B |

Each hole has a 2.2 mm finished diameter and a 4.6 mm diameter copper keepout. Dimensions refer to the carrier. The bare panel and its ribbon need separate support in the printed enclosure.

## Temperature

The sensor is at the opposite end from the USB connector and regulator. The bottom ground pour ends before the sensor. Leave an opening next to the sensor in a printed enclosure. Compare the assembled board with a reference thermometer in still air to measure self-heating and enclosure bias.

U3 uses address 0x48. P1.5 is SDA and P1.6 is SCL, each with a 5.1 kΩ pull-up. Read register 0 as a signed 12-bit value in the upper 12 bits, at 0.0625 °C per count in the default mode. TP1 and TP2 form the power-on USB bootloader bridge. [TI TMP102 datasheet](https://www.ti.com/lit/ds/symlink/tmp102.pdf)

## Small IPS

Use the non-touch panel. IM3 through IM0 are strapped high, high, high, low. The controller and panel share a 3.2 V rail to leave margin below the panel’s 3.3 V operating maximum. Four separate 220 Ω resistors limit the LED branches, with common-cathode PWM dimming. TP1 and TP2 select the USB bootloader at power-up. Check FPC pin 1 and the contact face on the actual ribbon. [BuyDisplay panel datasheet](https://www.buydisplay.com/download/manual/ER-TFT028A2-4_Datasheet.pdf)

## E-reader

This design targets the black-and-white JD79686 panel. Its GDR and RESE pins operate the external boost stage. The 47 µH inductor, 2.2 Ω current sense and diode/capacitor network generate both gate voltages during a refresh. Verify their polarity and magnitude with an oscilloscope during bring-up. The USB host can stream rows to the panel controller. [BuyDisplay panel datasheet, figures 7-1 and 7-2](https://www.buydisplay.com/download/manual/ER-EPD0583-1_Datasheet.pdf)

## Rebuild

Run `bun install --frozen-lockfile` and `bun new-devices/check.tsx` from the repository root. Pass a board name from the script to rebuild one design. Circuit JSON and PCB SVGs are written to `dist/new-devices/`. The script reports render and rule-check findings for each board. Copper continuity and bench performance are separate checks.

## USB-C speaker

The speaker board uses the [PCM2704C bus-powered application circuit](https://www.ti.com/lit/ds/symlink/pcm2704c.pdf) and a [PAM8302A mono amplifier](https://www.diodes.com/assets/Datasheets/PAM8302A.pdf). J2 mates with the two-pin JST-SH plug on the [Same Sky CMS-23558N-L152B](https://www.sameskydevices.com/product/resource/cms-23558n-l152.pdf). The amplifier drives both speaker terminals. R8 and R9 sum the channels and R10 limits the gain. With identical full-scale sine waves on both channels, nominal DAC swing, input impedance and amplifier gain imply about 70 mW into 8 Ω. This is a calculated value. HOST selects the 100 mA USB configuration. Measure configured and suspend current on the first article.

Run `bun new-devices/check.tsx speaker` to build the routed board. Run `python3 verify-module-copper.py --check-shorts --directory dist/new-devices speaker` to verify endpoint continuity and shorts on the exported copper, including the ground pour.

## Compact USB resetter

Build the standalone board with `bun run build:compact-resetter`. Check its two copper films and plated drills against the netlist with `python3 motherboard/verify-gerbers.py --compact-resetter` (requires gerbonara and shapely). The released four-device panel retains the 42 × 42 mm version. J1 provides control power and USB serial, J3 accepts the upstream USB supply and data, and J2 provides switched power and passes USB data to the target. Passthrough defaults on with the controller unplugged.

The three adjacent emitters are on 2 mm centres. Their anodes share the regulated control supply. Individual 1 kΩ resistors connect the cathodes to GPIO23 (red), GPIO24 (green) and GPIO25 (blue). The three Lumileds LUXEON Z parts share a land pattern. JLCPCB lists each as moisture sensitivity level 1. [Red D1](https://jlcpcb.com/partdetail/C17291105) · [Green D2](https://jlcpcb.com/partdetail/C17201313) · [Blue D3](https://jlcpcb.com/partdetail/C7436942)

JLCPCB showed zero available-to-order units for all three emitters on November 23, 2026. Budget for pre-sourcing or consignment before assembly. [Distributor stock by part number](https://www.digikey.com/en/products/base-product/lumileds/1416/LXZ1/668370)

Use the [compact v2 firmware](https://github.com/tscircuit/devices.tscircuit.com/blob/main/firmware/releases/compact-resetter-2.0.0.uf2). The legacy single-LED board uses v1.
