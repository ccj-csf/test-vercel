'use client';
import { InfiniteScroll as AntdInfiniteScroll } from 'antd-mobile';
import type { InfiniteScrollProps as AntdInfiniteScrollProps } from 'antd-mobile/es/components/infinite-scroll';
import React from 'react';

import InfiniteScrollContent from './components/InfiniteScrollContent'; // 假设这是你的滚动加载内容组件

interface InfiniteScrollProps extends AntdInfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  children?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
  const { loadMore, hasMore, children, ...others } = props;
  return (
    <>
      {children}
      <AntdInfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} {...others} />
      </AntdInfiniteScroll>
    </>
  );
};

export { InfiniteScroll };
