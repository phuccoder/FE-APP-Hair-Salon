import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { catchError, from, map, Observable } from "rxjs";

const baseUrlAuthenticatedAxiosInstance = axios.create({
  baseURL: ApplicationConstants.BASE_URL,
});

let isRefreshing = false; // Track if token is being refreshed
let refreshSubscribers: ((token: string) => void)[] = []; // Queue requests while token is refreshing

async function refreshToken() {
  const refreshToken = await AsyncStorage.getItem(
    ApplicationConstants.REFRESH_TOKEN
  );
  if (!refreshToken) {
    throw new Error("Refresh token not available");
  }
  const response = await unsecuredAxiosInstance.post("/user/refresh", {
    refreshToken,
  });
  console.log("RUN RUN");
  const { accessToken } = response.data.data;
  await AsyncStorage.setItem(ApplicationConstants.ACCESS_TOKEN, accessToken);
  return accessToken;
}

function onRrefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

baseUrlAuthenticatedAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(ApplicationConstants.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseUrlAuthenticatedAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await AsyncStorage.removeItem(ApplicationConstants.ACCESS_TOKEN);
          const newAccessToken = await refreshToken();
          isRefreshing = false;
          onRrefreshed(newAccessToken); // Notify all queued requests
          return baseUrlAuthenticatedAxiosInstance(originalRequest); // Retry original request with new token
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Queue requests until the refresh token request completes
      return new Promise((resolve) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(baseUrlAuthenticatedAxiosInstance(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export function securedHttpClient<T>(
  config: AxiosRequestConfig
): Observable<T> {
  return from(baseUrlAuthenticatedAxiosInstance.request<T>(config)).pipe(
    map((response: AxiosResponse<T>) => response.data),
    catchError((error) => {
      throw error;
    })
  );
}

const unsecuredAxiosInstance = axios.create({
  baseURL: ApplicationConstants.BASE_URL,
});

export function httpClient<T>(config: AxiosRequestConfig): Observable<T> {
  return from(unsecuredAxiosInstance.request<T>(config)).pipe(
    map((response: AxiosResponse<T>) => response.data),
    catchError((error) => {
      throw error;
    })
  );
}
