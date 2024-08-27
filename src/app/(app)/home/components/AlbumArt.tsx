'use client';

import { Icon } from '@/components';
import { useMusicPlayerStore } from '@/store';
import { DotLoading } from 'antd-mobile';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef } from 'react';

const AlbumArt: React.FC = () => {
  const {
    playlist,
    currentTrackIndex,
    togglePlayback,
    isPlaying,
    player,
    playTrack,
    isReadyToPlay, // 引入 isReadyToPlay 状态
  } = useMusicPlayerStore();
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

  const handleTogglePlayback = () => {
    // 如果播放器为空或还未准备好，先初始化播放器并播放当前曲目
    if (!player || !isReadyToPlay) {
      playTrack(currentTrackIndex); // 初始化播放器并播放当前曲目
    } else {
      togglePlayback(); // 切换播放/暂停状态
    }
  };

  return (
    <div className="relative flex h-full items-center justify-center">
      {/* 根据 isReadyToPlay 控制播放按钮 */}
      {isReadyToPlay ? (
        <Icon
          onClick={handleTogglePlayback}
          name={isPlaying ? 'pause' : 'play'}
          className="absolute z-10 !text-[40px] text-white"
        />
      ) : (
        <div className="absolute z-10">
          <div style={{ color: '#fff' }}>
            <DotLoading color="currentColor" />
          </div>
        </div>
      )}
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
