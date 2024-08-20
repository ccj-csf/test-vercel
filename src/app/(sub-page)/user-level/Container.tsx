'use client';
import { getUserLevelDataAction } from '@/actions/user-level';
import { CoinNotification } from '@/biz-components';
import { useUserInfoStore } from '@/store';
import { ILevel, ILevelNumber, IUserLevel } from '@/types';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Leaderboard from './components/Leaderboard';
import LevelConditions from './components/LevelConditions';
import LevelSelector from './components/LevelSelector';
import UserCard from './components/UserCard';

interface IState {
  currentLevel: number | null;
  leaderboardData: { [key: number]: IUserLevel[] };
  userCardData: IUserLevel | null;
  loading: boolean;
}

interface IAction {
  type: 'SET_CURRENT_LEVEL' | 'SET_LEADERBOARD_DATA' | 'SET_USER_CARD_DATA' | 'SET_LOADING';
  level?: ILevelNumber;
  data?: IUserLevel[] | IUserLevel | null;
  loading?: boolean;
}

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

const initialState: IState = {
  currentLevel: null,
  leaderboardData: {},
  userCardData: null,
  loading: false,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_CURRENT_LEVEL':
      return { ...state, currentLevel: action.level || null };
    case 'SET_LEADERBOARD_DATA':
      return {
        ...state,
        leaderboardData: {
          ...state.leaderboardData,
          [action.level!]: action.data as IUserLevel[],
        },
        loading: false,
      };
    case 'SET_USER_CARD_DATA':
      return { ...state, userCardData: action.data as IUserLevel };
    case 'SET_LOADING':
      return { ...state, loading: action.loading ?? false };
    default:
      return state;
  }
};

const Container: React.FC = () => {
  const { level: userLevel } = useUserInfoStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentIndex, setCurrentIndex] = useState(() =>
    levels.findIndex((level) => level.level === userLevel),
  );

  const fetchLeaderboardData = useCallback(
    async (level: ILevelNumber) => {
      dispatch({ type: 'SET_LOADING', loading: true });

      try {
        if (!state.leaderboardData[level]) {
          const response = await getUserLevelDataAction(level);
          if (response.success && response.data) {
            const data = response.data;
            dispatch({ type: 'SET_LEADERBOARD_DATA', level, data });
          } else {
            console.error('Failed to fetch leaderboard data:', response);
          }
        }

        if (level === userLevel) {
          const userCardData =
            (state.leaderboardData[level] as IUserLevel[]).find((user) => user.isCurrentUser) ||
            null;
          dispatch({ type: 'SET_USER_CARD_DATA', data: userCardData });
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [state.leaderboardData, userLevel],
  );

  useEffect(() => {
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
  const isCurrentLevel = useMemo(
    () => userLevel === levels[currentIndex].level,
    [userLevel, currentIndex],
  );

  return (
    <div className="pt-[30px]">
      <CoinNotification />
      <LevelSelector
        currentLevel={levels[currentIndex]}
        onPrevLevel={handlePrevLevel}
        onNextLevel={handleNextLevel}
      />
      <LevelConditions level={levels[currentIndex]} isCurrentLevel={isCurrentLevel} />
      <Leaderboard
        data={state.leaderboardData[levels[currentIndex].level]}
        loading={state.loading}
      />
      {isCurrentLevel && state.userCardData && <UserCard data={state.userCardData} />}
    </div>
  );
};

export default Container;
