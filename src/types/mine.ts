export interface ICardItem {
  id: string;
  name: string;
  icon: string;
  level: number;
  profitPerHour: number;
  upgradeCost: number;
  isLocked: boolean;
  unlockRequirement: string;
  maxLevel?: number; // 可选，表示最大等级
  description: string; // 可选，表示卡片描述
  nextLevelProfitPerHour: number;
}

export interface IMineData {
  items: ICardItem[];
}

export type IMineDataType = 'Instruments' | 'Styles';
