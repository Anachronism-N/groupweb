'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

// 核心动画组件 - 带有缩放动画效果的Logo
const LogoAnimation = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex justify-center items-center uppercase tracking-wider">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, repeat: 1, repeatType: 'mirror' }}
          onAnimationComplete={onComplete}
        >
          <h1 className="text-3xl sm:text-3xl font-bold lg:text-4xl text-black text-center">
            Braydon
          </h1>
          <p className="text-xl sm:text-2xl lg:text-2xl font-extrabold text-center text-black">
            Coyer
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// 封面动画管理器 - 控制显示时间和条件
const SplashScreen = ({
  children,
  showOnRootPathOnly = true,
}: {
  children: React.ReactNode;
  showOnRootPathOnly?: boolean;
}) => {
  const [isDisplaying, setIsDisplaying] = React.useState(true);

  React.useEffect(() => {
    // 检查是否应该显示封面
    const shouldShow = !showOnRootPathOnly ||
      (typeof window !== 'undefined' && window.location.pathname === '/');

    if (!shouldShow) {
      setIsDisplaying(false);
      return;
    }
  }, [showOnRootPathOnly]);

  // 手动隐藏封面的方法
  const hideCover = () => {
    setIsDisplaying(false);
  };

  return (
    <>
      {isDisplaying && <LogoAnimation onComplete={hideCover} />}
      {children}
    </>
  );
};

export default SplashScreen;