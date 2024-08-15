'use client';

import { CurrencyIconButton, FormattedFlipNumbers } from '@/biz-components';
import { useUserInfoStore } from '@/store';
import { formatNumberWithCommas } from '@/utils';
import React from 'react';
const CoinBalance: React.FC = () => {
  const { coinBalance } = useUserInfoStore();
  const formattedBalance = formatNumberWithCommas(coinBalance);
  return (
    <div className="mt-5 flex items-center justify-center">
      <CurrencyIconButton size={28}></CurrencyIconButton>
      <FormattedFlipNumbers
        value={coinBalance}
        height={38}
        width={26}
        color="black"
        perspective={800}
        formatFunction={formatNumberWithCommas}
      />
    </div>
  );
};

export default CoinBalance;
