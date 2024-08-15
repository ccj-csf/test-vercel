// components/RewardTitle.tsx
import React from 'react';

interface RewardTitleProps {
  title: string;
}

const RewardTitle: React.FC<RewardTitleProps> = ({ title }) => {
  return <h2 className="text-17 ">{title}</h2>;
};

export default RewardTitle;
