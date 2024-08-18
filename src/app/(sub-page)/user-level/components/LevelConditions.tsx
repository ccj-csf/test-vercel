'use client';
import { useUserInfoStore } from '@/store';
import { formatNumberWithCommas } from '@/utils';
import { ProgressBar } from 'antd-mobile';
import React from 'react';

interface ILevelConditionsProps {
  level: {
    points: number;
    invites: number;
  };
}

const LevelConditions: React.FC<ILevelConditionsProps> = ({ level }) => {
  const { coinBalance, invites = 0 } = useUserInfoStore();

  // 计算进度百分比
  const percent = Math.min((coinBalance / level.points) * 100, 100);

  return (
    <div className="level-conditions flex flex-col items-center">
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="text-green-500">{formatNumberWithCommas(coinBalance)}</span>
        <div className="mx-2 w-4/5">
          <ProgressBar
            percent={percent}
            style={{
              '--track-color': '#3A3A3D',
              '--fill-color': 'linear-gradient(90deg, #FFA6FF 0%, #FFD76F 100%)',
              '--track-width': '4px',
            }}
          />
        </div>
        <span>{formatNumberWithCommas(level.points)}</span>
      </div>
      <div className="text-sm text-gray-400">
        Invite Friends: <span className="text-green-500">{invites}</span>/{level.invites}
      </div>
    </div>
  );
};

export default LevelConditions;
