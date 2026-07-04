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
  var astroPointSet = document.querySelector("#astro-point-set");
  var astroAspectMode = document.querySelector("#astro-aspect-mode");
  var astroOrbScale = document.querySelector("#astro-orb-scale");
  var astroWheelLayer = document.querySelector("#astro-wheel-layer");
  var astroAspectLines = document.querySelector("#astro-aspect-lines");
  var astroPresets = document.querySelector("#astro-presets");
  var astroPointToggles = document.querySelector("#astro-point-toggles");
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
  var astroWheelWrap = document.querySelector(".astro-wheel-wrap");
  var astroExportImage = document.querySelector("#astro-export-image");
  var astroWheelLegend = document.querySelector("#astro-wheel-legend");
  var astroWheelFocus = document.querySelector("#astro-wheel-focus");
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
  var astroWheelDiagnostics = document.querySelector("#astro-wheel-diagnostics");
  var ASTRO_VALIDATION_SAMPLES = [
    { label: "Beijing 1986", diff: 0 },
    { label: "Madrid 1993", diff: 0 },
    { label: "NYC 2001", diff: 0 },
    { label: "Sydney 1979", diff: 0 }
  ];
  var ASTRO_STORAGE_KEY = "mingli-astro-history-v2";
  var ASTRO_API_BASE_KEY = "mingli-astro-api-base";
  var ASTRO_UI_PREFS_KEY = "mingli-astro-ui-prefs-v1";
  var DEFAULT_LIVE_LAT = 41.3874;
  var DEFAULT_LIVE_LON = 2.1686;
  var DEFAULT_LIVE_CITY = "Barcelona";
  var SIGNS = ["\u767D\u7F8A", "\u91D1\u725B", "\u53CC\u5B50", "\u5DE8\u87F9", "\u72EE\u5B50", "\u5904\u5973", "\u5929\u79E4", "\u5929\u874E", "\u5C04\u624B", "\u6469\u7FAF", "\u6C34\u74F6", "\u53CC\u9C7C"];
  var SIGN_GLYPHS = ["Ar", "Ta", "Ge", "Cn", "Le", "Vi", "Li", "Sc", "Sg", "Cp", "Aq", "Pi"];
  var SIGN_SYMBOLS = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D", "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653"];
  var SIGN_MARKS = Array.from({ length: 12 }, (_, index) => ({ index }));
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
    vertex: { label: "Vertex", glyph: "Vx" },
    antiVertex: { label: "Anti-Vx", glyph: "AVx" },
    eastPoint: { label: "East Point", glyph: "EP" },
    ascendant: { label: "\u4E0A\u5347", glyph: "Asc" },
    descendant: { label: "\u4E0B\u964D", glyph: "Dsc" },
    midheaven: { label: "\u5929\u9876", glyph: "MC" },
    imumCoeli: { label: "\u5929\u5E95", glyph: "IC" }
  };
  var CORE_POINT_KEYS = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron", "northNode", "southNode", "ascendant", "midheaven"];
  var ADVANCED_POINT_KEYS = ["chiron", "northNode", "southNode", "lilith", "fortune", "vertex", "antiVertex", "eastPoint", "ceres", "pallas", "juno", "vesta"];
  var ASPECT_LABELS = {
    conjunction: { label: "\u5408", color: "#8ea0b8", angle: 0, orb: 5 },
    semisextile: { label: "\u534A\u516D\u5408", color: "#98d8c4", angle: 30, orb: 2 },
    semisquare: { label: "\u534A\u5211", color: "#ff8f8f", angle: 45, orb: 2 },
    sextile: { label: "\u516D\u5408", color: "#39d6a3", angle: 60, orb: 3.5 },
    square: { label: "\u5211", color: "#ff5d5d", angle: 90, orb: 4.5 },
    trine: { label: "\u62F1", color: "#4b6bff", angle: 120, orb: 4.5 },
    sesquiquadrate: { label: "\u500D\u534A\u5211", color: "#ff8f8f", angle: 135, orb: 2 },
    quincunx: { label: "\u6885\u82B1", color: "#59d7bb", angle: 150, orb: 2.5 },
    opposition: { label: "\u51B2", color: "#ff4d4d", angle: 180, orb: 5 }
  };
  var MAJOR_ASPECT_KEYS = ["conjunction", "sextile", "square", "trine", "opposition"];
  var astroState = {
    mode: "natal",
    natal: null,
    transit: null,
    showTransit: false,
    cityCandidates: [],
    transitCityCandidates: [],
    visiblePointKeys: [],
    focusedPoint: null,
    focusedAspect: null
  };
  function loadUiPrefs() {
    try {
      return JSON.parse(localStorage.getItem(ASTRO_UI_PREFS_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function saveUiPrefs() {
    const prefs = {
      visiblePointKeys: astroState.visiblePointKeys,
      wheelLayer: astroWheelLayer?.value || "both",
      aspectLines: astroAspectLines?.value || "on",
      pointSet: astroPointSet?.value || "core",
      aspectMode: astroAspectMode?.value || "major",
      orbScale: astroOrbScale?.value || "1"
    };
    localStorage.setItem(ASTRO_UI_PREFS_KEY, JSON.stringify(prefs));
  }
  function applyPreset(name) {
    const preset = String(name || "").trim();
    if (preset === "simple") {
      if (astroPointSet) astroPointSet.value = "core";
      if (astroAspectMode) astroAspectMode.value = "major";
      if (astroOrbScale) astroOrbScale.value = "1";
      if (astroWheelLayer) astroWheelLayer.value = "both";
      if (astroAspectLines) astroAspectLines.value = "on";
    } else if (preset === "pro") {
      if (astroPointSet) astroPointSet.value = "advanced";
      if (astroAspectMode) astroAspectMode.value = "major";
      if (astroOrbScale) astroOrbScale.value = "1";
      if (astroWheelLayer) astroWheelLayer.value = "both";
      if (astroAspectLines) astroAspectLines.value = "on";
    } else if (preset === "asteroids") {
      if (astroPointSet) astroPointSet.value = "all";
      if (astroAspectMode) astroAspectMode.value = "major";
      if (astroOrbScale) astroOrbScale.value = "0.75";
      if (astroWheelLayer) astroWheelLayer.value = "both";
      if (astroAspectLines) astroAspectLines.value = "off";
    }
    astroState.visiblePointKeys = [];
    saveUiPrefs();
    recalcAstro();
  }
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
  function modernPlanetColor(key) {
    const palette = {
      sun: "#ff5a52",
      moon: "#2b7cff",
      mercury: "#41d4a8",
      venus: "#d88b3e",
      mars: "#ff5a52",
      jupiter: "#ff6a5f",
      saturn: "#c49454",
      uranus: "#3dd7b1",
      neptune: "#2f8cff",
      pluto: "#0f7eea",
      northNode: "#4cc9f0",
      southNode: "#8ecae6",
      lilith: "#5b4d41",
      chiron: "#8a6b57"
    };
    return palette[key] || "#58616d";
  }
  function signUiColor(index) {
    const palette = [
      "#ff655b",
      "#d48a39",
      "#32c98e",
      "#2392ff",
      "#ff5f57",
      "#d99345",
      "#42c7ad",
      "#0e87f0",
      "#d38b40",
      "#c58b4a",
      "#35c6a5",
      "#2c86ff"
    ];
    return palette[index % palette.length];
  }
  function houseUiColor(house) {
    const palette = {
      1: "#ef6a62",
      2: "#ca8b48",
      3: "#38b98b",
      4: "#3b86ea",
      5: "#ef6a62",
      6: "#ca8b48",
      7: "#38b98b",
      8: "#3b86ea",
      9: "#ef6a62",
      10: "#ca8b48",
      11: "#38b98b",
      12: "#3b86ea"
    };
    return palette[house] || "#8ea0bf";
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
      hsys: astroHouseSystem?.value || "W",
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
      houseSystem: String(astroHouseSystem?.value || "W").trim() || "W",
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
  function selectedPointSet() {
    return String(astroPointSet?.value || "core").trim() || "core";
  }
  function selectedAspectMode() {
    return String(astroAspectMode?.value || "major").trim() || "major";
  }
  function selectedOrbScale() {
    const value = Number(astroOrbScale?.value || 1);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }
  function selectedWheelLayer() {
    return String(astroWheelLayer?.value || "both").trim() || "both";
  }
  function showAspectLines() {
    return String(astroAspectLines?.value || "on").trim() !== "off";
  }
  function ensureVisiblePointKeys(points = []) {
    if (!astroState.visiblePointKeys.length) {
      astroState.visiblePointKeys = points.map((item) => item.key);
    }
    if (points.some((item) => item.key === "sun") && !astroState.visiblePointKeys.includes("sun")) {
      astroState.visiblePointKeys = ["sun", ...astroState.visiblePointKeys];
    }
  }
  function renderPointToggles(points = []) {
    if (!astroPointToggles) return;
    ensureVisiblePointKeys(points);
    astroPointToggles.innerHTML = points.map((item) => {
      const active = astroState.visiblePointKeys.includes(item.key);
      return `<button class="chip${active ? " active" : ""}" type="button" data-point-key="${item.key}">${item.glyph} ${item.label}</button>`;
    }).join("");
  }
  function renderWheelLegend() {
    if (!astroWheelLegend) return;
    astroWheelLegend.innerHTML = [
      `<div class="astro-item"><span class="astro-item-label">内圈</span><span class="astro-item-value">本命点位</span></div>`,
      `<div class="astro-item"><span class="astro-item-label">外圈</span><span class="astro-item-value">行运点位</span></div>`,
      `<div class="astro-item"><span class="astro-item-label">实线</span><span class="astro-item-value">本命内部相位</span></div>`,
      `<div class="astro-item"><span class="astro-item-label">虚线</span><span class="astro-item-value">行运对本命相位</span></div>`
    ].join("");
  }
  function renderFocusedPoint() {
    if (!astroWheelFocus) return;
    const point = astroState.focusedPoint;
    if (!point) {
      astroWheelFocus.textContent = "\u70B9\u8F6E\u76D8\u91CC\u7684\u4EFB\u4E00\u70B9\u4F4D\uFF0C\u67E5\u770B\u8BE6\u7EC6\u8BF4\u660E\u3002";
      return;
    }
    astroWheelFocus.textContent = [
      `${point.glyph} ${point.label}`,
      `\u843D\u70B9\uFF1A${formatLongitude(point.longitude)}`,
      point.house ? `\u5BAB\u4F4D\uFF1A${point.house}\u5BAB` : "\u5BAB\u4F4D\uFF1A-",
      `\u987A\u9006\uFF1A${point.retrograde ? "\u9006\u884C" : "\u987A\u884C/\u865A\u70B9"}`,
      `\u7ECF\u5EA6\uFF1A${Number(point.longitude).toFixed(2)}\xB0`
    ].join("\n");
  }
  function isFocusedAspect(aspect) {
    if (astroState.focusedAspect) {
      return astroState.focusedAspect.a === aspect.a.key && astroState.focusedAspect.b === aspect.b.key && astroState.focusedAspect.key === aspect.key;
    }
    const point = astroState.focusedPoint;
    if (!point) return false;
    return aspect.a.key === point.key || aspect.b.key === point.key;
  }
  function exportWheelImage() {
    if (!astroWheel) return;
    const serializer = new XMLSerializer();
    const svgText = serializer.serializeToString(astroWheel);
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mingxian-astrology-chart.svg";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
  function bindWheelInteraction() {
    if (!astroWheel || astroWheel.dataset.bound === "1") return;
    astroWheel.dataset.bound = "1";
    astroWheel.addEventListener("click", (event) => {
      const group = event.target.closest("[data-wheel-point]");
      if (!group) return;
      const key = String(group.getAttribute("data-wheel-point") || "");
      const scope = String(group.getAttribute("data-wheel-scope") || "natal");
      const source = scope === "transit" ? astroState.transit?.planets || [] : astroState.natal?.planets || [];
      astroState.focusedPoint = source.find((item) => item.key === key) || null;
      astroState.focusedAspect = null;
      renderFocusedPoint();
      renderWheel(astroState.natal, astroState.transit);
    });
  }
  function filterPoints(points) {
    const mode = selectedPointSet();
    let filtered = points;
    if (mode === "core") {
      filtered = points.filter((item) => CORE_POINT_KEYS.includes(item.key));
    } else if (mode === "advanced") {
      filtered = points.filter((item) => CORE_POINT_KEYS.includes(item.key) || ADVANCED_POINT_KEYS.includes(item.key));
    }
    ensureVisiblePointKeys(filtered);
    const visible = new Set(astroState.visiblePointKeys);
    visible.add("sun");
    return filtered.filter((item) => visible.has(item.key));
  }
  function filterAspectsByMode(aspects) {
    const mode = selectedAspectMode();
    if (mode === "all") return aspects;
    if (mode === "major") return aspects.filter((item) => MAJOR_ASPECT_KEYS.includes(item.key));
    if (mode === "hard") return aspects.filter((item) => ["conjunction", "square", "opposition"].includes(item.key));
    if (mode === "soft") return aspects.filter((item) => ["trine", "sextile"].includes(item.key));
    return aspects;
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
    planets.push(
      {
        key: "vertex",
        label: PLANET_META.vertex.label,
        glyph: PLANET_META.vertex.glyph,
        longitude: normalizeAngle(chart.axes.vertex),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(chart.axes.vertex)),
        house: 0,
        retrograde: false
      },
      {
        key: "antiVertex",
        label: PLANET_META.antiVertex.label,
        glyph: PLANET_META.antiVertex.glyph,
        longitude: normalizeAngle(chart.axes.vertex + 180),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(chart.axes.vertex + 180)),
        house: 0,
        retrograde: false
      },
      {
        key: "eastPoint",
        label: PLANET_META.eastPoint.label,
        glyph: PLANET_META.eastPoint.glyph,
        longitude: normalizeAngle(chart.axes.equAsc),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(chart.axes.equAsc)),
        house: 0,
        retrograde: false
      }
    );
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
    const orbScale = selectedOrbScale();
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
          if (orb <= def.orb * orbScale) {
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
  function buildAngleAspectPoints(natal) {
    if (!natal?.angles) return [];
    return [
      {
        key: "ascendant",
        label: PLANET_META.ascendant.label,
        glyph: PLANET_META.ascendant.glyph,
        longitude: normalizeAngle(natal.angles.asc),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(natal.angles.asc)),
        house: 1,
        retrograde: false
      },
      {
        key: "descendant",
        label: PLANET_META.descendant.label,
        glyph: PLANET_META.descendant.glyph,
        longitude: normalizeAngle(natal.angles.dsc),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(natal.angles.dsc)),
        house: 7,
        retrograde: false
      },
      {
        key: "midheaven",
        label: PLANET_META.midheaven.label,
        glyph: PLANET_META.midheaven.glyph,
        longitude: normalizeAngle(natal.angles.mc),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(natal.angles.mc)),
        house: 10,
        retrograde: false
      },
      {
        key: "imumCoeli",
        label: PLANET_META.imumCoeli.label,
        glyph: PLANET_META.imumCoeli.glyph,
        longitude: normalizeAngle(natal.angles.ic),
        latitude: 0,
        speed: 0,
        signInfo: longitudeToSign(normalizeAngle(natal.angles.ic)),
        house: 4,
        retrograde: false
      }
    ];
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
        houseSystem: String(astroHouseSystem?.value || "W").trim() || "W",
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
    const transitAspectTargets = [
      ...filterPoints(natal.planets),
      ...buildAngleAspectPoints(natal)
    ];
    const transitAspects = filterAspectsByMode(calculateAspects(filterPoints(planets), transitAspectTargets)).slice(0, 24);
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
  function renderWheelDiagnostics(lines) {
    if (!astroWheelDiagnostics) return;
    astroWheelDiagnostics.textContent = Array.isArray(lines) ? lines.join("\n") : String(lines || "");
  }
  function clearAstroOutputs(message = "\u5F85\u8BA1\u7B97\u3002") {
    if (astroNatalSummary) astroNatalSummary.textContent = message;
    if (astroTransitSummary) astroTransitSummary.textContent = "\u5F85\u8BA1\u7B97\u3002";
    if (astroTransitJudgement) astroTransitJudgement.textContent = "\u5F85\u8BA1\u7B97\u3002";
    if (astroSummaryCard) astroSummaryCard.textContent = "";
    if (astroDebugCard) astroDebugCard.textContent = "";
    if (astroWheelWrap) {
      astroWheelWrap.innerHTML = `<svg id="astro-wheel" viewBox="0 0 720 720" preserveAspectRatio="xMidYMid meet" role="img" aria-label="本命与行运占星轮盘"><rect x="0" y="0" width="720" height="720" fill="rgba(251,247,240,0.92)"/><text x="360" y="332" text-anchor="middle" font-size="24" fill="#5b4636">当前没有可显示的轮盘</text><text x="360" y="372" text-anchor="middle" font-size="15" fill="#7c6856">${message}</text></svg>`;
      astroWheel = document.querySelector("#astro-wheel");
      bindWheelInteraction();
    } else if (astroWheel) {
      astroWheel.innerHTML = "";
    }
    renderList(astroNatalList, [], () => "");
    renderList(astroTransitList, [], () => "");
    renderList(astroAspectList, [], () => "");
    renderWheelDiagnostics([
      "wheel: cleared",
      `hasWrap: ${astroWheelWrap ? "yes" : "no"}`,
      `hasSvg: ${astroWheel ? "yes" : "no"}`
    ]);
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
    const svgAttrs = `id="astro-wheel" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="本命与行运占星轮盘" width="${size}" height="${size}"`;
    const cx = size / 2;
    const cy = size / 2;
    const outer = 286;
    const signInner = 238;
    const houseInner = 210;
    const centerField = 178;
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
    function zodiacBadge(x, y, index) {
      const stroke = signUiColor(index);
      const symbol = SIGN_SYMBOLS[index] || "";
      return `<text x="${x}" y="${y + 0.7}" text-anchor="middle" dominant-baseline="middle" font-size="25" font-weight="500" font-family="'DejaVu Sans','Noto Sans Symbols 2','Segoe UI Symbol','Arial Unicode MS',sans-serif" fill="${stroke}" fill-opacity="0.96">${symbol}</text>`;
    }
    function renderPlanetGlyph(planet, x, y, fontSize, color) {
      if (planet.key === "sun") {
        return `<text x="${x}" y="${y + 0.8}" text-anchor="middle" dominant-baseline="middle" font-size="${fontSize}" font-weight="700" fill="${color}" stroke="rgba(255,255,255,0.96)" stroke-width="3.4" paint-order="stroke fill" font-family="'DejaVu Sans','Noto Sans Symbols 2','Segoe UI Symbol','Arial Unicode MS',sans-serif">☉</text>`;
      }
      return `<text x="${x}" y="${y + 0.6}" text-anchor="middle" dominant-baseline="middle" font-size="${fontSize}" fill="${color}">${planet.glyph}</text>`;
    }
    function houseMidpoint(start, end) {
      const span = normalizeAngle(end - start);
      return normalizeAngle(start + span / 2);
    }
    function distributeGlyphs(points, glyphRadii, anchorRadius) {
      const sorted = points.map((point, index) => ({ ...point, originalIndex: index })).sort((left, right) => left.longitude - right.longitude);
      const placements = new Array(points.length);
      let cluster = [];
      function flushCluster() {
        if (!cluster.length) return;
        cluster.forEach((item, index) => {
          const layer = index % glyphRadii.length;
          const shift = (index - (cluster.length - 1) / 2) * 7.4;
          placements[item.originalIndex] = {
            angle: longitudeToSvgAngle(normalizeAngle(item.longitude + shift)),
            radius: glyphRadii[layer],
            anchorAngle: longitudeToSvgAngle(item.longitude),
            anchorRadius
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
        if (angleDistance(item.longitude, prev.longitude) < 8.5) {
          cluster.push(item);
        } else {
          flushCluster();
          cluster.push(item);
        }
      });
      flushCluster();
      return placements;
    }
    function aspectLine(pointA, pointB, color, radius, highlighted = false) {
      const angleA = longitudeToSvgAngle(pointA.longitude);
      const angleB = longitudeToSvgAngle(pointB.longitude);
      return `
      <line
        x1="${polarX(angleA, radius)}"
        y1="${polarY(angleA, radius)}"
        x2="${polarX(angleB, radius)}"
        y2="${polarY(angleB, radius)}"
        stroke="${color}"
        stroke-width="${highlighted ? 1.85 : 0.92}"
        stroke-opacity="${highlighted ? 0.9 : 0.46}"
      />
    `;
    }
    const signMarks = Array.from({ length: 12 }, (_, index) => {
      const startLongitude = index * 30;
      const angle = longitudeToSvgAngle(startLongitude);
      const labelAngle = longitudeToSvgAngle(startLongitude + 15);
      const lx = polarX(labelAngle, (outer + signInner) / 2);
      const ly = polarY(labelAngle, (outer + signInner) / 2);
      return `
      <line x1="${polarX(angle, signInner)}" y1="${polarY(angle, signInner)}" x2="${polarX(angle, outer)}" y2="${polarY(angle, outer)}" stroke="rgba(120,124,132,0.18)" stroke-width="0.95"/>
      ${zodiacBadge(lx, ly, index)}
    `;
    }).join("");
    const minorTicks = Array.from({ length: 72 }, (_, index) => {
      const longitude = index * 5;
      const angle = longitudeToSvgAngle(longitude);
      const isMajor = index % 6 === 0;
      const r1 = outer - (isMajor ? 10 : 5);
      const r2 = outer - 1;
      return `<line x1="${polarX(angle, r1)}" y1="${polarY(angle, r1)}" x2="${polarX(angle, r2)}" y2="${polarY(angle, r2)}" stroke="rgba(130,136,146,${isMajor ? "0.22" : "0.08"})" stroke-width="${isMajor ? "0.95" : "0.62"}"/>`;
    }).join("");
    const degreeLabels = Array.from({ length: 36 }, (_, index) => {
      const longitude = index * 10;
      const angle = longitudeToSvgAngle(longitude);
      const label = String(longitude % 30).padStart(2, "0");
      return `
      <text x="${polarX(angle, outer - 19)}" y="${polarY(angle, outer - 19)}" text-anchor="middle" dominant-baseline="middle" font-size="6.6" letter-spacing="0.02em" fill="rgba(124,130,138,0.46)">${label}</text>
    `;
    }).join("");
    const houseMarks = natal.houses.map((house) => {
      const angle = longitudeToSvgAngle(house.start);
      const labelAngle = longitudeToSvgAngle(houseMidpoint(house.start, house.end));
      const houseNumberRadius = (houseInner + centerField) / 2;
      return `
      <line x1="${polarX(angle, centerField)}" y1="${polarY(angle, centerField)}" x2="${polarX(angle, signInner)}" y2="${polarY(angle, signInner)}" stroke="rgba(150,154,162,0.24)" stroke-width="0.9"/>
      <line x1="${polarX(angle, houseInner - 6)}" y1="${polarY(angle, houseInner - 6)}" x2="${polarX(angle, houseInner + 6)}" y2="${polarY(angle, houseInner + 6)}" stroke="rgba(138,142,150,0.18)" stroke-width="0.95" stroke-linecap="round"/>
      <text x="${polarX(labelAngle, houseNumberRadius)}" y="${polarY(labelAngle, houseNumberRadius)}" text-anchor="middle" dominant-baseline="middle" font-size="9.4" font-weight="600" letter-spacing="0.01em" fill="${houseUiColor(house.house)}" fill-opacity="0.94">${house.house}</text>
    `;
    }).join("");
    const natalVisiblePlanets = filterPoints(natal.planets);
    const layerMode = selectedWheelLayer();
    const planetTrackRadius = (signInner + houseInner) / 2;
    const natalPlacements = distributeGlyphs(natalVisiblePlanets, [160, 146, 132], planetTrackRadius);
    const natalAspects = filterAspectsByMode(calculateAspects(natalVisiblePlanets, natalVisiblePlanets, true)).slice(0, 24);
    const natalAspectLines = showAspectLines() && layerMode !== "transit" ? natalAspects.map((aspect) => aspectLine(aspect.a, aspect.b, aspect.color, centerField - 10, isFocusedAspect(aspect))).join("") : "";
    const natalGlyphs = layerMode === "transit" ? "" : natalVisiblePlanets.map((planet, index) => {
      const placement = natalPlacements[index];
      const x = polarX(placement.angle, placement.radius);
      const y = polarY(placement.angle, placement.radius);
      const anchorX = polarX(placement.anchorAngle, placement.anchorRadius);
      const anchorY = polarY(placement.anchorAngle, placement.anchorRadius);
      return `
      <g data-wheel-point="${planet.key}" data-wheel-scope="natal">
        <circle cx="${anchorX}" cy="${anchorY}" r="2.3" fill="${modernPlanetColor(planet.key)}" fill-opacity="0.62"/>
        ${renderPlanetGlyph(planet, x, y, 21, modernPlanetColor(planet.key))}
        <circle class="chart-hit-target" cx="${x}" cy="${y}" r="19" fill="transparent"/>
      </g>
    `;
    }).join("");
    const transitVisiblePlanets = transit ? filterPoints(transit.planets) : [];
    const transitPlacements = transit ? distributeGlyphs(transitVisiblePlanets, [118, 106], planetTrackRadius) : [];
    const transitToNatalAspects = transit ? filterAspectsByMode(calculateAspects(transitVisiblePlanets, natalVisiblePlanets)).slice(0, 18) : [];
    const transitAspectLines = showAspectLines() && transit && layerMode === "both" ? transitToNatalAspects.map((aspect) => {
      const angleA = longitudeToSvgAngle(aspect.a.longitude);
      const angleB = longitudeToSvgAngle(aspect.b.longitude);
      const highlighted = isFocusedAspect(aspect);
      return `
      <line
        x1="${polarX(angleA, 258)}"
        y1="${polarY(angleA, 258)}"
        x2="${polarX(angleB, 170)}"
        y2="${polarY(angleB, 170)}"
        stroke="${aspect.color}"
        stroke-width="${highlighted ? 1.8 : 0.88}"
        stroke-opacity="${highlighted ? 0.82 : 0.3}"
        stroke-dasharray="3 4"
      />
    `;
    }).join("") : "";
    const transitGlyphs = transit && layerMode !== "natal" ? transitVisiblePlanets.map((planet, index) => {
      const placement = transitPlacements[index];
      const x = polarX(placement.angle, placement.radius);
      const y = polarY(placement.angle, placement.radius);
      const anchorX = polarX(placement.anchorAngle, placement.anchorRadius);
      const anchorY = polarY(placement.anchorAngle, placement.anchorRadius);
      return `
      <g data-wheel-point="${planet.key}" data-wheel-scope="transit">
        <circle cx="${anchorX}" cy="${anchorY}" r="2.1" fill="#5e8fda" fill-opacity="0.54"/>
        ${renderPlanetGlyph(planet, x, y, 18, "#5e8fda")}
        <circle class="chart-hit-target" cx="${x}" cy="${y}" r="18" fill="transparent"/>
      </g>
    `;
    }).join("") : "";
    const ascAngle = longitudeToSvgAngle(natal.angles.asc);
    const dscAngle = longitudeToSvgAngle(natal.angles.dsc);
    const mcAngle = longitudeToSvgAngle(natal.angles.mc);
    const icAngle = longitudeToSvgAngle(natal.angles.ic);
    const centerCity = String(natal.city || "").slice(0, 22);
    const showAxisLines = true;
    const axisOuter = outer + 8;
    const axisInner = centerField;
    const cardinalTicks = [
      { angle: ascAngle, short: "Asc", color: "#6f747c", width: 2.25, dash: "", dot: 4.2 },
      { angle: dscAngle, short: "Dsc", color: "#6f747c", width: 1.55, dash: "", dot: 3.4 },
      { angle: mcAngle, short: "MC", color: "#6f747c", width: 2.25, dash: "", dot: 4.2 },
      { angle: icAngle, short: "IC", color: "#6f747c", width: 1.55, dash: "", dot: 3.4 }
    ];
    const cardinalGuides = showAxisLines ? cardinalTicks.map((item) => `
      <line x1="${polarX(item.angle, axisInner)}" y1="${polarY(item.angle, axisInner)}" x2="${polarX(item.angle, axisOuter)}" y2="${polarY(item.angle, axisOuter)}" stroke="${item.color}" stroke-width="${item.width}" stroke-dasharray="${item.dash}" stroke-linecap="round" stroke-opacity="0.82"/>
      <path d="M ${polarX(item.angle, axisOuter + 8)} ${polarY(item.angle, axisOuter + 8)} L ${polarX(item.angle - 0.03, axisOuter + 2)} ${polarY(item.angle - 0.03, axisOuter + 2)} L ${polarX(item.angle + 0.03, axisOuter + 2)} ${polarY(item.angle + 0.03, axisOuter + 2)} Z" fill="${item.color}" fill-opacity="0.88"/>
      <text x="${polarX(item.angle, axisOuter + 24)}" y="${polarY(item.angle, axisOuter + 24)}" text-anchor="middle" dominant-baseline="middle" font-size="8.8" letter-spacing="0.04em" fill="${item.color}">${item.short}</text>
    `).join("") : "";
    const axisCross = showAxisLines ? `
      <line x1="${polarX(ascAngle, axisOuter)}" y1="${polarY(ascAngle, axisOuter)}" x2="${polarX(dscAngle, axisOuter)}" y2="${polarY(dscAngle, axisOuter)}" stroke="#6f747c" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="${polarX(mcAngle, axisOuter)}" y1="${polarY(mcAngle, axisOuter)}" x2="${polarX(icAngle, axisOuter)}" y2="${polarY(icAngle, axisOuter)}" stroke="#6f747c" stroke-width="1.6" stroke-linecap="round"/>
    ` : "";
    const wheelMarkup = `
    <rect x="0" y="0" width="${size}" height="${size}" fill="transparent"/>
    <circle cx="${cx}" cy="${cy}" r="${outer}" fill="rgba(243,245,248,0.98)" stroke="rgba(202,208,216,0.68)"/>
    <circle cx="${cx}" cy="${cy}" r="${signInner}" fill="rgba(253,254,255,0.99)" stroke="rgba(213,218,226,0.82)"/>
    <circle cx="${cx}" cy="${cy}" r="${houseInner}" fill="rgba(254,254,255,0.99)" stroke="rgba(205,211,219,0.76)"/>
    <circle cx="${cx}" cy="${cy}" r="${centerField}" fill="rgba(250,252,254,0.99)" stroke="rgba(214,220,228,0.6)"/>
    ${axisCross}
    ${minorTicks}
    ${degreeLabels}
    ${signMarks}
    ${houseMarks}
    ${cardinalGuides}
    ${natalAspectLines}
    ${transitAspectLines}
    ${natalGlyphs}
    ${transitGlyphs}
  `;
    if (astroWheelWrap) {
      astroWheelWrap.innerHTML = `<svg ${svgAttrs}>${wheelMarkup}</svg>`;
      astroWheel = document.querySelector("#astro-wheel");
      bindWheelInteraction();
    } else {
      astroWheel.innerHTML = wheelMarkup;
    }
    const bboxWidth = astroWheel?.clientWidth || 0;
    const bboxHeight = astroWheel?.clientHeight || 0;
    renderWheelDiagnostics([
      "wheel: rendered",
      `city: ${centerCity || "-"}`,
      `natalPoints: ${natalVisiblePlanets.length}`,
      `transitPoints: ${transitVisiblePlanets.length}`,
      `markupLength: ${wheelMarkup.length}`,
      `svgWidth: ${bboxWidth}`,
      `svgHeight: ${bboxHeight}`,
      `childNodes: ${astroWheel?.childNodes?.length || 0}`
    ]);
    renderWheelLegend();
    renderFocusedPoint();
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
        natal.rawChart?.input?.houseSystem === "W" ? "Whole Sign \u5BAB\u5236" : "Placidus \u5BAB\u5236",
        natal.rawChart?.input?.nodeType === "mean" ? "Mean Node" : "True Node",
        natal.rawChart?.input?.lilithType === "oscu" ? "True Lilith" : "Mean Lilith",
        selectedPointSet() === "all" ? "\u663E\u793A\u5168\u90E8\u70B9\u4F4D" : selectedPointSet() === "advanced" ? "\u663E\u793A\u6269\u5C55\u70B9\u4F4D" : "\u663E\u793A\u6838\u5FC3\u70B9\u4F4D",
        `\u5BB9\u8BB8\u5EA6\u7CFB\u6570 ${selectedOrbScale().toFixed(2)}`
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
      renderPointToggles(natal.planets);
      renderList(astroNatalList, filterPoints(natal.planets), (planet) => `
      <div class="astro-item">
        <span class="astro-item-label">${planet.glyph} ${planet.label} \xB7 ${planet.house || "?"}\u5BAB${planet.retrograde ? " \xB7 \u9006\u884C" : ""}</span>
        <span class="astro-item-value">${formatLongitude(planet.longitude)}</span>
      </div>
    `);
      renderList(astroTransitList, filterPoints(astroState.transit?.planets || []), (planet) => `
      <div class="astro-item">
        <span class="astro-item-label">${planet.glyph} ${planet.label}${planet.retrograde ? " \xB7 \u9006\u884C" : ""}</span>
        <span class="astro-item-value">${formatLongitude(planet.longitude)}</span>
      </div>
    `);
      renderList(astroAspectList, filterAspectsByMode(astroState.transit?.aspects || []), (aspect) => `
      <div class="astro-item${isFocusedAspect(aspect) ? " active" : ""}" data-aspect-a="${aspect.a.key}" data-aspect-b="${aspect.b.key}" data-aspect-key="${aspect.key}">
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
      if (astroDebugCard) {
        astroDebugCard.textContent = error instanceof Error ? `${error.message}\n\n${error.stack || ""}` : "\u6392\u76D8\u5931\u8D25\u3002";
      }
      renderWheelDiagnostics([
        "wheel: error",
        `message: ${error instanceof Error ? error.message : "\u6392\u76D8\u5931\u8D25\u3002"}`,
        `stack: ${error instanceof Error && error.stack ? error.stack.split("\n").slice(0, 3).join(" | ") : "-"}`,
        `mode: ${getAstroMode()}`,
        `hasDate: ${astroDate?.value ? "yes" : "no"}`,
        `hasTime: ${astroTime?.value ? "yes" : "no"}`,
        `hasLat: ${astroLat?.value ? "yes" : "no"}`,
        `hasLon: ${astroLon?.value ? "yes" : "no"}`,
        `hasTz: ${astroTz?.value ? "yes" : "no"}`,
        `showTransit: ${astroState.showTransit ? "yes" : "no"}`
      ]);
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
        astroState.showTransit = false;
        if (astroWheelLayer) astroWheelLayer.value = "natal";
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
  if (astroPointToggles) {
    astroPointToggles.addEventListener("click", (event) => {
      const button = event.target.closest("[data-point-key]");
      if (!button) return;
      const key = String(button.getAttribute("data-point-key") || "");
      if (!key) return;
      if (astroState.visiblePointKeys.includes(key)) {
        astroState.visiblePointKeys = astroState.visiblePointKeys.filter((item) => item !== key);
      } else {
        astroState.visiblePointKeys = [...astroState.visiblePointKeys, key];
      }
      saveUiPrefs();
      recalcAstro();
    });
  }
  bindWheelInteraction();
  if (astroAspectList) {
    astroAspectList.addEventListener("click", (event) => {
      const row = event.target.closest("[data-aspect-a]");
      if (!row) return;
      astroState.focusedPoint = null;
      astroState.focusedAspect = {
        a: String(row.getAttribute("data-aspect-a") || ""),
        b: String(row.getAttribute("data-aspect-b") || ""),
        key: String(row.getAttribute("data-aspect-key") || "")
      };
      renderFocusedPoint();
      renderWheel(astroState.natal, astroState.transit);
    });
  }
  if (astroExportImage) {
    astroExportImage.addEventListener("click", exportWheelImage);
  }
  if (astroPresets) {
    astroPresets.addEventListener("click", (event) => {
      const button = event.target.closest("[data-astro-preset]");
      if (!button) return;
      applyPreset(button.getAttribute("data-astro-preset"));
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
  [astroDate, astroTime, astroLat, astroLon, astroTz, astroHouseSystem, astroNodeType, astroLilithType, astroPointSet, astroAspectMode, astroOrbScale, astroWheelLayer, astroAspectLines, astroTransitDate, astroTransitTime, astroTransitTz].forEach((input) => {
    if (!input) return;
    input.addEventListener("change", () => {
      if ([astroDate, astroTime, astroLat, astroLon, astroTz].includes(input) && hasNatalInputs()) {
        setAstroMode("natal");
      }
      saveUiPrefs();
      recalcAstro();
    });
  });
  const uiPrefs = loadUiPrefs();
  if (Array.isArray(uiPrefs.visiblePointKeys)) {
    astroState.visiblePointKeys = uiPrefs.visiblePointKeys;
  }
  if (astroWheelLayer && uiPrefs.wheelLayer) astroWheelLayer.value = uiPrefs.wheelLayer;
  if (astroAspectLines && uiPrefs.aspectLines) astroAspectLines.value = uiPrefs.aspectLines;
  if (astroPointSet && uiPrefs.pointSet) astroPointSet.value = uiPrefs.pointSet;
  if (astroAspectMode && uiPrefs.aspectMode) astroAspectMode.value = uiPrefs.aspectMode;
  if (astroOrbScale && uiPrefs.orbScale) astroOrbScale.value = uiPrefs.orbScale;
  hydrateFromUrl();
  if (!new URLSearchParams(window.location.search).has("amode")) {
    setAstroMode(hasNatalInputs() ? "natal" : "live");
  }
  fillTransitNow();
  updateShiftReadout();
  renderAstroHistory();
  recalcAstro();
})();
