const SESSION_COOKIE = "zyt_studio_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const PASSWORD_ITERATIONS = 120000;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function parseCookieHeader(header = "") {
  return String(header || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, item) => {
      const index = item.indexOf("=");
      if (index <= 0) return acc;
      const key = item.slice(0, index).trim();
      const value = item.slice(index + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function normalizeEmail(value = "") {
  return String(value || "").trim().toLowerCase();
}

function normalizeText(value = "", max = 240) {
  return String(value || "").trim().slice(0, max);
}

function parseBoolean(value) {
  return value === true || value === "true" || value === "1" || value === 1;
}

function requireStore(env) {
  if (!env.MINGXIAN_STORE) {
    throw new Error("云端存储未配置。");
  }
  return env.MINGXIAN_STORE;
}

function toBase64(bytes) {
  let binary = "";
  bytes.forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return btoa(binary);
}

function fromBase64(input) {
  const binary = atob(input);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hashPassword(password, saltBase64) {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(String(password || "")),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: fromBase64(saltBase64),
      iterations: PASSWORD_ITERATIONS,
    },
    passwordKey,
    256,
  );
  return toBase64(new Uint8Array(bits));
}

async function createPasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltBase64 = toBase64(salt);
  const hash = await hashPassword(password, saltBase64);
  return {
    salt: saltBase64,
    hash,
    iterations: PASSWORD_ITERATIONS,
  };
}

function secureCompare(a = "", b = "") {
  const left = String(a || "");
  const right = String(b || "");
  if (left.length !== right.length) return false;
  let result = 0;
  for (let i = 0; i < left.length; i += 1) {
    result |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return result === 0;
}

async function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const candidate = await hashPassword(password, record.salt);
  return secureCompare(candidate, record.hash);
}

function buildSessionCookie(token, maxAge = SESSION_TTL_SECONDS) {
  return [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function clearSessionCookie() {
  return [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

async function getUserById(env, userId) {
  if (!userId) return null;
  const store = requireStore(env);
  const raw = await store.get(`auth:user:${userId}`);
  return raw ? JSON.parse(raw) : null;
}

async function getUserByEmail(env, email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;
  const store = requireStore(env);
  const userId = await store.get(`auth:email:${normalizedEmail}`);
  if (!userId) return null;
  return getUserById(env, userId);
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName || "",
    fullName: user.fullName || "",
    phone: user.phone || "",
    city: user.city || "",
    birthDate: user.birthDate || "",
    notes: user.notes || "",
    marketing: {
      onsiteOptIn: Boolean(user.marketing?.onsiteOptIn),
      jewelryOptIn: Boolean(user.marketing?.jewelryOptIn),
      customOptIn: Boolean(user.marketing?.customOptIn),
    },
    createdAt: user.createdAt || null,
    updatedAt: user.updatedAt || null,
  };
}

async function createUser(env, payload) {
  const email = normalizeEmail(payload?.email);
  const password = String(payload?.password || "");
  if (!email || !email.includes("@")) {
    throw new Error("邮箱格式不对。");
  }
  if (!/^\d{6}$/.test(password)) {
    throw new Error("密码必须是 6 位数字。");
  }
  const existing = await getUserByEmail(env, email);
  if (existing) {
    throw new Error("这个邮箱已经注册过。");
  }

  const now = Date.now();
  const user = {
    id: crypto.randomUUID(),
    email,
    displayName: normalizeText(payload?.displayName, 60),
    fullName: normalizeText(payload?.fullName, 80),
    phone: normalizeText(payload?.phone, 40),
    city: normalizeText(payload?.city, 120),
    birthDate: normalizeText(payload?.birthDate, 20),
    notes: normalizeText(payload?.notes, 500),
    marketing: {
      onsiteOptIn: parseBoolean(payload?.marketing?.onsiteOptIn),
      jewelryOptIn: parseBoolean(payload?.marketing?.jewelryOptIn),
      customOptIn: parseBoolean(payload?.marketing?.customOptIn),
    },
    password: await createPasswordRecord(password),
    createdAt: now,
    updatedAt: now,
  };

  const store = requireStore(env);
  await store.put(`auth:user:${user.id}`, JSON.stringify(user));
  await store.put(`auth:email:${user.email}`, user.id);
  return user;
}

async function createSession(env, userId) {
  const store = requireStore(env);
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  await store.put(
    `auth:session:${token}`,
    JSON.stringify({ userId, expiresAt }),
    { expirationTtl: SESSION_TTL_SECONDS },
  );
  return token;
}

async function deleteSession(env, token) {
  if (!token) return;
  const store = requireStore(env);
  await store.delete(`auth:session:${token}`);
}

async function getSession(request, env) {
  const cookies = parseCookieHeader(request.headers.get("Cookie"));
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  const store = requireStore(env);
  const raw = await store.get(`auth:session:${token}`);
  if (!raw) return null;
  const session = JSON.parse(raw);
  if (!session?.userId || Number(session.expiresAt || 0) < Date.now()) {
    await store.delete(`auth:session:${token}`);
    return null;
  }
  const user = await getUserById(env, session.userId);
  if (!user) {
    await store.delete(`auth:session:${token}`);
    return null;
  }
  return {
    token,
    user,
    session,
  };
}

async function requireUser(context) {
  const auth = await getSession(context.request, context.env);
  if (!auth?.user) {
    return null;
  }
  return auth.user;
}

async function updateUser(env, userId, updates) {
  const existing = await getUserById(env, userId);
  if (!existing) {
    throw new Error("用户不存在。");
  }
  const next = {
    ...existing,
    displayName: normalizeText(updates?.displayName ?? existing.displayName, 60),
    fullName: normalizeText(updates?.fullName ?? existing.fullName, 80),
    phone: normalizeText(updates?.phone ?? existing.phone, 40),
    city: normalizeText(updates?.city ?? existing.city, 120),
    birthDate: normalizeText(updates?.birthDate ?? existing.birthDate, 20),
    notes: normalizeText(updates?.notes ?? existing.notes, 500),
    marketing: {
      onsiteOptIn: parseBoolean(updates?.marketing?.onsiteOptIn ?? existing.marketing?.onsiteOptIn),
      jewelryOptIn: parseBoolean(updates?.marketing?.jewelryOptIn ?? existing.marketing?.jewelryOptIn),
      customOptIn: parseBoolean(updates?.marketing?.customOptIn ?? existing.marketing?.customOptIn),
    },
    updatedAt: Date.now(),
  };
  const store = requireStore(env);
  await store.put(`auth:user:${userId}`, JSON.stringify(next));
  return next;
}

export {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  buildSessionCookie,
  clearSessionCookie,
  createSession,
  createUser,
  deleteSession,
  getSession,
  getUserByEmail,
  json,
  normalizeEmail,
  publicUser,
  requireStore,
  requireUser,
  updateUser,
  verifyPassword,
};
