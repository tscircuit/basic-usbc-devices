import type { LedProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["cathode", "neg"],
	pin2: ["anode", "pos"],
} as const;

export const LXZ1_PA01 = (props: LedProps) => {
	const { name = "LED1", ...restProps } = props;

	return (
		<led
			name={name}
			pinLabels={pinLabels}
			supplierPartNumbers={{
				jlcpcb: ["C17291105"],
			}}
			manufacturerPartNumber="LXZ1-PA01"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin2", "anode", "pos"]}
						pcbX="0.324993mm"
						pcbY="0mm"
						width="0.4500118mm"
						height="1.499997mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin1", "cathode", "neg"]}
						pcbX="-0.324993mm"
						pcbY="0mm"
						width="0.4500118mm"
						height="1.499997mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: -0.730122999999935, y: -0.850010999999995 },
							{ x: 0.7301484000000755, y: -0.850010999999995 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -0.730122999999935, y: 0.8499855999999681 },
							{ x: 0.7700264000000061, y: 0.8499855999999681 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.7301484000000755, y: -0.850010999999995 },
							{ x: 0.7700264000000061, y: -0.850010999999995 },
							{ x: 0.7700264000000061, y: 0.8499855999999681 },
							{ x: 0.7301484000000755, y: 0.8499855999999681 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -0.730122999999935, y: 0.8499855999999681 },
							{ x: -0.7899653999999146, y: 0.8499855999999681 },
							{ x: -0.7899653999999146, y: -0.850010999999995 },
							{ x: -0.730122999999935, y: -0.850010999999995 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -0.7799831999999469, y: -1.2199874000000364 },
							{ x: -1.2199365999999827, y: -1.2200127999999495 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.5200141999998777, y: -1.210005199999955 },
							{ x: 0.9599676000000272, y: -1.210005199999955 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.7400290000000496, y: -1.0601705999998785 },
							{ x: 0.7400290000000496, y: -1.3400278000000299 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.121793mm"
						pcbY="1.8382mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<fabricationnotepath
						route={[
							{ x: 0.10002520000000459, y: -0.8800083999998378 },
							{ x: 0.10002520000000459, y: -0.7300214000000551 },
							{ x: 0.5600192000000561, y: -0.7300214000000551 },
							{ x: 0.5600192000000561, y: -0.8800083999998378 },
							{ x: 0.10002520000000459, y: -0.8800083999998378 },
						]}
						strokeWidth="0mm"
						isFilled
						hasStroke={false}
					/>
					<fabricationnotepath
						route={[
							{ x: 0.2600198000000091, y: -0.6300215999999637 },
							{ x: 0.2600198000000091, y: -0.9900157999999237 },
							{ x: 0.4000246000000516, y: -0.9900157999999237 },
							{ x: 0.4000246000000516, y: -0.6300215999999637 },
							{ x: 0.2600198000000091, y: -0.6300215999999637 },
						]}
						strokeWidth="0mm"
						isFilled
						hasStroke={false}
					/>
					<fabricationnotepath
						route={[
							{ x: -0.5499607999998943, y: -0.8800083999998378 },
							{ x: -0.5499607999998943, y: -0.7300214000000551 },
							{ x: -0.08996680000007018, y: -0.7300214000000551 },
							{ x: -0.08996680000007018, y: -0.8800083999998378 },
							{ x: -0.5499607999998943, y: -0.8800083999998378 },
						]}
						strokeWidth="0mm"
						isFilled
						hasStroke={false}
					/>
					<courtyardoutline
						outline={[
							{ x: -0.9050151999999798, y: 1.1000110000001087 },
							{ x: 0.904989799999953, y: 1.1000110000001087 },
							{ x: 0.904989799999953, y: -1.0999855999998545 },
							{ x: -0.9050151999999798, y: -1.0999855999998545 },
							{ x: -0.9050151999999798, y: 1.1000110000001087 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C17291105.obj?uuid=235145984e9a4a47a0515fe858354e40",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C17291105.step?uuid=235145984e9a4a47a0515fe858354e40",
				pcbRotationOffset: 0,
				modelOriginPosition: {
					x: 0.005012700000070258,
					y: -0.000012700000070253736,
					z: -0.51,
				},
			}}
			{...restProps}
		/>
	);
};
