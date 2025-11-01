// ===== 主应用组件 =====
// 这是整个应用的主要组件，负责布局和路由管理

// 使用状态 导入 React hooks 管理组件内部状态（如暗黑模式开关）。
import { useState } from 'react'
// 导入 React Router 的路由相关组件
// Routes/Route 定义路径到页面组件的映射
// Link 渲染可点击的路由链接
import { Link, Route, Routes } from 'react-router-dom'
// 全局通知改用 sonner
import { toast } from 'sonner'
// 抽屉用 shadcn Sheet
import { Sheet, SheetContent } from '@/components/ui/sheet'
// 使用 lucide-react 图标替代原 antd 图标
import { Flame, Zap, Code } from 'lucide-react'
import TopBanner from './components/layout/TopBanner'
import Sidebar from './components/layout/Sidebar'
import TopHeader from './components/layout/TopHeader'
// 导入页面组件 导入页面组件，用在路由里 
import Home from './pages/Home'
import Login from './pages/Login'

/**
 * 主应用组件
 * 这个组件是整个应用的根组件，包含：
 * 1. 顶部广告横幅
 * 2. 左侧功能栏
 * 3. 页面路由配置
 * 4. 夜间模式切换
 */
export default function App() {
  // 状态管理
  const [isDarkMode, setIsDarkMode] = useState(false) // 夜间模式状态
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // 侧边栏折叠状态（默认折叠，只显示图标）
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false) // 移动端菜单显示状态

  /**
   * 测试 API 连接的函数
   * 当用户点击"测试 API"按钮时会调用这个函数
   */
  const ping = async () => {
    try {
      const res = await fetch('/api/v1/ping')
      const data = await res.json()
      toast(`Ping: ${data.message}`)
    } catch (e) {
      toast('Ping 失败')
    }
  }

  /**
   * 切换夜间模式
   */
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    // 设置主题属性到根元素
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }


  /**
   * 左侧功能菜单配置
   */
  const sideMenuItems = [
    {
      key: 'hot',
      icon: <Flame className="w-4 h-4" />,
      label: '热门推荐',
    },
    {
      key: 'new',
      icon: <Zap className="w-4 h-4" />,
      label: '最新发布',
    },
    {
      key: 'react',
      icon: <Code className="w-4 h-4" />,
      label: 'React 组件',
    },
    {
      key: 'vue',
      icon: <Code className="w-4 h-4" />,
      label: 'Vue 组件',
    },
    {
      key: 'node',
      icon: <Code className="w-4 h-4" />,
      label: 'Node.js 工具',
    },
    {
      key: 'python',
      icon: <Code className="w-4 h-4" />,
      label: 'Python 脚本',
    },
    {
      key: 'mobile',
      icon: <Code className="w-4 h-4" />,
      label: '移动端开发',
    },
    {
      key: 'ui',
      icon: <Code className="w-4 h-4" />,
      label: 'UI 组件库',
    },
    {
      key: 'utils',
      icon: <Code className="w-4 h-4" />,
      label: '工具函数',
    },
    {
      key: 'templates',
      icon: <Code className="w-4 h-4" />,
      label: '项目模板',
    },
  ]

  // 返回 JSX（应用的 UI 结构）
  return (
    <div className="min-h-screen text-foreground bg-background">
      <TopBanner />

      {/* 主布局：左侧 Sidebar + 右侧主内容 */}
      <div className="flex">
        {/* 左侧功能栏 */}
        <Sidebar 
          isDarkMode={isDarkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          sideMenuItems={sideMenuItems}
        />

        {/* 右侧主区域，左侧宽度变化时用 margin-left 让出空间 */}
        <div className={sidebarCollapsed ? 'ml-[64px] transition-[margin-left] duration-200 ease-linear flex-1' : 'ml-[240px] transition-[margin-left] duration-200 ease-linear flex-1'}>
          {/* 顶部导航栏 */}
          <TopHeader 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onOpenMobileMenu={() => setMobileMenuVisible(true)}
            onPing={ping}
          />

          {/* 主要内容区域 */}
          <div className="p-6 min-h-[calc(100vh-64px)] bg-background">
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* 移动端抽屉菜单（Sheet 实现） */}
      <Sheet open={mobileMenuVisible} onOpenChange={setMobileMenuVisible}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="p-4 font-semibold">功能菜单</div>
          <nav className="px-2 pb-4">
            <ul className="space-y-1">
              {sideMenuItems.map((item) => (
                <li key={item.key}>
                  <Link to={item.key === 'hot' ? '/' : `/${item.key}`} className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
