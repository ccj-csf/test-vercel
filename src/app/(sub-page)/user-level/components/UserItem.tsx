import { CurrencyIconButton } from '@/biz-components';
import { IUserLevel } from '@/types';
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
        src={data?.avatarUrl}
        alt={data?.username}
        width={40}
        height={40}
        className="mr-2 rounded-full"
      />
      <span className="text-15 text-white">{data?.isCurrentUser ? 'me' : data?.username}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-1 text-15 text-yellow">{data?.points.toLocaleString()}</span>
      <CurrencyIconButton size={20} />
    </div>
  </div>
);

export default UserItem;
