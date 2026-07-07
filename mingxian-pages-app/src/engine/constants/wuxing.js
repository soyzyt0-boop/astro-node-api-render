export const WU_XING = ["木", "火", "土", "金", "水"];

export const STEM_TO_WUXING = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水",
};

export const BRANCH_TO_WUXING = {
  子: "水",
  丑: "土",
  寅: "木",
  卯: "木",
  辰: "土",
  巳: "火",
  午: "火",
  未: "土",
  申: "金",
  酉: "金",
  戌: "土",
  亥: "水",
};

export const BRANCH_HIDDEN_STEMS = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
};

export const WUXING_GENERATES = {
  木: "火",
  火: "土",
  土: "金",
  金: "水",
  水: "木",
};

export const WUXING_CONTROLS = {
  木: "土",
  火: "金",
  土: "水",
  金: "木",
  水: "火",
};

export function controlledBy(element) {
  return Object.keys(WUXING_CONTROLS).find((key) => WUXING_CONTROLS[key] === element) || "";
}

export function generatedBy(element) {
  return Object.keys(WUXING_GENERATES).find((key) => WUXING_GENERATES[key] === element) || "";
}
