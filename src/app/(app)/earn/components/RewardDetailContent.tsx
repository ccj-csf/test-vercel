'use client';

import { CurrencyIconButton } from '@/biz-components';
import { Button } from '@/components';
import { IDailySignData } from '@/types';
import { formatNumberWithUnits } from '@/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

dayjs.extend(utc);

interface RewardDetailContentProps {
  dailySigns: IDailySignData[];
  onClaim?: () => void;
  onClose?: () => void;
  loading?: boolean;
}

const RewardDetailContent: React.FC<RewardDetailContentProps> = ({
  dailySigns = [], // 默认数据
  onClaim = () => {}, // 默认处理函数
  onClose = () => {}, // 默认处理函数
  loading,
}) => {
  const [canClaim, setCanClaim] = useState(false);
  const [todayReward, setTodayReward] = useState(0); // 初始化todayReward

  useEffect(() => {
    const currentUTCDate = dayjs().utc();
    console.log('🚀 ~ useEffect ~ currentUTCDate:', currentUTCDate.format('YYYY-MM-DD HH:mm:ss'));

    const todaySign = dailySigns.find((sign) => {
      const signDate = dayjs.utc(sign.timeStamp);
      return signDate.isSame(currentUTCDate, 'day');
    });

    if (todaySign && !todaySign.signed) {
      // 今天还没有签到
      setCanClaim(true);
      setTodayReward(todaySign.points);
    } else if (todaySign && todaySign.signed) {
      // 今天已经签到过
      setCanClaim(false);
    } else {
      // 如果没有找到今天的记录（理论上不会发生）
      setCanClaim(false);
    }
  }, [dailySigns]);

  const handleClaimClick = () => {
    if (canClaim) {
      onClaim(); // 调用 onClaim，外部处理逻辑
    } else {
      alert('You have already claimed your reward for today. Please come back tomorrow.');
    }
  };

  return (
    <div className="text-center">
      <Image
        src="/icons/calendar.svg"
        width={80}
        height={80}
        alt="daily-reward"
        className="mx-auto"
      />
      <h2 className="mb-2 mt-3 text-21 font-medium">Daily Reward</h2>
      <p className="text-gray-600">Get WAV Points for daily login without skipping.</p>
      <div className="mb-6 mt-[42px] grid grid-cols-4 gap-[6px] text-15">
        {dailySigns.map((sign, index) => {
          const isPast = sign.signed;
          const isCurrent = dayjs.utc(sign.timeStamp).isSame(dayjs().utc(), 'day');
          const isFuture = dayjs.utc(sign.timeStamp).isAfter(dayjs().utc(), 'day');

          return (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center space-y-1 rounded-8 bg-gray-100 p-3 ${
                isCurrent ? 'border-[2px] border-black' : ''
              }`}
            >
              <p className="text-[#898992]">Day {index + 1}</p>
              {isPast ? (
                <Image src="/icons/complete.svg" width={20} height={20} alt="complete" />
              ) : (
                <CurrencyIconButton size={20} />
              )}
              <p className={`font-medium ${isCurrent ? 'text-black' : 'text-[#898992]'}`}>
                {formatNumberWithUnits(sign.points)}
              </p>
              {isFuture && (
                <div className="absolute inset-0 rounded-8 bg-white opacity-50"></div> // 添加禁用蒙层
              )}
            </div>
          );
        })}
      </div>
      <Button
        onClick={handleClaimClick}
        disabled={!canClaim}
        loading={loading}
        className={`mt-4 !h-[52px] w-full !rounded-12 ${
          canClaim ? '!bg-black !text-white' : '!bg-gray-200 !text-gray-500'
        }`}
        block
      >
        {canClaim ? `Claim Reward ` : 'Come back tomorrow'}
      </Button>
    </div>
  );
};

export default RewardDetailContent;
