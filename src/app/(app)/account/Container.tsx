'use client';

import { CurrencyIconButton } from '@/biz-components';
import { useTonAddress } from '@tonconnect/ui-react';
import TonWalletStatus from './components/TonWalletStatus';

const Container = () => {
  const address = useTonAddress();

  return (
    <div className="flex flex-col items-center justify-center  px-4">
      <section className="mt-[60px]">
        <CurrencyIconButton size={64} />
      </section>
      <h2 className="mt-6 text-32">Airdrop Tasks</h2>
      <p className="mt-4 px-[30px] text-center text-15 font-light">
        Listing is on its way. Tasks will appear below. Complete them to participate in the airdrop.
      </p>
      <section className="mt-12 w-full">
        <TonWalletStatus isConnected={!!address} walletAddress={address} />
      </section>
    </div>
  );
};

export default Container;
