'use client';
import Image from 'next/image';
import React from 'react';

interface CurrencyIconButtonProps {
  iconSrc?: string; // 可选的自定义图标路径
  size?: number; // 大小
  disabled?: boolean; // 是否禁用
  onClick?: () => void; // 点击事件处理
  activeIconSrc?: string; // 激活状态图标路径，提供默认值
  disabledIconSrc?: string; // 禁用状态图标路径，提供默认值
}

const CurrencyIconButton: React.FC<CurrencyIconButtonProps> = ({
  iconSrc,
  size = 24,
  disabled = false,
  onClick,
  activeIconSrc = '/icons/wav-coin-active.svg', // 设置默认值
  disabledIconSrc = '/icons/wav-coin-disabled.svg', // 设置默认值
}) => {
  const displayedIcon = disabled ? disabledIconSrc : activeIconSrc;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image src={iconSrc || displayedIcon} alt="icon" width={size} height={size} />
    </button>
  );
};

export { CurrencyIconButton };
