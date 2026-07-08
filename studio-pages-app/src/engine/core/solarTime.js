function shiftDateParts(year, month, day, totalMinutes) {
  const base = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const shifted = new Date(base.getTime() + totalMinutes * 60 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
  };
}

function dayOfYear(year, month, day) {
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, month - 1, day);
  return Math.floor((current - start) / 86400000) + 1;
}

function equationOfTimeMinutes(year, month, day, hour = 12, minute = 0) {
  const n = dayOfYear(year, month, day);
  const gamma = (2 * Math.PI / 365) * (n - 1 + ((hour - 12) / 24) + (minute / 1440));
  return 229.18 * (
    0.000075
    + 0.001868 * Math.cos(gamma)
    - 0.032077 * Math.sin(gamma)
    - 0.014615 * Math.cos(2 * gamma)
    - 0.040849 * Math.sin(2 * gamma)
  );
}

export function applySolarTimeCorrection(input) {
  if (!input.timeKnown) {
    return {
      ...input,
      correctedHour: undefined,
      correctedMinute: undefined,
      solarTimeApplied: false,
      solarTimeMode: "hour-unknown",
      solarTimeNote: "无时辰，不做时间修正。",
    };
  }

  const longitude = typeof input.longitude === "number" ? input.longitude : undefined;
  const utcOffsetMinutes = typeof input.utcOffsetMinutes === "number" ? input.utcOffsetMinutes : undefined;

  if (longitude === undefined || utcOffsetMinutes === undefined) {
    return {
      ...input,
      correctedHour: input.hour ?? 0,
      correctedMinute: input.minute ?? 0,
      solarTimeApplied: false,
      solarTimeMode: "unresolved",
      solarTimeNote: "未解析出生地经度/时区，仍按填入钟表时排盘。",
    };
  }

  const standardMeridian = (utcOffsetMinutes / 60) * 15;
  const longitudeDelta = longitude - standardMeridian;
  const meanSolarCorrectionMinutes = longitudeDelta * 4;
  const equationMinutes = equationOfTimeMinutes(input.year, input.month, input.day, input.hour ?? 0, input.minute ?? 0);
  const correctionMinutes = Math.round(meanSolarCorrectionMinutes + equationMinutes);
  const localClockMinutes = (input.hour ?? 0) * 60 + (input.minute ?? 0);
  const correctedTotalMinutes = localClockMinutes + correctionMinutes;
  const shifted = shiftDateParts(input.year, input.month, input.day, correctedTotalMinutes);

  return {
    ...input,
    year: shifted.year,
    month: shifted.month,
    day: shifted.day,
    hour: shifted.hour,
    minute: shifted.minute,
    correctedHour: shifted.hour,
    correctedMinute: shifted.minute,
    solarTimeApplied: correctionMinutes !== 0,
    solarTimeMode: "apparent-solar",
    solarTimeCorrectionMinutes: correctionMinutes,
    meanSolarCorrectionMinutes: Number(meanSolarCorrectionMinutes.toFixed(2)),
    equationOfTimeMinutes: Number(equationMinutes.toFixed(2)),
    standardMeridian,
    solarTimeNote: `已按经度与时区修正 ${correctionMinutes >= 0 ? "+" : ""}${correctionMinutes} 分钟（含真太阳时方程 ${equationMinutes >= 0 ? "+" : ""}${Number(equationMinutes.toFixed(2))} 分钟）。`,
  };
}
