import { IAppConfig } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppConfigState {
  config: IAppConfig | null;
  setConfig: (config: IAppConfig) => void;
}

export const useAppConfigStore = create<AppConfigState>()(
  persist(
    (set) => ({
      config: null,
      setConfig: (config) => set({ config }),
    }),
    {
      name: 'app-config-storage',
    },
  ),
);
