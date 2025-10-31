// ===== 主应用组件 =====
// 这是整个应用的主要组件，负责布局和路由管理

// 使用状态 导入 React hooks 管理组件内部状态（如暗黑模式开关）。
import { useState } from 'react'
// 导入 React Router 的路由相关组件
// Routes/Route 定义路径到页面组件的映射
// Link 渲染可点击的路由链接
import { Link, Route, Routes } from 'react-router-dom'
// 导入 Ant Design 的布局和 UI 组件
// Layout/ Menu/ Button/ Switch/ Drawer/ Badge/ Input 等就是现成的 UI 积木
// Typography 包含 Title、Text 文本组件
// message 用来弹出全局提示
import { Layout, Menu, Button, Space, Typography, message, Switch, Drawer, Badge, Input } from 'antd'
// 导入 Ant Design 的图标 Ant Design 的图标组件（小房子、月亮、购物车等）
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
// 导入页面组件 导入页面组件，用在路由里 
import Home from './pages/Home'
import Login from './pages/Login'

// 从 Layout 组件中解构出 Header、Content、Sider 
const { Header, Content, Sider } = Layout
// 从 Typography 组件中解构出 Title ,从组件库对象里解构出子组件，写起来更简洁
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

      {/* === 整个页面的最外层布局，负责全站背景和主题色 === */}
      <Layout>
        {/* ===== 主布局：分为左侧功能栏和右侧主区域 ===== */}
        <Layout>
          {/* ===== 左侧功能栏。Sidebar 是左导航栏的积木组件，参数是全局暗黑/折叠菜单/菜单数据等 ===== */}
          <Sidebar 
            isDarkMode={isDarkMode}              // 是否处于暗黑模式
            sidebarCollapsed={sidebarCollapsed}  // 侧边栏是否折叠收起
            setSidebarCollapsed={setSidebarCollapsed} // 切折叠的函数
            sideMenuItems={sideMenuItems}        // 菜单项数组，定义侧边栏所有菜单
          />

          {/* ===== 主内容区域。用内层 Layout 控制右区（marginLeft让右区挤开左栏），附带平滑动画 ===== */}
          <Layout style={{ marginLeft: sidebarCollapsed ? 64 : 240, transition: 'margin-left 0.2s ease' }}>
            {/* ===== 顶部导航栏（TopHeader），放右区顶部。下面 props 可以控制主题、移动菜单、测试API等功能 ===== */}
            <TopHeader 
              isDarkMode={isDarkMode} // 是否暗黑，用于切换按钮风格
              toggleDarkMode={toggleDarkMode} // 切换主题
              onOpenMobileMenu={() => setMobileMenuVisible(true)} // 手机端菜单开关
              onPing={ping} // API 测试按钮
            />

            {/* ===== 主要内容区域（Content），所有页面的主内容会由路由展示在这里 ===== */}
            <Content 
              style={{ 
                padding: '24px', // 内边距，内容离外框距离，防止内容贴边
                background: isDarkMode ? 'var(--color-bg-primary)' : 'var(--color-bg-tertiary)', // 根据主题切换背景色
                minHeight: 'calc(100vh - 64px)' // 最小高度=一屏高度-顶部横幅，页面填满防止塌陷
              }}
            >
              {/* 路由切换区，不同路径展示不同页面组件 */}
              <Routes>
                <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>

        {/* ===== 移动端抽屉菜单，响应式时用 ===== */}
        {/*
          Drawer 是 Ant Design 的弹层组件，采用了 React 的 Portal 技术：
          - 无论你在 JSX 里把 <Drawer /> 写在第几行，它实际渲染时会被插入到<body>底下，浮在页面最顶级层级，不是按顺序排列的。
          - placement="left" 表示抽屉从左边滑出来，并完全覆盖在左侧（和"写在最后"没关系，是弹层默认效果）
          - open={mobileMenuVisible} 控制抽屉是否显示（true 就弹出，false 就隐藏）
          - onClose={() => setMobileMenuVisible(false)} 用来点空白处或关闭按钮时让抽屉隐藏
          - 这种 Portal 弹层的设计让你的页面结构清晰，但弹层内容可以全局飘在最前面！
        */}
        <Drawer
          title="功能菜单"
          placement="left"
          onClose={() => setMobileMenuVisible(false)} // 点击关闭按钮或蒙层时隐藏 Drawer
          open={mobileMenuVisible} // 是否显示 Drawer，由 mobileMenuVisible 控制定
          width={280} // 抽屉宽度
        >
          {/* Drawer 里的内容同 Sidebar 的菜单，方便移动端也能点功能 */}
          <Menu
            mode="inline"
            items={sideMenuItems}
            style={{ border: 'none' }}
          />
        </Drawer>
      </Layout>
    </Layout>
  )
}
