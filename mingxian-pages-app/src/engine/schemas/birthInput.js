const TIMEZONE_FALLBACK = "Asia/Shanghai";

function asInt(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function asFloat(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function normalizeBirthInput(payload = {}) {
  const year = asInt(payload.year);
  const month = asInt(payload.month);
  const day = asInt(payload.day);
  const hour = asInt(payload.hour);
  const minute = asInt(payload.minute);
  const timeKnown = Boolean(payload.timeKnown);

  return {
    name: String(payload.name || "").trim(),
    gender: payload.gender === "male" ? "male" : payload.gender === "female" ? "female" : undefined,
    calendar: "solar",
    year,
    month,
    day,
    hour: timeKnown ? hour ?? 0 : undefined,
    minute: timeKnown ? minute ?? 0 : undefined,
    timeKnown,
    timezone: String(payload.timezone || TIMEZONE_FALLBACK).trim() || TIMEZONE_FALLBACK,
    location: String(payload.location || "").trim(),
    latitude: asFloat(payload.latitude),
    longitude: asFloat(payload.longitude),
    utcOffsetMinutes: asInt(payload.utcOffsetMinutes),
  };
}

export function validateBirthInput(input) {
  const errors = [];
  if (!input.year || input.year < 1900 || input.year > 2100) errors.push("出生年不对。");
  if (!input.month || input.month < 1 || input.month > 12) errors.push("出生月不对。");
  if (!input.day || input.day < 1 || input.day > 31) errors.push("出生日不对。");
  if (input.timeKnown) {
    if (input.hour === undefined || input.hour < 0 || input.hour > 23) errors.push("出生时不对。");
    if (input.minute === undefined || input.minute < 0 || input.minute > 59) errors.push("出生分不对。");
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}
