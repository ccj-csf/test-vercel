import { API_TG_APP_TASK } from '@/constants';
import { IResponseWrapper } from '@/types';
import { IAppTaskData } from '@/types/app';
import { chxApiService } from '../request';

export const getTgAppTaskApi = () => {
  return chxApiService.get<IResponseWrapper<IAppTaskData>>({
    apiName: API_TG_APP_TASK,
  });
};

export const tgAppTaskApi = () => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_APP_TASK,
  });
};
