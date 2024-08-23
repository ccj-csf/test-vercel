'use client';

import { Button, Icon, Popup } from '@/components';
import { useMessage } from '@/hooks';
import { useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';
import Image from 'next/image';
import React from 'react';

interface IWalletModalProps {
  visible: boolean;
  onClose: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

const WalletModal: React.FC<IWalletModalProps> = ({
  visible,
  onClose,
  isConnected,
  walletAddress,
}) => {
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const { showSuccess } = useMessage();

  const handleWalletConnect = () => {
    open();
  };

  const disconnect = () => {
    window.Telegram.WebApp.showConfirm('Confirm Disconnect?', (ok: boolean) => {
      if (ok) {
        handleConfirmDisconnect();
      }
    });
  };

  const handleConfirmDisconnect = () => {
    tonConnectUI.disconnect();
    onClose();
  };

  const onCopyLink = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      showSuccess('Wallet address copied to clipboard');
    }
  };

  return (
    <>
      <Popup visible={visible} showCloseButton={true} onClose={onClose} className="!z-10">
        <main className="flex flex-col items-center pt-4">
          <Image src="/icons/ton.svg" width={64} height={64} alt="ton" />
          <h2 className="mb-2 mt-6 text-21">Your TON wallet is connected</h2>
          <p className="mb-[57px] text-center text-15 font-light">
            You can disconnect it or copy wallet address
          </p>
          {isConnected ? (
            <section className="flex w-full items-center justify-between space-x-4">
              <div className="rounded-12 bg-gray-100 p-3 px-4" onClick={disconnect}>
                <Icon name="close" className="!text-12" />
              </div>
              <div className="flex w-full items-center rounded-12 border-[1px] border-gray-100 px-4 py-[14px]">
                <Icon name="wallet" className="mr-2 text-24" />
                <span className="max-w-[190px] flex-1 truncate text-15">{walletAddress}</span>
                <Icon name="copy" className="!text-24" onClick={onCopyLink} />
              </div>
            </section>
          ) : (
            <Button
              onClick={handleWalletConnect}
              className="!h-[52px] !rounded-12 !bg-black !text-15 !text-white"
              block
            >
              Connect your ToN wallet
            </Button>
          )}
        </main>
      </Popup>
    </>
  );
};

export default WalletModal;
