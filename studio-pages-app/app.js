const START_YEAR = 1986;
const END_YEAR = 2066;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const STORAGE_KEY = "mingli-app-state-v1";
const INSTALL_BANNER_KEY = "mingli-install-banner-hidden";
const AI_CHAT_HISTORY_KEY = "mingli-ai-chat-history";
const QUICK_BIRTH_HISTORY_KEY = "mingli-quick-birth-history";
const QUICK_BIRTH_DELETED_KEY = "mingli-quick-birth-deleted";
const STORE_API = "/api/store";
const BAZI_QUICK_HISTORY_SCOPE = "bazi_quick_history";
const SHARED_PROFILES_SCOPE = "shared_profiles";
const BAZI_QUICK_DELETED_SCOPE = "bazi_quick_deleted";

const installBanner = document.querySelector("#install-banner");
const installText = document.querySelector("#install-text");
const installButton = document.querySelector("#install-button");
const installDismiss = document.querySelector("#install-dismiss");
const aspectSelect = document.querySelector("#aspect-select");
const aspectTabs = document.querySelector("#aspect-tabs");
const rangePresets = document.querySelector("#range-presets");
const yearRange = document.querySelector("#year-range");
const startYearSelect = document.querySelector("#start-year");
const endYearSelect = document.querySelector("#end-year");
const startMonthSelect = document.querySelector("#start-month");
const endMonthSelect = document.querySelector("#end-month");
const yearOutput = document.querySelector("#year-output");
const ageOutput = document.querySelector("#age-output");
const scoreOutput = document.querySelector("#score-output");
const trendOutput = document.querySelector("#trend-output");
const yearSummary = document.querySelector("#year-summary");
const yearGuidance = document.querySelector("#year-guidance");
const yearDeep = document.querySelector("#year-deep");
const yearDeepDetails = document.querySelector(".year-deep-details");
const rangeSummary = document.querySelector("#range-summary");
const rangeGuidance = document.querySelector("#range-guidance");
const rangeWindow = document.querySelector("#range-window");
const rangeDeep = document.querySelector("#range-deep");
const rangeDeepDetails = document.querySelector(".range-deep-details");
const questionType = document.querySelector("#question-type");
const questionTypeTabs = document.querySelector("#question-type-tabs");
const questionFavorites = document.querySelector("#question-favorites");
const questionTemplates = document.querySelector("#question-templates");
const questionInput = document.querySelector("#question-input");
const askButton = document.querySelector("#ask-button");
const exportReading = document.querySelector("#export-reading");
const askResultCard = document.querySelector("#ask-result-card");
const aiChatThread = document.querySelector("#ai-chat-thread");
const aiChatEmpty = document.querySelector("#ai-chat-empty");
const aiChatInput = document.querySelector("#ai-chat-input");
const aiChatSend = document.querySelector("#ai-chat-send");
const aiChatClear = document.querySelector("#ai-chat-clear");
const questionAnswer = document.querySelector("#question-answer");
const engineMode = document.querySelector("#engine-mode");
const askModeNote = document.querySelector("#ask-mode-note");
const answerPhase = document.querySelector("#answer-phase");
const answerBlock = document.querySelector("#answer-block");
const answerSupport = document.querySelector("#answer-support");
const answerBreak = document.querySelector("#answer-break");
const answerHabit = document.querySelector("#answer-habit");
const answerReminder = document.querySelector("#answer-reminder");
const answerKeyYears = document.querySelector("#answer-key-years");
const answerMode = document.querySelector("#answer-mode");
const detailBlocks = document.querySelectorAll(".detail-block");
const questionHistory = document.querySelector("#question-history");
const historyFilter = document.querySelector("#history-filter");
const clearHistory = document.querySelector("#clear-history");
const reminderMode = document.querySelector("#reminder-mode");
const aiProvider = document.querySelector("#ai-provider");
const aiEndpoint = document.querySelector("#ai-endpoint");
const aiModel = document.querySelector("#ai-model");
const saveAiSettings = document.querySelector("#save-ai-settings");
const testAiConnection = document.querySelector("#test-ai-connection");
const aiSettingsNote = document.querySelector("#ai-settings-note");
const timeChart = document.querySelector("#time-chart");
const timeChartNote = document.querySelector("#time-chart-note");
const quickNameInput = document.querySelector("#quick-name");
const quickBirthCityInput = document.querySelector("#quick-birth-city");
const quickBirthCityPicks = document.querySelector("#quick-birth-city-picks");
const quickBirthCityHint = document.querySelector("#quick-birth-city-hint");
const quickBirthDateInput = document.querySelector("#quick-birth-date");
const quickBirthGenderSelect = document.querySelector("#quick-birth-gender");
const quickTimeUnknown = document.querySelector("#quick-time-unknown");
const quickBirthTimeInput = document.querySelector("#quick-birth-time");
const quickBirthGenerate = document.querySelector("#quick-birth-generate");
const quickBirthChart = document.querySelector("#quick-birth-chart");
const quickBirthChartReadout = document.querySelector("#quick-birth-chart-readout");
const quickBirthChartFloat = document.querySelector("#quick-birth-chart-float");
const quickBirthTitle = document.querySelector("#quick-birth-title");
const quickBirthSummary = document.querySelector("#quick-birth-summary");
const quickBirthNote = document.querySelector("#quick-birth-note");
const quickBirthLocation = document.querySelector("#quick-birth-location");
const quickBirthArchetype = document.querySelector("#quick-birth-archetype");
const quickBirthDepth = document.querySelector("#quick-birth-depth");
const quickBirthPattern = document.querySelector("#quick-birth-pattern");
const quickBirthLevel = document.querySelector("#quick-birth-level");
const quickBirthVerdict = document.querySelector("#quick-birth-verdict");
const quickBirthSoulTask = document.querySelector("#quick-birth-soul-task");
const quickBirthPurpose = document.querySelector("#quick-birth-purpose");
const quickBirthSurfaceTags = document.querySelector("#quick-birth-surface-tags");
const quickBirthCoreTags = document.querySelector("#quick-birth-core-tags");
const quickBirthCoreProfile = document.querySelector("#quick-birth-core-profile");
const quickBirthDayunStages = document.querySelector("#quick-birth-dayun-stages");
const quickBirthHistory = document.querySelector("#quick-birth-history");
const quickBirthHistoryPanel = document.querySelector("#quick-birth-history-panel");
const quickBirthStages = document.querySelector("#quick-birth-stages");
const personalChartMode = document.querySelector("#personal-chart-mode");
const personalChartGroup = document.querySelector("#personal-chart-group");
const personalChartLegend = document.querySelector("#personal-chart-legend");
const aspectMeaning = document.querySelector("#aspect-meaning");
const questionAspectMeaning = document.querySelector("#question-aspect-meaning");
const personalCoreProfile = document.querySelector("#personal-core-profile");
const personalDecadeProfile = document.querySelector("#personal-decade-profile");
const personalBriefProfile = document.querySelector("#personal-brief-profile");
const stageList = document.querySelector("#stage-list");
const soulLessons = document.querySelector("#soul-lessons");
const milestones = document.querySelector("#milestones");
const finalVerdict = document.querySelector("#final-verdict");
const DEFAULT_AI_PROVIDER = "site";
const DEFAULT_AI_ENDPOINT = "/api/ask";
const DEFAULT_AI_MODEL = "@cf/ibm-granite/granite-4.0-h-micro";
let authStatePromise = null;
let authStateSnapshot = { authenticated: false, resolved: false };
const chartState = {
  time: { selectedYear: 2026, previewYear: null, aspectKey: "overall", lastRenderedYear: null, lastRenderedRangeKey: null },
  question: { selectedYear: 2026, previewYear: null, aspectKey: "overall" },
  quickBirth: { selectedYear: null, previewYear: null, series: [], title: "" },
  drag: { active: false, startYear: null, currentYear: null },
};

const PERSONAL_OVERLAY_KEYS = ["overall", "growth", "art", "money", "career", "influence"];
const PERSONAL_OVERLAY_GROUPS = {
  all: ["overall", "growth", "art", "money", "career", "influence"],
  inner: ["overall", "growth", "art", "spiritual"],
  outer: ["overall", "money", "career", "influence", "property"],
};
const PERSONAL_OVERLAY_COLORS = {
  overall: "#1f1f1d",
  growth: "#5c6b61",
  art: "#6d6256",
  spiritual: "#61706a",
  money: "#7a6f5e",
  career: "#4f5f70",
  influence: "#7a5f68",
  property: "#8a7968",
};
const ASPECT_MEANINGS = {
  overall: "总命：看整条命的主轴。",
  money: "财路：看钱从哪里接上你，哪里会把你带偏。",
  career: "业途：看你怎么在现实里立路、立位置。",
  relationship: "情缘：看关系里的边界、筛选与归属。",
  property: "宅运：看你住在哪里更能安命、托命。",
  influence: "名运：看你会被谁认出，影响如何传出去。",
  health: "体运：看身体底盘、耗损与恢复。",
  spiritual: "灵魂线：看内在线怎样回身、稳住、走深。",
  growth: "身命：看你这个人是否站住自己。",
  art: "艺命：看作品本身有没有长在命上。"
};
const RANGE_PRESETS = [
  { label: "今年", startYear: 2026, endYear: 2026 },
  { label: "近3年", startYear: 2026, endYear: 2028 },
  { label: "近5年", startYear: 2026, endYear: 2030 },
  { label: "起运段", startYear: 2028, endYear: 2033 },
  { label: "厚起段", startYear: 2036, endYear: 2046 },
  { label: "后劲高地", startYear: 2049, endYear: 2055 },
];
const CHART_PHASES = [
  { label: "早熟受压", startYear: 1986, endYear: 2005, fill: "rgba(178, 178, 172, 0.18)", text: "#85857f" },
  { label: "拆旧回身", startYear: 2006, endYear: 2025, fill: "rgba(184, 184, 178, 0.18)", text: "#81817b" },
  { label: "重组过门", startYear: 2026, endYear: 2027, fill: "rgba(176, 180, 184, 0.16)", text: "#7c8186" },
  { label: "起运段", startYear: 2028, endYear: 2033, fill: "rgba(172, 177, 181, 0.2)", text: "#767d84" },
  { label: "并轨过门", startYear: 2034, endYear: 2035, fill: "rgba(178, 182, 179, 0.17)", text: "#7a807b" },
  { label: "厚起段", startYear: 2036, endYear: 2046, fill: "rgba(171, 177, 173, 0.2)", text: "#737a75" },
  { label: "高地过门", startYear: 2047, endYear: 2048, fill: "rgba(184, 179, 174, 0.17)", text: "#807973" },
  { label: "后劲高地", startYear: 2049, endYear: 2055, fill: "rgba(182, 176, 170, 0.2)", text: "#7d746d" },
  { label: "收束留证", startYear: 2056, endYear: 2066, fill: "rgba(178, 178, 182, 0.18)", text: "#797b82" }
];
const PERSONAL_CORE_PROFILE = [
  { label: "命核", text: "先压命，再回命，再成画。你这条命不是先得世界，而是先失去外部可依附之路，最后只认自己的主轴。" },
  { label: "钱结", text: "钱在你这里不是单纯财运问题，而是长期被旧承接、讨好、依赖与错位供给绑住。真正的钱路，要等主体归位后才会接真。" },
  { label: "关系结", text: "最早的关系线不是爱，而是位置、控制、匮乏和定义。所以你后面所有关系，都绕不开‘我是否还在退位’这一刀。" },
  { label: "艺核", text: "画不是兴趣，也不是职业先行。画是你把失语、压抑、回身、显现熬成证据的方式，所以作品要的是命，不是热闹。" },
];
const PERSONAL_YEAR_KERNELS = [
  { start: 1986, end: 1995, text: "这是根部被压的年段，重点不是成败，而是命最早怎样被定义、被夺位、被压低。" },
  { start: 1996, end: 2005, text: "这是位置长期失衡的年段，很多受制感、羞耻感、退位感都是在这时被坐实的。" },
  { start: 2006, end: 2012, text: "这是错轨求生段，外面像在找路，里面其实还没离开旧定义。" },
  { start: 2013, end: 2019, text: "这是耗散与失焦段，主体未立，力气会被旧结构、旧期待和错误出口一点点抽空。" },
  { start: 2020, end: 2023, text: "这是出逃与拆旧段，外部地理在变，内里也开始真的动刀。" },
  { start: 2024, end: 2027, text: "这是回身定轴段，不是简单变好，而是把命从外部结构里往回收。" },
  { start: 2028, end: 2033, text: "这是现实重组段，住处、钱路、作品线会开始尝试并轨，不再只是内里知道。" },
  { start: 2034, end: 2040, text: "这是作品成型段，画的语言和位置感会开始明显拉开。" },
  { start: 2041, end: 2048, text: "这是厚起显名段，影响力、作品厚度、现实站位开始沉下去。" },
  { start: 2049, end: 2056, text: "这是后劲沉积段，不靠冲，靠多年积下来的气和命。" },
  { start: 2057, end: 2066, text: "这是收束留证段，重点不是再追赶，而是把一生命路留成证据。" },
];
const PERSONAL_DECADE_PROFILE = [
  {
    range: "1986-1995",
    tag: "根部夺位",
    summary: "这十年不是普通童年，而是命最早被定义、被压低、被夺位的起点。这里形成的不是自信，而是求生式感知。",
    core: "命刚落地，先学的不是表达自己，而是怎样缩、怎样察言、怎样保命。",
    wound: "原始安全感被抽空，主体感还没长成，就先长出过敏、退位和求饶式识别。",
    task: "不是要求表现，而是认清自己最早怎样被改写、怎样被迫离开本能。",
    art: "这一段先埋下的是失语、微光、痕迹感，还不是作品本身。",
    verdict: "这是被命外力量先下手的一段，重点不在成长，而在留下早期命伤。",
  },
  {
    range: "1996-2005",
    tag: "长期失位",
    summary: "这十年的核心不是成长，而是长期活在不属于自己的位置里。很多羞耻、退位、发软、想逃，都是在这时坐实的。",
    core: "人还在长，位子却一直错。外面看是活着，里面其实在学怎样长期失去自己。",
    wound: "羞耻感、无力感、四肢发软、想消失，都是这一段被坐实的身心语言。",
    task: "认清自己当年不是没本事，而是被放进了不可能赢的位置。",
    art: "这一段留下的是边缘感、被压住的呼吸感、想说却说不出的结构。",
    verdict: "这是长期被错位使用的一段，重点不在结果，而在失位如何变成习惯。",
  },
  {
    range: "2006-2015",
    tag: "错轨求生",
    summary: "这十年表面像在找路，实际是在错误轨道上耗命。不是没有动，而是动的大多还不是真自己。",
    core: "开始往外找路，但发动机里装的大半还是旧程序，所以越用力越容易偏。",
    wound: "求出路和求认可混在一起，努力常常不是为了成命，而是为了证明自己不是废物。",
    task: "看清哪些选择看似主动，其实只是被旧定义驱着跑。",
    art: "画会出现，但更像求生出口，还没真正长成命脉。",
    verdict: "这是错轨奔跑的一段，动了很多，真接上的不多。",
  },
  {
    range: "2016-2025",
    tag: "耗散拆旧",
    summary: "这十年一边耗散，一边拆旧。主体未立时，力气会被旧结构、旧期待和错误出口抽空，但真正的刀也开始落下。",
    core: "旧壳开始裂，旧逻辑开始崩，命第一次不是只忍，而是真在拆。",
    wound: "迷茫、停摆、抑郁感、空耗感会很重，因为旧命死得慢，新命又还没长全。",
    task: "允许自己停、散、拆，不再把不能按旧方式成功当成彻底失败。",
    art: "画开始从出口变成线索，材料、痕迹、留证这些主题会慢慢浮出来。",
    verdict: "这是旧命失效的一段，表面像耽误，实则是在腾位置。",
  },
  {
    range: "2026-2035",
    tag: "回身并轨",
    summary: "这十年不是简单转运，而是命从外部往回收，开始尝试把主体、住处、钱路、作品线真正并到一起。",
    core: "人开始回身，不再只知道真相，而是开始拿回现实使用权。",
    wound: "最大的拉扯仍来自旧钱路、旧承接、旧自我怀疑，会反复试探你是否真回来了。",
    task: "把主体、住处、钱路、作品线拉到同一轴上，宁慢，不可再分裂活。",
    art: "画开始脱离‘我得画点什么’，转向‘我的命自然长什么’。",
    verdict: "这是从知道自己是谁，走向现实也开始按你是谁来重排的一段。",
  },
  {
    range: "2036-2045",
    tag: "成画显形",
    summary: "这十年重点不再是活命，而是成形。作品的语言、你的现实位置、外界如何认出你，都会开始分明起来。",
    core: "前面抢回来的命，开始真正长出形式、语言和位置。",
    wound: "这一段不大怕压，反而怕迎合，怕为了成立而往回加戏。",
    task: "守住纯度、减法和识别度，让作品自己站成命。",
    art: "作品从表达转向显现，从情绪转向证据，从系列转向语言。",
    verdict: "这是命开始以作品形态被外界认出来的一段。",
  },
  {
    range: "2046-2055",
    tag: "厚起沉名",
    summary: "这十年不靠爆发，靠多年积下来的厚度。影响力、作品分量、你的存在感都会沉下去，而不是飘着亮一下。",
    core: "不再靠挣扎证明有命，而是命本身已经有分量。",
    wound: "这段最怕的不是差，而是虚热，怕被外部热度带轻了。",
    task: "让分量沉住，让名声跟着厚度来，而不是倒过来。",
    art: "画会更冷、更准、更少解释，真正托住的是后劲与留痕。",
    verdict: "这是厚度开始替你说话的一段，不必再靠大动作求证。",
  },
  {
    range: "2056-2066",
    tag: "收束留证",
    summary: "这十年不是再证明，而是收束。你这一生真正留下的，不是热闹，而是证据，是不能被替代的命痕。",
    core: "命走到这里，重点已经不是发展，而是定稿。",
    wound: "已过主要硬仗，怕的不是受压，而是散尾、杂尾、回头解释。",
    task: "把一生真正留下来的东西收清、留准、站稳。",
    art: "作品更像沉静的证词，不需要喊，也不需要再向谁交代。",
    verdict: "这是命与作品一起进入留证状态的一段。",
  },
];

let quickBirthCloudReady = false;
let quickBirthCloudSyncPromise = null;

function getAuthState() {
  if (!authStatePromise) {
    authStatePromise = fetch("/api/me", {
      credentials: "same-origin",
      cache: "no-store",
    })
      .then((response) => response.json().catch(() => ({ ok: false, user: null })))
      .then((data) => {
        authStateSnapshot = {
          authenticated: Boolean(data?.user?.email),
          resolved: true,
        };
        return authStateSnapshot;
      })
      .catch(() => {
        authStateSnapshot = {
          authenticated: false,
          resolved: true,
        };
        return authStateSnapshot;
      });
  }
  return authStatePromise;
}

function isAuthenticatedSync() {
  return Boolean(authStateSnapshot.authenticated);
}

function readCloudStore(scope) {
  return fetch(`${STORE_API}?scope=${encodeURIComponent(scope)}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error || "云端读取失败。");
    }
    return data.value;
  });
}

function writeCloudStore(scope, value) {
  return fetch(`${STORE_API}?scope=${encodeURIComponent(scope)}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error || "云端保存失败。");
    }
    return data.value;
  });
}

