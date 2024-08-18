// components/FormattedFlipNumbers.tsx

'use client';

import React from 'react';
import FlipNumbers from 'react-flip-numbers';

interface FormattedFlipNumbersProps {
  value: number;
  height?: number;
  width?: number;
  color?: string;
  perspective?: number;
  fontSize?: number; // 新增: 控制分隔符和整体的字体大小
  formatFunction?: (value: number) => string;
}

const FormattedFlipNumbers: React.FC<FormattedFlipNumbersProps> = ({
  value,
  height = 38, // 默认的高度
  width = 26,
  color = 'black',
  perspective = 800,
  fontSize, // 可选字体大小
  formatFunction = (val) => val.toString(), // 默认不做格式化
}) => {
  // 如果未提供 fontSize，默认使用 height 的值
  const effectiveFontSize = fontSize || height;

  const formattedValue = formatFunction(value);

  return (
    <div style={{ fontSize: `${effectiveFontSize}px`, display: 'flex', alignItems: 'center' }}>
      <FlipNumbers
        play
        numbers={formattedValue}
        color={color}
        height={height}
        width={width}
        perspective={perspective}
      />
    </div>
  );
};

export { FormattedFlipNumbers };
