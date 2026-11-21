import { xc6206Footprint, xc6206Model } from "../imports/C5446";
import type { ChipProps } from "@tscircuit/props";

type Props = Pick<ChipProps, "name" | "pcbX" | "pcbY" | "schX" | "schY"> & {
  voltage: 3.2 | 3.3;
};

// The SOT-23 pin assignment differs from the SOT-89 in the same datasheet.
// Keep the checked land pattern and override the source library's pin labels.
export function Regulator({ voltage, ...placement }: Props) {
  return (
    <chip
      {...placement}
      footprint={xc6206Footprint}
      cadModel={xc6206Model}
      pinLabels={{ pin1: ["GND"], pin2: ["VOUT"], pin3: ["VIN"] }}
      pinAttributes={{
        pin1: { requiresGround: true },
        pin2: { providesPower: true, providesVoltage: voltage },
        pin3: { requiresPower: true },
      }}
      manufacturerPartNumber={
        voltage === 3.3 ? "XC6206P332MR-G" : "XC6206P322MR-G"
      }
      supplierPartNumbers={voltage === 3.3 ? { jlcpcb: ["C5446"] } : {}}
    />
  );
}