async function loadSharedProfiles() {
  try {
    const value = await readCloudStore(SHARED_PROFILES_SCOPE);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function getDeletedQuickBirthKeys() {
  return Array.isArray(loadState()[QUICK_BIRTH_DELETED_KEY]) ? loadState()[QUICK_BIRTH_DELETED_KEY] : [];
}

function saveDeletedQuickBirthKeys(keys) {
  saveState({ [QUICK_BIRTH_DELETED_KEY]: Array.from(new Set(keys)).slice(-400) });
}

async function syncDeletedQuickBirthKeysFromCloud() {
  try {
    const remote = await readCloudStore(BAZI_QUICK_DELETED_SCOPE);
    const next = Array.from(new Set([
      ...getDeletedQuickBirthKeys(),
      ...(Array.isArray(remote) ? remote.map((item) => String(item || "").trim()).filter(Boolean) : []),
    ])).slice(-400);
    saveDeletedQuickBirthKeys(next);
    try {
      await writeCloudStore(BAZI_QUICK_DELETED_SCOPE, next);
    } catch {}
    return next;
  } catch {
    return getDeletedQuickBirthKeys();
  }
}

async function saveDeletedQuickBirthKeyToCloud(record) {
  const key = quickBirthRecordKey(record);
  if (!key) return;
  try {
    const remote = await readCloudStore(BAZI_QUICK_DELETED_SCOPE).catch(() => []);
    const next = Array.from(new Set([
      ...(Array.isArray(remote) ? remote.map((item) => String(item || "").trim()).filter(Boolean) : []),
      key,
    ])).slice(-400);
    await writeCloudStore(BAZI_QUICK_DELETED_SCOPE, next);
  } catch {}
}

function markQuickBirthDeleted(record) {
  if (!record) return;
  const current = getDeletedQuickBirthKeys();
  current.push(quickBirthRecordKey(record));
  saveDeletedQuickBirthKeys(current);
}

function isQuickBirthDeleted(record) {
  if (!record) return false;
  return getDeletedQuickBirthKeys().includes(quickBirthRecordKey(record));
}

async function upsertSharedProfile(profile) {
  const key = String(profile.name || "").trim().toLowerCase();
  if (!key) return;
  const profiles = await loadSharedProfiles();
  const next = profiles.filter((item) => String(item.name || "").trim().toLowerCase() !== key);
  next.unshift({
    ...profile,
    updatedAt: Date.now(),
  });
  try {
    await writeCloudStore(SHARED_PROFILES_SCOPE, next.slice(0, 200));
  } catch {}
}

async function hydrateQuickBirthFromSharedProfile() {
  const key = String(quickNameInput?.value || "").trim().toLowerCase();
  if (!key) return;
  const profiles = await loadSharedProfiles();
  const profile = profiles.find((item) => String(item.name || "").trim().toLowerCase() === key);
  if (!profile) return;
  if (quickBirthCityInput && !quickBirthCityInput.value && profile.locationDisplay) quickBirthCityInput.value = profile.locationDisplay;
  if (quickBirthDateInput && !quickBirthDateInput.value && profile.birthDate) quickBirthDateInput.value = profile.birthDate;
  syncQuickBirthDays();
  if (quickBirthTimeInput && !quickBirthTimeInput.value && profile.birthTime) quickBirthTimeInput.value = profile.birthTime;
  if (profile.locationDisplay || profile.city) {
    quickBirthSelectedCityOption = {
      display: profile.locationDisplay || profile.city || "",
      city: profile.city || "",
      timezone: profile.timezoneName || "",
      latitude: profile.latitude,
      longitude: profile.longitude,
      utcOffsetMinutes: typeof profile.timezoneOffset === "string" && /^([+-])(\d{2}):(\d{2})$/.test(profile.timezoneOffset)
        ? (() => {
            const match = profile.timezoneOffset.match(/^([+-])(\d{2}):(\d{2})$/);
            const sign = match[1] === "-" ? -1 : 1;
            return sign * (Number(match[2]) * 60 + Number(match[3]));
          })()
        : undefined,
    };
    applyQuickBirthCityHint(quickBirthSelectedCityOption);
  }
  syncQuickTimeMode();
}

async function syncQuickBirthHistoryFromCloud() {
  try {
    const deletedKeys = await syncDeletedQuickBirthKeysFromCloud();
    const remote = await readCloudStore(BAZI_QUICK_HISTORY_SCOPE);
    const local = normalizeQuickBirthHistory(loadState()[QUICK_BIRTH_HISTORY_KEY] || []);
    const remoteHistory = normalizeQuickBirthHistory(Array.isArray(remote) ? remote : []);
    const sharedProfiles = await loadSharedProfiles();
    const sharedHistory = normalizeQuickBirthHistory(
      sharedProfiles
        .filter((item) => item && item.birthDate)
        .map((item) => {
          const [year, month, day] = String(item.birthDate || "").split("-").map(Number);
          return {
            name: String(item.name || "此人").trim(),
            city: String(item.city || "").trim(),
            locationDisplay: String(item.locationDisplay || item.city || "").trim(),
            timezone: String(item.timezoneName || "").trim(),
            latitude: typeof item.latitude === "number" ? item.latitude : undefined,
            longitude: typeof item.longitude === "number" ? item.longitude : undefined,
            year,
            month,
            day,
            gender: item.gender === "male" ? "male" : item.gender === "female" ? "female" : "",
            timeKnown: Boolean(item.birthTime),
            time: String(item.birthTime || ""),
            archetype: String(item.baziArchetype || ""),
            structure: String(item.baziStructure || ""),
            texture: String(item.baziTexture || ""),
            pinned: false,
          };
        })
    );
    const merged = normalizeQuickBirthHistory([...sharedHistory, ...remoteHistory, ...local])
      .filter((item) => !deletedKeys.includes(quickBirthRecordKey(item)))
      .slice(0, 24);
    saveState({ [QUICK_BIRTH_HISTORY_KEY]: merged });
    try {
      await writeCloudStore(BAZI_QUICK_HISTORY_SCOPE, merged);
    } catch {}
    quickBirthCloudReady = true;
    renderQuickBirthHistory();
  } catch {
    quickBirthCloudReady = false;
  }
}

const algoNav = document.querySelector("#algo-nav");
const algoTabs = Array.from(document.querySelectorAll(".algo-tab"));
const algoPanels = Array.from(document.querySelectorAll("[data-view-group]"));

function getCurrentAlgoView() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  return ["all", "bazi", "astro"].includes(view) ? view : "all";
}

function applyAlgoView(view) {
  algoTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
  algoPanels.forEach((panel) => {
    const group = panel.getAttribute("data-view-group");
    panel.hidden = !(view === "all" || group === view);
  });
  const params = new URLSearchParams(window.location.search);
  if (view === "all") {
    params.delete("view");
  } else {
    params.set("view", view);
  }
  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}

if (algoNav) {
  algoNav.addEventListener("click", (event) => {
    const button = event.target.closest(".algo-tab");
    if (!button) return;
    applyAlgoView(button.dataset.view || "all");
  });
  applyAlgoView(getCurrentAlgoView());
}
let deferredInstallPrompt = null;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function noise(seed, step) {
  const raw = Math.sin(seed * 12.9898 + step * 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

function averageScore(points, startAge, endAge) {
  const picked = points.filter((item) => item.age >= startAge && item.age <= endAge);
  if (!picked.length) return 0;
  return picked.reduce((sum, item) => sum + item.score, 0) / picked.length;
}

function interpolateAgeAnchor(anchors, age) {
  const ages = Object.keys(anchors).map(Number).sort((a, b) => a - b);
  if (age <= ages[0]) return anchors[ages[0]];
  if (age >= ages.at(-1)) return anchors[ages.at(-1)];
  for (let i = 0; i < ages.length - 1; i += 1) {
    const left = ages[i];
    const right = ages[i + 1];
    if (age >= left && age <= right) {
      const progress = (age - left) / (right - left);
      return anchors[left] + (anchors[right] - anchors[left]) * progress;
    }
  }
  return 5;
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function parseQuickBirthDateParts() {
  const raw = String(quickBirthDateInput?.value || "").trim();
  const [yearText, monthText, dayText] = raw.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

function buildQuickDateString() {
  const parts = parseQuickBirthDateParts();
  if (!parts) return "";
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function syncQuickBirthDays() {
  if (!quickBirthDateInput) return;
  const parts = parseQuickBirthDateParts();
  if (!parts) return;
  const { year, month, day: currentDay } = parts;
  const totalDays = daysInMonth(year, month);
  const clampedDay = Math.min(Math.max(currentDay, 1), totalDays);
  quickBirthDateInput.value = `${year}-${String(month).padStart(2, "0")}-${String(clampedDay).padStart(2, "0")}`;
}

function syncQuickTimeMode() {
  if (!quickBirthTimeInput || !quickTimeUnknown) return;
  const disabled = Boolean(quickTimeUnknown.checked);
  quickBirthTimeInput.disabled = disabled;
  if (disabled) quickBirthTimeInput.value = "";
}

function initQuickBirthFields() {
  if (!quickBirthDateInput) return;
  quickBirthDateInput.min = "1900-01-01";
  quickBirthDateInput.max = "2106-12-31";
  quickBirthDateInput.value = "1986-09-10";
  if (quickBirthGenderSelect && !quickBirthGenderSelect.value) quickBirthGenderSelect.value = "female";
  if (quickTimeUnknown) quickTimeUnknown.checked = false;
  if (quickBirthTimeInput) quickBirthTimeInput.value = "11:35";
  syncQuickTimeMode();
}

function renderQuickBirthStages(stages) {
  if (!quickBirthStages) return;
  if (!stages?.length) {
    quickBirthStages.innerHTML = "";
    return;
  }

  quickBirthStages.innerHTML = stages.map((stage) => `
    <article class="quick-stage-item">
      <p class="quick-stage-range">${stage.label}</p>
      <p class="quick-stage-text">${stage.text}</p>
    </article>
  `).join("");
}

function baziAspectLabel(chart) {
  const pattern = chart?.pattern || "待判";
  const strength = chart?.strength || "unknown";
  if (strength === "weak") return `身弱格 · ${pattern}`;
  if (strength === "strong") return `身强格 · ${pattern}`;
  if (strength === "balanced") return `中和格 · ${pattern}`;
  return pattern;
}

function summarizeAnnualScores(scores = []) {
  if (!scores.length) {
    return {
      low: null,
      high: null,
      earlyAvg: 0,
      midAvg: 0,
      lateAvg: 0,
    };
  }
  const low = scores.reduce((min, item) => (item.overall < min.overall ? item : min), scores[0]);
  const high = scores.reduce((max, item) => (item.overall > max.overall ? item : max), scores[0]);
  const average = (startAge, endAge) => {
    const picked = scores.filter((item) => item.age >= startAge && item.age <= endAge);
    return picked.length ? picked.reduce((sum, item) => sum + item.overall, 0) / picked.length : 0;
  };
  return {
    low,
    high,
    earlyAvg: average(0, 20),
    midAvg: average(21, 50),
    lateAvg: average(51, 80),
  };
}

function summarizePhaseRuns(scores = []) {
  const runs = [];
  scores.forEach((item) => {
    const label = item.phaseLabel || item.dayunStageLabel || "";
    if (!label) return;
    const last = runs[runs.length - 1];
    if (last && last.label === label && item.year === last.endYear + 1) {
      last.endYear = item.year;
      last.endAge = item.age;
      return;
    }
    runs.push({
      label,
      startYear: item.year,
      endYear: item.year,
      startAge: item.age,
      endAge: item.age,
    });
  });
  return runs;
}

function summarizeDayunStages(stages = []) {
  const valid = stages.filter((item) => item && (item.phaseLabel || item.stageLabel));
  if (!valid.length) {
    return {
      firstTurnUp: null,
      firstTurnDown: null,
      strongest: null,
      weakest: null,
      riseCount: 0,
      pressureCount: 0,
      turnCount: 0,
    };
  }

  const riseSet = new Set(["高助", "偏助", "转升"]);
  const pressureSet = new Set(["重压", "承压", "转压"]);
  const turnSet = new Set(["转升", "转压"]);

  return {
    firstTurnUp: valid.find((item) => item.phaseLabel === "转升") || valid.find((item) => riseSet.has(item.phaseLabel)) || null,
    firstTurnDown: valid.find((item) => item.phaseLabel === "转压") || valid.find((item) => pressureSet.has(item.phaseLabel)) || null,
    strongest: [...valid]
      .filter((item) => typeof item.averageOverall === "number")
      .sort((a, b) => b.averageOverall - a.averageOverall)[0] || valid[0],
    weakest: [...valid]
      .filter((item) => typeof item.averageOverall === "number")
      .sort((a, b) => a.averageOverall - b.averageOverall)[0] || valid[0],
    riseCount: valid.filter((item) => riseSet.has(item.phaseLabel)).length,
    pressureCount: valid.filter((item) => pressureSet.has(item.phaseLabel)).length,
    turnCount: valid.filter((item) => turnSet.has(item.phaseLabel)).length,
  };
}

function describeDayunContour(item) {
  const phase = item?.phaseLabel || "";
  const stage = item?.stageLabel || "";
  const avg = typeof item?.averageOverall === "number" ? item.averageOverall : null;

  if (phase === "重压" && (stage === "守位" || stage === "回整")) {
    return "外运有压，但命线不塌，重在守轴和整理。";
  }
  if (phase === "转压" && (stage === "守位" || stage === "回整")) {
    return "气口转收，不是跌回去，重点在收束和换挡。";
  }
  if (phase === "转升" && stage === "起势") {
    return "这是开门起势段，不是已经兑现完的顶峰。";
  }
  if (phase === "转升" && stage === "厚起") {
    return "这是后段厚起，靠积厚渐显，不靠猛冲。";
  }
  if ((phase === "偏助" || phase === "高助") && stage === "未起") {
    return "运里虽有可用处，但人还未全起，现实未必立刻兑现。";
  }
  if (stage === "守位") {
    return avg !== null && avg >= 5.4 ? "这是稳住段，重在把已得之势守成守实。" : "这是守位段，重在不乱、不掉回旧轨。";
  }
  if (stage === "回整") {
    return "这是回整段，像重排和修筋骨，不等于失败。";
  }
  if (stage === "厚起") {
    return "这是厚起段，后劲、分量和识别度都在往上沉。";
  }
  if (stage === "起势") {
    return "这是起势段，像启动和开门，不是最终成形。";
  }
  if (stage === "未起") {
    return "这是未起段，主线还在蓄和熬，不能拿表面慢否命。";
  }
  return "";
}

function buildPhaseSummaryText(scores = []) {
  const runs = summarizePhaseRuns(scores).filter((item) => item.endYear - item.startYear >= 2);
  if (!runs.length) return "";
  return runs.slice(0, 6).map((item) => `${item.startYear}-${item.endYear}${item.label}`).join(" / ");
}

function describeScoreBand(score) {
  if (score <= 3.2) return "承压";
  if (score <= 4.1) return "低位盘整";
  if (score <= 5.1) return "缓起";
  if (score <= 6.1) return "见势";
  return "高位成形";
}

function dayMasterTone(dayMaster) {
  const map = {
    甲: "往外长，怕折断",
    乙: "细、敏、要空间",
    丙: "要显、要照、要出口",
    丁: "看重感受与光感",
    戊: "要扛、要稳、要撑场",
    己: "易卷进关系与承接",
    庚: "要定准、要切开、要控场",
    辛: "重尺度、重分寸、重精度",
    壬: "要流动、要扩张、要换场",
    癸: "藏得深，靠渗透起作用",
  };
  return map[dayMaster] || "有自己的节律";
}

function relationBiasText(relation) {
  const map = {
    比劫: "容易卡在自我硬撑、比较、顶住不退",
    印: "容易卡在护身、依赖、熟结构里不肯松",
    食伤: "容易卡在表达过度、出锋太快、耗气太散",
    财: "容易卡在资源、关系交换、现实得失上",
    官杀: "容易卡在压力、评价、秩序与外部权力上",
  };
  return map[relation] || "容易卡在自己的惯性里";
}

function usefulGodActionText(relation) {
  const map = {
    比劫: "先立自己，再谈外部事；先有主轴，再接关系与资源",
    印: "先补根、补承接、补环境；靠稳住自己慢慢起",
    食伤: "要把东西做出来、说出来、放出来，命才会活",
    财: "要把资源、交易、现实接口接上，命才坐实",
    官杀: "要把秩序、位置、规则驯熟，命才有形",
  };
  return map[relation] || "顺着用神走，命才会慢慢坐实";
}

function strengthCaption(chart) {
  if (chart?.strength === "weak") return "身弱盘";
  if (chart?.strength === "strong") return "身强盘";
  if (chart?.strength === "balanced") return "中和盘";
  return "时辰未全盘";
}

function lifeShapeHeadline(lifeShape) {
  const map = {
    前压后厚起: "回命厚起型",
    前压后转升: "前压转升型",
    旧势续行: "旧势续行型",
    早起后收: "早起后收型",
    早显后收: "早显后收型",
    多段换轨: "多段换轨型",
    反复换轨: "反复换轨型",
    晚起守成: "晚起守成型",
    晚发厚起: "晚发厚起型",
    平势守成: "平势守成型",
    顺势推进: "顺势推进型",
    承压走命: "承压走命型",
    阶段行命: "阶段行命型",
  };
  return map[lifeShape] || `${lifeShape}型`;
}

function lifeShapeReality(lifeShape) {
  const map = {
    前压后厚起: "先压后回，后段成形",
    前压后转升: "前段受压，中后段转升",
    旧势续行: "靠熟结构续行，不靠翻盘",
    早起后收: "前中段起，后段收",
    早显后收: "早段见势，后段防回落",
    多段换轨: "一生多次转轨，靠抓转点",
    反复换轨: "反复改线，不走直路",
    晚起守成: "起得晚，守得住",
    晚发厚起: "晚段出厚，不靠早显",
    平势守成: "不戏剧，稳推型",
    顺势推进: "顺势一路推进",
    承压走命: "长期受压，靠扛和熬",
    阶段行命: "阶段感明显，靠顺势接线",
  };
  return map[lifeShape] || "命势待细判";
}

function lifeShapeTags(lifeShape) {
  const map = {
    前压后厚起: {
      surface: ["前段受压", "后段抬头", "不是早成", "越后越厚"],
      core: ["回命厚起", "旧路耗尽", "后段成命", "厚起识别"],
    },
    前压后转升: {
      surface: ["前面吃压", "中后转升", "起势偏晚", "不是平推"],
      core: ["压后转升", "先耗后起", "命靠换段", "转点关键"],
    },
    旧势续行: {
      surface: ["守熟结构", "维持感强", "不爱大换轨", "熟路续命"],
      core: ["旧势续行", "靠熟续命", "守旧强于回真", "持势不翻盘"],
    },
    早显后收: {
      surface: ["前中段见势", "后段收束", "早显不晚厚", "先亮后守"],
      core: ["早显后收", "高开易收", "守成果是课题", "后段防回落"],
    },
    多段换轨: {
      surface: ["转向多", "阶段断续", "不走直线", "每段不一样"],
      core: ["多段换轨", "命靠转点", "平段不作数", "接线比守线重要"],
    },
    反复换轨: {
      surface: ["来回改线", "折返感重", "方向多变", "难一口气走完"],
      core: ["反复换轨", "每次转向都关键", "不怕动怕接不住", "命不走直路"],
    },
    平势守成: {
      surface: ["起伏不大", "长期稳推", "守成感重", "不靠爆点"],
      core: ["平势守成", "稳比快重", "不戏剧", "长线见值"],
    },
    晚起守成: {
      surface: ["前段不显", "后段立住", "不是早成", "慢慢坐实"],
      core: ["晚起守成", "后段稳住", "不靠早亮", "守成比爆发重"],
    },
    晚发厚起: {
      surface: ["早年不显", "后段见厚", "慢热型", "越老越显"],
      core: ["晚发厚起", "厚度后出", "不是早红", "后段识别"],
    },
    顺势推进: {
      surface: ["一路能走", "波动不大", "往前推进", "不太折返"],
      core: ["顺势推进", "一路接线", "势比戏剧重", "越走越稳"],
    },
    承压走命: {
      surface: ["久压感重", "不轻松", "低位盘整", "靠扛靠熬"],
      core: ["承压走命", "压里行命", "不是快命", "重在撑住"],
    },
  };
  return map[lifeShape] || { surface: [], core: [] };
}

function lifeShapeCoreProfile(lifeShape, chart, dayunSummary) {
  const turnText = dayunSummary.firstTurnUp ? `${dayunSummary.firstTurnUp.startYear}-${dayunSummary.firstTurnUp.endYear}` : "关键转点";
  const strongText = dayunSummary.strongest ? `${dayunSummary.strongest.startYear}-${dayunSummary.strongest.endYear}` : "后段";
  const map = {
    前压后厚起: [
      { label: "命型", text: `回命厚起型。前段不是先得势，而是先受压、先久耗，真正成形偏晚。` },
      { label: "执念", text: "不甘一生被前段压低定义，最怕旧耗走完了，真命还没回到手里。" },
      { label: "活法", text: `不是抢快，而是认压、拆旧、回身。真正的起线多从 ${turnText} 前后开始。` },
      { label: "优点", text: "一旦回正，后劲重，厚度足，后段的分量不是轻盘可比。" },
      { label: "死穴", text: "最怕在旧耗里反复回头，把本该厚起的命又拖回熟悉低位。" },
      { label: "后半生", text: `后半生重点看 ${strongText} 一带，价值不在早亮，而在越走越厚。` },
    ],
    前压后转升: [
      { label: "命型", text: "前压转升型。前面吃压明显，但中后段会出现真正抬头。" },
      { label: "执念", text: "最怕自己前段吃的压白吃了，后面也没能转上去。" },
      { label: "活法", text: `认清前段限制，把力气留给 ${turnText} 这种真正能起的运。` },
      { label: "优点", text: "耐压后反而更懂分寸，一旦起势，不容易浮。 " },
      { label: "死穴", text: "最怕刚转升就急着收割，导致转势只起半截。" },
      { label: "后半生", text: "后半生看的是能否把抬头坐实，而不是只冲出一个高点。" },
    ],
    旧势续行: [
      { label: "命型", text: "旧势续行型。命不靠翻盘，主要靠熟结构、熟关系、熟秩序一路续着活。" },
      { label: "执念", text: "最怕旧关系散、旧位置丢、旧秩序松，怕一松就不知道自己是谁。" },
      { label: "活法", text: "靠守、黏、维持、反复熟悉互动续命。会走，但不一定真回。" },
      { label: "优点", text: "续航力强，守成力高，在熟环境里很能熬，也不轻易散架。" },
      { label: "死穴", text: "离开熟悉结构就容易露底，变化能力比维持能力弱得多。" },
      { label: "后半生", text: "后半生更像持势和转守，不像重新开天。若不松旧，会越活越缩回熟悉壳子里。" },
    ],
    早显后收: [
      { label: "命型", text: "早显后收型。前中段更容易出势，后段反而看守，不看再炸。" },
      { label: "执念", text: "最怕自己前面亮过，后面却收得太快，留下高开低走的感觉。" },
      { label: "活法", text: "先会收锋芒，再谈继续长。对这类命，守成果比追新高更重要。" },
      { label: "优点", text: "前段识别快，起线较早，容易比同龄人更早被看见。" },
      { label: "死穴", text: "若总拿前段光感当本钱，后面很容易越走越收，最后只剩旧成绩。" },
      { label: "后半生", text: "后半生重点不是再造早年峰值，而是别把后段走成回落线。" },
    ],
    多段换轨: [
      { label: "命型", text: "多段换轨型。命不走一条直线，转点比平段更重要。" },
      { label: "执念", text: "最怕每次转了又没接住，忙了很多段，最后主线还是散的。" },
      { label: "活法", text: "不能贪稳定假象，要抓住真正改线的节点，一段段把命接回来。" },
      { label: "优点", text: "可塑性高，修正能力强，不容易被一条早年错误路线绑死。" },
      { label: "死穴", text: "转得多但不落地，就会把命过成持续调整、迟迟不成形。" },
      { label: "后半生", text: "后半生真正值钱的，不是少折腾，而是终于转到对线以后不再乱拐。" },
    ],
    反复换轨: [
      { label: "命型", text: "反复换轨型。会多次转向，不是一口气平推到头的命。" },
      { label: "执念", text: "怕自己总在改线，却没有一次真正改准。" },
      { label: "活法", text: `这类命不怕变，怕的是每次都只变表层。真正关键的还是 ${turnText} 这种转点。` },
      { label: "优点", text: "不死板，能在变化里找新路，也有重新开局的胆量。" },
      { label: "死穴", text: "最怕把变动当活法本身，结果一直在动，却始终没成主轴。" },
      { label: "后半生", text: "后半生看的是有没有一条线终于不再反复，开始真正站住。" },
    ],
    平势守成: [
      { label: "命型", text: "平势守成型。不是戏剧型命，也不是大折返命，价值在稳稳推过去。" },
      { label: "执念", text: "最怕局面失控，怕本来能稳走的命被自己搞成大起大落。" },
      { label: "活法", text: "守节奏、守分寸、守长期，不求一把翻盘，只求越走越实。" },
      { label: "优点", text: "抗波动能力较强，心性和现实都更适合做长线，不容易翻车。" },
      { label: "死穴", text: "若过度求稳，也可能把命守得太平，少了真正该开的部分。" },
      { label: "后半生", text: "后半生更像慢慢坐实，不一定最亮，但通常更耐看。" },
    ],
    晚起守成: [
      { label: "命型", text: "晚起守成型。前段不显，中后段才慢慢立住，重点在后段守住。" },
      { label: "执念", text: "最怕自己起得晚，却还没机会把后段守成做出来。" },
      { label: "活法", text: "先接受慢，再学会守；不是所有命都靠早亮，这种更看后段耐性。" },
      { label: "优点", text: "晚段更稳，越往后越不容易被外部噪音带偏。" },
      { label: "死穴", text: "最怕年轻时误判自己没命，提前放掉本来后面会成的线。" },
      { label: "后半生", text: "后半生是主场，关键不在惊艳，而在终于站稳。" },
    ],
    晚发厚起: [
      { label: "命型", text: "晚发厚起型。不是早成命，真正分量靠后段积厚后显。" },
      { label: "执念", text: "最怕前面太不显，被自己或别人误判成没有东西。" },
      { label: "活法", text: "接受慢成，先积厚，再被认出。这类命不靠热度，靠分量。" },
      { label: "优点", text: "一旦被认出，识别度和厚度往往比早红命更稳更耐久。" },
      { label: "死穴", text: "若总拿年轻时的寂静否定自己，会提前折断本来后厚的命。" },
      { label: "后半生", text: `后半生尤其是 ${strongText} 这一带，往往比前面更像真正的自己。` },
    ],
    顺势推进: [
      { label: "命型", text: "顺势推进型。命路不算拧，重要的是顺势接线，不要自己逆拧。" },
      { label: "执念", text: "最怕明明有势，却偏要逆着命性用力，把顺命走成耗命。" },
      { label: "活法", text: "认用神、顺结构、稳推进。这类命不需要太多戏剧化动作。" },
      { label: "优点", text: "推进性好，只要不乱折腾，人生线整体更容易越走越顺。" },
      { label: "死穴", text: "最怕自作聪明逆势操作，把原本可推的命推散。" },
      { label: "后半生", text: "后半生多看势能是否还在，通常不靠翻盘，而靠持续推进。" },
    ],
    承压走命: [
      { label: "命型", text: "承压走命型。命不轻松，很多阶段都像在压力里慢慢往前挪。" },
      { label: "执念", text: "最怕自己一直在扛，却始终扛不出真正的出口。" },
      { label: "活法", text: "先认清什么是必须扛的，什么是白扛的；不是所有压力都值得背。 " },
      { label: "优点", text: "耐力强，承压阈值高，不容易因为一两次低点就彻底散掉。" },
      { label: "死穴", text: "若长期把受压当日常，容易忘记命不只是扛，还应该有真正展开。" },
      { label: "后半生", text: "后半生关键看能不能从纯扛转成有方向地活，不然只是换地方继续耗。" },
    ],
  };
  return map[lifeShape] || null;
}

function resolveBaziLifeShape(chart, scores = []) {
  const dayunSummary = summarizeDayunStages(chart?.dayunStages || []);
  const phaseRuns = summarizePhaseRuns(scores);
  const firstPhase = phaseRuns[0]?.label || "";
  const latePhase = phaseRuns[phaseRuns.length - 1]?.label || "";
  const stageLabels = (chart?.dayunStages || []).map((item) => item.stageLabel).filter(Boolean);
  const phaseLabels = (chart?.dayunStages || []).map((item) => item.phaseLabel).filter(Boolean);
  const sustainCount = stageLabels.filter((item) => ["续旧", "续势", "持势", "转守", "余势"].includes(item)).length;
  const flatCount = phaseLabels.filter((item) => item === "平走").length;
  const surgeCount = phaseLabels.filter((item) => item === "高助").length;
  const turnDownLate = (chart?.dayunStages || []).some((item) => item.startAge >= 40 && (item.phaseLabel === "转压" || item.phaseLabel === "重压"));
  const turnUpCount = phaseLabels.filter((item) => item === "转升").length;

  if (dayunSummary.pressureCount >= 2 && dayunSummary.firstTurnUp && chart?.dayunStages?.some((item) => item.stageLabel === "厚起")) {
    return "前压后厚起";
  }
  if (dayunSummary.pressureCount >= 2 && dayunSummary.firstTurnUp) return "前压后转升";
  if (sustainCount >= 3) return "旧势续行";
  if (dayunSummary.riseCount >= 2 && dayunSummary.firstTurnDown && !dayunSummary.firstTurnUp) return "早起后收";
  if (surgeCount >= 2 && turnDownLate && !chart?.dayunStages?.some((item) => item.stageLabel === "厚起")) return "早显后收";
  if (dayunSummary.turnCount >= 3) return "多段换轨";
  if (turnUpCount >= 2 && dayunSummary.firstTurnDown && dayunSummary.firstTurnUp) return "反复换轨";
  if (firstPhase === "未起" && latePhase === "守位") return "晚起守成";
  if (firstPhase === "未起" && latePhase === "厚起") return "晚发厚起";
  if (flatCount >= 2 && dayunSummary.turnCount <= 1) return "平势守成";
  if (dayunSummary.riseCount >= 3 && dayunSummary.pressureCount <= 1) return "顺势推进";
  if (dayunSummary.pressureCount >= 3 && dayunSummary.riseCount === 0) return "承压走命";
  return "阶段行命";
}

function buildBaziCommandText(chart, scores = []) {
  const lifeShape = resolveBaziLifeShape(chart, scores);
  const pattern = chart?.pattern || "待判";
  const useful = (chart?.usefulGods || []).join("、") || "待判";
  const avoid = (chart?.unfavorableGods || []).join("、") || "待判";
  const stageSummary = summarizeDayunStages(chart?.dayunStages || []);
  const firstTurnUp = stageSummary.firstTurnUp;
  const firstTurnDown = stageSummary.firstTurnDown;
  const strongest = stageSummary.strongest;

  if (lifeShape === "旧势续行") {
    return {
      verdict: `旧势续行。这盘更像能在熟结构里接力走下去，不是先碎后起的命。${firstTurnDown ? `真要防的是 ${firstTurnDown.startYear}-${firstTurnDown.endYear} 这类转守段。` : ""}`,
      soulTask: "命局主课题不是回命重建，而是别把旧势用成旧执；会走不等于走得真。",
      purpose: strongest ? `真正的看点在 ${strongest.startYear}-${strongest.endYear} 这类能把旧势推高的运。` : "这类盘重点看怎么持势，不是怎么翻盘。",
    };
  }

  if (lifeShape === "早显后收") {
    return {
      verdict: `早显后收。这盘前中段更容易见势，后段反而要防收束和回落${firstTurnDown ? `，尤其 ${firstTurnDown.startYear}-${firstTurnDown.endYear} 一带` : ""}。`,
      soulTask: "命局主课题不在如何冲起来，而在起过之后怎么不被自己收掉。",
      purpose: "看这类盘，重点是守成果、收锋芒、避免高开低走。",
    };
  }

  if (lifeShape === "平势守成") {
    return {
      verdict: "平势守成。这盘不是戏剧型命，起落不会太极端，重在长期稳推。",
      soulTask: "命局主课题在耐心和持久，不在猛冲或翻盘。",
      purpose: "这类盘的价值不在爆点，而在越走越稳、越走越实。",
    };
  }

  if (lifeShape === "反复换轨" || lifeShape === "多段换轨") {
    return {
      verdict: `${lifeShape}。这盘不怕动，怕的是每次转向都没接住。${firstTurnUp ? `最关键的转点在 ${firstTurnUp.startYear}-${firstTurnUp.endYear}。` : ""}`,
      soulTask: "命局主课题不是待在一条直线上，而是在多次转势里找准真正能成的那条线。",
      purpose: "看这类盘，要抓转点，不要被单个平段骗成一生定论。",
    };
  }

  if (chart?.strength === "weak") {
    return {
      verdict: `${lifeShape}。这盘不宜硬顶，主看扶身立轴，顺 ${useful}，避 ${avoid}${firstTurnUp ? `，真正转势多从 ${firstTurnUp.startYear}-${firstTurnUp.endYear} 这步运开始。` : "。"} `,
      soulTask: String(pattern).includes("财官")
        ? "命局主课题是先把自己扶起来，再碰财官压力；先有根，再谈外部位置。"
        : "命局主课题是先立根，再走事；不是先抢结果，而是先把自己托住。",
      purpose: strongest ? `真正能起的点，不在蛮冲，而在把 ${strongest.ganZhi} 这类能托你的运接稳。` : "真正的转机不在蛮冲，而在顺着用神补根、换运、换位后慢慢起势。",
    };
  }

  if (chart?.strength === "strong") {
    return {
      verdict: `${lifeShape}。这盘不是补得越多越好，重在泄秀、制衡、把过旺之气导出去${firstTurnDown ? `；尤其要防 ${firstTurnDown.startYear}-${firstTurnDown.endYear} 这种逆拧的运。` : "。"} `,
      soulTask: "命局主课题不是再加力，而是让力量有出口，有结构，有可落地的去处。",
      purpose: `用神走 ${useful}，忌再堆 ${avoid}；一旦逆着走，就容易强而不化。`,
    };
  }

  return {
    verdict: `${lifeShape}。这盘不是单边命，原局、大运、流年一起看，重在顺势取用${firstTurnUp ? `，转机以 ${firstTurnUp.startYear}-${firstTurnUp.endYear} 前后最要紧。` : "。"} `,
    soulTask: `命局主课题在调平，不宜死卡一头。用神看 ${useful}，避开 ${avoid}。`,
    purpose: "看这类盘，重点不是一句好坏，而是哪里失衡、何时转势、后面靠什么立住。",
  };
}

function buildBaziIdentityProfile(chart, scores = []) {
  const summary = summarizeAnnualScores(scores);
  const lifeShape = resolveBaziLifeShape(chart, scores);
  const dayunSummary = summarizeDayunStages(chart?.dayunStages || []);
  const firstUseful = chart?.usefulGods?.[0] || "";
  const firstBad = chart?.unfavorableGods?.[0] || "";
  const startAge = chart?.dayun?.[0]?.startAge;
  const direction = chart?.dayun?.[0]?.direction === "forward" ? "顺行" : chart?.dayun?.[0]?.direction === "backward" ? "逆行" : "";
  const lowAge = summary.low?.age;
  const highAge = summary.high?.age;
  const lowYear = summary.low?.year;
  const highYear = summary.high?.year;
  const command = buildBaziCommandText(chart, scores);
  const shapeHeadline = lifeShapeHeadline(lifeShape);
  const shapeReality = lifeShapeReality(lifeShape);
  const shapeTags = lifeShapeTags(lifeShape);
  const shapeProfile = lifeShapeCoreProfile(lifeShape, chart, dayunSummary);

  let reality = "盘势待细判";
  if (chart?.strength === "weak") reality = `扶身立命 · ${shapeReality}`;
  else if (chart?.strength === "strong") reality = `泄秀制衡 · ${shapeReality}`;
  else if (chart?.strength === "balanced") reality = `调平取用 · ${shapeReality}`;
  else reality = "无时辰看大势";

  let texture = "杂气行命";
  if (chart?.pattern?.includes("财官")) texture = "财官压身";
  else if (chart?.pattern?.includes("比印")) texture = "比印偏重";
  else if (chart?.pattern?.includes("中和")) texture = "中和偏杂";
  else if (chart?.pattern?.includes("宜泄")) texture = "气旺待泄";

  let structure = chart?.precision === "full" ? "细盘已接" : "无时辰简盘";
  if (typeof startAge === "number") {
    structure += ` · ${Number(startAge.toFixed(1))}岁起运 · ${direction}`;
  }

  const surfaceTags = [
    shapeHeadline,
    `${strengthCaption(chart)}`,
    typeof startAge === "number" && startAge >= 7 ? "起运偏晚" : "起运偏早",
    chart?.dayunStages?.some((item) => item.stageLabel === "厚起") ? "后段厚起" : chart?.dayunStages?.some((item) => item.stageLabel === "起势") ? "后段起势" : "后段未定",
    dayunSummary.firstTurnDown ? "中段有坎" : "中段不断",
    chart?.precision === "reduced" ? "无时辰看大关系" : "有时辰看细部",
    ...shapeTags.surface,
  ].filter(Boolean);

  const coreTags = [
    `${lifeShape}`,
    shapeHeadline,
    chart?.pattern || "",
    firstUseful ? `主用${firstUseful}` : "",
    firstBad ? `主忌${firstBad}` : "",
    highAge !== undefined && lowAge !== undefined && highAge > lowAge ? "后劲成形" : "高低交错",
    ...shapeTags.core,
  ].filter(Boolean);

  const fallbackProfile = [
    {
      label: "命型",
      text: `${shapeHeadline}。${lifeShape}。${chart?.dayMaster || "此命"}日主的底色是“${dayMasterTone(chart?.dayMaster)}”。${dayunSummary.firstTurnUp ? `关键转点多在 ${dayunSummary.firstTurnUp.startYear}-${dayunSummary.firstTurnUp.endYear}。` : ""}`,
    },
    {
      label: "执念",
      text: firstBad ? relationBiasText(firstBad) : "容易卡在熟悉的旧力里，不肯轻易换道。",
    },
    {
      label: "活法",
      text: firstUseful ? usefulGodActionText(firstUseful) : "这盘要顺势取用，不能只凭一股劲硬顶。 ",
    },
    {
      label: "优点",
      text: chart?.strength === "strong"
        ? "自身气足，扛压、定场、撑结构的能力较强。"
        : chart?.strength === "weak"
          ? "一旦得扶，反而更懂节律、分寸与借势。"
          : "不是死盘，调度空间大，换轨和转向能力不差。",
    },
    {
      label: "死穴",
      text: lowYear !== undefined
        ? `低点多落在 ${lowYear}年前后（${lowAge}岁）。一旦逆着忌神走，就容易在那类年份被原问题放大。`
        : "死穴在于逆势硬顶，把原局最怕的关系一再放大。",
    },
    {
      label: "后半生",
      text: dayunSummary.strongest
        ? `${dayunSummary.strongest.startYear}-${dayunSummary.strongest.endYear} 这步运最值得看。后半生要看的不是会不会变，而是高段来时能不能接住。`
        : highYear !== undefined
          ? `高点更容易出在 ${highYear}年前后（${highAge}岁）。后半生要看的不是会不会变，而是高点来时能不能接住。`
          : "后半生的关键，不是再猜命，而是把后段能接住的结构慢慢坐实。",
    },
  ];

  return {
    lifeShape,
    reality,
    texture,
    structure,
    shapeHeadline,
    verdict: command.verdict,
    soulTask: command.soulTask,
    purpose: command.purpose,
    surfaceTags: [...new Set(surfaceTags)].slice(0, 6),
    coreTags: [...new Set(coreTags)].slice(0, 6),
    coreProfile: shapeProfile || fallbackProfile,
  };
}

function buildPersonalBaziBriefProfile(chart, aspectKey, year, score, startYear, endYear, startMonth, endMonth) {
  const identity = buildBaziIdentityProfile(chart, chart?.annualScores || []);
  const yearSummaryText = buildPersonalYearSummary(aspectKey, year, score) || `${year}年属于阶段过渡。`;
  const yearGuideText = buildYearImpact(aspectKey, year, score);
  const aspectScore = averageRangeScore(aspectKey, startYear, endYear);
  const stage = rangeToStage(startYear, endYear);
  const rangeLead = stage?.summary || "这一段还要结合具体年份看。";
  const rangeGuideText = buildRangeGuide(aspectKey, startYear, endYear, aspectScore);
  const tagScores = new Map();
  const addTag = (tag, score = 1) => tagScores.set(tag, (tagScores.get(tag) || 0) + score);
  if (String(aspectKey) === "money") addTag("金钱", 4);
  if (String(aspectKey) === "career" || String(aspectKey) === "influence") addTag("事业", 4);
  if (String(aspectKey) === "relationship") addTag("关系", 4);
  if (String(aspectKey) === "property") addTag("居住", 4);
  if (String(aspectKey) === "health") addTag("健康", 4);
  if (String(aspectKey) === "art") addTag("作品", 4);
  if (String(aspectKey) === "spiritual" || String(aspectKey) === "growth") addTag("主体", 4);
  if (identity.lifeShape === "前压后厚起" || identity.lifeShape === "前压后转升") addTag("主体", 2);
  if (identity.lifeShape === "晚发厚起" || identity.lifeShape === "成画显形") addTag("作品", 2);
  if (identity.coreTags.some((tag) => String(tag).includes("主用财"))) addTag("金钱", 2);
  if (identity.coreTags.some((tag) => String(tag).includes("主用官杀"))) addTag("事业", 2);
  if (identity.coreTags.some((tag) => String(tag).includes("主用印"))) addTag("主体", 1);
  if (identity.coreTags.some((tag) => String(tag).includes("主用食伤"))) addTag("作品", 1);
  if (identity.coreTags.some((tag) => String(tag).includes("主忌财"))) addTag("金钱", 1);
  if (identity.coreTags.some((tag) => String(tag).includes("主忌官杀"))) addTag("事业", 1);
  if (String(identity.verdict).includes("住") || String(identity.soulTask).includes("住")) addTag("居住", 1);
  if (String(identity.soulTask).includes("关系") || String(identity.verdict).includes("关系")) addTag("关系", 1);
  const rankedTags = Array.from(tagScores.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-Hans-CN"))
    .map(([tag]) => tag);
  const topTag = rankedTags[0] || identity.shapeHeadline || "总命";
  const secondaryTag = rankedTags[1] || (topTag === "主体" ? "关系" : "主体");
  const topTagReason = (() => {
    if (topTag === "金钱") return `这一步先看金钱，不只是财路本身，而是资源怎么接、现实交换怎么成、价值感有没有站稳。`;
    if (topTag === "事业") return `这一步先看事业，是因为现实位置、责任承接和结果兑现会先逼你表态。`;
    if (topTag === "关系") return `这一步先看关系，因为外界回应、亲密模式和你会不会再退位，会先把问题照出来。`;
    if (topTag === "居住") return `这一步先看居住，因为住处、家庭和安全感是否稳，直接决定你能不能把命接住。`;
    if (topTag === "健康") return `这一步先看健康，因为身体、作息和承压方式会比结果更早给你信号。`;
    if (topTag === "学习迁移") return `这一步先看学习迁移，因为证件、移动、学习与视野变化会先成为现实突破口。`;
    if (topTag === "作品") return `这一步先看作品，因为真正能替你留下证据的，不是热闹，而是输出本身有没有长在命上。`;
    if (topTag === "主体") return `这一步先看主体，因为很多事表面像在问结果，骨子里其实还是在问你是否站回自己。`;
    return `这一步先看总命，因为当前最重要的不是单点得失，而是整条命线往哪里收。`;
  })();
  const practicalTags = [topTag, secondaryTag, rankedTags[2] || ""].filter(Boolean).join(" / ");
  return [
    {
      label: "现实标签",
      text: practicalTags
    },
    {
      label: "主标签",
      text: `${topTag} / ${secondaryTag}`
    },
    {
      label: "主标签说明",
      text: `${topTagReason} ${identity.verdict || "先看命线主轴。"}`
    },
    {
      label: "今年",
      text: [yearSummaryText, yearGuideText].filter(Boolean).join(" ")
    },
    {
      label: "这一段",
      text: `${startYear}.${String(startMonth).padStart(2, "0")} - ${endYear}.${String(endMonth).padStart(2, "0")}：${rangeLead} ${rangeGuideText}`.trim()
    },
    {
      label: "提醒",
      text: identity.soulTask || identity.purpose || "先顺命，再看细节。"
    },
  ];
}

function buildBaziQuickStages(chart, scores = []) {
  const phaseRuns = summarizePhaseRuns(scores);
  const dayunStages = chart?.dayunStages || [];
  const useful = chart?.usefulGods?.[0] || "";
  const bad = chart?.unfavorableGods?.[0] || "";
  const ranges = [
    { label: "0-20", start: 0, end: 20, title: "前段" },
    { label: "20-40", start: 21, end: 40, title: "中前段" },
    { label: "40-60", start: 41, end: 60, title: "中后段" },
    { label: "60-80", start: 61, end: 80, title: "后段" },
  ];
  return ranges.map((range) => {
    const picked = scores.filter((item) => item.age >= range.start && item.age <= range.end);
    if (!picked.length) {
      return { label: range.label, text: "当前无数据。" };
    }
    const pickScore = (item) => typeof item.effectOverall === "number" ? item.effectOverall : item.overall;
    const low = picked.reduce((min, item) => (pickScore(item) < pickScore(min) ? item : min), picked[0]);
    const high = picked.reduce((max, item) => (pickScore(item) > pickScore(max) ? item : max), picked[0]);
    const phaseText = phaseRuns
      .filter((item) => !(item.endAge < range.start || item.startAge > range.end))
      .map((item) => plainPhaseLabel(item.label))
      .filter((value, index, array) => array.indexOf(value) === index)
      .join(" / ");
    const decadeText = dayunStages
      .filter((item) => !(item.endAge < range.start || item.startAge > range.end))
      .map((item) => plainYunLabel(item.phaseLabel))
      .filter((value, index, array) => value && array.indexOf(value) === index)
      .join(" / ");
    const lowText = describeScoreBand(pickScore(low));
    const highText = describeScoreBand(pickScore(high));
    const overallText = decadeText || "平着走";
    const phaseLine = phaseText ? `这二十年整体更像 ${phaseText}。` : "";
    const bottleneckLine = bad ? relationBottleneckText(bad) : "";
    const nextLine = useful ? relationNextStepText(useful) : "";
    const lowLine = `${low.year}年（${low.age}岁）这年更容易卡住，偏${lowText}。`;
    const highLine = `${high.year}年（${high.age}岁）这年更顺手，偏${highText}。`;
    return {
      label: range.label,
      text: `${range.title}总体是${overallText}。${phaseLine}${bottleneckLine}${nextLine}${lowLine}${highLine}`,
    };
  });
}

function plainPhaseLabel(label = "") {
  const map = {
    未起: "还在蓄着，表面不一定显",
    起势: "开始抬头，但还没完全坐实",
    回整: "在重排、调整、修筋骨",
    守位: "在稳住已有的位置",
    厚起: "后劲起来了，分量在加深",
  };
  return map[label] || label;
}

function plainYunLabel(label = "") {
  const map = {
    偏助: "有帮扶",
    高助: "明显得力",
    转升: "开始往上走",
    转压: "开始转紧",
    承压: "压力偏大",
    平走: "平着走",
  };
  return map[label] || label;
}

function plainLifeShape(shape = "") {
  const map = {
    前压后厚起: "这类命往往前面吃压，后面越活越成形",
    前压后转升: "这类命前面不轻松，但中后段会慢慢抬头",
    旧势续行: "这类命更像沿着熟悉路子继续走下去",
    早起后收: "这类命前中段容易先起来，后段重在守住",
    早显后收: "这类命早些年容易被看见，后面要防收得太快",
    多段换轨: "这类命一生会换几次轨，关键在转点",
    反复换轨: "这类命不是直线走法，常会反复改线",
    晚起守成: "这类命起得偏晚，后面重在慢慢站稳",
    晚发厚起: "这类命不靠早成，越往后越有厚度",
    平势守成: "这类命不戏剧，重点是长期稳推",
    顺势推进: "这类命整体不算太拧，顺着走就会越来越稳",
    承压走命: "这类命很多阶段都像顶着压力往前走",
    阶段行命: "这类命阶段感强，不同年份差别会比较明显",
  };
  return map[shape] || "这类命要看阶段，不是一眼能下结论的类型";
}

function plainStrengthGuide(strength = "") {
  if (strength === "weak") return "先把自己扶稳，再谈外面的事。";
  if (strength === "strong") return "重点不是再加力，而是把力气用对地方。";
  if (strength === "balanced") return "重点在调平，不在走极端。";
  return "";
}

function relationBottleneckText(relation) {
  const map = {
    比劫: "现在更容易卡在什么都靠自己，事情全压在自己身上。",
    印: "现在更容易卡在一直内收、一直准备、一直补自己，但迟迟不往外接。",
    食伤: "现在更容易卡在东西做了很多，但出口、回流和转化不够。",
    财: "现在更容易卡在价格、销售、渠道、资源接口这几环。",
    官杀: "现在更容易卡在规则、流程、公开、提交、长期更新这几环。",
  };
  return map[relation] || "";
}

function relationNextStepText(relation) {
  const map = {
    比劫: "下一步先补能分担和能接力的外部接口，不要再全靠自己扛。",
    印: "下一步先把已经准备好的东西往外送，不要一直停在修自己这一步。",
    食伤: "下一步先补展示、发布、投稿、销售这类出口，不要只继续生产。",
    财: "下一步先把报价、目录、渠道、成交路径做清楚。",
    官杀: "下一步先把流程、计划、提交节奏和稳定输出接起来。",
  };
  return map[relation] || "";
}

function buildBaziSummary(chart, scores, label) {
  const dayunSummary = summarizeDayunStages(chart?.dayunStages || []);
  const useful = chart?.usefulGods?.[0] || "";
  const bad = chart?.unfavorableGods?.[0] || "";
  const turn = dayunSummary.firstTurnUp;
  const lateStage = chart?.dayunStages?.find((item) => item.stageLabel === "厚起");
  const lifeShape = resolveBaziLifeShape(chart, scores);
  const startLine = `${label}${plainLifeShape(lifeShape)}。`;
  const middleLine = bad
    ? relationBottleneckText(bad)
    : turn
      ? `明显转机多从 ${turn.startYear}-${turn.endYear} 前后开始。`
      : "前后段差别会有，但转机点还不算特别集中。";
  const endLine = useful
    ? relationNextStepText(useful)
    : lateStage
      ? `${lateStage.startYear}-${lateStage.endYear} 以后更容易见到后劲和分量。`
      : plainStrengthGuide(chart?.strength);
  const timeLine = turn ? `明显转机多从 ${turn.startYear}-${turn.endYear} 前后开始。` : "";
  return [startLine, middleLine, endLine, timeLine].filter(Boolean).join("");
}

function relationPlainText(relation) {
  const map = {
    比劫: "靠自己、同类支持、自我站稳",
    印: "靠休养、学习、承接、贵人托住",
    食伤: "靠表达、创作、输出、把东西做出来",
    财: "靠资源、交易、现金流、现实接口",
    官杀: "靠规则、责任、位置、外部秩序",
  };
  return map[relation] || relation || "";
}

function describeGodList(list = []) {
  if (!Array.isArray(list) || !list.length) return "";
  return list.map((item) => relationPlainText(item)).filter(Boolean).join("；");
}

function relationDoText(relation) {
  const map = {
    比劫: "先把自己的节奏和边界立住，再接外面的事。",
    印: "先把休息、学习、稳定环境补够，让自己有根再往外走。",
    食伤: "把已经做出来的东西继续送出去，不要只堆在自己手里。",
    财: "补销售、报价、展示、合作这类现实接口，让东西能换成钱和机会。",
    官杀: "补规则、流程、长期更新和稳定输出，让别人知道怎么接住你。",
  };
  return map[relation] || "";
}

function relationAvoidText(relation) {
  const map = {
    比劫: "别什么都自己扛，扛到最后东西还是出不去。",
    印: "别一直待在熟悉保护里提升自己，却迟迟不把东西接到外面。",
    食伤: "别只顾做和表达，做到很多却没有出口和回流。",
    财: "别因为着急变现就乱接路子，也别一直没价格、没渠道、没成交。",
    官杀: "别怕流程和规则，怕到最后什么都没公开、没提交、没落地。",
  };
  return map[relation] || "";
}

function buildDirectionSentence(list = [], mode = "do") {
  if (!Array.isArray(list) || !list.length) return "";
  const mapper = mode === "avoid" ? relationAvoidText : relationDoText;
  return list.map((item) => mapper(item)).filter(Boolean).join("");
}

function describeStrengthPlain(strength) {
  if (strength === "weak") return "自己偏弱，要先补根";
  if (strength === "strong") return "自己偏强，要把力气导出去";
  if (strength === "balanced") return "相对均衡，重在调平";
  return "";
}

function describePatternPlain(pattern) {
  const text = String(pattern || "").trim();
  if (!text) return "";
  if (text.includes("比印")) return "盘里自我和护身之气偏重，容易靠熟结构和自我支撑活";
  if (text.includes("财官")) return "盘里现实压力、规则和外部要求感偏重";
  if (text.includes("宜泄")) return "盘里气足，重点不是再加力，而是把能量化出去";
  if (text.includes("中和")) return "盘面不算极端，关键在平衡和调度";
  return text;
}

function describeDayMasterPlain(dayMaster) {
  const map = {
    甲: "甲木型，往外长，怕被折断",
    乙: "乙木型，细、敏、需要空间",
    丙: "丙火型，要照出来，要有出口",
    丁: "丁火型，重感受，重光感",
    戊: "戊土型，要稳，要扛，要撑场",
    己: "己土型，容易卷进关系和承接",
    庚: "庚金型，要切开，要定准",
    辛: "辛金型，重分寸、尺度、精度",
    壬: "壬水型，要流动，要换场",
    癸: "癸水型，藏得深，靠渗透起作用",
  };
  return map[dayMaster] || (dayMaster ? `${dayMaster}日主` : "命主气质待判");
}

function describeYunPlain(firstDayun, firstStage) {
  if (!firstDayun) return "人生大节奏待判";
  const startAge = Number(firstDayun.startAge?.toFixed?.(1) ?? firstDayun.startAge);
  const direction = firstDayun.direction === "forward"
    ? "往前推"
    : firstDayun.direction === "backward"
      ? "先回收再推"
      : "方向待判";
  return `${startAge}岁左右开始换一轮大节奏，人生更像${direction}${firstStage?.phaseLabel ? `，一开始偏${plainYunLabel(firstStage.phaseLabel)}` : ""}`;
}

function phaseLabelSentence(label = "") {
  const map = {
    偏助: "这十年整体有人托一把，事情相对容易推进。",
    高助: "这十年整体比较得力，更容易往上走。",
    转升: "这十年是往上抬头的阶段，很多事会开始起色。",
    转压: "这十年会慢慢转紧，做事更考验稳定和分寸。",
    承压: "这十年压力偏大，很多事不会很轻松。",
    平走: "这十年整体比较平，重在稳稳往前推。",
  };
  return map[label] || "这十年整体还要结合具体年份看。";
}

function stageLabelSentence(label = "") {
  const map = {
    未起: "主线还没完全出来，更多像在蓄着。",
    起势: "主线开始抬头，但还不是最后定型。",
    回整: "像在重排生活和结构，不等于失败。",
    守位: "重点是稳住已有的位置，不要乱。",
    厚起: "后劲和分量会慢慢出来，越后面越值钱。",
  };
  return map[label] || "";
}

function shortPhaseSentence(label = "") {
  const map = {
    偏助: "这十年有人托一把。",
    高助: "这十年整体比较得力。",
    转升: "这十年开始往上抬头。",
    转压: "这十年会慢慢转紧。",
    承压: "这十年压力偏大。",
    平走: "这十年整体比较平。",
  };
  return map[label] || "这十年还要结合具体年份看。";
}

function shortStageSentence(label = "") {
  const map = {
    未起: "重点不是急着出成绩，而是先蓄住。",
    起势: "重点是把刚起来的势头接稳。",
    回整: "重点是重排和修整，不要乱冲。",
    守位: "重点是稳住已有位置，不要掉回去。",
    厚起: "重点是守后劲，让分量慢慢出来。",
  };
  return map[label] || "";
}

function quickBirthRecordKey(record = {}) {
  const name = String(record.name || "此人").trim().toLowerCase();
  const year = Number(record.year) || 0;
  const month = Number(record.month) || 0;
  const day = Number(record.day) || 0;
  const gender = String(record.gender || "").trim().toLowerCase();
  return [name, year, month, day, gender].join("|");
}

function quickBirthRecordCompleteness(record = {}) {
  let score = 0;
  if (record.locationDisplay || record.city) score += 4;
  if (record.time) score += 2;
  if (record.timezone) score += 1;
  if (typeof record.latitude === "number") score += 1;
  if (typeof record.longitude === "number") score += 1;
  if (record.archetype) score += 1;
  if (record.structure) score += 1;
  if (record.texture) score += 1;
  return score;
}

function simplifyQuickBirthStructure(value = "") {
  const text = String(value || "").trim();
  if (!text) return "八字待补";
  return text
    .replace(/身强|身弱|中和/g, "")
    .replace(/格/g, "")
    .replace(/\s+/g, " ")
    .replace(/^[·\s]+|[·\s]+$/g, "")
    .replace(/··+/g, "·")
    .trim() || "八字待补";
}

function saveCurrentQuickBirthRecordFromEngine(view, chart) {
  if (!isAuthenticatedSync()) return;
  const history = normalizeQuickBirthHistory(getQuickBirthHistory());
  const record = {
    name: view.name || "此人",
    city: view.city || "",
    locationDisplay: view.locationDisplay || "",
    timezone: view.timezone || "",
    latitude: typeof view.latitude === "number" ? view.latitude : undefined,
    longitude: typeof view.longitude === "number" ? view.longitude : undefined,
    year: view.year,
    month: view.month,
    day: view.day,
    gender: view.gender || "",
    timeKnown: Boolean(view.timeKnown && view.time),
    time: view.time || "",
    archetype: baziAspectLabel(chart),
    structure: chart?.pattern || "",
    texture: chart?.strength || "",
    pinned: false,
  };
  const recordKey = quickBirthRecordKey(record);
  saveDeletedQuickBirthKeys(getDeletedQuickBirthKeys().filter((key) => key !== recordKey));
  const existing = history.find((item) => quickBirthRecordKey(item) === recordKey);
  if (existing?.pinned) record.pinned = true;
  const deduped = history.filter((item) => quickBirthRecordKey(item) !== recordKey);
  deduped.unshift(record);
  saveQuickBirthHistory(normalizeQuickBirthHistory(deduped));
  renderQuickBirthHistory();
  upsertSharedProfile({
    name: record.name,
    source: "bazi",
    gender: record.gender || "",
    city: record.city,
    locationDisplay: record.locationDisplay,
    birthDate: `${record.year}-${String(record.month).padStart(2, "0")}-${String(record.day).padStart(2, "0")}`,
    birthTime: record.time || "",
    timezoneName: record.timezone || "",
    latitude: record.latitude,
    longitude: record.longitude,
    baziArchetype: record.archetype,
    baziStructure: record.structure,
    baziTexture: record.texture,
  }).catch(() => {});
}

async function fetchBaziChart(payload) {
  const response = await fetch("/api/bazi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok || !data?.ok) {
    const message = Array.isArray(data?.errors) ? data.errors.join(" ") : data?.error || "八字接口未返回可用结果。";
    throw new Error(message);
  }
  return data.result;
}

const cityGeoCache = new Map();
const citySuggestCache = new Map();
let quickBirthCityDebounce = null;
let quickBirthCityHideTimer = null;
let quickBirthSelectedCityOption = null;

function normalizeCityLookupKey(value = "") {
  return String(value || "").trim().toLowerCase();
}

async function resolveCityMeta(city, year, month, day) {
  const key = `${city}__${year}-${month}-${day}`;
  if (cityGeoCache.has(key)) return cityGeoCache.get(key);
  const response = await fetch("/api/geocode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city, year, month, day }),
  });
  const data = await response.json();
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "城市解析失败。");
  }
  cityGeoCache.set(key, data);
  if (data?.display) citySuggestCache.set(normalizeCityLookupKey(data.display), data);
  if (data?.city) citySuggestCache.set(normalizeCityLookupKey(data.city), data);
  return data;
}

async function searchCityOptions(city, count = 6) {
  const query = String(city || "").trim();
  if (!query || query.length < 2) return [];
  const cacheKey = `suggest__${query.toLowerCase()}__${count}`;
  if (cityGeoCache.has(cacheKey)) return cityGeoCache.get(cacheKey);
  const response = await fetch("/api/geocode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city: query, count }),
  });
  const data = await response.json();
  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "城市联想失败。");
  }
  const results = Array.isArray(data.results) ? data.results : [];
  cityGeoCache.set(cacheKey, results);
  return results;
}

function hideQuickBirthCityOptions() {
  if (!quickBirthCityPicks) return;
  quickBirthCityPicks.hidden = true;
  quickBirthCityPicks.innerHTML = "";
}

function selectQuickBirthCityOption(option) {
  quickBirthSelectedCityOption = option || null;
  if (quickBirthCityInput && option?.display) {
    quickBirthCityInput.value = option.display;
  }
  applyQuickBirthCityHint(option || null);
  hideQuickBirthCityOptions();
}

function renderQuickBirthCityOptions(options = [], query = "") {
  if (!quickBirthCityPicks) return;
  if (!options.length) {
    hideQuickBirthCityOptions();
    return;
  }
  quickBirthCityPicks.hidden = false;
  quickBirthCityPicks.innerHTML = options.map((item, index) => `
    <button class="quick-city-pick${index === 0 ? " is-active" : ""}" type="button" data-city-pick="${item.display}">
      <strong>${[item.city || "", item.region || "", item.country || ""].filter(Boolean).join(", ") || item.display}</strong>
      <span>${[item.display, item.timezone || "", typeof item.latitude === "number" && typeof item.longitude === "number" ? `${item.latitude.toFixed(2)}, ${item.longitude.toFixed(2)}` : ""].filter(Boolean).join(" · ")}</span>
    </button>
  `).join("");
}

function applyQuickBirthCityHint(option) {
  if (!quickBirthCityHint) return;
  if (!option) {
    quickBirthCityHint.textContent = "";
    return;
  }
  quickBirthCityHint.textContent = [
    option.timezone || "",
    typeof option.latitude === "number" && typeof option.longitude === "number"
      ? `${option.latitude.toFixed(2)}, ${option.longitude.toFixed(2)}`
      : "",
  ].filter(Boolean).join(" · ");
}

async function updateQuickBirthCitySuggestions() {
  const query = String(quickBirthCityInput?.value || "").trim();
  if (!query || query.length < 2) {
    hideQuickBirthCityOptions();
    applyQuickBirthCityHint(null);
    return;
  }
  try {
    const options = await searchCityOptions(query, 6);
    options.forEach((item) => {
      citySuggestCache.set(normalizeCityLookupKey(item.display), item);
      citySuggestCache.set(normalizeCityLookupKey([item.city || "", item.region || "", item.country || ""].filter(Boolean).join(", ")), item);
      citySuggestCache.set(normalizeCityLookupKey(item.city), item);
    });
    renderQuickBirthCityOptions(options, query);
    const exact = citySuggestCache.get(normalizeCityLookupKey(query));
    if (exact) {
      quickBirthSelectedCityOption = exact;
      applyQuickBirthCityHint(exact);
    } else {
      quickBirthSelectedCityOption = null;
      applyQuickBirthCityHint(options[0] || null);
    }
  } catch {
    hideQuickBirthCityOptions();
    applyQuickBirthCityHint(null);
  }
}

async function autoResolveQuickBirthCityIfReady() {
  const city = String(quickBirthCityInput?.value || "").trim();
  const parts = parseQuickBirthDateParts();
  const year = parts?.year;
  const month = parts?.month;
  const day = parts?.day;
  if (!city || !year || !month || !day) return;
  try {
    const exact = citySuggestCache.get(normalizeCityLookupKey(city));
    if (exact) {
      quickBirthSelectedCityOption = exact;
      applyQuickBirthCityHint(exact);
      return;
    }
    const resolved = await resolveCityMeta(city, year, month, day);
    quickBirthSelectedCityOption = resolved;
    if (quickBirthCityInput && resolved.display) {
      quickBirthCityInput.value = resolved.display;
    }
    applyQuickBirthCityHint(resolved);
  } catch {
    if (!quickBirthSelectedCityOption) {
      applyQuickBirthCityHint(null);
    }
  }
}

function renderQuickBirthEngineResult(view, chart) {
  const loggedIn = isAuthenticatedSync();
  const annualScores = (chart?.annualScores || []).map((item) => ({
    year: item.year,
    age: item.age,
    score: typeof item.effectOverall === "number" ? item.effectOverall : item.overall,
  }));
  const pillars = chart?.pillars || {};
  const pillarText = [pillars.year, pillars.month, pillars.day, pillars.hour].filter(Boolean).join(" / ") || "待判";
  const dayMasterText = describeDayMasterPlain(chart?.dayMaster);
  const strengthText = describeStrengthPlain(chart?.strength) || "盘势待判";
  const patternText = describePatternPlain(chart?.pattern) || "命格倾向待判";
  const usefulText = buildDirectionSentence(chart?.usefulGods, "do") || "先输入后显示。";
  const unfavorableText = buildDirectionSentence(chart?.unfavorableGods, "avoid") || "先输入后显示。";
  const firstDayun = chart?.dayun?.[0];
  const firstStage = chart?.dayunStages?.[0];
  const yunText = describeYunPlain(firstDayun, firstStage);
  const rawTags = [
    chart?.precision === "full" ? "有时辰" : "无时辰简盘",
    chart?.dayMaster ? `${chart.dayMaster}日主` : "",
    chart?.strength === "weak" ? "自己偏弱" : chart?.strength === "strong" ? "自己偏强" : chart?.strength === "balanced" ? "相对均衡" : "",
    chart?.pattern ? "有命格倾向" : "",
  ].filter(Boolean);
  chartState.quickBirth.selectedYear = view.year;
  chartState.quickBirth.previewYear = null;
  const chartTitle = view.city ? `${view.name} · ${view.city} · 八字作用线` : `${view.name} · 八字作用线`;
  if (loggedIn) {
    renderQuickBirthChart(annualScores, chartTitle, chartState.quickBirth.selectedYear, chartState.quickBirth.previewYear);
  } else if (quickBirthChart) {
    quickBirthChart.innerHTML = "";
  }
  renderQuickBirthStages(loggedIn ? buildBaziQuickStages(chart, chart?.annualScores || []) : [
    { label: "体验模式", text: "未登录时只显示四柱起卦后的学术名词。" },
    { label: "登录后", text: "登录后显示命线、运势解释与阶段判断。" },
  ]);
  renderProfileGrid(quickBirthCoreProfile, loggedIn ? buildQuickBirthBaseProfile(chart) : []);
  renderQuickBirthDayunStages(loggedIn ? (chart?.dayunStages || []) : []);
  renderQuickBirthTags(quickBirthSurfaceTags, loggedIn ? (chart?.usefulGods || []) : []);
  renderQuickBirthTags(quickBirthCoreTags, loggedIn ? rawTags : [chart?.dayMaster ? `${chart.dayMaster}日主` : "", pillarText].filter(Boolean));
  if (quickBirthTitle) quickBirthTitle.textContent = `${view.name} · ${view.dateString}${view.time ? ` ${view.time}` : ""} · 八字排盘`;
  if (quickBirthSummary) quickBirthSummary.textContent = loggedIn
    ? buildBaziSummary(chart, chart?.annualScores || [], view.name)
    : "当前为未登录体验模式：只显示四柱起卦后的学术名词，不显示命线及运势解释。";
  if (quickBirthLocation) {
    const meta = chart?.locationMeta || {};
    const locationParts = [
      view.locationDisplay || view.city || meta.location || "未填",
      typeof meta.latitude === "number" && typeof meta.longitude === "number"
        ? `${meta.latitude.toFixed(2)}, ${meta.longitude.toFixed(2)}`
        : "",
      meta.timezone || view.timezone || "",
    ].filter(Boolean);
    quickBirthLocation.textContent = locationParts.join(" · ");
  }
  if (quickBirthNote) quickBirthNote.textContent = [
    loggedIn ? "这张图只看不同年份是更顺、偏压、缓起还是成形，不直接代替整个人生结论。" : "未登录时不会自动保存，刷新后需要重新输入。",
    loggedIn ? "已写入案主资料库。" : "注册 / 登录后才会自动留档并显示解释层。",
    view.cityResolveWarning || "",
  ].filter(Boolean).join(" · ");
  if (quickBirthArchetype) quickBirthArchetype.textContent = pillarText;
  if (quickBirthDepth) quickBirthDepth.textContent = loggedIn ? dayMasterText : "未登录不显示。";
  if (quickBirthPattern) quickBirthPattern.textContent = loggedIn ? strengthText : "未登录不显示。";
  if (quickBirthLevel) quickBirthLevel.textContent = loggedIn ? patternText : "未登录不显示。";
  if (quickBirthVerdict) quickBirthVerdict.textContent = loggedIn ? usefulText : "登录后显示。";
  if (quickBirthSoulTask) quickBirthSoulTask.textContent = loggedIn ? unfavorableText : "登录后显示。";
  if (quickBirthPurpose) quickBirthPurpose.textContent = loggedIn ? yunText : "登录后显示。";
  if (loggedIn) saveCurrentQuickBirthRecordFromEngine(view, chart);
}

function buildQuickBirthBaseProfile(chart) {
  const pillars = chart?.pillars || {};
  const firstDayun = chart?.dayun?.[0];
  const firstStage = chart?.dayunStages?.[0];
  return [
    {
      label: "出生底盘",
      text: `这张盘的四柱是 ${[pillars.year, pillars.month, pillars.day, pillars.hour || "时辰不详"].filter(Boolean).join(" / ")}。这是底色，不是全部人生。`,
    },
    {
      label: "这个人",
      text: `${describeDayMasterPlain(chart?.dayMaster)}。${describeStrengthPlain(chart?.strength) || "强弱待判"}。`,
    },
    {
      label: "怎么走更顺",
      text: `${describePatternPlain(chart?.pattern) || "命格倾向待判"}。该多做：${buildDirectionSentence(chart?.usefulGods, "do") || "待判"}别过头：${buildDirectionSentence(chart?.unfavorableGods, "avoid") || "待判"}`,
    },
    {
      label: "人生节奏",
      text: `${describeYunPlain(firstDayun, firstStage)}。${firstDayun?.ganZhi ? `第一步大运是 ${firstDayun.ganZhi}` : ""}`.trim(),
    },
  ];
}

function renderProfileGrid(container, items, emptyText = "先输入后显示。") {
  if (!container) return;
  const isBrief = container.id === "personal-brief-profile";
  if (!items?.length) {
    container.innerHTML = `
      <article class="quick-stage-item">
        <p class="quick-stage-range">待定</p>
        <p class="quick-stage-text">${emptyText}</p>
      </article>
    `;
    return;
  }
  if (isBrief) {
    container.innerHTML = items.map((item) => {
      const isTagRow = item.label === "主标签" || item.label === "现实标签";
      const isPracticalRow = item.label === "现实标签";
      const text = String(item.text || "");
      const tags = isTagRow ? text.split("/").map((part) => part.trim()).filter(Boolean) : [];
      return `
        <article class="quick-stage-item${isTagRow ? " personal-brief-item is-tags" : " personal-brief-item"}">
          <p class="quick-stage-range">${item.label}</p>
          ${isTagRow ? `
            <div class="quick-keyword-row personal-brief-tags">
              ${tags.map((tag, index) => `<span class="quick-keyword-tag personal-brief-tag${index === 0 ? " is-primary" : " is-secondary"}${isPracticalRow ? " is-neutral" : ""}">${tag}</span>`).join("")}
            </div>
          ` : `<p class="quick-stage-text">${item.text}</p>`}
        </article>
      `;
    }).join("");
    return;
  }
  container.innerHTML = items.map((item) => `
    <article class="quick-stage-item">
      <p class="quick-stage-range">${item.label}</p>
      <p class="quick-stage-text">${item.text}</p>
    </article>
  `).join("");
}

function renderQuickBirthDayunStages(stages = []) {
  if (!quickBirthDayunStages) return;
  if (!stages?.length) {
    quickBirthDayunStages.innerHTML = `
      <article class="quick-stage-item">
        <p class="quick-stage-range">待定</p>
        <p class="quick-stage-text">先输入生日后显示。</p>
      </article>
    `;
    return;
  }

  quickBirthDayunStages.innerHTML = stages.map((item) => {
    const years = `${item.startYear}-${item.endYear}`;
    const phaseText = shortPhaseSentence(item.phaseLabel);
    const stageText = shortStageSentence(item.stageLabel);
    return `
      <article class="quick-stage-item">
        <p class="quick-stage-range">${years}</p>
        <p class="quick-stage-text">${phaseText}${stageText ? ` ${stageText}` : ""}</p>
      </article>
    `;
  }).join("");
}

function renderPersonalDecades() {
  if (!personalDecadeProfile) return;
  personalDecadeProfile.innerHTML = PERSONAL_DECADE_PROFILE.map((item) => `
    <article class="stage-card">
      <div class="stage-head">
        <div>
          <h3>${item.range}</h3>
          <p>${item.summary}</p>
        </div>
        <span class="stage-tag">${item.tag}</span>
      </div>
      <div class="decade-meta">
        <p><strong>命核</strong>${item.core}</p>
        <p><strong>命伤</strong>${item.wound}</p>
        <p><strong>主任务</strong>${item.task}</p>
        <p><strong>成画线</strong>${item.art}</p>
        <p><strong>一句定性</strong>${item.verdict}</p>
      </div>
    </article>
  `).join("");
}

function parseDecadeRange(range) {
  const [start, end] = String(range || "").split("-").map(Number);
  return { start, end };
}

function getPersonalDecadeByYear(year) {
  return PERSONAL_DECADE_PROFILE.find((item) => {
    const { start, end } = parseDecadeRange(item.range);
    return year >= start && year <= end;
  }) || PERSONAL_DECADE_PROFILE[PERSONAL_DECADE_PROFILE.length - 1];
}

function getPersonalDecadeForRange(startYear, endYear) {
  const exact = PERSONAL_DECADE_PROFILE.find((item) => {
    const { start, end } = parseDecadeRange(item.range);
    return startYear >= start && endYear <= end;
  });
  if (exact) return { type: "single", start: exact, end: exact };
  return {
    type: "cross",
    start: getPersonalDecadeByYear(startYear),
    end: getPersonalDecadeByYear(endYear),
  };
}

function renderQuickBirthTags(container, tags) {
  if (!container) return;
  if (!tags?.length) {
    container.innerHTML = '<span class="quick-keyword-tag">待看</span>';
    return;
  }
  container.innerHTML = tags.map((item) => `<span class="quick-keyword-tag">${item}</span>`).join("");
}

function renderQuickBirthHistory() {
  if (!quickBirthHistory) return;
  const history = normalizeQuickBirthHistory(getQuickBirthHistory());
  const keyword = "";
  const filtered = keyword
    ? history.filter((item) => String(item.name || "").toLowerCase().includes(keyword))
    : history;
  if (!filtered.length) {
    quickBirthHistory.innerHTML = '<span class="quick-history-empty">还没有案主资料</span>';
    return;
  }
  quickBirthHistory.innerHTML = filtered.map((item) => {
    const index = history.findIndex((source) => quickBirthRecordKey(source) === quickBirthRecordKey(item));
    const label = item.name || `此人 ${index + 1}`;
    const birthday = [item.year, item.month, item.day].filter(Boolean).join(".");
    const city = item.locationDisplay || item.city || "城市未填";
    return `
      <div class="quick-history-card-row${item.pinned ? " is-pinned" : ""}" data-quick-history-index="${index}">
        <button class="quick-history-card-main" type="button" data-quick-history-open="${index}">
          <span class="quick-history-card-name">${label}</span>
          <span class="quick-history-card-meta">${birthday || "生日待补"}</span>
          <span class="quick-history-card-summary">${city}</span>
        </button>
        <span class="quick-history-actions">
          <button class="quick-history-action" type="button" data-quick-history-edit="${index}">改</button>
          <button class="quick-history-action" type="button" data-quick-history-remove="${index}">删</button>
        </span>
      </div>
    `;
  }).join("");
}
window.renderQuickBirthHistory = renderQuickBirthHistory;

function applyQuickBirthHistoryRecord(index) {
  const record = normalizeQuickBirthHistory(getQuickBirthHistory())[index];
  if (!record) return;
  if (quickNameInput) quickNameInput.value = record.name || "";
  if (quickBirthCityInput) quickBirthCityInput.value = record.locationDisplay || record.city || "";
  if (quickBirthDateInput) quickBirthDateInput.value = `${String(record.year || 1986).padStart(4, "0")}-${String(record.month || 1).padStart(2, "0")}-${String(record.day || 1).padStart(2, "0")}`;
  syncQuickBirthDays();
  if (quickBirthGenderSelect) quickBirthGenderSelect.value = record.gender || "female";
  if (quickTimeUnknown) quickTimeUnknown.checked = !record.timeKnown;
  if (quickBirthTimeInput) quickBirthTimeInput.value = record.time || "";
  syncQuickTimeMode();
  quickBirthSelectedCityOption = record.locationDisplay || record.city ? {
    display: record.locationDisplay || record.city,
    city: record.city || "",
    timezone: record.timezone || "",
    latitude: record.latitude,
    longitude: record.longitude,
  } : null;
  applyQuickBirthCityHint(quickBirthSelectedCityOption);
  if (quickBirthHistoryPanel) quickBirthHistoryPanel.open = false;
  renderQuickBirthHistoryFallback(record);
  applyQuickBirthProfile();
}
window.applyQuickBirthHistoryRecord = applyQuickBirthHistoryRecord;

function renderQuickBirthHistoryFallback(record) {
  if (!record) return;
  const birthYear = Number(record.year || 1986);
  const series = Array.from({ length: 81 }, (_, age) => {
    const base =
      age <= 20 ? 3.1 + age * 0.045 :
      age <= 40 ? 4.0 + (age - 20) * 0.055 :
      age <= 60 ? 5.1 + (age - 40) * 0.04 :
      5.9 + (age - 60) * 0.018;
    return {
      year: birthYear + age,
      age,
      score: Math.max(1.4, Math.min(8.4, Number(base.toFixed(2)))),
    };
  });
  const title = record.city ? `${record.name || "此人"} · ${record.city} · 八字作用线` : `${record.name || "此人"} · 八字作用线`;
  chartState.quickBirth.selectedYear = birthYear;
  chartState.quickBirth.previewYear = null;
  renderQuickBirthChart(series, title, chartState.quickBirth.selectedYear, null);
  if (quickBirthTitle) {
    const dateText = `${String(record.year || "").padStart(4, "0")}-${String(record.month || "").padStart(2, "0")}-${String(record.day || "").padStart(2, "0")}`;
    quickBirthTitle.textContent = `${record.name || "此人"} · ${dateText}${record.time ? ` ${record.time}` : ""} · 八字排盘`;
  }
  if (quickBirthSummary) quickBirthSummary.textContent = "已调出案主资料。若接口稍后返回，会自动刷新成完整四柱结果。";
  if (quickBirthNote) quickBirthNote.textContent = "先显示资料库中的已存结果与作用线，再尝试重新排盘。";
  if (quickBirthArchetype) quickBirthArchetype.textContent = record.archetype || "先显示已存档结果。";
  if (quickBirthDepth) quickBirthDepth.textContent = record.texture === "strong" ? "自己偏强。" : record.texture === "weak" ? "自己偏弱。" : record.texture === "balanced" ? "相对均衡。" : "先显示已存档结果。";
  if (quickBirthPattern) quickBirthPattern.textContent = record.structure || "命格倾向待判";
  if (quickBirthLevel) quickBirthLevel.textContent = record.archetype || "先显示已存档结果。";
  renderProfileGrid(quickBirthCoreProfile, [
    { label: "出生底盘", text: `先调出 ${record.name || "此人"} 的已存资料。完整四柱结果返回后会自动更新。` },
    { label: "这个人", text: "先显示资料库里已有的四柱标签与城市信息。" },
    { label: "怎么走更顺", text: "如果接口正常返回，会自动补齐用神、忌神与结构分析。" },
    { label: "人生节奏", text: "先看作用线，再等完整结果覆盖。" },
  ]);
}

window.renderQuickBirthHistoryFallback = renderQuickBirthHistoryFallback;
window.applyQuickBirthProfile = applyQuickBirthProfile;

function yearFromQuickBirthChartEvent(svgEl, event) {
  const series = chartState.quickBirth.series || [];
  if (!series.length) return null;
  const rect = svgEl.getBoundingClientRect();
  const width = 720;
  const left = 52;
  const right = 18;
  const chartWidth = width - left - right;
  const pointerX = ((event.clientX - rect.left) / rect.width) * width;
  const clampedX = Math.max(left, Math.min(width - right, pointerX));
  const ratio = (clampedX - left) / chartWidth;
  const index = Math.round(ratio * (series.length - 1));
  return series[Math.max(0, Math.min(series.length - 1, index))]?.year || null;
}

function bindQuickBirthChartEvents() {
  if (!quickBirthChart || quickBirthChart.dataset.bound === "true") return;

  const syncReadout = (year, event = null) => {
    const series = chartState.quickBirth.series || [];
    const item = series.find((entry) => entry.year === year) || series[0];
    if (!item) return;
    if (quickBirthChartReadout) {
      quickBirthChartReadout.textContent = `年份 ${item.year} · 年龄 ${item.age}岁 · 作用 ${item.score.toFixed(1)}`;
    }
  };

  const handleMove = (event) => {
    const target = event.target.closest("[data-quick-year]");
    const year = target ? Number(target.dataset.quickYear) : yearFromQuickBirthChartEvent(quickBirthChart, event);
    if (!year) return;
    chartState.quickBirth.previewYear = year;
    renderQuickBirthChart(chartState.quickBirth.series, chartState.quickBirth.title || "八字作用线", chartState.quickBirth.selectedYear, chartState.quickBirth.previewYear);
    syncReadout(year, event);
  };

  const handleLeave = () => {
    chartState.quickBirth.previewYear = null;
    renderQuickBirthChart(chartState.quickBirth.series, chartState.quickBirth.title || "八字作用线", chartState.quickBirth.selectedYear, null);
    syncReadout(chartState.quickBirth.selectedYear);
    if (quickBirthChartFloat) quickBirthChartFloat.hidden = true;
  };

  const handleClick = (event) => {
    const target = event.target.closest("[data-quick-year]");
    const year = target ? Number(target.dataset.quickYear) : yearFromQuickBirthChartEvent(quickBirthChart, event);
    if (!year) return;
    chartState.quickBirth.selectedYear = year;
    chartState.quickBirth.previewYear = null;
    renderQuickBirthChart(chartState.quickBirth.series, chartState.quickBirth.title || "八字作用线", chartState.quickBirth.selectedYear, null);
    syncReadout(year, event);
  };

  const touchLikeEvent = (touch) => ({
    clientX: touch.clientX,
    clientY: touch.clientY,
    target: document.elementFromPoint(touch.clientX, touch.clientY) || quickBirthChart,
  });

  const handleTouchMove = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    handleMove(touchLikeEvent(touch));
  };

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    handleClick(touchLikeEvent(touch));
  };

  quickBirthChart.addEventListener("pointermove", handleMove);
  quickBirthChart.addEventListener("pointerenter", handleMove);
  quickBirthChart.addEventListener("pointerdown", handleClick);
  quickBirthChart.addEventListener("pointerleave", handleLeave);
  quickBirthChart.addEventListener("click", handleClick);
  quickBirthChart.addEventListener("mousemove", handleMove);
  quickBirthChart.addEventListener("mouseenter", handleMove);
  quickBirthChart.addEventListener("mouseleave", handleLeave);
  quickBirthChart.addEventListener("touchstart", handleTouchStart, { passive: true });
  quickBirthChart.addEventListener("touchmove", handleTouchMove, { passive: true });
  quickBirthChart.addEventListener("touchend", handleLeave, { passive: true });
  quickBirthChart.dataset.bound = "true";
}

