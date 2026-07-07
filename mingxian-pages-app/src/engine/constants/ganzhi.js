export const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
export const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

export function ganzhiFromIndex(index) {
  const stem = HEAVENLY_STEMS[((index % 10) + 10) % 10];
  const branch = EARTHLY_BRANCHES[((index % 12) + 12) % 12];
  return `${stem}${branch}`;
}
