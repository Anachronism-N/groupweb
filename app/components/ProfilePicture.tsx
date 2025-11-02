"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProfilePicture() {
  // 只使用两张图片
  const defaultImage = "/braydon_headshot_1.jpeg";
  const hoverImage = "/braydon_headshot_3.jpg";
  
  // 默认显示第一张图片
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [isChanging, setIsChanging] = useState(false);

  // 鼠标悬停时切换到第二张图片
  const handleMouseEnter = () => {
    setIsChanging(true);
    setImageSrc(hoverImage);
  };

  // 鼠标移走时恢复为第一张图片
  const handleMouseLeave = () => {
    setIsChanging(true);
    setImageSrc(defaultImage);
  };

  return (
    <div className="relative my-5 md:mt-9">
      <div className="relative">
        <motion.svg
          className="mx-auto"
          width="148"
          height="148"
          viewBox="0 0 148 148"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={isChanging ? { scale: 0.95 } : { scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
          onAnimationComplete={() => setIsChanging(false)}
        >
          <circle
            cx="74"
            cy="74"
            r="73.5"
            stroke="#D6DADE"
            strokeOpacity="0.5"
          />
          <g filter="url(#filter0_i_0_1)">
            <rect
              x="16"
              y="16"
              width="116"
              height="116"
              rx="58"
              fill="#F7F7F8"
            />
            <rect
              x="16.75"
              y="16.75"
              width="114.5"
              height="114.5"
              rx="57.25"
              stroke="#D6DADE"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_0_1"
              x="16"
              y="14"
              width="116"
              height="118"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-2" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.647059 0 0 0 0 0.682353 0 0 0 0 0.721569 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_0_1"
              />
            </filter>
          </defs>
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageSrc}
              className="h-[100px] w-[100px] cursor-pointer rounded-full transition-opacity hover:opacity-90"
              src={imageSrc}
              alt="Braydon Coyer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
