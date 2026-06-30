import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true, //ativação explicita
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Axios 1.6+ parou de injetar automaticamente o header X-XSRF-TOKEN lido dos cookies, exigindo uma ativação explícita por parte do desenvolvedor.

function hasCsrfCookie() {
  return document.cookie
  .split(';')
  .some(c => c.trim().startsWith('XSRF-TOKEN='));
}


export async function initCsrf() {
  if(!hasCsrfCookie()) {
  await api.get('/sanctum/csrf-cookie');
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 419 && !error.config._csrfRetried) {
      error.config._csrfRetried = true;
      await api.get('/sanctum/csrf-cookie');
      return api(error.config);
    }

    if (status === 401 && !error.config.url.includes('/api/user')) {
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }

    return Promise.reject(error);
  }
);
 
export default api;
 