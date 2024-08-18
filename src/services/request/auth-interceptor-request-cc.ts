import { DEVICE_TYPE, LOCAL_STORAGE_TOKEN } from '@/constants';
import store from 'store2';

export async function authInterceptorRequestCC(config: any) {
  const { headers } = config;

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    headers.Origin = process.env.NEXT_PUBLIC_BASE_URL;
    headers.Referer = process.env.NEXT_PUBLIC_BASE_URL;
  }

  const token = store(LOCAL_STORAGE_TOKEN);
  if (headers && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  headers['device-type'] = DEVICE_TYPE;
  return config;
}
