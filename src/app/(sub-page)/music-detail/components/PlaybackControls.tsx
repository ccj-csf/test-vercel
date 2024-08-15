'use client';
import { Icon } from '@/components';
import { useMusicPlayerStore } from '@/store';
import { NativeProps } from '@/utils';
import React from 'react';
import AudioProgressBar from './AudioProgressBar';
import PlayModeToggle from './PlayModeToggle';

interface PlaybackControlsProps extends NativeProps {}

const PlaybackControls: React.FC<PlaybackControlsProps> = () => {
  const {
    currentTrackIndex,
    playlist,
    isPlaying,
    togglePlayback,
    nextTrack,
    previousTrack,
    setPlayMode,
    playMode,
    currentTime,
    duration,
    updateCurrentTime,
  } = useMusicPlayerStore();

  const currentTrack = playlist[currentTrackIndex];

  const handleSeek = (time: number) => {
    const player = useMusicPlayerStore.getState().player as Howl;
    player.seek(time);
    updateCurrentTime(time);
  };
  return (
    <div className="flex w-full flex-col pb-10">
      <div className="">
        {currentTrack ? (
          <>
            <section className="mt-4 flex flex-col items-center">
              <AudioProgressBar
                duration={duration}
                currentTime={currentTime}
                onTimeUpdate={(time) => {
                  console.log('New time:', time);
                  handleSeek(time);
                }}
                barColor="#c1cbd7"
              />
              <div className="mt-1 flex w-full items-center justify-between text-12 text-white/50">
                <span>
                  {Math.floor(currentTime / 60)}:
                  {Math.floor(currentTime % 60)
                    .toString()
                    .padStart(2, '0')}
                </span>
                <span>
                  {Math.floor(duration / 60)}:
                  {Math.floor(duration % 60)
                    .toString()
                    .padStart(2, '0')}
                </span>
              </div>
            </section>
            <section className="flex items-center justify-between">
              <Icon onClick={() => previousTrack(true)} name="prew" className="!text-28" />
              <Icon
                onClick={togglePlayback}
                name={isPlaying ? 'pause' : 'play'}
                className="!text-[40px]"
              />
              <Icon onClick={() => nextTrack(true)} name="next" className="!text-28" />
              <PlayModeToggle></PlayModeToggle>
              <Icon name="more" className="!text-28 text-white/50" />
            </section>
          </>
        ) : (
          <div>No track selected</div>
        )}
      </div>
    </div>
  );
};

export default PlaybackControls;
