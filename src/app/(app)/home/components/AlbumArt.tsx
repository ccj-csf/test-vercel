'use client';

import { Icon } from '@/components';
import { useMusicPlayerStore } from '@/store';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef } from 'react';

const AlbumArt: React.FC = () => {
  const { playlist, currentTrackIndex, togglePlayback, isPlaying } = useMusicPlayerStore();
  const currentTrack = playlist[currentTrackIndex];

  const rotationRef = useRef<number>(0); // 保存当前的旋转角度
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const rotate = useCallback((timestamp: number) => {
    if (!imageRef.current || !lastTimeRef.current) return;
    const elapsed = timestamp - lastTimeRef.current;
    const degrees = (elapsed / 1000) * (360 / 8); // 每8秒旋转360度

    rotationRef.current = (rotationRef.current + degrees) % 360; // 保持旋转角度在0-360度之间
    imageRef.current.style.transform = `rotate(${rotationRef.current}deg)`;

    lastTimeRef.current = timestamp;
    animationFrameIdRef.current = requestAnimationFrame(rotate);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now(); // 每次播放时重置起始时间
      animationFrameIdRef.current = requestAnimationFrame(rotate);
    } else if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying, rotate]);

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
        <div
          ref={imageRef}
          className="flex h-[126px] w-[126px] items-center justify-center rounded-full bg-black"
          style={{ transform: `rotate(${rotationRef.current}deg)` }}
        >
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
