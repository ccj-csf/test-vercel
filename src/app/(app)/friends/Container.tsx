'use client';
import { useMessage } from '@/hooks';
import { getFriendsData } from '@/services';
import { IBonus, IFriend } from '@/types';
import { getInviteCodeLink, openInviteCodeLink, startVibrate } from '@/utils';
import React, { useEffect, useState } from 'react';
import FriendsList from './components/FriendsList';
import Header from './components/Header';
import InviteButton from './components/InviteButton';
import InviteSummary from './components/InviteSummary';
import LevelUpBonus from './components/LevelUpBonus';
import SkeletonLoader from './components/SkeletonLoader';

const Container: React.FC = () => {
  const { showSuccess } = useMessage();
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [bonuses, setBonuses] = useState<IBonus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendsData = async () => {
      setLoading(true);
      try {
        const res = await getFriendsData();
        setFriends(res?.data?.friends || []);
        setBonuses(res?.data?.bonuses || []);
      } catch (error) {
        console.error('Failed to fetch friends data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsData();
  }, []);

  const handleCopyLink = () => {
    startVibrate();
    navigator.clipboard.writeText(getInviteCodeLink());
    showSuccess('Invite link copied to clipboard');
  };

  const handleInvite = () => {
    startVibrate();
    openInviteCodeLink();
  };

  return (
    <div className="flex w-full flex-col items-center">
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Header />
          <InviteSummary />
          <LevelUpBonus bonuses={bonuses} />
          <section className="my-3 w-full">
            <FriendsList friends={friends} />
          </section>
        </>
      )}
      <InviteButton onInvite={handleInvite} onCopyLink={handleCopyLink} />
    </div>
  );
};

export default Container;
