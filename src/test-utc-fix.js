import sweph from "../../命理_app/node_modules/sweph/index.mjs";

const { constants } = sweph;

function oldJd(year, month, day, hour, minute, second, offsetHours) {
  return sweph.utc_to_jd(
    year,
    month,
    day,
    hour - offsetHours,
    minute,
    second,
    constants.SE_GREG_CAL
  );
}

function fixedJd(year, month, day, hour, minute, second, offsetHours) {
  const utc = sweph.utc_time_zone(year, month, day, hour, minute, second, offsetHours);
  return {
    utc,
    jd: sweph.utc_to_jd(
      utc.year,
      utc.month,
      utc.day,
      utc.hour,
      utc.minute,
      utc.second,
      constants.SE_GREG_CAL
    ),
  };
}

const cases = [
  { label: "Beijing daytime", year: 1986, month: 9, day: 10, hour: 11, minute: 35, second: 0, offsetHours: 8 },
  { label: "Beijing after midnight", year: 1986, month: 9, day: 10, hour: 1, minute: 35, second: 0, offsetHours: 8 },
  { label: "London winter", year: 1986, month: 1, day: 3, hour: 2, minute: 15, second: 0, offsetHours: 0 },
];

for (const item of cases) {
  const oldResult = oldJd(item.year, item.month, item.day, item.hour, item.minute, item.second, item.offsetHours);
  const newResult = fixedJd(item.year, item.month, item.day, item.hour, item.minute, item.second, item.offsetHours);
  console.log(JSON.stringify({
    label: item.label,
    oldFlag: oldResult.flag,
    oldError: oldResult.error,
    oldUt: oldResult.data?.[1],
    utc: newResult.utc,
    newFlag: newResult.jd.flag,
    newError: newResult.jd.error,
    newUt: newResult.jd.data?.[1],
  }, null, 2));
}
