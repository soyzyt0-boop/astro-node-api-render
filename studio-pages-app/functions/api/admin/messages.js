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

function buildAdminLogKey(adminUserId) {
  return `admin:${adminUserId}:sent-messages`;
}

function isAdmin(user) {
  const email = String(user?.email || "").trim().toLowerCase();
  const defaults = new Set([
    "yutong@zhaoyutong.studio",
    "soyzyt0@gmail.com",
  ]);
  return defaults.has(email);
}

async function requireAdmin(context) {
  const auth = await getSession(context.request, context.env);
  if (!auth?.user) {
    return { error: json({ ok: false, error: "请先登录。" }, 401) };
  }
  if (!isAdmin(auth.user)) {
    return { error: json({ ok: false, error: "只有后台账号可以发站内消息。" }, 403) };
  }
  return { auth };
}

async function findUsersByQuery(store, query) {
  const normalized = String(query || "").trim().toLowerCase();
  if (!normalized) return [];
  const listRaw = await store.list({ prefix: "auth:user:" });
  const keys = Array.isArray(listRaw?.keys) ? listRaw.keys : [];
  const users = await Promise.all(
    keys.slice(0, 300).map(async (item) => {
      const raw = await store.get(item.name);
      return raw ? JSON.parse(raw) : null;
    }),
  );
  return users
    .filter(Boolean)
    .filter((user) => {
      const haystack = [
        String(user.email || "").toLowerCase(),
        String(user.displayName || "").toLowerCase(),
        String(user.fullName || "").toLowerCase(),
      ].join(" ");
      return haystack.includes(normalized);
    })
    .slice(0, 20)
    .map((user) => ({
      id: user.id,
      email: user.email,
      displayName: user.displayName || "",
      fullName: user.fullName || "",
    }));
}

async function readAdminLog(store, adminUserId) {
  const raw = await store.get(buildAdminLogKey(adminUserId));
  return raw ? JSON.parse(raw) : [];
}

async function writeAdminLog(store, adminUserId, items) {
  await store.put(buildAdminLogKey(adminUserId), JSON.stringify(items.slice(0, 120)));
}

export async function onRequestGet(context) {
  try {
    const result = await requireAdmin(context);
    if (result.error) return result.error;
    const { auth } = result;
    const store = requireStore(context.env);
    const url = new URL(context.request.url);
    const query = String(url.searchParams.get("q") || "").trim();
    const users = query ? await findUsersByQuery(store, query) : [];
    const log = await readAdminLog(store, auth.user.id);
    return json({
      ok: true,
      users,
      recent: Array.isArray(log) ? log : [],
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "读取后台消息数据失败。" }, 400);
  }
}

export async function onRequestPost(context) {
  try {
    const result = await requireAdmin(context);
    if (result.error) return result.error;
    const { auth } = result;

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
    const currentLog = await readAdminLog(store, auth.user.id);
    const nextLog = [{
      id: message.id,
      email: targetUser.email,
      displayName: targetUser.displayName || "",
      title: message.title,
      createdAt: message.createdAt,
      readAt: null,
    }, ...(Array.isArray(currentLog) ? currentLog : [])];
    await writeAdminLog(store, auth.user.id, nextLog);
    return json({ ok: true, message, recent: nextLog.slice(0, 20) });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "发送站内消息失败。" }, 400);
  }
}
