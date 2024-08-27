import { IUserLevel } from '@/types';
import React from 'react';
import UserItem from './UserItem';

interface IProps {
  data: IUserLevel[];
  loading: boolean;
  isUserCurrentLevel: boolean;
}

const Leaderboard: React.FC<IProps> = ({ data, loading, isUserCurrentLevel }) => {
  return (
    <div
      className={`${isUserCurrentLevel ? 'mb-[40px]' : ''} mt-6 space-y-8 rounded-t-[24px] bg-[#1e1f22] px-5 py-6`}
    >
      {loading ? (
        // 显示骨架屏
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex animate-pulse items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-700"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 rounded bg-gray-700"></div>
                <div className="h-4 w-1/2 rounded bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        data?.map((user, index) => <UserItem key={index} data={user} />)
      )}
    </div>
  );
};

export default Leaderboard;
