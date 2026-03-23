const KEY = "lawbridge_user";

export function getUser() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function signIn(payload) {
  const user = { id: Date.now(), ...payload };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function signUp(payload) {
  const user = { id: Date.now(), ...payload };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function signOut() {
  localStorage.removeItem(KEY);
}
