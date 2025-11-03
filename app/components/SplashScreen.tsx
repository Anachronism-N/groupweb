"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// 简单的导入页组件
function SplashScreen({
  children,
  showOnRootPathOnly = true,
}: {
  children: React.ReactNode;
  showOnRootPathOnly?: boolean;
}) {
  // 状态管理
  const [showSplash, setShowSplash] = useState(true);
  const [currentImage, setCurrentImage] = useState(1); // 1表示intro1.png，2表示intro2.png

  useEffect(() => {
    // 仅在浏览器端执行
    if (typeof window === "undefined") {
      setShowSplash(false);
      return;
    }

    // 检查是否在根路径
    const shouldShowSplash =
      !showOnRootPathOnly || window.location.pathname === "/";
    if (!shouldShowSplash) {
      setShowSplash(false);
      return;
    }

    // 1.5秒后切换到第二张图片
    const imageSwitchTimer = setTimeout(() => {
      setCurrentImage(2);

      // 再等待1.5秒后显示主内容
      const hideSplashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 1500);

      return () => clearTimeout(hideSplashTimer);
    }, 1500);

    // 清理定时器
    return () => clearTimeout(imageSwitchTimer);
  }, [showOnRootPathOnly]);

  // 跳过导入页
  const handleSkip = () => {
    setShowSplash(false);
  };

  // 如果不显示导入页，直接返回子内容
  if (!showSplash) {
    return children;
  }

  // 返回导入页UI
  return (
    <>
      {/* 导入页覆盖层 */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        {/* 图片 */}
        <Image
          src={currentImage === 1 ? "/leadin/intro1.png" : "/leadin/intro2.png"}
          alt={`Introduction ${currentImage}`}
          className="animate-bounce-in h-64 max-h-[60vh] w-auto max-w-[80vw] object-contain"
          key={`image-${currentImage}`} // 添加key以确保图片切换时重新应用动画
          width={256}
          height={256}
        />

        {/* 跳过按钮 */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 text-sm text-gray-500 hover:text-gray-800"
        >
          Skip
        </button>

        {/* 内联CSS动画 */}
        <style jsx>{`
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            30% {
              transform: scale(1.1);
            }
            60% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-bounce-in {
            animation: bounceIn 1s ease-out 1;
          }
        `}</style>
      </div>

      {/* 主内容 - 当导入页显示时，将主内容隐藏 */}
      <div style={{ display: "none" }}>{children}</div>
    </>
  );
}

export default SplashScreen;
