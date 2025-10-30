// ===== 主应用组件 =====
// 这是整个应用的主要组件，负责布局和路由管理

// 导入 React hooks
import { useState } from 'react'
// 导入 React Router 的路由相关组件
import { Link, Route, Routes } from 'react-router-dom'
// 导入 Ant Design 的布局和 UI 组件
import { Layout, Menu, Button, Space, Typography, message, Switch, Drawer, Badge, Input } from 'antd'
// 导入 Ant Design 的图标
import { 
  HomeOutlined, 
  LoginOutlined, 
  ApiOutlined, 
  MenuOutlined, 
  BulbOutlined, 
  MoonOutlined,
  CodeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  HeartOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  SearchOutlined
} from '@ant-design/icons'
import TopBanner from './components/layout/TopBanner'
import Sidebar from './components/layout/Sidebar'
import TopHeader from './components/layout/TopHeader'
// 导入页面组件
import Home from './pages/Home'
import Login from './pages/Login'

// 从 Layout 组件中解构出 Header、Content、Sider
const { Header, Content, Sider } = Layout
// 从 Typography 组件中解构出 Title
const { Title, Text } = Typography

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
      message.success(`Ping: ${data.message}`)
    } catch (e) {
      message.error('Ping 失败')
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
   * 顶部导航菜单配置
   */
  const topMenuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '/login',
      icon: <LoginOutlined />,
      label: <Link to="/login">登录</Link>,
    },
  ]

  /**
   * 左侧功能菜单配置
   */
  const sideMenuItems = [
    {
      key: 'hot',
      icon: <FireOutlined />,
      label: '热门推荐',
    },
    {
      key: 'new',
      icon: <ThunderboltOutlined />,
      label: '最新发布',
    },
    {
      key: 'react',
      icon: <CodeOutlined />,
      label: 'React 组件',
    },
    {
      key: 'vue',
      icon: <CodeOutlined />,
      label: 'Vue 组件',
    },
    {
      key: 'node',
      icon: <CodeOutlined />,
      label: 'Node.js 工具',
    },
    {
      key: 'python',
      icon: <CodeOutlined />,
      label: 'Python 脚本',
    },
    {
      key: 'mobile',
      icon: <CodeOutlined />,
      label: '移动端开发',
    },
    {
      key: 'ui',
      icon: <CodeOutlined />,
      label: 'UI 组件库',
    },
    {
      key: 'utils',
      icon: <CodeOutlined />,
      label: '工具函数',
    },
    {
      key: 'templates',
      icon: <CodeOutlined />,
      label: '项目模板',
    },
  ]

  // 返回 JSX（应用的 UI 结构）
  return (
    <Layout 
      style={{ 
        minHeight: '100vh', 
        background: isDarkMode ? 'var(--color-bg-primary)' : 'var(--color-bg-secondary)',
        fontFamily: 'var(--font-family-primary)',
        color: 'var(--color-text-primary)'
      }}
    >
      <TopBanner />

      {/* ===== 主布局 ===== */}
      <Layout>
        {/* ===== 左侧功能栏（可收拉抽屉，默认折叠显示图标） ===== */}
        <Sidebar 
          isDarkMode={isDarkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          sideMenuItems={sideMenuItems}
        />

        {/* ===== 主内容区域 ===== */}
        <Layout style={{ marginLeft: sidebarCollapsed ? 64 : 240, transition: 'margin-left 0.2s ease' }}>
          {/* ===== 顶部导航栏 ===== */}
          <TopHeader 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onOpenMobileMenu={() => setMobileMenuVisible(true)}
            onPing={ping}
          />
          
          {/* ===== 主要内容区域 ===== */}
          <Content style={{ 
            padding: '24px', 
            background: isDarkMode ? 'var(--color-bg-primary)' : 'var(--color-bg-tertiary)',
            minHeight: 'calc(100vh - 64px)'
          }}>
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>

      {/* ===== 移动端抽屉菜单 ===== */}
      <Drawer
        title="功能菜单"
        placement="left"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
      >
        <Menu
          mode="inline"
          items={sideMenuItems}
          style={{ border: 'none' }}
        />
      </Drawer>
    </Layout>
  )
}
