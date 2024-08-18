import { Tabbar } from '@/components';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'telegram miniapp',
  description: 'telegram miniapp',
};

export const runtime = 'edge';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full font-medium">
      {/* 加载 Telegram Web App SDK 脚本 */}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      <div className="h-full pb-20">{children}</div>
      <Tabbar />
    </div>
  );
}
