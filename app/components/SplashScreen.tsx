"use client";

import * as React from "react";
import { motion } from "framer-motion";

// 核心动画组件 - 带有缩放动画效果的Logo (这部分无需修改)
const LogoAnimation = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex items-center justify-center uppercase tracking-wider">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, repeat: 1, repeatType: "mirror" }}
          onAnimationComplete={onComplete}
        >
          <h1 className="text-center text-3xl font-bold text-black sm:text-3xl lg:text-4xl">
            Braydon
          </h1>
          <p className="text-center text-xl font-extrabold text-black sm:text-2xl lg:text-2xl">
            Coyer
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- 以下是主要修改区域 ---

// 封面动画管理器 - 控制显示时间和条件
const SplashScreen = ({
  children,
  showOnRootPathOnly = true,
  autoHideAfterMs, // <-- 第 1 步：接收新的 prop
}: {
  children: React.ReactNode;
  showOnRootPathOnly?: boolean;
  autoHideAfterMs?: number; // <-- 第 2 步：在类型定义中声明它
}) => {
  const [isDisplaying, setIsDisplaying] = React.useState(true);

  // 这个 useEffect 保持不变，用于处理只在首页显示的逻辑
  React.useEffect(() => {
    const shouldShow =
      !showOnRootPathOnly ||
      (typeof window !== "undefined" && window.location.pathname === "/");

    if (!shouldShow) {
      setIsDisplaying(false);
      return;
    }
  }, [showOnRootPathOnly]);

  // --- 第 3 步：添加新的 useEffect 来处理自动隐藏 ---
  React.useEffect(() => {
    // 检查 autoHideAfterMs 是否被传入并且是一个有效的数字
    if (typeof autoHideAfterMs === "number") {
      // 设置一个定时器
      const timer = setTimeout(() => {
        setIsDisplaying(false); // 时间到了，隐藏封面
      }, autoHideAfterMs);

      // 这很关键：返回一个清理函数。
      // 如果组件在定时器触发前被卸载，这个函数会清除定时器，防止内存泄漏。
      return () => clearTimeout(timer);
    }
  }, [autoHideAfterMs]); // 依赖数组中包含 autoHideAfterMs

  // 手动隐藏封面的方法 (由动画完成时调用)
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
