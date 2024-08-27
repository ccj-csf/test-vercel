'use client';
import { TASK_CONFIG_MAP, TELEGRAM_GROUP_URL } from '@/constants';
import { dailySign, getEarnData, updateEarnData } from '@/services';
import { useAnimationStore, useUserInfoStore } from '@/store';
import { IDailySignData, IEarnPopupType, ITask } from '@/types';
import { AppUtils, openInviteCodeLink, openTelegramLink, startVibrate } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DailyList from './components/DailyList';
import DynamicPopup from './components/DynamicPopup';
import SkeletonLoader from './components/SkeletonLoader';
import SpecialList from './components/SpecialList';
import TaskList from './components/TaskList';

const Container: React.FC = () => {
  const { triggerNotification } = useAnimationStore();
  const { totalPoints, setUserInfo } = useUserInfoStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<IEarnPopupType>('taskDetail');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [dailySigns, setDailySigns] = useState<IDailySignData[]>([]);
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [specialTaskList, setSpecialTaskList] = useState<ITask[]>([]);
  const [dailyRewards, setDailyRewards] = useState<ITask[]>([]);
  const [totalSignRewards, setTotalSignRewards] = useState(0);
  const [rewardLoading, setRewardLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 初始化数据
  const initData = useMemoizedFn(async () => {
    setLoading(true); // 开始加载时显示骨架屏
    try {
      const res = await getEarnData();
      if (res.data) {
        setDailyRewards(res.data.dailyTasks);
        setSpecialTaskList(res.data.specialTasks);
        setTaskList(res.data.tasks);
        setDailySigns(res.data.dailySigns);
        setTotalSignRewards(res.data.dailyTasks[0].reward);
      }
    } catch (error) {
      console.error('Failed to load earn data:', error);
    } finally {
      setLoading(false); // 数据加载完成或出错后关闭加载状态
    }
  });

  useEffect(() => {
    initData();
  }, [initData]);

  const handleTaskClick = (task: ITask) => {
    startVibrate();
    setSelectedTask(task);
    setPopupType('taskDetail');
    setIsPopupVisible(true);
  };

  const handleRewardClick = () => {
    startVibrate();
    setPopupType('rewardDetail');
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const handleTaskUpdate = useCallback(
    async (updatedTask: ITask, setLoading: (loading: boolean) => void) => {
      setLoading(true);
      const response = await updateEarnData({
        type: 'tasks',
        id: updatedTask.id,
        status: updatedTask.status,
      });
      if (response) {
        if (specialTaskList.find((task) => task.id === updatedTask.id)) {
          setSpecialTaskList((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
            ),
          );
        } else {
          setTaskList((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
            ),
          );
        }
      }
      setLoading(false);
      handlePopupClose();
    },
    [specialTaskList],
  );

  const handleTaskComplete = () => {
    if (selectedTask) {
      startVibrate();
      const taskConfig = TASK_CONFIG_MAP[selectedTask.type];

      const actionMap: Record<string, () => void> = {
        downloadApp: () => AppUtils.openAppOrRedirect(),
        inviteFriends: openInviteCodeLink,
        joinTelegram: () => openTelegramLink(TELEGRAM_GROUP_URL),
        default: () => AppUtils.openExternalLink(taskConfig.link!),
      };

      const executeAction = actionMap[selectedTask.type] || actionMap.default;
      executeAction();

      const updatedTask = { ...selectedTask, status: 'inProgress' as const };
      handleTaskUpdate(updatedTask, setCompleteLoading);
    }
  };

  const handleTaskCheck = () => {
    if (selectedTask) {
      startVibrate();
      const updatedTask = { ...selectedTask, status: 'completed' as const };
      handleTaskUpdate(updatedTask, setCheckLoading);
      const newTotalPoints = totalPoints + selectedTask.reward;
      setUserInfo({
        totalPoints: newTotalPoints,
      });
    }
  };

  const handleDailyRewardClaim = async () => {
    startVibrate();
    setRewardLoading(true);

    const response = await dailySign();

    if (response) {
      const today = dayjs().format('YYYY-MM-DD'); // 获取当前日期
      let reward = 0;
      setDailySigns((prevSigns) =>
        prevSigns.map((sign) => {
          if (sign.date === today) {
            reward = sign.points;
            const newTotalPoints = totalPoints + reward;
            setUserInfo({
              totalPoints: newTotalPoints,
            });
            return { ...sign, signed: true };
          }
          return sign;
        }),
      );

      setTotalSignRewards((prevReward) => prevReward + reward);
    }

    setRewardLoading(false);
    handlePopupClose();
    triggerNotification(true);
  };

  const claimed = useMemo(() => {
    return dailySigns.some((sign) => sign.signed);
  }, [dailySigns]);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <SpecialList
            title="Special"
            specialTasks={specialTaskList}
            onTaskClick={handleTaskClick}
          />
          <DailyList
            onClick={handleRewardClick}
            claimed={claimed}
            totalSignRewards={totalSignRewards}
          />
          <TaskList tasks={taskList} onTaskClick={handleTaskClick} />
          <DynamicPopup
            type={popupType}
            visible={isPopupVisible}
            contentProps={{
              task: selectedTask ?? undefined,
              onComplete: handleTaskComplete,
              dailySigns: dailySigns,
              onClaim: handleDailyRewardClaim,
              onCheck: handleTaskCheck,
              completeLoading,
              checkLoading,
              rewardLoading,
            }}
            onClose={handlePopupClose}
          />
        </>
      )}
    </div>
  );
};

export default Container;
