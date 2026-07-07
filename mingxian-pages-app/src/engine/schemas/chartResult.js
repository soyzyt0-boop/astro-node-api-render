export function buildEmptyChartResult(input) {
  return {
    input,
    pillars: {
      year: "",
      month: "",
      day: "",
      hour: input.timeKnown ? "" : undefined,
    },
    dayMaster: "",
    strength: "unknown",
    pattern: "待判",
    usefulGods: [],
    unfavorableGods: [],
    dayun: [],
    dayunStages: [],
    annualScores: [],
    precision: input.timeKnown ? "full" : "reduced",
    notes: [],
  };
}
