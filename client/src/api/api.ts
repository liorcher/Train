import axios from 'axios';
import { AuthApi } from './services';
import { FailedQueueItem } from '@/models';
import { LOCAL_STORAGE_ITEMS } from '@/consts';
import { getItemFromLocalStorage, setItemInLocalStorage } from '@/utils';

const VITE_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Api = axios.create({
  baseURL: VITE_BASE_URL,
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];
const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCAL_STORAGE_ITEMS;

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || '');
    }
  });

  failedQueue = [];
};

// Add a request interceptor
Api.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage(config.useRefreshToken ? REFRESH_TOKEN : ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return Api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await AuthApi.refresh();
        const { accessToken, refreshToken: newRefreshToken } = tokens;

        setItemInLocalStorage(ACCESS_TOKEN, accessToken);
        setItemInLocalStorage(REFRESH_TOKEN, newRefreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
