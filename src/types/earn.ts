export type ITaskStatus = 'pending' | 'inProgress' | 'completed';
export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
  reward: number;
  actionText: string;
  checkActionText: string;
  completeActionText: string;
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
  dailyReward: IDailyReward;
  specialTasks: ITask[];
  tasks: ITask[];
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

type UpdatePayloadMap = {
  dailyReward: Partial<IDailyReward>;
  specialTasks: Partial<ITask> | ITask;
  tasks: Partial<ITask> | ITask;
};

export type UpdatePayload<T extends IEarnDataType> = UpdatePayloadMap[T];
