'use client';
import { useMusicPlayerStore } from '@/store';
import Image from 'next/image';
import React from 'react';
const SongDetails: React.FC = () => {
  const { playlist, currentTrackIndex } = useMusicPlayerStore();
  const currentTrack = playlist[currentTrackIndex];
  return (
    <div className="flex h-full flex-col  justify-center space-y-3">
      <p className="max-w-[280px] flex-wrap text-24 font-medium">
        {currentTrack?.title} By {currentTrack?.artist}
      </p>
      <section className="flex items-center space-x-2">
        <Image
          src="https://cdn1.suno.ai/bf2b7696.webp"
          alt="Album Cover"
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-[15px] text-white/50">{currentTrack?.artist}</span>
      </section>
      <p className="text-[17px] text-white/50">{currentTrack?.desc}</p>
    </div>
  );
};

export default SongDetails;
