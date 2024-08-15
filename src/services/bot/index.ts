import { API_BOT_AUTH_USER } from '@/constants';
import { BotAuthUserApiParams } from '@/types';
import { apiService } from '../request';

export const botAuthUserApi = (params: BotAuthUserApiParams & Record<string, unknown>) => {
  return apiService.post({
    apiName: API_BOT_AUTH_USER,
    params,
  });
};
