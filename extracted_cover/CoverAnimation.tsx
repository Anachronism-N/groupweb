// 提取的网页封面动画组件
// 这是从原始项目中提取的封面动画功能

import * as React from "react";
import { motion } from "framer-motion";

// 核心动画组件 - 带有缩放动画效果的Logo
const LogoAnimation = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-white">
      <div className="flex justify-start sm:justify-center items-center uppercase tracking-wider">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
          onAnimationComplete={onComplete}
        >
          <h1 className="text-3xl sm:text-3xl font-bold lg:text-4xl text-secondary-color-3 text-center font-idgrotesk">
            Dev
          </h1>
          <p className="text-xl sm:text-2xl lg:text-2xl font-extrabold text-center font-grotesk">
            Farouk
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// 封面动画管理器 - 控制显示时间和条件
const CoverAnimationManager = ({ 
  children, 
  autoHideAfterMs = 3000,
  showOnRootPathOnly = true 
}: { 
  children: React.ReactNode, 
  autoHideAfterMs?: number,
  showOnRootPathOnly?: boolean
}) => {
  const [isDisplaying, setIsDisplaying] = React.useState(true);

  React.useEffect(() => {
    // 检查是否应该显示封面
    const shouldShow = !showOnRootPathOnly || 
                      (typeof window !== 'undefined' && window.location.pathname === "/");
    
    if (!shouldShow) {
      setIsDisplaying(false);
      return;
    }

    // 设置定时器自动隐藏封面
    const timer = setTimeout(() => {
      setIsDisplaying(false);
    }, autoHideAfterMs);

    return () => clearTimeout(timer);
  }, [autoHideAfterMs, showOnRootPathOnly]);

  // 手动隐藏封面的方法
  const hideCover = () => {
    setIsDisplaying(false);
  };

  return isDisplaying ? (
    <LogoAnimation onComplete={hideCover} />
  ) : (
    <>{children}</>
  );
};

// 导出完整的封面动画组件
export { CoverAnimationManager, LogoAnimation };