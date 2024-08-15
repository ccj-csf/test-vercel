'use client';
import { NativeProps, startVibrate, withNativeProps } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, memo } from 'react';
import { Icon } from '../icon';

export interface TabbarProps extends NativeProps {}
const Tabbar: FC<TabbarProps> = memo((props) => {
  const pathname = usePathname();
  const goToPageBeforeHandler = useMemoizedFn((path) => {
    startVibrate();
  });
  const renderIcon = useMemoizedFn((name: string) => {
    const path = `/${name}`;
    let activeColor = pathname.includes(path) ? 'text-black' : 'text-gray-300';
    let activeName = pathname.includes(path) ? `${name}-active` : name;

    return (
      <Link
        href={path}
        prefetch
        className="flex cursor-pointer flex-col items-center "
        onClick={() => goToPageBeforeHandler(path)}
      >
        <Icon name={activeName} className={`!text-18 ${activeColor}`} />
        <span className={`mt-1 text-12  capitalize ${activeColor} `}>{name}</span>
      </Link>
    );
  });

  return withNativeProps(
    props,
    <div className="z-100 fixed bottom-0 left-0 grid w-full grid-cols-5 items-center justify-between  pb-6">
      {renderIcon('home')}
      {renderIcon('mine')}
      {renderIcon('friends')}
      {renderIcon('earn')}
      {renderIcon('account')}
    </div>,
  );
});
Tabbar.displayName = 'Tabbar';
export { Tabbar };
