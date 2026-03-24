const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

const TOKEN_KEY = "lawbridge_access_token";

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest(path, { method = "GET", token = null, headers = {}, body = null, isJson = true } = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;
  const authToken = token ?? getAccessToken();

  const finalHeaders = {
    ...headers,
  };

  if (authToken) {
    finalHeaders.Authorization = `Bearer ${authToken}`;
  }

  let finalBody = body;
  if (body !== null) {
    if (isJson) {
      finalHeaders["Content-Type"] = finalHeaders["Content-Type"] || "application/json";
      finalBody = JSON.stringify(body);
    } else {
      // For FormData or other non-JSON bodies: don't force Content-Type
      // so the browser can set the correct boundary.
      if (finalHeaders["Content-Type"]) delete finalHeaders["Content-Type"];
    }
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: finalBody,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message = (data && data.detail) || (typeof data === "string" ? data : null) || res.statusText || "Request failed";
    throw new Error(message);
  }

  return data;
}

