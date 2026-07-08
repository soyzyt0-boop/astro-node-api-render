import { buildSessionCookie, createSession, getUserByEmail, json, publicUser, verifyPassword } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const email = String(payload?.email || "");
    const password = String(payload?.password || "");
    const user = await getUserByEmail(context.env, email);
    if (!user || !(await verifyPassword(password, user.password))) {
      return json({ ok: false, error: "邮箱或密码不对。" }, 401);
    }
    const token = await createSession(context.env, user.id);
    return json(
      { ok: true, user: publicUser(user) },
      200,
      { "Set-Cookie": buildSessionCookie(token) },
    );
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "登录失败。" }, 400);
  }
}
