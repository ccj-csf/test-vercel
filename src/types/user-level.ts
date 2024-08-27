export type ILevelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ILevel {
  level: ILevelNumber;
  name: string;
  points: number;
  invites: number;
}

export interface IUserLevel {
  name: string;
  totalPoints: number;
  isCurrentUser: boolean;
  avatar: string;
  rank: number;
}
export interface IUserLevelResponse {
  level: ILevel;
  users: IUserLevel[];
}
