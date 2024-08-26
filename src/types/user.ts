import { UserTaskTypeEnum } from '@/enums';
import { IAuth } from './character';
import { ILevel } from './user-level';

export interface IUserProfile {
  auth?: IAuth;
  profile_img_url?: string;
  user_name?: string;
  user_id?: string;
  twitter_name?: string;
  holder_value?: string;
  invite_code?: string;
  level?: number;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

export interface IUserBoost {
  boost: number;
  daily_boost: number;
  daily_energy: number;
  energy: number;
  [key: string]: any;
}

export interface IUserWallet {
  cai: number;
  [key: string]: any;
}

export type ILevelConfig = Record<
  number,
  {
    reward_num: number;
    plus_reward_num: number;
    time: number;
    required_invite: number;
    required_cai: number;
  }
>;

export type IUserTaskData = {
  type: UserTaskTypeEnum;
  status: number;
};

export type IAppUserData = {
  isAuthedTwitter: number;
  twitterName: string;
  username: string;
  cai: string;
  isAuthedTg: string;
};
export interface IUserInfoData {
  user: IUserProfile;
  wallet: IUserWallet;
  level_config: ILevelConfig;
  referral_count: number;
  booster: string;
  today_reward: number;
  app_user: IAppUserData;
}

export interface IUserBoostData {
  time_left: number;
  user_booster: IUserBoost;
}

export interface IUserBoostParams {
  type?: 'daily';
}

export interface IUserEmailParams {
  email: string;
  check_user: number;
}

export interface IUserBindParams {
  email: string;
  code: string;
}

export interface IUserActiveParams {
  touch: boolean;
}

export interface ITokenData {
  accessToken: string; // 认证 token
  tokenType: string; // token 类型
  expiresIn: number; // 过期时间，单位为秒
  expiresAt: string; // 过期时间戳，ISO 字符串格式
  refreshToken: string; // 刷新 token
  refreshTokenExpiresAt: string; // 刷新 token 的过期时间
}

export interface IAppConfig {
  levels: ILevel[];
}

export interface IUserInfo {
  userName: string;
  avatar: string;
  level: number;
  profitPerHour: number;
  totalPoints: number;
  inviteCode: string;
  profitPerSecond: number;
  rewardPoints: number; // 积分
  invites: number; // 邀请人数
}
