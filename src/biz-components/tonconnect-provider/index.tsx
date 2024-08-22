'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';
const Json = {
  url: 'https://localhost:3000',
  name: 'Wav Dev',
  iconUrl: 'https://wav-miniapp.pages.dev/favicon.ico',
};
export function TonconnectProvider({ children }: { children: ReactNode }) {
  return (
    <TonConnectUIProvider
      actionsConfiguration={{
        twaReturnUrl: process.env.NEXT_PUBLIC_TG_MINIAPP_URL as `${string}://${string}`,
      }}
      manifestUrl={process.env.NEXT_PUBLIC_TG_MINIAPP_TONCONNECT_MANIFEST_URL}
    >
      {children}
    </TonConnectUIProvider>
  );
}
