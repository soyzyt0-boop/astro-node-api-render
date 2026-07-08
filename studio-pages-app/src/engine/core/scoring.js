import { STEM_TO_WUXING, BRANCH_TO_WUXING, BRANCH_HIDDEN_STEMS, WUXING_GENERATES, WUXING_CONTROLS, controlledBy, generatedBy } from "../constants/wuxing.js";
import { derivePhaseModel, regroupRipple, smoothingWeights, postBreakthroughFloor, phaseAtYear, phaseAdjustment, lateBloomPeakCap } from "./phaseModel.js";

const BRANCH_CLASH = {
  子: "午",
  丑: "未",
  寅: "申",
  卯: "酉",
  辰: "戌",
  巳: "亥",
  午: "子",
  未: "丑",
  申: "寅",
  酉: "卯",
  戌: "辰",
  亥: "巳",
};

const BRANCH_COMBINE = {
  子: "丑",
  丑: "子",
  寅: "亥",
  亥: "寅",
  卯: "戌",
  戌: "卯",
  辰: "酉",
  酉: "辰",
  巳: "申",
  申: "巳",
  午: "未",
  未: "午",
};

const BRANCH_PUNISH = {
  子: ["卯"],
  卯: ["子"],
  寅: ["巳", "申"],
  巳: ["寅", "申"],
  申: ["寅", "巳"],
  丑: ["戌", "未"],
  戌: ["丑", "未"],
  未: ["丑", "戌"],
};

const BRANCH_HARM = {
  子: "未",
  未: "子",
  丑: "午",
  午: "丑",
  寅: "巳",
  巳: "寅",
  卯: "辰",
  辰: "卯",
  申: "亥",
  亥: "申",
  酉: "戌",
  戌: "酉",
};

const SELF_PUNISH_BRANCHES = new Set(["辰", "午", "酉", "亥"]);

