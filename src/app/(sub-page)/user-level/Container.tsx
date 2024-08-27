'use client';

import { CoinNotification } from '@/biz-components';
import { getUserLevelData } from '@/services';
import { useAppConfigStore, useUserInfoStore } from '@/store';
import { ILevelNumber, IUserLevel } from '@/types';
import { startVibrate } from '@/utils';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import CurrentUserCard from './components/CurrentUserCard';
import Leaderboard from './components/Leaderboard';
import LevelConditions from './components/LevelConditions';
import LevelSelector from './components/LevelSelector';

interface IState {
  currentLevel: number | null;
  leaderboardData: { [key: number]: IUserLevel[] };
  currentUserCardData: IUserLevel | null;
  loading: boolean;
}

interface IAction {
  type: 'SET_CURRENT_LEVEL' | 'SET_LEADERBOARD_DATA' | 'SET_CURRENT_USER_CARD_DATA' | 'SET_LOADING';
  level?: ILevelNumber;
  data?: IUserLevel[] | IUserLevel | null;
  loading?: boolean;
}

const initialState: IState = {
  currentLevel: null,
  leaderboardData: {},
  currentUserCardData: null,
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
    case 'SET_CURRENT_USER_CARD_DATA':
      return { ...state, currentUserCardData: action.data as IUserLevel };
    case 'SET_LOADING':
      return { ...state, loading: action.loading ?? false };
    default:
      return state;
  }
};

const Container: React.FC = () => {
  const { level: userLevel } = useUserInfoStore();
  const { config } = useAppConfigStore();
  const levels = useMemo(() => config?.levels || [], [config]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentIndex, setCurrentIndex] = useState(() =>
    levels.findIndex((level) => level.level === userLevel),
  );

  const fetchLevelData = useCallback(
    async (level: ILevelNumber) => {
      dispatch({ type: 'SET_LOADING', loading: true });

      try {
        if (!state.leaderboardData[level]) {
          const response = await getUserLevelData({ level });
          if (response.success && response.data) {
            const data = response.data.users;
            dispatch({ type: 'SET_LEADERBOARD_DATA', level, data });
          } else {
            console.error('Failed to fetch leaderboard data:', response);
          }
        }

        if (level === userLevel) {
          const currentUserCardData =
            (state.leaderboardData[level] as IUserLevel[]).find((user) => user.isCurrentUser) ||
            null;
          dispatch({ type: 'SET_CURRENT_USER_CARD_DATA', data: currentUserCardData });
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
    fetchLevelData(levels[currentIndex].level);
  }, [fetchLevelData, currentIndex, levels]);

  const handleNextLevel = () => {
    if (currentIndex < levels.length - 1) {
      startVibrate();
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      fetchLevelData(levels[nextIndex].level);
    }
  };

  const handlePrevLevel = () => {
    if (currentIndex > 0) {
      startVibrate();
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      fetchLevelData(levels[prevIndex].level);
    }
  };

  const isUserCurrentLevel = useMemo(
    () => userLevel === levels[currentIndex].level,
    [userLevel, levels, currentIndex],
  );

  return (
    <div className="pt-[30px]">
      <CoinNotification />
      <LevelSelector
        currentLevel={levels[currentIndex]}
        onPrevLevel={handlePrevLevel}
        onNextLevel={handleNextLevel}
      />
      <LevelConditions level={levels[currentIndex]} isCurrentLevel={isUserCurrentLevel} />
      <Leaderboard
        data={state.leaderboardData[levels[currentIndex].level]}
        loading={state.loading}
        isUserCurrentLevel={isUserCurrentLevel}
      />
      {isUserCurrentLevel && state.currentUserCardData && (
        <CurrentUserCard data={state.currentUserCardData} />
      )}
    </div>
  );
};

export default Container;
