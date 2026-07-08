function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function coreNeed(context = {}) {
  const pattern = String(context.pattern || "");
  const monthRelation = context.monthRelation || "";
  if (context.strength === "weak") {
    if (pattern.includes("财官")) return "support_first";
    return "support";
  }
  if (context.strength === "strong") {
    if (pattern.includes("比印") || monthRelation === "same" || monthRelation === "resource") return "release_control";
    if (pattern.includes("泄") || pattern.includes("制")) return "release";
    return "release_control";
  }
  return "balance";
}

function medicineMatch(item, context = {}) {
  const need = coreNeed(context);
  const usefulLead = (item.usefulCount || 0) - (item.unfavorableCount || 0);
  const stem = item.stemRelation || "";
  const branch = item.branchRelation || "";
  const pair = [stem, branch];

  if (need === "support_first") {
    let score = 0;
    if (pair.includes("印")) score += 0.9;
    if (pair.includes("比劫")) score += 0.55;
    if (pair.includes("财")) score -= 0.7;
    if (pair.includes("官杀")) score -= 0.78;
    return score + usefulLead * 0.08;
  }

  if (need === "support") {
    let score = 0;
    if (pair.includes("印")) score += 0.72;
    if (pair.includes("比劫")) score += 0.48;
    if (pair.includes("财")) score -= 0.52;
    if (pair.includes("官杀")) score -= 0.58;
    return score + usefulLead * 0.06;
  }

  if (need === "release_control") {
    let score = 0;
    if (pair.includes("财")) score += 0.72;
    if (pair.includes("官杀")) score += 0.66;
    if (pair.includes("食伤")) score += 0.54;
    if (pair.includes("印")) score -= 0.58;
    if (pair.includes("比劫")) score -= 0.66;
    return score + usefulLead * 0.06;
  }

  if (need === "release") {
    let score = 0;
    if (pair.includes("食伤")) score += 0.72;
    if (pair.includes("财")) score += 0.46;
    if (pair.includes("印")) score -= 0.34;
    if (pair.includes("比劫")) score -= 0.4;
    return score + usefulLead * 0.05;
  }

  return usefulLead * 0.05;
}

export function derivePhaseModel(dayun, anchors, context = {}) {
  const anchorByYear = new Map(
    anchors
      .filter((item) => typeof item.year === "number")
      .map((item) => [item.year, item])
  );

  const dayunTrend = dayun.map((yun) => ({
    ...yun,
    ...(anchorByYear.get(yun.startYear) || {}),
    shift: anchorByYear.get(yun.startYear)?.shift ?? 0,
  }));

  const earlyPressureCount = dayunTrend.filter((item) => item.startAge <= 32 && item.shift <= -0.18).length;
  const earlyFlatOrLowerCount = dayunTrend.filter((item) => item.startAge <= 32 && item.shift <= 0.12).length;
  const breakthrough = dayunTrend.find((item) => item.startAge >= 32 && item.shift >= 0.52);
  const sustainPivot = dayunTrend.find((item) => item.startAge >= 24 && item.shift >= 0.32);
  const stableLater = dayunTrend.some((item) => item.startAge >= 50 && item.shift >= 0.22);
  const needsRelease = context.strength === "strong" && String(context.pattern || "").includes("比印");
  const needsSupport = context.strength === "weak";
  const pattern = String(context.pattern || "");

  const decadeStages = dayunTrend.map((item, index) => {
    const prev = dayunTrend[index - 1] || null;
    let key = "flat";
    let label = "平走";
    const usefulLead = (item.usefulCount || 0) - (item.unfavorableCount || 0);
    const structure = item.structureOverall || 0;
    const favorability = item.favorability || 0;
    const medicine = medicineMatch(item, context);

    const riseGate = needsRelease ? usefulLead >= 1 || favorability >= 0.36 : usefulLead >= 0 || favorability >= 0.18;
    const pressureGate = needsSupport ? usefulLead <= -1 || favorability <= -0.36 : usefulLead <= 0 || favorability <= -0.18;

    if (item.shift >= 0.75 || ((favorability >= 1.1 || medicine >= 0.82) && usefulLead >= 2 && riseGate)) {
      key = "surge";
      label = "高助";
    } else if (item.shift >= 0.32 || (((favorability >= 0.48 || medicine >= 0.42) && usefulLead >= 1) || (riseGate && item.shift >= 0.18 && structure > 0))) {
      key = "rise";
      label = "偏助";
    } else if (item.shift <= -0.75 || ((favorability <= -1.1 || medicine <= -0.82) && usefulLead <= -2 && pressureGate)) {
      key = "compression";
      label = "重压";
    } else if (item.shift <= -0.28 || (((favorability <= -0.48 || medicine <= -0.42) && usefulLead <= -1) || (pressureGate && item.shift <= -0.18 && structure < 0))) {
      key = "pressure";
      label = "承压";
    }

    if (prev) {
      const delta = item.shift - prev.shift;
      const structureDelta = structure - (prev.structureOverall || 0);
      if ((delta >= 0.42 || (favorability - (prev.favorability || 0) >= 0.5) || (medicine - (prev.medicineMatch || 0) >= 0.45) || structureDelta >= 0.18) && item.shift > 0.12) {
        key = "turn_up";
        label = "转升";
      } else if ((delta <= -0.42 || (favorability - (prev.favorability || 0) <= -0.5) || (medicine - (prev.medicineMatch || 0) <= -0.45) || structureDelta <= -0.18) && item.shift < 0.18) {
        key = "turn_down";
        label = "转压";
      }
    }

    return {
      ...item,
      medicineMatch: Number(medicine.toFixed(2)),
      stageKey: key,
      stageLabel: label,
    };
  });

  const lateBloom = Boolean(
    breakthrough
    && breakthrough.startAge >= 36
    && earlyPressureCount >= 2
    && earlyFlatOrLowerCount >= 2
    && (needsSupport || pattern.includes("比印"))
  );

  const sustainTrack = Boolean(
    !lateBloom
    && sustainPivot
    && sustainPivot.startAge <= 36
    && context.strength === "strong"
    && (pattern.includes("宜泄") || pattern.includes("待疏"))
  );

  return {
    trajectory: lateBloom ? "late_bloom" : sustainTrack ? "sustain" : "plain",
    lateBloom,
    sustainTrack,
    breakthroughYear: lateBloom ? breakthrough?.startYear ?? null : sustainTrack ? sustainPivot?.startYear ?? null : breakthrough?.startYear ?? null,
    breakthroughAge: lateBloom ? breakthrough?.startAge ?? null : sustainTrack ? sustainPivot?.startAge ?? null : breakthrough?.startAge ?? null,
    stableLater,
    dayunTrend: decadeStages,
  };
}