const STEM_COMBINE = {
  甲: "己",
  己: "甲",
  乙: "庚",
  庚: "乙",
  丙: "辛",
  辛: "丙",
  丁: "壬",
  壬: "丁",
  戊: "癸",
  癸: "戊",
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function baseOverall(age, strength) {
  if (age <= 12) return 3.95;
  if (age <= 24) return 3.82;
  if (age <= 36) return 3.78;
  if (age <= 48) return 3.96;
  if (age <= 60) return 4.08;
  return 4.02;
}

function activeDayun(dayun, year) {
  return dayun.find((item) => year >= item.startYear && year <= item.endYear) || null;
}

function aspectWeights(tenGod) {
  const map = {
    比劫: { overall: 0.1, wealth: -0.5, career: 0.05, relationship: -0.15, property: -0.1, influence: 0.12, health: 0.08, art: 0.14, family: -0.1 },
    印: { overall: 0.2, wealth: -0.1, career: 0.08, relationship: -0.06, property: 0.04, influence: 0.02, health: 0.16, art: 0.12, family: 0.06 },
    食伤: { overall: 0.18, wealth: 0.12, career: 0.12, relationship: -0.08, property: -0.02, influence: 0.2, health: -0.05, art: 0.3, family: -0.04 },
    财: { overall: 0.12, wealth: 0.32, career: 0.1, relationship: 0.04, property: 0.18, influence: 0.04, health: -0.08, art: 0.02, family: 0.06 },
    官杀: { overall: 0.08, wealth: 0.02, career: 0.28, relationship: 0.1, property: 0.08, influence: 0.22, health: -0.12, art: -0.06, family: -0.02 },
    unknown: { overall: 0, wealth: 0, career: 0, relationship: 0, property: 0, influence: 0, health: 0, art: 0, family: 0 },
  };
  return map[tenGod] || map.unknown;
}

function relationForElement(dayElement, otherElement) {
  if (!dayElement || !otherElement) return "unknown";
  if (dayElement === otherElement) return "比劫";
  if (generatedBy(dayElement) === otherElement) return "印";
  if (WUXING_GENERATES[dayElement] === otherElement) return "食伤";
  if (WUXING_CONTROLS[dayElement] === otherElement) return "财";
  if (controlledBy(dayElement) === otherElement) return "官杀";
  return "unknown";
}

function pillarElementScore(dayElement, stem, branch) {
  const stemElement = STEM_TO_WUXING[stem] || "";
  const branchElement = BRANCH_TO_WUXING[branch] || "";
  return {
    stemRelation: relationForElement(dayElement, stemElement),
    branchRelation: relationForElement(dayElement, branchElement),
  };
}

function favorableScore(relation, usefulGods, unfavorableGods) {
  if (usefulGods.includes(relation)) return 0.24;
  if (unfavorableGods.includes(relation)) return -0.24;
  return 0;
}

function relationPolarity(relation, usefulGods, unfavorableGods) {
  if (usefulGods.includes(relation)) return 1;
  if (unfavorableGods.includes(relation)) return -1;
  return 0;
}

function relationDrive(strength, relation) {
  const weakMap = {
    印: 0.95,
    比劫: 0.72,
    食伤: -0.24,
    财: -0.82,
    官杀: -0.88,
    unknown: 0,
  };
  const strongMap = {
    印: -0.56,
    比劫: -0.72,
    食伤: 0.54,
    财: 0.78,
    官杀: 0.64,
    unknown: 0,
  };
  const balancedMap = {
    印: 0.22,
    比劫: 0.08,
    食伤: 0.04,
    财: -0.08,
    官杀: -0.12,
    unknown: 0,
  };
  const map = strength === "weak" ? weakMap : strength === "strong" ? strongMap : balancedMap;
  return map[relation] ?? 0;
}

function pairDrive(strength, stemRelation, branchRelation) {
  const stemDrive = relationDrive(strength, stemRelation);
  const branchDrive = relationDrive(strength, branchRelation);
  const stemWeight = strength === "weak" ? 0.44 : strength === "strong" ? 0.58 : 0.52;
  const branchWeight = strength === "weak" ? 0.56 : strength === "strong" ? 0.42 : 0.48;

  let combined = stemDrive * stemWeight + branchDrive * branchWeight;
  const stemSign = Math.sign(stemDrive);
  const branchSign = Math.sign(branchDrive);

  if (stemSign !== 0 && branchSign !== 0) {
    if (stemSign === branchSign) {
      combined += stemSign > 0 ? 0.08 : -0.04;
    } else if (strength === "weak") {
      if (branchDrive > 0) {
        combined += Math.abs(branchDrive) * 0.24;
        combined += Math.abs(stemDrive) * 0.06;
      } else if (stemDrive > 0) {
        combined += Math.abs(stemDrive) * 0.14;
      }
    } else if (strength === "strong") {
      if (stemDrive > 0) combined += Math.abs(stemDrive) * 0.14;
      if (branchDrive > 0) combined += Math.abs(branchDrive) * 0.08;
    } else {
      combined += (stemDrive + branchDrive) * 0.08;
    }
  }

  return clamp(combined, -0.96, 0.96);
}

function decadeBackbone(strength, stemRelation, branchRelation, usefulGods = [], unfavorableGods = []) {
  const stemDrive = relationDrive(strength, stemRelation);
  const branchDrive = relationDrive(strength, branchRelation);
  const stemPolarity = relationPolarity(stemRelation, usefulGods, unfavorableGods);
  const branchPolarity = relationPolarity(branchRelation, usefulGods, unfavorableGods);
  const mixed = Math.sign(stemDrive) !== 0 && Math.sign(branchDrive) !== 0 && Math.sign(stemDrive) !== Math.sign(branchDrive);

  if (strength === "weak") {
    if (stemPolarity > 0 && branchPolarity > 0) {
      return clamp(0.6 + stemDrive * 0.12 + branchDrive * 0.18, 0.42, 0.86);
    }
    if (stemPolarity < 0 && branchPolarity < 0) {
      return clamp(-0.58 + stemDrive * 0.1 + branchDrive * 0.08, -0.86, -0.34);
    }
    if (stemPolarity > 0 || branchPolarity > 0) {
      const usefulSide = branchPolarity > 0 ? branchDrive : stemDrive;
      const pressureSide = branchPolarity < 0 ? branchDrive : stemDrive;
      return clamp(0.14 + usefulSide * 0.34 + pressureSide * 0.08, -0.06, 0.46);
    }
  }

  if (strength === "strong") {
    if (stemPolarity > 0 && branchPolarity > 0) {
      return clamp(0.48 + stemDrive * 0.12 + branchDrive * 0.12, 0.3, 0.78);
    }
    if (stemPolarity < 0 && branchPolarity < 0) {
      return clamp(-0.52 + stemDrive * 0.08 + branchDrive * 0.08, -0.82, -0.28);
    }
  }

  if (mixed && strength === "weak") {
    if (branchDrive > 0) return clamp(branchDrive * 0.52 + stemDrive * 0.12, -0.18, 0.48);
    if (stemDrive > 0) return clamp(stemDrive * 0.34 + branchDrive * 0.16, -0.22, 0.32);
  }

  if (mixed && strength === "strong") {
    if (stemDrive > 0) return clamp(stemDrive * 0.38 + branchDrive * 0.14, -0.18, 0.42);
    if (branchDrive > 0) return clamp(branchDrive * 0.26 + stemDrive * 0.18, -0.24, 0.28);
  }

  return clamp(pairDrive(strength, stemRelation, branchRelation) * 0.72, -0.66, 0.66);
}

function combineWeights(target, weights, scale) {
  return {
    overall: target.overall + weights.overall * scale,
    wealth: target.wealth + weights.wealth * scale,
    career: target.career + weights.career * scale,
    relationship: target.relationship + weights.relationship * scale,
    property: target.property + weights.property * scale,
    influence: target.influence + weights.influence * scale,
    health: target.health + weights.health * scale,
    art: target.art + weights.art * scale,
    family: target.family + weights.family * scale,
  };
}

function clampWeightBucket(bucket, limits = {}) {
  return {
    overall: clamp(bucket.overall, limits.overall?.[0] ?? -99, limits.overall?.[1] ?? 99),
    wealth: clamp(bucket.wealth, limits.wealth?.[0] ?? -99, limits.wealth?.[1] ?? 99),
    career: clamp(bucket.career, limits.career?.[0] ?? -99, limits.career?.[1] ?? 99),
    relationship: clamp(bucket.relationship, limits.relationship?.[0] ?? -99, limits.relationship?.[1] ?? 99),
    property: clamp(bucket.property, limits.property?.[0] ?? -99, limits.property?.[1] ?? 99),
    influence: clamp(bucket.influence, limits.influence?.[0] ?? -99, limits.influence?.[1] ?? 99),
    health: clamp(bucket.health, limits.health?.[0] ?? -99, limits.health?.[1] ?? 99),
    art: clamp(bucket.art, limits.art?.[0] ?? -99, limits.art?.[1] ?? 99),
    family: clamp(bucket.family, limits.family?.[0] ?? -99, limits.family?.[1] ?? 99),
  };
}

function normalizeUsefulLabels(labels) {
  return labels.map((item) => {
    if (item === "比劫") return "比劫";
    if (item === "印") return "印";
    if (item === "食伤") return "食伤";
    if (item === "财") return "财";
    if (item === "官" || item === "官杀") return "官杀";
    return item;
  });
}

function strengthBias(strength) {
  if (strength === "weak") return -0.18;
  if (strength === "strong") return -0.08;
  return 0;
}

function ageMagnifier(age) {
  if (age <= 12) return 1.2;
  if (age <= 24) return 1.08;
  if (age <= 36) return 1;
  if (age <= 48) return 1.04;
  if (age <= 60) return 1.08;
  return 1.02;
}

function hiddenStemWeights(count) {
  if (count <= 1) return [1];
  if (count === 2) return [0.72, 0.28];
  return [0.7, 0.2, 0.1];
}

function imbalanceSeverity(profile) {
  return Math.min(1.6, Math.max(0.28, Math.abs(profile?.strengthProfile?.score ?? 0) / 2.2));
}

function relationQuality(relation, usefulGods, unfavorableGods, profile) {
  const severity = imbalanceSeverity(profile);
  if (usefulGods.includes(relation)) {
    return relation === "官杀" || relation === "财"
      ? 0.92 + severity * 0.18
      : 0.78 + severity * 0.12;
  }
  if (unfavorableGods.includes(relation)) {
    return relation === "比劫" || relation === "印"
      ? -(0.92 + severity * 0.22)
      : -(0.72 + severity * 0.12);
  }
  return 0;
}

function pillarFavorability(dayElement, stem, branch, usefulGods, unfavorableGods, profile) {
  const stemRelation = relationForElement(dayElement, STEM_TO_WUXING[stem] || "");
  const branchRelation = relationForElement(dayElement, BRANCH_TO_WUXING[branch] || "");
  const hiddenStems = BRANCH_HIDDEN_STEMS[branch] || [];
  const weights = hiddenStemWeights(hiddenStems.length);
  const hiddenRelations = hiddenStems.map((hiddenStem, index) => ({
    stem: hiddenStem,
    relation: relationForElement(dayElement, STEM_TO_WUXING[hiddenStem] || ""),
    weight: weights[index] || 0,
  }));

  const stemScore = relationQuality(stemRelation, usefulGods, unfavorableGods, profile) * 0.92;
  const branchScore = relationQuality(branchRelation, usefulGods, unfavorableGods, profile) * 1.08;
  const hiddenScore = hiddenRelations.reduce(
    (sum, item) => sum + relationQuality(item.relation, usefulGods, unfavorableGods, profile) * item.weight * 0.62,
    0
  );

  const usefulCount = [stemRelation, branchRelation, ...hiddenRelations.map((item) => item.relation)].filter((item) => usefulGods.includes(item)).length;
  const unfavorableCount = [stemRelation, branchRelation, ...hiddenRelations.map((item) => item.relation)].filter((item) => unfavorableGods.includes(item)).length;

  let total = stemScore + branchScore + hiddenScore;
  if (usefulCount >= 3 && unfavorableCount === 0) total += 0.22;
  if (unfavorableCount >= 3 && usefulCount === 0) total -= 0.24;
  if (branchRelation === stemRelation && usefulGods.includes(branchRelation)) total += 0.14;
  if (branchRelation === stemRelation && unfavorableGods.includes(branchRelation)) total -= 0.16;

  return {
    total: clamp(total, -2.4, 2.4),
    stemRelation,
    branchRelation,
    hiddenRelations,
    usefulCount,
    unfavorableCount,
  };
}

function decadeDominanceMultiplier(startAge) {
  if (startAge <= 10) return 0.86;
  if (startAge <= 20) return 0.92;
  if (startAge <= 30) return 0.98;
  if (startAge <= 45) return 1;
  if (startAge <= 60) return 0.96;
  return 0.9;
}

function childhoodShiftRealization(startAge, shift) {
  if (shift <= 0) {
    if (startAge <= 10) return shift * 1.06;
    if (startAge <= 20) return shift * 1.02;
    return shift;
  }
  if (startAge <= 10) return shift * 0.68;
  if (startAge <= 20) return shift * 0.82;
  if (startAge <= 30) return shift * 0.92;
  return shift;
}

function yearRescueLimit(decadeForce, yearForce) {
  if (decadeForce < -0.9) return Math.min(yearForce, 0.42);
  if (decadeForce < -0.5) return Math.min(yearForce, 0.58);
  return yearForce;
}

function yearDamageLimit(decadeForce, yearForce) {
  if (decadeForce > 0.9) return Math.max(yearForce, -0.42);
  if (decadeForce > 0.5) return Math.max(yearForce, -0.58);
  return yearForce;
}

function earlyLifeClamp(age, decadeShift, rawYearFavorability, strength) {
  if (age > 24) return rawYearFavorability;
  if (age <= 7) {
    if (decadeShift <= 0.18) return Math.min(rawYearFavorability, 0.12);
    return Math.min(rawYearFavorability, 0.22);
  }
  if (age <= 14) {
    if (strength === "strong" && decadeShift <= 0.22) return Math.min(rawYearFavorability, 0.2);
    return Math.min(rawYearFavorability, 0.3);
  }
  if (age <= 24) {
    if (decadeShift < -0.4) return Math.min(rawYearFavorability, 0.38);
    if (decadeShift < 0.2) return Math.min(rawYearFavorability, 0.48);
  }
  return rawYearFavorability;
}

function highPlateauDamper(age, decadeShift, previousOverall, rawOverall) {
  if (age < 45) return rawOverall;
  if (decadeShift < 0.35) return rawOverall;
  if (previousOverall === null) return rawOverall;
  const rise = rawOverall - previousOverall;
  if (rise <= 0) return rawOverall;
  if (previousOverall >= 5.6) return previousOverall + rise * 0.28;
  if (previousOverall >= 5.1) return previousOverall + rise * 0.42;
  return previousOverall + rise * 0.68;
}

function lateSwingLimiter(age, previousOverall, rawOverall) {
  if (age < 45 || previousOverall === null) return rawOverall;
  const delta = rawOverall - previousOverall;
  const maxSwing = age >= 60 ? 0.52 : age >= 50 ? 0.68 : 0.82;
  if (Math.abs(delta) <= maxSwing) return rawOverall;
  return previousOverall + Math.sign(delta) * maxSwing;
}

function juvenileCeiling(age, decadeShift, strength, rawOverall) {
  if (age > 24) return rawOverall;
  let ceiling = 99;
  if (age <= 7) {
    ceiling = decadeShift > 0.55 ? 4.25 : decadeShift > 0.25 ? 3.95 : 3.65;
  } else if (age <= 14) {
    ceiling = decadeShift > 0.55 ? 4.45 : decadeShift > 0.25 ? 4.15 : 3.85;
  } else if (age <= 24) {
    ceiling = decadeShift > 0.6 ? 4.9 : decadeShift > 0.2 ? 4.5 : 4.05;
  }

  if (strength === "strong" && age <= 14) ceiling -= 0.15;
  return Math.min(rawOverall, ceiling);
}

function branchAction(a, b) {
  if (!a || !b) return "none";
  if (BRANCH_CLASH[a] === b) return "clash";
  if (BRANCH_COMBINE[a] === b) return "combine";
  if ((BRANCH_PUNISH[a] || []).includes(b)) return "punish";
  if (BRANCH_HARM[a] === b) return "harm";
  if (a === b && SELF_PUNISH_BRANCHES.has(a)) return "selfPunish";
  return "none";
}

function branchActionWeights(action) {
  const map = {
    clash: { overall: -0.45, wealth: -0.18, career: -0.12, relationship: -0.26, property: -0.2, influence: -0.1, health: -0.22, art: -0.04, family: -0.28 },
    combine: { overall: 0.22, wealth: 0.14, career: 0.08, relationship: 0.16, property: 0.1, influence: 0.06, health: 0.04, art: 0.08, family: 0.14 },
    punish: { overall: -0.28, wealth: -0.08, career: -0.06, relationship: -0.18, property: -0.1, influence: -0.08, health: -0.14, art: -0.02, family: -0.16 },
    harm: { overall: -0.18, wealth: -0.08, career: -0.04, relationship: -0.14, property: -0.06, influence: -0.04, health: -0.1, art: -0.02, family: -0.12 },
    selfPunish: { overall: -0.24, wealth: -0.06, career: -0.04, relationship: -0.12, property: -0.05, influence: -0.06, health: -0.16, art: -0.03, family: -0.1 },
    none: { overall: 0, wealth: 0, career: 0, relationship: 0, property: 0, influence: 0, health: 0, art: 0, family: 0 },
  };
  return map[action] || map.none;
}

function stemAction(a, b) {
  if (!a || !b) return "none";
  if (STEM_COMBINE[a] === b) return "combine";
  return "none";
}

function stemActionWeights(action) {
  const map = {
    combine: { overall: 0.1, wealth: 0.05, career: 0.06, relationship: 0.08, property: 0.03, influence: 0.04, health: -0.02, art: 0.03, family: 0.08 },
    none: { overall: 0, wealth: 0, career: 0, relationship: 0, property: 0, influence: 0, health: 0, art: 0, family: 0 },
  };
  return map[action] || map.none;
}

function natalStemsFromProfile(profile) {
  const pillars = profile?.pillars || {};
  return [pillars.year, pillars.month, pillars.day, pillars.hour]
    .filter(Boolean)
    .map((item) => String(item).slice(0, 1))
    .filter(Boolean);
}

function natalBranchesFromProfile(profile) {
  const pillars = profile?.pillars || {};
  return [pillars.year, pillars.month, pillars.day, pillars.hour]
    .filter(Boolean)
    .map((item) => String(item).slice(1, 2))
    .filter(Boolean);
}

function branchActionSummary(yearBranch, yunBranch, natalBranches) {
  const actions = natalBranches.map((branch) => ({
    natal: branch,
    yearAction: branchAction(yearBranch, branch),
    yunAction: branchAction(yunBranch, branch),
  }));
  return actions;
}

function stemActionSummary(yearStem, yunStem, natalStems) {
  return natalStems.map((stem) => ({
    natal: stem,
    yearAction: stemAction(yearStem, stem),
    yunAction: stemAction(yunStem, stem),
  }));
}

function branchActionLabel(action) {
  const map = {
    clash: "冲",
    combine: "合",
    punish: "刑",
    harm: "害",
    selfPunish: "自刑",
  };
  return map[action] || "";
}

function emptyBucket() {
  return {
    overall: 0,
    wealth: 0,
    career: 0,
    relationship: 0,
    property: 0,
    influence: 0,
    health: 0,
    art: 0,
    family: 0,
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothStep(t) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function scaledBucket(bucket, scale) {
  return Object.fromEntries(
    Object.entries(bucket).map(([key, value]) => [key, value * scale])
  );
}

function structuralBucket(stemActions, branchActions, source = "year") {
  let bucket = emptyBucket();
  stemActions.forEach((action) => {
    const type = source === "year" ? action.yearAction : action.yunAction;
    bucket = combineWeights(bucket, stemActionWeights(type), source === "year" ? 0.14 : 0.18);
  });
  branchActions.forEach((action) => {
    const type = source === "year" ? action.yearAction : action.yunAction;
    bucket = combineWeights(bucket, branchActionWeights(type), source === "year" ? 0.14 : 0.18);
  });
  return bucket;
}

function buildDecadeAnchors(input, profile, dayun, usefulGods, unfavorableGods, dayElement, natalStems, natalBranches) {
  const anchors = [
    {
      year: input.year,
      shift: 0,
    },
  ];

  dayun.forEach((yun) => {
    const yunStem = yun.ganZhi.slice(0, 1);
    const yunBranch = yun.ganZhi.slice(1, 2);
    const yunRel = pillarElementScore(dayElement, yunStem, yunBranch);
    const yunFavorability = pillarFavorability(dayElement, yunStem, yunBranch, usefulGods, unfavorableGods, profile);
    const stemActions = stemActionSummary("", yunStem, natalStems);
    const branchActions = branchActionSummary("", yunBranch, natalBranches);
    const structure = structuralBucket(stemActions, branchActions, "yun");
    const severity = imbalanceSeverity(profile);
    const mixedYun = yunFavorability.usefulCount > 0 && yunFavorability.unfavorableCount > 0;
    let favorabilityContribution = yunFavorability.total * (0.92 + severity * 0.38) * decadeDominanceMultiplier(yun.startAge);
    if (mixedYun) {
      favorabilityContribution *= profile.strength === "strong" ? 0.42 : 0.58;
    }
    let shift = favorabilityContribution;
    shift += decadeBackbone(profile.strength, yunRel.stemRelation, yunRel.branchRelation, usefulGods, unfavorableGods) * 0.54;
    shift += structure.overall * 0.82;

    if (yunFavorability.usefulCount >= 3 && yunFavorability.unfavorableCount === 0) shift += 0.24;
    if (yunFavorability.unfavorableCount >= 3 && yunFavorability.usefulCount === 0) shift -= 0.28;
    if (profile.strength === "strong" && (yunRel.stemRelation === "比劫" || yunRel.stemRelation === "印")) shift -= 0.16;
    if (profile.strength === "weak" && (yunRel.stemRelation === "财" || yunRel.stemRelation === "官杀")) shift -= 0.14;
    if (profile.strength === "strong" && (yunRel.branchRelation === "财" || yunRel.branchRelation === "官杀")) shift += 0.14;
    if (profile.strength === "weak" && (yunRel.branchRelation === "印" || yunRel.branchRelation === "比劫")) shift += 0.14;
    shift = childhoodShiftRealization(yun.startAge, shift);

    anchors.push({
      year: yun.startYear,
      shift: clamp(shift, -1.85, 1.65),
      ganZhi: yun.ganZhi,
      shiftRaw: Number(shift.toFixed(2)),
      shiftFavorability: Number(favorabilityContribution.toFixed(2)),
      shiftBackbone: Number((decadeBackbone(profile.strength, yunRel.stemRelation, yunRel.branchRelation, usefulGods, unfavorableGods) * 0.54).toFixed(2)),
      shiftStructure: Number((structure.overall * 0.82).toFixed(2)),
      usefulCount: yunFavorability.usefulCount,
      unfavorableCount: yunFavorability.unfavorableCount,
      favorability: Number(yunFavorability.total.toFixed(2)),
      structureOverall: Number(structure.overall.toFixed(2)),
      stemRelation: yunRel.stemRelation,
      branchRelation: yunRel.branchRelation,
    });
  });

  const last = dayun[dayun.length - 1];
  if (last) {
    const lastAnchor = anchors[anchors.length - 1];
    anchors.push({
      year: last.endYear + 1,
      shift: clamp(lastAnchor.shift * 0.9, -1.2, 1.1),
      ganZhi: last.ganZhi,
    });
  }

  return anchors;
}

function interpolatedDecadeShift(year, anchors, dayun = []) {
  if (!anchors.length) return 0;
  const anchorByYear = new Map(anchors.map((item) => [item.year, item.shift]));
  const currentYun = activeDayun(dayun, year);
  if (currentYun && anchorByYear.has(currentYun.startYear)) {
    return anchorByYear.get(currentYun.startYear) ?? 0;
  }
  if (year <= anchors[0].year) return anchors[0].shift;
  return anchors[anchors.length - 1].shift;
}

export function buildAnnualScores(input, profile, liunian, dayun) {
  const dayElement = STEM_TO_WUXING[profile.dayMaster] || "";
  const usefulGods = normalizeUsefulLabels(profile.usefulGods || []);
  const unfavorableGods = normalizeUsefulLabels(profile.unfavorableGods || []);
  const natalStems = natalStemsFromProfile(profile);
  const natalBranches = natalBranchesFromProfile(profile);
  const anchors = buildDecadeAnchors(input, profile, dayun, usefulGods, unfavorableGods, dayElement, natalStems, natalBranches);
  const anchorByYear = new Map(anchors.map((item) => [item.year, item]));
  const trendMeta = derivePhaseModel(dayun, anchors, {
    strength: profile.strength,
    pattern: profile.pattern,
    monthRelation: profile.strengthProfile?.relations?.month?.branchRelation || "",
    usefulGods,
    unfavorableGods,
  });

  let lastOverall = null;
  let runningPeak = -Infinity;

  return liunian.map((item) => {
    const yun = activeDayun(dayun, item.year);
    const yunAnchor = yun ? anchorByYear.get(yun.startYear) : null;
    const base = clamp(baseOverall(item.age, profile.strength) + strengthBias(profile.strength), 1.8, 8.2);
    const yearRel = pillarElementScore(dayElement, item.stem, item.branch);
    const yearFavorabilityRaw = pillarFavorability(dayElement, item.stem, item.branch, usefulGods, unfavorableGods, profile);
    const yunRel = yun
      ? pillarElementScore(dayElement, yun.ganZhi.slice(0, 1), yun.ganZhi.slice(1, 2))
      : { stemRelation: "unknown", branchRelation: "unknown" };
    const yunFavorabilityRaw = yun
      ? pillarFavorability(dayElement, yun.ganZhi.slice(0, 1), yun.ganZhi.slice(1, 2), usefulGods, unfavorableGods, profile)
      : { total: 0, usefulCount: 0, unfavorableCount: 0 };
    const yunStem = yun ? yun.ganZhi.slice(0, 1) : "";
    const yunBranch = yun ? yun.ganZhi.slice(1, 2) : "";
    const stemActions = stemActionSummary(item.stem, yunStem, natalStems);
    const branchActions = branchActionSummary(item.branch, yunBranch, natalBranches);
    const yearActionBucket = clampWeightBucket(structuralBucket(stemActions, branchActions, "year"), {
      overall: [-0.34, 0.18],
      wealth: [-0.14, 0.1],
      career: [-0.12, 0.1],
      relationship: [-0.18, 0.12],
      property: [-0.14, 0.1],
      influence: [-0.1, 0.08],
      health: [-0.16, 0.08],
      art: [-0.08, 0.06],
      family: [-0.18, 0.12],
    });
    const yunActionBucket = clampWeightBucket(structuralBucket(stemActions, branchActions, "yun"), {
      overall: [-0.24, 0.14],
      wealth: [-0.1, 0.08],
      career: [-0.08, 0.08],
      relationship: [-0.12, 0.08],
      property: [-0.1, 0.08],
      influence: [-0.08, 0.06],
      health: [-0.1, 0.06],
      art: [-0.06, 0.05],
      family: [-0.12, 0.08],
    });

    const decadeShift = interpolatedDecadeShift(item.year, anchors, dayun);
    const yearDrive = pairDrive(profile.strength, yearRel.stemRelation, yearRel.branchRelation);
    const yearFavor = favorableScore(yearRel.stemRelation, usefulGods, unfavorableGods) * 0.42
      + favorableScore(yearRel.branchRelation, usefulGods, unfavorableGods) * 0.28;
    const ageScale = ageMagnifier(item.age);
    const severity = imbalanceSeverity(profile);
    const yearFavorabilityPreLimited = earlyLifeClamp(item.age, decadeShift, yearFavorabilityRaw.total, profile.strength);
    const yearFavorabilityLimited = yearFavorabilityPreLimited >= 0
      ? yearRescueLimit(decadeShift, yearFavorabilityPreLimited)
      : yearDamageLimit(decadeShift, yearFavorabilityPreLimited);
    const yearFavorability = yearFavorabilityLimited * (0.28 + severity * 0.16);
    const yunFavorability = yunFavorabilityRaw.total * (0.14 + severity * 0.08);
    const regroupAdjustment = regroupRipple(item.year, trendMeta, yearFavorabilityLimited, yearActionBucket, yunActionBucket, yearDrive);
    const phase = phaseAtYear(item.year, trendMeta);
    const stageAdjustment = phaseAdjustment(item.year, trendMeta, decadeShift, yearFavorabilityLimited, yearDrive);

    const effectRaw = base
      + decadeShift * ageScale
      + yearDrive * 0.18
      + yearFavor * 0.52
      + yearFavorability
      + yunFavorability
      + yearActionBucket.overall
      + yunActionBucket.overall * 0.48;

    const effectOverall = Number(clamp(effectRaw, 1.6, 8.4).toFixed(1));

    let rawOverall = effectRaw
      + regroupAdjustment
      + stageAdjustment;

    rawOverall = highPlateauDamper(item.age, decadeShift, lastOverall, rawOverall);
    rawOverall = lateSwingLimiter(item.age, lastOverall, rawOverall);
    rawOverall = juvenileCeiling(item.age, decadeShift, profile.strength, rawOverall);
    rawOverall = lateBloomPeakCap(item.year, trendMeta, rawOverall);
    rawOverall = postBreakthroughFloor(item.year, item.age, trendMeta, runningPeak, decadeShift, rawOverall);

    const blend = smoothingWeights(item.year, trendMeta);
    const overall = lastOverall === null
      ? rawOverall
      : rawOverall * blend.current + lastOverall * blend.previous;
    lastOverall = overall;
    runningPeak = Math.max(runningPeak, overall);

    let bucket = {
      overall,
      wealth: overall - 0.34,
      career: overall - 0.12,
      relationship: overall - 0.2,
      property: overall - 0.18,
      influence: overall - 0.08,
      health: overall - 0.14,
      art: overall + 0.04,
      family: overall - 0.16,
    };

    bucket = combineWeights(bucket, aspectWeights(yunRel.stemRelation), 0.18);
    bucket = combineWeights(bucket, aspectWeights(yunRel.branchRelation), 0.12);
    bucket = combineWeights(bucket, aspectWeights(yearRel.stemRelation), 0.22);
    bucket = combineWeights(bucket, aspectWeights(yearRel.branchRelation), 0.16);
    bucket = combineWeights(bucket, scaledBucket(yearActionBucket, 0.85), 1);
    bucket = combineWeights(bucket, scaledBucket(yunActionBucket, 0.45), 1);

    bucket.wealth += yearDrive * 0.2 + decadeShift * 0.12;
    bucket.career += yearDrive * 0.1 + decadeShift * 0.16;
    bucket.relationship += yearDrive * 0.08 + decadeShift * 0.08;
    bucket.property += yearDrive * 0.06 + decadeShift * 0.1;
    bucket.health += -Math.abs(yearDrive) * 0.06 + (profile.strength === "weak" && usefulGods.includes("印") && yunRel.stemRelation === "印" ? 0.12 : 0);
    bucket.family += yearDrive * 0.05 + decadeShift * 0.08;
    bucket.art += item.age >= 35 ? 0.24 : 0.04;
    bucket.influence += item.age >= 45 ? 0.18 : -0.04;

    const scored = Object.fromEntries(
      Object.entries(bucket).map(([key, value]) => [key, Number(clamp(value, 1.6, 8.4).toFixed(1))])
    );

    return {
      year: item.year,
      age: item.age,
      phase: phase.key,
      phaseLabel: phase.label,
      dayunStage: phase.decadeStage?.stageKey || "",
      dayunStageLabel: phase.decadeStage?.stageLabel || "",
      effectOverall,
      debug: {
        base: Number(base.toFixed(2)),
        decadeShift: Number(decadeShift.toFixed(2)),
        yunShiftRaw: typeof yunAnchor?.shiftRaw === "number" ? yunAnchor.shiftRaw : null,
        yunShiftFavorability: typeof yunAnchor?.shiftFavorability === "number" ? yunAnchor.shiftFavorability : null,
        yunShiftBackbone: typeof yunAnchor?.shiftBackbone === "number" ? yunAnchor.shiftBackbone : null,
        yunShiftStructure: typeof yunAnchor?.shiftStructure === "number" ? yunAnchor.shiftStructure : null,
        ageScale: Number(ageScale.toFixed(2)),
        yearDrive: Number(yearDrive.toFixed(2)),
        yearFavor: Number(yearFavor.toFixed(2)),
        yearFavorability: Number(yearFavorability.toFixed(2)),
        yunFavorability: Number(yunFavorability.toFixed(2)),
        yearActionOverall: Number(yearActionBucket.overall.toFixed(2)),
        yunActionOverall: Number(yunActionBucket.overall.toFixed(2)),
        regroupAdjustment: Number(regroupAdjustment.toFixed(2)),
        stageAdjustment: Number(stageAdjustment.toFixed(2)),
        effectRaw: Number(effectRaw.toFixed(2)),
      },
      overall: scored.overall,
      wealth: scored.wealth,
      career: scored.career,
      relationship: scored.relationship,
      property: scored.property,
      influence: scored.influence,
      health: scored.health,
      art: scored.art,
      family: scored.family,
      notes: [
        `流年 ${item.ganZhi}`,
        yun ? `大运 ${yun.ganZhi}` : "大运未起",
        `年干关系 ${yearRel.stemRelation}`,
        `运干关系 ${yunRel.stemRelation}`,
        `阶段 ${phase.label}`,
        phase.decadeStage?.stageLabel ? `运段 ${phase.decadeStage.stageLabel}` : "",
        `十年骨架 ${decadeShift >= 0.28 ? "偏助" : decadeShift <= -0.28 ? "偏压" : "偏平"}`,
        ...stemActions
          .flatMap((action) => [
            action.yearAction !== "none" ? `流年干对原局${action.natal}合` : "",
            action.yunAction !== "none" ? `大运干对原局${action.natal}合` : "",
          ])
          .filter(Boolean),
        ...branchActions
          .flatMap((action) => [
            action.yearAction !== "none" ? `流年支对原局${action.natal}${branchActionLabel(action.yearAction)}` : "",
            action.yunAction !== "none" ? `大运支对原局${action.natal}${branchActionLabel(action.yunAction)}` : "",
          ])
          .filter(Boolean),
      ],
    };
  });
}