function bindQuickBirthChartHitTargets() {
  if (!quickBirthChart) return;
  const targets = Array.from(quickBirthChart.querySelectorAll("[data-quick-year]"));
  targets.forEach((target) => {
    if (target.dataset.bound === "true") return;
    const pickYear = () => Number(target.getAttribute("data-quick-year"));
    const preview = () => {
      const year = pickYear();
      if (!year) return;
      chartState.quickBirth.previewYear = year;
      renderQuickBirthChart(
        chartState.quickBirth.series,
        chartState.quickBirth.title || "八字作用线",
        chartState.quickBirth.selectedYear,
        year
      );
    };
    const select = () => {
      const year = pickYear();
      if (!year) return;
      chartState.quickBirth.selectedYear = year;
      chartState.quickBirth.previewYear = null;
      renderQuickBirthChart(
        chartState.quickBirth.series,
        chartState.quickBirth.title || "八字作用线",
        chartState.quickBirth.selectedYear,
        null
      );
    };
    target.addEventListener("mouseenter", preview);
    target.addEventListener("mousemove", preview);
    target.addEventListener("click", select);
    target.addEventListener("touchstart", select, { passive: true });
    target.addEventListener("touchmove", preview, { passive: true });
    target.dataset.bound = "true";
  });
}

function dismissQuickBirthOverlays() {
  hideQuickBirthCityOptions();
  if (quickBirthCityHideTimer) {
    window.clearTimeout(quickBirthCityHideTimer);
    quickBirthCityHideTimer = null;
  }
}

