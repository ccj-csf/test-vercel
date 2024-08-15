'use client';

import { cn, NativeProps, withNativeProps } from '@/utils';
import React, { useCallback } from 'react';
import './index.css';

interface IconProps extends NativeProps {
  name: string;
  onClick?: (e: React.SyntheticEvent<Element, Event>) => void;
  [key: string]: unknown;
}
const Icon: React.FC<IconProps> = React.memo((props) => {
  const { name, onClick, ...others } = props;

  const cls = cn('iconfont font-normal text-base', {
    [`icon-${name}`]: name,
  });

  const handleClick = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      onClick?.(e);
    },
    [onClick],
  );

  return withNativeProps(props, <i {...others} className={cls} onClick={handleClick} />);
});
Icon.displayName = 'Icon';
export { Icon };
