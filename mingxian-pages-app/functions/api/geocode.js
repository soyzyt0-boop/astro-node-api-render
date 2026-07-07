function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function corsEmpty(status = 204) {
  return new Response(null, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      "Cache-Control": "no-store",
    },
  });
}

function cleanCityQuery(value = "") {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function stripCommonSuffix(city) {
  return cleanCityQuery(city)
    .replace(/(市|省|自治区|特别行政区|地区|盟)$/u, "")
    .replace(/\s*\((.*?)\)\s*$/u, "");
}

function parseCityInput(value = "") {
  const normalized = cleanCityQuery(value);
  const segments = normalized.split(",").map((item) => item.trim()).filter(Boolean);
  if (segments.length < 2) {
    return {
      raw: normalized,
      city: normalized,
      countryFilter: "",
    };
  }
  return {
    raw: normalized,
    city: segments[0],
    countryFilter: segments.slice(1).join(" ").toLowerCase(),
  };
}

const CITY_ALIASES = {
  "北京": "Beijing",
  "北京市": "Beijing",
  "上海": "Shanghai",
  "上海市": "Shanghai",
  "广州": "Guangzhou",
  "广州市": "Guangzhou",
  "深圳": "Shenzhen",
  "深圳市": "Shenzhen",
  "杭州": "Hangzhou",
  "杭州市": "Hangzhou",
  "成都": "Chengdu",
  "成都市": "Chengdu",
  "重庆": "Chongqing",
  "重庆市": "Chongqing",
  "天津": "Tianjin",
  "天津市": "Tianjin",
  "南京": "Nanjing",
  "南京市": "Nanjing",
  "西安": "Xi'an",
  "西安市": "Xi'an",
  "武汉": "Wuhan",
  "武汉市": "Wuhan",
  "苏州": "Suzhou",
  "苏州市": "Suzhou",
  "长沙": "Changsha",
  "长沙市": "Changsha",
  "郑州": "Zhengzhou",
  "郑州市": "Zhengzhou",
  "青岛": "Qingdao",
  "青岛市": "Qingdao",
  "厦门": "Xiamen",
  "厦门市": "Xiamen",
  "福州": "Fuzhou",
  "福州市": "Fuzhou",
  "泉州": "Quanzhou",
  "泉州市": "Quanzhou",
  "宁波": "Ningbo",
  "宁波市": "Ningbo",
  "无锡": "Wuxi",
  "无锡市": "Wuxi",
  "常州": "Changzhou",
  "常州市": "Changzhou",
  "南通": "Nantong",
  "南通市": "Nantong",
  "济南": "Jinan",
  "济南市": "Jinan",
  "烟台": "Yantai",
  "烟台市": "Yantai",
  "大连": "Dalian",
  "大连市": "Dalian",
  "沈阳": "Shenyang",
  "沈阳市": "Shenyang",
  "哈尔滨": "Harbin",
  "哈尔滨市": "Harbin",
  "长春": "Changchun",
  "长春市": "Changchun",
  "石家庄": "Shijiazhuang",
  "石家庄市": "Shijiazhuang",
  "太原": "Taiyuan",
  "太原市": "Taiyuan",
  "南昌": "Nanchang",
  "南昌市": "Nanchang",
  "合肥": "Hefei",
  "合肥市": "Hefei",
  "昆明": "Kunming",
  "昆明市": "Kunming",
  "贵阳": "Guiyang",
  "贵阳市": "Guiyang",
  "南宁": "Nanning",
  "南宁市": "Nanning",
  "海口": "Haikou",
  "海口市": "Haikou",
  "三亚": "Sanya",
  "三亚市": "Sanya",
  "拉萨": "Lhasa",
  "拉萨市": "Lhasa",
  "兰州": "Lanzhou",
  "兰州市": "Lanzhou",
  "西宁": "Xining",
  "西宁市": "Xining",
  "银川": "Yinchuan",
  "银川市": "Yinchuan",
  "乌鲁木齐": "Urumqi",
  "乌鲁木齐市": "Urumqi",
  "呼和浩特": "Hohhot",
  "呼和浩特市": "Hohhot",
  "香港": "Hong Kong",
  "台北": "Taipei",
  "澳门": "Macau",
  "高雄": "Kaohsiung",
  "台中": "Taichung",
  "桃园": "Taoyuan City",
  "新北": "New Taipei City",
  "东京": "Tokyo",
  "大阪": "Osaka",
  "京都": "Kyoto",
  "横滨": "Yokohama",
  "名古屋": "Nagoya",
  "札幌": "Sapporo",
  "福冈": "Fukuoka",
  "首尔": "Seoul",
  "釜山": "Busan",
  "仁川": "Incheon",
  "新加坡": "Singapore",
  "曼谷": "Bangkok",
  "清迈": "Chiang Mai",
  "普吉": "Phuket",
  "吉隆坡": "Kuala Lumpur",
  "槟城": "George Town",
  "雅加达": "Jakarta",
  "巴厘岛": "Denpasar",
  "胡志明市": "Ho Chi Minh City",
  "河内": "Hanoi",
  "岘港": "Da Nang",
  "马尼拉": "Manila",
  "宿务": "Cebu City",
  "德里": "Delhi",
  "孟买": "Mumbai",
  "班加罗尔": "Bengaluru",
  "加尔各答": "Kolkata",
  "迪拜": "Dubai",
  "阿布扎比": "Abu Dhabi",
  "伊斯坦布尔": "Istanbul",
  "伦敦": "London",
  "巴黎": "Paris",
  "柏林": "Berlin",
  "马德里": "Madrid",
  "巴塞罗那": "Barcelona",
  "里斯本": "Lisbon",
  "罗马": "Rome",
  "维也纳": "Vienna",
  "布拉格": "Prague",
  "阿姆斯特丹": "Amsterdam",
  "布鲁塞尔": "Brussels",
  "哥本哈根": "Copenhagen",
  "斯德哥尔摩": "Stockholm",
  "奥斯陆": "Oslo",
  "赫尔辛基": "Helsinki",
  "苏黎世": "Zurich",
  "日内瓦": "Geneva",
  "雅典": "Athens",
  "布达佩斯": "Budapest",
  "华沙": "Warsaw",
  "都柏林": "Dublin",
  "爱丁堡": "Edinburgh",
  "格拉斯哥": "Glasgow",
  "纽约": "New York",
  "洛杉矶": "Los Angeles",
  "旧金山": "San Francisco",
  "西雅图": "Seattle",
  "芝加哥": "Chicago",
  "波士顿": "Boston",
  "华盛顿": "Washington",
  "华盛顿特区": "Washington",
  "迈阿密": "Miami",
  "休斯顿": "Houston",
  "达拉斯": "Dallas",
  "奥斯汀": "Austin",
  "亚特兰大": "Atlanta",
  "拉斯维加斯": "Las Vegas",
  "圣地亚哥(美国)": "San Diego",
  "圣迭戈": "San Diego",
  "费城": "Philadelphia",
  "菲尼克斯": "Phoenix",
  "温哥华": "Vancouver",
  "多伦多": "Toronto",
  "蒙特利尔": "Montreal",
  "卡尔加里": "Calgary",
  "悉尼": "Sydney",
  "墨尔本": "Melbourne",
  "奥克兰": "Auckland",
  "布里斯班": "Brisbane",
  "珀斯": "Perth",
  "阿德莱德": "Adelaide",
  "墨西哥城": "Mexico City",
  "利马": "Lima",
  "圣保罗": "Sao Paulo",
  "布宜诺斯艾利斯": "Buenos Aires",
  "里约热内卢": "Rio de Janeiro",
  "圣地亚哥": "Santiago",
  "圣地亚哥(智利)": "Santiago",
  "波哥大": "Bogota",
  "基多": "Quito",
};

function cityQueryVariants(city) {
  const parsed = parseCityInput(city);
  const normalized = parsed.city;
  const alias = CITY_ALIASES[normalized];
  const stripped = stripCommonSuffix(normalized);
  return [...new Set([normalized, stripped, alias].filter(Boolean))];
}

function normalizeCountryText(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

const COUNTRY_ALIASES = {
  uk: "united kingdom",
  gb: "united kingdom",
  england: "united kingdom",
  scotland: "united kingdom",
  us: "united states",
  usa: "united states",
  uae: "united arab emirates",
  ae: "united arab emirates",
  es: "spain",
  fr: "france",
  de: "germany",
  it: "italy",
  pt: "portugal",
  nl: "netherlands",
  be: "belgium",
  ch: "switzerland",
  at: "austria",
  ar: "argentina",
  mx: "mexico",
  ca: "canada",
  cn: "china",
  jp: "japan",
  kr: "south korea",
  tw: "taiwan",
  hk: "hong kong",
  sg: "singapore",
  th: "thailand",
  my: "malaysia",
  id: "indonesia",
  au: "australia",
  nz: "new zealand",
  cl: "chile",
  pe: "peru",
  br: "brazil",
};

const FALLBACK_CITY_COORDS = {
  beijing: { city: "Beijing", country: "China", region: "Beijing", timezone: "Asia/Shanghai", latitude: 39.9042, longitude: 116.4074 },
  paris: { city: "Paris", country: "France", region: "Ile-de-France", timezone: "Europe/Paris", latitude: 48.8566, longitude: 2.3522 },
  london: { city: "London", country: "United Kingdom", region: "England", timezone: "Europe/London", latitude: 51.5074, longitude: -0.1278 },
  madrid: { city: "Madrid", country: "Spain", region: "Community of Madrid", timezone: "Europe/Madrid", latitude: 40.4168, longitude: -3.7038 },
  barcelona: { city: "Barcelona", country: "Spain", region: "Catalonia", timezone: "Europe/Madrid", latitude: 41.3874, longitude: 2.1686 },
  rome: { city: "Rome", country: "Italy", region: "Lazio", timezone: "Europe/Rome", latitude: 41.9028, longitude: 12.4964 },
  berlin: { city: "Berlin", country: "Germany", region: "Berlin", timezone: "Europe/Berlin", latitude: 52.52, longitude: 13.405 },
  lisbon: { city: "Lisbon", country: "Portugal", region: "Lisbon", timezone: "Europe/Lisbon", latitude: 38.7223, longitude: -9.1393 },
  vienna: { city: "Vienna", country: "Austria", region: "Vienna", timezone: "Europe/Vienna", latitude: 48.2082, longitude: 16.3738 },
  amsterdam: { city: "Amsterdam", country: "Netherlands", region: "North Holland", timezone: "Europe/Amsterdam", latitude: 52.3676, longitude: 4.9041 },
  newyork: { city: "New York", country: "United States", region: "New York", timezone: "America/New_York", latitude: 40.7128, longitude: -74.006 },
  "new york": { city: "New York", country: "United States", region: "New York", timezone: "America/New_York", latitude: 40.7128, longitude: -74.006 },
  losangeles: { city: "Los Angeles", country: "United States", region: "California", timezone: "America/Los_Angeles", latitude: 34.0522, longitude: -118.2437 },
  "los angeles": { city: "Los Angeles", country: "United States", region: "California", timezone: "America/Los_Angeles", latitude: 34.0522, longitude: -118.2437 },
  tokyo: { city: "Tokyo", country: "Japan", region: "Tokyo", timezone: "Asia/Tokyo", latitude: 35.6762, longitude: 139.6503 },
  seoul: { city: "Seoul", country: "South Korea", region: "Seoul", timezone: "Asia/Seoul", latitude: 37.5665, longitude: 126.978 },
  singapore: { city: "Singapore", country: "Singapore", region: "Singapore", timezone: "Asia/Singapore", latitude: 1.3521, longitude: 103.8198 },
  sydney: { city: "Sydney", country: "Australia", region: "New South Wales", timezone: "Australia/Sydney", latitude: -33.8688, longitude: 151.2093 },
};

function normalizeFallbackKey(value = "") {
  return cleanCityQuery(value)
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fallbackCityResult(city, year, month, day) {
  const parsed = parseCityInput(city);
  const variants = cityQueryVariants(parsed.raw)
    .map((item) => normalizeFallbackKey(item))
    .flatMap((item) => [item, item.replace(/\s+/g, "")]);
  const matchedKey = variants.find((key) => FALLBACK_CITY_COORDS[key]);
  if (!matchedKey) return null;
  const base = FALLBACK_CITY_COORDS[matchedKey];
  const utcOffsetMinutes = year && month && day
    ? timezoneOffsetMinutesAt(base.timezone, year, month, day, 12, 0)
    : undefined;
  return {
    city: base.city,
    country: base.country,
    region: base.region,
    timezone: base.timezone,
    latitude: base.latitude,
    longitude: base.longitude,
    utcOffsetMinutes,
    display: [base.city, base.region, base.country].filter(Boolean).join(", "),
  };
}

function countryMatches(item, countryFilter = "") {
  const normalizedFilter = normalizeCountryText(countryFilter);
  if (!normalizedFilter) return true;
  const expandedFilter = COUNTRY_ALIASES[normalizedFilter] || normalizedFilter;
  const haystack = [
    item.country || "",
    item.region || "",
    item.display || "",
  ].map(normalizeCountryText).join(" | ");
  return haystack.includes(expandedFilter) || haystack.includes(normalizedFilter);
}

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`城市解析接口返回 ${response.status}`);
  }
  return response.json();
}

