'use client';
import { getEarnDataAction, updateEarnDataAction } from '@/actions';
import { IDailyReward, IEarnData, IEarnPopupType, ITask } from '@/types';
import { startVibrate } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import React, { useCallback, useState } from 'react';
import DailyRewardSection from './components/DailyRewardSection';
import DynamicPopup from './components/DynamicPopup';
import SpecialRewardSection from './components/SpecialRewardSection';
import TaskList from './components/TaskList';

interface IProps {
  data: IEarnData;
}

const Container: React.FC<IProps> = ({ data }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<IEarnPopupType>('taskDetail');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskList, setTaskList] = useState<ITask[]>(data.tasks);
  const [specialTaskList, setSpecialTaskList] = useState<ITask[]>(data.specialTasks);
  const [dailyRewards, setDailyRewards] = useState<IDailyReward>(data.dailyReward);
  const [rewardLoading, setRewardLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  const updateData = useMemoizedFn(async () => {
    const res = await getEarnDataAction();
    if (res.data) {
      setDailyRewards(res.data.dailyReward);
      setSpecialTaskList(res.data.specialTasks);
      setTaskList(res.data.tasks);
    }
  });

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
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          );
        } else {
          setTaskList((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          );
        }
      }
      setLoading(false);
      handlePopupClose();
      await updateData();
    },
    [specialTaskList, updateData],
  );

  const handleTaskComplete = () => {
    if (selectedTask) {
      startVibrate();
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

  const handleDailyRewardClaim = async (newStreak: number, currentUTCDate: string) => {
    startVibrate();
    setRewardLoading(true);
    const todayReward = dailyRewards?.rewardDays[newStreak - 1] || 0;

    // 调用 API 更新数据
    const response = await updateEarnDataAction('dailyReward', {
      currentStreak: newStreak,
      lastClaimDate: currentUTCDate,
      totalRewards: dailyRewards.totalRewards + todayReward,
    });

    // 检查响应数据类型并更新状态
    if (response.data) {
      const updatedDailyReward = response.data as IDailyReward;
      setDailyRewards(updatedDailyReward);
    }

    setRewardLoading(false);
    handlePopupClose();
    await updateData();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <SpecialRewardSection
        title="Special"
        specialTasks={specialTaskList}
        onTaskClick={handleTaskClick}
      />
      <DailyRewardSection
        onClick={() => handleRewardClick()}
        claimed={!!dailyRewards?.currentStreak}
        todayReward={dailyRewards?.totalRewards}
      />
      <TaskList tasks={taskList} onTaskClick={handleTaskClick} />
      <DynamicPopup
        type={popupType}
        visible={isPopupVisible}
        contentProps={{
          task: selectedTask ?? undefined,
          onComplete: handleTaskComplete,
          onClaim: handleDailyRewardClaim,
          onCheck: handleTaskCheck,
          rewardDays: dailyRewards?.rewardDays,
          lastClaimDate: dailyRewards?.lastClaimDate,
          currentStreak: dailyRewards?.currentStreak,
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
