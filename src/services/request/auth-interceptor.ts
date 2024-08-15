import {
  API_CHARACTER_PROFILE,
  API_TG_USER_LOGIN,
  COOKIES_TOKEN,
  DEVICE_TYPE,
  LOCAL_STORAGE_TOKEN,
} from '@/constants';
import store from 'store2';

const whiteList = [API_TG_USER_LOGIN, API_CHARACTER_PROFILE];

export async function authInterceptorRequest(config: any) {
  const { headers } = config;

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    headers.Origin = process.env.NEXT_PUBLIC_BASE_URL;
    headers.Referer = process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (typeof window === 'undefined') {
    // 服务端环境‘
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIES_TOKEN);

    if (token?.value && !whiteList.some((item) => config.url.includes(item))) {
      headers.Authorization = `Bearer ${token?.value}`;
    }
  } else {
    // 客户端环境
    const token = store(LOCAL_STORAGE_TOKEN);
    if (headers && token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  headers['device-type'] = DEVICE_TYPE;
  return config;
}
