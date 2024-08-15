import { API_CHARACTER_LIST, API_CHARACTER_PROFILE } from '@/constants';
import {
  ICharacterItem,
  IFetchCharacterDataListResult,
  IPlotCard,
  IResponseWrapper,
} from '@/types';
import { chxGptxApiService } from '../request';

export const characterListApi = (
  params: Partial<{
    tag_id: string;
    content_level: number;
    search_name: string;
    page: number;
  }>,
) => {
  return chxGptxApiService.get<IResponseWrapper<IFetchCharacterDataListResult>>({
    apiName: API_CHARACTER_LIST,
    params,
  });
};

export const getCharacterProfileApi = (params: { character_id: number }) => {
  return chxGptxApiService.get<
    IResponseWrapper<{
      character: ICharacterItem;
      plot_cards: IPlotCard[];
    }>
  >({
    apiName: API_CHARACTER_PROFILE,
    params,
  });
};
