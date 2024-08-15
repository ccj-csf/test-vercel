' use client';
import React from 'react';
import AlbumArt from './AlbumArt';
import SongInfo from './SongInfo';

const Player: React.FC = () => {
  return (
    <main className="flex  h-full flex-col  items-center  justify-between">
      <section className="mt-4">
        <AlbumArt />
      </section>
      <section className="flex  self-start">
        <SongInfo />
      </section>
    </main>
  );
};

export default Player;
