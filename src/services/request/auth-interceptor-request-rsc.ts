'use server';
import { API_CHARACTER_PROFILE, API_TG_USER_LOGIN, COOKIES_TOKEN, DEVICE_TYPE } from '@/constants';
import { cookies } from 'next/headers';

const whiteList = [API_TG_USER_LOGIN, API_CHARACTER_PROFILE];

export async function authInterceptorRequestRSC(config: any) {
  const { headers } = config;

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    headers.Origin = process.env.NEXT_PUBLIC_BASE_URL;
    headers.Referer = process.env.NEXT_PUBLIC_BASE_URL;
  }

  // 服务端环境
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES_TOKEN);

  if (token?.value && !whiteList.some((item) => config.url.includes(item))) {
    headers.Authorization = `Bearer ${token?.value}`;
  }

  headers['device-type'] = DEVICE_TYPE;
  return config;
}
