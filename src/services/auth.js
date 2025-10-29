import api from "./api";

export async function login(email, password) {
  const body = await api.post("test/login", { email, password });
  const normalized = {
    raw: body,
    token:
      (body &&
        (body.token || body.access_token || (body.data && body.data.token))) ||
      null,
    user: (body && body.data && body.data.user) || (body && body.data) || null,
  };
  if (!normalized.user) {
    normalized.user = {
      email,
      name: (body && (body.name || (body.data && body.data.name))) || "Yosi",
    };
  }

  return normalized;
}

export default { login };
