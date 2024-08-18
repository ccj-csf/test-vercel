import { Service } from '@nxglabs-request/core';
import { AxiosRequest } from '@nxglabs-request/request';
import { authInterceptorRequestCC } from './auth-interceptor-request-cc';
import { authInterceptorRequestRSC } from './auth-interceptor-request-rsc';
import { authInterceptorResponseRSC } from './auth-interceptor-response-rsc';
// import { reportInterceptors } from './report-interceptors';

const timeout = 1000 * 600;

const http = new AxiosRequest({ timeout });

if (typeof window === 'undefined') {
  http.interceptors.request.use(authInterceptorRequestRSC);
  http.interceptors.response.use(authInterceptorResponseRSC);
} else {
  http.interceptors.request.use(authInterceptorRequestCC);
}

// http.interceptors.response.use(reportInterceptors);

const apiService = new Service({
  baseUrl: process.env.NEXT_PUBLIC_API_TG_URL || '',
  http: http,
});

export default apiService;
