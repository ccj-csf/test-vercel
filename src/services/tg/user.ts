import {
  API_TG_USER_ACTIVE,
  API_TG_USER_BIND,
  API_TG_USER_BOOST,
  API_TG_USER_ENERGY,
  API_TG_USER_INFO,
  API_TG_USER_LOGIN,
  API_TG_USER_TASK,
} from '@/constants';
import {
  IResponseWrapper,
  IUserActiveParams,
  IUserBindParams,
  IUserBoostData,
  IUserBoostParams,
  IUserInfoData,
  IUserProfile,
  IUserTaskData,
  IWebAppInitData,
} from '@/types';
import { chxApiService } from '../request';

export const tgUserLoginApi = (
  params: IWebAppInitData & {
    invite_code?: string;
  },
) => {
  return chxApiService.post<
    IResponseWrapper<{
      new_user: number;
      access_token: string;
      profile: IUserProfile;
    }>
  >({
    apiName: API_TG_USER_LOGIN,
    params: {
      data: {
        ...params,
        dev: process.env.NODE_ENV === 'development' ? true : false,
      },
    },
    abort: true,
  });
};

export const tgUserActiveApi = (params: IUserActiveParams) => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_USER_ACTIVE,
    params: {
      data: params,
    },
  });
};

export const getTgUserBoostApi = () => {
  return chxApiService.get<IResponseWrapper<IUserBoostData>>({
    apiName: API_TG_USER_BOOST,
  });
};

// 消耗，加速
export const tgUserBoostApi = (params: IUserBoostParams = {}) => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_USER_BOOST,
    params: {
      data: params,
    },
  });
};

// 消耗能量，补充时间
export const tgUserEnergyApi = () => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_USER_ENERGY,
  });
};

export const getTgUserInfoApi = () => {
  return chxApiService.get<IResponseWrapper<IUserInfoData>>({
    apiName: API_TG_USER_INFO,
  });
};

export const getTgUserTaskApi = () => {
  return chxApiService.get<IResponseWrapper<IUserTaskData[]>>({
    apiName: API_TG_USER_TASK,
  });
};

export const tgUserBindApi = (params: IUserBindParams) => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_USER_BIND,
    params: {
      data: params,
    },
  });
};
