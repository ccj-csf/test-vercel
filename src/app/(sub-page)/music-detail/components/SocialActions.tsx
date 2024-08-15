'use client';
import { Icon } from '@/components';
import { NativeProps } from '@/utils';
import React from 'react';
interface SocialActionsProps extends NativeProps {}
const SocialActions: React.FC<SocialActionsProps> = () => {
  return (
    <div className=" flex flex-col items-center space-y-5">
      <button className="flex flex-col items-center space-y-[2px] rounded-full bg-white/10 px-[16px] py-[9px]">
        <Icon name="collect" className="!text-16 text-white" />
        <span>816</span>
      </button>
      <button className="flex flex-col items-center space-y-[2px] rounded-full bg-white/10 px-[16px] py-[9px]">
        <Icon name="like" className="!text-16 text-white" />
        <span>7.9k</span>
      </button>
      <button className="flex flex-col items-center space-y-[2px] rounded-full bg-white/10 px-[16px] py-[9px]">
        <Icon name="share" className="!text-16 text-white" />
        <span>1.3k</span>
      </button>
    </div>
  );
};

export default SocialActions;