function decadeStageAtYear(year, phaseModel) {
  return phaseModel?.dayunTrend?.find((item) => year >= item.startYear && year <= item.endYear) || null;
}

export function phaseAtYear(year, phaseModel) {
  const decadeStage = decadeStageAtYear(year, phaseModel);
  const generalPhase = decadeStage
    ? { key: decadeStage.stageKey, label: decadeStage.stageLabel, progress: 0, decadeStage }
    : { key: "normal", label: "常运", progress: 0, decadeStage: null };

  if (!phaseModel?.breakthroughYear) {
    return generalPhase;
  }

  if (phaseModel?.sustainTrack) {
    const yearsSince = year - phaseModel.breakthroughYear;
    if (yearsSince < 0) return { key: "pre_sustain", label: "续旧", progress: 0, decadeStage };
    if (decadeStage?.stageKey === "turn_up" || decadeStage?.stageKey === "surge" || decadeStage?.stageKey === "rise") {
      if (yearsSince <= 8) return { key: "sustain_rise", label: "续势", progress: clamp(yearsSince / 8, 0, 1), decadeStage };
      return { key: "sustain_hold", label: "持势", progress: clamp((yearsSince - 8) / 10, 0, 1), decadeStage };
    }
    if (decadeStage?.stageKey === "turn_down" || decadeStage?.stageKey === "pressure" || decadeStage?.stageKey === "compression") {
      return { key: "sustain_guard", label: "转守", progress: clamp(Math.max(0, yearsSince - 6) / 12, 0, 1), decadeStage };
    }
    return { key: "sustain_tail", label: "余势", progress: clamp(Math.max(0, yearsSince - 10) / 12, 0, 1), decadeStage };
  }

  if (!phaseModel?.lateBloom) {
    return generalPhase;
  }

  const yearsSince = year - phaseModel.breakthroughYear;
  if (yearsSince < 0) return { key: "pre_breakthrough", label: "未起", progress: 0, decadeStage };

  if (decadeStage?.stageKey === "compression" || decadeStage?.stageKey === "pressure" || decadeStage?.stageKey === "turn_down") {
    if (yearsSince <= 16) return { key: "regroup", label: "回整", progress: clamp(yearsSince / 16, 0, 1), decadeStage };
    return { key: "consolidation", label: "守位", progress: clamp((yearsSince - 16) / 10, 0, 1), decadeStage };
  }

  if (decadeStage?.stageKey === "turn_up" || decadeStage?.stageKey === "surge" || decadeStage?.stageKey === "rise") {
    if (yearsSince <= 8) return { key: "breakthrough", label: "起势", progress: yearsSince / 8, decadeStage };
    if (yearsSince <= 16) return { key: "regroup", label: "回整", progress: (yearsSince - 9) / 7, decadeStage };
    if (yearsSince <= 28) return { key: "consolidation", label: "守位", progress: (yearsSince - 17) / 11, decadeStage };
    return { key: "late_ascent", label: "厚起", progress: Math.min(1, (yearsSince - 29) / 10), decadeStage };
  }

  if (yearsSince <= 8) return { key: "breakthrough", label: "起势", progress: yearsSince / 8, decadeStage };
  if (yearsSince <= 16) return { key: "regroup", label: "回整", progress: (yearsSince - 9) / 7, decadeStage };
  if (yearsSince <= 28) return { key: "consolidation", label: "守位", progress: (yearsSince - 17) / 11, decadeStage };
  return { key: "late_ascent", label: "厚起", progress: Math.min(1, (yearsSince - 29) / 10), decadeStage };
}

