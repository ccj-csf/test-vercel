'use client';
import { CurrencyIconButton, UserLevelIcon } from '@/biz-components';
import { Accordion } from '@/components';
import { IFriend } from '@/types';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface FriendsListProps {
  friends: IFriend[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <Accordion title="Friends List" isOpen={true} disableToggle>
      {friends.length > 0 ? (
        <div className="space-y-7">
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={friend.avatar}
                  alt={`${friend.name}'s avatar`}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div className="ml-2 flex items-center space-x-1">
                  <UserLevelIcon level={friend.level} showLabel={false} />
                  <div className="text-15">{friend.name}</div>
                </div>
              </div>
              <section className="flex items-center space-x-1">
                <span className="text-15">{formatNumberWithCommas(friend.reward)}</span>
                <CurrencyIconButton size={16} />
              </section>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-20 items-center justify-center font-light text-[#898992]">
          Oops! You haven't invited anyone yet :(
        </div>
      )}
    </Accordion>
  );
};

export default FriendsList;
