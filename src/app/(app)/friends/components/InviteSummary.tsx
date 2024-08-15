// InviteSummary.tsx
import { CurrencyIconButton } from '@/biz-components';
import Image from 'next/image';
import React from 'react';

const InviteSummary: React.FC = () => {
  return (
    <div className="mb-3 mt-[18px] flex w-full items-center space-x-4 rounded-12 bg-white p-[10px]">
      <div className="rounded-8 bg-gray-100 p-2">
        <Image src="/icons/gift.svg" alt="invite" width={48} height={48} />
      </div>
      <div className="text-15">
        <h2 className="text-lg ">Invite a friend</h2>
        <p className="flex items-center space-x-2 text-gray-600">
          <CurrencyIconButton size={20} />
          <span className="font-light">+5,000 for you and your friend</span>
        </p>
      </div>
    </div>
  );
};

export default InviteSummary;
