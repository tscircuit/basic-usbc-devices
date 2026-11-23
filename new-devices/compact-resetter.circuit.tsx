import { TYPE_C_31_M_12 } from "../imports/C165948";
import { B3U_1000P } from "../imports/C231329";
import { RP2040 } from "../references/resetter/imports/RP2040";
import { W25Q16JVSNIQ } from "../references/resetter/imports/W25Q16JVSNIQ";
import { XC6206P332MR_G } from "../references/resetter/imports/XC6206P332MR_G";
import { TPS22918DBVR } from "../references/resetter/imports/TPS22918DBVR";

import { X322512MSB4SI } from "../references/resetter/imports/X322512MSB4SI";
import { LXZ1_PA01 as LuxeonZ } from "../imports/C17291105";
import { savedRouter } from "../saved-router";
import copper from "./compact-resetter-copper.json";
import { boardRules } from "../common";
import { DisplayMounts } from "./mounts";

// USB pad rows face one another. Express routing points in board coordinates,
// then rotate them into the footprint frame used by native trace paths.
function usbPath(
	side: "J2" | "J3",
	points: [number, number, ("top" | "bottom")?][],
) {
	return points.flatMap(([x, y, toLayer]) => {
		const point = {
			x: side === "J3" ? y + 1.2 : -(y + 1.2),
			y: side === "J3" ? 12.35 - x : x + 12.35,
		};
		return toLayer ? [point, { ...point, via: true, toLayer }, point] : [point];
	});
}

