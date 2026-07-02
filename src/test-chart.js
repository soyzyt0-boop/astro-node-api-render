import { buildChart } from "./chart.js";

const chart = buildChart({
  year: 1986,
  month: 9,
  day: 10,
  hour: 11,
  minute: 35,
  second: 0,
  latitude: 39.9042,
  longitude: 116.4074,
  timezone: "+08:00",
});

console.log(JSON.stringify(chart, null, 2));
