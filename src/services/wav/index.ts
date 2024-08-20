import { API_EARN, API_FRIENDS, API_MINE, API_USER_LEVEL } from '@/constants';
import {
  IDailyReward,
  IEarnData,
  IEarnDataType,
  IFriendsData,
  ILevelNumber,
  IMineData,
  IMineDataType,
  IResponseWrapper,
  ITask,
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
