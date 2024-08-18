'use client';
import { CurrencyIconButton } from '@/biz-components';
import { useMusicPlayerStore, useUserInfoStore } from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import store from 'store2';

interface AudioProgressBarProps {
  duration: number; // 音频总时长（秒）
  currentTime: number; // 当前播放时间（秒）
  onTimeUpdate?: (time: number) => void; // 更新时间的回调函数
  barColor?: string; // 进度条的颜色
}

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({
  duration,
  currentTime,
  onTimeUpdate,
  barColor = '#000',
}) => {
  const { isTrackCompleted } = useMusicPlayerStore();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { setUserInfo, coinBalance } = useUserInfoStore();

  // 奖励金额
  const rewardOneAmount = 100;
  const rewardTwoAmount = 500;

  // 奖励节点的位置
  const rewardNodeOnePosition = (1 / 3) * duration;
  const rewardNodeTwoPosition = (2 / 3) * duration;

  // 存储奖励状态的键名
  const rewardKeyNode1 = `rewardNode1`;
  const rewardKeyNode2 = `rewardNode2`;

  // 从store2获取初始状态
  const [rewardsClaimed, setRewardsClaimed] = useState<{ node1: boolean; node2: boolean }>({
    node1: store.get(rewardKeyNode1) || false,
    node2: store.get(rewardKeyNode2) || false,
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const newTime = ((event.clientX - rect.left) / rect.width) * duration;
      onTimeUpdate?.(newTime);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.buttons === 1) {
      handleMouseDown(event);
    }
  };

  // 检查是否显示奖励节点
  const shouldDisplayNodes = duration > 0;

  // 处理奖励发放
  useEffect(() => {
    if (currentTime > 0 && currentTime >= rewardNodeOnePosition && !rewardsClaimed.node1) {
      alert('You have claimed your 1 reward for today. Please come back tomorrow.');
      setUserInfo({ coinBalance: coinBalance + rewardOneAmount });
      setRewardsClaimed((prev) => ({ ...prev, node1: true }));
      store.set(rewardKeyNode1, true);
    }
    if (currentTime > 0 && currentTime >= rewardNodeTwoPosition && !rewardsClaimed.node2) {
      alert('You have claimed your 2 reward for today. Please come back tomorrow.');
      setUserInfo({ coinBalance: coinBalance + rewardTwoAmount });
      setRewardsClaimed((prev) => ({ ...prev, node2: true }));
      store.set(rewardKeyNode2, true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  // 重置奖励领取状态
  useEffect(() => {
    if (isTrackCompleted) {
      setRewardsClaimed({ node1: false, node2: false });
      store.remove(rewardKeyNode1);
      store.remove(rewardKeyNode2);
    }
  }, [isTrackCompleted, rewardKeyNode1, rewardKeyNode2]);

  return (
    <div className="relative mt-6">
      <section
        className="relative h-[2px] w-full cursor-pointer select-none overflow-visible rounded-[22px] bg-gray-200"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        ref={progressBarRef}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-[22px]"
          style={{
            width: `${(currentTime / duration) * 100}%`,
            backgroundColor: barColor,
          }}
        ></div>

        {/* 奖励节点1 */}
        {shouldDisplayNodes && (
          <div
            className="absolute text-12"
            style={{
              left: `${(rewardNodeOnePosition / duration) * 100}%`,
              top: '-2px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="relative flex flex-col items-center justify-center">
              <span className="z-10 block h-[6px] w-[4px] rounded-full bg-black"></span>
              <div className="absolute top-[12px] flex items-center space-x-1 text-[#898992]">
                <CurrencyIconButton size={12} />
                <span>+{rewardOneAmount}</span>
              </div>
            </div>
          </div>
        )}

        {/* 奖励节点2 */}
        {shouldDisplayNodes && (
          <div
            className="absolute text-12"
            style={{
              left: `${(rewardNodeTwoPosition / duration) * 100}%`,
              top: '-2px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="relative flex flex-col items-center">
              <span className="z-10 block h-[6px] w-[4px] rounded-full bg-black"></span>
              <div className="absolute top-[12px] flex items-center space-x-1 text-[#898992]">
                <CurrencyIconButton size={12} />
                <span>+{rewardTwoAmount}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mt-[6px] flex w-full items-center justify-between text-12 text-[#898992]">
        <span>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, '0')}
        </span>
        <span>
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, '0')}
        </span>
      </section>
    </div>
  );
};

export default AudioProgressBar;
