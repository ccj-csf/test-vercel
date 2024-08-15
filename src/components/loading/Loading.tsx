'use client';
import React from 'react';
import './index.css';

const Loading: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/40 ">
      <div className="loader"></div>
    </div>
  );
};

export { Loading };
