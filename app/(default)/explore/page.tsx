"use client";

import { useEffect, useState } from "react";
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
  const [curPlayId, setCurPlayId] = useState({
    isPlaying: false,
    curPlayId: 0
  });
  const setPlay = function (key: any) {
    setCurPlayId({
      isPlaying: true,
      curPlayId: key,
    });
  };
  const { run, data: musicList, loading } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/music/token");

    if (code !== 0) {
      throw new Error('fetch token failed');
    }

    const resp = await fetchEnhanced("/api/music/explore", {
      headers: {
        "Authorization": `Bearer ${data}`,
      }
    });

    if (resp.code !== 0) {
      throw new Error('fetch explore failed');
    }

    return resp?.data.map((item: {title: string; image_url:string, audio_url:string},idx: number) => {
      return {
        name: item.title,
        writer: "",
        img:  item.image_url,
        src: item.audio_url,
        id: idx
      }
    })
  }, {
    manual: true,
    retryCount: 3,
    retryInterval: 100
  });

  // Avoid executing the development environment twice, which may cause errors.
  useEffect(() => {
    const timeoutId = setTimeout(run, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [])

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 mb-16">
        {!!loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 lg:gap-12">
            {musicList && musicList.map((music:AudioData) => {
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
        )}
      </div>
      <footer className="fixed inset-x-0 bottom-0" >
      {!loading && musicList && musicList.length > 0 &&
          <DynamicAudioPlayer playList={musicList} 
          audioInitialState={curPlayId}
          activeUI={{ all: true }}
          rootContainerProps={{ colorScheme: "dark" }} />}
      </footer> 
    </section>
  );
}
