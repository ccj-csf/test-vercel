import { API_GPTX_AUTH_TWITTER_URL } from '@/constants';
import { IResponseWrapper } from '@/types';
import { chxGptxApiService } from '../request';

export const getTwitterAuthUrlApi = () => {
  return chxGptxApiService.get<
    IResponseWrapper<{
      auth_url: string;
    }>
  >({
    apiName: API_GPTX_AUTH_TWITTER_URL,
  });
};
