'use client';
import { NativeProps, withNativeProps } from '@/utils';
import { FC, ReactNode, memo } from 'react';

interface AppHeaderProps extends NativeProps {
  title: ReactNode;
}
const AppHeader: FC<AppHeaderProps> = memo((props) => {
  const { title } = props;
  return withNativeProps(
    props,
    <div className=" flex h-[44px] w-full  items-center text-16  font-semibold">{title}</div>,
  );
});
AppHeader.displayName = 'AppHeader';
export { AppHeader };
