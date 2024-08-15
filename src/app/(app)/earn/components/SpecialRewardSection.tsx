import { CurrencyIconButton, LogoIcon } from '@/biz-components';
import { ITask } from '@/types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import RewardTitle from './RewardTitle';
interface SpecialRewardSectionProps {
  title: string;
  specialTasks: ITask[]; // 接收一个 specialTasks 数组
  onTaskClick: (task: ITask) => void; // 点击任务的回调函数
}

const SpecialRewardSection: React.FC<SpecialRewardSectionProps> = ({
  title,
  specialTasks,
  onTaskClick,
}) => {
  return (
    <>
      <RewardTitle title={title}></RewardTitle>
      <div className="mt-3 space-y-6 rounded-8 bg-white px-3 py-[14px] ">
        {specialTasks.map((task) => (
          <section
            key={task.id}
            className="flex cursor-pointer space-x-2"
            onClick={() => onTaskClick(task)}
          >
            <LogoIcon size={50} />
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col space-y-1">
                <p className="text-14 text-gray-600">{task.title}</p>
                <span className="flex items-center space-x-1">
                  <CurrencyIconButton size={15} />
                  <span className="">+{task.reward}</span>
                </span>
              </div>
              {task.status === 'completed' ? (
                <Image src="/icons/complete.svg" width={20} height={20} alt="complete" />
              ) : (
                <ChevronRight className="text-gray-300" size={20} />
              )}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default SpecialRewardSection;
