export interface IAppTaskItem {
  status: number;
}
export interface IAppTaskData {
  app_user?: {};
  dc?: IAppTaskItem;
  twitter?: IAppTaskItem;
  tg?: IAppTaskItem;
}
