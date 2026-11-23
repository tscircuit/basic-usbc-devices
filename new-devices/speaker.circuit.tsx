import { boardRules, C, UsbInput } from "../common";
import { DisplayMounts } from "./mounts";
import { savedRouter } from "../saved-router";
import copper from "./speaker-copper.json";
import { PCM2704CDBR } from "../imports/C2859784";
import { PAM8302AASCR } from "../imports/C113367";
import { BM02B_SRSS_TB_LF__SN_ as SpeakerHeader } from "../imports/C160388";
import { X322512MSB4SI } from "../imports/C9002";
import { BLM18PG121SN1D as OutputBead } from "../imports/C14709";
import { CL10B102KB8NNNC as FilterCap } from "../imports/C1588";
import { CL10A106KP8NNNC as CommonModeCap } from "../imports/C19702";
import { A_0603WAF220JT5E as UsbSeries } from "../imports/C23345";
import { A_0603WAF1501T5E as Pullup } from "../imports/C22843";
import { A_0603WAF1004T5E as CrystalFeedback } from "../imports/C22935";
import { A_0603WAF2202T5E as MixInput } from "../imports/C31850";
import { A_0603WAF1001T5E as MixShunt } from "../imports/C21190";

const between = (a: string, b: string) => ({
  pin1: "net." + a,
  pin2: "net." + b,
});

export default function Speaker() {
  return (
    <board
      {...boardRules}
      width={26}
      height={30}
      name="speaker"
      minTraceWidth={0.15}
      autorouter={{ local: true, algorithmFn: savedRouter(copper) }}
    >
      <schematicsheet
        name="speaker_sheet"
        displayName="USB-C mono speaker"
        sheetSize="A4"
      >
        <UsbInput dial />
        <DisplayMounts centerY={-2.5} />

        {/* PCM2704C bus-powered reference circuit. HOST low advertises one USB unit load. */}
        <PCM2704CDBR
          name="U1"
          pcbX={0}
          pcbY={0.55}
          noConnect={["pin2", "pin5"]}
          connections={{
            pin1: "net.XTO",
            pin3: "net.DT",
            pin4: "net.DAC_VDD",
            pin6: "net.GND",
            pin7: "net.DAC_VDD",
            pin8: "net.DAC_DM",
            pin9: "net.DAC_DP",
            pin10: "net.VBUS",
            pin11: "net.GND",
            pin12: "net.GND",
            pin13: "net.VCCL",
            pin14: "net.LEFT",
            pin15: "net.RIGHT",
            pin16: "net.VCCR",
            pin17: "net.GND",
            pin18: "net.VCOM",
            pin19: "net.GND",
            pin20: "net.VCCP",
            pin21: "net.GND",
            pin22: "net.GND",
            pin23: "net.GND",
            pin24: "net.GND",
            pin25: "net.DAC_VDD",
            pin26: "net.DAC_VDD",
            pin27: "net.AMP_ENABLE",
            pin28: "net.XTI",
          }}
        />
        <UsbSeries
          name="R3"
          pcbX={-6.25}
          pcbY={-9.5}
          pcbRotation={90}
          connections={between("DM", "DAC_DM")}
        />
        <UsbSeries
          name="R4"
          pcbX={6.25}
          pcbY={-11}
          pcbRotation={90}
          connections={between("DP", "DAC_DP")}
        />
        <Pullup
          name="R5"
          pcbX={7}
          pcbY={-1.75}
          connections={between("DP", "DAC_VDD")}
        />
        <Pullup
          name="R6"
          pcbX={-10.75}
          pcbY={-2.5}
          connections={between("DT", "DAC_VDD")}
        />
        <X322512MSB4SI
          name="Y1"
          pcbX={-8.1}
          pcbY={0.5}
          loadCapacitance="20pF"
          connections={{
            pin1: "net.XTO",
            pin2: "net.GND",
            pin3: "net.XTI",
            pin4: "net.GND",
          }}
        />
        <CrystalFeedback
          name="R7"
          pcbX={-11.25}
          pcbY={0.5}
          pcbRotation={90}
          connections={between("XTO", "XTI")}
        />
        <C name="C2" value="33pF" x={-7.4} y={-2.55} a="net.XTO" />
        <C name="C3" value="33pF" x={-7.4} y={3.55} a="net.XTI" />
        <C name="C4" value="1uF" x={-8.75} y={-8.75} a="net.DAC_VDD" />
        <C name="C5" value="1uF" x={-0.5} y={6.75} a="net.VCCL" rotation={90} />
        <C name="C6" value="1uF" x={10.5} y={4.25} a="net.VCCR" />
        <C name="C7" value="1uF" x={-3.75} y={6.25} a="net.VCCP" />
        <CommonModeCap
          name="C8"
          pcbX={-0.25}
          pcbY={9}
          connections={between("VCOM", "GND")}
        />
        <C name="C9" value="100nF" x={10.25} y={-2} a="net.VBUS" />

        {/* Sum both channels, limit full-scale level and AC-couple the single-ended input. */}
        <MixInput
          name="R8"
          pcbX={7.4}
          pcbY={0.4}
          connections={between("LEFT", "MIX")}
        />
        <MixInput
          name="R9"
          pcbX={7.4}
          pcbY={2.25}
          connections={between("RIGHT", "MIX")}
        />
        <MixShunt
          name="R10"
          pcbX={10.35}
          pcbY={1.3}
          pcbRotation={90}
          connections={between("MIX", "GND")}
        />
        <C
          name="C10"
          value="1uF"
          x={7.25}
          y={4.15}
          a="net.MIX"
          b="net.AMP_IN"
        />
        <C name="C11" value="1uF" x={10.5} y={11} a="net.AMP_REF" />
        <PAM8302AASCR
          name="U2"
          pcbX={3.1}
          pcbY={9.3}
          noConnect={["pin2"]}
          connections={{
            pin1: "net.AMP_ENABLE",
            pin3: "net.AMP_IN",
            pin4: "net.AMP_REF",
            pin5: "net.OUT_P",
            pin6: "net.VBUS",
            pin7: "net.GND",
            pin8: "net.OUT_N",
          }}
        />
        <C name="C12" value="1uF" x={4.3} y={13.5} a="net.VBUS" />
        <C
          name="C13"
          value="4.7uF"
          x={7.25}
          y={11.3}
          rotation={90}
          a="net.VBUS"
        />
        <OutputBead
          name="RF1"
          pcbX={0}
          pcbY={13.35}
          connections={between("OUT_P", "SPK_P")}
        />
        <OutputBead
          name="RF2"
          pcbX={-0.8}
          pcbY={10.9}
          connections={between("OUT_N", "SPK_N")}
        />
        <FilterCap
          name="C14"
          pcbX={-4.25}
          pcbY={8}
          connections={between("SPK_P", "GND")}
        />
        <FilterCap
          name="C15"
          pcbX={-9.25}
          pcbY={10.75}
          connections={between("SPK_N", "GND")}
        />
        <SpeakerHeader
          name="J2"
          pcbX={-4.8}
          pcbY={11.4}
          pinAttributes={{
            pin1: { isPassive: true },
            pin2: { isPassive: true },
            pin3: { requiresGround: true },
            pin4: { requiresGround: true },
          }}
          connections={{
            pin1: "net.SPK_P",
            pin2: "net.SPK_N",
            pin3: "net.GND",
            pin4: "net.GND",
          }}
        />
        <silkscreentext
          text="8Ω SPK"
          pcbX={-7.8}
          pcbY={14.25}
          fontSize={0.72}
        />
      </schematicsheet>
    </board>
  );
}
