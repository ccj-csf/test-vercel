'use client';
import React, { useRef } from 'react';
interface AudioProgressBarProps {
  duration: number; // 音频总时长（秒）
  currentTime: number; // 当前播放时间（秒）
  onTimeUpdate: (time: number) => void; // 更新时间的回调函数
  barColor: string; // 进度条的颜色
}

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({
  duration,
  currentTime,
  onTimeUpdate,
  barColor,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const newTime = ((event.clientX - rect.left) / rect.width) * duration;
      onTimeUpdate(newTime);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.buttons === 1) {
      // Only continue if the left mouse button is pressed
      handleMouseDown(event);
    }
  };

  return (
    <div
      className="relative h-1 w-full cursor-pointer select-none  rounded-[22px] bg-[#f1f1f1]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      ref={progressBarRef}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-[22px]"
        style={{
          width: `${(currentTime / duration) * 100}%`,
          backgroundColor: barColor,
        }}
      ></div>
    </div>
  );
};

export default AudioProgressBar;
