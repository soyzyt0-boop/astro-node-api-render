import http from "node:http";
import { buildChart } from "./chart.js";

const PORT = Number(process.env.PORT || 4318);
const HOST = process.env.HOST || "127.0.0.1";

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function collectJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("请求体过大。"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON 解析失败。"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    sendJson(res, 400, { ok: false, error: "Bad Request" });
    return;
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, { ok: true, service: "astro-node-api" });
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    sendJson(res, 200, {
      ok: true,
      service: "astro-node-api",
      endpoints: ["/health", "/chart"],
    });
    return;
  }

  if (req.method === "POST" && req.url === "/chart") {
    try {
      const payload = await collectJson(req);
      const chart = buildChart(payload);
      sendJson(res, 200, { ok: true, chart });
    } catch (error) {
      sendJson(res, 400, {
        ok: false,
        error: error instanceof Error ? error.message : "排盘失败。",
      });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: "Not Found" });
});

server.on("error", (error) => {
  console.error("astro-node-api server error:", error);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`astro-node-api listening on http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`astro-node-api received ${signal}, shutting down...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
