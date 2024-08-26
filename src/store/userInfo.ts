import { getUserTotalPoints } from '@/services';
import { IUserInfo } from '@/types';
import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const SECONDS_PER_HOUR = 3600;
const SYNC_INTERVAL_MS = 60 * 1000; // 同步间隔（毫秒）

interface UserInfoState extends IUserInfo {
  intervalId: NodeJS.Timeout | null;
  setUserInfo: (info: Partial<IUserInfo>) => void;
  updateProfitPerHour: (increment: number, cost: number) => void;
  startProfitPerSecond: () => void;
  stopProfitPerSecond: () => void;
  syncTotalPoints: () => void;
}

export const useUserInfoStore = create<UserInfoState>()(
  persist(
    (set, get) => ({
      userName: '',
      avatar: '',
      level: 0,
      profitPerHour: 0,
      totalPoints: 0,
      profitPerSecond: 3600 / SECONDS_PER_HOUR,
      rewardPoints: 0,
      invites: 0,
      intervalId: null,
      inviteCode: '',

      setUserInfo: (info) => {
        set((state) => {
          const updatedState = { ...state, ...info };

          if (info.profitPerHour !== undefined) {
            updatedState.profitPerSecond = updatedState.profitPerHour / SECONDS_PER_HOUR;
          }

          return updatedState;
        });
      },

      updateProfitPerHour: (increment, cost) => {
        const { profitPerHour, totalPoints, stopProfitPerSecond, startProfitPerSecond } = get();

        if (totalPoints >= cost) {
          const newProfitPerHour = profitPerHour + increment;
          const newProfitPerSecond = newProfitPerHour / SECONDS_PER_HOUR;

          stopProfitPerSecond();

          set((state) => ({
            profitPerHour: newProfitPerHour,
            profitPerSecond: newProfitPerSecond,
            totalPoints: state.totalPoints - cost,
          }));

          startProfitPerSecond();
        } else {
          console.warn('Insufficient total points to increase profit per hour.');
        }
      },

      startProfitPerSecond: () => {
        const { profitPerSecond } = get();

        const intervalId = setInterval(() => {
          set((state) => ({
            totalPoints: state.totalPoints + profitPerSecond,
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

      syncTotalPoints: async () => {
        try {
          // 调用后端API同步 totalPoints
          const res = await getUserTotalPoints();

          if (res?.data) {
            set({ totalPoints: res.data.totalPoints });
            console.log('Total points synced successfully:', res.data.totalPoints);
          }
        } catch (error) {
          console.error('Failed to sync total points:', error);
        }
      },
    }),
    {
      name: 'user-info-storage', // 存储在 localStorage 中的 key 名称
      partialize: (state) =>
        ({
          userName: state.userName,
          avatar: state.avatar,
          level: state.level,
          profitPerHour: state.profitPerHour,
          totalPoints: state.totalPoints,
          rewardPoints: state.rewardPoints,
          invites: state.invites,
          inviteCode: state.inviteCode,
        }) as UserInfoState, // 指定需要持久化的字段
    },
  ),
);

export const useStartProfitPerSecond = () => {
  const { startProfitPerSecond, stopProfitPerSecond, syncTotalPoints } = useUserInfoStore();

  useEffect(() => {
    startProfitPerSecond();

    // 设置每 SYNC_INTERVAL_MS 同步一次 totalPoints
    const syncInterval = setInterval(syncTotalPoints, SYNC_INTERVAL_MS);

    return () => {
      stopProfitPerSecond();
      clearInterval(syncInterval);
    };
  }, [startProfitPerSecond, stopProfitPerSecond, syncTotalPoints]);
};
