# 网页封面动画组件

这个目录包含从原始网页中提取的封面动画功能，该动画在网站加载时显示一个带有变大变小效果的Logo。

## 文件结构

- `CoverAnimation.tsx` - 核心动画组件实现
- `CoverAnimation.css` - 配套样式文件
- `ExampleUsage.jsx` - 使用示例

## 功能说明

提取的封面动画主要包含以下功能：

1. **Logo缩放动画**：使用framer-motion实现的Logo变大变小的无限镜像动画
2. **自动隐藏**：在指定时间后自动隐藏封面，显示主内容
3. **条件显示**：可以配置只在根路径显示封面
4. **手动控制**：提供了手动隐藏封面的方法

## 核心动画代码

原始动画的核心部分是使用framer-motion实现的缩放效果：

```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: [0, 1.2, 1] }}
  transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
  onAnimationComplete={onComplete}
>
  {/* Logo文本 */}
</motion.div>
```

这个动画从scale为0开始（完全不可见），然后放大到1.2倍，再缩小到1倍，接着无限重复这个镜像动画。

## 使用方法

### 安装依赖

```bash
npm install framer-motion
```

### 基本使用

```jsx
import React from 'react';
import { CoverAnimationManager } from './CoverAnimation';
import './CoverAnimation.css';

function App() {
  return (
    <CoverAnimationManager 
      autoHideAfterMs={3000} // 3秒后自动隐藏
      showOnRootPathOnly={true} // 只在根路径显示
    >
      {/* 你的应用内容 */}
    </CoverAnimationManager>
  );
}
```

### 只使用Logo动画

如果你只需要Logo动画部分而不需要自动隐藏功能，可以单独使用`LogoAnimation`组件：

```jsx
import React from 'react';
import { LogoAnimation } from './CoverAnimation';
import './CoverAnimation.css';

function SomeComponent() {
  return (
    <LogoAnimation onComplete={() => console.log('动画完成')} />
  );
}
```

## 自定义选项

`CoverAnimationManager`组件接受以下props：

- `children`：封面隐藏后显示的内容
- `autoHideAfterMs`：自动隐藏的时间（毫秒），默认3000ms
- `showOnRootPathOnly`：是否只在根路径显示封面，默认true

## 原始代码来源

这个动画组件是从以下文件中提取并重构的：

1. `/app/components/SplashScreen.tsx` - 包含Logo动画的核心实现
2. `/app/components/SplashScreenManager.tsx` - 包含动画的显示逻辑和自动隐藏功能
3. `/app/layout.tsx` - 展示了动画在应用中的集成方式

## 样式自定义

你可以通过修改`CoverAnimation.css`文件来自定义动画的样式，包括：

- 字体和字体大小
- 颜色
- 背景
- 动画容器样式