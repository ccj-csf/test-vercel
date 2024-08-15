'use client';
import React, { useState } from 'react';
import PlaybackControls from './components/PlaybackControls';
import SocialActions from './components/SocialActions';
import SwipeableViewWrapper from './components/SwipeableViewWrapper';
import TopIndicator from './components/TopIndicator';
import './index.css';

const MusicPlayerDetail: React.FC = () => {
  const [index, setIndex] = useState<number>(2);

  return (
    <div className="flex h-screen flex-col bg-purple px-4  text-white">
      <section className="h-[36px]">
        <TopIndicator index={index} />
      </section>
      <section className="hide-scrollbars  flex flex-1 overflow-y-auto">
        <SwipeableViewWrapper index={index} setIndex={setIndex} />
      </section>
      <section className="fixed bottom-[138px] right-5">
        <SocialActions />
      </section>
      <section className="h-[136px]">
        <PlaybackControls />
      </section>
    </div>
  );
};

export default MusicPlayerDetail;
