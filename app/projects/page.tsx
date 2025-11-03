"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GridWrapper } from "@/app/components/GridWrapper";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  hoverImage: string;
  bio: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Li Yixuan",
    role: "UI Designer",
    image: "/profile/lyx_profile.jpg",
    hoverImage: "/profile/lyx_hover.png",
    bio: "Provides aesthetically pleasing materials for the website, including background images, logos, cartoon character designs.",
  },
  {
    name: "Liu Lixin",
    role: "Product Manager",
    image: "/profile/llx_profile.jpg",
    hoverImage: "/profile/llx_hover.png",
    bio: "Coordinated the entire project, assigned tasks to everyone, and also participated in the front-end design and code writing.",
  },
  {
    name: "Li Siyi",
    role: "Developer",
    image: "/profile/lsy_profile.jpg",
    hoverImage: "/profile/lsy_hover.png",
    bio: "Involved in the document writing and some of the development work, including website construction and markdown rendering.",
  },
  {
    name: "Nie Zichao",
    role: "Developer",
    image: "/profile/nzc_profile.jpg",
    hoverImage: "/profile/nzc_hover.png",
    bio: "Involved in the document writing as well as the partial development, including interaction optimization, function integration and migration.",
  },
];

const projects: Project[] = [
  {
    title: "Lava",
    description:
      "AN action-packed educational game where learning Chinese characters becomes your key to surviving rising lava.",
    image: "/projects/project_lava.jpg",
    url: "https://a03zk7ecp370-deploy.space.z.ai/",
  },
  {
    title: "Barbie",
    description:
      "An AI-Native app that integrates generative AI (Images and text) to offer girls diverse career advice through different Barbie personas.",
    image: "/projects/project_barbie.jpg",
    url: "https://barbie.zeabur.app",
  },
];

// 移除不再需要的ProjectImage组件

// 团队成员头像组件，支持hover换图效果
function TeamMemberAvatar({ member }) {
  const [imageSrc, setImageSrc] = useState(member.image);
  const [isChanging, setIsChanging] = useState(false);

  const handleMouseEnter = () => {
    setIsChanging(true);
    setImageSrc(member.hoverImage);
  };

  const handleMouseLeave = () => {
    setIsChanging(true);
    setImageSrc(member.image);
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.svg
        className="mx-auto block"
        width="400"
        height="400"
        viewBox="0 0 400 400"
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
          cx="200"
          cy="200"
          r="199.5"
          stroke="#D6DADE"
          strokeOpacity="0.5"
        />
        <g filter="url(#filter0_i_0_1)">
          <rect x="0" y="0" width="400" height="400" rx="200" fill="#F7F7F8" />
          <rect
            x="0.75"
            y="0.75"
            width="398.5"
            height="398.5"
            rx="199.25"
            stroke="#D6DADE"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </g>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageSrc}
            className="mx-auto block h-[400px] w-[400px] cursor-pointer rounded-full object-cover transition-opacity hover:opacity-90"
            src={imageSrc}
            alt={member.name}
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
  );
}

export default function TeamPage() {
  return (
    <div className="relative space-y-16">
      <GridWrapper>
        <h1 className="mx-auto mt-16 max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          Team
        </h1>
      </GridWrapper>

      {/* 团队成员展示 - 保留新增内容在前面 */}
      <GridWrapper>
        <h2 className="mb-8 text-center text-2xl font-medium">Our Team</h2>
        <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-2">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex h-full max-w-md flex-col items-center justify-center text-center"
            >
              <div className="relative mx-auto mb-6 flex h-96 w-96 items-center justify-center overflow-hidden rounded-full">
                <TeamMemberAvatar member={member} />
              </div>
              <div className="mx-auto flex max-w-xs flex-grow flex-col items-center justify-center space-y-2 text-center">
                <h3 className="text-center text-xl font-medium leading-6 tracking-tight text-slate-900">
                  {member.name}
                </h3>
                <p className="text-center text-sm text-indigo-600">
                  {member.role}
                </p>
                <p className="text-center text-base leading-6 text-text-secondary">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GridWrapper>

      {/* 项目展示 - 保持原有内容不变 */}
      <GridWrapper>
        <h2 className="mb-8 text-center text-2xl font-medium">Our Projects</h2>
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.title} className="space-y-12">
              <GridWrapper className="flex justify-center px-10">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="drama-shadow rounded-xl"
                  width={800}
                  height={600}
                />
              </GridWrapper>
              <GridWrapper className="flex justify-center px-10">
                <div className="max-w-2xl text-balance text-center">
                  <h3 className="mb-3 text-2xl font-medium leading-6 tracking-tight text-slate-900 md:leading-none">
                    {project.title}
                  </h3>
                  <p className="mb-3 flex-grow text-base leading-6 text-text-secondary">
                    {project.description}
                  </p>
                  <a
                    className="inline-flex items-center text-sm font-medium text-indigo-600"
                    href={project.url}
                  >
                    Visit {project.title}
                    <svg
                      className="relative ml-2.5 mt-px overflow-visible"
                      width="3"
                      height="6"
                      viewBox="0 0 3 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M0 0L3 3L0 6"></path>
                    </svg>
                  </a>
                </div>
              </GridWrapper>
            </div>
          ))}
        </div>
      </GridWrapper>
    </div>
  );
}
