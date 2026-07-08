import { json, requireStore, requireUser } from "../../_lib/auth.js";

const SCOPES = [
  "bazi_quick_history",
  "bazi_quick_deleted",
  "shared_profiles",
  "astrology_records",
];

function buildUserScopeKey(userId, scope) {
  return `member:${userId}:${scope}`;
}

export async function onRequestGet(context) {
  try {
    const user = await requireUser(context);
    if (!user) return json({ ok: false, error: "请先登录。" }, 401);
    const store = requireStore(context.env);
    const entries = await Promise.all(
      SCOPES.map(async (scope) => {
        const raw = await store.get(buildUserScopeKey(user.id, scope));
        const parsed = raw ? JSON.parse(raw) : { value: scope === "bazi_quick_deleted" ? [] : [] };
        return [scope, parsed.value];
      }),
    );
    return json({
      ok: true,
      readings: Object.fromEntries(entries),
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "读取留档失败。" }, 400);
  }
}
