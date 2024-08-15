'use client';
import { useMemoizedFn } from 'ahooks';
import { useRouter } from 'next/navigation';
import { FC, memo, useEffect } from 'react';

interface BackButtonProps {
  onClick?: () => void;
}
const BackButton: FC<BackButtonProps> = memo((props) => {
  const { onClick } = props;
  const router = useRouter();
  const handleClick = useMemoizedFn(() => {
    if (onClick) {
      onClick();
      return;
    }

    router.back();
  });
  useEffect(() => {
    window?.Telegram?.WebApp.BackButton.show();
    window?.Telegram?.WebApp.BackButton.onClick(handleClick);
    return () => {
      window?.Telegram?.WebApp.BackButton.hide();
      window?.Telegram?.WebApp.BackButton.offClick(handleClick);
    };
  }, [handleClick]);
  return <></>;
});
BackButton.displayName = 'BackButton';

export { BackButton };
