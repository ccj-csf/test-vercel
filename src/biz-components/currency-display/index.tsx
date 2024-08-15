import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface CurrencyDisplayProps {
  currency: number;
  imageSize?: number; // 可选的图片大小属性
  fontSize?: number; // 可选的字体大小属性
  formatter?: (currency: number) => string; // 可选的格式化函数属性
  spacingClass?: string; // 可选的空间类名属性
  prefix?: string; // 可选的前缀符号或文字
  prefixClass?: string; // 可选的前缀符号或文字的样式类名
  disabled?: boolean; // 新增，控制置灰模式
  className?: string; // 新增，控制整体样式
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  currency,
  imageSize = 24, // 默认图片大小为24
  fontSize = 24, // 默认字体大小为24
  formatter = formatNumberWithCommas, // 默认格式化函数
  spacingClass = 'space-x-2', // 默认间距类名
  prefix = '', // 默认没有前缀符号
  prefixClass = 'text-12', // 默认前缀符号样式
  disabled = false, // 默认非置灰模式
  className = '', // 默认无样式
}) => {
  return (
    <div className={`flex items-center text-center font-bold ${spacingClass}  ${className}`}>
      <Image
        src={disabled ? '/icons/wav-coin-disabled.svg' : '/icons/wav-coin-active.svg'}
        alt="coin"
        width={imageSize}
        height={imageSize}
      />
      <span
        className={`font-medium ${disabled ? 'text-gray-300' : ''}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {prefix && (
          <span className={`${prefixClass}`} style={{ fontSize: `${fontSize}px` }}>
            {prefix}
          </span>
        )}
        {formatter(currency)}
      </span>
    </div>
  );
};

export { CurrencyDisplay };
