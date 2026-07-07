export function resolveDayMaster(pillars) {
  return String(pillars.day || "").slice(0, 1) || "";
}
