import sweph from "sweph";

const { constants } = sweph;

const PLANETS = [
  ["sun", constants.SE_SUN],
  ["moon", constants.SE_MOON],
  ["mercury", constants.SE_MERCURY],
  ["venus", constants.SE_VENUS],
  ["mars", constants.SE_MARS],
  ["jupiter", constants.SE_JUPITER],
  ["saturn", constants.SE_SATURN],
  ["uranus", constants.SE_URANUS],
  ["neptune", constants.SE_NEPTUNE],
  ["pluto", constants.SE_PLUTO],
  ["chiron", constants.SE_CHIRON],
  ["northNode", constants.SE_TRUE_NODE],
  ["lilith", constants.SE_MEAN_APOG],
  ["ceres", constants.SE_CERES],
  ["pallas", constants.SE_PALLAS],
  ["juno", constants.SE_JUNO],
  ["vesta", constants.SE_VESTA],
];

function normalizeAngle(angle) {
  let value = Number(angle) % 360;
  if (value < 0) value += 360;
  return value;
}

function formatOffsetMinutes(minutes) {
  const sign = minutes < 0 ? "-" : "+";
  const absolute = Math.abs(minutes);
  const hh = String(Math.floor(absolute / 60)).padStart(2, "0");
  const mm = String(absolute % 60).padStart(2, "0");
  return `${sign}${hh}:${mm}`;
}

function parseOffsetToHours(tz) {
  const match = String(tz || "").trim().match(/^([+-])(\d{2}):?(\d{2})$/);
  if (!match) throw new Error("时区格式应为 +08:00 这种形式。");
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3]);
  return sign * (hours + minutes / 60);
}

function toUtcDateParts(year, month, day, hour, minute, second, offsetHours) {
  const converted = sweph.utc_time_zone(
    year,
    month,
    day,
    hour,
    minute,
    second,
    offsetHours
  );

  if (!converted || !Number.isFinite(converted.year) || !Number.isFinite(converted.hour)) {
    throw new Error("本地时间转 UTC 失败。");
  }

  return converted;
}

function signIndex(longitude) {
  return Math.floor(normalizeAngle(longitude) / 30) % 12;
}

function findHouse(longitude, houses) {
  const lon = normalizeAngle(longitude);
  for (let i = 0; i < houses.length; i += 1) {
    const start = normalizeAngle(houses[i]);
    const end = normalizeAngle(houses[(i + 1) % houses.length]);
    if (start < end) {
      if (lon >= start && lon < end) return i + 1;
    } else if (lon >= start || lon < end) {
      return i + 1;
    }
  }
  return 1;
}

function calcPlanet(jdUt, planetId) {
  const result = sweph.calc_ut(
    jdUt,
    planetId,
    constants.SEFLG_MOSEPH | constants.SEFLG_SPEED
  );
  if (!result || !Array.isArray(result.data)) {
    throw new Error(`行星计算失败: ${planetId}`);
  }
  return result;
}

export function buildChart(input) {
  const year = Number(input.year);
  const month = Number(input.month);
  const day = Number(input.day);
  const hour = Number(input.hour);
  const minute = Number(input.minute);
  const second = Number(input.second || 0);
  const latitude = Number(input.latitude);
  const longitude = Number(input.longitude);
  const timezone = String(input.timezone || "").trim();

  if (!year || !month || !day) throw new Error("出生日期不完整。");
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) throw new Error("出生时间不完整。");
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) throw new Error("经纬度不完整。");
  if (!timezone) throw new Error("时区不完整。");

  const offsetHours = parseOffsetToHours(timezone);
  const utc = toUtcDateParts(year, month, day, hour, minute, second, offsetHours);

  const jdResult = sweph.utc_to_jd(
    utc.year,
    utc.month,
    utc.day,
    utc.hour,
    utc.minute,
    utc.second,
    constants.SE_GREG_CAL
  );

  if (!jdResult || !Array.isArray(jdResult.data)) {
    throw new Error("儒略日计算失败。");
  }

  const [, jdUt] = jdResult.data;
  const housesResult = sweph.houses_ex2(jdUt, 0, latitude, longitude, "P");

  if (!housesResult || !housesResult.data?.houses || !housesResult.data?.points) {
    throw new Error("宫位计算失败。");
  }

  const houses = housesResult.data.houses.map((value) => normalizeAngle(value));
  const points = housesResult.data.points.map((value) => normalizeAngle(value));

  const planets = PLANETS.map(([key, id]) => {
    const result = calcPlanet(jdUt, id);
    const planetLongitude = normalizeAngle(result.data[0]);
    return {
      key,
      longitude: planetLongitude,
      latitude: result.data[1],
      distance: result.data[2],
      speed: result.data[3],
      signIndex: signIndex(planetLongitude),
      house: findHouse(planetLongitude, houses),
    };
  });

  const northNode = planets.find((item) => item.key === "northNode");
  if (northNode) {
    planets.push({
      key: "southNode",
      longitude: normalizeAngle(northNode.longitude + 180),
      latitude: -Number(northNode.latitude || 0),
      distance: Number(northNode.distance || 0),
      speed: Number(northNode.speed || 0),
      signIndex: signIndex(northNode.longitude + 180),
      house: findHouse(northNode.longitude + 180, houses),
    });
  }

  const sun = planets.find((item) => item.key === "sun");
  const moon = planets.find((item) => item.key === "moon");
  if (sun && moon) {
    const ascLongitude = points[0];
    const dscLongitude = normalizeAngle(ascLongitude + 180);
    const isDayChart = ascLongitude < dscLongitude
      ? sun.longitude >= ascLongitude && sun.longitude < dscLongitude
      : sun.longitude >= ascLongitude || sun.longitude < dscLongitude;
    const fortuneLongitude = isDayChart
      ? normalizeAngle(ascLongitude + moon.longitude - sun.longitude)
      : normalizeAngle(ascLongitude + sun.longitude - moon.longitude);
    planets.push({
      key: "fortune",
      longitude: fortuneLongitude,
      latitude: 0,
      distance: 0,
      speed: 0,
      signIndex: signIndex(fortuneLongitude),
      house: findHouse(fortuneLongitude, houses),
    });
  }

  return {
    input: {
      year,
      month,
      day,
      hour,
      minute,
      second,
      latitude,
      longitude,
      timezone,
      timezoneMinutes: Math.round(offsetHours * 60),
      timezoneLabel: formatOffsetMinutes(Math.round(offsetHours * 60)),
    },
    julian: {
      ut: jdUt,
    },
    axes: {
      asc: points[0],
      mc: points[1],
      armc: points[2],
      vertex: points[3],
      equAsc: points[4],
      coAsc1: points[5],
      coAsc2: points[6],
      polarAsc: points[7],
      dsc: normalizeAngle(points[0] + 180),
      ic: normalizeAngle(points[1] + 180),
    },
    houses,
    planets,
  };
}
