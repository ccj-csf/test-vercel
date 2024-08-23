'use client';
import { CurrencyIconButton } from '@/biz-components';
import { formatNumberWithCommas } from '@/utils';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import RewardTitle from './RewardTitle';

interface DailyRewardSectionProps {
  claimed: boolean;
  onClick: () => void; // Rename to match intention
  totalSignRewards: number;
}

const DailyRewardSection: React.FC<DailyRewardSectionProps> = ({
  claimed,
  onClick,
  totalSignRewards = 0,
}) => {
  return (
    <div className="mt-6">
      <RewardTitle title="Daily Rewards"></RewardTitle>
      <div className="mt-3 cursor-pointer rounded-8 bg-white px-3 py-[14px]" onClick={onClick}>
        <div className="flex space-x-2">
          <div className="h-[50px] w-[50px] rounded-8 bg-gray-100 p-1">
            <Image src="/icons/calendar.svg" width={45} height={45} alt="daily-reward" />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-15 text-gray-600">Daily reward</p>
              <span className="flex items-center space-x-1">
                <CurrencyIconButton size={15} />
                <span className="">+{formatNumberWithCommas(totalSignRewards)}</span>
              </span>
            </div>
            {claimed ? (
              <Image src="/icons/complete.svg" width={20} height={20} alt="complete" />
            ) : (
              <ChevronRight className="text-gray-300" size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewardSection;
