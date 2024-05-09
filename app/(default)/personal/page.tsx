"use client";

import { useState } from "react";
import { useRequest } from "ahooks";
import { fetchEnhanced } from '@/utils/request';
import { Loading } from "@/components/ui/loading";
import "./../audioPlayer.css";
import dynamic from "next/dynamic";
// Dynamically import the AudioPlayer component
const DynamicAudioPlayer = dynamic(
  () => import("react-modern-audio-player"),
  { ssr: false } // This line is important. It disables server-side rendering for the component.
);

const regex = /\/([^.]*)\.mp3/;

type AudioData = {
  src: string;
  id: number;
  name?: string;
  writer?: string;
  img?: string;
  description?: string;
  customTrackInfo?: string;
};
export default function () {
  // const [curIdx, setcurIdx] = useState(1);
  // const setPlayByCurId = function(key:number){
  //   setcurIdx(key);
  // }
  const [curPlayId, setCurPlayId] = useState({
    isPlaying: false,
    curPlayId: 1
  });
  const setPlay = function (key: number) {
    setCurPlayId({
      isPlaying: true,
      curPlayId: key,
    });
  };
  const { data: musicList, loading } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/personal/music");
  
    if (code !== 0) {
      throw new Error('fetch token failed');
    }
  
    return   data.map((item: { id: any; song_name: any; song_url:string }) => {
      const songId1 = item.song_url?.match?.(regex)?.[1];
      return {
        name: item.song_name,
        writer: "",
        img:  `https://cdn1.suno.ai/image_${songId1}.png`,
        src: item.song_url,
        id: item.id
      }
    })
  }, {
    retryCount: 3,
    retryInterval: 100
  });

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 mb-16">
        {!!loading ? (
          <Loading />
        ) : musicList && musicList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 lg:gap-12">
            {musicList.map((music:AudioData) => {
              return (
                <div className="rounded-xl overflow-hidden inline-block" key={music.id}>
                  <div className="flex flex-col items-center justify-around h-full rounded-md bg-gradient-to-tr font-mono text-sm text-black bg-white">
                    <div className="cover flex flex-col items-center relative  w-full h-full">
                      <img src={music.img} alt={music.name} />
                      <div className="absolute top-1/2 max-w-full max-h-full m-auto">
                        <button onClick={() => setPlay(music.id)} >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.7041 7.08392C12.8232 6.54225 11.716 6.52439 10.8172 7.03035C9.91841 7.5363 9.35889 8.48868 9.35889 9.52439V30.4768C9.35889 31.5125 9.91841 32.4649 10.8172 32.9708C11.716 33.4768 12.8232 33.453 13.7041 32.9173L30.847 22.4411C31.6982 21.9232 32.216 21.0006 32.216 20.0006C32.216 19.0006 31.6982 18.0839 30.847 17.5601L13.7041 7.08392Z" fill="white"/>
                        </svg>
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-white p-3 font-bold"><span>{music.name}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow text-center dark:bg-gray-800 dark:border-gray-700">
            <p className="my-4 font-normal text-center text-gray-700 dark:text-gray-400">
              No music found.
            </p>
            <a href="/" className="inline-flex mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg">
              Generate music now
            </a>
          </div>
        )}
      </div>
      <footer className="fixed inset-x-0 bottom-0" >
      {!loading && musicList && musicList.length > 0 &&
          <DynamicAudioPlayer playList={musicList} 
          audioInitialState={curPlayId}
          // curIdx={curIdx}
          activeUI={{ all: true }}
          rootContainerProps={{ colorScheme: "dark" }} />}
      </footer> 
    </section>
  );
}
