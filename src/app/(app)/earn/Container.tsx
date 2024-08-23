'use client';
import { getEarnDataAction, updateEarnDataAction } from '@/actions';
import { TASK_CONFIG_MAP } from '@/constants';
import { useCoinStore } from '@/store';
import { IDailySignData, IEarnPopupType, ITask } from '@/types';
import { AppUtils, openInviteCodeLink, startVibrate } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DailyList from './components/DailyList';
import DynamicPopup from './components/DynamicPopup';
import SpecialList from './components/SpecialList';
import TaskList from './components/TaskList';
import { dailyRewards as defaultDailyRewards, specialTasks, tasks } from './data';

const Container: React.FC = () => {
  const { triggerNotification } = useCoinStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<IEarnPopupType>('taskDetail');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [dailySigns, setDailySigns] = useState<IDailySignData[]>([]);
  const [taskList, setTaskList] = useState<ITask[]>(tasks);
  const [specialTaskList, setSpecialTaskList] = useState<ITask[]>(specialTasks);
  const [dailyRewards, setDailyRewards] = useState<ITask[]>(defaultDailyRewards);
  const [totalSignRewards, setTotalSignRewards] = useState(0);
  const [rewardLoading, setRewardLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  // 初始化数据
  const initData = useMemoizedFn(async () => {
    const res = await getEarnDataAction();
    if (res.data) {
      console.log('🚀 ~ initData ~ res.data:', res?.data);
      setDailyRewards(res.data.dailyRewards);
      setSpecialTaskList(res.data.specialTasks);
      setTaskList(res.data.tasks);
      setDailySigns(res.data.dailySigns);
      setTotalSignRewards(res.data.dailyRewards[0].reward);
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
      const response = await updateEarnDataAction('tasks', updatedTask);
      if (response.data) {
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
    }
  };

  const handleDailyRewardClaim = async () => {
    startVibrate();
    setRewardLoading(true);

    const response = await updateEarnDataAction('dailyReward', {});

    if (response.data) {
      const today = dayjs().format('YYYY-MM-DD'); // 获取当前日期
      let reward = 0;

      setDailySigns((prevSigns) =>
        prevSigns.map((sign) => {
          if (sign.date === today) {
            reward = sign.points;
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
      <SpecialList title="Special" specialTasks={specialTaskList} onTaskClick={handleTaskClick} />
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
    </div>
  );
};

export default Container;
