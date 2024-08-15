import { CurrencyIconButton, FormattedFlipNumbers } from '@/biz-components';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface ProfitDisplayProps {
  profitPerHour: number;
  currency: number;
}

const ProfitDisplay: React.FC<ProfitDisplayProps> = ({ profitPerHour, currency }) => {
  return (
    <div className="relative flex h-[420px] w-full flex-col items-center justify-center bg-mine bg-cover bg-center bg-no-repeat">
      <section className="relative flex h-[240px] w-[240px] items-center justify-center">
        {/* 旋转的外层容器 */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="h-full w-full bg-CD bg-cover bg-center bg-no-repeat" />
        </div>
        {/* 不旋转的内层内容 */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <div>Profit per hour</div>
          <div className="flex items-center space-x-1 text-yellow">
            <Image src="/icons/wav-coin-active.svg" alt="coin" width={16} height={16} />
            <span>+{profitPerHour}</span>
          </div>
        </div>
      </section>
      <section className="absolute bottom-5">
        <div className="flex items-center space-x-1">
          <CurrencyIconButton size={24}></CurrencyIconButton>
          <FormattedFlipNumbers
            value={currency}
            height={26}
            width={16}
            color="black"
            perspective={800}
            formatFunction={formatNumberWithCommas}
          />
        </div>
      </section>
    </div>
  );
};

export default ProfitDisplay;
