import { boardRules } from "../common";
export { savedRouter } from "../saved-router";

export const displayRules = {
  ...boardRules,
  layers: 4,
  minTraceWidth: 0.13,
  minTraceToPadEdgeClearance: 0.135,
  minViaEdgeToPadEdgeClearance: 0.15,
  minViaPadDiameter: 0.45,
  minViaHoleDiameter: 0.2,
  pcbStyle: { viaPadDiameter: 0.45, viaHoleDiameter: 0.2 },
} as const;
