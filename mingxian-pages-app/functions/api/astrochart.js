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

async function readJsonSafely(response, fallbackMessage) {
  const raw = await response.text();
  if (!raw) {
    throw new Error(fallbackMessage);
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(raw.slice(0, 200) || fallbackMessage);
  }
}

export async function onRequest(context) {
  try {
    const method = context.request.method.toUpperCase();
    if (method === "OPTIONS") return corsEmpty();
    if (method !== "POST") {
      return json({ ok: false, error: "Method Not Allowed" }, 405);
    }

    const payload = await context.request.json();
    const upstream = await fetch("https://astro-node-api.onrender.com/chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await readJsonSafely(upstream, "占星接口没有返回有效数据。");
    return json(data, upstream.ok ? 200 : upstream.status);
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "占星接口转发失败。",
    }, 500);
  }
}
