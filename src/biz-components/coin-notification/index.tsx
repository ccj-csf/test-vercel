'use client';
import { useAnimationStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { CurrencyIconButton } from '../currency-icon-button';

const CoinNotification: React.FC = () => {
  const { coinCount, showNotification } = useAnimationStore();

  return (
    <AnimatePresence>
      {showNotification && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: coinCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: 1,
                y: -window.innerHeight - 50, // 向上飞出屏幕
                x: Math.random() * window.innerWidth - window.innerWidth / 2, // 随机x轴位置
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: Math.random() * 1.5 + 0.5, // 随机动画时长
                delay: index * 0.05, // 逐个延迟出现
              }}
              className="absolute bottom-0"
              style={{
                left: `${Math.random() * 100}%`, // 从任意位置产生
              }}
            >
              <CurrencyIconButton size={20} />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export { CoinNotification };
