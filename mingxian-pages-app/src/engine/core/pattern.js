export function judgePattern(dayMaster, strengthProfile) {
  if (!dayMaster) return "待判";
  const score = strengthProfile?.score ?? 0;
  const monthRel = strengthProfile?.relations?.month?.branchRelation || "unknown";
  const relationSummary = strengthProfile?.exactShiShenSummary || strengthProfile?.relationSummary || {};
  const pressureCount = (relationSummary.power || 0) + (relationSummary.wealth || 0);
  const supportCount = relationSummary.support || 0;
  const outputCount = relationSummary.output || 0;

  if (strengthProfile?.strength === "weak") {
    if (monthRel === "power" || monthRel === "wealth" || pressureCount >= supportCount + 2) return "身弱财官偏重";
    if (monthRel === "resource" || monthRel === "same") return "身弱印比为先";
    return "身弱待扶";
  }

  if (strengthProfile?.strength === "strong") {
    if (monthRel === "same" || monthRel === "resource" || supportCount >= pressureCount + 2) return "身强比印偏重";
    if (monthRel === "output" || monthRel === "wealth" || outputCount + pressureCount >= supportCount) return "身强宜泄宜制";
    return "身强待疏";
  }

  if (score >= -0.3 && score <= 0.6) {
    return "中和偏杂格";
  }

  return "中和待细判";
}