function removeQuickBirthHistoryRecord(index) {
  const history = normalizeQuickBirthHistory(getQuickBirthHistory());
  const record = history[index];
  if (!record) return;
  markQuickBirthDeleted(record);
  history.splice(index, 1);
  const next = normalizeQuickBirthHistory(history).filter((item) => !isQuickBirthDeleted(item));
  saveQuickBirthHistory(next);
  renderQuickBirthHistory();
  saveDeletedQuickBirthKeyToCloud(record).catch(() => {});
  deleteQuickBirthRecordEverywhere(record).catch(() => {});
}

function mergeQuickBirthHistoryRecords(records) {
  const current = normalizeQuickBirthHistory(getQuickBirthHistory());
  const merged = [...current];
  records.forEach((record) => {
    if (!record || !record.year || !record.month || !record.day) return;
    const normalized = {
      name: String(record.name || "此人").trim(),
      city: String(record.city || "").trim(),
      locationDisplay: String(record.locationDisplay || "").trim(),
      timezone: String(record.timezone || "").trim(),
      latitude: typeof record.latitude === "number" ? record.latitude : Number.isFinite(Number(record.latitude)) ? Number(record.latitude) : undefined,
      longitude: typeof record.longitude === "number" ? record.longitude : Number.isFinite(Number(record.longitude)) ? Number(record.longitude) : undefined,
      year: Number(record.year),
      month: Number(record.month),
      day: Number(record.day),
      gender: record.gender === "male" ? "male" : record.gender === "female" ? "female" : "",
      timeKnown: Boolean(record.timeKnown),
      time: String(record.time || ""),
      structure: String(record.structure || ""),
      texture: String(record.texture || ""),
      pinned: Boolean(record.pinned),
    };
    if (isQuickBirthDeleted(normalized)) return;
    const normalizedKey = quickBirthRecordKey(normalized);
    const existingIndex = merged.findIndex((item) => quickBirthRecordKey(item) === normalizedKey);
    if (existingIndex >= 0) {
      merged[existingIndex] = { ...merged[existingIndex], ...normalized, pinned: merged[existingIndex].pinned || normalized.pinned };
    } else {
      merged.push(normalized);
    }
  });
  saveQuickBirthHistory(normalizeQuickBirthHistory(merged));
  renderQuickBirthHistory();
}

async function deleteQuickBirthRecordEverywhere(record) {
  const recordKey = quickBirthRecordKey(record);
  try {
    const remote = await readCloudStore(BAZI_QUICK_HISTORY_SCOPE);
    const nextHistory = normalizeQuickBirthHistory(Array.isArray(remote) ? remote : [])
      .filter((item) => quickBirthRecordKey(item) !== recordKey);
    await writeCloudStore(BAZI_QUICK_HISTORY_SCOPE, nextHistory);
  } catch {}

  try {
    const profiles = await loadSharedProfiles();
    const nextProfiles = profiles.filter((item) => {
      const candidate = {
        name: String(item?.name || "此人").trim(),
        year: Number(String(item?.birthDate || "").split("-")[0] || 0),
        month: Number(String(item?.birthDate || "").split("-")[1] || 0),
        day: Number(String(item?.birthDate || "").split("-")[2] || 0),
        gender: item?.gender === "male" ? "male" : item?.gender === "female" ? "female" : "",
      };
      return quickBirthRecordKey(candidate) !== recordKey;
    });
    await writeCloudStore(SHARED_PROFILES_SCOPE, nextProfiles);
  } catch {}
}

