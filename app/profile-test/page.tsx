import React from "react";
import ProfileCard from "../components/ProfileCard";

export default function ProfileTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          ProfileCard 组件测试
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 默认配置 */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              默认配置
            </h2>
            <ProfileCard />
          </div>

          {/* 自定义配置 */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              自定义配置
            </h2>
            <ProfileCard
              name="Braydon"
              description="a passionate full-stack developer and designer. I love creating beautiful and functional web applications using modern technologies like React, Next.js, and TypeScript."
            />
          </div>
        </div>

        <div className="mt-12 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            功能测试说明
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              • <strong>悬停效果</strong>: 将鼠标悬停在头像上查看图片切换效果
            </li>
            <li>
              • <strong>问候语弹窗</strong>:
              页面加载2.5秒后会显示基于时间的问候语
            </li>
            <li>
              • <strong>庆祝动画</strong>: 点击问候语弹窗触发confetti动画
            </li>
            <li>
              • <strong>响应式设计</strong>: 调整浏览器窗口大小查看响应式效果
            </li>
            <li>
              • <strong>深色模式</strong>: 支持系统深色模式切换
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            这个组件已经从 Angular 成功迁移到 React/Next.js
          </p>
        </div>
      </div>
    </div>
  );
}