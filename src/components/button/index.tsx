'use client';
import { Button as AntdButton, ButtonProps } from 'antd-mobile';
import React from 'react';
import './index.css'; // 导入自定义 CSS 样式

interface CustomButtonProps extends ButtonProps {
  variant?: 'gradient' | 'gray' | 'black';
  width?: string | number; // 新增宽度属性
  height?: string | number; // 新增高度属性
}

const Button: React.FC<CustomButtonProps> = ({
  variant = 'gradient',
  width,
  height,
  children,
  style,
  ...props
}) => {
  const getButtonClassName = (variant: string) => {
    switch (variant) {
      case 'gray':
        return 'custom-button-gray';
      case 'black':
        return 'custom-button-black';
      case 'gradient':
      default:
        return 'custom-button-gradient';
    }
  };
  const customStyle = {
    width: width, // 应用宽度
    height: height, // 应用高度
    ...style, // 合并外部传入的样式
  };

  return (
    <AntdButton className={`${getButtonClassName(variant)} button`} {...props} style={customStyle}>
      {children}
    </AntdButton>
  );
};
Button.displayName = 'Button';

export { Button };
