import { buildSessionCookie, createSession, createUser, json, publicUser } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const user = await createUser(context.env, payload);
    const token = await createSession(context.env, user.id);
    return json(
      { ok: true, user: publicUser(user) },
      200,
      { "Set-Cookie": buildSessionCookie(token) },
    );
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "注册失败。" }, 400);
  }
}
