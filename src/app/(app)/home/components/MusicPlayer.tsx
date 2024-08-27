'use client';

import { Icon } from '@/components';
import { postMusicEarnData } from '@/services';
import { useAnimationStore, useMusicPlayerStore, useUserInfoStore } from '@/store';
import { TimeUtils, startVibrate } from '@/utils';
import Image from 'next/image';
import React, { useCallback } from 'react';
import AlbumArt from './AlbumArt';
import AudioProgressBar from './AudioProgressBar';

const MusicPlayer: React.FC = () => {
  const { totalPoints, setUserInfo } = useUserInfoStore();
  const { triggerNotification } = useAnimationStore();
  const { playlist, currentTrackIndex, currentTime, duration, updateCurrentTime, nextTrack } =
    useMusicPlayerStore();
  const currentTrack = playlist[currentTrackIndex];
  const handleSeek = (time: number) => {
    const player = useMusicPlayerStore.getState().player as Howl;
    player.seek(time);
    updateCurrentTime(time);
  };
  const onSongChange = useCallback(() => {
    // 在切换歌曲时可以重置奖励状态
    console.log('Song changed');
  }, []);
  const handleNextTrack = () => {
    startVibrate();
    nextTrack(true);
    onSongChange();
  };

  const handleRewardClaim = async (rewardAmount: number, node: number) => {
    try {
      const params = {
        musicId: currentTrack.id,
        rewardTime: TimeUtils.getCurrentUnixTimestamp(),
        reward: rewardAmount,
      };

      const response = await postMusicEarnData(params);
      triggerNotification(true, rewardAmount);
      const newTotalPoints = totalPoints + rewardAmount;
      setUserInfo({
        totalPoints: newTotalPoints,
      });
      console.log('🚀 ~ handleRewardClaim ~ params:', params);
    } catch (error) {
      console.error(`Error claiming reward for node ${node}:`, error);
    }
  };

  return (
    <div className="mt-6">
      <AlbumArt></AlbumArt>
      <section className="flex items-center justify-between">
        <div className=" mt-5 space-y-1">
          <p className="max-w-[278px] flex-wrap text-19">{currentTrack?.title}</p>
          <section className="flex items-center space-x-1">
            <Image
              src="https://cdn1.suno.ai/bf2b7696.webp"
              alt="Album Cover"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-[15px]  font-normal">{currentTrack?.artist}</span>
          </section>
        </div>
        <div className="rounded-[100px] bg-white px-[16px] py-2">
          <Icon name="random-play" className="!text-24" onClick={handleNextTrack} />
        </div>
      </section>
      <AudioProgressBar
        duration={duration}
        currentTime={currentTime}
        onRewardClaim={handleRewardClaim}
        onTimeUpdate={(time) => {
          console.log('New time:', time);
          handleSeek(time);
        }}
      />
      <div className="mt-4"></div>
    </div>
  );
};

export default MusicPlayer;
