import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ApplicationConstants} from "@/constants/ApplicationConstants";
import {catchError, from, map, Observable} from "rxjs";

const baseUrlAuthenticatedAxiosInstance = axios.create({
    baseURL: ApplicationConstants.BASE_URL
});

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

export function securedHttpClient<T>(config: AxiosRequestConfig): Observable<T> {
    return from(baseUrlAuthenticatedAxiosInstance.request<T>(config)).pipe(
        map((response: AxiosResponse<T>) => response.data),
        catchError((error) => {
            throw error;
        })
    );
}

const unsecuredAxiosInstance = axios.create({
    baseURL: ApplicationConstants.BASE_URL
});


export function httpClient<T>(config: AxiosRequestConfig): Observable<T> {
    return from(unsecuredAxiosInstance.request<T>(config)).pipe(
        map((response: AxiosResponse<T>) => response.data),
        catchError((error) => {
            throw error;
        })
    );
}