import { Howl } from 'howler';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ISong {
  id: string;
  title: string;
  cover: string;
  style: string;
  desc: string;
  lyrics: string;
  sourceUrl: string;
  artist: string;
}

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
      playMode: 'loop',
      currentTime: 0,
      duration: 0,
      animationFrameId: undefined,
      userInitiated: false,
      isTrackCompleted: false, // 初始化为 false
      getCurrentTrack: () => {
        const { playlist, currentTrackIndex } = get();
        return playlist[currentTrackIndex];
      },
      setPlaylist: (tracks) => set({ playlist: tracks }),
      playTrack: (index) => {
        const { playlist, player: existingPlayer, currentTrackId } = get();
        const track = playlist[index];
        let player = existingPlayer;

        if (player instanceof Howl) {
          if (player && currentTrackId !== track.id) {
            player.unload();
            player = new Howl({
              src: [track.sourceUrl],
              html5: true,
              autoplay: false,
              onplay: () => {
                set({ isPlaying: true, isTrackCompleted: false });
                startProgressUpdate(player);
              },
              onpause: () => {
                set({ isPlaying: false });
                stopProgressUpdate();
              },
              onload: () => {
                set({ duration: player?.duration() });
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
            onplay: () => {
              set({ isPlaying: true, isTrackCompleted: false });
              startProgressUpdate(player);
            },
            onpause: () => {
              set({ isPlaying: false });
              stopProgressUpdate();
            },
            onload: () => {
              set({ duration: player?.duration() });
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
          isPlaying: true,
          currentTime: 0,
          userInitiated: false,
          duration: player.duration(),
        });

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
