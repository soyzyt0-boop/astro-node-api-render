import { ganzhiFromIndex, HEAVENLY_STEMS, EARTHLY_BRANCHES } from "../constants/ganzhi.js";
import { buildSolarDateParts, resolveGanzhiYear, resolveMonthBoundary } from "./calendar.js";

const YEAR_STEM_GROUPS = {
  甲: 2,
  己: 2,
  乙: 4,
  庚: 4,
  丙: 6,
  辛: 6,
  丁: 8,
  壬: 8,
  戊: 0,
  癸: 0,
};

const HOUR_STEM_GROUPS = {
  甲: 0,
  己: 0,
  乙: 2,
  庚: 2,
  丙: 4,
  辛: 4,
  丁: 6,
  壬: 6,
  戊: 8,
  癸: 8,
};

function yearGanzhiFromSolar(solar) {
  const ganzhiYear = resolveGanzhiYear(solar);
  return ganzhiFromIndex(ganzhiYear - 4);
}

function monthGanzhiFromSolar(solar, yearPillar) {
  const boundary = resolveMonthBoundary(solar);
  const yearStem = yearPillar.slice(0, 1);
  const startStemIndex = YEAR_STEM_GROUPS[yearStem] ?? 0;
  const stemIndex = (startStemIndex + boundary.monthIndex) % 10;
  const branch = boundary.branch;
  return `${HEAVENLY_STEMS[stemIndex]}${branch}`;
}

function julianDayNumber(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day
    + Math.floor((153 * m + 2) / 5)
    + 365 * y
    + Math.floor(y / 4)
    - Math.floor(y / 100)
    + Math.floor(y / 400)
    - 32045;
}

function dayGanzhiFromSolar(solar) {
  const jdn = julianDayNumber(solar.year, solar.month, solar.day);
  const baseJdn = julianDayNumber(1984, 2, 2); // 甲子日常用基准
  return ganzhiFromIndex(jdn - baseJdn);
}

function hourBranchIndex(hour) {
  return Math.floor(((hour ?? 0) + 1) / 2) % 12;
}

function hourGanzhi(dayPillar, hour) {
  const dayStem = dayPillar.slice(0, 1);
  const startStemIndex = HOUR_STEM_GROUPS[dayStem] ?? 0;
  const branchIndex = hourBranchIndex(hour);
  return `${HEAVENLY_STEMS[(startStemIndex + branchIndex) % 10]}${EARTHLY_BRANCHES[branchIndex]}`;
}

export function buildPillars(input) {
  const solar = buildSolarDateParts(input);
  const year = yearGanzhiFromSolar(solar);
  const month = monthGanzhiFromSolar(solar, year);
  const day = dayGanzhiFromSolar(solar);
  const hour = input.timeKnown ? hourGanzhi(day, input.hour ?? 0) : undefined;
  return { year, month, day, hour };
}
