import { Tabbar } from '@/components';
import { Metadata } from 'next';

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
      <div className="h-full pb-20">{children}</div>
      <Tabbar />
    </div>
  );
}
