import axios from 'axios';

const api = axios.create({
  baseURL: '',          // proxy handles /api → http://localhost:5000
  withCredentials: true,
  timeout: 30000,
});

// ── Request interceptor: attach stored tokens ──────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Prefer police token when present (officer-facing routes)
    const policeToken = localStorage.getItem('prajwalan_police_token');
    const citizenToken = localStorage.getItem('prajwalan_token');
    const token = policeToken ?? citizenToken ?? null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

// ── Response interceptor: auto-refresh on TOKEN_EXPIRED ───────────────────
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !original._retry
    ) {
      original._retry = true;
      try {
        const isPolice = !!localStorage.getItem('prajwalan_police_token');
        const refreshUrl = isPolice
          ? '/api/police/auth/refresh'
          : '/api/auth/refresh';

        const res = await axios.post(refreshUrl, {}, { withCredentials: true });
        const { accessToken } = res.data;

        const storageKey = isPolice ? 'prajwalan_police_token' : 'prajwalan_token';
        localStorage.setItem(storageKey, accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (_) {
        // Refresh failed — clear storage and redirect to the right login
        const isPolice = !!localStorage.getItem('prajwalan_police_token');
        localStorage.removeItem('prajwalan_police_token');
        localStorage.removeItem('prajwalan_police_user');
        localStorage.removeItem('prajwalan_token');
        localStorage.removeItem('prajwalan_user');
        window.location.href = isPolice ? '/officer/login' : '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
