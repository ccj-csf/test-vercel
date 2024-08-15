'use client';
import { CurrencyIconButton, UserLevelIcon } from '@/biz-components';
import { Accordion } from '@/components';
import { formatNumberWithCommas } from '@/utils';
import React from 'react';

interface Bonus {
  level: number;
  reward: number;
}

interface LevelUpBonusProps {
  bonuses: Bonus[]; // 通过 props 接收升级奖励数据
}

const LevelUpBonus: React.FC<LevelUpBonusProps> = ({ bonuses }) => {
  return (
    <Accordion
      title="Level-Up Bonus"
      description="Bonuses for you and your friends when they upgrade."
    >
      <div className="space-y-7">
        {bonuses.map((bonus, index) => (
          <div key={index} className=" flex items-center justify-between">
            <div className="flex items-center">
              <UserLevelIcon level={bonus.level} />
            </div>
            <section className="flex items-center space-x-1">
              <span className="text-15">+{formatNumberWithCommas(bonus.reward)}</span>
              <CurrencyIconButton size={16} />
            </section>
          </div>
        ))}
      </div>
    </Accordion>
  );
};

export default LevelUpBonus;
