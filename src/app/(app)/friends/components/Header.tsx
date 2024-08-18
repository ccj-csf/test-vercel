'use client';
import { Icon } from '@/components';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <h1 className="text-21">Invite friends!</h1>
      <p className="mb-[14px] mt-2 text-15 text-gray-600">
        Receive bonuses for both you and your friend.
      </p>
      <div className=" flex items-center justify-center space-x-1">
        <span className="text-purple-100">Rules</span>
        <Icon name="question" className="!text-20 text-purple-100" />
      </div>
    </div>
  );
};

export default Header;
