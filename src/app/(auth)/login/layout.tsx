import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'CharacterX',
  description: 'CharacterX',
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-full w-full pb-0">{children}</main>;
}
