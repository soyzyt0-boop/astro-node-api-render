import { json, requireStore, requireUser } from "../../_lib/auth.js";

function buildInboxKey(userId) {
  return `member:${userId}:messages`;
}

async function syncReadReceipts(store, userId, messages) {
  const readMap = new Map(
    (Array.isArray(messages) ? messages : [])
      .filter((item) => item?.id && item?.readAt)
      .map((item) => [String(item.id), Number(item.readAt)]),
  );
  if (!readMap.size) return;
  const list = await store.list({ prefix: "admin:" });
  const keys = Array.isArray(list?.keys) ? list.keys : [];
  await Promise.all(
    keys
      .filter((item) => String(item.name || "").endsWith(":sent-messages"))
      .map(async (item) => {
        const raw = await store.get(item.name);
        if (!raw) return;
        const log = JSON.parse(raw);
        if (!Array.isArray(log)) return;
        let changed = false;
        const next = log.map((entry) => {
          const readAt = readMap.get(String(entry.id || ""));
          if (!readAt || entry.readAt) return entry;
          changed = true;
          return {
            ...entry,
            readAt,
            readerUserId: userId,
          };
        });
        if (changed) {
          await store.put(item.name, JSON.stringify(next));
        }
      }),
  );
}

function sortMessages(messages = []) {
  return [...messages].sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
}

export async function onRequestGet(context) {
  try {
    const user = await requireUser(context);
    if (!user) return json({ ok: false, error: "请先登录。" }, 401);
    const store = requireStore(context.env);
    const raw = await store.get(buildInboxKey(user.id));
    const messages = raw ? JSON.parse(raw) : [];
    const ordered = sortMessages(Array.isArray(messages) ? messages : []);
    return json({
      ok: true,
      messages: ordered,
      unreadCount: ordered.filter((item) => !item.readAt).length,
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "读取站内消息失败。" }, 400);
  }
}

export async function onRequestPost(context) {
  try {
    const user = await requireUser(context);
    if (!user) return json({ ok: false, error: "请先登录。" }, 401);
    const payload = await context.request.json();
    const ids = Array.isArray(payload?.ids) ? payload.ids.map((item) => String(item || "").trim()).filter(Boolean) : [];
    if (!ids.length) {
      return json({ ok: false, error: "没有可更新的消息。" }, 400);
    }
    const store = requireStore(context.env);
    const raw = await store.get(buildInboxKey(user.id));
    const messages = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const next = sortMessages(Array.isArray(messages) ? messages : []).map((item) => (
      ids.includes(String(item.id || "")) && !item.readAt
        ? { ...item, readAt: now }
        : item
    ));
    await store.put(buildInboxKey(user.id), JSON.stringify(next));
    await syncReadReceipts(store, user.id, next);
    return json({
      ok: true,
      messages: next,
      unreadCount: next.filter((item) => !item.readAt).length,
    });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "更新消息失败。" }, 400);
  }
}
