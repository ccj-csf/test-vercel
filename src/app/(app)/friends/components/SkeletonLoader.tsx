'use client';
const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex animate-pulse flex-col items-center justify-center space-y-4">
        <div className="mt-8 h-[26px] w-[125px] rounded-4 bg-gray-200"></div>
        <div className="h-[18px] w-[339px] rounded-4 bg-gray-200"></div>
        <div className="h-[16px] w-[32px] rounded-4 bg-gray-200"></div>
        <div className="h-[84px] w-full rounded-12 bg-gray-200"></div>
        <div className="h-[64px] w-full rounded-12 bg-gray-200"></div>
        <div className="h-[136px] w-full rounded-12 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
