const JIE_QI_BOUNDARIES = [
  { month: 1, day: 6, monthIndex: 11, branch: "丑", name: "小寒" },
  { month: 2, day: 4, monthIndex: 0, branch: "寅", name: "立春" },
  { month: 3, day: 6, monthIndex: 1, branch: "卯", name: "惊蛰" },
  { month: 4, day: 5, monthIndex: 2, branch: "辰", name: "清明" },
  { month: 5, day: 6, monthIndex: 3, branch: "巳", name: "立夏" },
  { month: 6, day: 6, monthIndex: 4, branch: "午", name: "芒种" },
  { month: 7, day: 7, monthIndex: 5, branch: "未", name: "小暑" },
  { month: 8, day: 8, monthIndex: 6, branch: "申", name: "立秋" },
  { month: 9, day: 8, monthIndex: 7, branch: "酉", name: "白露" },
  { month: 10, day: 8, monthIndex: 8, branch: "戌", name: "寒露" },
  { month: 11, day: 7, monthIndex: 9, branch: "亥", name: "立冬" },
  { month: 12, day: 7, monthIndex: 10, branch: "子", name: "大雪" },
];

function compareMonthDay(month, day, boundaryMonth, boundaryDay) {
  if (month !== boundaryMonth) return month - boundaryMonth;
  return day - boundaryDay;
}

export function buildSolarDateParts(input) {
  return {
    year: input.year,
    month: input.month,
    day: input.day,
    hour: input.timeKnown ? input.hour ?? 0 : 12,
    minute: input.timeKnown ? input.minute ?? 0 : 0,
  };
}

export function resolveGanzhiYear(solar) {
  const beforeLiChun = compareMonthDay(solar.month, solar.day, 2, 4) < 0;
  return beforeLiChun ? solar.year - 1 : solar.year;
}

export function resolveMonthBoundary(solar) {
  const monthDayKey = solar.month * 100 + solar.day;
  const sorted = [...JIE_QI_BOUNDARIES].sort((a, b) => (a.month * 100 + a.day) - (b.month * 100 + b.day));
  let current = sorted[sorted.length - 1];
  for (const item of sorted) {
    if (monthDayKey >= item.month * 100 + item.day) current = item;
  }
  return current;
}

function boundaryYearForSolar(solar, boundary) {
  return boundary.month > solar.month ? solar.year - 1 : solar.year;
}

export function previousBoundaryDate(solar) {
  const current = resolveMonthBoundary(solar);
  const year = boundaryYearForSolar(solar, current);
  return new Date(Date.UTC(year, current.month - 1, current.day, 12, 0, 0));
}

export function nextBoundaryDate(solar) {
  const current = resolveMonthBoundary(solar);
  const idx = JIE_QI_BOUNDARIES.findIndex((item) => item.name === current.name);
  const next = JIE_QI_BOUNDARIES[(idx + 1) % JIE_QI_BOUNDARIES.length];
  const currentYear = boundaryYearForSolar(solar, current);
  const nextYear = next.month < current.month ? currentYear + 1 : currentYear;
  return new Date(Date.UTC(nextYear, next.month - 1, next.day, 12, 0, 0));
}