async function fetchOpenMeteoCityRaw(city) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", city);
  url.searchParams.set("count", "1");
  url.searchParams.set("format", "json");
  const data = await fetchJson(url.toString(), {
    headers: {
      "User-Agent": "mingli-app/1.0",
    },
  });
  const first = Array.isArray(data?.results) ? data.results[0] : null;
  if (!first) {
    throw new Error("没找到这个城市。");
  }
  return {
    name: first.name || city,
    country: first.country || "",
    admin1: first.admin1 || "",
    timezone: first.timezone || "",
    latitude: Number(first.latitude),
    longitude: Number(first.longitude),
  };
}

async function fetchOpenMeteoCity(city) {
  let lastError = null;
  for (const candidate of cityQueryVariants(city)) {
    try {
      return await fetchOpenMeteoCityRaw(candidate);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("没找到这个城市。");
}

async function fetchOpenMeteoCitiesRaw(city, count = 6) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", city);
  url.searchParams.set("count", String(Math.max(1, Math.min(10, count))));
  url.searchParams.set("format", "json");
  const data = await fetchJson(url.toString(), {
    headers: {
      "User-Agent": "mingli-app/1.0",
    },
  });
  const list = Array.isArray(data?.results) ? data.results : [];
  if (!list.length) {
    throw new Error("没找到这个城市。");
  }
  return list.map((item) => ({
    city: item.name || city,
    country: item.country || "",
    region: item.admin1 || "",
    timezone: item.timezone || "",
    latitude: Number(item.latitude),
    longitude: Number(item.longitude),
    display: [item.name || city, item.admin1 || "", item.country || ""].filter(Boolean).join(", "),
  }));
}

async function fetchOpenMeteoCities(city, count = 6) {
  let lastError = null;
  for (const candidate of cityQueryVariants(city)) {
    try {
      return await fetchOpenMeteoCitiesRaw(candidate, count);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("没找到这个城市。");
}

function mapNominatimItem(item, fallbackCity) {
  const address = item?.address || {};
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    item?.name ||
    fallbackCity;
  const region = address.state || address.region || address.province || "";
  const country = address.country || "";
  return {
    city,
    country,
    region,
    timezone: "",
    latitude: Number(item.lat),
    longitude: Number(item.lon),
    display: item.display_name || [city, region, country].filter(Boolean).join(", "),
  };
}

async function fetchNominatimCitiesRaw(city, count = 6) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", city);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", String(Math.max(1, Math.min(10, count))));
  const data = await fetchJson(url.toString(), {
    headers: {
      "User-Agent": "mingxian/1.0",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,es;q=0.7",
    },
  });
  if (!Array.isArray(data) || !data.length) {
    throw new Error("没找到这个城市。");
  }
  return data.map((item) => mapNominatimItem(item, city));
}

function dedupeResults(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = [
      String(item.city || "").toLowerCase(),
      String(item.country || "").toLowerCase(),
      Number(item.latitude).toFixed(4),
      Number(item.longitude).toFixed(4),
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchGlobalCities(city, count = 6) {
  const parsed = parseCityInput(city);
  let results = [];
  let lastError = null;
  for (const candidate of cityQueryVariants(parsed.raw)) {
    const settled = await Promise.allSettled([
      fetchOpenMeteoCitiesRaw(candidate, count),
      fetchNominatimCitiesRaw(candidate, count),
    ]);
    for (const item of settled) {
      if (item.status === "fulfilled") {
        results = results.concat(item.value);
      } else {
        lastError = item.reason;
      }
    }
    if (results.length) break;
  }
  const filtered = dedupeResults(results).filter((item) => countryMatches(item, parsed.countryFilter));
  const deduped = (filtered.length ? filtered : dedupeResults(results)).slice(0, Math.max(1, Math.min(10, count)));
  if (!deduped.length) {
    throw lastError || new Error("没找到这个城市。");
  }
  return deduped;
}

async function fetchGlobalCity(city) {
  const results = await fetchGlobalCities(city, 1);
  return results[0];
}

function timezoneOffsetMinutesAt(timezone, year, month, day, hour = 0, minute = 0) {
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(utcDate);
  const pick = (type) => Number(parts.find((item) => item.type === type)?.value || 0);
  const zonedTimestamp = Date.UTC(
    pick("year"),
    pick("month") - 1,
    pick("day"),
    pick("hour"),
    pick("minute"),
    pick("second")
  );
  return Math.round((zonedTimestamp - utcDate.getTime()) / 60000);
}

async function fetchTimezoneByCoordinates(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return { timezone: "", utcOffsetSeconds: undefined };
  }
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("current", "temperature_2m");
  url.searchParams.set("timezone", "auto");
  const data = await fetchJson(url.toString(), {
    headers: {
      "User-Agent": "mingxian/1.0",
    },
  });
  return {
    timezone: String(data?.timezone || ""),
    utcOffsetSeconds: Number.isFinite(Number(data?.utc_offset_seconds)) ? Number(data.utc_offset_seconds) : undefined,
  };
}

async function enrichResultWithTimezone(item, year, month, day) {
  let timezone = String(item.timezone || "");
  let utcOffsetMinutes;
  if (!timezone) {
    try {
      const timezoneMeta = await fetchTimezoneByCoordinates(item.latitude, item.longitude);
      timezone = timezoneMeta.timezone || "";
      if (timezone && year && month && day) {
        utcOffsetMinutes = timezoneOffsetMinutesAt(timezone, year, month, day, 12, 0);
      } else if (Number.isFinite(Number(timezoneMeta.utcOffsetSeconds))) {
        utcOffsetMinutes = Math.round(Number(timezoneMeta.utcOffsetSeconds) / 60);
      }
    } catch {
      utcOffsetMinutes = undefined;
    }
  } else if (year && month && day) {
    utcOffsetMinutes = timezoneOffsetMinutesAt(timezone, year, month, day, 12, 0);
  }
  return {
    city: item.city || item.name || "",
    country: item.country || "",
    region: item.region || item.admin1 || "",
    timezone,
    latitude: item.latitude,
    longitude: item.longitude,
    utcOffsetMinutes,
    display: item.display || [item.city || item.name || "", item.region || item.admin1 || "", item.country || ""].filter(Boolean).join(", "),
  };
}

export async function onRequest(context) {
  try {
    const method = context.request.method.toUpperCase();
    if (method === "OPTIONS") return corsEmpty();
    if (method !== "POST") return json({ ok: false, error: "Method Not Allowed" }, 405);

    const payload = await context.request.json();
    const city = cleanCityQuery(payload.city);
    const count = Number(payload.count) || 1;
    const year = Number(payload.year);
    const month = Number(payload.month);
    const day = Number(payload.day);

    if (!city) return json({ ok: false, error: "城市为空。" }, 400);

    const fallback = fallbackCityResult(city, year, month, day);
    if (fallback) {
      if (count > 1) {
        return json({
          ok: true,
          results: [fallback],
        });
      }
      return json({
        ok: true,
        city: fallback.city,
        country: fallback.country,
        region: fallback.region,
        timezone: fallback.timezone,
        latitude: fallback.latitude,
        longitude: fallback.longitude,
        utcOffsetMinutes: fallback.utcOffsetMinutes,
        display: fallback.display,
      });
    }

    if (count > 1) {
      const baseResults = await fetchGlobalCities(city, count);
      const results = await Promise.all(baseResults.map((item) => enrichResultWithTimezone(item, year, month, day)));
      return json({
        ok: true,
        results,
      });
    }

    const baseResolved = await fetchGlobalCity(city);
    const resolved = await enrichResultWithTimezone(baseResolved, year, month, day);

    return json({
      ok: true,
      city: resolved.city,
      country: resolved.country,
      region: resolved.region,
      timezone: resolved.timezone,
      latitude: resolved.latitude,
      longitude: resolved.longitude,
      utcOffsetMinutes: resolved.utcOffsetMinutes,
      display: resolved.display,
    });
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "城市解析失败。",
    }, 500);
  }
}
