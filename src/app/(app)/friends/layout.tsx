import { Metadata } from 'next';

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
  return <main>{children}</main>;
}
