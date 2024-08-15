'use client';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import LyricsScroller from './LyricsScroller';
import Player from './Player';
import SongDetails from './SongDetails';

interface SwipeableViewWrapperProps {
  index: number;
  setIndex: (index: number) => void;
}

const SwipeableViewWrapper: React.FC<SwipeableViewWrapperProps> = ({ index, setIndex }) => {
  // 随机歌词

  const lyrics = [
    'Small and white, clean and bright',
    'You look happy to meet me',
    'Blossom of snow may you bloom and grow',
    'Bloom and grow forever',
    'Edelweiss, Edelweiss',
    'Bless my homeland forever',
    'Small and white, clean and bright',
    'Bloom and grow forever',
    'Edelweiss, Edelweiss',
    'Bless my homeland forever',
    'Small and white, clean and bright',
    'Bloom and grow forever',
    'Edelweiss, Edelweiss',
    'Bless my homeland forever',
    'Small and white, clean and bright',
    'Small and white, clean and bright',
    'You look happy to meet me',
    'Blossom of snow may you bloom and grow',
    'Bloom and grow forever',
    'Edelweiss, Edelweiss',
    'Bless my homeland forever',
  ];
  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
      {index === 0 && <LyricsScroller lyrics={lyrics} />}
      <div className="h-[calc(100vh-172px)]">
        <Player />
      </div>
      <div className="h-[calc(100vh-172px)]">
        <SongDetails />
      </div>
    </SwipeableViews>
  );
};

export default SwipeableViewWrapper;