export function isRegroupPhase(year, phaseModel) {
  const phase = phaseAtYear(year, phaseModel);
  return phase.key === "regroup" || phase.key === "consolidation";
}

export function regroupRipple(year, phaseModel, yearFavorabilityLimited, yearActionBucket, yunActionBucket, yearDrive) {
  if (!isRegroupPhase(year, phaseModel)) return 0;
  const yearsSince = year - phaseModel.breakthroughYear;
  const stageFade = yearsSince <= 14 ? 1 : yearsSince <= 20 ? 0.82 : 0.68;
  const structural = yearActionBucket.overall * 0.72 + yunActionBucket.overall * 0.36;
  const dynamic = yearFavorabilityLimited * 0.52 + yearDrive * 0.16;
  return clamp((structural + dynamic) * stageFade, -0.28, 0.32);
}

export function smoothingWeights(year, phaseModel) {
  const phase = phaseAtYear(year, phaseModel);
  if (phase.key === "sustain_rise") return { current: 0.84, previous: 0.16 };
  if (phase.key === "sustain_hold") return { current: 0.86, previous: 0.14 };
  if (phase.key === "sustain_guard") return { current: 0.88, previous: 0.12 };
  if (phase.key === "sustain_tail") return { current: 0.87, previous: 0.13 };
  if (phase.key === "regroup") return { current: 0.9, previous: 0.1 };
  if (phase.key === "consolidation") return { current: 0.88, previous: 0.12 };
  if (phase.key === "late_ascent") return { current: 0.84, previous: 0.16 };
  return { current: 0.82, previous: 0.18 };
}

export function phaseAdjustment(year, phaseModel, decadeShift, yearFavorabilityLimited, yearDrive) {
  const phase = phaseAtYear(year, phaseModel);
  const p = phase.progress ?? 0;
  if (phase.key === "surge" || phase.key === "turn_up") {
    return clamp(Math.max(0, decadeShift) * 0.08 + Math.max(0, yearFavorabilityLimited) * 0.06, 0, 0.14);
  }
  if (phase.key === "pressure" || phase.key === "compression" || phase.key === "turn_down") {
    return clamp(Math.min(0, decadeShift) * 0.06 + Math.min(0, yearFavorabilityLimited) * 0.05, -0.14, 0.04);
  }
  if (phase.key === "rise") {
    return clamp(Math.max(0, decadeShift) * 0.05 + yearDrive * 0.03, -0.02, 0.1);
  }
  if (phase.key === "sustain_rise") {
    return clamp(0.03 + Math.max(0, decadeShift) * 0.05 + Math.max(0, yearFavorabilityLimited) * 0.06, 0.02, 0.16);
  }
  if (phase.key === "sustain_hold") {
    return clamp(0.01 + decadeShift * 0.03 + yearFavorabilityLimited * 0.04, -0.04, 0.1);
  }
  if (phase.key === "sustain_guard") {
    return clamp(-0.02 + Math.min(0, decadeShift) * 0.03 + yearDrive * 0.02, -0.1, 0.05);
  }
  if (phase.key === "sustain_tail") {
    return clamp(decadeShift * 0.02 + yearFavorabilityLimited * 0.03, -0.05, 0.08);
  }
  if (phase.key === "breakthrough") {
    if (phaseModel?.lateBloom) {
      return clamp(0.02 + Math.max(0, decadeShift) * (0.04 + p * 0.02) + Math.max(0, yearFavorabilityLimited) * 0.06, 0.01, 0.14);
    }
    return clamp(0.05 + Math.max(0, decadeShift) * (0.08 + p * 0.03) + Math.max(0, yearFavorabilityLimited) * 0.1, 0.04, 0.24);
  }
  if (phase.key === "regroup") {
    if (phaseModel?.lateBloom) {
      return clamp(-0.015 - p * 0.02 + Math.min(0, decadeShift) * 0.015 + yearDrive * 0.025, -0.08, 0.05);
    }
    return clamp(-0.04 - p * 0.04 + Math.min(0, decadeShift) * 0.03 + yearDrive * 0.04, -0.16, 0.05);
  }
  if (phase.key === "consolidation") {
    if (phaseModel?.lateBloom) {
      return clamp(0.005 + decadeShift * 0.02 + yearFavorabilityLimited * 0.035, -0.03, 0.08);
    }
    return clamp(-0.01 + decadeShift * 0.03 + yearFavorabilityLimited * 0.05, -0.06, 0.09);
  }
  if (phase.key === "late_ascent") {
    return clamp(0.04 + p * 0.06 + Math.max(0, decadeShift) * 0.08 + Math.max(0, yearFavorabilityLimited) * 0.08, 0.02, 0.24);
  }
  return 0;
}

