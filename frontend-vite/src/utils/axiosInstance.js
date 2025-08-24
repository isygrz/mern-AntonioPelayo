import axios from 'axios';

/**
 * axiosInstance
 * - baseURL from VITE_API_BASE (e.g., http://localhost:5000/api)
 * - withCredentials for cookie-based auth
 * - Strips a leading '/api' from per-call URLs to prevent '/api/api/...'
 * - Safely collapses accidental double slashes (does NOT break 'http://')
 * - Adds X-Requested-With to help some preflights/proxies
 * - Emits 'api:unauthorized' event on 401 without hard redirect
 */
const baseURL = import.meta.env.VITE_API_BASE || '/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

// Collapse '//' (but keep 'http://' or 'https://')
function collapseSlashes(path) {
  if (typeof path !== 'string') return path;
  return path.replace(/([^:])\/{2,}/g, '$1/');
}

axiosInstance.interceptors.request.use((config) => {
  if (typeof config.url === 'string') {
    // Prevent '/api' duplication when callers pass '/api/foo'
    if (config.url.startsWith('/api/')) {
      config.url = config.url.replace(/^\/api\//, '/');
    }
    config.url = collapseSlashes(config.url);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('api:unauthorized'));
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
