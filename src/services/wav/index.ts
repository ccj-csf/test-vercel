import {
  API_APP_ALIVE,
  API_APP_CONFIG,
  API_APP_MUSIC,
  API_EARN,
  API_FRIENDS,
  API_LOGIN,
  API_MINE,
  API_USER_INFO,
  API_USER_LEVEL,
  API_USER_POINTS,
} from '@/constants';
import {
  IAppConfig,
  IDailyReward,
  IEarnData,
  IEarnDataType,
  IFriendsData,
  ILevelNumber,
  IMineData,
  IMineDataType,
  IResponseWrapper,
  ISong,
  ITask,
  ITokenData,
  IUserInfo,
  IUserLevel,
  UpdatePayload,
} from '@/types';
import { apiService } from '../request';

// 获取earn数据
export const getEarnData = () => {
  return apiService.get<IResponseWrapper<IEarnData>>({
    apiName: API_EARN,
  });
};

export const updateEarnData = <T extends IEarnDataType>(params: {
  type: T;
  data: UpdatePayload<T>;
}): Promise<IResponseWrapper<IDailyReward | ITask[]>> => {
  return apiService.post<IResponseWrapper<IDailyReward | ITask[]>>({
    apiName: API_EARN,
    params,
  });
};

export const getMineData = (params: { type: IMineDataType }) => {
  return apiService.get<IResponseWrapper<IMineData>>({
    apiName: API_MINE,
    params,
  });
};

export const getFriendsData = () => {
  return apiService.get<IResponseWrapper<IFriendsData>>({
    apiName: API_FRIENDS,
  });
};

// 获取userLevel数据
export const getUserLevelData = (params: { level: ILevelNumber }) => {
  return apiService.get<IResponseWrapper<IUserLevel[]>>({
    apiName: API_USER_LEVEL,
    params,
  });
};

export const login = (params: {
  initRawData: string;
  inviteCode: string;
}): Promise<IResponseWrapper<ITokenData>> => {
  return apiService.post<IResponseWrapper<ITokenData>>({
    apiName: API_LOGIN,
    params,
  });
};

export const getAppConfig = () => {
  return apiService.get<IResponseWrapper<IAppConfig>>({
    apiName: API_APP_CONFIG,
  });
};

export const getAppMusic = () => {
  return apiService.get<IResponseWrapper<ISong[]>>({
    apiName: API_APP_MUSIC,
  });
};

export const getUserInfo = () => {
  return apiService.get<IResponseWrapper<IUserInfo>>({
    apiName: API_USER_INFO,
  });
};

export const sendAppHeartbeat = () => {
  return apiService.put<IResponseWrapper<null>>({
    apiName: API_APP_ALIVE,
  });
};

export const getUserTotalPoints = () => {
  return apiService.get<
    IResponseWrapper<{
      timestamp: string;
      userId: string;
      totalPoints: number;
    }>
  >({
    apiName: API_USER_POINTS,
  });
};
