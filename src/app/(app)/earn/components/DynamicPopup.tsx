'use client';
import { Popup } from '@/components';
import { IDailySignData, IEarnPopupType, ITask } from '@/types';
import React from 'react';
import RewardDetailContent from './RewardDetailContent';
import TaskDetailContent from './TaskDetailContent';

interface DynamicPopupProps {
  visible: boolean;
  onClose: () => void;
  type: IEarnPopupType;
  contentProps: {
    task?: ITask;
    onComplete: () => void;
    onClaim: () => void;
    onCheck: () => void;
    dailySigns: IDailySignData[];
    completeLoading?: boolean;
    checkLoading?: boolean;
    rewardLoading?: boolean;
  };
}

const DynamicPopup: React.FC<DynamicPopupProps> = ({ visible, onClose, type, contentProps }) => {
  const renderContent = () => {
    if (type === 'taskDetail' && contentProps.task) {
      return (
        <>
          <TaskDetailContent
            task={contentProps.task}
            onComplete={contentProps.onComplete}
            onCheck={contentProps.onCheck}
            completeLoading={contentProps.completeLoading || false}
            checkLoading={contentProps.checkLoading || false}
          />
        </>
      );
    } else if (type === 'rewardDetail') {
      return (
        <>
          <RewardDetailContent
            dailySigns={contentProps.dailySigns}
            onClaim={contentProps.onClaim || (() => {})}
            onClose={onClose}
            loading={contentProps.rewardLoading || false}
          />
        </>
      );
    }
    return null;
  };

  return (
    <Popup visible={visible} showCloseButton={true} onClose={onClose}>
      {renderContent()}
    </Popup>
  );
};

export default DynamicPopup;
