'use server';
import { COOKIES_RELOGIN, ROUTES_LOGIN } from '@/constants';
import { redirect } from 'next/navigation';

export async function authInterceptorResponseRSC(response: any) {
  if (response.data?.code === 401) {
    // 操作不了 cookies
    // cookies().delete(COOKIES_TOKEN);

    const searchParams = new URLSearchParams();
    searchParams.set(COOKIES_RELOGIN, '1');
    redirect(`${ROUTES_LOGIN}?${searchParams.toString()}`);
  }
  return response;
}
