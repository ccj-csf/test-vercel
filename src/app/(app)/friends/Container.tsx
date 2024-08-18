'use client';
import { useMessage } from '@/hooks';
import { getFriendsData } from '@/services';
import { IFriendsData } from '@/types';
import { getInviteCodeLink, openInviteCodeLink, startVibrate } from '@/utils';
import React, { useEffect } from 'react';
import FriendsList from './components/FriendsList';
import Header from './components/Header';
import InviteButton from './components/InviteButton';
import InviteSummary from './components/InviteSummary';
import LevelUpBonus from './components/LevelUpBonus';

interface IProps {
  data?: IFriendsData;
}

const Container: React.FC<IProps> = ({ data }) => {
  const { showSuccess } = useMessage();
  // const { friends, bonuses } = data || {
  //   friends: initialFriends,
  //   bonuses: initialBonuses,
  // };
  const [friends, setFriends] = React.useState(data?.friends || []);
  const [bonuses, setBonuses] = React.useState(data?.bonuses || []);
  useEffect(() => {
    getFriendsData().then((res) => {
      console.log('res', res);
      setFriends(res?.data?.friends || []);
      setBonuses(res?.data?.bonuses || []);
    });
  }, []);

  const handleCopyLink = () => {
    startVibrate();
    navigator.clipboard.writeText(getInviteCodeLink());
    showSuccess('Invite link copied to clipboard');
  };

  const handleInvite = () => {
    openInviteCodeLink();
  };

  return (
    <div className="flex w-full flex-col items-center ">
      <Header />
      <InviteSummary />
      <LevelUpBonus bonuses={bonuses} />
      <section className="my-3 w-full">
        <FriendsList friends={friends} />
      </section>
      <InviteButton onInvite={handleInvite} onCopyLink={handleCopyLink} />
    </div>
  );
};

export default Container;
