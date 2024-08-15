'use client';
import { CurrencyIconButton } from '@/biz-components';
import { Icon } from '@/components';
import { ITask } from '@/types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import RewardTitle from './RewardTitle';
interface TaskListProps {
  tasks: ITask[];
  onTaskClick: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className="mt-6">
      <RewardTitle title="Tasks list"></RewardTitle>
      <div className="mt-3 space-y-6 rounded-8 bg-white px-3 py-[14px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className={`flex cursor-pointer space-x-3 rounded`}
          >
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-8 bg-gray-100 p-2">
              <Icon name={task.icon} className="!text-32" />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col justify-between space-y-1">
                <p className="text-15 text-gray-600">{task.title}</p>
                <span className="flex items-center space-x-1">
                  <CurrencyIconButton size={15} />
                  <span className="text-15 ">+{task.reward}</span>
                </span>
              </div>
              {task.status === 'completed' ? (
                <Image src="/icons/complete.svg" width={20} height={20} alt="complete" />
              ) : (
                <ChevronRight className="text-gray-300" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
