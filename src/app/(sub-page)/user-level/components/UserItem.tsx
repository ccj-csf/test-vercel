import { CurrencyIconButton } from '@/biz-components';
import { IUserLevel } from '@/types';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface IUserItemProps {
  data: IUserLevel;
}

const UserItem: React.FC<IUserItemProps> = ({ data }) => (
  <div className={`flex items-center justify-between `}>
    <div className="flex items-center">
      <span className="w-10 text-17 text-white">{data?.rank}</span>
      <Image
        src={data?.avatar}
        alt={data?.name}
        width={40}
        height={40}
        className="mr-2 rounded-full"
      />
      <span className="text-15 text-white">{data?.isCurrentUser ? 'me' : data?.name}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-1 text-15 text-yellow">{formatNumberWithCommas(data?.totalPoints)}</span>
      <CurrencyIconButton size={20} />
    </div>
  </div>
);

export default UserItem;