export default function CompactResetter() {
	return (
		<board
			{...boardRules}
			autorouter={{ local: true, algorithmFn: savedRouter(copper) }}
			name="compact_resetter"
			width={36}
			height={30}
			minTraceWidth={0.15}
			minPadEdgeToPadEdgeClearance={0.1}
			minTraceToPadEdgeClearance={0.12}
		>
			<schematicsheet
				name="resetter_sheet"
				displayName="Control port and 3.3 V regulator"
				sheetSize="A4"
			>
				<net name="VBUS_IN" nominalTraceWidth={0.4} />
				<net name="VBUS_OUT" nominalTraceWidth={0.5} />
				<silkscreentext text="CTRL" pcbX={-2.6} pcbY={13.7} fontSize={0.8} />
				<silkscreentext text="OUT" pcbX={-15} pcbY={5.05} fontSize={0.8} />
				<silkscreentext text="IN" pcbX={15} pcbY={5.05} fontSize={0.8} />
				<DisplayMounts spanX={30} spanY={20} />
				<copperpour
					name="GROUND"
					layer="bottom"
					connectsTo="net.GND"
					clearance={0.2}
					boardEdgeMargin={0.35}
				/>
				<TYPE_C_31_M_12
					name="J1"
					pcbX={4}
					pcbY={9.35}
					pcbRotation={180}
					noConnect={["pin5", "pin11"]}
					connections={{
						pin1: "net.GND",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
						pin6: "net.CTRL_CC1",
						pin12: "net.CTRL_CC2",
						pin7: "net.CTRL_DN",
						pin9: "net.CTRL_DN",
						pin8: "net.CTRL_DP",
						pin10: "net.CTRL_DP",
						pin13: "net.GND",
						pin14: "net.GND",
						pin15: "net.VBUS_CTRL",
						pin16: "net.VBUS_CTRL",
					}}
				/>
				<resistor
					name="R4"
					pcbX={6.5}
					pcbY={5.2}
					pcbRotation={270}
					resistance={5100}
					footprint="0402"
					manufacturerPartNumber="0402WGF5101TCE"
					supplierPartNumbers={{ jlcpcb: ["C25905"] }}
					connections={{ pin1: "net.CTRL_CC1", pin2: "net.GND" }}
				/>
				<resistor
					name="R5"
					pcbX={-1.75}
					pcbY={5.8}
					pcbRotation={270}
					resistance={5100}
					footprint="0402"
					manufacturerPartNumber="0402WGF5101TCE"
					supplierPartNumbers={{ jlcpcb: ["C25905"] }}
					connections={{ pin1: "net.CTRL_CC2", pin2: "net.GND" }}
				/>
				<resistor
					name="R6"
					pcbX={3.9}
					pcbY={5.05}
					pcbRotation={90}
					resistance={27}
					footprint="0402"
					manufacturerPartNumber="0402WGJ0270TCE"
					supplierPartNumbers={{ jlcpcb: ["C25156"] }}
					connections={{ pin1: "net.MCU_DP", pin2: "net.CTRL_DP" }}
				/>
				<resistor
					name="R7"
					pcbX={5}
					pcbY={5.05}
					pcbRotation={90}
					resistance={27}
					footprint="0402"
					manufacturerPartNumber="0402WGJ0270TCE"
					supplierPartNumbers={{ jlcpcb: ["C25156"] }}
					connections={{ pin1: "net.MCU_DN", pin2: "net.CTRL_DN" }}
				/>
				<XC6206P332MR_G
					name="U3"
					pcbX={11.5}
					pcbY={6.25}
					pcbRotation={0}
					connections={{
						pin1: "net.GND",
						pin2: "net.VBUS_CTRL",
						pin3: "net.V3V3",
					}}
				/>
				<capacitor
					name="C14"
					pcbX={11.6}
					pcbY={10.4}
					pcbRotation={270}
					capacitance={1e-5}
					footprint="0603"
					manufacturerPartNumber="CL10A106KP8NNNC"
					supplierPartNumbers={{ jlcpcb: ["C19702"] }}
					connections={{ pin1: "net.VBUS_CTRL", pin2: "net.GND" }}
				/>
				<capacitor
					name="C15"
					pcbX={7.65}
					pcbY={3.4}
					pcbRotation={0}
					capacitance={1e-5}
					footprint="0603"
					manufacturerPartNumber="CL10A106KP8NNNC"
					supplierPartNumbers={{ jlcpcb: ["C19702"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
			</schematicsheet>
			<schematicsheet
				name="processor_sheet"
				displayName="RP2040, clock and flash"
				sheetSize="A4"
			>
				<RP2040
					name="U1"
					pcbX={-1}
					pcbY={0}
					pcbRotation={0}
					connections={{
						pin1: "net.V3V3",
						pin10: "net.V3V3",
						pin19: "net.GND",
						pin21: "net.XOUT",
						pin22: "net.V3V3",
						pin23: "net.V1V1",
						pin29: "net.PWR_CUT",
						pin33: "net.V3V3",
						pin38: "net.VBUS_IN_SENSE",
						pin39: "net.VBUS_OUT_SENSE",
						pin42: "net.V3V3",
						pin43: "net.V3V3",
						pin44: "net.V3V3",
						pin45: "net.V1V1",
						pin46: "net.MCU_DN",
						pin47: "net.MCU_DP",
						pin48: "net.V3V3",
						pin49: "net.V3V3",
						pin50: "net.V1V1",
						pin51: "net.QSPI_SD3",
						pin52: "net.QSPI_SCLK",
						pin53: "net.QSPI_SD0",
						pin54: "net.QSPI_SD2",
						pin55: "net.QSPI_SD1",
						pin56: "net.QSPI_SS",
						pin57: "net.GND",
						pin35: "net.LED_R",
						pin36: "net.LED_G",
						pin37: "net.LED_B",
					}}
				/>
				<W25Q16JVSNIQ
					name="U2"
					pcbX={-7}
					pcbY={8.4}
					pcbRotation={0}
					connections={{
						pin1: "net.QSPI_SS",
						pin2: "net.QSPI_SD1",
						pin3: "net.QSPI_SD2",
						pin4: "net.GND",
						pin5: "net.QSPI_SD0",
						pin6: "net.QSPI_SCLK",
						pin7: "net.QSPI_SD3",
						pin8: "net.V3V3",
					}}
				/>
				<capacitor
					name="C11"
					pcbX={-11.2}
					pcbY={8.6}
					pcbRotation={90}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<X322512MSB4SI
					name="Y1"
					pcbX={-3.6}
					pcbY={-7.2}
					pcbRotation={270}
					loadCapacitance="20pF"
					connections={{
						pin1: "net.XIN",
						pin4: "net.GND",
						pin2: "net.GND",
						pin3: "net.XTAL_OUT",
					}}
				/>
				<capacitor
					name="C12"
					pcbX={-6.2}
					pcbY={-6.1}
					pcbRotation={90}
					capacitance={2.7e-11}
					footprint="0402"
					manufacturerPartNumber="CC0402JRNPO9BN270"
					supplierPartNumbers={{ jlcpcb: ["C107002"] }}
					connections={{ pin2: "net.GND" }}
				/>
				<capacitor
					name="C13"
					pcbX={-0.9}
					pcbY={-8}
					pcbRotation={90}
					capacitance={2.7e-11}
					footprint="0402"
					manufacturerPartNumber="CC0402JRNPO9BN270"
					supplierPartNumbers={{ jlcpcb: ["C107002"] }}
					connections={{ pin2: "net.GND" }}
				/>
				<resistor
					name="R2"
					pcbX={-1.35}
					pcbY={-5.4}
					pcbRotation={270}
					resistance={1000}
					footprint="0402"
					manufacturerPartNumber="0402WGF1001TCE"
					supplierPartNumbers={{ jlcpcb: ["C11702"] }}
					connections={{ pin1: "net.XOUT" }}
				/>
				<B3U_1000P
					name="SW1"
					pcbX={-12.25}
					pcbY={6}
					pcbRotation={0}
					connections={{ pin1: "net.BOOTSEL", pin2: "net.GND" }}
				/>
				<resistor
					name="R3"
					pcbX={-10.45}
					pcbY={10.75}
					pcbRotation={90}
					resistance={1000}
					footprint="0402"
					manufacturerPartNumber="0402WGF1001TCE"
					supplierPartNumbers={{ jlcpcb: ["C11702"] }}
					connections={{ pin1: "net.BOOTSEL", pin2: "net.QSPI_SS" }}
				/>
				{/* Keep the crystal load loop on the component side. */}
				<trace
					name="XTAL_LOAD"
					from=".C13 > .pin1"
					to=".Y1 > .pin3"
					thickness={0.18}
					pcbPath={[]}
				/>
				<trace
					name="XTAL_SERIES"
					from=".R2 > .pin2"
					to=".Y1 > .pin3"
					thickness={0.18}
					pcbPath={[
						{ x: 1.55, y: -0.25 },
						{ x: 2.25, y: -0.95 },
					]}
				/>
				<trace
					name="XTAL_INPUT"
					from=".U1 > .pin20"
					to=".Y1 > .pin1"
					thickness={0.18}
					pcbPath={[
						{ x: -0.6, y: -4.15 },
						{ x: -1.3, y: -4.85 },
						{ x: -2.7, y: -4.85 },
						{ x: -3.45, y: -5.6 },
					]}
				/>
				<trace
					name="XTAL_INPUT_LOAD"
					from=".Y1 > .pin1"
					to=".C12 > .pin1"
					thickness={0.18}
					pcbPath={[{ x: -1.1, y: -2.09 }]}
				/>
			</schematicsheet>
			<schematicsheet
				name="decoupling_sheet"
				displayName="RP2040 supply decoupling"
				sheetSize="A4"
			>
				<capacitor
					name="C1"
					pcbX={-5.8}
					pcbY={2.6}
					pcbRotation={90}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<capacitor
					name="C2"
					pcbX={-5.8}
					pcbY={-1}
					pcbRotation={90}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<capacitor
					name="C3"
					pcbX={-0.1}
					pcbY={-5.4}
					pcbRotation={270}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<capacitor
					name="C4"
					pcbX={1.15}
					pcbY={-5.4}
					pcbRotation={270}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V1V1", pin2: "net.GND" }}
				/>
				<capacitor
					name="C5"
					pcbX={4.25}
					pcbY={-0.25}
					pcbRotation={90}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<capacitor
					name="C6"
					pcbX={4.3}
					pcbY={2.8}
					pcbRotation={90}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<capacitor
					name="C7"
					pcbX={2.2}
					pcbY={4.8}
					pcbRotation={0}
					capacitance={1e-6}
					footprint="0402"
					manufacturerPartNumber="CL05A105KA5NQNC"
					supplierPartNumbers={{ jlcpcb: ["C52923"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
				<capacitor
					name="C8"
					pcbX={0.2}
					pcbY={4.8}
					pcbRotation={0}
					capacitance={1e-6}
					footprint="0402"
					manufacturerPartNumber="CL05A105KA5NQNC"
					supplierPartNumbers={{ jlcpcb: ["C52923"] }}
					connections={{ pin1: "net.V1V1", pin2: "net.GND" }}
				/>
				<capacitor
					name="C9"
					pcbX={-2.8}
					pcbY={5.3}
					pcbRotation={90}
					capacitance={1e-7}
					footprint="0402"
					manufacturerPartNumber="CL05B104KO5NNNC"
					supplierPartNumbers={{ jlcpcb: ["C1525"] }}
					connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
				/>
			</schematicsheet>
			<schematicsheet
				name="power_sheet"
				displayName="USB passthrough and switched power"
				sheetSize="A4"
			>
				<TYPE_C_31_M_12
					name="J3"
					pcbX={12.35}
					pcbY={-1.2}
					pcbRotation={90}
					noConnect={["pin5", "pin11"]}
					connections={{
						pin1: "net.GND",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
						pin6: "net.IN_CC1",
						pin12: "net.IN_CC2",
						pin9: "net.PT_DN",
						pin8: "net.PT_DP",
						pin13: "net.GND",
						pin14: "net.GND",
						pin15: "net.VBUS_IN",
						pin16: "net.VBUS_IN",
					}}
				/>
				<resistor
					name="R8"
					pcbX={7.5}
					pcbY={0.85}
					pcbRotation={0}
					resistance={5100}
					footprint="0402"
					manufacturerPartNumber="0402WGF5101TCE"
					supplierPartNumbers={{ jlcpcb: ["C25905"] }}
					connections={{ pin1: "net.IN_CC2", pin2: "net.GND" }}
				/>
				<resistor
					name="R9"
					pcbX={8.25}
					pcbY={-3.6}
					pcbRotation={180}
					resistance={5100}
					footprint="0402"
					manufacturerPartNumber="0402WGF5101TCE"
					supplierPartNumbers={{ jlcpcb: ["C25905"] }}
					connections={{ pin1: "net.IN_CC1", pin2: "net.GND" }}
				/>
				<TYPE_C_31_M_12
					name="J2"
					pcbX={-12.35}
					pcbY={-1.2}
					pcbRotation={270}
					noConnect={["pin5", "pin11"]}
					connections={{
						pin1: "net.GND",
						pin2: "net.GND",
						pin3: "net.GND",
						pin4: "net.GND",
						pin6: "net.OUT_CC1",
						pin12: "net.OUT_CC2",
						pin13: "net.GND",
						pin14: "net.GND",
						pin15: "net.VBUS_OUT",
						pin16: "net.VBUS_OUT",
					}}
				/>
				<resistor
					name="R10"
					pcbX={-8}
					pcbY={-5}
					pcbRotation={0}
					resistance={56000}
					footprint="0402"
					manufacturerPartNumber="RC0402FR-0756KL"
					supplierPartNumbers={{ jlcpcb: ["C114756"] }}
					connections={{ pin1: "net.OUT_CC1", pin2: "net.VBUS_OUT" }}
				/>
				<resistor
					name="R11"
					pcbX={-8}
					pcbY={-3.8}
					pcbRotation={0}
					resistance={56000}
					footprint="0402"
					manufacturerPartNumber="RC0402FR-0756KL"
					supplierPartNumbers={{ jlcpcb: ["C114756"] }}
					connections={{ pin1: "net.OUT_CC2", pin2: "net.VBUS_OUT" }}
				/>
				<TPS22918DBVR
					name="U4"
					pcbX={4.6}
					pcbY={-8.5}
					pcbRotation={0}
					connections={{
						pin1: "net.VBUS_IN",
						pin2: "net.GND",
						pin3: "net.PWR_EN",
						pin4: "net.PWR_CT",
						pin5: "net.VBUS_OUT",
						pin6: "net.VBUS_OUT",
					}}
				/>
				<capacitor
					name="C16"
					pcbX={8}
					pcbY={-9}
					pcbRotation={90}
					capacitance={1e-5}
					footprint="0603"
					manufacturerPartNumber="CL10A106KP8NNNC"
					supplierPartNumbers={{ jlcpcb: ["C19702"] }}
					connections={{ pin1: "net.VBUS_IN", pin2: "net.GND" }}
				/>
				<capacitor
					name="C17"
					pcbX={1.4}
					pcbY={-9}
					pcbRotation={90}
					capacitance={1e-6}
					footprint="0402"
					manufacturerPartNumber="CL05A105KA5NQNC"
					supplierPartNumbers={{ jlcpcb: ["C52923"] }}
					connections={{ pin1: "net.VBUS_OUT", pin2: "net.GND" }}
				/>
				<capacitor
					name="C18"
					pcbX={4.5}
					pcbY={-6}
					pcbRotation={0}
					capacitance={1e-9}
					footprint="0402"
					manufacturerPartNumber="0402B102K500NT"
					supplierPartNumbers={{ jlcpcb: ["C1523"] }}
					connections={{ pin1: "net.PWR_CT", pin2: "net.GND" }}
				/>
				<resistor
					name="R12"
					pcbX={7.8}
					pcbY={-6}
					pcbRotation={0}
					resistance={100000}
					footprint="0402"
					manufacturerPartNumber="0402WGF1003TCE"
					supplierPartNumbers={{ jlcpcb: ["C25741"] }}
					connections={{ pin1: "net.PWR_EN", pin2: "net.VBUS_IN" }}
				/>
				<mosfet
					channelType="n"
					mosfetMode="enhancement"
					manufacturerPartNumber="2N7002"
					supplierPartNumbers={{ jlcpcb: ["C8545"] }}
					footprint="sot23w_p1mm_pw0.65mm_pin1location(rightside,bottom)"
					pinLabels={{ pin1: ["gate"], pin2: ["source"], pin3: ["drain"] }}
					cadModel={{
						objUrl:
							"https://modelcdn.tscircuit.com/easyeda_models/assets/C8545.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
						stepUrl:
							"https://modelcdn.tscircuit.com/easyeda_models/assets/C8545.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
						pcbRotationOffset: 180,
						modelOriginPosition: { x: 0.0000127, y: -0.0000127, z: 0.050795 },
					}}
					name="Q1"
					pcbX={5.3}
					pcbY={-3.1}
					pcbRotation={0}
					connections={{
						pin3: "net.PWR_EN",
						pin1: "net.PWR_CUT",
						pin2: "net.GND",
					}}
				/>
				<resistor
					name="R13"
					pcbX={2.4}
					pcbY={-5.4}
					pcbRotation={90}
					resistance={100000}
					footprint="0402"
					manufacturerPartNumber="0402WGF1003TCE"
					supplierPartNumbers={{ jlcpcb: ["C25741"] }}
					connections={{ pin1: "net.PWR_CUT", pin2: "net.GND" }}
				/>
				<resistor
					name="R14"
					pcbX={9}
					pcbY={-11.4}
					pcbRotation={180}
					resistance={100000}
					footprint="0402"
					manufacturerPartNumber="0402WGF1003TCE"
					supplierPartNumbers={{ jlcpcb: ["C25741"] }}
					connections={{ pin1: "net.VBUS_IN", pin2: "net.VBUS_IN_SENSE" }}
				/>
				<resistor
					name="R15"
					pcbX={9}
					pcbY={-12.65}
					pcbRotation={0}
					resistance={150000}
					footprint="0402"
					manufacturerPartNumber="RC0402FR-07150KL"
					supplierPartNumbers={{ jlcpcb: ["C93947"] }}
					connections={{ pin1: "net.VBUS_IN_SENSE", pin2: "net.GND" }}
				/>
				<resistor
					name="R16"
					pcbX={-9}
					pcbY={-7.5}
					pcbRotation={0}
					resistance={100000}
					footprint="0402"
					manufacturerPartNumber="0402WGF1003TCE"
					supplierPartNumbers={{ jlcpcb: ["C25741"] }}
					connections={{ pin1: "net.VBUS_OUT", pin2: "net.VBUS_OUT_SENSE" }}
				/>
				<resistor
					name="R17"
					pcbX={-9}
					pcbY={-8.8}
					pcbRotation={180}
					resistance={150000}
					footprint="0402"
					manufacturerPartNumber="RC0402FR-07150KL"
					supplierPartNumbers={{ jlcpcb: ["C93947"] }}
					connections={{ pin1: "net.VBUS_OUT_SENSE", pin2: "net.GND" }}
				/>

				{/* Tie the reversible contacts locally. The two through paths share
        the bottom layer and use one layer change near each receptacle. */}
				{(["J2", "J3"] as const).map((j) => {
					const sign = j === "J3" ? 1 : -1;
					const y7 = j === "J3" ? -1.95 : -0.45;
					const y8 = j === "J3" ? -1.45 : -0.95;
					const y9 = j === "J3" ? -0.95 : -1.45;
					const y10 = j === "J3" ? -0.45 : -1.95;
					return (
						<group key={j}>
							<trace
								name={j + "_DM_TIE"}
								from={`.${j} > .pin7`}
								to={`.${j} > .pin9`}
								thickness={0.2}
								pcbPath={usbPath(j, [
									[sign * 11.3, y7],
									[sign * 11.3, y9],
								])}
							/>
							<trace
								name={j + "_DP_TIE"}
								from={`.${j} > .pin8`}
								to={`.${j} > .pin10`}
								thickness={0.2}
								pcbPath={usbPath(j, [
									[sign * 9.1, y8],
									[sign * 9.1, y10],
								])}
							/>
						</group>
					);
				})}
				<trace
					name="DM_THROUGH"
					from=".J3 > .pin9"
					to=".J2 > .pin7"
					thickness={0.2}
					pcbPath={usbPath("J3", [
						[11.3, -0.95, "bottom"],
						[-10.8, -0.95],
						[-11.3, -0.45, "top"],
					])}
				/>
				<trace
					name="DP_THROUGH"
					from=".J3 > .pin8"
					to=".J2 > .pin10"
					thickness={0.2}
					pcbPath={usbPath("J3", [
						[9.1, -1.65, "bottom"],
						[8.9, -1.45],
						[-8.6, -1.45],
						[-9.1, -1.95, "top"],
					])}
				/>
			</schematicsheet>
			<schematicsheet
				name="indicator_sheet"
				displayName="Status indicator"
				sheetSize="A4"
			>
				{/* Three MSL 1 emitters share the LUXEON Z land pattern. Each GPIO
        sinks its own current from the regulated control supply. */}
				{(
					[
						["R", -5, "LXZ1-PA01", "C17291105", "red"],
						["G", -3, "LXZ1-PM01", "C17201313", "green"],
						["B", -1, "LXZ1-PB01", "C7436942", "blue"],
					] as const
				).map(([channel, x, mpn, code, color], i) => (
					<group key={channel}>
						<LuxeonZ
							name={`D${i + 1}`}
							pcbX={x}
							pcbY={-12}
							color={color}
							manufacturerPartNumber={mpn}
							supplierPartNumbers={{ jlcpcb: [code] }}
							connections={{ pin2: "net.V3V3", pin1: `net.K_${channel}` }}
						/>
						<resistor
							name={`R${18 + i}`}
							pcbX={x}
							pcbY={-13.85}
							footprint="0402"
							resistance="1k"
							manufacturerPartNumber="0402WGF1001TCE"
							supplierPartNumbers={{ jlcpcb: ["C11702"] }}
							connections={{
								pin1: `net.K_${channel}`,
								pin2: `net.LED_${channel}`,
							}}
						/>
					</group>
				))}
			</schematicsheet>
		</board>
	);
}
