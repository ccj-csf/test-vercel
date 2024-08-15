import { Metadata } from 'next';
import './index.css';

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
    <main className="explore-main" id="infinite-scroll-container">
      {children}
    </main>
  );
}
