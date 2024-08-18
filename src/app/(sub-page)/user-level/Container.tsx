'use client';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Leaderboard from './components/Leaderboard';
import LevelConditions from './components/LevelConditions';
import LevelSelector, { ILevelNumber } from './components/LevelSelector';
import UserCard from './components/UserCard';

export interface ILevel {
  level: ILevelNumber;
  name: string;
  points: number;
  invites: number;
}

export interface IUser {
  username: string;
  points: number;
  isCurrentUser: boolean;
  avatarUrl: string;
}

interface IState {
  currentLevel: number | null;
  leaderboardData: { [key: number]: IUser[] };
  userCardData: IUser | null;
}

interface IAction {
  type: 'SET_CURRENT_LEVEL' | 'SET_LEADERBOARD_DATA' | 'SET_USER_CARD_DATA';
  level?: number;
  data?: IUser[] | IUser | null;
}

// 等级数据
const levels: ILevel[] = [
  { level: 1, name: 'Beginner Beat', points: 5000, invites: 1 },
  { level: 2, name: 'Basic Note', points: 30000, invites: 3 },
  { level: 3, name: 'Junior Jammer', points: 100000, invites: 5 },
  { level: 4, name: 'Rhythm Rookie', points: 1000000, invites: 7 },
  { level: 5, name: 'Melody Mover', points: 2000000, invites: 10 },
  { level: 6, name: 'Tune Tracker', points: 10000000, invites: 12 },
  { level: 7, name: 'Song Shaper', points: 50000000, invites: 15 },
  { level: 8, name: 'Harmony Hero', points: 100000000, invites: 18 },
  { level: 9, name: 'Music Master', points: 500000000, invites: 20 },
  { level: 10, name: 'Sound Superstar', points: 1000000000, invites: 30 },
];

// 初始状态
const initialState: IState = {
  currentLevel: null,
  leaderboardData: {},
  userCardData: null,
};

// 缓存和状态管理
const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_CURRENT_LEVEL':
      return { ...state, currentLevel: action.level || null };
    case 'SET_LEADERBOARD_DATA':
      return {
        ...state,
        leaderboardData: {
          ...state.leaderboardData,
          [action.level!]: action.data as IUser[],
        },
      };
    case 'SET_USER_CARD_DATA':
      return { ...state, userCardData: action.data as IUser };
    default:
      return state;
  }
};

const Container: React.FC<{ userLevel: number }> = ({ userLevel }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 当前等级索引
  const [currentIndex, setCurrentIndex] = useState(() =>
    levels.findIndex((level) => level.level === userLevel),
  );

  const fetchLeaderboardData = useCallback(
    async (level: number) => {
      // 如果缓存中有数据，直接使用
      if (state.leaderboardData[level]) return;

      // 模拟异步请求
      const data = await fakeFetchLeaderboard(level);
      dispatch({ type: 'SET_LEADERBOARD_DATA', level, data });

      // 如果是当前用户等级，设置用户卡片数据
      if (level === userLevel) {
        const userCardData = (data as IUser[]).find((user) => user.isCurrentUser) || null;
        dispatch({ type: 'SET_USER_CARD_DATA', data: userCardData });
      }
    },
    [state.leaderboardData, userLevel],
  );

  useEffect(() => {
    // 在组件初始化时设置 currentIndex，并加载用户等级的数据
    fetchLeaderboardData(levels[currentIndex].level);
  }, [fetchLeaderboardData, currentIndex]);

  const handleNextLevel = () => {
    if (currentIndex < levels.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      fetchLeaderboardData(levels[nextIndex].level);
    }
  };

  const handlePrevLevel = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      fetchLeaderboardData(levels[prevIndex].level);
    }
  };

  return (
    <div className="level-display">
      <LevelSelector
        currentLevel={levels[currentIndex]}
        onPrevLevel={handlePrevLevel}
        onNextLevel={handleNextLevel}
      />
      <LevelConditions level={levels[currentIndex]} />
      <Leaderboard data={state.leaderboardData[levels[currentIndex].level]} />
      {state.userCardData && <UserCard data={state.userCardData} />}
    </div>
  );
};

// 模拟数据请求
const fakeFetchLeaderboard = (level: number): Promise<IUser[]> => {
  const usernames = [
    ['Goloust', 'Neil', 'Wnageb', 'Steve Ater', 'Kim'],
    ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'],
    ['Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'],
    ['Mallory', 'Niaj', 'Oscar', 'Peggy', 'Quentin'],
    ['Romeo', 'Sybil', 'Trent', 'Uma', 'Victor'],
    ['Walter', 'Xena', 'Yves', 'Zara', 'Aria'],
    ['Blake', 'Caleb', 'Dylan', 'Eli', 'Fiona'],
    ['Gina', 'Harry', 'Isla', 'Jack', 'Kara'],
    ['Liam', 'Mia', 'Nina', 'Omar', 'Pia'],
    ['Quinn', 'Rhea', 'Sara', 'Theo', 'Uma'],
  ];

  const userData = usernames[level - 1].map((username, index) => ({
    username,
    points: Math.floor(Math.random() * 10000), // 随机分数
    isCurrentUser: index === 0, // 假设第一个用户是当前用户
    avatarUrl: 'https://d121vty759npai.cloudfront.net/images/648715e6e5df45a7b284d52e487b01f4.jpeg',
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });
};

export default Container;
