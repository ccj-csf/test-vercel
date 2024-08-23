'use client';
import { CurrencyDisplay } from '@/biz-components';
import { Button, Icon } from '@/components';
import { ICardItem } from '@/types';
import { formatNumberToK } from '@/utils';
import Image from 'next/image';
import React from 'react';
import LvLabel from './LvLabel';

interface CardItemProps {
  cardData: ICardItem;
  userCurrency: number; // 用户当前的积分
  onUpgrade?: () => void;
  className?: string;
}

const CardItem: React.FC<CardItemProps> = ({
  cardData,
  userCurrency,
  onUpgrade,
  className = '',
}) => {
  const {
    name,
    icon,
    level,
    profitPerHour,
    upgradeCost,
    isLocked,
    unlockRequirement = '',
    maxLevel = 5, // 默认最大等级为5
  } = cardData;

  const isMaxLevel = level >= maxLevel;
  const canUpgrade = !isLocked && userCurrency >= upgradeCost && !isMaxLevel;

  return (
    <div className={`relative flex flex-col space-y-[10px] rounded-8 bg-white p-2 ${className}`}>
      <section className="absolute right-0 top-0">
        <LvLabel level={level} />
      </section>
      <section className="flex items-center space-x-2">
        <div className="relative h-12 w-12 overflow-hidden rounded-4 bg-gray-100 p-2">
          <Image src={icon} alt="icon" width={32} height={32} className="object-cover" />
          {isLocked && (
            <>
              <div className="absolute inset-0 bg-gray-100 opacity-50" />
              <Icon
                name="lock"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform !text-15"
              />
            </>
          )}
        </div>
        <div className="text-13">{name}</div>
      </section>
      <div className="flex items-center space-x-1 text-gray-600">
        <span>Profit per hour</span>
        <CurrencyDisplay
          currency={profitPerHour}
          imageSize={12}
          fontSize={12}
          spacingClass="space-x-1"
          prefix="+"
        />
      </div>
      {isLocked ? (
        <Button variant="gray" disabled className="h-[36px] !bg-gray-100 !text-13 !text-gray-300">
          {unlockRequirement}
        </Button>
      ) : isMaxLevel ? (
        <Button variant="gray" disabled className="h-[36px] !bg-gray-100 !text-13 !text-gray-300">
          Max Level
        </Button>
      ) : userCurrency < upgradeCost ? (
        <Button className="!rounded-8 !bg-gray-100 !text-13 !text-gray-300" disabled>
          <div className="flex items-center justify-center space-x-2">
            <span>Level up for</span>
            <CurrencyDisplay
              disabled
              currency={upgradeCost}
              formatter={formatNumberToK}
              imageSize={16}
              fontSize={13}
              spacingClass="space-x-1"
            />
          </div>
        </Button>
      ) : (
        <Button className="!rounded-8 !bg-yellow !text-13" onClick={onUpgrade}>
          <div className="flex items-center justify-center space-x-2">
            <span>Level up for</span>
            <CurrencyDisplay
              currency={upgradeCost}
              formatter={formatNumberToK}
              imageSize={16}
              fontSize={13}
              spacingClass="space-x-1"
            />
          </div>
        </Button>
      )}
    </div>
  );
};

export default CardItem;