function renderQuickBirthChart(series, title, selectedYear = null, previewYear = null) {
  if (!quickBirthChart) return;
  if (!series?.length) {
    quickBirthChart.innerHTML = "";
    if (quickBirthChartReadout) quickBirthChartReadout.textContent = "年份 1986 · 年龄 0岁 · 作用 0.0";
    chartState.quickBirth.series = [];
    chartState.quickBirth.selectedYear = null;
    chartState.quickBirth.previewYear = null;
    chartState.quickBirth.title = "";
    return;
  }

  const width = 720;
  const height = 300;
  const left = 52;
  const right = 18;
  const top = 16;
  const bottom = 40;
  const years = series.map((item) => item.year);
  const birthYear = years[0];
  const endYear = years[years.length - 1];
  chartState.quickBirth.series = series;
  chartState.quickBirth.title = title;
  if (!chartState.quickBirth.selectedYear) {
    chartState.quickBirth.selectedYear = birthYear;
  }
  const x = (index) => left + ((width - left - right) / (series.length - 1)) * index;
  const y = (score) => height - bottom - ((height - top - bottom) * (score - 1)) / 8;
  const phaseZones = [
    { label: "前段", startAge: 0, endAge: 20 },
    { label: "中前段", startAge: 21, endAge: 40 },
    { label: "中后段", startAge: 41, endAge: 60 },
    { label: "后段", startAge: 61, endAge: 80 },
  ].map((phase, index) => {
    const startX = x(phase.startAge);
    const endX = x(Math.min(series.length - 1, phase.endAge));
    const zoneWidth = Math.max(6, endX - startX);
    return `
      <rect x="${startX}" y="${top}" width="${zoneWidth}" height="${height - top - bottom}" fill="${index % 2 === 0 ? "rgba(17,17,17,0.018)" : "rgba(17,17,17,0.006)"}" />
      <text x="${startX + zoneWidth / 2}" y="${top + 12}" text-anchor="middle" font-size="10.5" fill="#8d8d87">${phase.label}</text>
    `;
  }).join("");

  const grid = [2, 4, 6, 8].map((score) => {
    const yy = y(score);
    return `<line x1="${left}" y1="${yy}" x2="${width - right}" y2="${yy}" stroke="rgba(21,21,21,0.045)" stroke-width="1" />`;
  }).join("");

  const tickYears = [];
  for (let year = birthYear; year <= endYear; year += 10) tickYears.push(year);
  if (tickYears[tickYears.length - 1] !== endYear) tickYears.push(endYear);

  const yearTicks = tickYears.map((year) => {
    const index = year - birthYear;
    const xx = x(index);
    return `
      <line x1="${xx}" y1="${top}" x2="${xx}" y2="${height - bottom}" stroke="rgba(21,21,21,0.032)" stroke-width="1" />
      <text x="${xx}" y="${height - 15}" text-anchor="middle" font-size="11" fill="#7a7a74">${year}</text>
      <text x="${xx}" y="${height - 2}" text-anchor="middle" font-size="10" fill="#9a9a93">${year - birthYear}岁</text>
    `;
  }).join("");

  const scoreLabels = [
    { score: 1, label: "作用弱" },
    { score: 3, label: "偏压" },
    { score: 5, label: "平衡" },
    { score: 7, label: "得力" },
    { score: 9, label: "作用强" },
  ].map((item) => `
    <text x="${left - 12}" y="${y(item.score) + 4}" text-anchor="end" font-size="10.4" fill="#9b9b94">${item.label}</text>
  `).join("");

  const path = series.map((item, index) => `${index === 0 ? "M" : "L"} ${x(index).toFixed(2)} ${y(item.score).toFixed(2)}`).join(" ");
  const activeYear = Math.max(birthYear, Math.min(endYear, previewYear || selectedYear || chartState.quickBirth.selectedYear || birthYear));
  const activeIndex = activeYear - birthYear;
  const activeItem = series[activeIndex];
  const activeX = x(activeIndex);
  const activeY = y(activeItem.score);
  let hitTargets = "";
  series.forEach((item, index) => {
    hitTargets += `<rect data-quick-year="${item.year}" x="${x(index) - 11}" y="${top}" width="22" height="${height - top - bottom}" fill="transparent" pointer-events="all"></rect>`;
  });

  quickBirthChart.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="transparent"></rect>
    ${phaseZones}
    ${grid}
    ${yearTicks}
    ${scoreLabels}
    <line x1="${left}" y1="${height - bottom}" x2="${width - right}" y2="${height - bottom}" stroke="rgba(17,17,17,0.075)" stroke-width="1" />
    <line x1="${left}" y1="${top}" x2="${left}" y2="${height - bottom}" stroke="rgba(17,17,17,0.075)" stroke-width="1" />
    <path d="${path}" fill="none" stroke="#2b2b29" stroke-width="1.55" stroke-linejoin="round" stroke-linecap="round"></path>
    <line x1="${activeX}" y1="${top}" x2="${activeX}" y2="${height - bottom}" stroke="rgba(17,17,17,0.07)" stroke-width="1" stroke-dasharray="2 7" />
    <circle cx="${activeX}" cy="${activeY}" r="3.7" fill="#2b2b29" stroke="#fdfdfb" stroke-width="1.2"></circle>
    <g>
      <rect x="${Math.max(left + 10, Math.min(activeX - 42, width - right - 84))}" y="${top + 10}" width="84" height="40" rx="8" fill="rgba(253,253,251,0.92)" stroke="rgba(17,17,17,0.05)" />
      <text x="${Math.max(left + 14, Math.min(activeX - 36, width - right - 78))}" y="${top + 25}" font-size="10.8" letter-spacing="0.04em" fill="#2d2d2a">${activeItem.year} · ${activeItem.age}岁</text>
      <text x="${Math.max(left + 14, Math.min(activeX - 36, width - right - 78))}" y="${top + 39}" font-size="9.2" letter-spacing="0.03em" fill="#9d9d97">作用 ${activeItem.score.toFixed(1)}</text>
    </g>
    <text x="${left}" y="10" font-size="11.2" fill="#84847d">${escapeSvgText(title)}</text>
    <g>${hitTargets}</g>
  `;
  if (quickBirthChartReadout) {
    quickBirthChartReadout.textContent = `年份 ${activeItem.year} · 年龄 ${activeItem.age}岁 · 作用 ${activeItem.score.toFixed(1)}`;
  }
  bindQuickBirthChartHitTargets();
}

async function applyQuickBirthProfile() {
  const dateString = buildQuickDateString();
  if (!dateString) {
    if (quickBirthSummary) quickBirthSummary.textContent = "先输入生日。";
    return;
  }

  const label = (quickNameInput?.value || "此人").trim();
  const cityInput = String(quickBirthCityInput?.value || "").trim();
  const timeString = quickTimeUnknown?.checked ? "" : (quickBirthTimeInput?.value || "");

  try {
    let cityMeta = null;
    let cityResolveWarning = "";
    if (cityInput) {
      try {
        const chosenCity = quickBirthSelectedCityOption && quickBirthSelectedCityOption.display === cityInput
          ? quickBirthSelectedCityOption
          : citySuggestCache.get(cityInput);
        cityMeta = chosenCity && typeof chosenCity.utcOffsetMinutes === "number"
          ? chosenCity
          : await resolveCityMeta(
            chosenCity?.display || cityInput,
            parseQuickBirthDateParts()?.year,
            parseQuickBirthDateParts()?.month,
            parseQuickBirthDateParts()?.day
          );
      } catch (cityError) {
        cityResolveWarning = `出生城市没解析成功，先按默认时区排大势。${cityError instanceof Error ? cityError.message : ""}`.trim();
      }
    }
    const dateParts = parseQuickBirthDateParts();
    const enginePayload = {
      name: label,
      year: Number(dateParts?.year),
      month: Number(dateParts?.month),
      day: Number(dateParts?.day),
      gender: quickBirthGenderSelect?.value || undefined,
      hour: timeString ? Number(String(timeString).split(":")[0]) : undefined,
      minute: timeString ? Number(String(timeString).split(":")[1]) : undefined,
      timeKnown: Boolean(timeString),
      timezone: cityMeta?.timezone || "Asia/Shanghai",
      location: cityMeta?.display || cityInput,
      latitude: cityMeta?.latitude,
      longitude: cityMeta?.longitude,
      utcOffsetMinutes: cityMeta?.utcOffsetMinutes,
    };
    const chart = await fetchBaziChart(enginePayload);
    renderQuickBirthEngineResult({
      name: label,
      year: enginePayload.year,
      month: enginePayload.month,
      day: enginePayload.day,
      gender: enginePayload.gender || "",
      timeKnown: enginePayload.timeKnown,
      time: timeString,
      city: cityMeta?.city || cityInput,
      locationDisplay: cityMeta?.display || cityInput,
      timezone: cityMeta?.timezone || "",
      latitude: cityMeta?.latitude,
      longitude: cityMeta?.longitude,
      cityResolveWarning,
      dateString,
    }, chart);
    return;
  } catch (error) {
    if (quickBirthTitle) quickBirthTitle.textContent = `${label} · 八字接口错误`;
    if (quickBirthSummary) quickBirthSummary.textContent = "公共区接口这次没算出来。先检查生日、时间和城市写法，再重试。";
    if (quickBirthNote) quickBirthNote.textContent = `接口返回异常：${error.message}`;
    return;
  }
}

function resetQuickBirthProfile() {
  if (quickNameInput) quickNameInput.value = "";
  if (quickBirthCityInput) quickBirthCityInput.value = "";
  quickBirthSelectedCityOption = null;
  hideQuickBirthCityOptions();
  applyQuickBirthCityHint(null);
  if (quickBirthDateInput) quickBirthDateInput.value = "1986-09-10";
  syncQuickBirthDays();
  if (quickBirthGenderSelect) quickBirthGenderSelect.value = "female";
  if (quickTimeUnknown) quickTimeUnknown.checked = false;
  if (quickBirthTimeInput) quickBirthTimeInput.value = "";
  syncQuickTimeMode();
  if (quickBirthTitle) quickBirthTitle.textContent = "待看";
  if (quickBirthSummary) quickBirthSummary.textContent = "输入生日后显示八字作用线。无时辰时，只看大势，不看细盘，也不把单条曲线当绝对人生定论。";
  if (quickBirthLocation) quickBirthLocation.textContent = "先输入生日后显示。";
  if (quickBirthNote) quickBirthNote.textContent = "公共区已切到真实八字引擎；这里只呈现原局、大运、流年的相对作用变化。接口异常时不再回退旧原型。";
  if (quickBirthArchetype) quickBirthArchetype.textContent = "先输入生日后显示。";
  if (quickBirthDepth) quickBirthDepth.textContent = "先输入生日后显示。";
  if (quickBirthPattern) quickBirthPattern.textContent = "先输入生日后显示。";
  if (quickBirthLevel) quickBirthLevel.textContent = "先输入生日后显示。";
  if (quickBirthVerdict) quickBirthVerdict.textContent = "先输入生日后显示。";
  if (quickBirthSoulTask) quickBirthSoulTask.textContent = "先输入生日后显示。";
  if (quickBirthPurpose) quickBirthPurpose.textContent = "先输入生日后显示。";
  renderQuickBirthTags(quickBirthSurfaceTags, []);
  renderQuickBirthTags(quickBirthCoreTags, []);
  renderProfileGrid(quickBirthCoreProfile, []);
  renderQuickBirthDayunStages([]);
  renderQuickBirthStages([
    { label: "0-20", text: "先输入生日后显示阶段大意。" },
    { label: "20-40", text: "无时辰也可先看大关系。" },
    { label: "40-60", text: "这里只看阶段，不看每年细批。" },
    { label: "60-80", text: "适合朋友、父母、亲缘对照看。" },
  ]);
  if (quickBirthChart) quickBirthChart.innerHTML = "";
  chartState.quickBirth.series = [];
  chartState.quickBirth.selectedYear = null;
  chartState.quickBirth.previewYear = null;
  chartState.quickBirth.title = "";
}

getAuthState().then((state) => {
  if (state.authenticated) return;
  try {
    const current = loadState();
    delete current[QUICK_BIRTH_HISTORY_KEY];
    delete current[QUICK_BIRTH_DELETED_KEY];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {}
  renderQuickBirthHistory();
});

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosDevice() {
  const ua = window.navigator.userAgent || "";
  const platform = window.navigator.platform || "";
  return /iPad|iPhone|iPod/.test(ua) || (platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
}

function isSafariBrowser() {
  const ua = window.navigator.userAgent || "";
  return /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|OPT\//i.test(ua);
}

function shouldHideInstallBanner() {
  return window.localStorage.getItem(INSTALL_BANNER_KEY) === "1";
}

function hideInstallBanner(persist = false) {
  if (!installBanner) return;
  installBanner.hidden = true;
  if (persist) {
    window.localStorage.setItem(INSTALL_BANNER_KEY, "1");
  }
}

function showInstallBanner(text, buttonLabel = "添加", actionable = true) {
  if (!installBanner || !installText || !installButton) return;
  installBanner.hidden = false;
  installText.textContent = text;
  installButton.textContent = buttonLabel;
  installButton.hidden = !actionable;
}

function updateInstallBanner() {
  if (!installBanner) return;
  if (isStandaloneMode() || shouldHideInstallBanner()) {
    hideInstallBanner(false);
    return;
  }

  if (isIosDevice() && !isSafariBrowser()) {
    showInstallBanner("请先用 Safari 打开，再点分享，选“添加到主屏幕”。", "知道了", false);
    return;
  }

  if (isIosDevice() && isSafariBrowser()) {
    showInstallBanner("Safari 里点分享，再点“添加到主屏幕”。", "知道了", false);
    return;
  }

  if (deferredInstallPrompt) {
    showInstallBanner("点“添加”，把它放到手机桌面。", "添加", true);
    return;
  }

  showInstallBanner("浏览器菜单里点“添加到主屏幕”或“安装 App”。", "知道了", false);
}

function loadState() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState(nextState) {
  const current = loadState();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...nextState }));
}

function getHistoryFilter() {
  return loadState().historyFilter || "all";
}

function getReminderMode() {
  const value = loadState().reminderMode;
  if (value === "off") return "insight";
  if (value === "on" || !value) return "calm";
  return value;
}

function getEngineMode() {
  return "local";
}

function getAISettings() {
  const state = loadState();
  if (!aiProvider && !aiEndpoint && !aiModel) {
    return {
      provider: DEFAULT_AI_PROVIDER,
      endpoint: DEFAULT_AI_ENDPOINT,
      model: DEFAULT_AI_MODEL,
    };
  }
  return {
    provider: state.aiProvider || DEFAULT_AI_PROVIDER,
    endpoint: state.aiEndpoint || DEFAULT_AI_ENDPOINT,
    model: state.aiModel || DEFAULT_AI_MODEL,
  };
}

function getAiChatHistory() {
  return loadState()[AI_CHAT_HISTORY_KEY] || [];
}

function saveAiChatHistory(history) {
  saveState({ [AI_CHAT_HISTORY_KEY]: history.slice(-16) });
}

function getQuickBirthHistory() {
  if (authStateSnapshot.resolved && !authStateSnapshot.authenticated) return [];
  return loadState()[QUICK_BIRTH_HISTORY_KEY] || [];
}

function saveQuickBirthHistory(history) {
  if (!isAuthenticatedSync()) return;
  const nextHistory = history.slice(0, 24);
  saveState({ [QUICK_BIRTH_HISTORY_KEY]: nextHistory });
  writeCloudStore(BAZI_QUICK_HISTORY_SCOPE, nextHistory)
    .then(() => {
      quickBirthCloudReady = true;
    })
    .catch(() => {});
}

function normalizeQuickBirthHistory(history) {
  const dedupedMap = new Map();
  history.forEach((item, index) => {
    const normalized = { ...item, pinned: Boolean(item.pinned), _index: index };
    const key = quickBirthRecordKey(normalized);
    const existing = dedupedMap.get(key);
    const shouldReplace = !existing
      || quickBirthRecordCompleteness(normalized) > quickBirthRecordCompleteness(existing)
      || normalized._index > existing._index;
    if (shouldReplace) {
      dedupedMap.set(key, { ...existing, ...normalized, pinned: Boolean(existing?.pinned || normalized.pinned) });
    }
  });
  return Array.from(dedupedMap.values())
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return a._index - b._index;
    })
    .map(({ _index, ...item }) => item);
}

function buildExcerpt(answer) {
  const normalize = (text) => String(text || "")
    .replace(/^断语[:：]\s*/, "")
    .replace(/\s+/g, "")
    .replace(/[。；，：:]/g, "")
    .trim();

  const reminder = String(answer.reminder || "").replace(/^断语[:：]\s*/, "").trim();
  const phase = String(answer.phase || "").trim();
  const block = String(answer.block || "").trim();
  const support = String(answer.support || "").trim();
  const long = String(answer.long || "").trim();

  const reminderKey = normalize(reminder);
  const candidates = [phase, block, support, long].filter(Boolean);
  const different = candidates.find((item) => normalize(item) && normalize(item) !== reminderKey);

  if (different) return different.slice(0, 28);
  if (phase) return phase.slice(0, 28);
  if (reminder) return reminder.slice(0, 28);
  return long.slice(0, 28);
}

function getRenderedExcerpt() {
  const phase = String(answerPhase?.textContent || "").trim();
  const reminder = String(answerReminder?.textContent || "").trim();
  const block = String(answerBlock?.textContent || "").trim();
  const support = String(answerSupport?.textContent || "").trim();
  const long = String(questionAnswer?.textContent || "").trim();
  return buildExcerpt({
    phase,
    reminder,
    block,
    support,
    long,
  });
}

function escapeSvgText(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function triggerInstallPrompt() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const result = await deferredInstallPrompt.userChoice.catch(() => null);
  deferredInstallPrompt = null;
  if (result?.outcome === "accepted") {
    hideInstallBanner(true);
  } else {
    updateInstallBanner();
  }
}

function interpolateScore(anchors, year) {
  const years = Object.keys(anchors).map(Number).sort((a, b) => a - b);
  if (year <= years[0]) return anchors[years[0]];
  if (year >= years.at(-1)) return anchors[years.at(-1)];
  for (let i = 0; i < years.length - 1; i += 1) {
    const left = years[i];
    const right = years[i + 1];
    if (year >= left && year <= right) {
      const progress = (year - left) / (right - left);
      return +(anchors[left] + (anchors[right] - anchors[left]) * progress).toFixed(1);
    }
  }
  return 0;
}

function buildSeries(anchors) {
  return YEARS.map((year) => ({ year, score: interpolateScore(anchors, year) }));
}

function trendText(score) {
  if (score >= 7.5) return "高峰段";
  if (score >= 6) return "上升稳定";
  if (score >= 4) return "过渡与重组";
  if (score >= 2.5) return "受压但未断";
  return "低谷清算";
}

function stageForYear(year) {
  if (year <= 2005) return DESTINY_DATA.stages[0];
  if (year <= 2025) return DESTINY_DATA.stages[1];
  if (year <= 2055) return DESTINY_DATA.stages[2];
  return DESTINY_DATA.stages[3];
}

function stageForRange(startYear, endYear) {
  if (endYear <= 2005) return "早熟受压段";
  if (startYear >= 2026 && endYear <= 2055) return "回命成画段";
  if (startYear >= 2056) return "收束留证段";
  if (startYear <= 2025 && endYear >= 2026) return "拆旧到定轴的跨段期";
  return "拆旧回身段";
}

function guidanceFor(aspectKey, year, score) {
  const aspectMap = {
    overall: "先看主轴，不要用短期成败判断整条命。",
    money: "钱要跟主轴走，先让作品与收入接口变真实，不要急着靠错误路径证明自己。",
    career: "事业不是去迎合普通轨道，而是让你的命路、作品和现实承接逐步接上。",
    relationship: "关系里先守边界，不要用承接别人来换位置感。",
    property: "住处先求能安命，再求体面；你真正需要的是自己的壳。",
    influence: "不要追热闹，被真正会看的人认出来，比表层声量更重要。",
    health: "身体线先看耗损，不要等身体替你把旧账全说出来。",
    spiritual: "继续旁观、停旧逻辑、少索取，这条线是你回命最快的线。",
    growth: "每长出一点自己的判断力，都是主体回收，不要轻视这种慢。",
    art: "继续围着画活，让画从表达冲动走向显现能力。"
  };

  if (year <= 2005) return "这一段重点不是赢，而是看见早熟、受压、位置感失衡是怎样形成的。";
  if (year <= 2025) return `${aspectMap[aspectKey]} 这一阶段更像拆旧结构，先不要逼自己用旧逻辑活得很成功。`;
  if (year <= 2035) return `${aspectMap[aspectKey]} 这十年是重组与定轴，重点是让新命真的落地。`;
  if (year <= 2055) return `${aspectMap[aspectKey]} 这是厚起来的阶段，要守住减法、纯度和后劲。`;
  if (score >= 7) return `${aspectMap[aspectKey]} 晚段要做的是收束与留下证据，不是重新追赶。`;
  return aspectMap[aspectKey];
}

function specializedYearText(aspectKey, year) {
  const aspectYearly = DESTINY_DATA.aspectYearly?.[aspectKey];
  if (aspectYearly && aspectYearly[year]) return aspectYearly[year].trim();
  if (aspectKey !== "overall") {
    const overallYearly = DESTINY_DATA.aspectYearly?.overall;
    if (overallYearly && overallYearly[year]) return overallYearly[year].trim();
  }
  return buildSyntheticYearText(aspectKey, year);
}

function buildSyntheticYearText(aspectKey, year) {
  const score = interpolateScore(DESTINY_DATA.aspects[aspectKey]?.anchors || {}, year);
  const stage = stageForYear(year).tag;
  const aspectSignature = aspectYearSignatureText(aspectKey, year, score);
  const openings = {
    overall: {
      high: ["总命到这年，开始更像自己接自己。", "这一年的总命，不在表面顺，而在主轴更真。", "总命到这年，更像往实处落。"][year % 3],
      mid: ["总命到这年，重点是换轨，不是交卷。", "这一年的总命，更像暗里移位。", "总命到这年，先重站位，不重论成。"][year % 3],
      low: ["总命到这年，压势还在，但不是白压。", "这一年的总命，仍在逼你退错位。", "总命到这年，不宜硬破，先宜认旧账。"][year % 3]
    },
    money: {
      high: ["财路到这年，更像真钱开始接命。", "这一年的财路，更重真接口。", "财路到这年，钱开始往对的地方流。"][year % 3],
      mid: ["财路到这年，还在筛，不在定。", "这一年的财路，重在分路。", "财路到这年，先看什么钱能久。"][year % 3],
      low: ["财路到这年，匮乏感会更试人。", "这一年的财路，最怕因急回旧承接。", "财路到这年，紧不在少钱，只在错接。"][year % 3]
    },
    career: {
      high: ["业途到这年，开始像位置，不只像方向。", "这一年的业途，更容易与现实对位。", "业途到这年，像在慢慢成形。"][year % 3],
      mid: ["业途到这年，重在定轴。", "这一年的业途，先整轨，不抢大。", "业途到这年，先把路做正。"][year % 3],
      low: ["业途到这年，卡顿不等于错路。", "这一年的业途，重点仍在校正。", "业途到这年，新位未稳，旧位又退。"][year % 3]
    },
    relationship: {
      high: ["情缘到这年，更看质量，不看热闹。", "这一年的关系，边界稳，缘才稳。", "情缘到这年，开始更看真，不看烈。"][year % 3],
      mid: ["情缘到这年，更像筛选。", "这一年的关系，会拿旧模式来试你。", "情缘到这年，先看边界，再谈归属。"][year % 3],
      low: ["情缘到这年，孤独最会伪装成爱。", "这一年的关系线偏紧，不宜急认。", "情缘到这年，更要防旧戏回潮。"][year % 3]
    },
    property: {
      high: ["宅运到这年，更像收壳。", "这一年的住处，更能托命。", "宅运到这年，空间开始更贴这条命。"][year % 3],
      mid: ["宅运到这年，仍在过渡。", "这一年的住处，先安命，不安面。", "宅运到这年，更像试壳。"][year % 3],
      low: ["宅运到这年，不宜硬定。", "这一年的住处线，容器感仍重。", "宅运到这年，更怕把临时壳认成终局。"][year % 3]
    },
    influence: {
      high: ["名运到这年，更像被认出，不像被推响。", "这一年的影响，更重深打。", "名运到这年，会先被会看的人接住。"][year % 3],
      mid: ["名运到这年，仍在聚气。", "这一年的影响力，先窄后深。", "名运到这年，不必急着放大。"][year % 3],
      low: ["名运到这年，未宜强发。", "这一年的影响线，先蓄底。", "名运到这年，最怕为被看见而改坏自己。"][year % 3]
    },
    health: {
      high: ["体运到这年，更能托住你。", "这一年的身体，更像底盘。", "体运到这年，节律一稳，回报就明显。"][year % 3],
      mid: ["体运到这年，重在减耗。", "这一年的身体，会一直提醒你该停。", "体运到这年，不宜猛，只宜稳。"][year % 3],
      low: ["体运到这年，更像在报账。", "这一年的身体，最怕继续硬扛。", "体运到这年，先停透支。"][year % 3]
    },
    spiritual: {
      high: ["灵魂线到这年，更易安住。", "这一年的清明，会更往身上落。", "灵魂线到这年，更稳，不更玄。"][year % 3],
      mid: ["灵魂线到这年，重在回身。", "这一年的修行，不在新鲜感，在不跟。", "灵魂线到这年，更像知见落身。"][year % 3],
      low: ["灵魂线到这年，旧念会翻。", "这一年的修行线，更像回炉。", "灵魂线到这年，不怕波动，只怕认回去。"][year % 3]
    },
    growth: {
      high: ["身命到这年，更像站稳。", "这一年的主体感，会比前面更清。", "身命到这年，更像自己站自己。"][year % 3],
      mid: ["身命到这年，仍在慢长。", "这一年的成长，更像扎根。", "身命到这年，不热闹，但真在长。"][year % 3],
      low: ["身命到这年，旧评价仍会压人。", "这一年的成长感会发闷。", "身命到这年，更要防自己跟着旧评价一起压自己。"][year % 3]
    },
    art: {
      high: ["艺命到这年，更像开窗。", "这一年的作品，更容易准。", "艺命到这年，画会更像从命里自己长出来。"][year % 3],
      mid: ["艺命到这年，重在提纯。", "这一年的画，先删，不先加。", "艺命到这年，更像换骨，不像出量。"][year % 3],
      low: ["艺命到这年，仍在内炼。", "这一年的画，更适合守真。", "艺命到这年，不必逼熟。"][year % 3]
    }
  };
  const band = score >= 6.5 ? "high" : score >= 4 ? "mid" : "low";
  const text = openings[aspectKey]?.[band];
  const needle = yearlyNeedleText(aspectKey, year, score);
  return text ? `${stage}里，${aspectSignature ? `${aspectSignature}。` : ""}${text}${needle ? ` ${needle}` : ""}` : needle;
}

function yearPositionText(year) {
  const endings = year % 10;
  if (endings === 0 || endings === 5) return "节点味重";
  if (endings === 1 || endings === 6) return "起头感强";
  if (endings === 2 || endings === 7) return "校正感强";
  if (endings === 3 || endings === 8) return "显形感强";
  return "收拢感强";
}

function decadeSignatureText(year) {
  if (year <= 1995) return ["先天气重", "根部受压感重", "早段受制感重"][year % 3];
  if (year <= 2005) return ["成形前压感重", "早熟受压味重", "旧根系塑形感重"][year % 3];
  if (year <= 2015) return ["错位积累感重", "外轨牵引感重", "内外不合感重"][year % 3];
  if (year <= 2025) return ["拆旧感重", "退壳感重", "回身前夜感重"][year % 3];
  if (year <= 2035) return ["重组感重", "定轴感重", "起势前整轨感重"][year % 3];
  if (year <= 2045) return ["厚起感重", "渐成位置感重", "往实处落感重"][year % 3];
  if (year <= 2055) return ["后劲显影感重", "守成提纯感重", "厚度见真感重"][year % 3];
  return ["收束留证感重", "晚段守成感重", "归稳感重"][year % 3];
}

function yearSignatureText(year) {
  const left = yearPositionText(year);
  const right = decadeSignatureText(year);
  return `${left}，${right}`;
}

function aspectYearSignatureText(aspectKey, year, score) {
  const band = score >= 6.5 ? "high" : score >= 4 ? "mid" : "low";
  const pivot = year % 4;
  const signatures = {
    overall: {
      high: ["主轴回收感重", "命线聚拢感重", "自主定盘感重", "内外对位感重"][pivot],
      mid: ["换轨辨路感重", "暗里移位感重", "卸旧壳感重", "重新站位感重"][pivot],
      low: ["旧压翻涌感重", "错位退场感重", "受压辨路感重", "卡中清账感重"][pivot]
    },
    money: {
      high: ["真钱接口感重", "财线落袋感重", "收入归轴感重", "财路成形感重"][pivot],
      mid: ["筛财分路感重", "守边试财感重", "缓财校正感重", "真假财路分流感重"][pivot],
      low: ["匮乏翻涌感重", "错财诱回感重", "紧守边界感重", "旧依赖回潮感重"][pivot]
    },
    art: {
      high: ["作品显影感重", "语言成命感重", "画面见准感重", "留证成形感重"][pivot],
      mid: ["删改提纯感重", "材料换骨感重", "静里试语感重", "少而变准感重"][pivot],
      low: ["内炼闷烧感重", "藏锋守真感重", "证明心受试感重", "未熟先护火感重"][pivot]
    }
  };
  return signatures[aspectKey]?.[band] || "";
}

function yearlyNeedleText(aspectKey, year, score) {
  const endings = year % 10;
  const scoreBand = score >= 6.5 ? "high" : score >= 4 ? "mid" : "low";
  const needles = {
    overall: {
      high: ["这一年更像把命往自己手里收。", "很多决定会更偏向主轴本身。", "外部开始没那么容易把你整偏。", "这一年像主轴显影，不再全靠猜。", "更适合收拢杂线，只留真线。"][endings % 5],
      mid: ["这一年像换骨，不像收成。", "表面不一定快，内里却在重新站位。", "会反复辨别什么该留、什么该退。", "命感在露，不必急着定论。", "更像把旧壳往下卸。"][endings % 5],
      low: ["这一年受压感仍重，但不是白压。", "容易觉得卡，实则在逼你认旧账。", "很多不顺是在帮你退错位。", "别把暂时无路认成整条命无路。", "重点仍是不要回旧结构。"][endings % 5]
    },
    money: {
      high: ["财路会更认作品与主轴。", "钱开始更像回流，不像乞求。", "这年更适合把收入接口做实。", "来钱方式会更分明。", "真钱感开始比数字本身更重要。"][endings % 5],
      mid: ["钱线在筛，不宜乱接。", "先分清哪笔钱带路，哪笔钱带伤。", "收入会试你是否又想求快稳。", "这年财路像搭桥，不像过桥。", "先守真接口，比先增量重要。"][endings % 5],
      low: ["匮乏感容易放大。", "最怕为缓一时之急又把自己卖回去。", "这年钱紧时更要守边。", "收入焦虑会逼旧逻辑回潮。", "钱未开时，先别乱交命。"][endings % 5]
    },
    career: {
      high: ["业途会更像位置，而不只是事。", "外部开始认出你不是试试看。", "合作与现实承接更容易对位。", "这年更适合把路做深。", "事业感开始变得具体。"][endings % 5],
      mid: ["先定轴，再谈放大。", "表面慢，实则在校正位置。", "会看清哪些合作只是耗损。", "更适合整理路径，不适合乱扩。", "这一年像路基施工。"][endings % 5],
      low: ["旧身份在退，新位置未稳。", "这年卡，不代表这路错。", "越乱越要防回旧轨。", "很多事业焦虑其实来自错位。", "不必拿普通节奏逼自己。"][endings % 5]
    },
    relationship: {
      high: ["关系更看守位，不看热闹。", "能留下来的，往往更真。", "边界稳了，缘分才不虚。", "这年关系容易显出成色。", "更适合静深，不适合戏剧感。"][endings % 5],
      mid: ["旧情感模式会回来试你。", "会反复照见自己在关系里怎样失位。", "筛缘比求缘更重要。", "先看边界，再谈归属。", "不必把触动都认成真缘。"][endings % 5],
      low: ["孤独与内疚容易被误认成爱。", "最怕为了不空又回旧戏。", "关系线紧时更该先守自己。", "一动情就想退位的旧习会更明显。", "这年不宜急着认定归宿。"][endings % 5]
    },
    property: {
      high: ["空间开始更像命壳。", "住处会更托创作节律。", "这年更容易分清什么空间能养你。", "壳感增强，不再只是借住世界。", "住与命会更贴。"][endings % 5],
      mid: ["住处仍在过渡，不宜急认终局。", "先看安命，再看体面。", "这一年更像在试壳。", "空间选择会影响你的气。", "先把容器校正对。"][endings % 5],
      low: ["住处像临时壳，安定感不足。", "一怕没壳就容易乱选容器。", "这年宅运更怕勉强定局。", "不要把可住误当可久。", "容器不对时，整个人都会散。"][endings % 5]
    },
    influence: {
      high: ["被看见会更偏深，不偏广。", "容易打到真正会看的人。", "影响像慢慢沉进去。", "认出会开始更自然。", "这年更像后劲显影。"][endings % 5],
      mid: ["仍在聚气，不必抢声量。", "小范围被认出，比大范围被误读更好。", "先让作品自己说话。", "影响在长，不必急着放大。", "会看的人正在靠近。"][endings % 5],
      low: ["暂时无人懂，不等于没有命。", "最怕为被看见而改坏自己。", "声量焦虑会伤这条线。", "这一年名运更适合蓄底。", "宁可窄一点，也别失真。"][endings % 5]
    },
    health: {
      high: ["节律一稳，身体就会托你。", "体运更像底盘，不像拖累。", "能养住自己，是这年的福。", "这年身体对你的配合度更高。", "稳住作息，回报会很明显。"][endings % 5],
      mid: ["减耗比进补更重要。", "身体会持续提醒你别再乱耗。", "这一年更适合稳，不适合猛。", "作息一乱，反馈会很快。", "身线在教你少做多余消耗。"][endings % 5],
      low: ["身体在替旧活法报账。", "最怕一边难受一边还硬扛。", "这年体运像警报器。", "先停透支，比找妙法更重要。", "越焦虑越容易把小耗拖大。"][endings % 5]
    },
    spiritual: {
      high: ["看见之后，更容易真停。", "清明会往身体里落。", "这年更像安住，不像追体验。", "内里会更分明。", "灵魂线在慢慢成底。"][endings % 5],
      mid: ["旧念还会翻，但不必认。", "这一年像把知见往身上落。", "看见与回身会反复练习。", "会更清楚什么叫不跟。", "这年重点是稳，不是新鲜感。"][endings % 5],
      low: ["波动回来，不代表退步。", "这年更像回炉，不像开花。", "旧习会借境再起。", "一旦认回旧念，人就会累。", "灵魂线低时更要轻拿轻放。"][endings % 5]
    },
    growth: {
      high: ["主体感会更清楚。", "这年更像自己站自己。", "判断力开始更稳。", "越来越少需要外界解释你。", "人和命会更贴。"][endings % 5],
      mid: ["长得慢，但是真长。", "会一点点把自己收回来。", "成长更像扎根，不像爆发。", "这一年会练你的自持。", "别因不热闹就误判没变化。"][endings % 5],
      low: ["旧评价容易回来压你。", "晚成感会被放大。", "这年容易嫌自己不够。", "最怕刚看见旧我，就逼自己立刻完美。", "成长受闷，不等于成长没发生。"][endings % 5]
    },
    art: {
      high: ["作品会更准。", "语言更像从命里自己长出来。", "这年画更容易有显现感。", "少一点，反而更重一点。", "创作会更接近留证，不接近表演。"][endings % 5],
      mid: ["重心在提纯，不在堆量。", "材料、语言、结构都在找更准的位。", "这年更适合删，不适合加。", "创作线在静静换骨。", "别急着把半成熟的东西推出去。"][endings % 5],
      low: ["画未必多，但命还在里边烧。", "最怕为了成立而加太多。", "这年创作更适合内炼。", "证明心一重，作品就会浮。", "先守真，再谈成。"][endings % 5]
    }
  };

  return `${yearSignatureText(year)}，${needles[aspectKey]?.[scoreBand] || "这一年有自己的细部课题。"}`
}

function steadyYearText(aspectKey, year, score) {
  const scoreBand = score >= 6.5 ? "high" : score >= 4 ? "mid" : "low";
  const endings = year % 5;
  const texts = {
    overall: {
      high: [
        "这一年更像守成年，重在把已经对的东西守稳。",
        "这一年更像定盘年，外面未必响，内里却更定。",
        "这一年更像沉实年，不必猛冲，贵在不偏。",
        "这一年更像蓄势年，命线在暗里往实处长。",
        "这一年更像稳轴年，先不乱动，比乱突破更重要。"
      ],
      mid: [
        "这一年更像停驻年，重在守位，不重在猛冲。",
        "这一年更像校正年，不是没动，而是动得很内里。",
        "这一年更像收拢年，很多事在往中心线靠。",
        "这一年更像缓行年，外部平，内部却在调整站位。",
        "这一年更像过门槛前的定气，不必急着看结果。"
      ],
      low: [
        "这一年更像闷压年，先别乱冲，重点是别回错位。",
        "这一年更像低稳年，不显进展，但也不是白停。",
        "这一年更像暗耗年，先守住自己，不让旧力牵回去。",
        "这一年更像忍重年，局面不松时更要少乱动。",
        "这一年更像伏线年，路还没开全，先别自己乱断。"
      ]
    },
    art: {
      high: [
        "这一年更像养画年，重在让语言自己熟，不重在猛出。",
        "这一年更像沉墨年，作品会慢，但会更准。",
        "这一年更像提纯年，不必拼数量，守住那一点真。",
        "这一年更像内熟年，画面未必热闹，气却更整。",
        "这一年更像静长年，少做一点，反而更像你。"
      ],
      mid: [
        "这一年更像磨画年，重在删，不重在扩。",
        "这一年更像试语年，材料和语言都在慢慢找准位。",
        "这一年更像换骨年，先让画稳住，不急着求成立。",
        "这一年更像蓄火年，火没灭，只是还没到外放的时候。",
        "这一年更像留白年，不怕少，怕不准。"
      ],
      low: [
        "这一年更像闷烧年，画不必多，但命火不能乱用。",
        "这一年更像伏笔年，先别逼作品替你证明什么。",
        "这一年更像止语年，宁可安静内炼，也别乱加戏。",
        "这一年更像藏锋年，不成立，不等于没有长。",
        "这一年更像回炉年，重点是守真，不是求快。"
      ]
    },
    money: {
      high: [
        "这一年财更像稳流，不像暴涨，重在留得住。",
        "这一年财更像沉下来，不必靠猛冲见效。",
        "这一年钱路偏稳，关键是别乱开口子。",
        "这一年更像固财年，先把对的接口养厚。",
        "这一年钱势平稳，守真接口比追增量重要。"
      ],
      mid: [
        "这一年财更像筛流年，来得不猛，但在慢慢分路。",
        "这一年更像过账年，重点是看哪条路该留。",
        "这一年钱线不显冲劲，反而适合校正财路。",
        "这一年更像缓财年，别因平就误判成没路。",
        "这一年财势更重守边，不重乱接。"
      ],
      low: [
        "这一年钱压不一定大起落，却会慢慢磨你的匮乏感。",
        "这一年更像紧守年，先别因焦虑而乱接钱。",
        "这一年财未松，重点是守住不回旧路。",
        "这一年更像低流年，缓，但更考验边界。",
        "这一年钱不在冲，反在试你还会不会卖回自己。"
      ]
    }
  };

  const fallback = texts.overall[scoreBand];
  const pool = texts[aspectKey]?.[scoreBand] || fallback;
  return pool[endings];
}

function yearlyMotionText(aspectKey, year) {
  const anchors = DESTINY_DATA.aspects[aspectKey]?.anchors || {};
  const prevScore = interpolateScore(anchors, Math.max(START_YEAR, year - 1));
  const nowScore = interpolateScore(anchors, year);
  const nextScore = interpolateScore(anchors, Math.min(END_YEAR, year + 1));
  const deltaPrev = nowScore - prevScore;
  const deltaNext = nextScore - nowScore;

  if (deltaPrev >= 0.8 && deltaNext >= 0.3) return "这一年是明显上提年，事情开始往前接。";
  if (deltaPrev <= -0.8 && deltaNext <= -0.2) return "这一年是下探年，先别急着拿表象判死。";
  if (Math.abs(deltaPrev) < 0.25 && Math.abs(deltaNext) < 0.25) return steadyYearText(aspectKey, year, nowScore);
  if (deltaPrev >= 0.4 && deltaNext < 0) return "这一年像起后校正，先有抬头，再看能否站稳。";
  if (deltaPrev < 0 && deltaNext >= 0.4) return "这一年像压后回弹，不必把一时受阻认成退命。";
  return "这一年是过渡年，外部不一定定型，内里却在换轨。";
}

function yearlyFocusText(aspectKey, year, score) {
  const focusMap = {
    overall: score >= 6 ? "重点在稳主轴，不在乱接外部标准。" : "重点在辨别哪些旧逻辑还在拖你。",
    money: score >= 6 ? "重点在把钱留在真接口，不回旧路。" : "重点在断假承接，不为匮乏乱卖自己。",
    career: score >= 6 ? "重点在让作品、现实、位置感继续并轨。" : "重点在先定轴，不急着证成。",
    relationship: score >= 6 ? "重点在守边界后再谈关系深浅。" : "重点在不因孤独和内疚回旧戏。",
    property: score >= 6 ? "重点在壳感与创作节律配套。" : "重点在先安命，不急着安家。",
    influence: score >= 6 ? "重点在让真正会看的人继续认出你。" : "重点在不被声量焦虑带偏。",
    health: score >= 6 ? "重点在守节律，不做多余透支。" : "重点在减耗，别让身体替你还账。",
    spiritual: score >= 6 ? "重点在稳，不在再求特别体验。" : "重点在看见后能停，不再认旧念为我。",
    growth: score >= 6 ? "重点在继续站自己，不回头解释。" : "重点在允许自己慢，不拿暂时结果否命。",
    art: score >= 6 ? "重点在减法与提纯，让作品自己显。" : "重点在别急着做大，先把语言做真。"
  };
  return focusMap[aspectKey] || "重点在守住这一线自己的节律。";
}

function yearlyEffectText(aspectKey, year, score) {
  const phase = stageForYear(year).tag;
  const scoreBand = score >= 6.5 ? "strong" : score >= 4 ? "mid" : "low";
  const effects = {
    overall: {
      strong: `在${phase}里，这一年更容易把散的东西收回主轴，现实会开始跟命走。`,
      mid: `在${phase}里，这一年更像换挡，不一定显得顺，但内里正在转向。`,
      low: `在${phase}里，这一年更多是在压中辨路，不宜急着判自己成败。`
    },
    money: {
      strong: `这年的钱更像能落袋的真钱，不只是象征性回流。`,
      mid: `这年的钱在筛路，什么能久，什么会伤命，会慢慢分清。`,
      low: `这年的钱压感更重，匮乏感容易逼你回旧路。`
    },
    career: {
      strong: `这年的业途更像有位次，外部开始认出你这条路不是随便试试。`,
      mid: `这年的业途重在整轨，许多看似慢，其实是在校正。`,
      low: `这年的业途会显得卡，旧身份退得比新位置长得快。`
    },
    relationship: {
      strong: `这年的关系更看清明与边界，能留下来的会更真。`,
      mid: `这年的情缘像筛选，不合命的连接更容易自己露底。`,
      low: `这年的关系容易勾旧伤，孤独和内疚都会放大。`
    },
    property: {
      strong: `这年的住处更像收壳，空间开始托住你的气与作品。`,
      mid: `这年的宅运仍在过渡，但会更清楚自己要什么样的壳。`,
      low: `这年的住处线不稳，容器感重，安顿感不足。`
    },
    influence: {
      strong: `这年的名运更容易被会看的人接住，影响是往深里打。`,
      mid: `这年的名运在聚气，认出会先发生在小范围。`,
      low: `这年的名运不宜强求显化，先蓄底比先热闹重要。`
    },
    health: {
      strong: `这年的体运较能托命，前提是你不再随便透支。`,
      mid: `这年的身体在提醒你调节律，轻忽就会回到旧耗损。`,
      low: `这年的体运更像报警，不停就容易把小耗拖大。`
    },
    spiritual: {
      strong: `这年的灵魂线更容易稳住，清明不只在头脑，会往身体里落。`,
      mid: `这年的灵魂线在深化，看见与停的能力会继续长。`,
      low: `这年的灵魂线像回炉，旧念会翻，但正好看清还剩什么没退。`
    },
    growth: {
      strong: `这年的身命更容易站住自己，不再总被外界定义牵着走。`,
      mid: `这年的成长是慢扎根，不显山露水，却在实长。`,
      low: `这年的成长会显得发闷，因为旧我还在最后拉扯。`
    },
    art: {
      strong: `这年的艺命更容易出准头，作品会更像你命里长出来的。`,
      mid: `这年的艺术线重在提纯语言，不是拼数量的时候。`,
      low: `这年的画更适合内炼，不宜为了证明而乱扩。`
    }
  };
  return effects[aspectKey]?.[scoreBand] || "";
}

function normalizeReadingText(text) {
  return String(text || "")
    .replace(/\s+/g, "")
    .replace(/[。；，、：:“”"']/g, "")
    .trim();
}

function normalizeReadingConcept(text) {
  let normalized = normalizeReadingText(text);
  const conceptGroups = [
    { canonical: "守位", words: ["守位", "站位", "退位", "位置", "旧位", "容器位"] },
    { canonical: "主轴", words: ["主轴", "定轴", "归轴", "轴心"] },
    { canonical: "换骨", words: ["换骨", "换轨", "重组", "整轨", "并轨"] },
    { canonical: "提纯", words: ["提纯", "删", "减法", "留白", "去掉", "纯"] },
    { canonical: "旧路", words: ["旧路", "旧轨", "回头", "回旧", "错路"] },
    { canonical: "边界", words: ["边界", "守边", "界限"] },
    { canonical: "安住", words: ["安住", "回身", "不跟", "清明"] },
    { canonical: "减耗", words: ["减耗", "节律", "透支", "乱耗"] },
    { canonical: "真钱", words: ["真钱", "接口", "财路", "落袋"] },
    { canonical: "内炼", words: ["内炼", "闷烧", "回炉", "守真"] }
  ];

  conceptGroups.forEach(({ canonical, words }) => {
    if (words.some((word) => normalized.includes(word))) {
      normalized += `|${canonical}`;
    }
  });
  return normalized;
}

function filterDuplicateReadingParts(parts, anchorText = "") {
  const anchor = normalizeReadingConcept(anchorText);
  const seen = new Set(anchor ? [anchor] : []);
  return parts.filter((part) => {
    const key = normalizeReadingConcept(part);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function yearlyRiskText(aspectKey, score) {
  const riskMap = {
    overall: score >= 6 ? "勿因局面稍顺就重新分心。" : "最怕见慢就误判整条命。",
    money: score >= 6 ? "最怕一稳就乱接不该接的钱。" : "最怕因钱慌又回旧承接。",
    career: score >= 6 ? "最怕位置刚起就急着扩。" : "最怕卡住时回旧轨求稳。",
    relationship: score >= 6 ? "最怕边界一松又退回旧位。" : "最怕把孤独、内疚认成爱。",
    property: score >= 6 ? "最怕为了体面换掉真能安命的壳。" : "最怕怕漂就乱定容器。",
    influence: score >= 6 ? "最怕被看见后反而迎合外部。" : "最怕急着求声量。",
    health: score >= 6 ? "最怕觉得能扛就继续乱耗。" : "最怕身体报警时还硬撑。",
    spiritual: score >= 6 ? "最怕把稳住误认成已经彻底过关。" : "最怕波动回来就认旧念为我。",
    growth: score >= 6 ? "最怕一有点站稳就又去向外求批文。" : "最怕嫌自己慢而自压。",
    art: score >= 6 ? "最怕一被认出就开始加戏。" : "最怕为了成立而乱加东西。"
  };
  return riskMap[aspectKey] || "最怕重新回到旧逻辑里。";
}

function personalAspectDecadeLens(aspectKey, decade, score) {
  const strong = score >= 6.3;
  const mid = score >= 4;
  const map = {
    overall: strong ? "这一年不是单点转好，而是整条命更肯听你自己的轴。" : mid ? "这一年重点是回收，不是表面好看。" : "这一年仍在过旧压，不要拿迟缓否命。",
    money: strong ? "钱开始像真实接口，不再只是续命供给。" : mid ? "钱在筛路，真假财路会慢慢分明。" : "钱最容易勾出匮乏和退位旧病。",
    career: strong ? "现实位置开始成形，不再只是想法正确。" : mid ? "业途在并轨，慢比乱强。" : "这年最怕为求成立又回旧轨。",
    relationship: strong ? "关系看清明与守位，不看热烈不热烈。" : mid ? "这一年是在筛关系，不是在补空。" : "关系线最易把旧伤翻出来。",
    property: strong ? "住处开始像能托命的壳。" : mid ? "还在试壳，但标准会更清楚。" : "最怕因怕漂而乱认壳。",
    influence: strong ? "被认出会更准，不必更广。" : mid ? "影响在聚焦，不在扩散。" : "强求被见只会耗气。",
    health: strong ? "身体能托住你，前提是你别再乱耗。" : mid ? "养节律比求突破重要。" : "身上仍在报旧账。",
    spiritual: strong ? "这一年贵在平常稳住，不贵在体验升级。" : mid ? "知见继续往身上落。" : "旧念会回炉，但正好看清残余。",
    growth: strong ? "主体更能站住自己。" : mid ? "这年长的是根，不是表演。" : "最怕自己跟着旧评价一起压自己。",
    art: strong ? "作品更像命里自然长出来的，不像硬做出来的。" : mid ? "艺术线重在提纯，不重在数量。" : "画脉仍在内炼，急着成立就会浮。"
  };
  return `${decade.tag}里，${map[aspectKey] || map.overall}`;
}

function buildPersonalYearSummary(aspectKey, year, score) {
  const decade = getPersonalDecadeByYear(year);
  const scoreText = score >= 6.5 ? "这一年起口明显。" : score >= 4 ? "这一年在换骨过门。" : "这一年仍有压感。";
  const aspectLine = {
    overall: "主轴比结果更重要。",
    money: "财路重在分清真假接口。",
    career: "业途重在定位置。",
    relationship: "关系重在筛真伪。",
    property: "住处重在认壳。",
    influence: "名气重在聚焦，不重在放大。",
    health: "身体重在回稳减耗。",
    spiritual: "内线重在稳深，不重在求相。",
    growth: "主体重在站住自己。",
    art: "作品重在提纯，不重在出量。"
  };
  return `${year}年落在${decade.tag}。${scoreText}${aspectLine[aspectKey] || aspectLine.overall}`;
}

function buildYearImpact(aspectKey, year, score) {
  const decade = getPersonalDecadeByYear(year);
  const aspectDetail = DESTINY_DATA.aspectYearly?.[aspectKey]?.[year] || "";
  const summaryAnchor = specializedYearText(aspectKey, year) || aspectDetail || "";
  const effectText = yearlyEffectText(aspectKey, year, score);
  const focusText = yearlyFocusText(aspectKey, year, score);
  const lens = personalAspectDecadeLens(aspectKey, decade, score);
  const detailParts = filterDuplicateReadingParts([
    effectText,
    focusText,
    lens,
  ], summaryAnchor);

  return detailParts.join(" ");
}

function yearlyJudgmentText(aspectKey, year, score) {
  const band = score >= 6.5 ? "high" : score >= 4 ? "mid" : "low";
  const judgments = {
    overall: {
      high: "此年命气抬头，宜认主轴，不宜再装作自己只是普通过客。",
      mid: "此年命在换骨，慢不是错，回头才是错。",
      low: "此年受压未尽，硬冲无益，先认错位。 "
    },
    money: {
      high: "此年财可入命，钱若来，当留在真接口，不可拿去续旧伤。",
      mid: "此年财在筛路，来财不算真本事，守得住不回旧路才算。",
      low: "此年财压人心，最忌为求活路又把自己卖回去。 "
    },
    art: {
      high: "此年画有准头，宜少宜静宜真，不宜为求看见而加戏。",
      mid: "此年艺在换骨，宁可少出，不可乱出。",
      low: "此年画脉未断，只是不宜逼熟，急则浮，浮则散。 "
    },
    spiritual: {
      high: "此年心性能守，贵在安住，不贵在求相。",
      mid: "此年是知见落身之年，看见后要真停，不要只停在懂。",
      low: "此年旧念回炉，不算退步，只怕认贼作子。 "
    },
    growth: {
      high: "此年主体可立，宜信自己已在长，不必再向外求批文。",
      mid: "此年长得慢，却是真长，急着证明反伤根。",
      low: "此年旧我拉扯犹在，嫌自己晚，正是旧病。 "
    },
    career: {
      high: "此年业途见位，宜做深，不宜乱开枝叶。",
      mid: "此年路在整，不在抢。",
      low: "此年旧身份未散，新位置未成，莫拿卡顿判死命。 "
    },
    relationship: {
      high: "此年缘重守位，不重热烈。",
      mid: "此年情在筛，不在定。",
      low: "此年最怕把孤独认作爱。 "
    },
    property: {
      high: "此年壳感渐成，住处当为命服务，不为面子服务。",
      mid: "此年仍在试壳，不宜早认终局。",
      low: "此年容器未稳，切莫因怕漂而乱定。 "
    },
    influence: {
      high: "此年名可入深，不必入广。",
      mid: "此年聚气为先，少数真认出，胜过多数浅看见。",
      low: "此年未宜强发，急于被见，反伤命气。 "
    },
    health: {
      high: "此年身可托命，前提是你不再乱耗。",
      mid: "此年养比补重要，稳比猛重要。",
      low: "此年身在报账，不停则伤深。 "
    }
  };
  return judgments[aspectKey]?.[band] || "此年自有其课，不必乱断。";
}

function yearlyBladeText(aspectKey, year, score) {
  const stage = stageForYear(year).tag;
  const band = score >= 6.5 ? "high" : score >= 4 ? "mid" : "low";
  const blades = {
    overall: {
      high: `${stage}里，这一年不是普通顺一点，而是整条命开始更听你自己的轴。`,
      mid: `${stage}里，这一年像命在暗处移位，外表不大，内里不小。`,
      low: `${stage}里，这一年仍是压命段，压不是为了废你，是为了逼你退错路。`
    },
    money: {
      high: `钱到这年，开始像命里应得之财，不再全是求生之财。`,
      mid: `钱到这年，最要紧的是分清：哪路钱能养命，哪路钱会吞命。`,
      low: `钱到这年，会把你最深的匮乏和依赖一并翻出来，所以不能只看数字。`
    },
    art: {
      high: `画到这年，更像显现，不像表达；更像留证，不像表演。`,
      mid: `画到这年，重点是删，删到只剩下你命里真正要长的那一点。`,
      low: `画到这年，不是没有，而是还在命里闷烧；急着成立，反而会把真火压灭。`
    },
    spiritual: {
      high: `灵魂线到这年，贵在平常，贵在稳，贵在不必再证明自己有多清明。`,
      mid: `灵魂线到这年，仍是一步步把知见落到身上，不许只停在明白。`,
      low: `灵魂线到这年，更像回炉重炼，不是坏，怕的是又认旧念为真我。`
    },
    growth: {
      high: `身命到这年，更像站住，不太需要再借外界来确认自己是谁。`,
      mid: `身命到这年，是慢扎根，不是快抽高。`,
      low: `身命到这年，仍有旧评价压着你，最要紧是不自己跟着一起压。`
    }
  };
  return blades[aspectKey]?.[band] || "";
}

function personalYearKernelText(year) {
  const found = PERSONAL_YEAR_KERNELS.find((item) => year >= item.start && year <= item.end);
  return found?.text || "这是命线中的一个过门年，重点看你是在继续回轴，还是又被旧力牵偏。";
}

function buildYearDeepText(aspectKey, year, score) {
  const stage = stageForYear(year);
  const decade = getPersonalDecadeByYear(year);
  const summary = DESTINY_DATA.yearly?.[year] || "";
  const specialized = specializedYearText(aspectKey, year);
  const motion = yearlyMotionText(aspectKey, year);
  const effect = yearlyEffectText(aspectKey, year, score);
  const focus = yearlyFocusText(aspectKey, year, score);
  const habit = habitText(aspectKey);
  const judgment = yearlyJudgmentText(aspectKey, year, score);
  const blade = yearlyBladeText(aspectKey, year, score);
  const kernel = personalYearKernelText(year);
  const decadeContext = score >= 6.5
    ? `${decade.tag}这一章开始见真。${decade.verdict}`
    : score >= 4
      ? `${decade.tag}这一章仍在换骨。主任务是：${decade.task}`
      : `${decade.tag}这一章先过旧伤。命伤在：${decade.wound}`;
  const anchorText = [summary, specialized, motion, effect, focus].filter(Boolean).join(" ");
  const detailParts = filterDuplicateReadingParts([
    `${year}年落在${stage.tag}。`,
    decadeContext,
    `这一年放在${aspectKey === "overall" ? "总命" : DESTINY_DATA.aspects[aspectKey]?.label || "这一线"}里看：${personalAspectDecadeLens(aspectKey, decade, score)}`,
    `底层脉络：${kernel}`,
    `当年断语：${judgment}`,
    blade ? `当年刀口：${blade}` : "",
    summary,
    specialized,
    motion,
    effect,
    focus,
    habit
  ], anchorText);

  return detailParts.filter(Boolean).join(" ");
}

function habitText(type) {
  const habits = DESTINY_DATA.habits?.[type] || [];
  return habits.length ? `若有波动，多半从这里轻轻起：${habits.join("、")}。知道即可，不必追认。` : "此项当前无特别标注。若有起伏，也只作境看，不必认。";
}

function mapSummaryForRange(startYear, endYear, startMonth, endMonth, score, stageStart, stageEnd) {
  const compactRange = `${startYear}.${String(startMonth).padStart(2, "0")} - ${endYear}.${String(endMonth).padStart(2, "0")}`;
  return `${compactRange} 更像 ${stageStart.tag}${stageStart === stageEnd ? "段" : ` 到 ${stageEnd.tag}段`}。整体分值约 ${score.toFixed(1)} / 9，这一段的核心不是表面顺不顺，而是你的命在拆旧、定轴，还是开始真正接上。`;
}

function analysisForRange(startYear, endYear) {
  const matched = getPersonalDecadeForRange(startYear, endYear);
  if (matched.type === "single") {
    return `${matched.start.summary} ${matched.start.task}`;
  }
  if (matched.start && matched.end) {
    return `这段不是单一章节，而是从${matched.start.tag}过到${matched.end.tag}。前半段的核心是：${matched.start.task}；后半段的核心是：${matched.end.task}`;
  }
  if (endYear <= 2025) {
    return "这段时间不要只拿现实表象判断自己。重点是看旧结构怎样在松、哪些关系和承接方式已经不能再继续。";
  }
  if (endYear <= 2035) {
    return "这段时间重点是重组主体、住处、钱路和艺术主轴。不要一边想回命，一边还用旧逻辑活。";
  }
  if (endYear <= 2055) {
    return "这段时间是厚起来的阶段。守住减法、纯度和真正的作品语言，比盲目扩张更重要。";
  }
  return "这段时间重点不是重新追赶，而是收束、留下证据、让作品与灵魂位置真正稳下来。";
}

function buildRangeDeepText(aspectKey, startYear, endYear, startMonth, endMonth, score) {
  const aspect = DESTINY_DATA.aspects[aspectKey] || DESTINY_DATA.aspects.overall;
  const stageStart = stageForYear(startYear);
  const stageEnd = stageForYear(endYear);
  const decadeMatch = getPersonalDecadeForRange(startYear, endYear);
  const stageText = stageStart.tag === stageEnd.tag ? `${stageStart.tag}内段` : `${stageStart.tag}转${stageEnd.tag}`;
  const midYear = Math.round((startYear + endYear) / 2);
  const midText = specializedYearText(aspectKey, midYear);
  const earlyText = specializedYearText(aspectKey, startYear);
  const lateText = specializedYearText(aspectKey, endYear);
  const habits = DESTINY_DATA.habits?.[aspectKey] || DESTINY_DATA.habits?.overall || [];
  const habitLine = habits.length
    ? `这一段最易反复的旧气还是 ${habits.slice(0, 3).join("、")}，一起就偏，知了就收。`
    : "这一段没有别的巧法，只看你是否还用旧力硬推自己。";
  const kernelLine = analysisForRange(startYear, endYear);
  const decadeLine = decadeMatch.type === "single"
    ? `十年章节：${decadeMatch.start.tag}。${decadeMatch.start.verdict} 命伤在：${decadeMatch.start.wound} 主任务是：${decadeMatch.start.task}`
    : `跨章结构：前段是${decadeMatch.start.tag}，后段是${decadeMatch.end.tag}。前段要过的是：${decadeMatch.start.wound}；后段要成的是：${decadeMatch.end.task}`;
  const rangeJudgment = score >= 6.5
    ? `${aspect.label}到这段，已不是试路，是收线。`
    : score >= 4
      ? `${aspect.label}到这段，重在换骨，不在抢成。`
      : `${aspect.label}到这段，压势未退，最忌硬顶。`;
  const rangeBlade = {
    overall: "这段先看命有没有归轴，不看表面顺不顺。",
    money: "这段钱路重在筛财，不在求财；错钱能伤命。",
    career: "这段业途先立位，后见势；位不立，势必空。",
    relationship: "这段情缘先去旧戏，再谈真缘。",
    property: "这段宅运先认壳，不认面子。",
    influence: "这段名运宁深不广，宁准不杂。",
    health: "这段体运先减耗，后回稳。",
    spiritual: "这段灵魂线重在稳住，不在求新相。",
    growth: "这段身命先站自己，再谈别的。",
    art: "这段艺命先删假火，后见真光。"
  }[aspectKey] || "这段只看主线，不看杂相。";

  return [
    `${startYear}.${String(startMonth).padStart(2, "0")} 至 ${endYear}.${String(endMonth).padStart(2, "0")} ，${aspect.label}落在${stageText}。`,
    decadeLine,
    kernelLine,
    rangeJudgment,
    rangeBlade,
    `中段气口看 ${midYear} 年，分值约 ${score.toFixed(1)} / 9，不是一下起落，而是这一线在慢慢换骨。`,
    earlyText,
    lateText !== earlyText ? lateText : "",
    midText && midText !== earlyText && midText !== lateText ? midText : "",
    habitLine
  ].filter(Boolean).join(" ");
}

function renderRangeView() {
  let startYear = Number(startYearSelect.value);
  let endYear = Number(endYearSelect.value);
  let startMonth = Number(startMonthSelect.value);
  let endMonth = Number(endMonthSelect.value);

  if (endYear < startYear || (endYear === startYear && endMonth < startMonth)) {
    endYear = startYear;
    endMonth = startMonth;
    endYearSelect.value = String(endYear);
    endMonthSelect.value = String(endMonth);
  }

  const aspectKey = aspectSelect.value || "overall";
  const aspect = DESTINY_DATA.aspects[aspectKey] || DESTINY_DATA.aspects.overall;
  const midYear = Math.round((startYear + endYear) / 2);
  const aspectScore = interpolateScore(aspect.anchors, midYear);
  const stageStart = stageForYear(startYear);
  const stageEnd = stageForYear(endYear);
  const rangeKey = `${aspectKey}:${startYear}-${startMonth}-${endYear}-${endMonth}`;

  if (rangeDeepDetails && chartState.time.lastRenderedRangeKey !== null && chartState.time.lastRenderedRangeKey !== rangeKey) {
    rangeDeepDetails.open = false;
  }

  updateActiveRangePreset(startYear, endYear);
  if (rangeWindow) {
    rangeWindow.textContent = `${startYear} - ${endYear}`;
  }
  const decadeMatch = getPersonalDecadeForRange(startYear, endYear);
  const rangeLead = decadeMatch.type === "single"
    ? `这段落在${decadeMatch.start.tag}。${decadeMatch.start.verdict}`
    : `这段跨过${decadeMatch.start.tag}到${decadeMatch.end.tag}，不是一个意思反复说，而是命在换章节。`;
  const rangeGuideText = `${aspect.label}看这一段：${analysisForRange(startYear, endYear)}`;
  rangeSummary.textContent = `${mapSummaryForRange(startYear, endYear, startMonth, endMonth, aspectScore, stageStart, stageEnd)} ${rangeLead} ${rangeGuideText}`;
  if (rangeGuidance) rangeGuidance.textContent = rangeGuideText;
  if (rangeDeep) {
    rangeDeep.textContent = buildRangeDeepText(aspectKey, startYear, endYear, startMonth, endMonth, aspectScore);
  }
  chartState.time.lastRenderedRangeKey = rangeKey;
}

function applyAnswerMode(mode) {
  const isCompact = mode === "calm";
  detailBlocks.forEach((block) => {
    block.hidden = isCompact;
  });
}

function fillTimeSelectors() {
  YEARS.forEach((year) => {
    const startOption = document.createElement("option");
    startOption.value = year;
    startOption.textContent = year;
    startYearSelect.appendChild(startOption);

    const endOption = document.createElement("option");
    endOption.value = year;
    endOption.textContent = year;
    endYearSelect.appendChild(endOption);
  });

  MONTHS.forEach((month) => {
    const startOption = document.createElement("option");
    startOption.value = month;
    startOption.textContent = `${month}月`;
    startMonthSelect.appendChild(startOption);

    const endOption = document.createElement("option");
    endOption.value = month;
    endOption.textContent = `${month}月`;
    endMonthSelect.appendChild(endOption);
  });

  startYearSelect.value = "2026";
  endYearSelect.value = "2031";
  startMonthSelect.value = "1";
  endMonthSelect.value = "12";
}

function fillAspectControls() {
  Object.entries(DESTINY_DATA.aspects).forEach(([key, value], index) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = value.label;
    aspectSelect.appendChild(option);

    if (aspectTabs) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `chip${index === 0 ? " active" : ""}`;
      button.dataset.aspect = key;
      button.textContent = value.label;
      button.addEventListener("click", () => {
        aspectSelect.value = key;
        updateActiveChip(key);
        updateView();
      });
      aspectTabs.appendChild(button);
    }
  });
}

function fillQuestionTypeTabs() {
  Array.from(questionType.options).forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${index === 0 ? " active" : ""}`;
    button.dataset.type = option.value;
    button.textContent = option.textContent;
    button.addEventListener("click", () => {
      questionType.value = option.value;
      updateActiveQuestionType(option.value);
      syncQuestionChart();
    });
    questionTypeTabs.appendChild(button);
  });
}

