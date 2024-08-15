'use client';
import { Loading } from '@/components';
import { PullToRefresh as AntdPullToRefresh } from 'antd-mobile';
import type {
  PullToRefreshProps as AntdPullToRefreshProps,
  PullStatus,
} from 'antd-mobile/es/components/pull-to-refresh';
import React from 'react';

// 将状态文本定义为组件的Props类型
interface PullToRefreshProps extends AntdPullToRefreshProps {
  onRefresh: () => Promise<void>;
  children?: React.ReactNode;
  headHeight?: number;
}

const statusRecord: Record<PullStatus, string> = {
  pulling: 'Pull down to refresh',
  canRelease: 'Release to refresh',
  refreshing: 'Loading…',
  complete: 'Load complete',
};

// 封装的PullToRefresh组件
const PullToRefresh: React.FC<PullToRefreshProps> = (props) => {
  const { onRefresh, children, headHeight = 60, ...others } = props;

  const renderLoadingText = (status: PullStatus) => (
    <div className="text-chx-gray-darkest flex items-center justify-center text-12">
      <Loading />
      <span className="ml-2">{statusRecord[status]}</span>
    </div>
  );

  return (
    <AntdPullToRefresh
      headHeight={headHeight}
      renderText={renderLoadingText}
      onRefresh={onRefresh}
      {...others}
    >
      {children}
    </AntdPullToRefresh>
  );
};

export { PullToRefresh };
