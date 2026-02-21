const PROTECTED_PATH_PREFIXES = [
  '/topic',
  '/update',
  '/ai',
  '/topic/chat',
  '/api/v1/topic',
  '/api/v1/update',
  '/api/v1/ai',
  '/api/v1/topic/chat',
];

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.location?.assign === 'function';
}

function isProtectedEndpoint(path) {
  if (!path) return false;
  const pathWithoutQuery = String(path).split('?')[0];
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathWithoutQuery.startsWith(prefix));
}

/**
 * Fetch JSON from the backend using NEXT_PUBLIC_API_BASE_URL.
 *
 * Unverified-user handling (protected endpoints only):
 * - If (!res.ok), parses JSON and checks data.detail.redirect_url
 * - If present, performs window.location.assign(redirect) and stops processing.
 */
export async function fetchApiJson(path, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, options);

  if (!res.ok) {
    let data;
    try {
      data = await res.json();
    } catch {
      data = undefined;
    }

    const redirect = data?.detail?.redirect_url;
    if (redirect && isProtectedEndpoint(path) && isBrowser()) {
      window.location.assign(redirect);
      return new Promise(() => {});
    }

    const message =
      data?.message ||
      data?.detail?.message ||
      data?.detail ||
      res.statusText ||
      `Request failed (${res.status})`;

    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return res.json();
}
