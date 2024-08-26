'use client';

import { CurrencyIconButton, FormattedFlipNumbers } from '@/biz-components';
import { formatNumberWithCommas } from '@/utils';
import React from 'react';

interface CoinBalanceProps {
  displayedTotalPoints: number;
}

const CoinBalance: React.FC<CoinBalanceProps> = ({ displayedTotalPoints }) => {
  return (
    <div className="mt-5 flex items-center justify-center">
      <CurrencyIconButton size={28}></CurrencyIconButton>
      <FormattedFlipNumbers
        value={displayedTotalPoints}
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
