import { ITask } from '@/types';

// Special任务的数据
export const specialTasks: ITask[] = [
  {
    id: 'special-1',
    title: 'Download App and rate us 5 stars!',
    description: 'AI-Powered Music App at Your Fingertips',
    reward: 100000,
    type: 'downloadApp',
    status: 'pending',
  },
];

// 常规任务的默认数据
export const tasks: ITask[] = [
  {
    id: 'task-1',
    title: 'Join Telegram Group',
    description: '',
    reward: 50000,
    type: 'joinTelegram',
    status: 'pending',
  },
  {
    id: 'task-4',
    title: 'Follow us on X',
    description: '',
    type: 'followOnX',
    reward: 100000,
    status: 'pending',
  },
  {
    id: 'task-2',
    title: 'Subscribe our YouTube channel',
    description: '',
    type: 'subscribeYouTube',
    reward: 75000,
    status: 'pending',
  },
  {
    id: 'task-3',
    title: 'Invite 3 friends',
    description: '',
    type: 'inviteFriends',
    reward: 100000,
    status: 'pending',
  },
];

export const dailyRewards: ITask[] = [
  {
    id: 'daily-1',
    title: 'Daily Reward',
    description: 'Get WAV Points for daily login without skipping.',
    type: 'dailyReward',
    reward: 70000,
    status: 'pending',
  },
];

export const mockDailySigns = [
  {
    date: '2024-08-20',
    timeStamp: 1724179200000,
    points: 100000,
    signed: true,
  },
  {
    date: '2024-08-21',
    timeStamp: 1724265600000,
    points: 500000,
    signed: true,
  },
  {
    date: '2024-08-22',
    timeStamp: 1724352000000,
    points: 1000000,
    signed: true,
  },
  {
    date: '2024-08-23',
    timeStamp: 1724438400000,
    points: 5000000,
    signed: false, // 今天还未签到
  },
  {
    date: '2024-08-24',
    timeStamp: 1724524800000,
    points: 10000000,
    signed: false,
  },
  {
    date: '2024-08-25',
    timeStamp: 1724611200000,
    points: 50000000,
    signed: false,
  },
  {
    date: '2024-08-26',
    timeStamp: 1724697600000,
    points: 100000000,
    signed: false,
  },
  {
    date: '2024-08-27',
    timeStamp: 1724784000000,
    points: 500000000,
    signed: false,
  },
  {
    date: '2024-08-28',
    timeStamp: 1724870400000,
    points: 1000000000,
    signed: false,
  },
  {
    date: '2024-08-29',
    timeStamp: 1724956800000,
    points: 5000000000,
    signed: false,
  },
];
