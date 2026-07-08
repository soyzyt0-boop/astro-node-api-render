import { getSession, json, requireStore } from "../../_lib/auth.js";

function normalizeText(value = "", max = 5000) {
  return String(value || "").trim().slice(0, max);
}

function buildInboxKey(userId) {
  return `member:${userId}:messages`;
}

function buildUserKey(userId) {
  return `auth:user:${userId}`;
}

function isAdmin(user) {
  const email = String(user?.email || "").trim().toLowerCase();
  const defaults = new Set([
    "yutong@zhaoyutong.studio",
    "soyzyt0@gmail.com",
  ]);
  return defaults.has(email);
}

export async function onRequestPost(context) {
  try {
    const auth = await getSession(context.request, context.env);
    if (!auth?.user) return json({ ok: false, error: "请先登录。" }, 401);
    if (!isAdmin(auth.user)) return json({ ok: false, error: "只有后台账号可以发站内消息。" }, 403);

    const payload = await context.request.json();
    const targetEmail = String(payload?.email || "").trim().toLowerCase();
    const title = normalizeText(payload?.title, 120);
    const body = normalizeText(payload?.body, 3000);
    if (!targetEmail || !title || !body) {
      return json({ ok: false, error: "目标邮箱、标题、正文都要填。" }, 400);
    }

    const store = requireStore(context.env);
    const userId = await store.get(`auth:email:${targetEmail}`);
    if (!userId) return json({ ok: false, error: "没有找到这个用户。" }, 404);
    const rawUser = await store.get(buildUserKey(userId));
    const targetUser = rawUser ? JSON.parse(rawUser) : null;
    if (!targetUser?.id) return json({ ok: false, error: "目标用户资料缺失。" }, 404);

    const rawInbox = await store.get(buildInboxKey(targetUser.id));
    const inbox = rawInbox ? JSON.parse(rawInbox) : [];
    const message = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: Date.now(),
      readAt: null,
      sender: auth.user.displayName || auth.user.email || "工作室后台",
    };
    const nextInbox = [message, ...(Array.isArray(inbox) ? inbox : [])].slice(0, 200);
    await store.put(buildInboxKey(targetUser.id), JSON.stringify(nextInbox));
    return json({ ok: true, message });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "发送站内消息失败。" }, 400);
  }
}
