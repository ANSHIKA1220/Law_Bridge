import { apiRequest, clearAccessToken, getAccessToken, setAccessToken } from "../api/client.js";

const USER_KEY = "lawbridge_user";
const TOKEN_KEY_FALLBACK = "lawbridge_access_token";

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function decodeJwt(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getToken() {
  return getAccessToken() || localStorage.getItem(TOKEN_KEY_FALLBACK);
}

export async function signIn(payload) {
  const email = payload.email;
  const password = payload.password;
  if (!email || !password) throw new Error("Missing email or password");

  // Backend token response only; we decode role from the JWT payload.
  const tokenRes = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  const token = tokenRes.access_token;
  setAccessToken(token);

  const jwtPayload = decodeJwt(token) || {};
  const user = {
    id: jwtPayload.sub ? Number(jwtPayload.sub) : Date.now(),
    email,
    role: jwtPayload.role || payload.role || "Citizen",
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function signUp(payload) {
  const name = payload.name || payload.fullName || "User";
  const email = payload.email;
  const password = payload.password;
  const role = payload.role || "Citizen";

  if (!email || !password) throw new Error("Missing email or password");

  await apiRequest("/auth/signup", {
    method: "POST",
    body: { name, email, password, role },
  });

  // Login immediately so the app can start making authenticated calls.
  return signIn({ email, password, role });
}

export function signOut() {
  localStorage.removeItem(USER_KEY);
  clearAccessToken();
}
