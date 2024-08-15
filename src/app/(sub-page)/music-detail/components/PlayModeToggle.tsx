'use client';
import { Icon } from '@/components';
import { IPlayMode, useMusicPlayerStore } from '@/store';
import React from 'react';

const PlayModeToggle: React.FC = () => {
  const { setPlayMode, playMode } = useMusicPlayerStore();

  const handleToggleMode = () => {
    let newMode: IPlayMode;
    switch (playMode) {
      case 'shuffle':
        newMode = 'loop';
        break;
      case 'loop':
        newMode = 'repeat';
        break;
      default:
        newMode = 'shuffle';
    }
    setPlayMode(newMode);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Icon
        name={playMode}
        className="!text-28 font-bold !text-white/50"
        onClick={handleToggleMode}
      />
    </div>
  );
};

export default PlayModeToggle;
