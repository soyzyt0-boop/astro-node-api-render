import { ganzhiFromIndex, HEAVENLY_STEMS, EARTHLY_BRANCHES } from "../constants/ganzhi.js";
import { buildSolarDateParts, nextBoundaryDate, previousBoundaryDate } from "./calendar.js";

function stemIsYang(stem) {
  return ["甲", "丙", "戊", "庚", "壬"].includes(stem);
}

function resolveDirection(yearStem, gender) {
  if (!gender) return 1;
  const yang = stemIsYang(yearStem);
  if ((gender === "male" && yang) || (gender === "female" && !yang)) return 1;
  return -1;
}

function buildBirthDate(input) {
  return new Date(Date.UTC(
    input.year,
    input.month - 1,
    input.day,
    input.timeKnown ? input.hour ?? 12 : 12,
    input.timeKnown ? input.minute ?? 0 : 0,
    0
  ));
}

function resolveStartAge(input, direction) {
  const solar = buildSolarDateParts(input);
  const birthDate = buildBirthDate(input);
  const boundaryDate = direction === 1 ? nextBoundaryDate(solar) : previousBoundaryDate(solar);
  const diffMs = Math.abs(boundaryDate.getTime() - birthDate.getTime());
  const diffDays = diffMs / 86400000;
  const age = diffDays / 3;
  return Math.max(1, Number(age.toFixed(1)));
}

function nextGanzhi(pillar, step) {
  const stem = pillar.slice(0, 1);
  const branch = pillar.slice(1, 2);
  const stemIndex = HEAVENLY_STEMS.indexOf(stem);
  const branchIndex = EARTHLY_BRANCHES.indexOf(branch);
  const movedStem = (stemIndex + step + 100) % 10;
  const movedBranch = (branchIndex + step + 120) % 12;
  return `${HEAVENLY_STEMS[movedStem]}${EARTHLY_BRANCHES[movedBranch]}`;
}

export function buildDayun(input, pillars) {
  const yearStem = pillars.year.slice(0, 1);
  const direction = resolveDirection(yearStem, input.gender);
  const startAge = resolveStartAge(input, direction);
  const firstStartYear = input.year + Math.floor(startAge);

  return Array.from({ length: 8 }, (_, index) => {
    const begin = firstStartYear + index * 10;
    return {
      startYear: begin,
      endYear: begin + 9,
      startAge: Number((startAge + index * 10).toFixed(1)),
      direction: direction === 1 ? "forward" : "backward",
      ganZhi: nextGanzhi(pillars.month, direction * (index + 1)),
    };
  });
}
