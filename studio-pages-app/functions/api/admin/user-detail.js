import { getSession, json, requireStore } from "../../_lib/auth.js";

const SCOPES = [
  "bazi_quick_history",
  "astrology_records",
];

function buildInboxKey(userId) {
  return `member:${userId}:messages`;
}

function buildUserKey(userId) {
  return `auth:user:${userId}`;
}

function buildUserScopeKey(userId, scope) {
  return `member:${userId}:${scope}`;
}

function isAdmin(user) {
  const email = String(user?.email || "").trim().toLowerCase();
  return new Set([
    "yutong@zhaoyutong.studio",
    "soyzyt0@gmail.com",
  ]).has(email);
}

async function requireAdmin(context) {
  const auth = await getSession(context.request, context.env);
  if (!auth?.user) {
    return { error: json({ ok: false, error: "请先登录。" }, 401) };
  }
  if (!isAdmin(auth.user)) {
    return { error: json({ ok: false, error: "只有后台账号可以查看用户详情。" }, 403) };
  }
  return { auth };
}

export async function onRequestGet(context) {
  try {
    const result = await requireAdmin(context);
    if (result.error) return result.error;

    const store = requireStore(context.env);
    const url = new URL(context.request.url);
    const email = String(url.searchParams.get("email") || "").trim().toLowerCase();
    if (!email) return json({ ok: false, error: "缺少用户邮箱。" }, 400);

    const userId = await store.get(`auth:email:${email}`);
    if (!userId) return json({ ok: false, error: "没有找到这个用户。" }, 404);

    const rawUser = await store.get(buildUserKey(userId));
    const user = rawUser ? JSON.parse(rawUser) : null;
    if (!user?.id) return json({ ok: false, error: "用户资料缺失。" }, 404);

    const [baziRaw, astroRaw, inboxRaw] = await Promise.all([
      store.get(buildUserScopeKey(user.id, SCOPES[0])),
      store.get(buildUserScopeKey(user.id, SCOPES[1])),
      store.get(buildInboxKey(user.id)),
    ]);

    const bazi = baziRaw ? JSON.parse(baziRaw)?.value || [] : [];
    const astro = astroRaw ? JSON.parse(astroRaw)?.value || [] : [];
    const inbox = inboxRaw ? JSON.parse(inboxRaw) : [];

    return json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName || "",
        fullName: user.fullName || "",
        city: user.city || "",
        notes: user.notes || "",
        createdAt: user.createdAt || null,
      },
      readings: {
        bazi: Array.isArray(bazi) ? bazi.slice(0, 6) : [],
        astrology: Array.isArray(astro) ? astro.slice(0, 6) : [],
      },
      inbox: Array.isArray(inbox)
        ? inbox.slice(0, 6).map((item) => ({
            id: item.id,
            title: item.title || "",
            body: item.body || "",
            type: item.type || "system",
            typeLabel: item.typeLabel || "系统通知",
            createdAt: item.createdAt || null,
            readAt: item.readAt || null,
            sender: item.sender || "工作室后台",
          }))
        : [],
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "读取用户详情失败。" }, 400);
  }
}
