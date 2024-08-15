'use client';
import Image from 'next/image';
import { FC } from 'react';

interface AvatarProps {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
}
// 默认头像
const defaultAvatar = '/imgs/avatar.png';
const Avatar: FC<AvatarProps> = ({
  src = defaultAvatar,
  width = 36,
  height = 36,
  alt = 'Avatar',
}) => {
  return (
    <div className="relative inline-block rounded-full " style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="fixed"
        className="rounded-full object-cover" // 圆形头像
      />
    </div>
  );
};
Avatar.displayName = 'Avatar';
export { Avatar };