export function lateBloomPeakCap(year, phaseModel, rawOverall) {
  if (!phaseModel?.lateBloom || !phaseModel.breakthroughYear) return rawOverall;
  const yearsSince = year - phaseModel.breakthroughYear;
  if (yearsSince < 0) return rawOverall;
  if (yearsSince <= 2) return Math.min(rawOverall, 5.85);
  if (yearsSince <= 5) return Math.min(rawOverall, 6.15);
  if (yearsSince <= 8) return Math.min(rawOverall, 6.35);
  if (yearsSince <= 12) return Math.min(rawOverall, 6.45);
  return rawOverall;
}

export function postBreakthroughFloor(year, age, phaseModel, runningPeak, decadeShift, rawOverall) {
  if (!phaseModel?.lateBloom) return rawOverall;
  if (!phaseModel.breakthroughYear || year < phaseModel.breakthroughYear + 4) return rawOverall;
  if (runningPeak < 6.1) return rawOverall;

  const yearsSince = year - phaseModel.breakthroughYear;
  const highPeak = runningPeak >= 7;
  let contourFloor = 0;

  if (yearsSince <= 10) {
    const t = clamp((yearsSince - 4) / 6, 0, 1);
    contourFloor = lerp(highPeak ? 5.9 : 5.68, highPeak ? 5.72 : 5.48, t);
  } else if (yearsSince <= 20) {
    const t = clamp((yearsSince - 10) / 10, 0, 1);
    contourFloor = lerp(highPeak ? 5.72 : 5.48, highPeak ? 5.48 : 5.26, t);
  } else {
    const t = clamp((yearsSince - 20) / 12, 0, 1);
    contourFloor = lerp(highPeak ? 5.28 : 5.05, phaseModel.stableLater ? (highPeak ? 5.78 : 5.52) : (highPeak ? 5.45 : 5.18), t);
  }

  let structuralFloor = 0;
  if (highPeak) {
    structuralFloor = decadeShift > 0.22 ? 5.78 : decadeShift > -0.18 ? 5.52 : 5.28;
  } else {
    structuralFloor = decadeShift > 0.22 ? 5.48 : decadeShift > -0.18 ? 5.24 : 5.02;
  }

  let floor = Math.max(contourFloor, structuralFloor);
  if (yearsSince >= 8 && yearsSince <= 22) {
    const release = yearsSince <= 14 ? 0.02 : yearsSince <= 18 ? 0.05 : 0.04;
    floor -= release;
  }

  if (phaseModel.stableLater && age >= 55) floor += 0.14;
  if (phaseModel.stableLater && age >= 60 && decadeShift <= -0.18) floor += 0.12;
  if (age >= 62) floor -= 0.04;

  const yearsSincePeakOpen = year - phaseModel.breakthroughYear;
  if (runningPeak >= 6.15 && yearsSincePeakOpen >= 6 && yearsSincePeakOpen <= 24) {
    const plateauFloor = yearsSincePeakOpen <= 10
      ? runningPeak - 0.25
      : yearsSincePeakOpen <= 16
        ? runningPeak - 0.38
        : runningPeak - 0.48;
    floor = Math.max(floor, plateauFloor);
  }

  return Math.max(rawOverall, floor);
}
