import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WAV Music Generator",
  description:
    "Harness the power of WAV.ai's music generation AI by leveraging its API to create captivating melodies.",
  keywords: "WAV, WAV AI, Music Generator, WAV Music Generator",
  creator: "zoyun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="custom-gradient animate-gradient-x">
        <body className={inter.className}>
          <Toaster position="top-center" richColors />

          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
