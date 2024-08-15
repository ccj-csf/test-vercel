// import { LOCAL_STORAGE_TOKEN, ROUTES_LOGIN } from '@/constants';
import { Service } from '@nxglabs-request/core';
import { AxiosRequest } from '@nxglabs-request/request';
// import store from 'store2';

const timeout = 1000 * 600;

const http = new AxiosRequest({ timeout });

http.interceptors.request.use(
  (config: any) => {
    // const token = store(LOCAL_STORAGE_TOKEN);
    // if (headers && token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    // if (response.data?.code === 401) {
    //   store.remove(LOCAL_STORAGE_TOKEN);
    //   window.location.href = ROUTES_LOGIN;
    // }
    return response;
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error);
  },
);

const apiService = new Service({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  http: http,
});

export default apiService;
