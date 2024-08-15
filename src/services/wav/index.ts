import { API_EARN, API_FRIENDS, API_MINE } from '@/constants';
import {
  IDailyReward,
  IEarnData,
  IEarnDataType,
  IFriendsData,
  IMineData,
  IMineDataType,
  IResponseWrapper,
  ITask,
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
