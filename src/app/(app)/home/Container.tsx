'use client';

import { CurrencyIconButton } from '@/biz-components';
import { Button, Popup } from '@/components';
import { useAnimationStore, useUserInfoStore } from '@/store';
import { formatNumberWithCommas, startVibrate } from '@/utils';
import React, { useEffect, useState } from 'react';
import store from 'store2';
import CoinBalance from './components/CoinBalance';
import MusicPlayer from './components/MusicPlayer';
import RewardButtons from './components/RewardButtons';
import UserInfo from './components/UserInfo';

const Container: React.FC = () => {
  const { totalPoints, rewardPoints, setUserInfo } = useUserInfoStore();
  const { triggerNotification } = useAnimationStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // 用于控制 CoinBalance 的显示值
  const [displayedTotalPoints, setDisplayedTotalPoints] = useState(totalPoints - rewardPoints);

  useEffect(() => {
    const hasSeenPopup = store.session.get('hasSeenPopup');
    if (!hasSeenPopup) {
      setIsPopupVisible(true);
      store.session.set('hasSeenPopup', true);
    } else {
      // 这里也需要更新 displayedTotalPoints 的值
      setDisplayedTotalPoints(totalPoints);
    }
  }, [totalPoints, rewardPoints]);

  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setDisplayedTotalPoints(totalPoints); // 弹窗关闭时，显示最新的 totalPoints
  };

  const getCoinBalance = () => {
    startVibrate();

    // 更新 totalPoints
    const newTotalPoints = totalPoints + rewardPoints;
    setUserInfo({
      totalPoints: newTotalPoints,
    });

    // 更新显示的 totalPoints
    setDisplayedTotalPoints(newTotalPoints);

    setIsPopupVisible(false); // 关闭弹窗
    triggerNotification(true); // 触发通知
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <UserInfo />
      <RewardButtons />
      <CoinBalance displayedTotalPoints={displayedTotalPoints} /> {/* 传递当前显示的 totalPoints */}
      <MusicPlayer />
      <Popup visible={isPopupVisible} showCloseButton={true} onClose={handlePopupClose}>
        <div className="flex flex-col items-center pt-4">
          <h2 className="absolute top-[10px] text-17">Offline Earnings</h2>
          <div className="mt-6 flex items-center space-x-2 text-28">
            <CurrencyIconButton size={28} />
            <span>+{formatNumberWithCommas(rewardPoints)}</span>
          </div>
          <h2 className="mb-16 mt-4 text-17">Your Auto AI Mining has started working.</h2>
          <Button
            onClick={getCoinBalance}
            className="!h-[52px] w-full !rounded-12 !bg-black !text-14 !text-white"
            block
          >
            Thank you. Pick it up.
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default Container;
