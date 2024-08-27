'use client';
import { sendAppHeartbeat } from '@/services';
import React, { useEffect, useRef } from 'react';

const HeartbeatMonitor: React.FC = () => {
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const sendHeartbeat = async () => {
    try {
      const response = sendAppHeartbeat();
      console.log('Heartbeat response:', response);
    } catch (error) {
      console.error('Failed to send heartbeat:', error);
    }
  };

  useEffect(() => {
    // 每秒发送一次心跳
    intervalIdRef.current = setInterval(sendHeartbeat, 100000);

    // 清理函数：在组件卸载时清理心跳监测
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return null;
};

export { HeartbeatMonitor };