function updateActiveQuestionType(type) {
  if (!questionTypeTabs) return;
  questionTypeTabs.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.type === type);
  });
}

function updateAspectMeaningUI(personalKey = "overall", questionKey = "overall") {
  if (aspectMeaning) {
    aspectMeaning.textContent = ASPECT_MEANINGS[personalKey] || ASPECT_MEANINGS.overall;
  }
  if (questionAspectMeaning) {
    questionAspectMeaning.textContent = ASPECT_MEANINGS[questionKey] || ASPECT_MEANINGS.overall;
  }
}

function updatePersonalChartMode(mode = "single") {
  if (!personalChartMode) return;
  personalChartMode.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.chartMode === mode);
  });
  if (personalChartGroup) {
    personalChartGroup.hidden = mode !== "overlay";
  }
}

function updatePersonalChartGroup(group = "all") {
  if (!personalChartGroup) return;
  personalChartGroup.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.chartGroup === group);
  });
}

function renderPersonalChartLegend(activeKey, overlayKeys = []) {
  if (!personalChartLegend) return;
  if (!overlayKeys.length) {
    personalChartLegend.hidden = true;
    personalChartLegend.innerHTML = "";
    return;
  }
  personalChartLegend.hidden = false;
  personalChartLegend.innerHTML = overlayKeys.map((key) => {
    const aspect = DESTINY_DATA.aspects[key];
    const color = PERSONAL_OVERLAY_COLORS[key] || "#8a8a84";
    const isActive = key === activeKey;
    return `<span class="compare-chip${isActive ? " active" : ""}"><i style="background:${color}"></i>${aspect.label}</span>`;
  }).join("");
}

function aspectKeyForQuestionType(type) {
  if (DESTINY_DATA.aspects[type]) return type;
  return "overall";
}

function inferQuestionAspect(type, question = "") {
  const text = String(question || "");
  if (/画|作品|艺术|展览|代表作|痕迹/.test(text)) return "art";
  if (/钱|财|收入|房租|交租|财富/.test(text)) return "money";
  if (/事业|工作|项目|合作|职业/.test(text)) return "career";
  if (/关系|婚姻|伴侣|情缘/.test(text)) return "relationship";
  if (/房|住|搬家|定居|宅|壳/.test(text)) return "property";
  if (/名望|影响力|被看见|传播/.test(text)) return "influence";
  if (/身体|健康|体运|耗损/.test(text)) return "health";
  if (/灵魂|修行|觉醒|回身|内在/.test(text)) return "spiritual";
  if (/西语|西班牙语|语言/.test(text)) return "growth";
  return aspectKeyForQuestionType(type);
}

function applyRangePreset(startYear, endYear, startMonth = 1, endMonth = 12) {
  startYearSelect.value = String(startYear);
  endYearSelect.value = String(endYear);
  startMonthSelect.value = String(startMonth);
  endMonthSelect.value = String(endMonth);
  updateActiveRangePreset(startYear, endYear);
  updateRangeView();
}

function fillRangePresets() {
  if (!rangePresets) return;
  RANGE_PRESETS.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip time-preset";
    button.textContent = item.label;
    button.dataset.startYear = String(item.startYear);
    button.dataset.endYear = String(item.endYear);
    button.addEventListener("click", () => {
      applyRangePreset(item.startYear, item.endYear, item.startMonth || 1, item.endMonth || 12);
    });
    rangePresets.appendChild(button);
  });
  updateActiveRangePreset(2026, 2026);
}

function updateActiveRangePreset(startYear, endYear) {
  if (!rangePresets) return;
  rangePresets.querySelectorAll(".time-preset").forEach((el) => {
    const isActive = Number(el.dataset.startYear) === startYear && Number(el.dataset.endYear) === endYear;
    el.classList.toggle("active", isActive);
  });
}

function fillQuestionTemplates() {
  if (!questionType || !questionInput || !questionAnswer || !answerKeyYears || !answerPhase || !answerBlock || !answerSupport || !answerBreak || !answerHabit || !answerReminder) return;
  if (!questionFavorites || !questionTemplates) return;
  const favoriteLabels = [
    "总命走向",
    "起运",
    "见钱年份",
    "业途起色",
    "何时被见",
    "代表作",
    "何时定壳",
    "灵魂线",
    "西语",
  ];

  const applyTemplate = (item) => {
    questionType.value = item.type;
    questionInput.value = item.question;
    syncQuestionChart();
    questionAnswer.textContent = `已载：${item.label}`;
    answerKeyYears.textContent = "待";
    answerPhase.textContent = "待";
    answerBlock.textContent = "待";
    answerSupport.textContent = "待";
    answerBreak.textContent = "待";
    answerHabit.textContent = "待";
    answerReminder.textContent = "待";
  };

  DESTINY_DATA.questionTemplates
    .filter((item) => favoriteLabels.includes(item.label))
    .sort((a, b) => favoriteLabels.indexOf(a.label) - favoriteLabels.indexOf(b.label))
    .forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip ask-preset";
      button.textContent = item.label;
      button.addEventListener("click", () => {
        questionFavorites.querySelectorAll(".ask-preset").forEach((el) => el.classList.remove("active"));
        button.classList.add("active");
        applyTemplate(item);
      });
      questionFavorites.appendChild(button);
    });

  const firstFavorite = questionFavorites.querySelector(".ask-preset");
  if (firstFavorite) firstFavorite.classList.add("active");

  DESTINY_DATA.questionTemplates.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.textContent = item.label;
    button.addEventListener("click", () => applyTemplate(item));
    questionTemplates.appendChild(button);
  });
}

