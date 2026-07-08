import lunar from "lunar-javascript";

const { Solar } = lunar;

const HOUR_CANDIDATES = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

function genderCode(gender) {
  if (gender === "male") return 1;
  return 0;
}

function buildSolar(input, hour = 12, minute = 0) {
  return Solar.fromYmdHms(input.year, input.month, input.day, hour, minute, 0);
}

function toPillars(eightChar, timeKnown) {
  return {
    year: eightChar.getYear(),
    month: eightChar.getMonth(),
    day: eightChar.getDay(),
    hour: timeKnown ? eightChar.getTime() : undefined,
  };
}

function toDayun(eightChar, input, count = 8) {
  const yun = eightChar.getYun(genderCode(input.gender));
  const direction = yun.isForward() ? "forward" : "backward";
  return yun.getDaYun(count + 1)
    .filter((item) => item.getIndex() > 0)
    .slice(0, count)
    .map((item) => ({
      startYear: item.getStartYear(),
      endYear: item.getEndYear(),
      startAge: item.getStartAge(),
      endAge: item.getEndAge(),
      direction,
      ganZhi: item.getGanZhi(),
    }));
}

function toLibraryChart(input, hour, minute) {
  const solar = buildSolar(input, hour, minute);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();
  return {
    solar,
    lunar,
    eightChar,
    baZi: eightChar.toString(),
    pillars: toPillars(eightChar, input.timeKnown),
    dayMaster: eightChar.getDayGan(),
    dayBranch: eightChar.getDayZhi(),
    yunStartSolar: eightChar.getYun(genderCode(input.gender)).getStartSolar().toYmdHms(),
    dayun: toDayun(eightChar, input),
    hiddenStems: {
      year: eightChar.getYearHideGan(),
      month: eightChar.getMonthHideGan(),
      day: eightChar.getDayHideGan(),
      hour: input.timeKnown ? eightChar.getTimeHideGan() : [],
    },
    diShi: {
      year: eightChar.getYearDiShi(),
      month: eightChar.getMonthDiShi(),
      day: eightChar.getDayDiShi(),
      hour: input.timeKnown ? eightChar.getTimeDiShi() : "",
    },
    wuXing: {
      year: eightChar.getYearWuXing(),
      month: eightChar.getMonthWuXing(),
      day: eightChar.getDayWuXing(),
      hour: input.timeKnown ? eightChar.getTimeWuXing() : "",
    },
    shiShenGan: {
      year: eightChar.getYearShiShenGan(),
      month: eightChar.getMonthShiShenGan(),
      day: eightChar.getDayShiShenGan(),
      hour: input.timeKnown ? eightChar.getTimeShiShenGan() : "",
    },
    shiShenZhi: {
      year: eightChar.getYearShiShenZhi(),
      month: eightChar.getMonthShiShenZhi(),
      day: eightChar.getDayShiShenZhi(),
      hour: input.timeKnown ? eightChar.getTimeShiShenZhi() : [],
    },
  };
}

export function buildLibraryChart(input) {
  const hour = input.timeKnown ? input.hour ?? 0 : 12;
  const minute = input.timeKnown ? input.minute ?? 0 : 0;
  return toLibraryChart(input, hour, minute);
}

export function buildHourCandidateCharts(input) {
  return HOUR_CANDIDATES.map((hour) => toLibraryChart(input, hour, 0));
}
