'use client';
import { InfiniteScroll, PullToRefresh } from '@/biz-components';
import { Empty, Loading } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { IScrollItem, IScrollItemDataListResult } from '@/types';
import React, { ReactNode, useEffect, useState } from 'react';

interface InfiniteListProps {
  renderItem: (item: IScrollItem, index: number) => ReactNode;
  fetchData: (params: Record<string, any>) => Promise<IScrollItemDataListResult>;
  initialParams?: Record<string, any>;
  LoadingComponent?: ReactNode; // 自定义加载动画组件
  EmptyComponent?: ReactNode; // 自定义空状态组件
  className?: string; // 容器的自定义类名
  itemClassName?: string; // 列表项的自定义样式类名
  enablePullToRefresh?: boolean; // 是否启用下拉刷新
  enableInfiniteScroll?: boolean; // 是否启用无限滚动
}

/**
 * 无限列表组件
 * @param renderItem 渲染每个列表项的函数
 * @param fetchData 加载数据的函数，返回一个Promise
 * @param initialParams 初始加载数据时的参数
 * @param LoadingComponent 自定义的加载动画组件
 * @param EmptyComponent 自定义的空状态组件
 * @param className 容器的自定义类名
 * @param itemClassName 列表项的自定义样式类名
 * @param enablePullToRefresh 是否启用下拉刷新功能
 * @param enableInfiniteScroll 是否启用无限滚动功能
 * @returns 无限列表的React组件
 */
const InfiniteList: React.FC<InfiniteListProps> = ({
  renderItem,
  fetchData,
  initialParams,
  LoadingComponent,
  EmptyComponent,
  className = '',
  itemClassName = '',
  enablePullToRefresh = true,
  enableInfiniteScroll = true,
}) => {
  // 使用自定义的无限滚动hook
  const { list, hasMore, loadMore, resetAndFetch, refreshData } = useInfiniteScroll<IScrollItem>(
    fetchData,
    initialParams,
  );
  // 控制加载状态的state
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时重置并加载数据，最终确定加载状态
  useEffect(() => {
    setIsLoading(true);
    resetAndFetch().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  // 处理加载中的显示
  if (isLoading) {
    return (
      LoadingComponent || (
        <div className="relative   -top-[100px]">
          <Loading />
        </div>
      )
    );
  }

  // 根据数据列表的状态渲染内容或空状态
  const content = (
    <>
      {list.length === 0 ? (
        EmptyComponent || <Empty />
      ) : (
        <div className={`${className}`}>
          {list?.map((item, index) => (
            <div key={index} className={itemClassName}>
              {renderItem(item, index)}
            </div>
          ))}
          {enableInfiniteScroll && <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />}
        </div>
      )}
    </>
  );

  // 根据是否启用下拉刷新，决定是否添加PullToRefresh组件
  return enablePullToRefresh ? (
    <PullToRefresh onRefresh={refreshData}>{content}</PullToRefresh>
  ) : (
    content
  );
};

export default InfiniteList;
