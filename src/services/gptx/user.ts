import { API_GPTX_USER_EMAIL } from '@/constants';
import { IResponseWrapper, IUserEmailParams } from '@/types';
import { chxGptxApiService } from '../request';

export const gptxUserEmailApi = (params: IUserEmailParams) => {
  return chxGptxApiService.post<IResponseWrapper<{}>>({
    apiName: API_GPTX_USER_EMAIL,
    params: {
      data: params,
    },
  });
};
