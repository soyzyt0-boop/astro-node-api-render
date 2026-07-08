import { json, publicUser, requireUser, updateUser } from "../../_lib/auth.js";

export async function onRequestGet(context) {
  const user = await requireUser(context);
  if (!user) return json({ ok: false, error: "请先登录。" }, 401);
  return json({ ok: true, profile: publicUser(user) });
}

export async function onRequestPost(context) {
  try {
    const user = await requireUser(context);
    if (!user) return json({ ok: false, error: "请先登录。" }, 401);
    const payload = await context.request.json();
    const next = await updateUser(context.env, user.id, payload);
    return json({ ok: true, profile: publicUser(next) });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "保存资料失败。" }, 400);
  }
}
