'use client';

import { useMusicPlayerStore } from '@/store';
import Image from 'next/image';
import React from 'react';

const AlbumArt: React.FC = () => {
  const { playlist, currentTrackIndex } = useMusicPlayerStore();
  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="flex h-full  items-center justify-center">
      {/* 最外层的圆形 */}
      <div className=" flex h-[300px] w-[300px] items-center justify-center rounded-full border border-[#fff]/10 bg-[#74579c]">
        {/* 第二层背景图片 */}
        <div
          className="  flex h-[270px] w-[270px] items-center justify-center rounded-full "
          style={{
            backgroundImage: "url('/icons/CD.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* 第三层黑色背景 */}
          <div className="flex h-[178px] w-[178px] animate-spin-slow items-center justify-center rounded-full bg-black">
            {/* 第四层封面图片 */}
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
    </div>
  );
};

export default AlbumArt;
