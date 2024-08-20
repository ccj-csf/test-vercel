'use client';

import { CurrencyIconButton } from '@/biz-components';
import { Button, Popup } from '@/components';
import { useUserInfoStore } from '@/store';
import { formatNumberWithCommas, startVibrate } from '@/utils';
import React, { useEffect, useState } from 'react';
import store from 'store2';
import CoinBalance from './components/CoinBalance';
import MusicPlayer from './components/MusicPlayer';
import RewardButtons from './components/RewardButtons';
import UserInfo from './components/UserInfo';

const Container: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { coinBalance, rewardPoints, setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const hasSeenPopup = store.session.get('hasSeenPopup');
    if (!hasSeenPopup) {
      setIsPopupVisible(true);
      store.session.set('hasSeenPopup', true);
    }
  }, []);

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const getCoinBalance = () => {
    startVibrate();
    setUserInfo({
      coinBalance: coinBalance + rewardPoints, // 更新 coinBalance
    });
    setIsPopupVisible(false); // 关闭弹窗
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <UserInfo />
      <RewardButtons />
      <CoinBalance />
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
