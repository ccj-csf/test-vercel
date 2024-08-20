import { create } from 'zustand';

interface CoinStoreState {
  coinCount: number;
  showNotification: boolean;
  animationTimeout: NodeJS.Timeout | null;
  triggerNotification: (show: boolean, count?: number) => void;
}

export const useCoinStore = create<CoinStoreState>((set, get) => ({
  coinCount: 100,
  showNotification: false,
  animationTimeout: null,

  triggerNotification: (show: boolean, count?: number) => {
    const { animationTimeout } = get();

    // 清理上一次的动画定时器
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }

    // 触发动画
    if (show) {
      const currentCount = count ?? get().coinCount;
      set({ showNotification: true, coinCount: currentCount });

      const timeout = setTimeout(() => {
        set({ showNotification: false, animationTimeout: null });
      }, 1500);

      set({ animationTimeout: timeout });
    } else {
      set({ showNotification: false });
    }
  },
}));
