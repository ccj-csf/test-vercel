import { CurrencyIconButton } from '@/biz-components';
import Image from 'next/image';
import React from 'react';
import { IUser } from '../Container';

const Leaderboard: React.FC<{ data: IUser[] }> = ({ data }) => (
  <div className="leaderboard">
    {data &&
      data.map((user, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-2 ${
            user.isCurrentUser ? 'bg-blue-200' : 'bg-black'
          } mb-2 rounded-lg`}
        >
          <div className="flex items-center">
            <span className="mr-3 text-white">{index + 1}.</span>
            <Image
              src={user.avatarUrl}
              alt={user.username}
              width={40}
              height={40}
              className="mr-3 rounded-full"
            />
            <span className="text-white">{user.username}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-yellow-400">{user.points.toLocaleString()}</span>
            <CurrencyIconButton size={20}></CurrencyIconButton>
          </div>
        </div>
      ))}
  </div>
);

export default Leaderboard;