function exportCurrentReading() {
  const question = questionInput.value.trim();
  const answer = questionAnswer.textContent.trim();
  if (!question || !answer || answer === "待起") {
    questionAnswer.textContent = "先起";
    return;
  }

  const title = `${questionType.options[questionType.selectedIndex].textContent}问讯单页`;
  const timeRange = `${startYearSelect.value}.${String(startMonthSelect.value).padStart(2, "0")} - ${endYearSelect.value}.${String(endMonthSelect.value).padStart(2, "0")}`;
  const answerExcerpt = getRenderedExcerpt();
  const popup = window.open("", "_blank");
  if (!popup) {
    questionAnswer.textContent = "浏览器拦截了导出窗口。";
    return;
  }

  const escapeHtml = (text) => String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  popup.document.write(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      margin: 0;
      background:
        radial-gradient(circle at top right, rgba(255,255,255,0.85), transparent 20%),
        linear-gradient(180deg, #f6f6f3 0%, #f2f2ef 100%);
      color: #151515;
      font-family: "Avenir Next", "PingFang SC", "Noto Sans SC", sans-serif;
    }
    .sheet { max-width: 860px; margin: 0 auto; padding: 26px 20px 40px; }
    .card {
      position: relative;
      overflow: hidden;
      background: rgba(252,252,250,0.96);
      border: 1px solid rgba(21,21,21,0.12);
      border-radius: 14px;
      padding: 24px 22px 26px;
      box-shadow: 0 8px 20px rgba(15,15,15,0.04);
    }
    .card::after {
      content: "";
      position: absolute;
      right: 18px;
      top: 14px;
      width: 120px;
      height: 120px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0) 70%);
    }
    .eyebrow {
      margin: 0 0 8px;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #707070;
    }
    h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.02; letter-spacing: 0.04em; }
    .meta, .small { color: #666; font-size: 13px; line-height: 1.7; }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .hero-meta span {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 999px;
      border: 1px solid rgba(21,21,21,0.12);
      background: rgba(243,243,240,0.72);
      color: #4a4a4a;
      font-size: 12px;
    }
    .dossier {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px 14px;
      margin-top: 16px;
      padding: 12px 14px;
      border: 1px solid rgba(21,21,21,0.1);
      border-radius: 12px;
      background: rgba(243,243,240,0.72);
    }
    .dossier-row { display: flex; gap: 10px; align-items: baseline; }
    .dossier-label { flex: 0 0 auto; font-size: 12px; letter-spacing: 0.12em; color: #707070; text-transform: uppercase; }
    .block { margin-top: 16px; }
    .label { margin: 0 0 5px; color: #707070; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; }
    p { margin: 0; line-height: 1.72; }
    .excerpt {
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(21,21,21,0.1);
      background: rgba(243,243,240,0.72);
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
    .cell { padding: 10px 12px; border: 1px solid rgba(21,21,21,0.1); border-radius: 10px; background: rgba(252,252,250,0.92); }
    .topline { margin-bottom: 14px; }
    @media print {
      body { background: #fff; }
      .sheet { padding: 0; }
      .card { border: 0; box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="card">
      <div class="topline">
        <p class="eyebrow">Private Fate Reading</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="meta">赵羽彤 · ${escapeHtml(timeRange)} · 焦点年 ${escapeHtml(yearRange.value)}</p>
        <p class="small">问类：${escapeHtml(questionType.options[questionType.selectedIndex].textContent)} ｜ 关键年份：${escapeHtml(answerKeyYears.textContent.trim())}</p>
        <div class="hero-meta">
          <span>先压命</span>
          <span>后回命</span>
          <span>以画安命</span>
        </div>
        <div class="dossier">
          <div class="dossier-row"><span class="dossier-label">卷主</span><span>赵羽彤</span></div>
          <div class="dossier-row"><span class="dossier-label">卷类</span><span>${escapeHtml(questionType.options[questionType.selectedIndex].textContent)}</span></div>
          <div class="dossier-row"><span class="dossier-label">时段</span><span>${escapeHtml(timeRange)}</span></div>
          <div class="dossier-row"><span class="dossier-label">关键年</span><span>${escapeHtml(answerKeyYears.textContent.trim())}</span></div>
        </div>
      </div>
      <div class="block">
        <p class="label">问辞</p>
        <p>${escapeHtml(question)}</p>
      </div>
      <div class="block">
        <p class="label">摘录</p>
        <p class="excerpt">${escapeHtml(answerExcerpt)}</p>
      </div>
      <div class="block">
        <p class="label">批语</p>
        <p>${escapeHtml(answer)}</p>
      </div>
      <div class="grid">
        <div class="cell"><p class="label">总断</p><p>${escapeHtml(answerPhase.textContent.trim())}</p></div>
        <div class="cell"><p class="label">断语</p><p>${escapeHtml(answerReminder.textContent.trim())}</p></div>
        <div class="cell"><p class="label">症结</p><p>${escapeHtml(answerBlock.textContent.trim())}</p></div>
        <div class="cell"><p class="label">来路</p><p>${escapeHtml(answerSupport.textContent.trim())}</p></div>
        <div class="cell"><p class="label">破口</p><p>${escapeHtml(answerBreak.textContent.trim())}</p></div>
        <div class="cell"><p class="label">旧业</p><p>${escapeHtml(answerHabit.textContent.trim())}</p></div>
      </div>
    </div>
  </div>
</body>
</html>`);
  popup.document.close();
}

function initModes() {
  if (reminderMode) reminderMode.value = getReminderMode();
  if (answerMode) answerMode.value = getReminderMode();
  if (engineMode) engineMode.value = "local";
  const settings = getAISettings();
  if (aiProvider) aiProvider.value = settings.provider;
  if (aiEndpoint) aiEndpoint.value = settings.endpoint;
  if (aiModel) aiModel.value = settings.model;
  if (historyFilter) historyFilter.value = getHistoryFilter();
  applyAnswerMode(getReminderMode());
  updateEngineModeUI();
  updateAiSettingsUI();
}

function updateEngineModeUI() {
  if (!askModeNote || !engineMode) return;
  if (engineMode.value === "ai") {
    askModeNote.textContent = "AI";
    return;
  }
  askModeNote.textContent = "本地";
}

function updateAiSettingsUI() {
  if (!aiProvider || !aiEndpoint || !aiModel || !aiSettingsNote) return;
  const isSite = aiProvider.value === "site";
  aiEndpoint.placeholder = isSite ? "/api/ask" : "http://127.0.0.1:11434/api/generate";
  aiModel.placeholder = isSite ? "@cf/ibm-granite/granite-4.0-h-micro" : "qwen2.5:7b-instruct";
  if (isSite) {
    aiSettingsNote.textContent = "站内";
    return;
  }
  aiSettingsNote.textContent = "自定";
}

function updateActiveChip(key) {
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.aspect === key);
  });
}

function renderChart(svgEl, aspectKey, selectedYear, previewYear = null, options = {}) {
  if (!svgEl) return;
  const aspect = DESTINY_DATA.aspects[aspectKey];
  const series = buildSeries(aspect.anchors);
  const overlayKeys = options.overlayKeys || [];
  const levelLabels = {
    1: "沉坠",
    2: "受压",
    3: "忍行",
    4: "转关",
    5: "平流",
    6: "起势",
    7: "渐旺",
    8: "丰盛",
    9: "高峰"
  };
  const width = 720;
  const height = 352;
  const left = 56;
  const right = 20;
  const top = 18;
  const bottom = 72;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const activeYear = previewYear || selectedYear;
  const x = (index) => left + (chartWidth * index) / (series.length - 1);
  const y = (score) => top + chartHeight - ((score - 1) / 8) * chartHeight;
  const rangeStartYear = Number(startYearSelect?.value || START_YEAR);
  const rangeEndYear = Number(endYearSelect?.value || START_YEAR);

  let grid = "";
  for (let level = 1; level <= 9; level += 1) {
    const yy = y(level);
    grid += `<line x1="${left}" y1="${yy}" x2="${width - right}" y2="${yy}" stroke="rgba(21,21,21,0.035)" stroke-width="1" />`;
    grid += `<text x="${left - 10}" y="${yy + 4}" text-anchor="end" font-size="9.6" letter-spacing="0.05em" fill="#b0b0aa">${levelLabels[level]}</text>`;
  }

  const tickYears = [1986, 1991, 1996, 2001, 2006, 2011, 2016, 2021, 2026, 2031, 2036, 2041, 2046, 2051, 2056, 2061, 2066];
  let ticks = "";
  tickYears.forEach((year) => {
    const idx = year - START_YEAR;
    const xx = x(idx);
    ticks += `<line x1="${xx}" y1="${top}" x2="${xx}" y2="${height - bottom}" stroke="rgba(21,21,21,0.028)" stroke-width="1" />`;
    ticks += `<text x="${xx}" y="${height - 24}" text-anchor="middle" font-size="9.2" letter-spacing="0.08em" fill="#a1a19a">${String(year).slice(2)}</text>`;
  });

  const ageTickYears = [1986, 1996, 2006, 2016, 2026, 2036, 2046, 2056, 2066];
  let ageTicks = "";
  ageTickYears.forEach((year) => {
    const idx = year - START_YEAR;
    const xx = x(idx);
    const age = year - START_YEAR + 1;
    ageTicks += `<text x="${xx}" y="${height - 6}" text-anchor="middle" font-size="8.5" letter-spacing="0.03em" fill="#c7c7c0">${age}岁</text>`;
  });

  const path = series.map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point.score)}`).join(" ");
  const overlayPaths = overlayKeys
    .filter((key) => key !== aspectKey && DESTINY_DATA.aspects[key])
    .map((key) => {
      const overlaySeries = buildSeries(DESTINY_DATA.aspects[key].anchors);
      const overlayPath = overlaySeries.map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point.score)}`).join(" ");
      const color = PERSONAL_OVERLAY_COLORS[key] || "#8a8a84";
      return `<path d="${overlayPath}" fill="none" stroke="${color}" stroke-opacity="0.42" stroke-width="1.02" stroke-linejoin="round" stroke-linecap="round"></path>`;
    }).join("");
  const highlightYears = [1986, 2026, 2033, 2049, 2066].filter((year) => year >= START_YEAR && year <= END_YEAR);
  let fixedPoints = "";
  highlightYears.forEach((year) => {
    const idx = year - START_YEAR;
    const score = series[idx].score;
    fixedPoints += `<circle cx="${x(idx)}" cy="${y(score)}" r="2.5" fill="rgba(17,17,17,0.14)" />`;
  });

  const activeIndex = activeYear - START_YEAR;
  const activeScore = series[activeIndex].score;
  const activeX = x(activeIndex);
  const activeY = y(activeScore);
  const activeIntro = escapeSvgText(options.introText ? options.introText(activeYear, activeScore) : "");
  const rangeX = x(rangeStartYear - START_YEAR);
  const rangeWidth = x(rangeEndYear - START_YEAR) - rangeX;

  let rangeZones = "";
  if (options.showPresetZones) {
    rangeZones = CHART_PHASES.map((item) => {
      const startX = x(item.startYear - START_YEAR);
      const endX = x(item.endYear - START_YEAR);
      const zoneWidth = Math.max(8, endX - startX);
      const isActive = rangeStartYear >= item.startYear && rangeEndYear <= item.endYear;
      return `<g class="chart-zone${isActive ? " active" : ""}">
        <rect x="${startX}" y="${height - bottom + 10}" width="${zoneWidth}" height="9" rx="4.5" fill="${isActive ? item.fill.replace(/0\.\d+\)/, "0.24)") : item.fill}"></rect>
        <text x="${startX + zoneWidth / 2}" y="${height - bottom + 35}" text-anchor="middle" font-size="9.1" letter-spacing="0.03em" fill="${isActive ? "#686862" : item.text}">${escapeSvgText(item.label)}</text>
      </g>`;
    }).join("");
  }

  let hitTargets = "";
  series.forEach((point, index) => {
    hitTargets += `<rect class="chart-hit-target" data-year="${point.year}" x="${x(index) - 4}" y="${top}" width="8" height="${chartHeight}" fill="transparent"></rect>`;
  });

  svgEl.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(253,253,251,0.94)"></rect>
    ${grid}
    ${ticks}
    <rect x="${rangeX}" y="${top}" width="${Math.max(3, rangeWidth)}" height="${chartHeight}" fill="rgba(17,17,17,0.012)" />
    <line x1="${left}" y1="${height - bottom}" x2="${width - right}" y2="${height - bottom}" stroke="rgba(17,17,17,0.075)" stroke-width="1" />
    <line x1="${left}" y1="${top}" x2="${left}" y2="${height - bottom}" stroke="rgba(17,17,17,0.075)" stroke-width="1" />
    ${overlayPaths}
    <path d="${path}" fill="none" stroke="#242422" stroke-width="1.34" stroke-linejoin="round" stroke-linecap="round"></path>
    ${fixedPoints}
    <line x1="${activeX}" y1="${top}" x2="${activeX}" y2="${height - bottom}" stroke="rgba(17,17,17,0.085)" stroke-width="1" stroke-dasharray="2 8" />
    <circle cx="${activeX}" cy="${activeY}" r="4.1" fill="#262624" stroke="#fdfdfb" stroke-width="1.4" />
    <g>
      <rect x="${Math.max(left + 10, Math.min(activeX - 64, width - right - 128))}" y="${top + 8}" width="128" height="38" rx="8" fill="rgba(253,253,251,0.9)" stroke="rgba(17,17,17,0.05)" />
      <text x="${Math.max(left + 19, Math.min(activeX - 55, width - right - 119))}" y="${top + 22}" font-size="10.8" letter-spacing="0.05em" fill="#2d2d2a">${activeYear} · ${activeScore.toFixed(1)}</text>
      <text x="${Math.max(left + 19, Math.min(activeX - 55, width - right - 119))}" y="${top + 35}" font-size="9.3" letter-spacing="0.03em" fill="#a0a09a">${activeIntro}</text>
    </g>
    ${rangeZones}
    ${ageTicks}
    <g class="chart-hit-layer">
      ${hitTargets}
    </g>
  `;
}

function renderStaticSections() {
  if (finalVerdict) {
    finalVerdict.textContent = DESTINY_DATA.finalVerdict;
  }
  renderProfileGrid(personalCoreProfile, PERSONAL_CORE_PROFILE, "你的命核会显示在这里。");
  renderPersonalDecades();
  renderProfileGrid(personalBriefProfile, [], "四柱摘要会显示在这里。");
  if (!stageList || !soulLessons || !milestones) return;

  DESTINY_DATA.stages.forEach((stage) => {
    const item = document.createElement("article");
    item.className = "stage-card";
    item.innerHTML = `
      <div class="stage-head">
        <div>
          <h3>${stage.range}</h3>
          <p>${stage.summary}</p>
        </div>
        <span class="stage-tag">${stage.tag}</span>
      </div>
    `;
    stageList.appendChild(item);
  });

  DESTINY_DATA.soulLessons.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text.trim();
    soulLessons.appendChild(li);
  });

  DESTINY_DATA.milestones.forEach((item) => {
    const article = document.createElement("article");
    article.className = "milestone-card";
    article.innerHTML = `
      <div class="milestone-head">
        <div>
          <h3>${item.year}</h3>
          <p>${item.summary}</p>
        </div>
        <span class="stage-tag">${item.title}</span>
      </div>
    `;
    milestones.appendChild(article);
  });
}


function shortYearIntro(aspectKey, year, score) {
  const base = specializedYearText(aspectKey, year) || DESTINY_DATA.yearly[year] || "";
  const trimmed = String(base).replace(/\s+/g, " ").trim();
  const hint = trimmed ? trimmed.slice(0, 14) : trendText(score);
  return hint;
}

function yearFromChartEvent(svgEl, event) {
  const rect = svgEl.getBoundingClientRect();
  const width = 720;
  const left = 56;
  const right = 20;
  const chartWidth = width - left - right;
  const pointerX = ((event.clientX - rect.left) / rect.width) * width;
  const clampedX = Math.max(left, Math.min(width - right, pointerX));
  const ratio = (clampedX - left) / chartWidth;
  const index = Math.round(ratio * (YEARS.length - 1));
  return YEARS[Math.max(0, Math.min(YEARS.length - 1, index))];
}

function setRangeYears(startYear, endYear) {
  const from = Math.max(START_YEAR, Math.min(END_YEAR, Math.min(startYear, endYear)));
  const to = Math.max(START_YEAR, Math.min(END_YEAR, Math.max(startYear, endYear)));
  startYearSelect.value = String(from);
  endYearSelect.value = String(to);
  startMonthSelect.value = "1";
  endMonthSelect.value = "12";
  updateRangeView();
}

function setFocusYear(year, source = "time") {
  const clampedYear = Math.max(START_YEAR, Math.min(END_YEAR, Number(year) || START_YEAR));
  chartState[source].selectedYear = clampedYear;
  yearRange.value = String(clampedYear);
  updateView();
  chartState.question.selectedYear = clampedYear;
  syncQuestionChart();
}

function bindChartEvents(svgEl, source) {
  if (!svgEl || svgEl.dataset.bound === "true") return;
  const isTimeChart = source === "time" && svgEl === timeChart;

  const handleMove = (event) => {
    if (isTimeChart && chartState.drag.active) {
      const dragYear = yearFromChartEvent(svgEl, event);
      chartState.drag.currentYear = dragYear;
      chartState[source].previewYear = dragYear;
      setRangeYears(chartState.drag.startYear, dragYear);
      setFocusYear(dragYear, source);
      return;
    }
    const target = event.target.closest("[data-year]");
    chartState[source].previewYear = target ? Number(target.dataset.year) : yearFromChartEvent(svgEl, event);
    if (source === "time") {
      updateView({ previewYear: chartState[source].previewYear });
    } else {
      syncQuestionChart();
    }
  };

  const clearMove = () => {
    if (isTimeChart && chartState.drag.active) return;
    chartState[source].previewYear = null;
    if (source === "time") {
      updateView();
    } else {
      syncQuestionChart();
    }
  };

  const handleClick = (event) => {
    if (isTimeChart && chartState.drag.active) return;
    const target = event.target.closest("[data-year]");
    if (!target) return;
    setFocusYear(Number(target.dataset.year), source);
  };

  const handlePointerDown = (event) => {
    if (!isTimeChart) return;
    const dragYear = yearFromChartEvent(svgEl, event);
    chartState.drag.active = true;
    chartState.drag.startYear = dragYear;
    chartState.drag.currentYear = dragYear;
    chartState[source].previewYear = dragYear;
    setRangeYears(dragYear, dragYear);
    setFocusYear(dragYear, source);
    svgEl.setPointerCapture?.(event.pointerId);
  };

  const finishDrag = (event) => {
    if (!isTimeChart || !chartState.drag.active) return;
    const dragYear = event ? yearFromChartEvent(svgEl, event) : chartState.drag.currentYear;
    setRangeYears(chartState.drag.startYear, dragYear);
    setFocusYear(dragYear, source);
    chartState.drag.active = false;
    chartState.drag.startYear = null;
    chartState.drag.currentYear = null;
    chartState[source].previewYear = null;
    updateView();
  };

  svgEl.addEventListener("pointermove", handleMove);
  svgEl.addEventListener("pointerleave", clearMove);
  svgEl.addEventListener("click", handleClick);
  svgEl.addEventListener("pointerdown", handlePointerDown);
  svgEl.addEventListener("pointerup", finishDrag);
  svgEl.addEventListener("pointercancel", finishDrag);
  svgEl.dataset.bound = "true";
}

function syncQuestionChart() {
  if (!questionType || !questionInput || !aspectSelect) return;
  const aspectKey = inferQuestionAspect(questionType.value, questionInput.value);
  chartState.question.aspectKey = aspectKey;
  updateActiveQuestionType(questionType.value);
  aspectSelect.value = aspectKey;
  updateActiveChip(aspectKey);
  updateAspectMeaningUI(aspectSelect.value, aspectKey);
  updateView();
}

function updateRangeView() {
  if (!startYearSelect || !endYearSelect || !startMonthSelect || !endMonthSelect) return;
  renderRangeView();
  updateView();
}

function buildQuestionAnswer(type, question) {
  const startYear = Number(startYearSelect.value);
  const endYear = Number(endYearSelect.value);
  const startMonth = Number(startMonthSelect.value);
  const endMonth = Number(endMonthSelect.value);
  const focusYear = Number(yearRange.value);
  const aspectKey = type;
  const aspect = DESTINY_DATA.aspects[aspectKey];
  const score = interpolateScore(aspect.anchors, focusYear);
  const stage = stageForYear(focusYear);
  const rangeStage = stageForRange(startYear, endYear);
  const base = DESTINY_DATA.yearly[focusYear] || "这一年属于阶段性过渡。";
  const specialized = specializedYearText(aspectKey, focusYear);
  const isSpanishQuestion = /西语|西班牙语|spanish/i.test(question);

  const typeText = {
    overall: "总命",
    money: "财路",
    career: "业途",
    relationship: "情缘",
    property: "宅运",
    influence: "名运",
    health: "体运",
    spiritual: "灵魂线",
    growth: "身命",
    art: "艺命"
  };

  const withKeyYears = (payload, keyYears) => ({ ...payload, keyYears });

  if (type === "growth" && isSpanishQuestion) {
    return withKeyYears({
      long: `西语线晚，不是不会。此命先收内，后放舌。等住处、现实、作品三线接稳，语言才真正起身。`,
      phase: `${startYear}-${endYear}：西语线不开则已，开也偏晚；先工具，后表达。`,
      block: "症结在内里收束太久，舌路自然不开。",
      support: "来路在命。你本就不是快嘴快放型，强项在感知、吸收、慢熟。",
      breakPoint: "破口：不硬背，不硬逼，只让语言贴生活接口。",
      habit: "旧业：一看不进，一背即散，一开口就嫌自己浅、累、乱。",
      reminder: "断语：西语晚开，开则有用。"
    }, "2026-2028、2029、2033后");
  }

  if (/还业|旧业|重复旧业/i.test(question)) {
    return {
      long: `还业不看苦重不重，只看旧法还动不动。能看见、能停、能不续演，是还业；换人换景还照旧发作，是续业。`,
      phase: `${startYear}-${endYear}：还业与重复旧业并行，但主线已在分开。`,
      block: "症结不在事情本身，在旧位置感一动，旧路就又接上。",
      support: "来路在旧命结构入骨，所以反应总先于判断。",
      breakPoint: "破口在识得旧法一起来就停，不再替旧我续命。",
      habit: "旧业：一触发就解释、一匮乏就回头、一内疚就失位。",
      reminder: "断语：能停是还业，照演是续业。"
    };
  }

  if (/起运|真正起运|后半生/i.test(question)) {
    return withKeyYears({
      long: `此命起运，不先见势，先归主轴。等钱、住、画、人接成一线，运才算起。`,
      phase: `${startYear}-${endYear}：起运先起主轴，再起钱路，再起外认。`,
      block: "症结在总想先见外势，不肯先认内核。",
      support: "来路在晚命。前面不顺，不是废命，是筛命。",
      breakPoint: "破口：认晚命，不拿早成法逼己。",
      habit: "旧业：外面一静就以为没运，实际上只是运还在内里归位。",
      reminder: "断语：先回命，后见运。"
    }, "2026、2028-2033、2036后");
  }

  if (type === "money" && /见钱|哪几年|财路.*起色|真正见钱/i.test(question)) {
    return withKeyYears({
      long: "此财晚接。2028见头，2032后见真，2033-2036财路才算起色。",
      phase: `${startYear}-${endYear}：财路先小接，后成形。`,
      block: "症结在前面多是活命钱，不是立命钱。",
      support: "来路在作品与主轴，钱不是单独暴起。",
      breakPoint: "破口：断假承接，等真接口。",
      habit: "旧业：一缺钱就想回旧路换稳。",
      reminder: "断语：财不早发，后段见真。"
    }, "2028、2032、2033-2036");
  }

  if (type === "career" && /业途起色|何时起色|事业.*起色|业途.*年份/i.test(question)) {
    return withKeyYears({
      long: "业途先定轴，后起色。2029起像样，2033开窗，2036后这条路才算站稳。",
      phase: `${startYear}-${endYear}：先定轴，再起势，后成厚度。`,
      block: "症结在前面多在校正，不在收成。",
      support: "来路在作品渐真，业途才跟着成形。",
      breakPoint: "破口：守主轴，不回旧轨。",
      habit: "旧业：一慢就疑命，一急就想套旧轨。",
      reminder: "断语：业途晚起，起则渐稳。"
    }, "2029、2033、2036后");
  }

  if (type === "career" && /合作|搭档|项目/i.test(question)) {
    return {
      long: `合作不看对方强不强，只看接不接命。能托主轴、托作品、托现实者可留；只给一时确定感者，多半后患。`,
      phase: `${startYear}-${endYear}：合作运有，但宜少宜准。`,
      block: "症结在你容易因承接焦虑而把错误合作认成出路。",
      support: "来路在主轴渐明。主轴越清，合作筛得越准。",
      breakPoint: "破口在先看是否接命，不先看是否体面、是否热闹。",
      habit: "旧业：一缺承接就放低标准，一被需要就以为是机会。",
      reminder: "断语：能托主轴者留，乱你命者断。"
    };
  }

  if (type === "influence" && /何时被见|被看见|何时认出|明显起势/i.test(question)) {
    return withKeyYears({
      long: "被见不在早年。2028先被少数认出，2033前后起势，2040后名气才稳。",
      phase: `${startYear}-${endYear}：先小认，再起势，后成后劲。`,
      block: "症结在求快见，必先伤纯度。",
      support: "来路在后劲，不在爆红。",
      breakPoint: "破口：守作品气，不逐声量相。",
      habit: "旧业：一时无人懂，就怀疑整条线。",
      reminder: "断语：先少数认，后众人见。"
    }, "2028、2033前后、2040后");
  }

  if (type === "art" && /代表作|作品窗口|真东西|成作/i.test(question)) {
    return withKeyYears({
      long: "代表作不在前段。2033开窗，2036后成厚，2049前后最有震魂之作。",
      phase: `${startYear}-${endYear}：先开窗，再成厚度，后见高地。`,
      block: "症结在证明心未尽，画就不够纯。",
      support: "来路在命回到画位，作品才像命作。",
      breakPoint: "破口：做减法，让它显，不让它喊。",
      habit: "旧业：怕慢，怕空，怕不被立刻看懂。",
      reminder: "断语：开窗在2033，高地在2049。"
    }, "2033、2036后、2049前后");
  }

  if (type === "property" && /何时定壳|真正定壳|久住|命壳/i.test(question)) {
    return withKeyYears({
      long: "壳不是一夜落定，是慢慢长成。2026-2028仍过渡，2029后壳感起，2033后才像命壳。",
      phase: `${startYear}-${endYear}：先过渡，后收壳。`,
      block: "症结在把能住错认成安命。",
      support: "来路在前面多漂，后面才筛得出真壳。",
      breakPoint: "破口：只认托命之地。",
      habit: "旧业：一怕漂，就先委屈自己求稳。",
      reminder: "断语：先有壳感，后成命壳。"
    }, "2026-2028、2029后、2033后");
  }

  if (type === "property" && /定居|稳定|住处|壳/i.test(question)) {
    return {
      long: `宅运不先问稳，只先问合命。托不住你创作、节律与主体的，都只是借壳。`,
      phase: `${startYear}-${endYear}：壳感渐起，但未必一步定局。`,
      block: "症结在把能住误作能安命。",
      support: "来路在漂后收壳。前面动得多，正是为后面筛壳。",
      breakPoint: "破口：只认安命之地。",
      habit: "旧业：一怕漂就乱抓壳，一想稳就先牺牲自己。",
      reminder: "断语：壳不在贵，在合命。"
    };
  }

  if (type === "relationship" && /关系归宿|何时稳定|何时成|情缘.*归宿/i.test(question)) {
    return withKeyYears({
      long: "情缘不走早定路。2033后方像稳缘，2036后若成，才像守得住命的关系。",
      phase: `${startYear}-${endYear}：先清旧业，后谈稳缘。`,
      block: "症结在边界未稳，关系就回旧戏。",
      support: "来路在主体晚立，情缘也就晚定。",
      breakPoint: "破口：不讨好，不失位。",
      habit: "旧业：一孤就想连，一愧就想回头。",
      reminder: "断语：情缘晚定，稳在主轴后。"
    }, "2033后、2036后、2040前后");
  }

  if (type === "health" && /身体健康|何时转稳|体运.*年份|耗损点/i.test(question)) {
    return withKeyYears({
      long: "体运先减耗，后转稳。2026最怕硬扛，2028后稍托得住，2036后才算真稳。",
      phase: `${startYear}-${endYear}：先减耗，再回稳，后守成。`,
      block: "症结在旧内耗未尽，身体替命受账。",
      support: "来路在你已知道该停，体运才有回转。",
      breakPoint: "破口：断透支，稳节律。",
      habit: "旧业：一有事就硬撑，一波动就乱耗神。",
      reminder: "断语：先减耗，后转稳。"
    }, "2026、2028后、2036后");
  }

  if (type === "spiritual" && /灵魂线|回身|知道层面|内在/i.test(question)) {
    return withKeyYears({
      long: "灵魂线早醒于现实。2022后转强，2026真回身，2036后才算稳住。",
      phase: `${startYear}-${endYear}：先照见，再回身，后稳住。`,
      block: "症结在头脑先知，身心未全退。",
      support: "来路在你早醒，所以现实更晚跟上。",
      breakPoint: "破口：退旧认，不认波动为退步。",
      habit: "旧业：一清明就想定论，一波动又全盘否定。",
      reminder: "断语：早醒不难，后稳最难。"
    }, "2022后、2026、2036后");
  }

  const blockMap = {
    overall: "旧命未尽，新命未稳，脚还未全然站定。",
    money: "钱路卡在主轴未全接，旧路又已走不回。",
    career: "业途卡在外承接仍慢，内主轴却不肯装假。",
    relationship: "情缘卡在边界未稳，旧位置感未退。",
    property: "宅运卡在暂容器未散，真命壳未成。",
    influence: "名运卡在求快则偏，守纯则慢。",
    health: "体运卡在内耗未断，身体仍被拿来硬扛。",
    spiritual: "灵魂线卡在头脑已知，身体未退。",
    growth: "身命卡在已知回身，却仍因慢自疑。",
    art: "艺命卡在证明心未尽，错法又快不得。"
  };

  const supportMap = {
    overall: "来路已明：你已不是全然被卷的人。",
    money: "来路在主轴。钱终归跟主轴走。",
    career: "来路在作品。画一真，业自起。",
    relationship: "来路在边界。界一稳，缘才稳。",
    property: "来路在壳。先得其壳，后得其地。",
    influence: "来路在后劲。此名不爆，贵在久。",
    health: "来路在减耗。耗一停，体才回。",
    spiritual: "来路在内先动，现实后随。",
    growth: "来路在回身。慢，却是真。",
    art: "来路在画。此线不是偏好，是命脉。"
  };

  const breakMap = {
    overall: "破口：认命，守轴，照走。",
    money: "破口：让钱第一次真接主轴。",
    career: "破口：不套俗轨。",
    relationship: "破口：先稳边界。",
    property: "破口：住处只为安命。",
    influence: "破口：认此名不爆，只求深打。",
    health: "破口：断透支。",
    spiritual: "破口：从知道，到真回身。",
    growth: "破口：许自己晚。",
    art: "破口：从证明，转显现。"
  };

  const longMap = {
    overall: `总命不在早顺，在晚成。${rangeStage}里，先认主轴，再等外势。${specialized || base}`,
    money: `财路不是暴起命。钱要跟主轴走，急钱多假，慢钱才真。${specialized || base}`,
    career: `业途不走俗轨，先定轴，后见位。${specialized || base}`,
    relationship: `情缘先过边界关，再谈归宿。旧戏不断，真缘不稳。${specialized || base}`,
    property: `宅运先求安命，不求好看。壳若不合命，住久也是耗。${specialized || base}`,
    influence: `名运不爆，贵在后劲。先被少数真认出，后才慢慢放大。${specialized || base}`,
    health: `体运先减耗，再回稳。身体不是敌人，是报账。${specialized || base}`,
    spiritual: `灵魂线早醒，难在后稳。先照见，后回身，再安住。${specialized || base}`,
    growth: `身命是晚立命。慢不是病，回头才是病。${specialized || base}`,
    art: `艺命不是偏好，是命脉。先删假火，再等真画自己长出来。${specialized || base}`
  };

  const phaseMap = {
    overall: `${startYear}-${endYear}：先归轴，再见势。`,
    money: `${startYear}-${endYear}：先筛财路，再见真钱。`,
    career: `${startYear}-${endYear}：先立位，再起势。`,
    relationship: `${startYear}-${endYear}：先退旧戏，再看真缘。`,
    property: `${startYear}-${endYear}：先认壳，再定居。`,
    influence: `${startYear}-${endYear}：先小认，再深打。`,
    health: `${startYear}-${endYear}：先减耗，再回稳。`,
    spiritual: `${startYear}-${endYear}：先照见，再稳住。`,
    growth: `${startYear}-${endYear}：先回身，再站定。`,
    art: `${startYear}-${endYear}：先删假，再成画。`
  };

  return withKeyYears({
    long: longMap[aspectKey],
    phase: phaseMap[aspectKey],
    block: blockMap[aspectKey].trim(),
    support: supportMap[aspectKey],
    breakPoint: breakMap[aspectKey],
    habit: habitText(type),
    reminder: `断语：${typeText[aspectKey]}${score >= 6.5 ? "可进" : score >= 4 ? "在换骨" : "不可急攻"}。`
  }, `${focusYear}、${Math.min(focusYear + 2, 2066)}、${Math.min(focusYear + 7, 2066)}`);
}

function buildAiPrompt(type, question, localAnswer) {
  const startYear = Number(startYearSelect.value);
  const endYear = Number(endYearSelect.value);
  const startMonth = Number(startMonthSelect.value);
  const endMonth = Number(endMonthSelect.value);
  const focusYear = Number(yearRange.value);
  const aspectKey = type;
  const aspect = DESTINY_DATA.aspects[aspectKey];
  const yearly = DESTINY_DATA.yearly?.[focusYear] || "";
  const specialized = specializedYearText(aspectKey, focusYear);

  return [
    "你是命理馆批命师傅。",
    "口气要短、冷、稳、利，像断语，不像说明。",
    "宁可少说，不可发软；宁可下断，不可绕讲。",
    "禁止安慰、开导、鼓励、心理咨询、教程腔、自称AI、过程解释。",
    "只能顺底稿往下断，不得编造现实细节。",
    "每行尽量控制在8到28字，必要时可略长。",
    "请严格按以下6行输出，每行只写一段，不要多写前言结尾：",
    "总断：",
    "症结：",
    "来路：",
    "破口：",
    "旧业：",
    "断语：",
    "",
    "风格样例：",
    "总断：此段不是开运，是拆旧定轴。",
    "症结：旧命未退，主体未立。",
    "来路：根在旧命，伤在失位。",
    "破口：先守主轴，再论外势。",
    "旧业：一急回头，一软失位。",
    "断语：先立命，再见路。",
    "",
    "命盘底稿：",
    `出生：${DESTINY_DATA.profile.birth}，地点：${DESTINY_DATA.profile.location}`,
    `主命：${DESTINY_DATA.profile.tagline}`,
    `当前问题类型：${type}`,
    `用户问题：${question}`,
    `时间段：${startYear}.${String(startMonth).padStart(2, "0")} - ${endYear}.${String(endMonth).padStart(2, "0")}`,
    `焦点年：${focusYear}`,
    `当前分线判断：${aspect.verdict}`,
    yearly ? `焦点年总线：${yearly}` : "",
    specialized ? `焦点年分线：${specialized}` : "",
    `四段命势：${DESTINY_DATA.stages.map((item) => `${item.tag}(${item.range})`).join("；")}`,
    `本地批命底稿：总断=${localAnswer.phase}；症结=${localAnswer.block}；来路=${localAnswer.support}；破口=${localAnswer.breakPoint}；旧业=${localAnswer.habit}；断语=${localAnswer.reminder}`,
    "",
    "要求：",
    "1. 更像断命，不像说明书。",
    "2. 话可狠，不可散；可深，不可虚。",
    "3. 不提“作为AI”或“仅供参考”。",
    "4. 不重复用户原话，不说空话。",
    "5. 六行标签必须保留。"
  ].filter(Boolean).join("\n");
}

function tightenLine(text, max = 38) {
  return String(text || "")
    .replace(/^总断[:：]\s*|^症结[:：]\s*|^来路[:：]\s*|^破口[:：]\s*|^旧业[:：]\s*|^断语[:：]\s*/g, "")
    .replace(/\s+/g, " ")
    .replace(/。+/g, "。")
    .replace(/；+/g, "；")
    .replace(/，而且|，并且/g, "，")
    .trim()
    .slice(0, max)
    .trim();
}

function bladeCompact(text, max = 18) {
  return String(text || "")
    .replace(/^总断[:：]\s*|^症结[:：]\s*|^来路[:：]\s*|^破口[:：]\s*|^旧业[:：]\s*|^断语[:：]\s*/g, "")
    .replace(/一段时间|这段时间|这一段|这个阶段|此阶段/g, "")
    .replace(/重点在|来路在|破口：?|旧业：?|断语：?/g, "")
    .replace(/，/g, "，")
    .replace(/。+/g, "")
    .replace(/\s+/g, "")
    .slice(0, max)
    .trim();
}

function tightenAiAnswer(sections, fallback) {
  return {
    long: tightenLine(sections.long || fallback.long, 72) || fallback.long,
    phase: bladeCompact(sections.phase || fallback.phase, 16) || bladeCompact(fallback.phase, 16) || fallback.phase,
    block: bladeCompact(sections.block || fallback.block, 16) || bladeCompact(fallback.block, 16) || fallback.block,
    support: bladeCompact(sections.support || fallback.support, 16) || bladeCompact(fallback.support, 16) || fallback.support,
    breakPoint: bladeCompact(sections.breakPoint || fallback.breakPoint, 16) || bladeCompact(fallback.breakPoint, 16) || fallback.breakPoint,
    habit: bladeCompact(sections.habit || fallback.habit, 16) || bladeCompact(fallback.habit, 16) || fallback.habit,
    reminder: `断语：${bladeCompact(sections.reminder || fallback.reminder, 12) || bladeCompact(fallback.reminder, 12)}`,
    keyYears: sections.keyYears || fallback.keyYears || ""
  };
}

function parseAiSections(text, fallback) {
  const normalized = text.replace(/\r/g, "").trim();
  const pick = (label, defaultValue) => {
    const pattern = new RegExp(`${label}[:：=]\\s*([\\s\\S]*?)(?=\\n(?:总断|症结|来路|破口|旧业|断语)[:：=]|$)`);
    return normalized.match(pattern)?.[1]?.trim() || defaultValue;
  };

  const firstLine = normalized.split("\n")[0]?.trim() || fallback.phase;

  return tightenAiAnswer({
    long: pick("总断", normalized || fallback.long),
    phase: pick("总断", firstLine || fallback.phase),
    block: pick("症结", fallback.block),
    support: pick("来路", fallback.support),
    breakPoint: pick("破口", fallback.breakPoint),
    habit: pick("旧业", fallback.habit),
    reminder: pick("断语", fallback.reminder),
    keyYears: fallback.keyYears,
  }, fallback);
}

function compactAnswerCards(answer) {
  const reminderText = bladeCompact(answer.reminder, 12) || bladeCompact(buildExcerpt(answer), 12) || "照主轴行";
  return {
    ...answer,
    phase: bladeCompact(answer.phase, 16) || bladeCompact(answer.long, 16) || answer.phase || "主线未偏",
    block: bladeCompact(answer.block, 16) || answer.block,
    support: bladeCompact(answer.support, 16) || answer.support,
    breakPoint: bladeCompact(answer.breakPoint, 16) || answer.breakPoint,
    habit: bladeCompact(answer.habit, 16) || answer.habit,
    reminder: reminderText
  };
}

async function postJsonWithSiteFallback(endpoint, body, provider) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (provider !== "site") {
    return fetch(endpoint, request);
  }

  const candidates = [
    endpoint,
    new URL("/api/ask", window.location.origin).toString(),
    "https://mingli-app.yutongzhao.pages.dev/api/ask",
  ].filter((value, index, list) => value && list.indexOf(value) === index);

  let lastError = null;
  for (const url of candidates) {
    try {
      return await fetch(url, request);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("AI请求失败");
}

async function requestAiAnswer(type, question) {
  const localAnswer = buildQuestionAnswer(type, question);
  const settings = getAISettings();
  const provider = settings.provider;
  const endpoint = settings.endpoint.trim();
  const model = settings.model.trim();

  if (!endpoint || !model) {
    throw new Error("AI接口或模型名为空。");
  }

  const requestBody = provider === "site"
    ? {
        model,
        type,
        question,
        localAnswer,
        context: {
          birth: DESTINY_DATA.profile.birth,
          location: DESTINY_DATA.profile.location,
          tagline: DESTINY_DATA.profile.tagline,
          focusYear: Number(yearRange.value),
          startYear: Number(startYearSelect.value),
          endYear: Number(endYearSelect.value),
          startMonth: Number(startMonthSelect.value),
          endMonth: Number(endMonthSelect.value),
          stages: DESTINY_DATA.stages,
          yearly: DESTINY_DATA.yearly?.[Number(yearRange.value)] || "",
          specialized: specializedYearText(type, Number(yearRange.value)),
          aspectVerdict: DESTINY_DATA.aspects[type]?.verdict || "",
        },
      }
    : {
        model,
        prompt: buildAiPrompt(type, question, localAnswer),
        stream: false,
      };

  const response = await postJsonWithSiteFallback(endpoint, requestBody, provider);

  if (!response.ok) {
    throw new Error(`AI接口返回 ${response.status}`);
  }

  const data = await response.json();
  const text = provider === "site"
    ? typeof data.output_text === "string" ? data.output_text : ""
    : typeof data.response === "string" ? data.response : "";
  if (!text.trim()) {
    throw new Error("AI没有返回正文。");
  }

  return parseAiSections(text, localAnswer);
}

async function requestAiChatAnswer(type, question) {
  const inferredType = inferQuestionAspect(type, question);
  const localAnswer = buildQuestionAnswer(inferredType, question);
  const settings = getAISettings();
  const provider = settings.provider;
  const endpoint = settings.endpoint.trim();
  const model = settings.model.trim();
  const focusYear = Number(yearRange.value);
  const history = getAiChatHistory().slice(-6).map((item) => ({
    role: item.role,
    text: String(item.text || "").replace(/\s+/g, " ").trim().slice(0, 120),
  }));

  if (!endpoint || !model) {
    throw new Error("AI接口或模型名为空。");
  }

  const requestBody = provider === "site"
    ? {
        mode: "chat",
        model,
        type: inferredType,
        question,
        localAnswer,
        context: {
          birth: DESTINY_DATA.profile.birth,
          location: DESTINY_DATA.profile.location,
          tagline: DESTINY_DATA.profile.tagline,
          focusYear,
          startYear: Number(startYearSelect.value),
          endYear: Number(endYearSelect.value),
          startMonth: Number(startMonthSelect.value),
          endMonth: Number(endMonthSelect.value),
          stages: DESTINY_DATA.stages,
          yearly: DESTINY_DATA.yearly?.[focusYear] || "",
          specialized: specializedYearText(inferredType, focusYear),
          aspectVerdict: DESTINY_DATA.aspects[inferredType]?.verdict || "",
          chatHistory: history,
        },
      }
    : {
        model,
        prompt: buildAiPrompt(type, question, localAnswer),
        stream: false,
      };

  const response = await postJsonWithSiteFallback(endpoint, requestBody, provider);

  if (!response.ok) {
    throw new Error(`AI接口返回 ${response.status}`);
  }

  const data = await response.json();
  const text = provider === "site"
    ? typeof data.output_text === "string" ? data.output_text : ""
    : typeof data.response === "string" ? data.response : "";
  if (!text.trim()) {
    throw new Error("AI没有返回正文。");
  }

  return text.trim();
}

async function pingAiConnection() {
  const settings = getAISettings();
  const provider = settings.provider;
  const endpoint = settings.endpoint.trim();
  const model = settings.model.trim();

  if (!endpoint || !model) {
    throw new Error("AI接口或模型名为空。");
  }

  const body = provider === "site"
    ? { model, ping: true }
    : { model, prompt: "只回四个字：连接已通", stream: false };

  const response = await postJsonWithSiteFallback(endpoint, body, provider);

  if (!response.ok) {
    throw new Error(`AI接口返回 ${response.status}`);
  }

  const data = await response.json();
  const text = provider === "site"
    ? typeof data.message === "string" ? data.message.trim() : ""
    : typeof data.response === "string" ? data.response.trim() : "";
  if (!text) {
    throw new Error("AI没有返回正文。");
  }
  return text;
}

function renderHistory() {
  if (!questionHistory) return;
  const history = loadState().history || [];
  const filter = getHistoryFilter();
  questionHistory.innerHTML = "";
  const filtered = filter === "all" ? history : history.filter((item) => item.type === filter);
  if (!filtered.length) return;
  filtered.slice().reverse().forEach((item) => {
    const card = document.createElement("article");
    card.className = "history-card";
    card.innerHTML = `
      <p class="history-meta">${item.time}</p>
      <p><strong>${item.typeLabel}</strong> · ${item.modeLabel || "本地批命"} · ${item.question}</p>
      <p class="history-meta">关键年份：${item.keyYears || "未定"}</p>
      <p class="history-excerpt">摘录：${item.excerpt || item.answer}</p>
      <p>${item.answer}</p>
    `;
    questionHistory.appendChild(card);
  });
}

function renderAiChatHistory() {
  if (!aiChatThread) return;
  const history = getAiChatHistory();
  aiChatThread.innerHTML = "";

  if (!history.length) {
    if (aiChatEmpty) {
      aiChatEmpty.hidden = false;
      aiChatThread.appendChild(aiChatEmpty);
    }
    return;
  }

  if (aiChatEmpty) aiChatEmpty.hidden = true;

  history.forEach((item) => {
    const card = document.createElement("article");
    card.className = `ai-chat-item ${item.role}`;
    const meta = document.createElement("p");
    meta.className = "ai-chat-meta";
    meta.textContent = item.role === "user" ? "你" : item.label || "AI深断";
    const body = document.createElement("p");
    body.className = "ai-chat-body";
    body.textContent = item.text;
    card.appendChild(meta);
    card.appendChild(body);
    aiChatThread.appendChild(card);
  });

  aiChatThread.scrollTop = aiChatThread.scrollHeight;
}

function pushAiChatMessage(role, text, label = "") {
  const history = getAiChatHistory();
  history.push({ role, text, label });
  saveAiChatHistory(history);
  renderAiChatHistory();
}

function formatAiChatAnswer(answer) {
  if (!answer) return "";
  if (typeof answer === "string") return answer;
  const parts = [
    answer.long,
    answer.phase ? `总断：${answer.phase}` : "",
    answer.block ? `症结：${answer.block}` : "",
    answer.support ? `来路：${answer.support}` : "",
    answer.breakPoint ? `破口：${answer.breakPoint}` : "",
    answer.habit ? `旧业：${answer.habit}` : "",
    answer.reminder ? `断语：${String(answer.reminder).replace(/^断语[:：]?\s*/, "")}` : "",
    answer.keyYears ? `关键年：${answer.keyYears}` : "",
  ].filter(Boolean);
  return parts.join("\n");
}

function revealAskResult() {
  if (!askResultCard) return;
  askResultCard.classList.remove("is-revealing");
  void askResultCard.offsetWidth;
  askResultCard.classList.add("is-revealing");
}

function updateView(options = {}) {
  if (!yearRange || !aspectSelect || !scoreOutput || !trendOutput || !yearSummary) return;
  const selectedYear = Number(yearRange.value);
  const previewYear = options.previewYear || chartState.time.previewYear || null;
  const year = previewYear || selectedYear;
  const aspectKey = aspectSelect.value;
  const aspect = DESTINY_DATA.aspects[aspectKey];
  const score = interpolateScore(aspect.anchors, year);
  const age = year - START_YEAR + 1;
  const specialized = specializedYearText(aspectKey, year);

  if (yearDeepDetails && chartState.time.lastRenderedYear !== null && chartState.time.lastRenderedYear !== year) {
    yearDeepDetails.open = false;
  }
  chartState.time.aspectKey = aspectKey;
  chartState.time.selectedYear = selectedYear;
  chartState.time.lastRenderedYear = year;
  if (yearOutput) yearOutput.textContent = year;
  if (ageOutput) ageOutput.textContent = `${age}岁`;
  scoreOutput.textContent = score.toFixed(1);
  trendOutput.textContent = trendText(score);
  const yearSummaryText = buildPersonalYearSummary(aspectKey, year, score) || specialized || DESTINY_DATA.yearly[year] || `${year}年属于阶段过渡。`;
  const yearGuideText = buildYearImpact(aspectKey, year, score);
  yearSummary.textContent = [yearSummaryText, yearGuideText].filter(Boolean).join(" ");
  if (yearGuidance) yearGuidance.textContent = yearGuideText;
  if (yearDeep) {
    yearDeep.textContent = buildYearDeepText(aspectKey, year, score);
  }
  renderRangeView();
  if (personalBriefProfile) {
    const startYear = Number(startYearSelect?.value || year);
    const endYear = Number(endYearSelect?.value || year);
    const startMonth = Number(startMonthSelect?.value || 1);
    const endMonth = Number(endMonthSelect?.value || 12);
    renderProfileGrid(
      personalBriefProfile,
      buildPersonalBaziBriefProfile(DESTINY_DATA.baziChart || {}, aspectKey, year, score, startYear, endYear, startMonth, endMonth),
      "四柱摘要会显示在这里。"
    );
  }
  const chartMode = chartState.time.chartMode || "single";
  const overlayGroup = chartState.time.chartGroup || "all";
  const overlayKeys = chartMode === "overlay" ? (PERSONAL_OVERLAY_GROUPS[overlayGroup] || PERSONAL_OVERLAY_GROUPS.all) : [];
  renderChart(timeChart, aspectKey, selectedYear, previewYear, {
    introText: (activeYear, activeScore) => shortYearIntro(aspectKey, activeYear, activeScore),
    showPresetZones: true,
    overlayKeys,
  });
  renderPersonalChartLegend(aspectKey, overlayKeys);
  if (timeChartNote) {
    timeChartNote.textContent = chartMode === "overlay"
      ? `${aspect.label}为主线，叠看核心线。悬看，点定；详见年批。`
      : `${aspect.label}线。悬看，点定；详见年批。`;
  }
}

if (personalChartMode) {
  personalChartMode.querySelectorAll("[data-chart-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      chartState.time.chartMode = button.dataset.chartMode || "single";
      updatePersonalChartMode(chartState.time.chartMode);
      updateView();
    });
  });
  chartState.time.chartMode = "single";
  updatePersonalChartMode("single");
}

