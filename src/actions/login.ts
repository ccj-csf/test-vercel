'use server';

import { COOKIES_TOKEN } from '@/constants';
import { tgUserLoginApi } from '@/services';
import { IWebAppInitData } from '@/types';
import { cookies } from 'next/headers';

export async function loginAction(params: IWebAppInitData) {
  const isDev = process.env.NODE_ENV === 'development';

  const res = await tgUserLoginApi(params);
  if (res?.data?.access_token) {
    cookies().set(COOKIES_TOKEN, res.data.access_token, {
      httpOnly: true,
      secure: !isDev,
      // sameSite: 'strict',
    });
  }
  return res;
}
