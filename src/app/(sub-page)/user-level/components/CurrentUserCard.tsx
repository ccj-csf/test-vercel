import { IUserLevel } from '@/types';
import React from 'react';
import UserItem from './UserItem';
interface ICurrentUserCardProps {
  data: IUserLevel;
}
const CurrentUserCard: React.FC<ICurrentUserCardProps> = ({ data }) => (
  <div className="fixed bottom-0 w-full bg-[#1e1f22] px-5">
    <UserItem data={data} />
  </div>
);

export default CurrentUserCard;
