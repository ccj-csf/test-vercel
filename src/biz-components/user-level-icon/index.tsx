'use client';
import Image from 'next/image';
import React from 'react';

interface UserLevelIconProps {
  level: number;
  size?: number; // 图标大小
  showLabel?: boolean; // 是否显示对应级别的文案
}

const levelIcons = {
  1: '/icons/user-level/level1.svg',
  2: '/icons/user-level/level2.svg',
  3: '/icons/user-level/level3.svg',
  4: '/icons/user-level/level4.svg',
  5: '/icons/user-level/level5.svg',
  6: '/icons/user-level/level6.svg',
  7: '/icons/user-level/level7.svg',
  8: '/icons/user-level/level8.svg',
  9: '/icons/user-level/level9.svg',
  10: '/icons/user-level/level10.svg',
} as const;

const levelLabels = {
  1: 'Lv.1',
  2: 'Lv.2',
  3: 'Lv.3',
  4: 'Lv.4',
  5: 'Lv.5',
  6: 'Lv.6',
  7: 'Lv.7',
  8: 'Lv.8',
  9: 'Lv.9',
  10: 'Lv.10',
} as const;

const UserLevelIcon: React.FC<UserLevelIconProps> = ({
  level,
  size = 32,
  showLabel = true, // 默认为显示级别文案
}) => {
  const iconSrc = levelIcons[level as keyof typeof levelIcons] || levelIcons[1];
  const label = levelLabels[level as keyof typeof levelLabels] || `Lv.${level}`;

  return (
    <div className="flex items-center space-x-2">
      <Image src={iconSrc} alt={`Level ${level}`} width={size} height={size} />
      {showLabel && <span className="text-15">{label}</span>}
    </div>
  );
};

export { UserLevelIcon };
