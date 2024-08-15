export interface IFriend {
  name: string;
  avatar: string;
  level: number;
  reward: number;
}

export interface IBonus {
  level: number;
  reward: number;
}

export interface IFriendsData {
  friends: IFriend[];
  bonuses: IBonus[];
}
