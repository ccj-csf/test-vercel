import { ISong } from '@/types';
import { Howl } from 'howler';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IPlayMode = 'loop' | 'shuffle' | 'repeat';

interface MusicPlayerState {
  playlist: ISong[];
  currentTrackIndex: number;
  currentTrackId: string | null;
  isPlaying: boolean;
  player?: Howl | null;
  playMode: IPlayMode;
  currentTime: number;
  duration: number;
  userInitiated: boolean;
  isTrackCompleted: boolean; // 新增状态
  isReadyToPlay: boolean; // 新增状态
  getCurrentTrack: () => ISong | undefined;
  setPlaylist: (tracks: ISong[]) => void;
  playTrack: (index: number) => void;
  togglePlayback: () => void;
  nextTrack: (userInitiated?: boolean) => void;
  previousTrack: (userInitiated?: boolean) => void;
  setPlayMode: (mode: IPlayMode) => void;
  updateCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  initializePlayer: () => void;
  animationFrameId?: number;
}

export const useMusicPlayerStore = create(
  persist<MusicPlayerState>(
    (set, get) => ({
      playlist: [],
      currentTrackIndex: 0,
      currentTrackId: null,
      isPlaying: false,
      player: null,
      playMode: 'shuffle',
      currentTime: 0,
      duration: 0,
      animationFrameId: undefined,
      userInitiated: false,
      isTrackCompleted: false,
      isReadyToPlay: false, // 初始化为 false
      getCurrentTrack: () => {
        const { playlist, currentTrackIndex } = get();
        return playlist[currentTrackIndex];
      },
      setPlaylist: (tracks) => {
        set({ playlist: tracks });

        if (tracks.length > 0) {
          const firstTrack = tracks[0];
          const player = new Howl({
            src: [firstTrack.sourceUrl],
            html5: true,
            autoplay: false,
            preload: true,
            onload: () => {
              set({
                duration: player.duration(),
                currentTime: 0,
                currentTrackId: firstTrack.id,
                player,
                isReadyToPlay: true, // 歌曲加载完毕，设置为 true
              });
            },
          });
          player.load(); // 预加载第一首歌
        }
      },
      playTrack: (index) => {
        const { playlist, player: existingPlayer, currentTrackId } = get();
        const track = playlist[index];
        let player = existingPlayer;

        // 切换歌曲时重置状态
        set({ isReadyToPlay: false, isPlaying: false });

        if (player instanceof Howl) {
          if (player && currentTrackId !== track.id) {
            player.unload();
            player = new Howl({
              src: [track.sourceUrl],
              html5: true,
              autoplay: false,
              preload: true,
              onplay: () => {
                set({ isPlaying: true, isTrackCompleted: false });
                startProgressUpdate(player);
              },
              onpause: () => {
                set({ isPlaying: false });
                stopProgressUpdate();
              },
              onload: () => {
                set({ duration: player?.duration(), isReadyToPlay: true }); // 歌曲加载完毕，设置为 true
              },
              onend: () => {
                if (get().playMode === 'repeat') {
                  player?.play();
                } else {
                  get().nextTrack();
                }
                stopProgressUpdate();
                set({ isTrackCompleted: true });
              },
            });
          } else {
            player.stop();
          }
        } else {
          player = new Howl({
            src: [track.sourceUrl],
            html5: true,
            autoplay: false,
            preload: true,
            onplay: () => {
              set({ isPlaying: true, isTrackCompleted: false });
              startProgressUpdate(player);
            },
            onpause: () => {
              set({ isPlaying: false });
              stopProgressUpdate();
            },
            onload: () => {
              set({ duration: player?.duration(), isReadyToPlay: true }); // 歌曲加载完毕，设置为 true
            },
            onend: () => {
              get().nextTrack();
              stopProgressUpdate();
              set({ isTrackCompleted: true });
            },
          });
        }

        set({
          player,
          currentTrackIndex: index,
          currentTrackId: track.id,
          currentTime: 0,
          userInitiated: false,
          duration: player.duration(),
        });

        player.load(); // 确保歌曲被加载
        player.play();
      },

      togglePlayback: () => {
        const player = get().player;
        if (player) {
          if (player.playing()) {
            player.pause();
            set({ isPlaying: false });
            stopProgressUpdate();
          } else {
            player.play();
            set({ isPlaying: true });
            startProgressUpdate(player);
          }
        }
      },
      nextTrack: (userInitiated = false) => {
        const { currentTrackIndex, playlist, playMode, playTrack } = get();
        let nextIndex = currentTrackIndex;

        if (playMode === 'repeat' && !userInitiated) {
          nextIndex = currentTrackIndex;
        } else {
          nextIndex =
            playMode === 'shuffle'
              ? Math.floor(Math.random() * playlist.length)
              : (currentTrackIndex + 1) % playlist.length;
        }

        // 切换到下一首歌曲时，设置 isReadyToPlay 为 false
        set({ isReadyToPlay: false });

        playTrack(nextIndex);
        set({ userInitiated });
        set({ isTrackCompleted: true });
      },

      previousTrack: (userInitiated = false) => {
        const { currentTrackIndex, playlist, playMode, playTrack } = get();
        let prevIndex = currentTrackIndex;

        if (playMode === 'repeat' && !userInitiated) {
          prevIndex = currentTrackIndex;
        } else {
          prevIndex =
            playMode === 'shuffle'
              ? Math.floor(Math.random() * playlist.length)
              : (currentTrackIndex - 1 + playlist.length) % playlist.length;
        }

        playTrack(prevIndex);
        set({ userInitiated });
      },

      setPlayMode: (mode) => set({ playMode: mode }),

      updateCurrentTime: (time) => set({ currentTime: time }),

      setDuration: (duration) => set({ duration }),

      initializePlayer: () => {
        const { playlist, currentTrackIndex, currentTime } = get();
        if (playlist.length > 0) {
          const track = playlist[currentTrackIndex];
          const player = new Howl({
            src: [track.sourceUrl],
            html5: true,
            autoplay: false,
            onplay: () => set({ isPlaying: true }),
            onpause: () => set({ isPlaying: false }),
            onload: () => {
              player.seek(currentTime || 0);
              set({
                duration: player.duration(),
                currentTime: player.seek() as number,
                isPlaying: false,
                isReadyToPlay: true, // 歌曲加载完毕，设置为 true
              });
            },
            onend: () => {
              get().nextTrack();
              set({ isTrackCompleted: true });
            },
          });

          set({ player });
        }
      },
    }),
    {
      name: 'music-player',
      partialize: (state) => {
        const { player, ...rest } = state;
        return rest;
      },
    },
  ),
);

// Helper functions
function startProgressUpdate(player: Howl | null | undefined) {
  const id = requestAnimationFrame(() => {
    const currentTime = player?.seek() as number;
    useMusicPlayerStore.setState({ currentTime });
    startProgressUpdate(player);
  });
  useMusicPlayerStore.setState({ animationFrameId: id });
}

function stopProgressUpdate() {
  const id = useMusicPlayerStore.getState().animationFrameId;
  if (id !== undefined) {
    cancelAnimationFrame(id);
  }
}
