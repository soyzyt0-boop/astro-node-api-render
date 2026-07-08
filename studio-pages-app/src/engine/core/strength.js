import { STEM_TO_WUXING, BRANCH_TO_WUXING, BRANCH_HIDDEN_STEMS, WUXING_GENERATES, generatedBy, controlledBy } from "../constants/wuxing.js";

const SEASON_SUPPORT = {
  木: ["寅", "卯", "辰"],
  火: ["巳", "午", "未"],
  金: ["申", "酉", "戌"],
  水: ["亥", "子", "丑"],
  土: ["辰", "戌", "丑", "未"],
};

const DI_SHI_SCORE = {
  长生: 0.45,
  沐浴: 0.08,
  冠带: 0.18,
  临官: 0.5,
  帝旺: 0.62,
  衰: 0.06,
  病: -0.08,
  死: -0.18,
  墓: -0.12,
  绝: -0.36,
  胎: 0.05,
  养: 0.12,
};

function relationToDay(dayElement, otherElement) {
  if (!dayElement || !otherElement) return "unknown";
  if (dayElement === otherElement) return "same";
  if (generatedBy(dayElement) === otherElement) return "resource";
  if (WUXING_GENERATES[dayElement] === otherElement) return "output";
  if (controlledBy(dayElement) === otherElement) return "power";
  return "wealth";
}

function scoreForRelation(relation) {
  const map = {
    same: 1,
    resource: 1.15,
    output: -0.45,
    wealth: -0.8,
    power: -0.7,
    unknown: 0,
  };
  return map[relation] ?? 0;
}

function relationBucket(relation) {
  if (relation === "same" || relation === "resource") return "support";
  if (relation === "output") return "output";
  if (relation === "wealth") return "wealth";
  if (relation === "power") return "power";
  return "neutral";
}

function shiShenBucket(label) {
  if (["比肩", "劫财", "正印", "偏印"].includes(label)) return "support";
  if (["食神", "伤官"].includes(label)) return "output";
  if (["正财", "偏财"].includes(label)) return "wealth";
  if (["正官", "七杀"].includes(label)) return "power";
  return "neutral";
}

function seasonBias(dayElement, monthBranch) {
  if (!dayElement || !monthBranch) return 0;
  if ((SEASON_SUPPORT[dayElement] || []).includes(monthBranch)) return 1.9;
  if ((SEASON_SUPPORT[generatedBy(dayElement)] || []).includes(monthBranch)) return 0.95;
  if ((SEASON_SUPPORT[WUXING_GENERATES[dayElement]] || []).includes(monthBranch)) return -0.75;
  if ((SEASON_SUPPORT[controlledBy(dayElement)] || []).includes(monthBranch)) return -1.85;
  return 0;
}

function hiddenStemContribution(dayElement, branch, scale = 1) {
  const hiddenStems = BRANCH_HIDDEN_STEMS[branch] || [];
  const hiddenWeights = hiddenStems.length === 1 ? [1] : hiddenStems.length === 2 ? [0.72, 0.28] : [0.7, 0.2, 0.1];
  let score = 0;
  let rootScore = 0;
  const relations = hiddenStems.map((stem, index) => {
    const element = STEM_TO_WUXING[stem] || "";
    const relation = relationToDay(dayElement, element);
    const weighted = scoreForRelation(relation) * hiddenWeights[index] * scale;
    score += weighted;
    if (relation === "same" || relation === "resource") {
      rootScore += hiddenWeights[index] * scale;
    }
    return { stem, relation, weight: hiddenWeights[index] };
  });

  return {
    score,
    rootScore: Number(rootScore.toFixed(2)),
    relations,
  };
}

function pillarContribution(dayElement, stem, branch, stemWeight, branchWeight, hiddenScale = 0.55) {
  const stemElement = STEM_TO_WUXING[stem] || "";
  const branchElement = BRANCH_TO_WUXING[branch] || "";
  const stemRelation = relationToDay(dayElement, stemElement);
  const branchRelation = relationToDay(dayElement, branchElement);
  const hidden = hiddenStemContribution(dayElement, branch, hiddenScale);
  return {
    score: scoreForRelation(stemRelation) * stemWeight + scoreForRelation(branchRelation) * branchWeight + hidden.score,
    stemRelation,
    branchRelation,
    hidden,
  };
}