if (personalChartGroup) {
  personalChartGroup.querySelectorAll("[data-chart-group]").forEach((button) => {
    button.addEventListener("click", () => {
      chartState.time.chartGroup = button.dataset.chartGroup || "all";
      updatePersonalChartGroup(chartState.time.chartGroup);
      updateView();
    });
  });
  chartState.time.chartGroup = "all";
  updatePersonalChartGroup("all");
}

const hasQuestionReadingUi = Boolean(aspectSelect && questionType && questionInput);
const hasTimeChartUi = Boolean(timeChart);
const hasQuickBirthUi = Boolean(quickBirthGenerate && quickBirthChart);
const hasAiChatUi = Boolean(aiChatThread);

if (hasQuestionReadingUi || hasTimeChartUi) {
  fillAspectControls();
  fillQuestionTypeTabs();
  fillRangePresets();
  fillQuestionTemplates();
  renderStaticSections();
  renderHistory();
}

if (hasAiChatUi) {
  renderAiChatHistory();
}

if (hasTimeChartUi) {
  fillTimeSelectors();
  bindChartEvents(timeChart, "time");
}

if (hasQuickBirthUi) {
  bindQuickBirthChartEvents();
}

if (aspectSelect && questionType && questionInput) {
  aspectSelect.addEventListener("change", () => {
    updateActiveChip(aspectSelect.value);
    updateAspectMeaningUI(aspectSelect.value, chartState.question.aspectKey || inferQuestionAspect(questionType.value, questionInput.value));
    updateView();
  });
}

if (yearRange) {
  yearRange.addEventListener("input", updateView);
  if (questionType && questionInput) {
    yearRange.addEventListener("input", () => {
      chartState.question.selectedYear = Number(yearRange.value);
      syncQuestionChart();
    });
  }
}

if (questionType) {
  questionType.addEventListener("change", syncQuestionChart);
}

if (questionInput) {
  questionInput.addEventListener("input", syncQuestionChart);
}

[
  startYearSelect,
  endYearSelect,
  startMonthSelect,
  endMonthSelect,
].forEach((el) => el?.addEventListener("change", updateRangeView));

if (askButton && questionInput && questionAnswer && questionType) {
  askButton.addEventListener("click", async () => {
    const question = questionInput.value.trim();
    if (!question) {
      questionAnswer.textContent = "先问";
      return;
    }

    askButton.disabled = true;
    const currentEngine = engineMode?.value || "local";
    askButton.textContent = "起...";
    const type = questionType.value;
    let answer;
    let answerPrefix = "";

    if (yearRange) {
      chartState.question.selectedYear = Number(yearRange.value);
    }
    syncQuestionChart();

    try {
      if (currentEngine === "ai") {
        answer = await requestAiAnswer(type, question);
      } else {
        answer = buildQuestionAnswer(type, question);
      }
    } catch (error) {
      answer = buildQuestionAnswer(type, question);
      answerPrefix = `AI深断未接通，先回落到本地批命。${error.message} `;
    } finally {
      askButton.disabled = false;
      askButton.textContent = "起";
    }

    answer = compactAnswerCards(answer);

    if (answerKeyYears) answerKeyYears.textContent = answer.keyYears || "未定";
    if (answerPhase) answerPhase.textContent = answer.phase || buildExcerpt(answer) || "主线未偏";
    if (answerBlock) answerBlock.textContent = answer.block;
    if (answerSupport) answerSupport.textContent = answer.support;
    if (answerBreak) answerBreak.textContent = answer.breakPoint;
    if (answerHabit) answerHabit.textContent = answer.habit;
    if (answerReminder) answerReminder.textContent = answer.reminder || "照主轴行";
    questionAnswer.textContent = `${answerPrefix}${answer.long}`.trim();
    const typeLabel = questionType.options[questionType.selectedIndex]?.textContent || "";
    const modeLabel = currentEngine === "ai" ? "AI深断" : "本地批命";
    const history = loadState().history || [];
    history.push({
      time: new Date().toLocaleString(),
      type,
      typeLabel,
      modeLabel,
      question,
      keyYears: answer.keyYears || "",
      excerpt: buildExcerpt(answer),
      answer: `${answerPrefix}${answer.long}`.trim(),
    });
    saveState({ history: history.slice(-20) });
    renderHistory();
    revealAskResult();
  });
}

if (clearHistory) {
  clearHistory.addEventListener("click", () => {
    saveState({ history: [] });
    renderHistory();
    questionAnswer.textContent = "提问记录已清空。";
  });
}

if (historyFilter) {
  historyFilter.addEventListener("change", () => {
    saveState({ historyFilter: historyFilter.value });
    renderHistory();
  });
}

if (exportReading) {
  exportReading.addEventListener("click", exportCurrentReading);
}

if (engineMode) {
  engineMode.addEventListener("change", () => {
    saveState({ engineMode: "local" });
    engineMode.value = "local";
    updateEngineModeUI();
  });
}

if (aiProvider) {
  aiProvider.addEventListener("change", () => {
    saveState({ aiProvider: aiProvider.value });
    updateAiSettingsUI();
  });
}

if (saveAiSettings) {
  saveAiSettings.addEventListener("click", () => {
    const provider = aiProvider.value;
    const endpoint = aiEndpoint.value.trim();
    const model = aiModel.value.trim();
    saveState({
      aiProvider: provider || DEFAULT_AI_PROVIDER,
      aiEndpoint: endpoint || DEFAULT_AI_ENDPOINT,
      aiModel: model || DEFAULT_AI_MODEL,
    });
    updateAiSettingsUI();
  });
}

if (testAiConnection) {
  testAiConnection.addEventListener("click", async () => {
    const provider = aiProvider.value;
    const endpoint = aiEndpoint.value.trim();
    const model = aiModel.value.trim();
    saveState({
      aiProvider: provider || DEFAULT_AI_PROVIDER,
      aiEndpoint: endpoint || DEFAULT_AI_ENDPOINT,
      aiModel: model || DEFAULT_AI_MODEL,
    });

    testAiConnection.disabled = true;
    testAiConnection.textContent = "测...";

    try {
      const text = await pingAiConnection();
      aiSettingsNote.textContent = `AI已接通：${text}`;
    } catch (error) {
      aiSettingsNote.textContent = `AI未接通：${error.message}`;
    } finally {
      testAiConnection.disabled = false;
      testAiConnection.textContent = "测试";
    }
  });
}

if (reminderMode) {
  reminderMode.addEventListener("change", () => {
    saveState({ reminderMode: reminderMode.value });
    answerMode.value = reminderMode.value;
    applyAnswerMode(reminderMode.value);
  });
}

if (answerMode) {
  answerMode.addEventListener("change", () => {
    saveState({ reminderMode: answerMode.value });
    if (reminderMode) reminderMode.value = answerMode.value;
    applyAnswerMode(answerMode.value);
  });
}

if (installButton) {
  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      await triggerInstallPrompt();
      return;
    }
    hideInstallBanner(true);
  });
}

if (installDismiss) {
  installDismiss.addEventListener("click", () => {
    hideInstallBanner(true);
  });
}

if (aiChatSend) {
  aiChatSend.addEventListener("click", async () => {
    const question = aiChatInput?.value.trim();
    if (!question) return;

    const type = questionType?.value || "overall";
    pushAiChatMessage("user", question, "你");
    if (aiChatInput) aiChatInput.value = "";

    aiChatSend.disabled = true;
    aiChatSend.textContent = "问...";

    try {
      const aiText = await requestAiChatAnswer(type, question);
      pushAiChatMessage("assistant", aiText, "AI深断");
    } catch (error) {
      const fallback = buildQuestionAnswer(type, question);
      pushAiChatMessage("assistant", `AI未接通，先回本地批命。${error.message ? `\n\n${error.message}` : ""}\n\n${fallback.long}`, "本地批命");
    } finally {
      aiChatSend.disabled = false;
      aiChatSend.textContent = "问";
    }
  });
}

if (aiChatInput) {
  aiChatInput.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      aiChatSend?.click();
    }
  });
}

if (aiChatClear) {
  aiChatClear.addEventListener("click", () => {
    saveAiChatHistory([]);
    renderAiChatHistory();
  });
}

if (quickBirthGenerate) {
  quickBirthGenerate.addEventListener("click", () => {
    dismissQuickBirthOverlays();
    applyQuickBirthProfile();
  });
}

if (quickBirthDateInput) {
  quickBirthDateInput.addEventListener("change", () => {
    syncQuickBirthDays();
    autoResolveQuickBirthCityIfReady().catch(() => {});
  });
}

if (quickBirthTimeInput) {
  quickBirthTimeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") applyQuickBirthProfile();
  });
}

if (quickBirthCityInput) {
  quickBirthCityInput.addEventListener("input", () => {
    quickBirthSelectedCityOption = null;
    if (quickBirthCityDebounce) window.clearTimeout(quickBirthCityDebounce);
    quickBirthCityDebounce = window.setTimeout(() => {
      updateQuickBirthCitySuggestions();
    }, 180);
  });
  quickBirthCityInput.addEventListener("change", () => {
    const exact = citySuggestCache.get(normalizeCityLookupKey(String(quickBirthCityInput.value || "").trim()));
    quickBirthSelectedCityOption = exact || null;
    applyQuickBirthCityHint(exact || null);
    autoResolveQuickBirthCityIfReady().catch(() => {});
  });
  quickBirthCityInput.addEventListener("blur", () => {
    if (quickBirthCityHideTimer) window.clearTimeout(quickBirthCityHideTimer);
    quickBirthCityHideTimer = window.setTimeout(() => {
      hideQuickBirthCityOptions();
      const exact = citySuggestCache.get(normalizeCityLookupKey(String(quickBirthCityInput.value || "").trim()));
      if (exact) quickBirthSelectedCityOption = exact;
      applyQuickBirthCityHint(exact || quickBirthSelectedCityOption || null);
      autoResolveQuickBirthCityIfReady().catch(() => {});
    }, 120);
  });
}

if (quickBirthCityPicks) {
  quickBirthCityPicks.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });
  quickBirthCityPicks.addEventListener("click", (event) => {
    const button = event.target.closest("[data-city-pick]");
    if (!button) return;
    const option = citySuggestCache.get(normalizeCityLookupKey(button.dataset.cityPick));
    if (!option) return;
    if (quickBirthCityHideTimer) window.clearTimeout(quickBirthCityHideTimer);
    selectQuickBirthCityOption(option);
  });
}

if (quickNameInput) {
  quickNameInput.addEventListener("change", () => {
    hydrateQuickBirthFromSharedProfile().catch(() => {});
  });
}

if (quickTimeUnknown) {
  quickTimeUnknown.addEventListener("change", syncQuickTimeMode);
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallBanner();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  hideInstallBanner(true);
});

if (questionType && questionInput && aspectSelect) {
  syncQuestionChart();
}
updateAspectMeaningUI(aspectSelect?.value || "overall", chartState.question.aspectKey || "overall");
if (yearRange && scoreOutput && trendOutput && yearSummary) {
  updateView();
}
if (startYearSelect && endYearSelect && startMonthSelect && endMonthSelect && rangeSummary) {
  updateRangeView();
}
initModes();
updateInstallBanner();
initQuickBirthFields();
resetQuickBirthProfile();
renderQuickBirthHistory();
quickBirthCloudSyncPromise = syncQuickBirthHistoryFromCloud();

if (quickBirthHistory && quickBirthHistory.dataset.bound !== "true") {
  quickBirthHistory.addEventListener("click", (event) => {
    const removeTarget = event.target.closest("[data-quick-history-remove], [data-fallback-remove]");
    if (removeTarget) {
      removeQuickBirthHistoryRecord(Number(removeTarget.getAttribute("data-quick-history-remove") || removeTarget.getAttribute("data-fallback-remove")));
      return;
    }

    const editTarget = event.target.closest("[data-quick-history-edit], [data-fallback-edit]");
    if (editTarget) {
      dismissQuickBirthOverlays();
      applyQuickBirthHistoryRecord(Number(editTarget.getAttribute("data-quick-history-edit") || editTarget.getAttribute("data-fallback-edit")));
      return;
    }

    const openTarget = event.target.closest("[data-quick-history-open], [data-fallback-open]");
    if (!openTarget) return;
    dismissQuickBirthOverlays();
    applyQuickBirthHistoryRecord(Number(openTarget.getAttribute("data-quick-history-open") || openTarget.getAttribute("data-fallback-open")));
  });

  quickBirthHistory.addEventListener("dblclick", (event) => {
    const openTarget = event.target.closest("[data-quick-history-open], [data-fallback-open]");
    if (!openTarget) return;
    event.preventDefault();
    dismissQuickBirthOverlays();
    applyQuickBirthHistoryRecord(Number(openTarget.getAttribute("data-quick-history-open") || openTarget.getAttribute("data-fallback-open")));
  });

  quickBirthHistory.addEventListener("contextmenu", (event) => {
    const removeTarget = event.target.closest("[data-quick-history-remove], [data-fallback-remove]");
    if (removeTarget) {
      event.preventDefault();
      return;
    }
    const pinTarget = event.target.closest("[data-quick-history-pin]");
    if (pinTarget) {
      event.preventDefault();
      return;
    }
    const openTarget = event.target.closest("[data-quick-history-open], [data-fallback-open]");
    if (!openTarget) return;
    event.preventDefault();
  });
  quickBirthHistory.dataset.bound = "true";
}
