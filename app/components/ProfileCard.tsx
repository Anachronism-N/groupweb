"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface ProfileCardProps {
  name?: string;
  description?: string;
  defaultImage?: string;
  hoverImage?: string;
  lineImage?: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name = "Akshay",
  description = "an enthusiastic Software developer from Kerala, India. I'm passionate about PHP, Laravel, Tailwind CSS, technology, and music, and I'm dedicated to using my skills to create impactful solutions.",
  defaultImage = "/Me.png",
  hoverImage = "/mecloud.png",
  lineImage = "/line-1.svg",
  className = "",
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [gridCols, setGridCols] = useState("col-span-1");

  // 获取问候语
  const getGreeting = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // 庆祝动画
  const celebrate = () => {
    const duration = 3000;

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });

    setTimeout(() => confetti.reset(), duration);
  };

  // 更新网格列数
  const updateGridCols = (windowWidth: number) => {
    const cols =
      windowWidth >= 1024
        ? "col-span-2"
        : windowWidth >= 640
          ? "col-span-2"
          : "col-span-1";
    setGridCols(cols);
  };

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      updateGridCols(window.innerWidth);
    };

    // 初始化
    updateGridCols(window.innerWidth);

    // 延迟显示弹窗
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
      // 触发动画
      setTimeout(() => {
        setAnimatePopup(true);
      }, 50);
    }, 2500);

    // 添加事件监听器
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(popupTimer);
    };
  }, []);

  return (
    <div
      className={`hover-trigger group relative flex h-[280px] flex-col rounded-[30px] bg-white p-6 hover:shadow-lg md:gap-4 dark:bg-gray-800 dark:hover:shadow-xl ${className}`}
    >
      <div className="image-container relative h-20 w-20 lg:h-24 lg:w-24">
        {/* 问候语弹窗 */}
        {showPopup && (
          <div
            className={`font-satoshi xs:text-lg absolute -right-32 -top-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 pb-2 pt-1 text-sm font-semibold leading-none tracking-wide text-white transition-all duration-700 ease-out hover:from-red-600 hover:to-orange-400 xl:-right-40 xl:-top-2 xl:block xl:text-lg ${animatePopup ? "translate-y-0 transform opacity-100" : "translate-y-4 transform opacity-0"} `}
            onClick={celebrate}
            style={{
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              cursor: "pointer",
            }}
          >
            <span className="inline-block text-base">{getGreeting()}!</span>
            <svg
              width="21"
              height="13"
              viewBox="0 0 21 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-[11px] left-5 w-5 rotate-2 text-orange-500"
            >
              <path
                d="M20.473.465c-2.222 5.25-5.185 9.662-10.413 12.585C9.04 6.101 6.946 4.072-.096 1.182L3.5 1l14-.5 2.973-.035z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}

        {/* 默认图片 */}
        <Image
          src={defaultImage}
          alt="Profile image"
          width={96}
          height={96}
          className="default-image absolute left-0 top-0 h-full w-full rounded-full object-cover opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          priority
        />

        {/* 悬停图片 */}
        <Image
          src={hoverImage}
          alt="Profile hover image"
          width={96}
          height={96}
          className="hover-image absolute left-0 top-0 h-full w-full rounded-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        />
      </div>

      <div className="relative inline-block">
        <p className="text-md font-medium text-gray-500 dark:text-gray-300">
          I&apos;m{" "}
          <span className="font-playwrite relative inline-block text-sm font-bold text-black md:text-2xl dark:text-white">
            {name}
            <Image
              src={lineImage}
              alt="Decorative line"
              width={100}
              height={16}
              className="border-bottom-2 absolute left-0 h-4 w-full"
            />
          </span>
          , {description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;