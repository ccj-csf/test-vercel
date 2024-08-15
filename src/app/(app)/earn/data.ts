import { IDailyReward, ITask } from '@/types';

// Special任务的数据
export const specialTasks: ITask[] = [
  {
    id: 'special-1',
    title: 'Download App and rate us 5 stars!',
    description: 'AI-Powered Music App at Your Fingertips',
    completed: false,
    icon: 'logo.svg',
    reward: 100000,
    actionText: 'Download the App',
    checkActionText: 'Check',
    completeActionText: 'Download the App',
    status: 'pending',
  },
];

// 常规任务的默认数据
export const tasks: ITask[] = [
  {
    id: 'task-1',
    title: 'Join Telegram Group',
    description: '',
    completed: false,
    icon: 'telegram',
    reward: 50000,
    actionText: 'Join Group',
    checkActionText: 'Check',
    completeActionText: 'Joined Group',
    status: 'pending',
  },
  {
    id: 'task-4',
    title: 'Follow us on X',
    description: '',
    completed: false,
    icon: 'x',
    reward: 100000,
    actionText: 'Follow',
    checkActionText: 'Check',
    completeActionText: 'Followed',
    status: 'pending',
  },
  {
    id: 'task-2',
    title: 'Subscribe our YouTube channel',
    description: '',
    completed: false,
    icon: 'youtube',
    reward: 75000,
    actionText: 'Subscribe',
    checkActionText: 'Check',
    completeActionText: 'Subscribed',
    status: 'pending',
  },
  {
    id: 'task-3',
    title: 'Invite 3 friends',
    description: '',
    completed: false,
    icon: 'friends-plus',
    reward: 100000,
    actionText: 'Invite 3 Friends',
    checkActionText: 'Check',
    completeActionText: 'Invited',
    status: 'pending',
  },
];

// DailyReward 的数据结构

// 默认 DailyReward 的数据
export const dailyReward: IDailyReward = {
  currentStreak: 3,
  lastClaimDate: '2024-08-09T06:57:59.999Z',
  rewardDays: [500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000],
  totalRewards: 70000,
};
