import { buildBaziChart } from "../../src/engine/index.js";

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

export async function onRequest(context) {
  try {
    const method = context.request.method.toUpperCase();
    if (method === "OPTIONS") {
      return corsEmpty();
    }
    if (method === "GET") {
      return json({
        ok: true,
        service: "bazi",
        phase: "skeleton",
        message: "POST 出生信息到这里，会返回八字引擎一期骨架结果。",
      });
    }
    if (method !== "POST") {
      return json({ ok: false, error: "Method Not Allowed" }, 405);
    }

    const payload = await context.request.json();
    const built = buildBaziChart(payload);
    if (!built.ok) {
      return json(built, 400);
    }
    return json(built, 200);
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "接口出错。",
    }, 500);
  }
}
