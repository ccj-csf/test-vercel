'use client';
import React, { useEffect, useRef } from 'react';

const HeartbeatMonitor: React.FC = () => {
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const sendHeartbeat = async () => {
    try {
      const response = await fetch('/api/heartbeat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'online' }),
      });

      if (response.ok) {
        // console.log('Heartbeat sent');
      } else {
        // console.error('Failed to send heartbeat:', response.statusText);
      }
    } catch (error) {
      //   console.error('Failed to send heartbeat:', error);
    }
  };

  useEffect(() => {
    // 每秒发送一次心跳
    intervalIdRef.current = setInterval(sendHeartbeat, 1000);

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
