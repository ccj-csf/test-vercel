export type ITaskStatus = 'pending' | 'inProgress' | 'completed';
export type ITaskType =
  | 'downloadApp'
  | 'joinTelegram'
  | 'followOnX'
  | 'subscribeYouTube'
  | 'inviteFriends'
  | 'dailyReward';

// 定义每种任务类型的相关信息
export interface ITaskConfig {
  actionText: string;
  checkActionText?: string;
  link?: string;
  iconPath: string;
  action?: () => void;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  icon?: string;
  reward: number;
  actionText?: string;
  checkActionText?: string;
  completeActionText?: string;
  type: ITaskType;
  status: ITaskStatus;
}
export type IEarnPopupType = 'taskDetail' | 'rewardDetail';

export interface IDailyReward {
  currentStreak: number;
  lastClaimDate: string;
  rewardDays: number[];
  totalRewards: number;
}

export interface IEarnData {
  dailyTasks: ITask[];
  specialTasks: ITask[];
  tasks: ITask[];
  dailySigns: IDailySignData[];
}

export interface UpdateDailyRewardData {
  currentStreak: number;
  newLastClaimDate: string;
  todayReward: number;
}

export interface UpdateTaskData {
  taskId: string;
  updates: Partial<ITask>;
}

export interface UpdateSpecialTaskData {
  taskId: string;
  updates: Partial<ITask>;
}

export type IEarnDataType = 'dailyReward' | 'specialTasks' | 'tasks';

export interface IDailySignData {
  date: string; // 日期（精确到天）
  timeStamp: number; // 时间戳 (UTC 时间)
  points: number; // 奖励积分
  signed: boolean; // 是否已签到
}

type UpdatePayloadMap = {
  dailyReward: Partial<IDailyReward>;
  specialTasks: Partial<ITask> | ITask;
  tasks: Partial<ITask> | ITask;
};

export type UpdatePayload<T extends IEarnDataType> = UpdatePayloadMap[T];
