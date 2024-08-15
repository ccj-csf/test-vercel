import { EMPTY_TIPS } from '@/constants';
import { NativeProps, withNativeProps } from '@/utils';
import Image from 'next/image'; // 导入 Next.js 的 Image 组件
import { FC, ReactNode, memo } from 'react';

interface EmptyProps extends NativeProps {
  description?: ReactNode | string;
  imageSrc?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
}

const Empty: FC<EmptyProps> = memo((props) => {
  const {
    description = EMPTY_TIPS,
    imageSrc = '/icons/empty.svg',
    imgAlt = 'empty',
    imgWidth = 80,
    imgHeight = 80,
  } = props;

  const renderImage = () => {
    if (imageSrc) {
      return (
        <div className=" flex  w-full items-center justify-center">
          <Image
            src={imageSrc}
            alt={imgAlt}
            width={imgWidth}
            height={imgHeight}
            className=" object-cover"
          />
        </div>
      );
    }
    // 如果没有提供 imageSrc，不渲染 Image 组件
    return null;
  };

  return withNativeProps(
    props,
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-12 text-gray-200">
      {renderImage()}
      <span className="mt-3">{description}</span>
    </div>,
  );
});
Empty.displayName = 'Empty';

export { Empty };
