export interface BotAuthUserApiParams {
  authDataStr: string;
}

export interface BotAuthUserApiData {
  tgUser: {
    id: number;
    username: string;
  };
}
