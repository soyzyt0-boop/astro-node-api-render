import { getSession, json, publicUser } from "../_lib/auth.js";

export async function onRequestGet(context) {
  try {
    const auth = await getSession(context.request, context.env);
    return json({ ok: true, user: publicUser(auth?.user || null) });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "读取账户失败。" }, 400);
  }
}
