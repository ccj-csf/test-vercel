export interface IResponseWrapper<T = unknown> {
  code: number;
  data?: T;
  msg?: string;
  success?: boolean;
  err_msg?: string;
}

export interface IFetchDataListResult<T> {
  items: T[];
  has_more?: number;
  page?: number;
  [key: string]: any;
}

export interface IRequestWrapper<T = unknown> {
  data?: T;
}

export interface IScrollItem {
  id?: string;
  img_link?: string;
  creator?: string;
  name?: string;
  creator_id?: string;
  holder?: number;
  price?: number;
}

export type IScrollItemDataListResult<T = IScrollItem> = IFetchDataListResult<T>;

export interface ISong {
  id: string;
  title: string;
  cover: string;
  style: string;
  desc: string;
  lyrics: string;
  sourceUrl: string;
  artist: string;
}
