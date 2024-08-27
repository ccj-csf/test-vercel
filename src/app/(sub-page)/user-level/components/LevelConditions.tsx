'use client';
import { useUserInfoStore } from '@/store';
import { formatNumberToK } from '@/utils';
import { ProgressBar } from 'antd-mobile';
import React from 'react';

interface ILevelConditionsProps {
  level: {
    points: number;
    invites: number;
  };
  isCurrentLevel: boolean;
}

const LevelConditions: React.FC<ILevelConditionsProps> = ({ level, isCurrentLevel }) => {
  const { totalPoints, invites = 0 } = useUserInfoStore();

  if (isCurrentLevel) {
    // 如果用户在当前等级，显示左侧样式
    const percent = Math.min((totalPoints / level.points) * 100, 100);

    return (
      <div className="level-conditions flex flex-col items-center">
        <div className="mb-2 flex w-[260px] items-center justify-between text-15">
          <span className="text-green">{formatNumberToK(totalPoints)}</span>
          <div className="mx-2 w-4/5">
            <ProgressBar
              percent={percent}
              style={{
                '--track-color': '#3A3A3D',
                '--fill-color': 'linear-gradient(90deg, #FFA6FF 0%, #FFD76F 100%)',
                '--track-width': '6px',
              }}
            />
          </div>
          <span className="text-white">{formatNumberToK(level.points)}</span>
        </div>
        <div className="text-15 text-[#89898c]">
          Invite Friends: <span className="ml-1 text-green">{invites}</span>/{level.invites}
        </div>
      </div>
    );
  } else {
    // 如果用户不在当前等级
    return (
      <div className=" mt-2 flex flex-col items-center text-15">
        <span className=" text-green">from {formatNumberToK(level.points)}</span>
        <div className="mt-4 text-[#89898c]">Invite Friends: 0/{level.invites}</div>
      </div>
    );
  }
};

export default LevelConditions;
