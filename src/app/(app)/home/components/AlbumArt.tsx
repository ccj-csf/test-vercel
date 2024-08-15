'use client';

import { Icon } from '@/components';
import { useMusicPlayerStore } from '@/store';
import Image from 'next/image';
import React from 'react';

const AlbumArt: React.FC = () => {
  const { playlist, currentTrackIndex, togglePlayback, isPlaying } = useMusicPlayerStore();
  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="relative flex h-full items-center justify-center">
      <Icon
        onClick={togglePlayback}
        name={isPlaying ? 'pause' : 'play'}
        className="absolute z-10 !text-[40px] text-white"
      />
      <div
        className="flex h-[220px] w-[220px] items-center justify-center rounded-full"
        style={{
          backgroundImage: "url('/icons/CD.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex h-[126px] w-[126px] animate-spin-slow items-center justify-center rounded-full bg-black">
          <Image
            src={currentTrack?.cover!}
            alt="Album Cover"
            width={155}
            height={155}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumArt;
