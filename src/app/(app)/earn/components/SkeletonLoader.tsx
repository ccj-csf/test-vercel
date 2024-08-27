'use client';
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      <section className="space-y-2">
        <h2 className="h-[21px] w-20 rounded-12 bg-gray-200"></h2>
        <div className="h-[72px] w-full rounded-12 bg-gray-200"></div>
      </section>
      <section className="space-y-2">
        <h2 className="h-[21px] w-24 rounded-12 bg-gray-200"></h2>
        <div className="h-[72px] w-full rounded-12 bg-gray-200"></div>
      </section>
      <section className="space-y-2">
        <h2 className="h-[21px] w-24 rounded-12 bg-gray-200"></h2>
        <div className="h-[70px] w-full rounded-12 bg-gray-200"></div>
        <div className="h-[70px] w-full rounded-12 bg-gray-200"></div>
        <div className="h-[70px] w-full rounded-12 bg-gray-200"></div>
        <div className="h-[70px] w-full rounded-12 bg-gray-200"></div>
      </section>
    </div>
  );
};

export default SkeletonLoader;
