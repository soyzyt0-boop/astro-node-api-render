export function resolveUsefulGods(strengthProfile, pattern) {
  const strength = strengthProfile?.strength || "unknown";
  const monthRel = strengthProfile?.relations?.month?.branchRelation || "unknown";
  const summary = strengthProfile?.exactShiShenSummary || strengthProfile?.relationSummary || {};
  const supportCount = summary.support || 0;
  const outputCount = summary.output || 0;
  const wealthCount = summary.wealth || 0;
  const powerCount = summary.power || 0;

  if (strength === "strong") {
    if (monthRel === "same" || monthRel === "resource" || supportCount >= outputCount + wealthCount + powerCount) {
      return {
        usefulGods: ["财", "官杀", "食伤"],
        unfavorableGods: ["比劫", "印"],
      };
    }
    if (outputCount >= wealthCount) {
      return {
        usefulGods: ["食伤", "财"],
        unfavorableGods: ["比劫", "印"],
      };
    }
    return {
      usefulGods: ["财", "食伤"],
      unfavorableGods: ["比劫", "印"],
    };
  }

  if (strength === "weak") {
    if (String(pattern || "").includes("财官") || wealthCount + powerCount > supportCount) {
      return {
        usefulGods: ["印", "比劫"],
        unfavorableGods: ["财", "官杀", "食伤"],
      };
    }
    return {
      usefulGods: ["印", "比劫"],
      unfavorableGods: ["财", "官杀"],
    };
  }

  return {
    usefulGods: ["印", "财"],
    unfavorableGods: ["比劫", "官杀"],
  };
}
