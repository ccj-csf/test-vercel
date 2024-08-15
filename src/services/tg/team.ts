import { API_TG_TEAM_MINING } from '@/constants';
import { IResponseWrapper, ITeamMiningData } from '@/types';
import { chxApiService } from '../request';

export const getTgTeamMiningApi = () => {
  return chxApiService.get<IResponseWrapper<ITeamMiningData>>({
    apiName: API_TG_TEAM_MINING,
  });
};

export const tgTeamMiningApi = () => {
  return chxApiService.post<
    IResponseWrapper<{
      refresh_ts: number;
      time_left: number;
    }>
  >({
    apiName: API_TG_TEAM_MINING,
  });
};
