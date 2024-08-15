import { API_EXAMPLE_GET, API_EXAMPLE_POST, API_EXAMPLE__LIST_GET } from '@/constants';
import { IResponseWrapper, IScrollItemDataListResult } from '@/types';
import { apiService } from './request';

export const getExample = (params: { example: string }) => {
  return apiService.get<IResponseWrapper>({
    apiName: API_EXAMPLE_GET,
    params,
  });
};

export const postExample = (params: { example: string }) => {
  return apiService.post<{
    example: string;
  }>({
    apiName: API_EXAMPLE_POST,
    params,
  });
};

// 请求测试滚动列表数据
export const getExampleList = (params: Partial<{ page: number; limit: number }>) => {
  return apiService.get<IScrollItemDataListResult>({
    apiName: API_EXAMPLE__LIST_GET,
    params,
  });
};
