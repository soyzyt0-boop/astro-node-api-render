import { clearSessionCookie, deleteSession, getSession, json } from "../../_lib/auth.js";

export async function onRequestPost(context) {
  try {
    const auth = await getSession(context.request, context.env);
    if (auth?.token) {
      await deleteSession(context.env, auth.token);
    }
    return json(
      { ok: true, loggedOut: true },
      200,
      { "Set-Cookie": clearSessionCookie() },
    );
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "退出失败。" }, 400);
  }
}
