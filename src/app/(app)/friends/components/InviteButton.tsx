// InviteButton.tsx
import { Button, Icon } from '@/components'; // 根据项目实际情况调整引入路径
import React from 'react';

interface InviteButtonProps {
  onInvite: () => void;
  onCopyLink: () => void;
}

const InviteButton: React.FC<InviteButtonProps> = ({ onInvite, onCopyLink }) => {
  return (
    <div className="mb-5 mt-8 flex w-full items-center justify-between space-x-4">
      <Button
        block
        onClick={onInvite}
        variant="black"
        className="!h-12 !rounded-12 !bg-black !text-15 !text-white"
      >
        Invite a Friend
      </Button>
      <div className="flex h-full items-center justify-center rounded-12 bg-white px-4 py-2">
        <Icon name="copy" className="!text-28" onClick={onCopyLink} />
      </div>
    </div>
  );
};

export default InviteButton;
