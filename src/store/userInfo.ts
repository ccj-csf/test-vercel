import { useEffect } from 'react';
import { create } from 'zustand';

const SECONDS_PER_HOUR = 3600;
const SYNC_INTERVAL_MS = 20 * 1000; // 同步间隔（毫秒）

interface UserInfoState {
  userName: string;
  avatarUrl: string;
  level: number;
  profitPerHour: number;
  coinBalance: number;
  profitPerSecond: number;
  rewardPoints: number; // 新增字段
  intervalId: NodeJS.Timeout | null;
  setUserInfo: (info: Partial<UserInfoState>) => void;
  updateProfitPerHour: (increment: number, cost: number) => void;
  startProfitPerSecond: () => void;
  stopProfitPerSecond: () => void;
  syncCoinBalance: () => void;
}

export const useUserInfoStore = create<UserInfoState>((set, get) => ({
  userName: 'Kim Kardasham',
  avatarUrl: 'https://d121vty759npai.cloudfront.net/images/648715e6e5df45a7b284d52e487b01f4.jpeg',
  level: 2,
  profitPerHour: 3600,
  coinBalance: 189809,
  profitPerSecond: 3600 / SECONDS_PER_HOUR,
  rewardPoints: 5000, // 初始化 rewardPoints
  intervalId: null,

  setUserInfo: (info) => {
    set((state) => {
      const updatedState = { ...state, ...info };

      if (info.profitPerHour !== undefined) {
        updatedState.profitPerSecond = updatedState.profitPerHour / SECONDS_PER_HOUR;
      }

      return updatedState;
    });
  },

  updateProfitPerHour: (increment: number, cost: number) => {
    const { profitPerHour, coinBalance, stopProfitPerSecond, startProfitPerSecond } = get();

    if (coinBalance >= cost) {
      const newProfitPerHour = profitPerHour + increment;
      const newProfitPerSecond = newProfitPerHour / SECONDS_PER_HOUR;

      stopProfitPerSecond();

      set((state) => ({
        profitPerHour: newProfitPerHour,
        profitPerSecond: newProfitPerSecond,
        coinBalance: state.coinBalance - cost,
      }));

      startProfitPerSecond();
    } else {
      console.warn('Insufficient coin balance to increase profit per hour.');
    }
  },

  startProfitPerSecond: () => {
    const { profitPerSecond } = get();

    const intervalId = setInterval(() => {
      set((state) => ({
        coinBalance: state.coinBalance + profitPerSecond,
      }));
    }, 1000);

    set({ intervalId });
  },

  stopProfitPerSecond: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
      set({ intervalId: null });
    }
  },

  syncCoinBalance: async () => {
    const { coinBalance } = get();
    console.log('🚀 ~ syncCoinBalance: ~ coinBalance:', coinBalance);

    // try {
    //   // 调用后端API同步 coinBalance，这里用 fetch 作为示例
    //   await fetch('/api/sync-coin-balance', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ coinBalance }),
    //   });
    // } catch (error) {
    //   console.error('Failed to sync coin balance:', error);
    // }
  },
}));

export const useStartProfitPerSecond = () => {
  const { startProfitPerSecond, stopProfitPerSecond, syncCoinBalance } = useUserInfoStore();

  useEffect(() => {
    startProfitPerSecond();

    // 设置每 SYNC_INTERVAL_MS 同步一次coinBalance
    const syncInterval = setInterval(syncCoinBalance, SYNC_INTERVAL_MS);

    return () => {
      stopProfitPerSecond();
      clearInterval(syncInterval);
    };
  }, [startProfitPerSecond, stopProfitPerSecond, syncCoinBalance]);
};
