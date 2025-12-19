import axios from 'axios';
import { logError, mapAxiosErrorToAppError } from '@/core/common/errors';
import zustandStorage from '@/core/common/state';
import { IAuthLoginResponse } from '@/features/authentication/interfaces';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

const tokenStore = (() => {
  let tokens: IAuthLoginResponse | null = zustandStorage.getToken();

  return {
    getAccessToken: () => tokens?.access_token,
    getRefreshToken: () => tokens?.refresh_token,
    setTokens: (t: IAuthLoginResponse) => {
      // persist and update in-memory tokens
      zustandStorage.setToken(t);
      tokens = t;
    },
    clearTokens: () => {
      zustandStorage.removeToken();
      tokens = null;
    },
    emitLogout: () => {
      // clear tokens and trigger any logout side-effects
      zustandStorage.removeToken();
      tokens = null;
    },
  };
})();

// Minimal axios instance — baseURL can be set via environment or elsewhere
const api = axios.create({ baseURL: BASE_URL });
// Plain axios instance without interceptors for auth refresh calls (breaks require cycle)
const plainAxios = axios.create({ baseURL: BASE_URL });

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | PromiseLike<string>) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token as string);
  });
  failedQueue = [];
};

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401: try refresh, retry original request, otherwise logout
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      const refreshToken = tokenStore.getRefreshToken();
      if (!refreshToken) {
        tokenStore.clearTokens();
        tokenStore.emitLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers ?? {};
            if (token) originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use plain axios (no interceptors) to avoid re-entering the same interceptor
        const { data: resp } = await plainAxios.post('/auth/refresh', {
          refresh_token: refreshToken,
        });
        // Expecting resp to contain access_token and optionally refresh_token
        const newAccess = (resp as any).access_token ?? (resp as any).accessToken;
        const newRefresh = (resp as any).refresh_token ?? (resp as any).refreshToken;

        if (!newAccess) throw new Error('No access token returned on refresh');

        tokenStore.setTokens({ access_token: newAccess, refresh_token: newRefresh });
        processQueue(null, newAccess);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, undefined);
        tokenStore.clearTokens();
        tokenStore.emitLogout();

        const appErr = mapAxiosErrorToAppError(refreshError);
        logError(appErr);
        return Promise.reject(appErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

const customAxios = api;

export { customAxios, tokenStore };
