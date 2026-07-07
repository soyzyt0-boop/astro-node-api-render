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
  var astroClearNatal = null;
  var astroResolveCity = document.querySelector("#astro-resolve-city");
  var astroCityStatus = document.querySelector("#astro-city-status");
  var astroTransitDate = document.querySelector("#astro-transit-date");
  var astroTransitTz = document.querySelector("#astro-transit-tz");
  var astroTransitCityStatus = document.querySelector("#astro-transit-city-status");
  var astroTransitShift = document.querySelector("#astro-transit-shift");
  var astroTransitShiftReadout = document.querySelector("#astro-transit-shift-readout");
  var astroNow = null;
  var astroTransitApply = null;
  var astroWheel = document.querySelector("#astro-wheel");
  var astroWheelWrap = document.querySelector("#astro-main-wheel-wrap");
  var astroLeftWheel = document.querySelector("#astro-left-wheel");
  var astroRightWheel = document.querySelector("#astro-right-wheel");
  var astroExportImage = null;
  var astroWheelLegend = null;
  var astroNatalSummary = null;
  var astroTransitSummary = null;
  var astroNatalList = null;
  var astroTransitList = null;
  var astroAspectList = null;
  var astroTransitJudgement = null;
  var astroHouseNote = null;
  var astroValidationNote = null;
  var astroCityCandidates = document.querySelector("#astro-city-candidates");
  var astroCopyLink = null;
  var astroSummaryCard = null;
  var astroDebugCard = null;
  var astroHistoryList = null;
  var astroHistoryClear = null;
  var astroModeSwitch = document.querySelector("#astro-mode-switch");
  var astroModeTabs = Array.from(document.querySelectorAll("[data-astro-mode]") || []);
  var astroNatalSummaryLabel = null;
  var astroNatalListLabel = null;
  var astroParamsLabel = null;
  var astroWheelDiagnostics = null;
  var astroCopySummary = null;
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
  var CORE_POINT_KEYS = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron", "northNode", "ascendant", "midheaven"];
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
    compare: null,
    compareMode: false,
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
      houseSystem: astroHouseSystem?.value || "P",
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
    return window.YTZ_SITE_CONFIG?.api?.astrochart || "/api/astrochart";
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
  function midpointAngle(a, b) {
    const a1 = normalizeAngle(a);
    const b1 = normalizeAngle(b);
    let diff = b1 - a1;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return normalizeAngle(a1 + diff / 2);
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
  function transitPlanetColor() {
    return "#3f7fe4";
  }
  function comparePlanetColor() {
    return "#4e86cf";
  }
  function natalPlanetTone(key) {
    const color = modernPlanetColor(key);
    const softer = {
      sun: "#ff675f",
      moon: "#3a84ea",
      mercury: "#4ecba5",
      venus: "#cf9550",
      mars: "#f76860",
      jupiter: "#f36d61",
      saturn: "#b58b59",
      uranus: "#48ccb1",
      neptune: "#3388e8",
      pluto: "#247ce2",
      northNode: "#63c5e8",
      southNode: "#93cde1",
      lilith: "#74685c",
      chiron: "#9a7c64"
    }[key];
    return softer || color;
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
  function aspectStrokeWidth(aspect, highlighted = false, isTransit = false) {
    const base = {
      conjunction: isTransit ? 1.2 : 1.38,
      opposition: isTransit ? 1.14 : 1.28,
      square: isTransit ? 1.06 : 1.18,
      trine: isTransit ? 0.9 : 1.02,
      sextile: isTransit ? 0.74 : 0.84,
      quincunx: isTransit ? 0.66 : 0.76
    }[aspect?.key] || (isTransit ? 0.82 : 0.9);
    return highlighted ? base + (isTransit ? 0.42 : 0.5) : base;
  }
  function aspectStrokeOpacity(aspect, highlighted = false, isTransit = false) {
    if (highlighted) return isTransit ? 0.9 : 0.88;
    return {
      conjunction: isTransit ? 0.56 : 0.7,
      opposition: isTransit ? 0.5 : 0.62,
      square: isTransit ? 0.46 : 0.58,
      trine: isTransit ? 0.34 : 0.44,
      sextile: isTransit ? 0.22 : 0.3,
      quincunx: isTransit ? 0.16 : 0.22
    }[aspect?.key] || (isTransit ? 0.3 : 0.38);
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
      tdate: astroTransitDate?.value || "",
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
    const hsys = String(params.get("hsys") || "").trim().toUpperCase();
    if (astroHouseSystem) {
      astroHouseSystem.value = hsys === "P" || hsys === "W" ? hsys : "P";
    }
    assign(astroNodeType, "ntype");
    assign(astroLilithType, "ltype");
    assign(astroTransitDate, "tdate");
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
    const response = await fetch((window.YTZ_SITE_CONFIG?.api?.geocode || "/api/geocode"), {
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
  async function readJsonSafely(response, fallbackMessage) {
    const raw = await response.text();
    if (!raw) {
      throw new Error(fallbackMessage);
    }
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(raw.slice(0, 180) || fallbackMessage);
    }
  }
  async function requestChart(payload) {
    const base = getAstroApiBase();
    const requestUrl = base === "/api/astrochart" ? base : `${base}/chart`;
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await readJsonSafely(response, "占星接口没有返回有效数据。");
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
    const isCompare = !!astroState.compareMode;
    astroWheelLegend.innerHTML = [
      `<div class="astro-item"><span class="astro-item-label">内圈</span><span class="astro-item-value">${isCompare ? "主盘本命" : "本命点位"}</span></div>`,
      `<div class="astro-item"><span class="astro-item-label">外圈</span><span class="astro-item-value">${isCompare ? "对方本命" : "行运点位"}</span></div>`,
      `<div class="astro-item"><span class="astro-item-label">实线</span><span class="astro-item-value">${isCompare ? "主盘内部相位" : "本命内部相位"}</span></div>`,
      `<div class="astro-item"><span class="astro-item-label">虚线</span><span class="astro-item-value">${isCompare ? "双方交互相位" : "行运对本命相位"}</span></div>`
    ].join("");
  }
  function renderFocusedPoint() {
    return;
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
      const source = scope === "transit" ? (astroState.compareMode ? astroState.compare?.planets || [] : astroState.transit?.planets || []) : astroState.natal?.planets || [];
      astroState.focusedPoint = source.find((item) => item.key === key) || null;
      astroState.focusedAspect = null;
      renderFocusedPoint();
      renderWheel(astroState.natal, astroState.compareMode ? astroState.compare : astroState.transit);
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
      city: String(astroCity?.value || "").trim() || DEFAULT_LIVE_CITY
    });
  }
  function resolvedTransitTimezone(natal) {
    const transitTz = String(astroTransitTz?.value || "").trim();
    if (transitTz) return transitTz;
    const natalTz = String(astroTz?.value || "").trim();
    if (natalTz) return natalTz;
    return String(natal?.tz || "+02:00").trim() || "+02:00";
  }
  async function buildTransitState(natal) {
    if (!natal) return null;
    const timeRaw = "12:00";
    const tz = resolvedTransitTimezone(natal);
    let dateRaw = String(astroTransitDate?.value || "").trim();
    if (!dateRaw) {
      const now = buildNowLocalParts(tz);
      dateRaw = `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;
      if (astroTransitDate) astroTransitDate.value = dateRaw;
    }
    const baseDate = buildUtcDate(dateRaw, timeRaw, tz);
    if (!baseDate) return null;
    const shiftDays = Number(astroTransitShift?.value || 0);
    const shiftedDate = new Date(baseDate.getTime() + shiftDays * 24 * 3600 * 1e3);
    const parts = buildLocalDateParts(shiftedDate, tz);
    const transitLat = Number(astroLat?.value);
    const transitLon = Number(astroLon?.value);
    const lat = Number.isFinite(transitLat) ? transitLat : natal.lat;
    const lon = Number.isFinite(transitLon) ? transitLon : natal.lon;
    const chart = await requestChart(buildChartPayloadFromParts(parts, lat, lon, tz));
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
  function buildSummaryText() {
    return "";
  }
  function renderSummaryCard() {
  }
  function renderDebugCard() {
  }
  function renderWheelDiagnostics() {
  }
  function clearAstroOutputs(message = "\u5F85\u8BA1\u7B97\u3002") {
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
    astroState.compare = null;
  }
  function renderModeLabels(natal) {
    const isLive = natal?.mode === "live";
    if (astroNatalSummaryLabel) astroNatalSummaryLabel.textContent = "\u70B9\u4F4D\u8BF4\u660E";
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
    if (astroTransitTz && item.utcOffsetMinutes !== void 0 && item.utcOffsetMinutes !== null) {
      astroTransitTz.value = formatOffsetMinutes(Number(item.utcOffsetMinutes));
    }
    if (astroTransitCityStatus) {
      astroTransitCityStatus.textContent = `\u5DF2\u6821\u51C6\uFF1A${item.display || item.city} \xB7 ${astroTransitTz?.value || ""}`;
    }
    recalcAstro();
  }
  function renderWheel(natal, transit, options = {}) {
    const targetWheel = options.targetWheel || astroWheel;
    const targetWrap = options.targetWrap || astroWheelWrap;
    if (!targetWheel || !natal) return;
    const compare = astroState.compareMode ? astroState.compare : null;
    const overlayState = compare || transit;
    const overlayIsCompare = !!compare;
    const size = 720;
    const svgAttrs = `id="astro-wheel" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="本命与行运占星轮盘" width="${size}" height="${size}"`;
    const cx = size / 2;
    const cy = size / 2;
    const outer = 286;
    const signInner = 248;
    const houseInner = 228;
    const centerField = 202;
    const displayTheme = String(natal.displayTheme || options.displayTheme || "natal");
    const displayVariant = String(natal.displayVariant || options.displayVariant || "");
    const themeStyles = {
      natal: {
        outerFill: "rgba(243,245,248,0.98)",
        outerStroke: "rgba(202,208,216,0.68)",
        signFill: "rgba(253,254,255,0.99)",
        signStroke: "rgba(213,218,226,0.82)",
        houseFill: "rgba(254,254,255,0.99)",
        houseStroke: "rgba(205,211,219,0.76)",
        centerFill: "rgba(250,252,254,0.99)",
        centerStroke: "rgba(214,220,228,0.6)",
        signLine: "rgba(120,124,132,0.18)",
        majorTick: "rgba(130,136,146,0.22)",
        minorTick: "rgba(130,136,146,0.08)",
        degreeLabel: "rgba(124,130,138,0.46)",
        houseLine: "rgba(150,154,162,0.14)",
        houseTick: "rgba(138,142,150,0.10)",
        houseNumberOpacity: "0.64",
        axisColor: "#6f747c",
        axisCrossOpacity: "0.78",
        axisGuideOpacity: "0.66",
        axisLabelOpacity: "0.56",
        natalConnector: "rgba(128,128,123,0.42)",
        transitConnector: "rgba(128,128,123,0.46)",
        aspectOpacityScale: 1,
        transitAspectOpacityScale: 1
      },
      returns: null,
      directions: null,
      periods: null
    };
    themeStyles.returns = themeStyles.natal;
    themeStyles.directions = themeStyles.natal;
    themeStyles.periods = themeStyles.natal;
    const theme = themeStyles[displayTheme] || themeStyles.natal;
    const variantStyles = {
      "solar-return": {
        innerGuideRadius: 188,
        innerGuideDash: "1 0",
        innerGuideOpacity: 0.26,
        outerGuideRadius: 246,
        outerGuideDash: "2 3",
        outerGuideOpacity: 0.24,
        accentTickEvery: 30,
        accentTickOpacity: 0.3,
        natalGlyphSize: 21.8,
        overlayGlyphSize: 22.5,
        connectorWidth: 0.88,
        connectorOpacity: 0.92,
        aspectWidthScale: 1.06,
        transitAspectWidthScale: 1.02
      },
      "lunar-return": {
        innerGuideRadius: 190,
        innerGuideDash: "1.5 3.2",
        innerGuideOpacity: 0.24,
        outerGuideRadius: 244,
        outerGuideDash: "1.5 2.8",
        outerGuideOpacity: 0.2,
        accentTickEvery: 15,
        accentTickOpacity: 0.22,
        natalGlyphSize: 21.4,
        overlayGlyphSize: 22.1,
        connectorWidth: 0.84,
        connectorOpacity: 0.88,
        aspectWidthScale: 0.98,
        transitAspectWidthScale: 0.98
      },
      secondary: {
        innerGuideRadius: 186,
        innerGuideDash: "4 3",
        innerGuideOpacity: 0.22,
        outerGuideRadius: 242,
        outerGuideDash: "1 0",
        outerGuideOpacity: 0.16,
        accentTickEvery: 30,
        accentTickOpacity: 0.18,
        natalGlyphSize: 21.2,
        overlayGlyphSize: 22.3,
        connectorWidth: 0.82,
        connectorOpacity: 0.84,
        aspectWidthScale: 0.94,
        transitAspectWidthScale: 0.9
      },
      tertiary: {
        innerGuideRadius: 184,
        innerGuideDash: "2 2",
        innerGuideOpacity: 0.24,
        outerGuideRadius: 240,
        outerGuideDash: "2 2",
        outerGuideOpacity: 0.18,
        accentTickEvery: 10,
        accentTickOpacity: 0.2,
        natalGlyphSize: 20.8,
        overlayGlyphSize: 21.8,
        connectorWidth: 0.78,
        connectorOpacity: 0.8,
        aspectWidthScale: 0.88,
        transitAspectWidthScale: 0.84
      },
      "solar-arc": {
        innerGuideRadius: 182,
        innerGuideDash: "6 3",
        innerGuideOpacity: 0.24,
        outerGuideRadius: 242,
        outerGuideDash: "1 0",
        outerGuideOpacity: 0.18,
        accentTickEvery: 45,
        accentTickOpacity: 0.24,
        natalGlyphSize: 21.6,
        overlayGlyphSize: 22.7,
        connectorWidth: 0.9,
        connectorOpacity: 0.9,
        aspectWidthScale: 1.08,
        transitAspectWidthScale: 1.04
      },
      firdaria: {
        innerGuideRadius: 192,
        innerGuideDash: "1 0",
        innerGuideOpacity: 0.12,
        outerGuideRadius: 232,
        outerGuideDash: "8 4",
        outerGuideOpacity: 0.24,
        accentTickEvery: 60,
        accentTickOpacity: 0.22,
        natalGlyphSize: 20.9,
        overlayGlyphSize: 21.9,
        connectorWidth: 0.74,
        connectorOpacity: 0.74,
        aspectWidthScale: 0.76,
        transitAspectWidthScale: 0.72
      },
      profections: {
        innerGuideRadius: 194,
        innerGuideDash: "3 4",
        innerGuideOpacity: 0.18,
        outerGuideRadius: 234,
        outerGuideDash: "3 4",
        outerGuideOpacity: 0.2,
        accentTickEvery: 30,
        accentTickOpacity: 0.24,
        natalGlyphSize: 21,
        overlayGlyphSize: 22,
        connectorWidth: 0.76,
        connectorOpacity: 0.78,
        aspectWidthScale: 0.82,
        transitAspectWidthScale: 0.78
      }
    };
    const variant = variantStyles[displayVariant] || null;
    const natalGlyphSize = variant?.natalGlyphSize || 21;
    const overlayGlyphSize = variant?.overlayGlyphSize || 22.5;
    const connectorWidth = variant?.connectorWidth || 0.82;
    const connectorOpacity = variant?.connectorOpacity || 0.88;
    const aspectWidthScale = variant?.aspectWidthScale || 1;
    const transitAspectWidthScale = variant?.transitAspectWidthScale || 1;
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
    function radialAnchorForGlyph(angle, radius) {
      return {
        x: polarX(angle, radius),
        y: polarY(angle, radius)
      };
    }
    function connectorEndBeforeGlyph(x1, y1, x2, y2, glyphClearance = 12.5) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.hypot(dx, dy);
      if (!distance) return { x: x1, y: y1 };
      const usable = Math.max(0, distance - glyphClearance);
      const ratio = usable / distance;
      return {
        x: x1 + dx * ratio,
        y: y1 + dy * ratio
      };
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
    function minimallySeparateLongitudes(cluster, minGap) {
      if (!cluster.length) return [];
      const adjusted = cluster.map((item) => item.longitude);
      for (let index = 1; index < adjusted.length; index += 1) {
        const prev = adjusted[index - 1];
        if (adjusted[index] - prev < minGap) adjusted[index] = prev + minGap;
      }
      const originalCenter = cluster.reduce((sum, item) => sum + item.longitude, 0) / cluster.length;
      const adjustedCenter = adjusted.reduce((sum, value) => sum + value, 0) / adjusted.length;
      const drift = adjustedCenter - originalCenter;
      return adjusted.map((value) => value - drift);
    }
    function distributeGlyphs(points, glyphRadii, anchorRadius) {
      const sorted = points.map((point, index) => ({ ...point, originalIndex: index })).sort((left, right) => left.longitude - right.longitude);
      const placements = new Array(points.length);
      let cluster = [];
      function flushCluster() {
        if (!cluster.length) return;
        const adjustedLongitudes = minimallySeparateLongitudes(cluster, 1.35);
        cluster.forEach((item, index) => {
          const layer = index % glyphRadii.length;
          const displayedLongitude = adjustedLongitudes[index];
          placements[item.originalIndex] = {
            angle: longitudeToSvgAngle(normalizeAngle(displayedLongitude)),
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
        if (angleDistance(item.longitude, prev.longitude) < 2.4) {
          cluster.push(item);
        } else {
          flushCluster();
          cluster.push(item);
        }
      });
      flushCluster();
      return placements;
    }
    function distributeGlyphsOnTrack(points, glyphRadius, anchorRadius) {
      const sorted = points.map((point, index) => ({ ...point, originalIndex: index })).sort((left, right) => left.longitude - right.longitude);
      const placements = new Array(points.length);
      let cluster = [];
      function flushCluster() {
        if (!cluster.length) return;
        const adjustedLongitudes = minimallySeparateLongitudes(cluster, 5.6);
        cluster.forEach((item, index) => {
          const displayedLongitude = adjustedLongitudes[index];
          placements[item.originalIndex] = {
            angle: longitudeToSvgAngle(normalizeAngle(displayedLongitude)),
            radius: glyphRadius,
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
        if (angleDistance(item.longitude, prev.longitude) < 5.8) {
          cluster.push(item);
        } else {
          flushCluster();
          cluster.push(item);
        }
      });
      flushCluster();
      return placements;
    }
    function aspectLineCoords(x1, y1, x2, y2, aspect, highlighted = false, dash = "", isTransit = false) {
      const baseOpacity = aspectStrokeOpacity(aspect, highlighted, isTransit);
      const themeOpacity = isTransit ? theme.transitAspectOpacityScale : theme.aspectOpacityScale;
      const widthScale = isTransit ? transitAspectWidthScale : aspectWidthScale;
      return `
      <line
        x1="${x1}"
        y1="${y1}"
        x2="${x2}"
        y2="${y2}"
        stroke="${aspect.color}"
        stroke-width="${(aspectStrokeWidth(aspect, highlighted, isTransit) * widthScale).toFixed(2)}"
        stroke-opacity="${Math.max(0.08, Math.min(1, baseOpacity * themeOpacity))}"
        stroke-dasharray="${dash}"
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
      <line x1="${polarX(angle, signInner)}" y1="${polarY(angle, signInner)}" x2="${polarX(angle, outer)}" y2="${polarY(angle, outer)}" stroke="${theme.signLine}" stroke-width="0.95"/>
      ${zodiacBadge(lx, ly, index)}
    `;
    }).join("");
    const minorTicks = Array.from({ length: 72 }, (_, index) => {
      const longitude = index * 5;
      const angle = longitudeToSvgAngle(longitude);
      const isMajor = index % 6 === 0;
      const r1 = outer - (isMajor ? 10 : 5);
      const r2 = outer - 1;
      return `<line x1="${polarX(angle, r1)}" y1="${polarY(angle, r1)}" x2="${polarX(angle, r2)}" y2="${polarY(angle, r2)}" stroke="${isMajor ? theme.majorTick : theme.minorTick}" stroke-width="${isMajor ? "0.95" : "0.62"}"/>`;
    }).join("");
    const variantTicks = variant ? Array.from({ length: Math.floor(360 / variant.accentTickEvery) }, (_, index) => {
      const longitude = index * variant.accentTickEvery;
      const angle = longitudeToSvgAngle(longitude);
      return `<line x1="${polarX(angle, outer - 14)}" y1="${polarY(angle, outer - 14)}" x2="${polarX(angle, outer - 2)}" y2="${polarY(angle, outer - 2)}" stroke="${theme.axisColor}" stroke-opacity="${variant.accentTickOpacity}" stroke-width="0.9"/>`;
    }).join("") : "";
    const degreeLabels = Array.from({ length: 36 }, (_, index) => {
      const longitude = index * 10;
      const angle = longitudeToSvgAngle(longitude);
      const label = String(longitude % 30).padStart(2, "0");
      return `
      <text x="${polarX(angle, outer - 19)}" y="${polarY(angle, outer - 19)}" text-anchor="middle" dominant-baseline="middle" font-size="6.6" letter-spacing="0.02em" fill="${theme.degreeLabel}">${label}</text>
    `;
    }).join("");
    const houseMarks = natal.houses.map((house) => {
      const angle = longitudeToSvgAngle(house.start);
      const labelAngle = longitudeToSvgAngle(houseMidpoint(house.start, house.end));
      const houseNumberRadius = (houseInner + centerField) / 2;
      return `
      <line x1="${polarX(angle, centerField)}" y1="${polarY(angle, centerField)}" x2="${polarX(angle, signInner)}" y2="${polarY(angle, signInner)}" stroke="${theme.houseLine}" stroke-width="0.72"/>
      <line x1="${polarX(angle, houseInner - 5)}" y1="${polarY(angle, houseInner - 5)}" x2="${polarX(angle, houseInner + 5)}" y2="${polarY(angle, houseInner + 5)}" stroke="${theme.houseTick}" stroke-width="0.72" stroke-linecap="round"/>
      <text x="${polarX(labelAngle, houseNumberRadius)}" y="${polarY(labelAngle, houseNumberRadius)}" text-anchor="middle" dominant-baseline="middle" font-size="8.1" font-weight="520" letter-spacing="0.01em" fill="${houseUiColor(house.house)}" fill-opacity="${theme.houseNumberOpacity}">${house.house}</text>
    `;
    }).join("");
    const natalVisiblePlanets = filterPoints(natal.planets);
    const layerMode = selectedWheelLayer();
    const planetTrackRadius = (signInner + houseInner) / 2;
    const natalPlacements = distributeGlyphsOnTrack(natalVisiblePlanets, 181, planetTrackRadius);
    const natalAnchorTrackRadius = 156;
    const natalAnchorMap = new Map(natalVisiblePlanets.map((planet, index) => {
      const anchor = radialAnchorForGlyph(longitudeToSvgAngle(planet.longitude), natalAnchorTrackRadius);
      return [planet.key, anchor];
    }));
    const natalAspects = filterAspectsByMode(calculateAspects(natalVisiblePlanets, natalVisiblePlanets, true)).slice(0, 24);
    const natalAspectLines = showAspectLines() && layerMode !== "transit" ? natalAspects.map((aspect) => {
      const a = natalAnchorMap.get(aspect.a.key);
      const b = natalAnchorMap.get(aspect.b.key);
      if (!a || !b) return "";
      return aspectLineCoords(a.x, a.y, b.x, b.y, aspect, isFocusedAspect(aspect));
    }).join("") : "";
    const natalGlyphs = layerMode === "transit" ? "" : natalVisiblePlanets.map((planet, index) => {
      const placement = natalPlacements[index];
      const x = polarX(placement.angle, placement.radius);
      const y = polarY(placement.angle, placement.radius);
      const trackX = polarX(placement.anchorAngle, placement.anchorRadius);
      const trackY = polarY(placement.anchorAngle, placement.anchorRadius);
      const anchor = natalAnchorMap.get(planet.key);
      const connectorEnd = connectorEndBeforeGlyph(anchor.x, anchor.y, x, y, 12.5);
      return `
      <g data-wheel-point="${planet.key}" data-wheel-scope="natal">
        <circle cx="${trackX}" cy="${trackY}" r="1.7" fill="${natalPlanetTone(planet.key)}" fill-opacity="0.46"/>
        <line x1="${anchor.x}" y1="${anchor.y}" x2="${connectorEnd.x}" y2="${connectorEnd.y}" stroke="${theme.natalConnector}" stroke-opacity="${connectorOpacity}" stroke-width="${connectorWidth}"/>
        <circle cx="${anchor.x}" cy="${anchor.y}" r="2.05" fill="${natalPlanetTone(planet.key)}" fill-opacity="0.92"/>
        ${renderPlanetGlyph(planet, x, y, natalGlyphSize, natalPlanetTone(planet.key))}
        <circle class="chart-hit-target" cx="${x}" cy="${y}" r="19" fill="transparent"/>
      </g>
    `;
    }).join("");
    const transitVisiblePlanets = overlayState ? filterPoints(overlayState.planets) : [];
    const transitOuter = 318;
    const transitInner = 296;
    const transitPlacements = overlayState ? distributeGlyphsOnTrack(transitVisiblePlanets, 308, transitInner) : [];
    const transitAnchorTrackRadius = 296;
    const transitAnchorMap = new Map(transitVisiblePlanets.map((planet, index) => {
      const anchor = radialAnchorForGlyph(longitudeToSvgAngle(planet.longitude), transitAnchorTrackRadius);
      return [planet.key, anchor];
    }));
    const transitToNatalAspects = overlayState ? filterAspectsByMode(calculateAspects(transitVisiblePlanets, natalVisiblePlanets)).slice(0, 18) : [];
    const transitAspectLines = showAspectLines() && overlayState && layerMode !== "natal" ? transitToNatalAspects.map((aspect) => {
      const a = transitAnchorMap.get(aspect.a.key);
      const b = natalAnchorMap.get(aspect.b.key);
      if (!a || !b) return "";
      const highlighted = isFocusedAspect(aspect);
      return aspectLineCoords(a.x, a.y, b.x, b.y, aspect, highlighted, overlayIsCompare ? "4 3" : "3 4", true);
    }).join("") : "";
    const transitGlyphs = overlayState && layerMode !== "natal" ? transitVisiblePlanets.map((planet, index) => {
      const placement = transitPlacements[index];
      const x = polarX(placement.angle, placement.radius);
      const y = polarY(placement.angle, placement.radius);
      const trackX = polarX(placement.anchorAngle, placement.anchorRadius);
      const trackY = polarY(placement.anchorAngle, placement.anchorRadius);
      const anchor = transitAnchorMap.get(planet.key);
      const overlayColor = overlayIsCompare ? comparePlanetColor() : transitPlanetColor();
      const connectorEnd = connectorEndBeforeGlyph(anchor.x, anchor.y, x, y, 12.5);
      return `
      <g data-wheel-point="${planet.key}" data-wheel-scope="transit">
        <circle cx="${trackX}" cy="${trackY}" r="1.8" fill="${overlayColor}" fill-opacity="0.44"/>
        <line x1="${anchor.x}" y1="${anchor.y}" x2="${connectorEnd.x}" y2="${connectorEnd.y}" stroke="${theme.transitConnector}" stroke-opacity="${Math.max(0.68, connectorOpacity - 0.04)}" stroke-width="${(connectorWidth + 0.04).toFixed(2)}"/>
        <circle cx="${anchor.x}" cy="${anchor.y}" r="2.15" fill="${overlayColor}" fill-opacity="0.96"/>
        ${renderPlanetGlyph(planet, x, y, overlayGlyphSize, overlayColor)}
        <circle class="chart-hit-target" cx="${x}" cy="${y}" r="20" fill="transparent"/>
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
      { angle: ascAngle, short: "Asc", color: theme.axisColor, width: 2.25, dash: "", dot: 4.2 },
      { angle: dscAngle, short: "Dsc", color: theme.axisColor, width: 1.55, dash: "", dot: 3.4 },
      { angle: mcAngle, short: "MC", color: theme.axisColor, width: 2.25, dash: "", dot: 4.2 },
      { angle: icAngle, short: "IC", color: theme.axisColor, width: 1.55, dash: "", dot: 3.4 }
    ];
    const cardinalGuides = showAxisLines ? cardinalTicks.map((item) => `
      <line x1="${polarX(item.angle, axisInner)}" y1="${polarY(item.angle, axisInner)}" x2="${polarX(item.angle, axisOuter)}" y2="${polarY(item.angle, axisOuter)}" stroke="${item.color}" stroke-width="${item.width - 0.46}" stroke-dasharray="${item.dash}" stroke-linecap="round" stroke-opacity="${theme.axisGuideOpacity}"/>
      <text x="${polarX(item.angle, axisOuter + 16)}" y="${polarY(item.angle, axisOuter + 16)}" text-anchor="middle" dominant-baseline="middle" font-size="6.4" letter-spacing="0.04em" fill="${item.color}" fill-opacity="${theme.axisLabelOpacity}">${item.short}</text>
    `).join("") : "";
    const axisCross = showAxisLines ? `
      <line x1="${polarX(ascAngle, axisOuter)}" y1="${polarY(ascAngle, axisOuter)}" x2="${polarX(dscAngle, axisOuter)}" y2="${polarY(dscAngle, axisOuter)}" stroke="${theme.axisColor}" stroke-width="1.14" stroke-linecap="round" stroke-opacity="${theme.axisCrossOpacity}"/>
      <line x1="${polarX(mcAngle, axisOuter)}" y1="${polarY(mcAngle, axisOuter)}" x2="${polarX(icAngle, axisOuter)}" y2="${polarY(icAngle, axisOuter)}" stroke="${theme.axisColor}" stroke-width="1.14" stroke-linecap="round" stroke-opacity="${theme.axisCrossOpacity}"/>
    ` : "";
    const variantGuides = variant ? `
      <circle cx="${cx}" cy="${cy}" r="${variant.outerGuideRadius}" fill="none" stroke="${theme.axisColor}" stroke-opacity="${variant.outerGuideOpacity}" stroke-width="0.9" stroke-dasharray="${variant.outerGuideDash}"/>
      <circle cx="${cx}" cy="${cy}" r="${variant.innerGuideRadius}" fill="none" stroke="${theme.axisColor}" stroke-opacity="${variant.innerGuideOpacity}" stroke-width="0.84" stroke-dasharray="${variant.innerGuideDash}"/>
    ` : "";
    const wheelMarkup = `
    <rect x="0" y="0" width="${size}" height="${size}" fill="transparent"/>
    <circle cx="${cx}" cy="${cy}" r="${outer}" fill="${theme.outerFill}" stroke="${theme.outerStroke}"/>
    <circle cx="${cx}" cy="${cy}" r="${signInner}" fill="${theme.signFill}" stroke="${theme.signStroke}"/>
    <circle cx="${cx}" cy="${cy}" r="${houseInner}" fill="${theme.houseFill}" stroke="${theme.houseStroke}"/>
    <circle cx="${cx}" cy="${cy}" r="${centerField}" fill="${theme.centerFill}" stroke="${theme.centerStroke}"/>
    ${axisCross}
    ${variantGuides}
    ${minorTicks}
    ${variantTicks}
    ${degreeLabels}
    ${signMarks}
    ${houseMarks}
    ${cardinalGuides}
    ${natalAspectLines}
    ${transitAspectLines}
    ${natalGlyphs}
    ${transitGlyphs}
  `;
    if (targetWrap) {
      const targetId = String(targetWheel.getAttribute("id") || "astro-wheel");
      const ariaLabel = String(targetWheel.getAttribute("aria-label") || "占星轮盘");
      targetWrap.innerHTML = `<svg id="${targetId}" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${ariaLabel}" width="${size}" height="${size}">${wheelMarkup}</svg>`;
      if (targetId === "astro-wheel") {
        astroWheel = document.querySelector("#astro-wheel");
        astroWheelWrap = document.querySelector("#astro-main-wheel-wrap");
        bindWheelInteraction();
      } else if (targetId === "astro-left-wheel") {
        astroLeftWheel = document.querySelector("#astro-left-wheel");
      } else if (targetId === "astro-right-wheel") {
        astroRightWheel = document.querySelector("#astro-right-wheel");
      }
    } else {
      targetWheel.innerHTML = wheelMarkup;
    }
    if (!options.silent) {
      renderWheelLegend();
      renderFocusedPoint();
    }
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
    const city = String(astroCity?.value || "").trim();
    const dateRaw = String(astroTransitDate?.value || "").trim();
    if (!city) {
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = "\u5148\u8F93\u5165\u51FA\u751F\u57CE\u5E02\u3002";
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
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = `\u627E\u5230 ${results.length} \u4E2A\u5019\u9009\u5730\u70B9\u3002\u8BF7\u70B9\u4E00\u4E2A\u4F60\u8981\u7684\u5730\u70B9\u3002`;
    } catch (error) {
      if (astroTransitCityStatus) astroTransitCityStatus.textContent = error instanceof Error ? error.message : "\u5730\u70B9\u6821\u51C6\u5931\u8D25\u3002";
    }
  }
  var recalcToken = 0;
  var transitShiftRecalcTimer = null;
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
      if (astroHouseNote) {
        astroHouseNote.textContent = "";
      }
      if (astroValidationNote) {
        astroValidationNote.textContent = "";
      }
      renderPointToggles(natal.planets);
      renderList(astroNatalList, filterPoints(natal.planets), (planet) => `
      <div class="astro-item">
        <span class="astro-item-label">${planet.glyph} ${planet.label} \xB7 ${planet.house || "?"}\u5BAB${planet.retrograde ? " \xB7 \u9006\u884C" : ""}</span>
        <span class="astro-item-value">${formatLongitude(planet.longitude)}</span>
      </div>
    `);
      renderList(astroTransitList, filterPoints((astroState.compareMode ? astroState.compare?.planets : astroState.transit?.planets) || []), (planet) => `
      <div class="astro-item">
        <span class="astro-item-label">${planet.glyph} ${planet.label}${planet.retrograde ? " \xB7 \u9006\u884C" : ""}</span>
        <span class="astro-item-value">${formatLongitude(planet.longitude)}</span>
      </div>
    `);
      renderList(astroAspectList, filterAspectsByMode((astroState.compareMode ? astroState.compare?.aspects : astroState.transit?.aspects) || []), (aspect) => `
      <div class="astro-item${isFocusedAspect(aspect) ? " active" : ""}" data-aspect-a="${aspect.a.key}" data-aspect-b="${aspect.b.key}" data-aspect-key="${aspect.key}">
        <span class="astro-item-label">${aspect.a.label}${aspect.label}${aspect.b.label}</span>
        <span class="astro-item-value">\u5BB9\u8BB8 ${aspect.orb.toFixed(1)}\xB0</span>
      </div>
    `);
      window.__mingxianAstroAspectSource = {
        points: filterPoints(natal.planets),
        aspects: (astroState.compareMode ? astroState.compare?.aspects?.length : astroState.transit?.aspects?.length) ? filterAspectsByMode((astroState.compareMode ? astroState.compare.aspects : astroState.transit.aspects) || []) : filterAspectsByMode(calculateAspects(filterPoints(natal.planets), filterPoints(natal.planets), true))
      };
      renderSummaryCard(natal, astroState.transit);
      renderDebugCard(natal);
      renderWheel(natal, astroState.compareMode ? astroState.compare : astroState.transit);
      writeQueryStateToUrl();
    } catch (error) {
      if (token !== recalcToken) return;
      clearAstroOutputs(error instanceof Error ? error.message : "\u65B0\u5360\u661F\u5F15\u64CE\u6682\u65F6\u672A\u8FDE\u901A\u3002");
      if (astroValidationNote) {
        astroValidationNote.textContent = error instanceof Error ? error.message : "\u6392\u76D8\u5931\u8D25\u3002";
      }
      if (astroHouseNote) {
        astroHouseNote.textContent = `\u8BF7\u5148\u542F\u52A8\u672C\u673A\u5360\u661F\u63A5\u53E3\uFF1A${getAstroApiBase()}`;
      }
    }
  }
  window.__mingxianRecalcAstro = recalcAstro;
  window.__mingxianAstroSetMode = (mode, showTransit = false) => {
    setAstroMode(mode);
    astroState.showTransit = !!showTransit;
    if (showTransit && astroWheelLayer) {
      astroWheelLayer.value = "both";
    } else if (astroWheelLayer) {
      astroWheelLayer.value = mode === "live" ? "natal" : "natal";
    }
    if (showTransit && astroTransitTz && !String(astroTransitTz.value || "").trim() && astroTz?.value) {
      astroTransitTz.value = String(astroTz.value || "").trim();
    }
    recalcAstro();
  };
  window.__mingxianAstroSetCompare = (enabled = false) => {
    astroState.compareMode = !!enabled;
    if (!enabled) {
      astroState.compare = null;
    }
    renderWheelLegend();
    if (astroState.natal) {
      renderWheel(astroState.natal, astroState.compareMode ? astroState.compare : astroState.transit);
    }
  };
  window.__mingxianAstroSetCompareChart = (chart, context = {}) => {
    if (!chart) {
      astroState.compare = null;
      renderWheelLegend();
      if (astroState.natal) {
        renderWheel(astroState.natal, astroState.compareMode ? astroState.compare : astroState.transit);
      }
      return;
    }
    const compareState = buildNatalStateFromChart("compare", chart, {
      name: String(context.name || "").trim() || "\u5BF9\u76D8\u5BF9\u8C61",
      city: String(context.city || "").trim() || "\u672A\u586B\u57CE\u5E02"
    });
    compareState.aspects = filterAspectsByMode(calculateAspects(filterPoints(compareState.planets), filterPoints(astroState.natal?.planets || []))).slice(0, 24);
    astroState.compare = compareState;
    renderWheelLegend();
    if (astroState.natal) {
      renderWheel(astroState.natal, astroState.compareMode ? astroState.compare : astroState.transit);
    }
  };
  window.__mingxianBuildCompositeWheel = (leftChart, rightChart, context = {}) => {
    if (!leftChart || !rightChart) return null;
    const leftState = buildNatalStateFromChart("composite-source-left", leftChart, {
      name: String(context.leftName || "").trim() || "\u5DE6\u76D8",
      city: String(context.leftCity || "").trim() || "\u672A\u586B\u57CE\u5E02"
    });
    const rightState = buildNatalStateFromChart("composite-source-right", rightChart, {
      name: String(context.rightName || "").trim() || "\u53F3\u76D8",
      city: String(context.rightCity || "").trim() || "\u672A\u586B\u57CE\u5E02"
    });
    const compositePlanets = leftState.planets.map((leftPlanet) => {
      const rightPlanet = rightState.planets.find((item) => item.key === leftPlanet.key);
      if (!rightPlanet) return leftPlanet;
      const longitude = midpointAngle(leftPlanet.longitude, rightPlanet.longitude);
      return {
        ...leftPlanet,
        longitude,
        signInfo: longitudeToSign(longitude)
      };
    });
    const composite = {
      ...leftState,
      mode: "composite",
      name: String(context.name || "").trim() || "\u7EC4\u5408\u76D8",
      city: `${leftState.city} / ${rightState.city}`,
      planets: compositePlanets,
      angles: {
        asc: midpointAngle(leftState.angles.asc, rightState.angles.asc),
        mc: midpointAngle(leftState.angles.mc, rightState.angles.mc),
        dsc: midpointAngle(leftState.angles.dsc, rightState.angles.dsc),
        ic: midpointAngle(leftState.angles.ic, rightState.angles.ic)
      }
    };
    composite.aspects = filterAspectsByMode(calculateAspects(filterPoints(composite.planets), filterPoints(composite.planets), true)).slice(0, 24);
    return composite;
  };
  window.__mingxianBuildWheelStateFromChart = (chart, context = {}) => {
    const state = buildNatalStateFromChart("main", chart, {
      name: String(context.name || "").trim() || "进阶盘",
      city: String(context.city || "").trim() || "未填城市"
    });
    state.displayTheme = String(context.displayTheme || "natal");
    state.displayVariant = String(context.displayVariant || "");
    return state;
  };
  window.__mingxianRenderMainWheel = (chartOrState, context = {}) => {
    if (!chartOrState) return;
    const state = chartOrState.planets && chartOrState.angles && chartOrState.houses ? chartOrState : buildNatalStateFromChart("main", chartOrState, {
      name: String(context.name || "").trim() || "进阶盘",
      city: String(context.city || "").trim() || "未填城市"
    });
    state.displayTheme = String(context.displayTheme || state.displayTheme || "natal");
    state.displayVariant = String(context.displayVariant || state.displayVariant || "");
    astroState.natal = state;
    astroState.transit = null;
    astroState.compareMode = false;
    astroState.compare = null;
    window.__mingxianAstroAspectSource = {
      points: filterPoints(state.planets),
      aspects: filterAspectsByMode(calculateAspects(filterPoints(state.planets), filterPoints(state.planets), true)).slice(0, 24)
    };
    renderModeLabels(state);
    renderPointToggles(state.planets);
    renderWheelLegend();
    renderFocusedPoint();
    renderWheel(state, null);
  };
  window.__mingxianRenderSingleWheel = (chart, context = {}, target = "left") => {
    const targetWheel = target === "right" ? astroRightWheel : astroLeftWheel;
    const targetWrap = targetWheel?.parentElement || null;
    if (!targetWheel || !targetWrap) return;
    if (!chart) {
      targetWrap.innerHTML = `<svg id="${target === "right" ? "astro-right-wheel" : "astro-left-wheel"}" viewBox="0 0 720 720" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${target === "right" ? "右盘" : "左盘"}"><rect x="0" y="0" width="720" height="720" fill="rgba(251,247,240,0.92)"/><text x="360" y="352" text-anchor="middle" font-size="22" fill="#6b5d4f">待选择</text></svg>`;
      if (target === "right") {
        astroRightWheel = document.querySelector("#astro-right-wheel");
      } else {
        astroLeftWheel = document.querySelector("#astro-left-wheel");
      }
      return;
    }
    const state = chart.planets && chart.angles && chart.houses ? chart : buildNatalStateFromChart("single", chart, {
      name: String(context.name || "").trim() || (target === "right" ? "\u53F3\u76D8" : "\u5DE6\u76D8"),
      city: String(context.city || "").trim() || "\u672A\u586B\u57CE\u5E02"
    });
    renderWheel(state, null, { targetWheel, targetWrap, silent: true });
  };
  function fillTransitNow(force = false) {
    if (!force && astroTransitDate?.value) return;
    const tz = String(astroTransitTz?.value || "+02:00").trim() || "+02:00";
    const now = buildNowLocalParts(tz);
    if (astroTransitDate) {
      astroTransitDate.value = `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;
    }
  }
  function updateShiftReadout() {
    if (!astroTransitShiftReadout || !astroTransitShift) return;
    const value = Number(astroTransitShift.value || 0);
    const dateRaw = String(astroTransitDate?.value || "").trim();
    if (!dateRaw) {
      astroTransitShiftReadout.textContent = `\u63A8\u79FB\u5929\u6570 \u00B7 ${value >= 0 ? "+" : ""}${value} \u5929`;
      return;
    }
    const tz = String(astroTransitTz?.value || "+02:00").trim() || "+02:00";
    const baseDate = buildUtcDate(dateRaw, "12:00", tz);
    if (!baseDate) {
      astroTransitShiftReadout.textContent = `\u63A8\u79FB\u5929\u6570 \u00B7 ${value >= 0 ? "+" : ""}${value} \u5929`;
      return;
    }
    const shiftedDate = new Date(baseDate.getTime() + value * 24 * 3600 * 1e3);
    const parts = buildLocalDateParts(shiftedDate, tz);
    const shiftedLabel = `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
    astroTransitShiftReadout.textContent = `${shiftedLabel} \u00B7 ${value >= 0 ? "+" : ""}${value} \u5929`;
  }
  function queueTransitRecalc(immediate = false) {
    if (transitShiftRecalcTimer) {
      window.clearTimeout(transitShiftRecalcTimer);
      transitShiftRecalcTimer = null;
    }
    const run = () => {
      transitShiftRecalcTimer = null;
      astroState.showTransit = true;
      recalcAstro();
    };
    if (immediate) {
      run();
      return;
    }
    transitShiftRecalcTimer = window.setTimeout(run, 90);
  }
  if (astroTransitShift) {
    astroTransitShift.addEventListener("input", () => {
      updateShiftReadout();
      queueTransitRecalc(false);
    });
    astroTransitShift.addEventListener("change", () => {
      updateShiftReadout();
      queueTransitRecalc(true);
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
  if (astroTransitDate) {
    astroTransitDate.addEventListener("change", () => {
      updateShiftReadout();
      astroState.showTransit = true;
      if (!String(astroTransitTz?.value || "").trim() && String(astroTz?.value || "").trim()) {
        astroTransitTz.value = String(astroTz.value || "").trim();
      }
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
  if (astroCity) {
    astroCity.addEventListener("input", () => {
      if (natalSuggestTimer) window.clearTimeout(natalSuggestTimer);
      natalSuggestTimer = window.setTimeout(suggestNatalCities, 260);
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
  [astroDate, astroTime, astroLat, astroLon, astroTz, astroHouseSystem, astroNodeType, astroLilithType, astroPointSet, astroAspectMode, astroOrbScale, astroWheelLayer, astroAspectLines, astroTransitDate, astroTransitTz].forEach((input) => {
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
  if (astroHouseSystem && (uiPrefs.houseSystem === "P" || uiPrefs.houseSystem === "W")) astroHouseSystem.value = uiPrefs.houseSystem;
  if (astroPointSet && uiPrefs.pointSet) astroPointSet.value = uiPrefs.pointSet;
  if (astroAspectMode && uiPrefs.aspectMode) astroAspectMode.value = uiPrefs.aspectMode;
  if (astroOrbScale && uiPrefs.orbScale) astroOrbScale.value = uiPrefs.orbScale;
  hydrateFromUrl();
  if (!new URLSearchParams(window.location.search).has("amode")) {
    setAstroMode(hasNatalInputs() ? "natal" : "live");
  }
  fillTransitNow();
  updateShiftReadout();
  recalcAstro();
})();
