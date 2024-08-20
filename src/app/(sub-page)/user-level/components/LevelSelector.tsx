import { ILevel, ILevelNumber } from '@/types';
import { startVibrate } from '@/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useSwipeable } from 'react-swipeable';

// 每个级别对应的icon数据
const levelIcons: Record<ILevelNumber, string> = {
  1: '/icons/user-level/level1.svg',
  2: '/icons/user-level/level2.svg',
  3: '/icons/user-level/level3.svg',
  4: '/icons/user-level/level4.svg',
  5: '/icons/user-level/level5.svg',
  6: '/icons/user-level/level6.svg',
  7: '/icons/user-level/level7.svg',
  8: '/icons/user-level/level8.svg',
  9: '/icons/user-level/level9.svg',
  10: '/icons/user-level/level10.svg',
};

const LevelSelector: React.FC<{
  currentLevel: ILevel;
  onPrevLevel: () => void;
  onNextLevel: () => void;
}> = ({ currentLevel, onPrevLevel, onNextLevel }) => {
  // 设置滑动手势处理器
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentLevel.level < 10) {
        startVibrate();
        onNextLevel();
      }
    },
    onSwipedRight: () => {
      if (currentLevel.level > 1) {
        startVibrate();
        onPrevLevel();
      }
    },
    trackMouse: true, // 启用鼠标事件
  });

  return (
    <>
      <div {...handlers} className="relative  flex items-center justify-between">
        {/* 左侧按钮 */}
        <button
          onClick={onPrevLevel}
          className={`p-2 ${currentLevel.level === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={currentLevel.level === 1}
        >
          <ChevronLeft size={28} color="#48484e" />
        </button>

        {/* 等级图标和信息 */}
        <div className="flex flex-col items-center rounded-20 bg-[#363861]">
          <div className="relative flex h-[120px] w-[120px] items-center justify-center ">
            <Image
              src={levelIcons[currentLevel.level]}
              alt={`Level ${currentLevel.level}`}
              width={104}
              height={104}
            />
          </div>
        </div>

        {/* 右侧按钮 */}
        <button
          onClick={onNextLevel}
          className={`p-2 ${currentLevel.level === 10 ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={currentLevel.level === 10}
        >
          <ChevronRight size={28} color="#48484e" />
        </button>
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center text-21 text-white">
        <span className="">Lv.{currentLevel.level}</span>
      </div>
    </>
  );
};

export default LevelSelector;
