const BASE_URL = "https://uat-api.ftlgym.com/api/v1";

async function request(path, options = {}) {
  const url = `${BASE_URL}/${path}`.replace(/([^:]?)\/\//g, "$1/");
  const opts = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  const res = await fetch(url, opts);
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    // ignore non-json responses
  }

  if (!res.ok) {
    const message =
      (body && (body.message || body.error)) ||
      `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.body = body;
    throw error;
  }

  return body;
}

export async function post(path, payload = {}, options = {}) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(payload),
    ...options,
  });
}

export async function get(path, options = {}) {
  return request(path, { method: "GET", ...options });
}

export default { BASE_URL, request, post, get };
