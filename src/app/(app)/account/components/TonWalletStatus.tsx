'use client';

import { Button, Icon } from '@/components';
import Image from 'next/image';
import React, { useState } from 'react';
import WalletModal from './WalletModal';
interface ITonWalletStatusProps {
  isConnected: boolean;
  walletAddress: string;
}

const TonWalletStatus: React.FC<ITonWalletStatusProps> = ({ isConnected, walletAddress }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <main className="flex w-full  flex-col items-center justify-center rounded-12 bg-white px-0 py-4">
      <h2 className="w-full  border-b border-border-gray pb-4 pl-4 text-left text-15">
        Airdrop Tasks
      </h2>
      <section className="flex w-full items-center justify-between px-3 py-4 pb-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center rounded-full bg-gray-100 p-2">
            <Icon name="wallet" className="!text-16" />
          </div>
          <span className="text-15">Connect your TON wallet</span>
        </div>
        {!isConnected ? (
          <Button
            variant="black"
            className="!rounded-8 !border !border-black !px-4 !py-2 !text-12 "
            onClick={handleOpenModal}
          >
            Connect
          </Button>
        ) : (
          <Image
            src="/icons/complete.svg"
            width={20}
            height={20}
            alt="complete"
            onClick={handleOpenModal}
          />
        )}
      </section>
      <WalletModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        isConnected={isConnected}
        walletAddress={walletAddress}
      />
    </main>
  );
};

export default TonWalletStatus;
