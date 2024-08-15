import { API_TG_REFERRAL_CODE, API_TG_REFERRAL_DETAIL, API_TG_REFERRAL_LIST } from '@/constants';
import { IRefferalListData, IResponseWrapper } from '@/types';
import { chxApiService } from '../request';

export const getTgReferralDetailApi = () => {
  return chxApiService.get<IResponseWrapper<{}>>({
    apiName: API_TG_REFERRAL_DETAIL,
  });
};

export const getTgReferralListApi = () => {
  return chxApiService.get<IResponseWrapper<IRefferalListData>>({
    apiName: API_TG_REFERRAL_LIST,
  });
};

export const tgReferralCodeApi = () => {
  return chxApiService.post<IResponseWrapper<{}>>({
    apiName: API_TG_REFERRAL_CODE,
  });
};
