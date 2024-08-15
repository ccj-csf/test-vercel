'use client';

import { BACKGROUND_COLOR } from '@/constants';
import { useMusicPlayerStore, useStartProfitPerSecond } from '@/store';
import { useAsyncEffect } from 'ahooks';

import { ReactNode, createContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
export const TelegramWebappContext = createContext<{}>({});
export function TelegramWebappProvider({ children }: { children: ReactNode }) {
  useStartProfitPerSecond();

  const initializePlayer = useMusicPlayerStore((state) => state.initializePlayer);

  useEffect(() => {
    // alert('请先登录');
    initializePlayer(); // 在应用加载后初始化播放器
  }, [initializePlayer]);

  useEffect(() => {
    const WebApp = window?.Telegram?.WebApp;
    if (WebApp) {
      WebApp.ready();
      WebApp.setHeaderColor(BACKGROUND_COLOR);
      WebApp.setBackgroundColor(BACKGROUND_COLOR);
      WebApp.expand();
      WebApp.disableVerticalSwipes();
      // WebApp.enableClosingConfirmation();
    }
  }, []);

  useAsyncEffect(async () => {
    if (
      typeof window !== undefined &&
      (process.env.NEXT_PUBLIC_ENV === 'test' ||
        (process.env.NODE_ENV === 'development' && isMobile))
    ) {
      const eruda = await import('eruda');
      eruda.default.init();
    }
  }, []);

  return <TelegramWebappContext.Provider value={{}}>{children}</TelegramWebappContext.Provider>;
}
