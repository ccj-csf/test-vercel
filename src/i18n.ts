import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { COOKIES_LOCALE, DEFAULT_LOCALE } from './constants';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = cookieStore.get(COOKIES_LOCALE)?.value || DEFAULT_LOCALE;
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
