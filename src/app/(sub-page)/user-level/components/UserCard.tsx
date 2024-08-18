import React from 'react';

const UserCard: React.FC<{ data: any }> = ({ data }) => (
  <div className="user-card">
    <span>{data.username}</span>
    <span>{data.points}</span>
    <span>Rank: {data.rank}</span>
  </div>
);

export default UserCard;
