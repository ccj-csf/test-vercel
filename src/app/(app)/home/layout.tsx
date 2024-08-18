import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'wav',
  description: 'wav',
};

export const runtime = 'edge';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/* 加载 Telegram Web App SDK 脚本 */}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {children}
    </main>
  );
}
