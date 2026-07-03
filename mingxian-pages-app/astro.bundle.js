(() => {
  // astro.js
  var astroName = document.querySelector("#astro-name");
  var astroCity = document.querySelector("#astro-city");
  var astroDate = document.querySelector("#astro-date");
  var astroTime = document.querySelector("#astro-time");
  var astroLat = document.querySelector("#astro-lat");
  var astroLon = document.querySelector("#astro-lon");
  var astroTz = document.querySelector("#astro-tz");
  var astroHouseSystem = document.querySelector("#astro-house-system");
  var astroNodeType = document.querySelector("#astro-node-type");
  var astroLilithType = document.querySelector("#astro-lilith-type");
  var astroRecalc = document.querySelector("#astro-recalc");
  var astroClearNatal = document.querySelector("#astro-clear-natal");
  var astroResolveCity = document.querySelector("#astro-resolve-city");
  var astroCityStatus = document.querySelector("#astro-city-status");
  var astroTransitDate = document.querySelector("#astro-transit-date");
  var astroTransitTime = document.querySelector("#astro-transit-time");
  var astroTransitTz = document.querySelector("#astro-transit-tz");
  var astroTransitCity = document.querySelector("#astro-transit-city");
  var astroResolveTransitCity = document.querySelector("#astro-resolve-transit-city");
  var astroTransitCityStatus = document.querySelector("#astro-transit-city-status");
  var astroTransitCityCandidates = document.querySelector("#astro-transit-city-candidates");
  var astroTransitShift = document.querySelector("#astro-transit-shift");
  var astroTransitShiftReadout = document.querySelector("#astro-transit-shift-readout");
  var astroNow = document.querySelector("#astro-now");
  var astroTransitApply = document.querySelector("#astro-transit-apply");
  var astroWheel = document.querySelector("#astro-wheel");
  var astroNatalSummary = document.querySelector("#astro-natal-summary");
  var astroTransitSummary = document.querySelector("#astro-transit-summary");
  var astroNatalList = document.querySelector("#astro-natal-list");
  var astroTransitList = document.querySelector("#astro-transit-list");
  var astroAspectList = document.querySelector("#astro-aspect-list");
  var astroTransitJudgement = document.querySelector("#astro-transit-judgement");
  var astroHouseNote = document.querySelector("#astro-house-note");
  var astroRuleList = document.querySelector("#astro-rule-list");
  var astroValidationList = document.querySelector("#astro-validation-list");
  var astroValidationNote = document.querySelector("#astro-validation-note");
  var astroCityCandidates = document.querySelector("#astro-city-candidates");
  var astroCopyLink = document.querySelector("#astro-copy-link");
  var astroCopySummary = document.querySelector("#astro-copy-summary");
  var astroSummaryCard = document.querySelector("#astro-summary-card");
  var astroDebugCard = document.querySelector("#astro-debug-card");
  var astroHistoryList = document.querySelector("#astro-history-list");
  var astroHistoryClear = document.querySelector("#astro-history-clear");
  var astroModePill = document.querySelector("#astro-mode-pill");
  var astroModeSwitch = document.querySelector("#astro-mode-switch");
  var astroModeTabs = Array.from(document.querySelectorAll("[data-astro-mode]"));
  var astroNatalSummaryLabel = document.querySelector("#astro-natal-summary-label");
  var astroNatalListLabel = document.querySelector("#astro-natal-list-label");
  var astroParamsLabel = document.querySelector("#astro-params-label");
  var ASTRO_VALIDATION_SAMPLES = [
    { label: "Beijing 1986", diff: 0 },
    { label: "Madrid 1993", diff: 0 },
    { label: "NYC 2001", diff: 0 },
    { label: "Sydney 1979", diff: 0 }
  ];
  var ASTRO_STORAGE_KEY = "mingli-astro-history-v2";
  var ASTRO_API_BASE_KEY = "mingli-astro-api-base";
  var DEFAULT_LIVE_LAT = 41.3874;
  var DEFAULT_LIVE_LON = 2.1686;
  var DEFAULT_LIVE_CITY = "Barcelona";
  var SIGNS = ["\u767D\u7F8A", "\u91D1\u725B", "\u53CC\u5B50", "\u5DE8\u87F9", "\u72EE\u5B50", "\u5904\u5973", "\u5929\u79E4", "\u5929\u874E", "\u5C04\u624B", "\u6469\u7FAF", "\u6C34\u74F6", "\u53CC\u9C7C"];
  var SIGN_GLYPHS = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D", "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653"];
  var PLANET_META = {
    sun: { label: "\u592A\u9633", glyph: "\u2609" },
    moon: { label: "\u6708\u4EAE", glyph: "\u263D" },
    mercury: { label: "\u6C34\u661F", glyph: "\u263F" },
    venus: { label: "\u91D1\u661F", glyph: "\u2640" },
    mars: { label: "\u706B\u661F", glyph: "\u2642" },
    jupiter: { label: "\u6728\u661F", glyph: "\u2643" },
    saturn: { label: "\u571F\u661F", glyph: "\u2644" },
    uranus: { label: "\u5929\u738B", glyph: "\u2645" },
    neptune: { label: "\u6D77\u738B", glyph: "\u2646" },
    pluto: { label: "\u51A5\u738B", glyph: "\u2647" },
    chiron: { label: "\u51EF\u9F99", glyph: "\u26B7" },
    northNode: { label: "\u5317\u4EA4", glyph: "\u260A" },
    southNode: { label: "\u5357\u4EA4", glyph: "\u260B" },
    lilith: { label: "\u8389\u8389\u4E1D", glyph: "Lil" },
    ceres: { label: "\u8C37\u795E", glyph: "\u26B3" },
    pallas: { label: "\u667A\u795E", glyph: "\u26B4" },
    juno: { label: "\u5A5A\u795E", glyph: "\u26B5" },
    vesta: { label: "\u7076\u795E", glyph: "\u26B6" },
    fortune: { label: "\u798F\u70B9", glyph: "PF" },
    ascendant: { label: "\u4E0A\u5347", glyph: "Asc" },
    midheaven: { label: "\u5929\u9876", glyph: "MC" }
  };
  var ASPECT_LABELS = {
    conjunction: { label: "\u5408", color: "#9c7b68", angle: 0, orb: 5 },
    sextile: { label: "\u516D\u5408", color: "#7d8a72", angle: 60, orb: 3.5 },
    square: { label: "\u5211", color: "#a26961", angle: 90, orb: 4.5 },
    trine: { label: "\u62F1", color: "#7a7f9a", angle: 120, orb: 4.5 },
    opposition: { label: "\u51B2", color: "#8c6a53", angle: 180, orb: 5 }
  };
  var astroState = {
    mode: "natal",
    natal: null,
    transit: null,
    showTransit: false,
    cityCandidates: [],
    transitCityCandidates: []
  };
  var natalSuggestTimer = null;
  var transitSuggestTimer = null;
  function getAstroApiBase() {
    const queryValue = new URLSearchParams(window.location.search).get("astroApi");
    if (queryValue) return queryValue.replace(/\/$/, "");
    const saved = localStorage.getItem(ASTRO_API_BASE_KEY);
    if (saved) {
      const normalized = saved.replace(/\/$/, "");
      if (normalized !== "http://127.0.0.1:4318" && normalized !== "http://localhost:4318") {
        return normalized;
      }
    }
    return "https://astro-node-api.onrender.com";
  }
  function setAstroApiBase(value) {
    localStorage.setItem(ASTRO_API_BASE_KEY, String(value || "").replace(/\/$/, ""));
  }
  function parseTzOffset(value) {
    const raw = String(value || "").trim();
    const match = raw.match(/^([+-])(\d{2}):?(\d{2})$/);
    if (!match) return 0;
    const sign = match[1] === "-" ? -1 : 1;
    const hours = Number(match[2]);
    const minutes = Number(match[3]);
    return sign * (hours * 60 + minutes);
  }
  function formatOffsetMinutes(minutes) {
    const sign = minutes < 0 ? "-" : "+";
    const absolute = Math.abs(minutes);
    const hh = String(Math.floor(absolute / 60)).padStart(2, "0");
    const mm = String(absolute % 60).padStart(2, "0");
    return `${sign}${hh}:${mm}`;
  }
  function normalizeAngle(angle) {
    let value = Number(angle) % 360;
    if (value < 0) value += 360;
    return value;
  }
  function angleDistance(a, b) {
    const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b));
    return diff > 180 ? 360 - diff : diff;
  }
  function longitudeToSign(angle) {
    const normalized = normalizeAngle(angle);
    const signIndex = Math.floor(normalized / 30) % 12;
    const degree = normalized - signIndex * 30;
    return {
      signIndex,
      sign: SIGNS[signIndex],
      signShort: SIGN_GLYPHS[signIndex],
      degree
    };
  }
  function formatLongitude(angle) {
    const info = longitudeToSign(angle);
    return `${info.sign} ${info.degree.toFixed(1)}\xB0`;
  }
  function formatDateHuman(date, tzValue) {
    const offset = parseTzOffset(tzValue);
    const localMillis = date.getTime() + offset * 60 * 1e3;
    const local = new Date(localMillis);
    const year = local.getUTCFullYear();
    const month = String(local.getUTCMonth() + 1).padStart(2, "0");
    const day = String(local.getUTCDate()).padStart(2, "0");
    const hour = String(local.getUTCHours()).padStart(2, "0");
    const minute = String(local.getUTCMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute} ${tzValue}`;
  }
  function buildUtcDate(dateValue, timeValue, tzValue) {
    const dateRaw = String(dateValue || "").trim();
    if (!dateRaw) return null;
    const [year, month, day] = dateRaw.split("-").map(Number);
    const [hour, minute] = String(timeValue || "12:00").split(":").map(Number);
    const offsetMinutes = parseTzOffset(tzValue);
    const utcMillis = Date.UTC(year, month - 1, day, hour || 0, minute || 0) - offsetMinutes * 60 * 1e3;
    return new Date(utcMillis);
  }
  function buildLocalDateParts(date, tzValue) {
    const offset = parseTzOffset(tzValue);
    const localMillis = date.getTime() + offset * 6e4;
    const local = new Date(localMillis);
    return {
      year: local.getUTCFullYear(),
      month: local.getUTCMonth() + 1,
      day: local.getUTCDate(),
      hour: local.getUTCHours(),
      minute: local.getUTCMinutes(),
      second: local.getUTCSeconds()
    };
  }
  function buildNowLocalParts(tzValue) {
    return buildLocalDateParts(/* @__PURE__ */ new Date(), tzValue);
  }
  function getAstroHistory() {
    try {
      return JSON.parse(localStorage.getItem(ASTRO_STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }
  function saveAstroHistory(history) {
    localStorage.setItem(ASTRO_STORAGE_KEY, JSON.stringify(history.slice(0, 24)));
  }
  function buildAstroHistoryRecord(natal) {
    return {
      mode: natal.mode,
      name: natal.name,
      city: natal.city,
      date: formatDateHuman(natal.date, natal.tz),
      rawDate: astroDate?.value || "",
      rawTime: astroTime?.value || "",
      lat: Number(natal.lat).toFixed(4),
      lon: Number(natal.lon).toFixed(4),
      tz: natal.tz,
      transitCity: astroTransitCity?.value || "",
      transitDate: astroTransitDate?.value || "",
      transitTime: astroTransitTime?.value || "",
      transitTz: astroTransitTz?.value || "",
      shift: astroTransitShift?.value || "0",
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  function pushAstroHistoryRecord(natal) {
    const history = getAstroHistory();
    const record = buildAstroHistoryRecord(natal);
    const deduped = history.filter((item) => !(item.mode === record.mode && item.name === record.name && item.city === record.city && item.rawDate === record.rawDate && item.rawTime === record.rawTime && item.tz === record.tz));
    deduped.unshift(record);
    saveAstroHistory(deduped);
    renderAstroHistory();
  }
  function renderAstroHistory() {
    if (!astroHistoryList) return;
    const history = getAstroHistory();
    if (!history.length) {
      astroHistoryList.innerHTML = '<div class="astro-empty">\u8FD8\u6CA1\u6709\u3002</div>';
      return;
    }
    astroHistoryList.innerHTML = history.map((item, index) => `
    <div class="astro-history-item">
      <button class="astro-history-open" type="button" data-astro-history-open="${index}">
        ${item.mode === "live" ? "\u5B9E\u65F6\u76D8" : "\u672C\u547D\u76D8"} \xB7 ${item.name || item.city || "\u672A\u547D\u540D"} \xB7 ${item.date}
      </button>
      <button class="astro-history-remove" type="button" data-astro-history-remove="${index}">\u5220</button>
    </div>
  `).join("");
  }
  function applyAstroHistoryRecord(index) {
    const record = getAstroHistory()[index];
    if (!record) return;
    setAstroMode(record.mode === "natal" ? "natal" : "live");
    if (astroName) astroName.value = record.mode === "natal" ? record.name || "" : "";
    if (astroCity) astroCity.value = record.mode === "natal" ? record.city || "" : "";
    if (astroDate) astroDate.value = record.rawDate || "";
    if (astroTime) astroTime.value = record.rawTime || "";
    if (astroLat) astroLat.value = record.mode === "natal" ? String(record.lat || "") : "";
    if (astroLon) astroLon.value = record.mode === "natal" ? String(record.lon || "") : "";
    if (astroTz) astroTz.value = record.mode === "natal" ? record.tz || "" : "";
    if (astroTransitCity) astroTransitCity.value = record.transitCity || "";
    if (astroTransitDate) astroTransitDate.value = record.transitDate || "";
    if (astroTransitTime) astroTransitTime.value = record.transitTime || "";
    if (astroTransitTz) astroTransitTz.value = record.transitTz || "";
    if (astroTransitShift) astroTransitShift.value = record.shift || "0";
    updateShiftReadout();
    recalcAstro();
  }
  function removeAstroHistoryRecord(index) {
    const history = getAstroHistory();
    history.splice(index, 1);
    saveAstroHistory(history);
    renderAstroHistory();
  }
  function hasNatalInputs() {
    return [
      astroName?.value,
      astroCity?.value,
      astroDate?.value,
      astroTime?.value,
      astroLat?.value,
      astroLon?.value,
      astroTz?.value
    ].some((value) => String(value || "").trim() !== "");
  }
  function getAstroMode() {
    return astroState.mode === "natal" ? "natal" : "live";
  }
  function setAstroMode(mode) {
    astroState.mode = mode === "natal" ? "natal" : "live";
    astroModeTabs.forEach((tab) => {
      const isActive = tab.dataset.astroMode === astroState.mode;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }
  function clearNatalInputs() {
    [astroName, astroCity, astroDate, astroTime, astroLat, astroLon, astroTz].forEach((input) => {
      if (input) input.value = "";
    });
    if (astroCityStatus) {
      astroCityStatus.textContent = "\u672C\u547D\u8D44\u6599\u5DF2\u6E05\u7A7A\u3002\u5F53\u524D\u663E\u793A\u5B9E\u65F6\u661F\u76D8\u3002";
    }
    renderCityCandidates([]);
  }
  function getCurrentQueryState() {
    return {
      amode: getAstroMode(),
      name: astroName?.value || "",
      city: astroCity?.value || "",
      date: astroDate?.value || "",
      time: astroTime?.value || "",
      lat: astroLat?.value || "",
      lon: astroLon?.value || "",
      tz: astroTz?.value || "",
      hsys: astroHouseSystem?.value || "P",
      ntype: astroNodeType?.value || "true",
      ltype: astroLilithType?.value || "mean",
      tcity: astroTransitCity?.value || "",
      tdate: astroTransitDate?.value || "",
      ttime: astroTransitTime?.value || "",
      ttz: astroTransitTz?.value || "",
      tshift: astroTransitShift?.value || "0",
      astroApi: getAstroApiBase()
    };
  }
  function writeQueryStateToUrl() {
    const params = new URLSearchParams(window.location.search);
    const state = getCurrentQueryState();
    Object.keys(state).forEach((key) => params.delete(key));
    Object.entries(state).forEach(([key, value]) => {
      if (String(value || "").trim() !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
  }
  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    setAstroMode(params.get("amode") === "natal" ? "natal" : "live");
    const assign = (element, key) => {
      const value = params.get(key);
      if (element && value !== null) element.value = value;
    };
    assign(astroName, "name");
    assign(astroCity, "city");
    assign(astroDate, "date");
    assign(astroTime, "time");
    assign(astroLat, "lat");
    assign(astroLon, "lon");
    assign(astroTz, "tz");
    assign(astroHouseSystem, "hsys");
    assign(astroNodeType, "ntype");
    assign(astroLilithType, "ltype");
    assign(astroTransitCity, "tcity");
    assign(astroTransitDate, "tdate");
    assign(astroTransitTime, "ttime");
    assign(astroTransitTz, "ttz");
    assign(astroTransitShift, "tshift");
    const astroApi = params.get("astroApi");
    if (astroApi) setAstroApiBase(astroApi);
  }
  async function requestGeocodeCandidates(city, options = {}) {
    const payload = { city, count: 6 };
    if (options.year && options.month && options.day) {
      payload.year = options.year;
      payload.month = options.month;
      payload.day = options.day;
    }
    const response = await fetch("/api/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || "\u57CE\u5E02\u89E3\u6790\u5931\u8D25\u3002");
    }
    return Array.isArray(data.results) ? data.results : [];
  }
  function buildChartPayloadFromParts(parts, latitude, longitude, timezone) {
    return {
      year: parts.year,
      month: parts.month,
      day: parts.day,
      hour: parts.hour,
      minute: parts.minute,
      second: parts.second || 0,
      latitude,
      longitude,
      timezone,
      houseSystem: String(astroHouseSystem?.value || "P").trim() || "P",
      nodeType: String(astroNodeType?.value || "true").trim() || "true",
      lilithType: String(astroLilithType?.value || "mean").trim() || "mean"
    };
  }
  async function requestChart(payload) {
    const base = getAstroApiBase();
    const response = await fetch(`${base}/chart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok || !data?.ok || !data?.chart) {
      throw new Error(data?.error || "\u6392\u76D8\u5931\u8D25\u3002");
    }
    setAstroApiBase(base);
    return data.chart;
  }
  function normalizePlanet(planet) {
    const meta = PLANET_META[planet.key] || { label: planet.key, glyph: planet.key };
    const longitude = normalizeAngle(planet.longitude);
    return {
      key: planet.key,
      label: meta.label,
      glyph: meta.glyph,
      longitude,
      latitude: Number(planet.latitude || 0),
      speed: Number(planet.speed || 0),
      signInfo: longitudeToSign(longitude),
      house: Number(planet.house || 0),
      retrograde: Number(planet.speed || 0) < 0
    };
  }
  function buildNatalStateFromChart(mode, chart, context) {
    const date = buildUtcDate(
      `${chart.input.year}-${String(chart.input.month).padStart(2, "0")}-${String(chart.input.day).padStart(2, "0")}`,
      `${String(chart.input.hour).padStart(2, "0")}:${String(chart.input.minute).padStart(2, "0")}`,
      chart.input.timezone
    );
    const houses = chart.houses.map((start, index) => ({
      house: index + 1,
      start: normalizeAngle(start),
      end: normalizeAngle(chart.houses[(index + 1) % chart.houses.length])
    }));
    const planets = chart.planets.map(normalizePlanet);
    return {
      mode,
      name: context.name,
      city: context.city,
      lat: Number(chart.input.latitude),
      lon: Number(chart.input.longitude),
      tz: chart.input.timezone,
      date,
      planets,
      houses,
      angles: {
        asc: normalizeAngle(chart.axes.asc),
        mc: normalizeAngle(chart.axes.mc),
        dsc: normalizeAngle(chart.axes.dsc),
        ic: normalizeAngle(chart.axes.ic)
      },
      rawChart: chart
    };
  }
  function calculateAspects(pointsA, pointsB, sameSet = false) {
    const defs = Object.entries(ASPECT_LABELS).map(([key, config]) => ({ key, ...config }));
    const aspects = [];
    for (let i = 0; i < pointsA.length; i += 1) {
      const a = pointsA[i];
      const startIndex = sameSet ? i + 1 : 0;
      for (let j = startIndex; j < pointsB.length; j += 1) {
        const b = pointsB[j];
        if (sameSet && a.key === b.key) continue;
        const delta = angleDistance(a.longitude, b.longitude);
        for (const def of defs) {
          const orb = Math.abs(delta - def.angle);
          if (orb <= def.orb) {
            aspects.push({
              key: def.key,
              label: def.label,
              color: def.color,
              a,
              b,
              delta,
              orb
            });
            break;
          }
        }
      }
    }
    return aspects.sort((left, right) => left.orb - right.orb);
  }
  async function buildNatalState() {
    const useNatalMode = getAstroMode() === "natal";
    const fallbackTz = String(astroTransitTz?.value || "+02:00").trim() || "+02:00";
    const tz = String(astroTz?.value || "").trim() || (useNatalMode ? "" : fallbackTz);
    const lat = useNatalMode ? Number(astroLat?.value) : Number(astroLat?.value || DEFAULT_LIVE_LAT);
    const lon = useNatalMode ? Number(astroLon?.value) : Number(astroLon?.value || DEFAULT_LIVE_LON);
    if (useNatalMode) {
      if (!hasNatalInputs() || !astroDate?.value || !astroTime?.value || !tz || !Number.isFinite(lat) || !Number.isFinite(lon)) {
        return null;
      }
      const [year, month, day] = astroDate.value.split("-").map(Number);
      const [hour, minute] = astroTime.value.split(":").map(Number);
      const chart2 = await requestChart({
        year,
        month,
        day,
        hour,
        minute,
        second: 0,
        latitude: lat,
        longitude: lon,
        timezone: tz,
        houseSystem: String(astroHouseSystem?.value || "P").trim() || "P",
        nodeType: String(astroNodeType?.value || "true").trim() || "true",
        lilithType: String(astroLilithType?.value || "mean").trim() || "mean"
      });
      return buildNatalStateFromChart("natal", chart2, {
        name: String(astroName?.value || "").trim() || "\u672A\u547D\u540D",
        city: String(astroCity?.value || "").trim() || "\u672A\u586B\u57CE\u5E02"
      });
    }
    if (!tz || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    const parts = buildNowLocalParts(tz);
    const chart = await requestChart(buildChartPayloadFromParts(parts, lat, lon, tz));
    return buildNatalStateFromChart("live", chart, {
      name: "\u5F53\u524D\u5B9E\u65F6\u661F\u76D8",
      city: String(astroTransitCity?.value || "").trim() || DEFAULT_LIVE_CITY
    });
  }
  async function buildTransitState(natal) {
    if (!natal) return null;
    const dateRaw = String(astroTransitDate?.value || "").trim();
    if (!dateRaw) return null;
    const timeRaw = String(astroTransitTime?.value || "12:00").trim() || "12:00";
    const tz = String(astroTransitTz?.value || "+02:00").trim() || "+02:00";
    const baseDate = buildUtcDate(dateRaw, timeRaw, tz);
    if (!baseDate) return null;
    const shiftDays = Number(astroTransitShift?.value || 0);
    const shiftedDate = new Date(baseDate.getTime() + shiftDays * 24 * 3600 * 1e3);
    const parts = buildLocalDateParts(shiftedDate, tz);
    const chart = await requestChart(buildChartPayloadFromParts(parts, natal.lat, natal.lon, tz));
    const planets = chart.planets.map(normalizePlanet);
    const transitAspects = calculateAspects(planets, natal.planets).slice(0, 16);
    return {
      date: shiftedDate,
      tz,
      planets,
      chart,
      aspects: transitAspects,
      shiftDays
    };
  }
  function renderList(target, items, formatter) {
    if (!target) return;
    if (!items.length) {
      target.innerHTML = '<div class="astro-empty">\u5F85\u8BA1\u7B97\u3002</div>';
      return;
    }
    target.innerHTML = items.map(formatter).join("");
  }
  function renderCityCandidates(items = []) {
    if (!astroCityCandidates) return;
    astroCityCandidates.innerHTML = items.length ? items.map((item, index) => `<button class="astro-candidate-item" type="button" data-index="${index}">${item.display}</button>`).join("") : "";
  }
  function renderTransitCityCandidates(items = []) {
    if (!astroTransitCityCandidates) return;
    astroTransitCityCandidates.innerHTML = items.length ? items.map((item, index) => `<button class="astro-candidate-item" type="button" data-transit-index="${index}">${item.display}</button>`).join("") : "";
  }
  function buildSummaryText(natal, transit) {
    const title = natal?.mode === "live" ? "\u5B9E\u65F6\u53C2\u6570" : "\u672C\u547D\u53C2\u6570";
    const natalLine = [
      `\u5BF9\u8C61\uFF1A${natal?.name || "-"}`,
      `${natal?.mode === "live" ? "\u663E\u793A\u5730\u70B9" : "\u51FA\u751F\u57CE\u5E02"}\uFF1A${natal?.city || "-"}`,
      `${natal?.mode === "live" ? "\u76D8\u9762\u65F6\u95F4" : "\u51FA\u751F\u65F6\u95F4"}\uFF1A${natal ? formatDateHuman(natal.date, natal.tz) : "-"}`,
      `\u5750\u6807\uFF1A${Number(natal?.lat || 0).toFixed(4)}, ${Number(natal?.lon || 0).toFixed(4)}`,
      `\u5BAB\u5236\uFF1A${natal?.rawChart?.input?.houseSystem === "W" ? "Whole Sign" : "Placidus"}`,
      `\u5317\u4EA4\u70B9\uFF1A${natal?.rawChart?.input?.nodeType === "mean" ? "Mean Node" : "True Node"}`,
      `\u8389\u8389\u4E1D\uFF1A${natal?.rawChart?.input?.lilithType === "oscu" ? "True Lilith" : "Mean Lilith"}`
    ].join("\n");
    const transitLine = [
      `\u67E5\u8BE2\u57CE\u5E02\uFF1A${astroTransitCity?.value || "-"}`,
      `\u67E5\u8BE2\u65F6\u95F4\uFF1A${transit ? formatDateHuman(transit.date, transit.tz) : "-"}`,
      `\u63A8\u79FB\u5929\u6570\uFF1A${astroTransitShift?.value || "0"} \u5929`
    ].join("\n");
    return [
      title,
      natalLine,
      "",
      "\u884C\u8FD0\u53C2\u6570",
      transitLine,
      "",
      `\u8BA1\u7B97\u6838\u5FC3\uFF1ASwiss Ephemeris / \u70ED\u5E26\u9EC4\u9053 / ${natal?.rawChart?.input?.houseSystem === "W" ? "Whole Sign" : "Placidus"} \u5BAB\u5236 / ${natal?.rawChart?.input?.nodeType === "mean" ? "Mean Node" : "True Node"} / ${natal?.rawChart?.input?.lilithType === "oscu" ? "True Lilith" : "Mean Lilith"}`
    ].join("\n");
  }
  function renderSummaryCard(natal, transit) {
    if (astroSummaryCard) astroSummaryCard.textContent = buildSummaryText(natal, transit);
  }
  function renderDebugCard(natal) {
    if (!astroDebugCard || !natal) return;
    const sun = natal.planets.find((item) => item.key === "sun");
    const moon = natal.planets.find((item) => item.key === "moon");
    const mercury = natal.planets.find((item) => item.key === "mercury");
    const venus = natal.planets.find((item) => item.key === "venus");
    const mars = natal.planets.find((item) => item.key === "mars");
    astroDebugCard.textContent = [
      `\u6A21\u5F0F\uFF1A${natal.mode === "live" ? "\u5B9E\u65F6\u76D8" : "\u672C\u547D\u76D8"}`,
      `\u5BF9\u8C61\uFF1A${natal.name || "-"}`,
      `\u57CE\u5E02\uFF1A${natal.city || "-"}`,
      `\u65F6\u95F4\uFF1A${formatDateHuman(natal.date, natal.tz)}`,
      `\u7EAC\u5EA6\uFF1A${Number(natal.lat).toFixed(4)}`,
      `\u7ECF\u5EA6\uFF1A${Number(natal.lon).toFixed(4)}`,
      `\u65F6\u533A\uFF1A${natal.tz}`,
      `\u592A\u9633\uFF1A${formatLongitude(sun?.longitude)} \xB7 ${Number(sun?.longitude || 0).toFixed(2)}\xB0 \xB7 ${sun?.house || "?"}\u5BAB`,
      `\u6708\u4EAE\uFF1A${formatLongitude(moon?.longitude)} \xB7 ${Number(moon?.longitude || 0).toFixed(2)}\xB0 \xB7 ${moon?.house || "?"}\u5BAB`,
      `\u6C34\u661F\uFF1A${formatLongitude(mercury?.longitude)} \xB7 ${Number(mercury?.longitude || 0).toFixed(2)}\xB0 \xB7 ${mercury?.house || "?"}\u5BAB`,
      `\u91D1\u661F\uFF1A${formatLongitude(venus?.longitude)} \xB7 ${Number(venus?.longitude || 0).toFixed(2)}\xB0 \xB7 ${venus?.house || "?"}\u5BAB`,
      `\u706B\u661F\uFF1A${formatLongitude(mars?.longitude)} \xB7 ${Number(mars?.longitude || 0).toFixed(2)}\xB0 \xB7 ${mars?.house || "?"}\u5BAB`,
      `\u4E0A\u5347\uFF1A${formatLongitude(natal.angles.asc)}`,
      `\u4E0B\u964D\uFF1A${formatLongitude(natal.angles.dsc)}`,
      `\u5929\u9876\uFF1A${formatLongitude(natal.angles.mc)}`,
      `\u5929\u5E95\uFF1A${formatLongitude(natal.angles.ic)}`
    ].join("\n");
  }
  function clearAstroOutputs(message = "\u5F85\u8BA1\u7B97\u3002") {
    if (astroNatalSummary) astroNatalSummary.textContent = message;
    if (astroTransitSummary) astroTransitSummary.textContent = "\u5F85\u8BA1\u7B97\u3002";
    if (astroTransitJudgement) astroTransitJudgement.textContent = "\u5F85\u8BA1\u7B97\u3002";
    if (astroSummaryCard) astroSummaryCard.textContent = "";
    if (astroDebugCard) astroDebugCard.textContent = "";
    if (astroWheel) astroWheel.innerHTML = "";
    renderList(astroNatalList, [], () => "");
    renderList(astroTransitList, [], () => "");
    renderList(astroAspectList, [], () => "");
  }
  function renderModeLabels(natal) {
    const isLive = natal?.mode === "live";
    if (astroModePill) astroModePill.textContent = isLive ? "\u5B9E\u65F6\u76D8" : "\u672C\u547D\u76D8";
    if (astroParamsLabel) astroParamsLabel.textContent = isLive ? "\u5B9E\u65F6\u53C2\u6570" : "\u672C\u547D\u53C2\u6570";
    if (astroNatalSummaryLabel) astroNatalSummaryLabel.textContent = isLive ? "\u5B9E\u65F6\u6458\u8981" : "\u672C\u547D\u6458\u8981";
    if (astroNatalListLabel) astroNatalListLabel.textContent = isLive ? "\u5B9E\u65F6\u843D\u70B9" : "\u672C\u547D\u843D\u70B9";
  }
  function applyResolvedCity(item) {
    if (!item) return;
    if (astroCity) astroCity.value = item.city || item.display || "";
    if (astroLat) astroLat.value = Number(item.latitude).toFixed(4);
    if (astroLon) astroLon.value = Number(item.longitude).toFixed(4);
    if (astroTz && item.utcOffsetMinutes !== void 0 && item.utcOffsetMinutes !== null) {
      astroTz.value = formatOffsetMinutes(Number(item.utcOffsetMinutes));
    }
    if (astroCityStatus) {
      astroCityStatus.textContent = `\u5DF2\u6821\u51C6\uFF1A${item.display || item.city} \xB7 ${Number(item.latitude).toFixed(4)}, ${Number(item.longitude).toFixed(4)} \xB7 ${astroTz?.value || ""}`;
    }
    renderCityCandidates([]);
    recalcAstro();
  }
  function applyResolvedTransitCity(item) {
    if (!item) return;
    if (astroTransitCity) astroTransitCity.value = item.city || item.display || "";
    if (astroTransitTz && item.utcOffsetMinutes !== void 0 && item.utcOffsetMinutes !== null) {
      astroTransitTz.value = formatOffsetMinutes(Number(item.utcOffsetMinutes));
    }
    if (astroTransitCityStatus) {
      astroTransitCityStatus.textContent = `\u5DF2\u6821\u51C6\uFF1A${item.display || item.city} \xB7 ${astroTransitTz?.value || ""}`;
    }
    renderTransitCityCandidates([]);
    recalcAstro();
  }
  function renderWheel(natal, transit) {
    if (!astroWheel || !natal) return;
    const size = 720;
    const cx = size / 2;
    const cy = size / 2;
    const outer = 286;
    const ring = 224;
    const inner = 148;
    function longitudeToSvgAngle(longitude) {
      const relative = normalizeAngle(longitude - natal.angles.asc);
      return (180 + relative) * Math.PI / 180;
    }
    function polarX(angle, radius) {
      return cx + Math.cos(angle) * radius;
    }
    function polarY(angle, radius) {
      return cy - Math.sin(angle) * radius;
    }
    function houseMidpoint(start, end) {
      const span = normalizeAngle(end - start);
      return normalizeAngle(start + span / 2);
    }
    function distributeGlyphs(points, baseRadius, stepRadius) {
      const sorted = points.map((point, index) => ({ ...point, originalIndex: index })).sort((left, right) => left.longitude - right.longitude);
      const placements = new Array(points.length);
      let cluster = [];
      function flushCluster() {
        if (!cluster.length) return;
        cluster.forEach((item, index) => {
          const layer = index % 4;
          const shift = (index - (cluster.length - 1) / 2) * 6;
          placements[item.originalIndex] = {
            angle: longitudeToSvgAngle(normalizeAngle(item.longitude + shift)),
            radius: baseRadius - layer * stepRadius
          };
        });
        cluster = [];
      }
      sorted.forEach((item, index) => {
        if (!cluster.length) {
          cluster.push(item);
          return;
        }
        const prev = sorted[index - 1];
        if (angleDistance(item.longitude, prev.longitude) < 7.5) {
          cluster.push(item);
        } else {
          flushCluster();
          cluster.push(item);
        }
      });
      flushCluster();
      return placements;
    }
    function aspectLine(pointA, pointB, color, radius) {
      const angleA = longitudeToSvgAngle(pointA.longitude);
      const angleB = longitudeToSvgAngle(pointB.longitude);
      return `
      <line
        x1="${polarX(angleA, radius)}"
        y1="${polarY(angleA, radius)}"
        x2="${polarX(angleB, radius)}"
        y2="${polarY(angleB, radius)}"
        stroke="${color}"
        stroke-width="1.2"
        stroke-opacity="0.78"
      />
    `;
    }
    const signMarks = Array.from({ length: 12 }, (_, index) => {
      const startLongitude = index * 30;
      const angle = longitudeToSvgAngle(startLongitude);
      const labelAngle = longitudeToSvgAngle(startLongitude + 15);
      return `
      <line x1="${polarX(angle, ring)}" y1="${polarY(angle, ring)}" x2="${polarX(angle, outer)}" y2="${polarY(angle, outer)}" stroke="rgba(21,21,21,0.11)" stroke-width="1"/>
      <text x="${polarX(labelAngle, outer - 26)}" y="${polarY(labelAngle, outer - 26)}" text-anchor="middle" dominant-baseline="middle" font-size="20" fill="#7a7268">${SIGN_GLYPHS[index]}</text>
    `;
    }).join("");
    const houseMarks = natal.houses.map((house) => {
      const angle = longitudeToSvgAngle(house.start);
      const labelAngle = longitudeToSvgAngle(houseMidpoint(house.start, house.end));
      return `
      <line x1="${polarX(angle, inner)}" y1="${polarY(angle, inner)}" x2="${polarX(angle, ring)}" y2="${polarY(angle, ring)}" stroke="rgba(21,21,21,0.08)" stroke-width="1"/>
      <text x="${polarX(labelAngle, inner + 28)}" y="${polarY(labelAngle, inner + 28)}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#958775">${house.house}</text>
    `;
    }).join("");
    const natalPlacements = distributeGlyphs(natal.planets, 196, 16);
    const natalAspects = calculateAspects(natal.planets, natal.planets, true).slice(0, 24);
    const natalAspectLines = natalAspects.map((aspect) => aspectLine(aspect.a, aspect.b, aspect.color, inner - 10)).join("");
    const natalGlyphs = natal.planets.map((planet, index) => {
      const placement = natalPlacements[index];
      const x = polarX(placement.angle, placement.radius);
      const y = polarY(placement.angle, placement.radius);
      return `
      <g>
        <circle cx="${x}" cy="${y}" r="15" fill="rgba(253,250,245,0.96)" stroke="rgba(122,94,64,0.14)"/>
        <text x="${x}" y="${y + 1}" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="#5e4835">${planet.glyph}</text>
      </g>
    `;
    }).join("");
    const transitPlacements = transit ? distributeGlyphs(transit.planets, 258, 16) : [];
    const transitGlyphs = transit ? transit.planets.map((planet, index) => {
      const placement = transitPlacements[index];
      const x = polarX(placement.angle, placement.radius);
      const y = polarY(placement.angle, placement.radius);
      return `
      <g>
        <circle cx="${x}" cy="${y}" r="13" fill="rgba(104,82,62,0.88)"/>
        <text x="${x}" y="${y + 1}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="#fbf6ef">${planet.glyph}</text>
      </g>
    `;
    }).join("") : "";
    const ascAngle = longitudeToSvgAngle(natal.angles.asc);
    const dscAngle = longitudeToSvgAngle(natal.angles.dsc);
    const mcAngle = longitudeToSvgAngle(natal.angles.mc);
    const icAngle = longitudeToSvgAngle(natal.angles.ic);
    astroWheel.innerHTML = `
    <rect x="0" y="0" width="${size}" height="${size}" fill="transparent"/>
    <circle cx="${cx}" cy="${cy}" r="${outer}" fill="rgba(252,248,241,0.92)" stroke="rgba(122,94,64,0.10)"/>
    <circle cx="${cx}" cy="${cy}" r="${ring}" fill="none" stroke="rgba(122,94,64,0.08)"/>
    <circle cx="${cx}" cy="${cy}" r="${inner}" fill="none" stroke="rgba(122,94,64,0.08)"/>
    ${signMarks}
    ${houseMarks}
    ${natalAspectLines}
    <line x1="${cx}" y1="${cy}" x2="${polarX(ascAngle, outer)}" y2="${polarY(ascAngle, outer)}" stroke="#8c6a53" stroke-width="1.5"/>
    <line x1="${cx}" y1="${cy}" x2="${polarX(dscAngle, outer)}" y2="${polarY(dscAngle, outer)}" stroke="#8c6a53" stroke-width="1.1" stroke-dasharray="5 4"/>
    <line x1="${cx}" y1="${cy}" x2="${polarX(mcAngle, outer)}" y2="${polarY(mcAngle, outer)}" stroke="#706050" stroke-width="1.5"/>
    <line x1="${cx}" y1="${cy}" x2="${polarX(icAngle, outer)}" y2="${polarY(icAngle, outer)}" stroke="#706050" stroke-width="1.1" stroke-dasharray="5 4"/>
    <text x="${polarX(ascAngle, outer + 18)}" y="${polarY(ascAngle, outer + 18)}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#8c6a53">Asc</text>
    <text x="${polarX(dscAngle, outer + 18)}" y="${polarY(dscAngle, outer + 18)}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#8c6a53">Dsc</text>
    <text x="${polarX(mcAngle, outer + 18)}" y="${polarY(mcAngle, outer + 18)}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#706050">MC</text>
    <text x="${polarX(icAngle, outer + 18)}" y="${polarY(icAngle, outer + 18)}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#706050">IC</text>
    ${natalGlyphs}
    ${transitGlyphs}
    <text x="36" y="42" font-size="15" fill="#7a6a59">${natal.mode === "live" ? "\u5185\u5708\u5B9E\u65F6 / \u5916\u5708\u884C\u8FD0" : "\u5185\u5708\u672C\u547D / \u5916\u5708\u884C\u8FD0"}</text>
  `;
  }
  function buildNatalSummary(natal) {
    const sun = natal.planets.find((item) => item.key === "sun");
    const moon = natal.planets.find((item) => item.key === "moon");
    const jupiter = natal.planets.find((item) => item.key === "jupiter");
    const sunText = `${sun?.signInfo?.sign || ""} ${sun?.signInfo?.degree?.toFixed?.(1) || "0.0"}\xB0`;
    const moonText = `${moon?.signInfo?.sign || ""} ${moon?.signInfo?.degree?.toFixed?.(1) || "0.0"}\xB0`;
    const jupiterText = `${jupiter?.signInfo?.sign || ""} ${jupiter?.signInfo?.degree?.toFixed?.(1) || "0.0"}\xB0`;
    if (natal.mode === "live") {
      return `${natal.city} \xB7 ${formatDateHuman(natal.date, natal.tz)}\u3002\u5F53\u524D\u592A\u9633 ${sunText}\uFF0C\u6708\u4EAE ${moonText}\uFF0C\u6728\u661F ${jupiterText}\u3002\u4E0A\u5347 ${formatLongitude(natal.angles.asc)}\uFF0CMC ${formatLongitude(natal.angles.mc)}\u3002`;
    }
    return `${natal.name} \xB7 ${natal.city} \xB7 ${formatDateHuman(natal.date, natal.tz)}\u3002\u592A\u9633 ${sunText}\uFF0C\u6708\u4EAE ${moonText}\uFF0C\u6728\u661F ${jupiterText}\u3002\u4E0A\u5347 ${formatLongitude(natal.angles.asc)}\uFF0CMC ${formatLongitude(natal.angles.mc)}\u3002`;
  }
  function buildTransitSummary(transit) {
    if (!transit) return "\u5F85\u8BA1\u7B97\u3002";
    const heavy = transit.aspects.filter((item) => ["conjunction", "opposition", "square"].includes(item.key)).slice(0, 3);
    const headline = heavy.length ? heavy.map((item) => `${item.a.label}${item.label}${item.b.label}`).join("\u3001") : "\u8FD9\u4E00\u5929\u6CA1\u6709\u7279\u522B\u786C\u7684\u8FC7\u76D8\u9876\u70B9";
    return `${formatDateHuman(transit.date, transit.tz)}\u3002\u5F53\u524D\u6700\u503C\u5F97\u770B\u7684\u8FC7\u76D8\u662F\uFF1A${headline}\u3002`;
  }
  function buildTransitJudgement(transit) {
    if (!transit) return "\u5F85\u8BA1\u7B97\u3002";
    const heavy = transit.aspects.filter((item) => ["conjunction", "opposition", "square"].includes(item.key));
    const supportive = transit.aspects.filter((item) => ["trine", "sextile"].includes(item.key));
    if (heavy.some((item) => item.b.key === "sun" || item.b.key === "moon")) {
      return "\u8FD9\u6BB5\u65F6\u95F4\u66F4\u50CF\u88AB\u786C\u9876\uFF1A\u5173\u7CFB\u3001\u5DE5\u4F5C\u63A8\u8FDB\u3001\u8EAB\u4F53\u8282\u5F8B\u91CC\uFF0C\u81F3\u5C11\u6709\u4E00\u6761\u4F1A\u903C\u4F60\u7ACB\u8FB9\u754C\u3002\u5148\u770B\u54EA\u6761\u7EBF\u6700\u8017\u4F60\u3002";
    }
    if (supportive.some((item) => item.b.key === "jupiter" || item.b.key === "venus")) {
      return "\u8FD9\u6BB5\u65F6\u95F4\u66F4\u50CF\u53EF\u501F\u52BF\uFF1A\u9002\u5408\u63A8\u8FDB\u4F5C\u54C1\u3001\u6C9F\u901A\u3001\u5F00\u53E3\u3001\u8BA9\u4E8B\u60C5\u6D41\u52A8\uFF0C\u4F46\u522B\u628A\u987A\u6ED1\u8BEF\u5224\u6210\u5DF2\u7ECF\u5F7B\u5E95\u7A33\u5B9A\u3002";
    }
    return "\u8FD9\u4E0D\u662F\u7279\u522B\u620F\u5267\u7684\u4E00\u6BB5\uFF0C\u66F4\u50CF\u5E95\u6D41\u5728\u52A8\u3002\u9002\u5408\u89C2\u5BDF\uFF0C\u4E0D\u9002\u5408\u628A\u4EFB\u4F55\u4E00\u4E2A\u6CE2\u52A8\u5938\u5927\u6210\u547D\u8FD0\u7ED3\u8BBA\u3002";
  }
  async function resolveNatalCity() {
    const city = String(astroCity?.value || "").trim();
    const dateRaw = String(astroDate?.value || "").trim();
    if (!city) {
      if (astroCityStatus) astroCityStatus.textContent = "\u5148\u8F93\u5165\u57CE\u5E02\u540D\u3002";
      return;
    }
    if (!dateRaw) {
      if (astroCityStatus) astroCityStatus.textContent = "\u5148\u8F93\u5165\u51FA\u751F\u65E5\u671F\uFF0C\u7CFB\u7EDF\u624D\u80FD\u63A8\u5F53\u5929\u65F6\u533A\u3002";
      return;
    }
    const [year, month, day] = dateRaw.split("-").map(Number);
    if (astroCityStatus) astroCityStatus.textContent = "\u6B63\u5728\u6821\u51C6\u57CE\u5E02\u3001\u7ECF\u7EAC\u5EA6\u548C\u65F6\u533A...";
    try {
      const results = await requestGeocodeCandidates(city, { year, month, day });
      astroState.cityCandidates = results;
      if (results.length === 1) {
        applyResolvedCity(results[0]);
        return;
      }
      renderCityCandidates(results);
      if (astroCityStatus) astroCityStatus.textContent = `\u627E\u5230 ${results.length} \u4E2A\u5019\u9009\u57CE\u5E02\u3002\u8BF7\u70B9\u4E00\u4E2A\u4F60\u8981\u7684\u5730\u70B9\u3002`;
    } catch (error) {
      if (astroCityStatus) astroCityStatus.textContent = error instanceof Error ? error.message : "\u57CE\u5E02\u6821\u51C6\u5931\u8D25\u3002";
    }
  }
  async function suggestNatalCities() {
    const city = String(astroCity?.value || "").trim();
    if (city.length < 2) {
      renderCityCandidates([]);
      return;
    }
    try {
      const dateRaw = String(astroDate?.value || "").trim();
      let results = [];
      if (dateRaw) {
        const [year, month, day] = dateRaw.split("-").map(Number);
        results = await requestGeocodeCandidates(city, { year, month, day });
      } else {
        results = await requestGeocodeCandidates(city);
      }
      astroState.cityCandidates = results;
      renderCityCandidates(results);
    } catch {
      renderCityCandidates([]);
    }
  }
  async function resolveTransitCity() {
    const city = String(astroTransitCity?.value || "").trim();
    const dateRaw = String(astroTransitDate?.value || "").trim();
    if (!city) {
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = "\u5148\u8F93\u5165\u67E5\u8BE2\u57CE\u5E02\u3002";
      return;
    }
    if (!dateRaw) {
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = "\u5148\u8F93\u5165\u67E5\u8BE2\u65E5\u671F\uFF0C\u7CFB\u7EDF\u624D\u80FD\u63A8\u5F53\u5929\u65F6\u533A\u3002";
      return;
    }
    const [year, month, day] = dateRaw.split("-").map(Number);
    if (astroTransitCityStatus) astroTransitCityStatus.textContent = "\u6B63\u5728\u6821\u51C6\u67E5\u8BE2\u5730\u70B9\u548C\u5F53\u5929\u65F6\u533A...";
    try {
      const results = await requestGeocodeCandidates(city, { year, month, day });
      astroState.transitCityCandidates = results;
      if (results.length === 1) {
        applyResolvedTransitCity(results[0]);
        return;
      }
      renderTransitCityCandidates(results);
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = `\u627E\u5230 ${results.length} \u4E2A\u5019\u9009\u5730\u70B9\u3002\u8BF7\u70B9\u4E00\u4E2A\u4F60\u8981\u7684\u5730\u70B9\u3002`;
    } catch (error) {
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = error instanceof Error ? error.message : "\u5730\u70B9\u6821\u51C6\u5931\u8D25\u3002";
    }
  }
  async function suggestTransitCities() {
    const city = String(astroTransitCity?.value || "").trim();
    if (city.length < 2) {
      renderTransitCityCandidates([]);
      return;
    }
    try {
      const dateRaw = String(astroTransitDate?.value || "").trim();
      let results = [];
      if (dateRaw) {
        const [year, month, day] = dateRaw.split("-").map(Number);
        results = await requestGeocodeCandidates(city, { year, month, day });
      } else {
        results = await requestGeocodeCandidates(city);
      }
      astroState.transitCityCandidates = results;
      renderTransitCityCandidates(results);
    } catch {
      renderTransitCityCandidates([]);
    }
  }
  var recalcToken = 0;
  async function recalcAstro() {
    const token = ++recalcToken;
    if (astroValidationNote) astroValidationNote.textContent = "\u6B63\u5728\u7528\u65B0\u5360\u661F\u5F15\u64CE\u6392\u76D8...";
    try {
      const natal = await buildNatalState();
      if (token !== recalcToken) return;
      astroState.natal = natal;
      astroState.transit = astroState.showTransit ? await buildTransitState(natal) : null;
      if (token !== recalcToken) return;
      if (!natal) {
        clearAstroOutputs("\u5F85\u8BA1\u7B97\u3002");
        if (astroHouseNote && getAstroMode() === "natal") {
          astroHouseNote.textContent = "\u8BF7\u5148\u8865\u5168\u51FA\u751F\u65E5\u671F\u3001\u65F6\u95F4\u3001\u7ECF\u7EAC\u5EA6\u4E0E\u65F6\u533A\uFF0C\u6216\u5148\u7528\u57CE\u5E02\u6821\u51C6\u540E\u518D\u6392\u672C\u547D\u76D8\u3002";
        }
        return;
      }
      renderModeLabels(natal);
      if (astroNatalSummary) astroNatalSummary.textContent = buildNatalSummary(natal);
      if (astroTransitSummary) astroTransitSummary.textContent = buildTransitSummary(astroState.transit);
      if (astroTransitJudgement) astroTransitJudgement.textContent = buildTransitJudgement(astroState.transit);
      if (astroHouseNote) {
        astroHouseNote.textContent = natal.mode === "live" ? "\u672C\u547D\u8D44\u6599\u7559\u7A7A\u65F6\uFF0C\u8FD9\u91CC\u663E\u793A\u5F53\u524D\u5B9E\u65F6\u661F\u76D8\uFF1B\u8F93\u5165\u51FA\u751F\u4FE1\u606F\u540E\uFF0C\u518D\u5207\u56DE\u4E2A\u4EBA\u672C\u547D\u76D8\u3002" : "\u5F53\u524D\u7248\u672C\u5DF2\u7ECF\u5207\u5230 Swiss Ephemeris \u65B0\u6838\u5FC3\uFF1B\u4E0A\u5347\u3001\u4E0B\u964D\u3001\u5929\u9876\u3001\u5929\u5E95\u4E0E\u5BAB\u4F4D\u90FD\u4ECE\u65B0\u63A5\u53E3\u76F4\u63A5\u8FD4\u56DE\u3002";
      }
      renderList(astroRuleList, [
        "Swiss Ephemeris",
        "\u70ED\u5E26\u9EC4\u9053",
        "Placidus \u5BAB\u5236",
        "\u8F93\u5165\u65F6\u533A\u76F4\u63A5\u53C2\u4E0E\u8BA1\u7B97"
      ], (item) => `<div class="astro-rule-item">${item}</div>`);
      if (astroValidationNote) {
        astroValidationNote.textContent = `\u5F53\u524D\u63A5\u53E3\uFF1A${getAstroApiBase()}\u3002\u5982\u679C\u8FD9\u91CC\u8FDE\u4E0D\u4E0A\uFF0C\u5360\u661F\u9875\u5C31\u4E0D\u4F1A\u518D\u5077\u5077\u9000\u56DE\u65E7\u5F15\u64CE\u3002`;
      }
      renderList(astroValidationList, ASTRO_VALIDATION_SAMPLES, (item) => `
      <div class="astro-item">
        <span class="astro-item-label">${item.label}</span>
        <span class="astro-item-value">\u5DEE ${item.diff.toFixed(4)}\xB0</span>
      </div>
    `);
      renderList(astroNatalList, natal.planets, (planet) => `
      <div class="astro-item">
        <span class="astro-item-label">${planet.glyph} ${planet.label} \xB7 ${planet.house || "?"}\u5BAB${planet.retrograde ? " \xB7 \u9006\u884C" : ""}</span>
        <span class="astro-item-value">${formatLongitude(planet.longitude)}</span>
      </div>
    `);
      renderList(astroTransitList, astroState.transit?.planets || [], (planet) => `
      <div class="astro-item">
        <span class="astro-item-label">${planet.glyph} ${planet.label}${planet.retrograde ? " \xB7 \u9006\u884C" : ""}</span>
        <span class="astro-item-value">${formatLongitude(planet.longitude)}</span>
      </div>
    `);
      renderList(astroAspectList, astroState.transit?.aspects || [], (aspect) => `
      <div class="astro-item">
        <span class="astro-item-label">${aspect.a.label}${aspect.label}${aspect.b.label}</span>
        <span class="astro-item-value">\u5BB9\u8BB8 ${aspect.orb.toFixed(1)}\xB0</span>
      </div>
    `);
      renderSummaryCard(natal, astroState.transit);
      renderDebugCard(natal);
      renderWheel(natal, astroState.transit);
      pushAstroHistoryRecord(natal);
      writeQueryStateToUrl();
    } catch (error) {
      if (token !== recalcToken) return;
      clearAstroOutputs("\u65B0\u5360\u661F\u5F15\u64CE\u6682\u65F6\u672A\u8FDE\u901A\u3002");
      if (astroValidationNote) {
        astroValidationNote.textContent = error instanceof Error ? error.message : "\u6392\u76D8\u5931\u8D25\u3002";
      }
      if (astroHouseNote) {
        astroHouseNote.textContent = `\u8BF7\u5148\u542F\u52A8\u672C\u673A\u5360\u661F\u63A5\u53E3\uFF1A${getAstroApiBase()}`;
      }
    }
  }
  window.__mingxianRecalcAstro = recalcAstro;
  function fillTransitNow(force = false) {
    if (!force && astroTransitDate?.value && astroTransitTime?.value) return;
    const tz = String(astroTransitTz?.value || "+02:00").trim() || "+02:00";
    const now = buildNowLocalParts(tz);
    if (astroTransitDate) {
      astroTransitDate.value = `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;
    }
    if (astroTransitTime) {
      astroTransitTime.value = `${String(now.hour).padStart(2, "0")}:${String(now.minute).padStart(2, "0")}`;
    }
  }
  function updateShiftReadout() {
    if (!astroTransitShiftReadout || !astroTransitShift) return;
    const value = Number(astroTransitShift.value || 0);
    astroTransitShiftReadout.textContent = `${value >= 0 ? "+" : ""}${value} \u5929`;
  }
  if (astroTransitShift) {
    astroTransitShift.addEventListener("input", () => {
      updateShiftReadout();
      astroState.showTransit = true;
      recalcAstro();
    });
  }
  if (astroRecalc) {
    astroRecalc.addEventListener("click", async () => {
      if (hasNatalInputs()) {
        setAstroMode("natal");
        astroState.showTransit = true;
        const needsResolve = astroCity?.value && astroDate?.value && (!astroLat?.value || !astroLon?.value || !astroTz?.value);
        if (needsResolve) {
          await resolveNatalCity();
          return;
        }
      }
      recalcAstro();
    });
  }
  if (astroHistoryList) {
    astroHistoryList.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-astro-history-open]");
      if (openButton) {
        applyAstroHistoryRecord(Number(openButton.getAttribute("data-astro-history-open")));
        return;
      }
      const removeButton = event.target.closest("[data-astro-history-remove]");
      if (removeButton) {
        removeAstroHistoryRecord(Number(removeButton.getAttribute("data-astro-history-remove")));
      }
    });
  }
  if (astroHistoryClear) {
    astroHistoryClear.addEventListener("click", () => {
      saveAstroHistory([]);
      renderAstroHistory();
    });
  }
  if (astroClearNatal) {
    astroClearNatal.addEventListener("click", () => {
      clearNatalInputs();
      setAstroMode("live");
      astroState.showTransit = false;
      recalcAstro();
    });
  }
  if (astroModeSwitch) {
    astroModeSwitch.addEventListener("click", (event) => {
      const button = event.target.closest("[data-astro-mode]");
      if (!button) return;
      setAstroMode(button.dataset.astroMode);
      recalcAstro();
    });
  }
  if (astroResolveCity) astroResolveCity.addEventListener("click", resolveNatalCity);
  if (astroResolveTransitCity) astroResolveTransitCity.addEventListener("click", resolveTransitCity);
  if (astroTransitApply) {
    astroTransitApply.addEventListener("click", () => {
      astroState.showTransit = true;
      recalcAstro();
    });
  }
  if (astroCityCandidates) {
    astroCityCandidates.addEventListener("click", (event) => {
      const button = event.target.closest("[data-index]");
      if (!button) return;
      applyResolvedCity(astroState.cityCandidates[Number(button.getAttribute("data-index"))]);
    });
  }
  if (astroTransitCityCandidates) {
    astroTransitCityCandidates.addEventListener("click", (event) => {
      const button = event.target.closest("[data-transit-index]");
      if (!button) return;
      applyResolvedTransitCity(astroState.transitCityCandidates[Number(button.getAttribute("data-transit-index"))]);
    });
  }
  if (astroNow) {
    astroNow.addEventListener("click", () => {
      fillTransitNow(true);
      astroState.showTransit = true;
      recalcAstro();
    });
  }
  if (astroCity) {
    astroCity.addEventListener("input", () => {
      if (natalSuggestTimer) window.clearTimeout(natalSuggestTimer);
      natalSuggestTimer = window.setTimeout(suggestNatalCities, 260);
    });
  }
  if (astroTransitCity) {
    astroTransitCity.addEventListener("input", () => {
      if (transitSuggestTimer) window.clearTimeout(transitSuggestTimer);
      transitSuggestTimer = window.setTimeout(suggestTransitCities, 260);
    });
  }
  if (astroCopyLink) {
    astroCopyLink.addEventListener("click", async () => {
      writeQueryStateToUrl();
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (astroValidationNote) astroValidationNote.textContent = "\u5206\u4EAB\u94FE\u63A5\u5DF2\u590D\u5236\u3002";
      } catch {
        if (astroValidationNote) astroValidationNote.textContent = "\u590D\u5236\u5931\u8D25\u4E86\uFF0C\u4F46\u5730\u5740\u680F\u5DF2\u66F4\u65B0\u3002";
      }
    });
  }
  if (astroCopySummary) {
    astroCopySummary.addEventListener("click", async () => {
      const text = buildSummaryText(astroState.natal, astroState.transit);
      try {
        await navigator.clipboard.writeText(text);
        if (astroValidationNote) astroValidationNote.textContent = "\u53C2\u6570\u6458\u8981\u5DF2\u590D\u5236\u3002";
      } catch {
        if (astroValidationNote) astroValidationNote.textContent = "\u590D\u5236\u6458\u8981\u5931\u8D25\u4E86\u3002";
      }
    });
  }
  [astroDate, astroTime, astroLat, astroLon, astroTz, astroTransitDate, astroTransitTime, astroTransitTz].forEach((input) => {
    if (!input) return;
    input.addEventListener("change", recalcAstro);
  });
  hydrateFromUrl();
  if (!new URLSearchParams(window.location.search).has("amode")) {
    setAstroMode("natal");
  }
  fillTransitNow();
  updateShiftReadout();
  renderAstroHistory();
  recalcAstro();
})();
