'use client';

import { CurrencyIconButton, UserLevelIcon } from '@/biz-components';
import { useNavigate } from '@/hooks';
import { useUserInfoStore } from '@/store';
import { formatNumberToK } from '@/utils';
import { ProgressBar } from 'antd-mobile';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const UserInfo: React.FC = () => {
  const { userName, avatarUrl, level, profitPerHour } = useUserInfoStore();
  const { gotoUserLevelPage, gotoMinePage } = useNavigate();

  const maxLevel = 10; // 假设总等级数为10
  const percent = (level / maxLevel) * 100;

  return (
    <div className="flex flex-col space-y-4">
      <section className="flex items-center space-x-1">
        <Image src={avatarUrl} alt={userName} width={24} height={24} className="rounded-full" />
        <h2 className="text-13">{userName}</h2>
      </section>
      <section className="grid grid-cols-2 gap-4 text-12">
        <section
          className="space-y-2 rounded-8 bg-white px-2 py-[6px]"
          onClick={() => gotoUserLevelPage()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center  space-x-1">
              <UserLevelIcon level={level} showLabel={false} size={20} />
              <span>Lv.{level}</span>
              <ChevronRight className="text-gray-300" size={18} />
            </div>
            <div className="text-gray-300">
              <span className="text-black">{level}</span>
              <span>/</span> <span>{maxLevel}</span>
            </div>
          </div>
          <ProgressBar
            percent={percent}
            style={{
              '--track-color': '#E1E4EC',
              '--fill-color': '#FFA6FF',
              '--track-width': '4px',
            }}
          />
        </section>
        <section
          className="relative flex h-[44px] rounded-8 bg-white px-2 pl-[52px]"
          onClick={() => gotoMinePage()}
        >
          <Image
            src="/icons/music-disc.svg"
            alt="coin"
            width={48}
            height={48}
            className="absolute -left-1"
          />
          <div className=" flex flex-1 items-center justify-between text-12">
            <p>
              <span className="font-normal text-gray-400">Profit per hour</span>
              <span className="flex items-center space-x-1">
                <CurrencyIconButton size={12}></CurrencyIconButton>
                <span>+{formatNumberToK(profitPerHour)}</span>
              </span>
            </p>
            <ChevronRight className="text-gray-300" size={18} />
          </div>
        </section>
      </section>
    </div>
  );
};

export default UserInfo;
