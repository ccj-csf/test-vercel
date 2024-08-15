export interface IWebAppInitData {
  auth_date: string;
  chat_instance: string;
  chat_type: string;
  hash: string;
  start_param?: string;
  user: {
    allows_write_to_pm: boolean;
    first_name: string;
    id: number;
    language_code: string;
    last_name: string;
    username: string;
  };
}

export interface ITeamMiningData {
  base_booster: number;
  booster: string;
  team_booster: string;
  time_left: number;
}

export interface ITgAuthParams {
  chat_id: string;
}