export function evaluateStrength(input, pillars, dayMaster, libraryChart = null) {
  const dayElement = STEM_TO_WUXING[dayMaster] || "";
  const monthBranch = String(pillars.month || "").slice(1, 2);
  const yearStem = String(pillars.year || "").slice(0, 1);
  const yearBranch = String(pillars.year || "").slice(1, 2);
  const monthStem = String(pillars.month || "").slice(0, 1);
  const dayBranch = String(pillars.day || "").slice(1, 2);
  const hourStem = String(pillars.hour || "").slice(0, 1);
  const hourBranch = String(pillars.hour || "").slice(1, 2);

  const season = seasonBias(dayElement, monthBranch);
  const yearPart = pillarContribution(dayElement, yearStem, yearBranch, 0.38, 0.24, 0.46);
  const monthPart = pillarContribution(dayElement, monthStem, monthBranch, 0.58, 0.9, 0.9);
  const dayPart = pillarContribution(dayElement, dayMaster, dayBranch, 0.42, 0.42, 0.62);
  const hourPart = input.timeKnown
    ? pillarContribution(dayElement, hourStem, hourBranch, 0.3, 0.22, 0.38)
    : { score: 0, stemRelation: "unknown", branchRelation: "unknown", hidden: { score: 0, rootScore: 0, relations: [] } };

  const rootBonus = yearPart.hidden.rootScore * 0.35
    + monthPart.hidden.rootScore * 0.42
    + dayPart.hidden.rootScore * 0.52
    + hourPart.hidden.rootScore * 0.24;
  const diShiBonus = libraryChart
    ? (DI_SHI_SCORE[libraryChart.diShi?.year] || 0) * 0.15
      + (DI_SHI_SCORE[libraryChart.diShi?.month] || 0) * 0.38
      + (DI_SHI_SCORE[libraryChart.diShi?.day] || 0) * 0.28
      + (DI_SHI_SCORE[libraryChart.diShi?.hour] || 0) * 0.14
    : 0;
  const exactSupportBonus = libraryChart
    ? [
      libraryChart.shiShenGan?.year,
      libraryChart.shiShenGan?.month,
      libraryChart.shiShenGan?.hour,
      ...(libraryChart.shiShenZhi?.year || []),
      ...(libraryChart.shiShenZhi?.month || []),
      ...(libraryChart.shiShenZhi?.day || []),
      ...(libraryChart.shiShenZhi?.hour || []),
    ].reduce((sum, item) => {
      if (item === "比肩" || item === "劫财" || item === "正印" || item === "偏印") return sum + 0.08;
      if (item === "食神" || item === "伤官") return sum - 0.03;
      if (item === "正财" || item === "偏财") return sum - 0.06;
      if (item === "正官" || item === "七杀") return sum - 0.05;
      return sum;
    }, 0)
    : 0;
  const exactShiShenSummary = libraryChart
    ? [
      libraryChart.shiShenGan?.year,
      libraryChart.shiShenGan?.month,
      libraryChart.shiShenGan?.hour,
      ...(libraryChart.shiShenZhi?.year || []),
      ...(libraryChart.shiShenZhi?.month || []),
      ...(libraryChart.shiShenZhi?.day || []),
      ...(libraryChart.shiShenZhi?.hour || []),
    ].reduce((acc, item) => {
      const bucket = shiShenBucket(item);
      acc[bucket] += 1;
      return acc;
    }, { support: 0, output: 0, wealth: 0, power: 0, neutral: 0 })
    : { support: 0, output: 0, wealth: 0, power: 0, neutral: 0 };

  const totalScore = season + yearPart.score + monthPart.score + dayPart.score + hourPart.score + rootBonus + diShiBonus + exactSupportBonus;

  const relationScores = [
    yearPart.stemRelation, yearPart.branchRelation, ...yearPart.hidden.relations.map((item) => item.relation),
    monthPart.stemRelation, monthPart.branchRelation, ...monthPart.hidden.relations.map((item) => item.relation),
    dayPart.stemRelation, dayPart.branchRelation, ...dayPart.hidden.relations.map((item) => item.relation),
    hourPart.stemRelation, hourPart.branchRelation, ...hourPart.hidden.relations.map((item) => item.relation),
  ];

  const relationSummary = relationScores.reduce((acc, relation) => {
    const bucket = relationBucket(relation);
    acc[bucket] += 1;
    return acc;
  }, { support: 0, output: 0, wealth: 0, power: 0, neutral: 0 });

  let strength = "balanced";
  if (totalScore <= -1.0) strength = "weak";
  else if (totalScore >= 1.85) strength = "strong";
  else if (!input.timeKnown && totalScore > -0.35 && totalScore < 0.55) strength = "unknown";

  return {
    strength,
    score: Number(totalScore.toFixed(2)),
    season,
    rootBonus: Number(rootBonus.toFixed(2)),
    diShiBonus: Number(diShiBonus.toFixed(2)),
    exactSupportBonus: Number(exactSupportBonus.toFixed(2)),
    dayElement,
    monthBranch,
    relationSummary,
    exactShiShenSummary,
    relations: {
      year: yearPart,
      month: monthPart,
      day: dayPart,
      hour: hourPart,
    },
  };
}

export function judgeStrength(input, pillars, dayMaster) {
  return evaluateStrength(input, pillars, dayMaster).strength;
}
