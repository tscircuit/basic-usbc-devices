# Compact USB-C prototypes

| Board | PCB | M2 hole spacing, center to center | Interface |
| --- | --- | --- | --- |
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
