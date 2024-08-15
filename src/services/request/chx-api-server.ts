// import { LOCAL_STORAGE_TOKEN, ROUTES_LOGIN } from '@/constants';
import { Service } from '@nxglabs-request/core';
import { AxiosRequest } from '@nxglabs-request/request';
import { authInterceptorRequest } from './auth-interceptor';
// import store from 'store2';

const timeout = 1000 * 600;

const http = new AxiosRequest({ timeout });
http.interceptors.request.use(authInterceptorRequest);

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
  baseUrl: process.env.NEXT_PUBLIC_API_TG_URL || '',
  http: http,
});

export default apiService;
