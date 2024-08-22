import '@/app/flexiable.css';
import '@/app/globals.css';
import {
  CoinNotification,
  HeartbeatMonitor,
  TelegramWebappProvider,
  TonconnectProvider,
} from '@/biz-components';
import { LoadingProvider } from '@/components';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { Toaster } from 'sonner';

import { dir } from '@/utils';

import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Script from 'next/script';
import { clashGrotesk } from './fonts';

export const metadata: Metadata = {
  title: 'wav',
  description: 'wav',
};

export const runtime = 'edge';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        {/* iconfont 链接 */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_ICONFONT_URL} />
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={clashGrotesk.className}>
        <LoadingProvider>
          <NextIntlClientProvider messages={messages}>
            <HeartbeatMonitor />
            <CoinNotification />
            <TonconnectProvider>
              <TelegramWebappProvider>{children}</TelegramWebappProvider>
            </TonconnectProvider>
          </NextIntlClientProvider>
        </LoadingProvider>
        <Toaster
          toastOptions={{
            unstyled: true,
            style: {
              marginTop: '10px',
            },
            classNames: {
              toast:
                'bg-white  rounded-8 px-4 py-2 flex  items-center space-x-1 !w-fit !max-w-[330px] mx-auto -translate-x-[14px]  shadow-md',
              success: 'text-gray-400',
              error: 'text-red-500',
            },
          }}
          position="top-center"
          theme="dark"
          icons={{
            success: <CircleCheck className=" text-green-500" size={18} />,
            error: <CircleAlert className="text-red-500" size={18} />,
          }}
        />
      </body>
    </html>
  );
}
