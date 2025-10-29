// ===== React 应用入口文件 =====
// 这个文件是 React 应用的启动点，类似于程序的 main 函数

// 导入 React 核心库
import React from 'react'
// 导入 React DOM 的客户端渲染方法
import ReactDOM from 'react-dom/client'
// 导入 React Router 的浏览器路由组件
import { BrowserRouter } from 'react-router-dom'
// 导入 Ant Design 的全局样式（必须放在最前面）
import 'antd/dist/reset.css'
// 导入自定义主题样式
import './styles/theme.css'
// 导入我们的主应用组件
import App from './App'

/**
 * 启动 React 应用
 * 1. 找到 HTML 中的 <div id="root"> 元素
 * 2. 创建 React 根容器
 * 3. 渲染我们的应用组件
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode: 开发模式下的严格检查，帮助发现潜在问题
  <React.StrictMode>
    {/* BrowserRouter: 提供路由功能，让页面可以切换 */}
    <BrowserRouter>
      {/* App: 我们的主应用组件，包含所有页面和功能 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
