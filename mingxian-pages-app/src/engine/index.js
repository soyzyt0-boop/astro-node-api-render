import { normalizeBirthInput, validateBirthInput } from "./schemas/birthInput.js";
import { buildEmptyChartResult } from "./schemas/chartResult.js";
import { applySolarTimeCorrection } from "./core/solarTime.js";
import { evaluateStrength } from "./core/strength.js";
import { judgePattern } from "./core/pattern.js";
import { resolveUsefulGods } from "./core/usefulGods.js";
import { buildLiunian } from "./core/liunian.js";
import { buildAnnualScores } from "./core/scoring.js";
import { buildLibraryChart, buildHourCandidateCharts } from "./core/lunarAdapter.js";

function modeValue(values = [], fallback = "unknown") {
  const counts = new Map();
  values.forEach((value) => {
    if (!value) return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  if (!counts.size) return fallback;
  let winner = fallback;
  let winnerCount = -1;
  counts.forEach((count, value) => {
    if (count > winnerCount) {
      winner = value;
      winnerCount = count;
    }
  });
  return winner;
}

function topLabels(values = [], limit = 2) {
  const counts = new Map();
  values.flat().forEach((value) => {
    if (!value) return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value]) => value);
}

const HOUR_CANDIDATE_COUNT = 12;

function buildDayunStages(dayun = [], annualScores = []) {
  return dayun.map((yun) => {
    const picked = annualScores.filter((item) => item.year >= yun.startYear && item.year <= yun.endYear);
    const first = picked[0];
    const last = picked[picked.length - 1];
    const average = picked.length
      ? Number((picked.reduce((sum, item) => sum + item.overall, 0) / picked.length).toFixed(1))
      : null;
    return {
      ...yun,
      phase: first?.dayunStage || "",
      phaseLabel: first?.dayunStageLabel || "",
      stage: first?.phase || "",
      stageLabel: first?.phaseLabel || "",
      averageOverall: average,
      startOverall: first?.overall ?? null,
      endOverall: last?.overall ?? null,
    };
  });
}

function aggregateAnnualScores(candidates = []) {
  if (!candidates.length) return [];
  const length = candidates[0].annualScores.length;
  return Array.from({ length }, (_, index) => {
    const picked = candidates.map((item) => item.annualScores[index]).filter(Boolean);
    const first = picked[0];
    const average = (key) => Number((picked.reduce((sum, item) => sum + item[key], 0) / picked.length).toFixed(1));
    const modeField = (key, fallback = "") => modeValue(picked.map((item) => item[key]), fallback);
    return {
      year: first.year,
      age: first.age,
      phase: modeField("phase"),
      phaseLabel: modeField("phaseLabel"),
      dayunStage: modeField("dayunStage"),
      dayunStageLabel: modeField("dayunStageLabel"),
      overall: average("overall"),
      wealth: average("wealth"),
      career: average("career"),
      relationship: average("relationship"),
      property: average("property"),
      influence: average("influence"),
      health: average("health"),
      art: average("art"),
      family: average("family"),
      notes: [
        ...first.notes.slice(0, 6),
        "无时辰：按十二时辰均值显示。",
      ],
    };
  });
}

function buildHourlessConsensus(input, corrected, liunian) {
  const candidates = buildHourCandidateCharts(corrected).map((candidate) => {
    const candidateInput = {
      ...corrected,
      timeKnown: true,
      hour: candidate.solar.getHour(),
      minute: candidate.solar.getMinute(),
    };
    const pillars = candidate.pillars;
    const dayMaster = candidate.dayMaster;
    const dayun = candidate.dayun;
    const strengthProfile = evaluateStrength(candidateInput, pillars, dayMaster, candidate);
    const strength = strengthProfile.strength;
    const pattern = judgePattern(dayMaster, strengthProfile);
    const { usefulGods, unfavorableGods } = resolveUsefulGods(strengthProfile, pattern);
    const annualScores = buildAnnualScores(
      candidateInput,
      { dayMaster, strength, pattern, usefulGods, unfavorableGods, strengthProfile, pillars },
      liunian,
      dayun
    );

    return {
      hour: candidateInput.hour,
      pillars,
      dayMaster,
      dayun,
      strength,
      pattern,
      usefulGods,
      unfavorableGods,
      strengthProfile,
      annualScores,
    };
  });

  const strengthMode = modeValue(candidates.map((item) => item.strength), "unknown");
  const strengthWins = candidates.filter((item) => item.strength === strengthMode).length;
  const strength = strengthWins >= 6 ? strengthMode : "unknown";
  const pattern = modeValue(candidates.map((item) => item.pattern), "待判");
  const usefulGods = topLabels(candidates.map((item) => item.usefulGods), 2);
  const unfavorableGods = topLabels(candidates.map((item) => item.unfavorableGods), 2);
  const strengthScore = Number((candidates.reduce((sum, item) => sum + item.strengthProfile.score, 0) / candidates.length).toFixed(2));
  const majority = candidates.find((item) => item.strength === strengthMode) || candidates[0];

  return {
    pillars: {
      year: majority.pillars.year,
      month: majority.pillars.month,
      day: majority.pillars.day,
      hour: undefined,
    },
    dayMaster: majority.dayMaster,
    dayun: majority.dayun,
    strength,
    pattern,
    usefulGods,
    unfavorableGods,
    strengthProfile: {
      strength,
      score: strengthScore,
      sampledHours: HOUR_CANDIDATE_COUNT,
    },
    annualScores: aggregateAnnualScores(candidates),
  };
}

export function buildBaziChart(payload = {}) {
  const input = normalizeBirthInput(payload);
  const validation = validateBirthInput(input);
  if (!validation.valid) {
    return {
      ok: false,
      errors: validation.errors,
      input,
    };
  }

  const corrected = applySolarTimeCorrection(input);
  const libraryChart = buildLibraryChart(corrected);
  let pillars = libraryChart.pillars;
  let dayMaster = libraryChart.dayMaster;
  let dayun = libraryChart.dayun;
  const liunian = buildLiunian(corrected, 80);
  let strengthProfile = evaluateStrength(corrected, pillars, dayMaster, libraryChart);
  let strength = strengthProfile.strength;
  let pattern = judgePattern(dayMaster, strengthProfile);
  let { usefulGods, unfavorableGods } = resolveUsefulGods(strengthProfile, pattern);
  let annualScores = buildAnnualScores(
    corrected,
    { dayMaster, strength, pattern, usefulGods, unfavorableGods, strengthProfile, pillars },
    liunian,
    dayun
  );

  if (!input.timeKnown) {
    const consensus = buildHourlessConsensus(input, corrected, liunian);
    pillars = consensus.pillars;
    dayMaster = consensus.dayMaster;
    dayun = consensus.dayun;
    strengthProfile = consensus.strengthProfile;
    strength = consensus.strength;
    pattern = consensus.pattern;
    usefulGods = consensus.usefulGods;
    unfavorableGods = consensus.unfavorableGods;
    annualScores = consensus.annualScores;
  }

  const result = buildEmptyChartResult(input);
  result.pillars = pillars;
  result.dayMaster = dayMaster;
  result.strength = strength;
  result.pattern = pattern;
  result.usefulGods = usefulGods;
  result.unfavorableGods = unfavorableGods;
  result.dayun = dayun;
  result.dayunStages = buildDayunStages(dayun, annualScores);
  result.annualScores = annualScores;
  result.notes = [
    input.timeKnown ? "当前已切到真实历法底层排盘。" : "当前为无时辰简盘：按十二时辰均值生成。",
    input.gender ? "" : "未填性别：大运顺逆按简化骨架处理，精度会下降。",
    `日主强弱评分：${strengthProfile.score}`,
    corrected.solarTimeNote || "",
    input.timeKnown ? `起运时间：${libraryChart.yunStartSolar}` : "无时辰时，起运时间按候选时辰均值近似。",
  ].filter(Boolean);
  result.locationMeta = {
    location: input.location || "",
    timezone: input.timezone || "",
    latitude: input.latitude,
    longitude: input.longitude,
    utcOffsetMinutes: input.utcOffsetMinutes,
    solarTimeApplied: Boolean(corrected.solarTimeApplied),
    solarTimeMode: corrected.solarTimeMode || "unresolved",
    solarTimeCorrectionMinutes: corrected.solarTimeCorrectionMinutes ?? 0,
    meanSolarCorrectionMinutes: corrected.meanSolarCorrectionMinutes ?? 0,
    equationOfTimeMinutes: corrected.equationOfTimeMinutes ?? 0,
  };

  return {
    ok: true,
    result,
  };
}
