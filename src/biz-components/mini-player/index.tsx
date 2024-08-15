'use client';

import { Icon } from '@/components';
import { ROUTES_MUSIC_DETAIL } from '@/constants';
import { useMusicPlayerStore } from '@/store';
import { useRouter } from 'next/navigation';

const MiniPlayer: React.FC = () => {
  const router = useRouter();
  const {
    togglePlayback,
    nextTrack,
    previousTrack,
    isPlaying,
    currentTrackId,
    playlist,
    currentTrackIndex,
    // pause,
    playTrack,
    setPlaylist,
  } = useMusicPlayerStore();

  const currentTrack = playlist[currentTrackIndex];
  const goToMusicDetail = () => {
    if (currentTrackId) {
      router.push(ROUTES_MUSIC_DETAIL);
    }
    router.push(ROUTES_MUSIC_DETAIL);
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 mx-4 flex items-center justify-between rounded-8  bg-blue-200 p-4">
      <div onClick={goToMusicDetail}>
        {currentTrack ? (
          <>
            <div>{currentTrack.title}</div>
            <div>{currentTrack.artist}</div>
          </>
        ) : (
          <div>No track selected</div>
        )}
      </div>
      <div className="flex space-x-2">
        <Icon onClick={() => previousTrack(true)} name="prew" className="!text-24" />
        <Icon onClick={togglePlayback} name={isPlaying ? 'pause' : 'play'} className="!text-24" />
        <Icon onClick={() => nextTrack(true)} name="next" className="!text-24" />
      </div>
    </div>
  );
};

export { MiniPlayer };
