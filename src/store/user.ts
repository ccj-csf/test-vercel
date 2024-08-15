import {
  LOCAL_STORAGE_APP_USER,
  LOCAL_STORAGE_BOOSTER,
  LOCAL_STORAGE_CAI,
  LOCAL_STORAGE_DAILY_ENERGY,
  LOCAL_STORAGE_LEVEL_CONFIG,
  LOCAL_STORAGE_REFERRAL_COUNT,
  LOCAL_STORAGE_TODAY_REWARD,
  LOCAL_STORAGE_USER_WALLET,
} from '@/constants';
import { IAppUserData, ILevelConfig, IUserProfile, IUserWallet } from '@/types';
import { Auth } from '@/utils';
import store from 'store2';
import { create } from 'zustand';

interface State {
  userProfile: IUserProfile;
  appUser: IAppUserData;
  isLogin: boolean;
  userWallet: IUserWallet;
  levelConfig: ILevelConfig;
  refferalCount: number;
  todayReward: number;
  booster: string;
  cai: number;
  dailyEnergy: number;
}

interface Action {
  setUserProfile: (userProfile: IUserProfile) => void;
  setAppUser: (appUser: IAppUserData) => void;
  setIsLogin: (token: boolean) => void;

  setUserWallet: (wallet: IUserWallet) => void;
  setLevelConfig: (levelConfig: ILevelConfig) => void;
  setRefferalCount: (refferalCount: number) => void;
  setTodayReward: (todayReward: number) => void;
  setBooster: (booster: string) => void;
  setCai: (cai: number) => void;
  addCai: () => void;
  setDailyEnergy: (energy: number) => void;
  decreaseDailyEnergy: (energy: number) => void;
}

const useUserStore = create<State & Action>((set) => ({
  userProfile: Auth.getProfile(),
  setUserProfile: (userProfile: IUserProfile) => {
    set({ userProfile });
    Auth.setProfile(userProfile);
  },
  appUser: store(LOCAL_STORAGE_APP_USER) || {},
  setAppUser: (appUser: IAppUserData) => {
    set({ appUser });
    store(LOCAL_STORAGE_APP_USER, appUser);
  },
  isLogin: false,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  levelConfig: store(LOCAL_STORAGE_LEVEL_CONFIG) || {
    '1': {
      reward_num: 0,
      time: 15,
      required_cai: 0,
      required_invite: 0,
    },
    '2': {
      reward_num: 500,
      plus_reward_num: 5000,
      time: 12,
      required_cai: 1000,
      required_invite: 2,
    },
    '3': {
      reward_num: 1000,
      plus_reward_num: 10000,
      time: 10,
      required_cai: 5000,
      required_invite: 5,
    },
    '4': {
      reward_num: 2000,
      plus_reward_num: 20000,
      time: 8,
      required_cai: 25000,
      required_invite: 10,
    },
    '5': {
      reward_num: 4000,
      plus_reward_num: 40000,
      time: 6,
      required_cai: 100000,
      required_invite: 20,
    },
    '6': {
      reward_num: 6000,
      plus_reward_num: 60000,
      time: 5,
      required_cai: 150000,
      required_invite: 25,
    },
    '7': {
      reward_num: 9000,
      plus_reward_num: 90000,
      time: 3,
      required_cai: 300000,
      required_invite: 50,
    },
    '8': {
      reward_num: 15000,
      plus_reward_num: 150000,
      time: 1,
      required_cai: 500000,
      required_invite: 80,
    },
    '9': {
      reward_num: 30000,
      plus_reward_num: 300000,
      time: 0.5,
      required_cai: 1000000,
      required_invite: 100,
    },
  },
  setLevelConfig: (levelConfig: ILevelConfig) => {
    set({ levelConfig });
    store(LOCAL_STORAGE_LEVEL_CONFIG, levelConfig);
  },
  userWallet: store(LOCAL_STORAGE_USER_WALLET) || {
    cai: 0,
  },
  setUserWallet: (wallet: IUserWallet) => {
    set({ userWallet: wallet });
    store(LOCAL_STORAGE_USER_WALLET, wallet);
  },
  refferalCount: store(LOCAL_STORAGE_REFERRAL_COUNT) || 0,
  setRefferalCount: (refferalCount: number) => {
    set({ refferalCount });
    store(LOCAL_STORAGE_REFERRAL_COUNT, refferalCount);
  },
  todayReward: store(LOCAL_STORAGE_TODAY_REWARD) || '0.00',
  setTodayReward: (todayReward: number) => {
    set({ todayReward });
    store(LOCAL_STORAGE_TODAY_REWARD, todayReward);
  },
  booster: store(LOCAL_STORAGE_BOOSTER) || 0,
  setBooster: (booster: string) => {
    set({ booster });
    store(LOCAL_STORAGE_BOOSTER, booster);
  },
  cai: store(LOCAL_STORAGE_CAI) || 0,
  setCai: (cai: number) => {
    set({ cai });
    store(LOCAL_STORAGE_CAI, cai);
  },
  addCai: () => {
    set((state) => {
      const data = state.cai + 1;
      store(LOCAL_STORAGE_CAI, data);
      return {
        cai: data,
      };
    });
  },
  dailyEnergy: store(LOCAL_STORAGE_DAILY_ENERGY) || 0,
  setDailyEnergy: (dailyEnergy: number) => {
    set({ dailyEnergy });
    store(LOCAL_STORAGE_DAILY_ENERGY, dailyEnergy);
  },
  decreaseDailyEnergy: (dailyEnergy: number) => {
    set((state) => {
      const data = state.dailyEnergy - dailyEnergy;
      store(LOCAL_STORAGE_DAILY_ENERGY, data);
      return {
        dailyEnergy: data,
      };
    });
  },
}));

export { useUserStore };
