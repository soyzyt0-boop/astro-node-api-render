import { ganzhiFromIndex } from "../constants/ganzhi.js";

export function buildLiunian(input, years = 80) {
  return Array.from({ length: years + 1 }, (_, index) => {
    const year = input.year + index;
    const ganZhi = ganzhiFromIndex(year - 4);
    return {
      year,
      age: index,
      ganZhi,
      stem: ganZhi.slice(0, 1),
      branch: ganZhi.slice(1, 2),
    };
  });
}
