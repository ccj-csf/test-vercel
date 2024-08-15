'use client';

import { LogoIcon } from '@/biz-components';
import { Button, Popup } from '@/components'; // 确保路径正确
import { useNavigate } from '@/hooks/useNavigate'; // 确保路径正确
import { AppUtils } from '@/utils';
import Image from 'next/image';
import React, { useState } from 'react';

const RewardButtons: React.FC = () => {
  const { gotoEarnPage, gotoFriendsPage } = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };
  const handleAppOpen = () => {
    AppUtils.openAppOrRedirect();
  };

  return (
    <div className="mt-6 flex justify-between rounded-8 bg-white px-4 py-2 text-13">
      <section
        className="flex cursor-pointer flex-col items-center space-y-1"
        onClick={() => gotoEarnPage({ query: { type: 'daily' } })}
      >
        <Image src="/icons/calendar.svg" alt="Daily Reward" width={48} height={48} />
        <span>Daily Reward</span>
      </section>
      <section
        className="flex cursor-pointer flex-col items-center space-y-1"
        onClick={() => gotoFriendsPage()}
      >
        <Image src="/icons/gift.svg" alt="Invite Bonus" width={48} height={48} />
        <span>Invite Bonus</span>
      </section>
      <section className="flex cursor-pointer flex-col items-center space-y-1" onClick={showPopup}>
        <Image src="/icons/music-note.svg" alt="Creation Reward" width={48} height={48} />
        <span>Creation Reward</span>
      </section>

      <Popup visible={isPopupVisible} showCloseButton={true} onClose={handlePopupClose}>
        <div className="flex flex-col items-center  pt-4">
          <LogoIcon size={64} />
          <h2 className="mb-2 mt-6 text-17">Music can only be created in the App</h2>
          <p className="mb-16 text-15 text-gray-350">Go to WAV App to create your own music.</p>
          <Button
            onClick={handleAppOpen}
            className={`!h-[52px]  w-full   !rounded-12 !bg-black !text-14 !text-white`}
            block
          >
            Download the App
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default RewardButtons;
