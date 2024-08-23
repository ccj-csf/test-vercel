'use client';
import { CurrencyIconButton } from '@/biz-components';
import { Button, Icon } from '@/components';
import { TASK_CONFIG_MAP } from '@/constants';
import { ITask } from '@/types';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import React from 'react';
interface TaskDetailContentProps {
  task: ITask;
  onComplete: () => void;
  onCheck?: () => void;
  completeLoading?: boolean;
  checkLoading?: boolean;
}

const TaskDetailContent: React.FC<TaskDetailContentProps> = ({
  task,
  onComplete,
  completeLoading,
  checkLoading,
  onCheck = () => {},
}) => {
  const taskConfig = TASK_CONFIG_MAP[task.type];
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'inProgress';
  const renderTaskIcon = () => {
    if (task.type === 'downloadApp') {
      return (
        <div className="mt-4 flex justify-center">
          <Image
            src={TASK_CONFIG_MAP[task.type]?.iconPath || ''}
            width={64}
            height={64}
            alt="task icon"
          />
        </div>
      );
    } else {
      return (
        <div className="inline-block items-center justify-center rounded-full bg-icon-gradient p-4">
          <Icon name={taskConfig.iconPath} className="mt-8 !text-28" />
        </div>
      );
    }
  };
  return (
    <div className="text-center">
      {renderTaskIcon()}
      <h2 className="mt-6 text-21">{task.title}</h2>
      {task.description && <p className="mb-2 ">{task.description}</p>}
      <p className="flex justify-center space-x-1 text-15 ">
        <CurrencyIconButton size={20} />
        <span>+{formatNumberWithCommas(task.reward)}</span>
      </p>
      <Button
        onClick={onCheck}
        disabled={task.status === 'completed'}
        className="!mt-[46px] !h-[52px] !rounded-12"
        block
        loading={checkLoading}
      >
        {taskConfig.checkActionText}
      </Button>
      <Button
        onClick={onComplete}
        disabled={isInProgress || isCompleted}
        className="!mt-6 !h-[52px] !rounded-12 !bg-black !text-white"
        variant="black"
        loading={completeLoading}
        block
      >
        {taskConfig.actionText}
      </Button>
    </div>
  );
};

export default TaskDetailContent;
