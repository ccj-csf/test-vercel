import { API_TG_AUTH } from '@/constants';
import { IResponseWrapper } from '@/types';
import { chxApiService } from '../request';

// @TODOS
export const tgAuthApi = () => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_AUTH,
    params: {
      data: {
        chat_id: -1002237219498,
      },
    },
  });
};
