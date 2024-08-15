'use client';
import { CurrencyIconButton } from '@/biz-components';
import { Button } from '@/components';
import { formatNumberToK } from '@/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

dayjs.extend(utc);

interface RewardDetailContentProps {
  rewardDays?: number[]; // 每天的奖励金额数组
  onClaim?: (newDays: number, newLastClaimDate: string) => void;
  onClose?: () => void;
  lastClaimDate?: string | null; // 上次领取奖励的UTC时间
  currentStreak?: number; // 当前连续签到天数
  loading?: boolean;
}

const RewardDetailContent: React.FC<RewardDetailContentProps> = ({
  rewardDays = [], // 默认奖励天数
  onClaim = () => {}, // 默认处理函数
  onClose = () => {}, // 默认处理函数
  lastClaimDate = null,
  currentStreak = 0, // 默认从0天开始
  loading,
}) => {
  const [canClaim, setCanClaim] = useState(false);
  const [todayReward, setTodayReward] = useState(0); // 初始化todayReward

  useEffect(() => {
    const currentUTCDate = dayjs().utc();
    console.log('🚀 ~ useEffect ~ currentUTCDate:', currentUTCDate.format('YYYY-MM-DD HH:mm:ss'));

    if (!lastClaimDate) {
      // 从未领取过奖励，可以领取
      setCanClaim(true);
      setTodayReward(rewardDays[0]); // 设置今天的奖励
    } else {
      const lastDate = dayjs(lastClaimDate).utc();
      const timeDifference = currentUTCDate.diff(lastDate); // 以毫秒为单位进行对比
      console.log('🚀 ~ useEffect ~ timeDifference (ms):', timeDifference);

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const twoDaysInMilliseconds = 2 * oneDayInMilliseconds;

      if (timeDifference < oneDayInMilliseconds) {
        // 不允许再次签到
        setCanClaim(false);
        console.log('🚀 ~ 今天已经签到过');
      } else if (timeDifference >= oneDayInMilliseconds && timeDifference < twoDaysInMilliseconds) {
        // 连续签到
        console.log('🚀 ~ 连续签到的下一天');
        setCanClaim(true);
        setTodayReward(rewardDays[currentStreak % rewardDays.length]); // 设置今天的奖励
      } else {
        console.log('🚀 ~ 签到中断，重置为第一天');
        // 超过48小时，中断签到，重置为第一天
        setCanClaim(true);
        setTodayReward(rewardDays[0]); // 设置今天的奖励为第一天的奖励
      }
    }
  }, [lastClaimDate, currentStreak, rewardDays]);

  const handleClaimClick = () => {
    if (canClaim) {
      const newStreak = todayReward === rewardDays[0] ? 1 : (currentStreak % rewardDays.length) + 1;
      console.log('🚀 ~ handleClaimClick ~ todayReward:', todayReward);
      const currentUTCDate = dayjs().utc().toISOString();
      onClaim(newStreak, currentUTCDate); // 调用onClaim时传递新天数和当前UTC时间
      console.log('🚀 ~ handleClaimClick ~ newStreak:', newStreak);
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
        {rewardDays.map((reward, index) => {
          const isPast = index < currentStreak;
          const isCurrent = index === currentStreak % rewardDays.length;
          const isFuture = index > currentStreak;

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
                {formatNumberToK(reward)}
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
