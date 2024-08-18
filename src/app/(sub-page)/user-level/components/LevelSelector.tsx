import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useSwipeable } from 'react-swipeable';

// 定义一个类型别名，表示等级的联合类型
export type ILevelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface ILevel {
  level: ILevelNumber;
  name: string;
  points: number;
  invites: number;
}

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
  currentLevel: ILevel; // 接收的是包含 level, name, points, invites 属性的对象
  onPrevLevel: () => void;
  onNextLevel: () => void;
}> = ({ currentLevel, onPrevLevel, onNextLevel }) => {
  // 设置滑动手势处理器
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentLevel.level < 10) {
        onNextLevel();
      }
    },
    onSwipedRight: () => {
      if (currentLevel.level > 1) {
        onPrevLevel();
      }
    },
    trackMouse: true, // 启用鼠标事件
  });

  return (
    <div {...handlers} className="relative flex items-center justify-between">
      {/* 左侧按钮 */}
      <button
        onClick={onPrevLevel}
        className={`p-2 ${currentLevel.level === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={currentLevel.level === 1}
      >
        <ChevronLeft size={28} />
      </button>

      {/* 等级图标和信息 */}
      <div className="flex flex-col items-center">
        <div className="relative flex h-[120px] w-[120px] items-center justify-center">
          <Image
            src={levelIcons[currentLevel.level]} // 使用 currentLevel.level 获取图标路径
            alt={`Level ${currentLevel.level}`}
            width={120}
            height={120}
          />
        </div>
        <span className="absolute -bottom-2 text-lg font-bold">Lv.{currentLevel.level}</span>
      </div>

      {/* 右侧按钮 */}
      <button
        onClick={onNextLevel}
        className={`p-2 ${currentLevel.level === 10 ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={currentLevel.level === 10}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default LevelSelector;
