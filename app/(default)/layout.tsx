"use client";

import { AppContextProvider } from "@/contexts/AppContext";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <div className=" h-screen flex flex-col">
        <Header />
        <main className="flex flex-1">
          <div className="mx-auto w-full max-w-7xl overflow-hidden px-5 md:py-10 md:px-10 lg:px-20 lg:py-2">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </AppContextProvider>
  );
}
