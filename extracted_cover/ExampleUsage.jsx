// 封面动画组件使用示例
// 这个文件展示了如何在React应用中集成提取的封面动画

import React from 'react';
import { CoverAnimationManager } from './CoverAnimation';
import './CoverAnimation.css';

function App() {
  return (
    <CoverAnimationManager 
      autoHideAfterMs={3000} // 3秒后自动隐藏封面
      showOnRootPathOnly={true} // 只在根路径显示
    >
      {/* 这里是应用的主要内容 */}
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              应用主内容区域
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <p>封面动画结束后，这里的内容将会显示出来。</p>
            <p>你可以自定义动画的显示时间、显示条件等属性。</p>
          </div>
        </main>
      </div>
    </CoverAnimationManager>
  );
}

export default App;

// 使用说明：
// 
// 1. 安装依赖：
//    npm install framer-motion
// 
// 2. 引入组件和样式：
//    import { CoverAnimationManager } from './path/to/CoverAnimation';
//    import './path/to/CoverAnimation.css';
// 
// 3. 包装你的应用内容：
//    将你的应用主内容包裹在CoverAnimationManager组件中
// 
// 4. 自定义选项：
//    - autoHideAfterMs: 自动隐藏的时间（毫秒）
//    - showOnRootPathOnly: 是否只在根路径显示
// 
// 5. 如果你只需要Logo动画部分，可以单独使用LogoAnimation组件：
//    import { LogoAnimation } from './path/to/CoverAnimation';
//    
//    <LogoAnimation onComplete={() => console.log('动画完成')} />