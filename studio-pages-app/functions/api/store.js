import { getSession, requireStore } from "../_lib/auth.js";

function headersFor(origin) {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mingxian-Key",
    "Access-Control-Allow-Credentials": "true",
  };
}

function json(origin, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: headersFor(origin),
  });
}

function corsEmpty(origin, status = 204) {
  return new Response(null, {
    status,
    headers: {
      ...headersFor(origin),
      "Access-Control-Max-Age": "86400",
    },
  });
}

const ALLOWED_SCOPES = new Set([
  "astrology_records",
  "astrology_history",
  "bazi_quick_history",
  "bazi_quick_deleted",
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

function buildKey(scope) {
  return `mingxian:${scope}`;
}

function buildMemberKey(userId, scope) {
  return `member:${userId}:${scope}`;
}

function usesMemberIsolation(scope) {
  return scope === "astrology_records"
    || scope === "astrology_history"
    || scope === "bazi_quick_history"
    || scope === "bazi_quick_deleted"
    || scope === "shared_profiles";
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
    const origin = context.request.headers.get("Origin") || new URL(context.request.url).origin;
    if (method === "OPTIONS") return corsEmpty(origin);
    if (!["GET", "POST", "DELETE"].includes(method)) {
      return json(origin, { ok: false, error: "Method Not Allowed" }, 405);
    }

    const url = new URL(context.request.url);
    const scope = normalizeScope(url.searchParams.get("scope"));
    const useMeta = parseBoolean(url.searchParams.get("meta"));

    if (!ALLOWED_SCOPES.has(scope)) {
      return json(origin, { ok: false, error: "scope 不合法。" }, 400);
    }
    if (requiresAuth(scope) && !checkAuth(context.request, context.env)) {
      return json(origin, { ok: false, error: "未授权。" }, 401);
    }

    const store = requireStore(context.env);
    const session = usesMemberIsolation(scope) ? await getSession(context.request, context.env) : null;
    if (usesMemberIsolation(scope) && !session?.user?.id) {
      return json(origin, {
        ok: false,
        error: "请先登录后再保存个人资料。",
      }, 401);
    }
    const storageKey = session?.user?.id ? buildMemberKey(session.user.id, scope) : buildKey(scope);

    if (method === "GET") {
      const raw = await store.get(storageKey);
      if (!raw) {
        return json(origin, {
          ok: true,
          scope,
          value: scope === "private_draft" ? {} : [],
          updatedAt: null,
        });
      }
      const parsed = JSON.parse(raw);
      return json(origin, {
        ok: true,
        scope,
        value: useMeta ? parsed.value : parsed.value,
        updatedAt: parsed.updatedAt || null,
      });
    }

    if (method === "DELETE") {
      await store.delete(storageKey);
      return json(origin, { ok: true, scope, deleted: true });
    }

    const payload = await context.request.json();
    const value = payload?.value;

    if (scope === "private_draft") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return json(origin, { ok: false, error: "草稿格式不对。" }, 400);
      }
    } else if (!Array.isArray(value)) {
      return json(origin, { ok: false, error: "记录格式不对。" }, 400);
    }

    const next = {
      value,
      updatedAt: Date.now(),
    };
    await store.put(storageKey, JSON.stringify(next));
    return json(origin, {
      ok: true,
      scope,
      value: next.value,
      updatedAt: next.updatedAt,
    });
  } catch (error) {
    return json(context.request.headers.get("Origin") || new URL(context.request.url).origin, {
      ok: false,
      error: error instanceof Error ? error.message : "云端存储失败。",
    }, 500);
  }
}
