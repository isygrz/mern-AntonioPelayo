// Do NOT emit offline/online events here. Let feature hooks (e.g., useFooter)
// decide when to show banners based on their own snapshot logic.

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
