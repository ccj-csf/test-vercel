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
  formatFunction?: (value: number) => string;
}

const FormattedFlipNumbers: React.FC<FormattedFlipNumbersProps> = ({
  value,
  height = 38,
  width = 26,
  color = 'black',
  perspective = 800,
  formatFunction = (val) => val.toString(), // 默认不做格式化
}) => {
  const formattedValue = formatFunction(value);

  return (
    <FlipNumbers
      play
      numbers={formattedValue}
      color={color}
      height={height}
      width={width}
      perspective={perspective}
    />
  );
};

export { FormattedFlipNumbers };
