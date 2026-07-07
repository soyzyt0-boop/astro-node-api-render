function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mingxian-Key",
    },
  });
}

function corsEmpty(status = 204) {
  return new Response(null, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mingxian-Key",
      "Access-Control-Max-Age": "86400",
      "Cache-Control": "no-store",
    },
  });
}

const ALLOWED_SCOPES = new Set([
  "astrology_records",
  "astrology_history",
  "bazi_quick_history",
  "shared_profiles",
  "private_notes",
  "private_draft",
]);

function normalizeScope(value = "") {
  return String(value || "").trim().toLowerCase();
}

function parseBoolean(value) {
  return String(value || "").trim().toLowerCase() === "1" || String(value || "").trim().toLowerCase() === "true";
}

function requireStore(env) {
  if (!env.MINGXIAN_STORE) {
    throw new Error("云端存储未配置。");
  }
  return env.MINGXIAN_STORE;
}

function buildKey(scope) {
  return `mingxian:${scope}`;
}

function requiresAuth(scope) {
  return scope === "private_notes" || scope === "private_draft";
}

function checkAuth(request, env) {
  const expected = String(env.MINGXIAN_PRIVATE_KEY || "").trim();
  if (!expected) return true;
  const provided = String(request.headers.get("X-Mingxian-Key") || "").trim();
  return provided === expected;
}

export async function onRequest(context) {
  try {
    const method = context.request.method.toUpperCase();
    if (method === "OPTIONS") return corsEmpty();
    if (!["GET", "POST", "DELETE"].includes(method)) {
      return json({ ok: false, error: "Method Not Allowed" }, 405);
    }

    const url = new URL(context.request.url);
    const scope = normalizeScope(url.searchParams.get("scope"));
    const useMeta = parseBoolean(url.searchParams.get("meta"));

    if (!ALLOWED_SCOPES.has(scope)) {
      return json({ ok: false, error: "scope 不合法。" }, 400);
    }
    if (requiresAuth(scope) && !checkAuth(context.request, context.env)) {
      return json({ ok: false, error: "未授权。" }, 401);
    }

    const store = requireStore(context.env);
    const storageKey = buildKey(scope);

    if (method === "GET") {
      const raw = await store.get(storageKey);
      if (!raw) {
        return json({
          ok: true,
          scope,
          value: scope === "private_draft" ? {} : [],
          updatedAt: null,
        });
      }
      const parsed = JSON.parse(raw);
      return json({
        ok: true,
        scope,
        value: useMeta ? parsed.value : parsed.value,
        updatedAt: parsed.updatedAt || null,
      });
    }

    if (method === "DELETE") {
      await store.delete(storageKey);
      return json({ ok: true, scope, deleted: true });
    }

    const payload = await context.request.json();
    const value = payload?.value;

    if (scope === "private_draft") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return json({ ok: false, error: "草稿格式不对。" }, 400);
      }
    } else if (!Array.isArray(value)) {
      return json({ ok: false, error: "记录格式不对。" }, 400);
    }

    const next = {
      value,
      updatedAt: Date.now(),
    };
    await store.put(storageKey, JSON.stringify(next));
    return json({
      ok: true,
      scope,
      value: next.value,
      updatedAt: next.updatedAt,
    });
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : "云端存储失败。",
    }, 500);
  }
}
