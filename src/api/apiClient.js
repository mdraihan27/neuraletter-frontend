import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

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

function isProtectedEndpoint(url) {
  if (!url) return false;
  const urlWithoutQuery = String(url).split('?')[0];

  // Axios config.url is usually a path (e.g. "/topic/user"), but can be a full URL.
  let path = urlWithoutQuery;
  try {
    path = new URL(urlWithoutQuery, 'http://local').pathname;
  } catch {
    // keep best-effort path
  }

  return PROTECTED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function maybeRedirectUnverified({ status, data, url }) {
  if (status !== 403) return false;
  if (!isProtectedEndpoint(url)) return false;

  const redirect = data?.detail?.redirect_url;
  if (!redirect) return false;
  if (!isBrowser()) return false;

  window.location.assign(redirect);
  return true;
}

apiClient.interceptors.response.use(
  (response) => {
    if (
      maybeRedirectUnverified({
        status: response?.status,
        data: response?.data,
        url: response?.config?.url,
      })
    ) {
      return new Promise(() => {});
    }

    return response;
  },
  (error) => {
    if (
      maybeRedirectUnverified({
        status: error?.response?.status,
        data: error?.response?.data,
        url: error?.config?.url,
      })
    ) {
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default apiClient;