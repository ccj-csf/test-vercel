'use client';
import React, { useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';

interface LyricsScrollerProps {
  lyrics: string[];
  scrollSpeed?: number; // 以毫秒为单位，控制滚动的速度
}

const LyricsScroller: React.FC<LyricsScrollerProps> = ({ lyrics, scrollSpeed = 3000 }) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prevLine) => (prevLine + 1) % lyrics.length);
    }, scrollSpeed);

    return () => clearInterval(interval);
  }, [lyrics, scrollSpeed]);

  return (
    <div className="relative  bg-purple-600 p-4">
      <ScrollableFeed forceScroll={true}>
        {lyrics.map((line, index) => (
          <div key={index} className="relative mb-4 ">
            <p
              className={`text-24 transition-opacity duration-300 ${
                currentLine === index
                  ? 'text-lg font-bold text-white'
                  : 'text-base text-gray-300 opacity-70 backdrop-blur-sm'
              }`}
            >
              {line}
            </p>
            {/* 模糊背景效果 */}
            {currentLine !== index && (
              <div className="absolute inset-0 bg-purple-600 pb-[130px] opacity-50 backdrop-blur-sm" />
            )}
          </div>
        ))}
      </ScrollableFeed>
    </div>
  );
};

export default LyricsScroller;
