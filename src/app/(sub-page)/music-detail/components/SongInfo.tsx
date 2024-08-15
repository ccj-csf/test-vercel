'use client';
import { useMusicPlayerStore } from '@/store';
import { NativeProps } from '@/utils';
import Image from 'next/image';
import React from 'react';
interface SongInfoProps extends NativeProps {}
const SongInfo: React.FC<SongInfoProps> = () => {
  const { playlist, currentTrackIndex } = useMusicPlayerStore();
  const currentTrack = playlist[currentTrackIndex];
  return (
    currentTrack?.title && (
      <div className="flex flex-col self-end text-left text-24  font-medium">
        <p className=" max-w-[240px] flex-wrap">{currentTrack?.title}</p>
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
      </div>
    )
  );
};

export default SongInfo;
