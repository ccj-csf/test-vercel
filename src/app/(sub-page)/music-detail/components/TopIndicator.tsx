' use client';
import React from 'react';

interface TopIndicatorProps {
  index: number;
}

const TopIndicator: React.FC<TopIndicatorProps> = ({ index }) => {
  return (
    <div className="flex items-center justify-center space-x-1 py-4">
      {['Player', 'Lyrics', 'Details'].map((_, idx) => (
        <div
          key={idx}
          className={`rounded-full ${
            index === idx ? 'h-1 w-3 bg-white' : 'h-1 w-1 bg-purple-300'
          } transition-all duration-300`}
        />
      ))}
    </div>
  );
};

export default TopIndicator;
