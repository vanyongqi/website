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
      {/* ===== 顶部广告横幅 ===== */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%)',
        color: 'white',
        padding: '10px 24px',
        textAlign: 'center',
        fontSize: '15px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)',
        fontWeight: 500,
        letterSpacing: '0.3px'
      }}>
        <Text style={{ 
          color: 'white',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.3)',
          fontWeight: 600,
          letterSpacing: '0.3px',
          display: 'inline-block'
        }}>
          🎉 新用户注册即送 100 积分，限时优惠进行中！
        </Text>
        <Button 
          type="text" 
          size="small" 
          style={{ 
            position: 'absolute', 
            right: '24px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'white',
            opacity: 0.8,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          ✕
        </Button>
      </div>

      {/* ===== 主布局 ===== */}
      <Layout>
        {/* ===== 左侧功能栏（可收拉抽屉，默认折叠显示图标） ===== */}
        <Sider
          width={240}
          collapsedWidth={64}
          collapsed={sidebarCollapsed}
          collapsible
          trigger={null}
          style={{
            background: isDarkMode ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
            borderRight: isDarkMode ? 'none' : `1px solid var(--color-border-primary)`,
            position: 'fixed',
            height: '100vh',
            left: 0,
            top: 0,
            zIndex: 98,
            overflow: 'hidden',
            transition: 'width 0.2s ease',
            boxShadow: isDarkMode ? 'none' : 'var(--shadow-sm)'
          }}
        >
          {/* 侧边栏头部 */}
          <div style={{ 
            padding: sidebarCollapsed ? '16px 8px' : '16px',
            borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.04)' : `1px solid var(--color-border-primary)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            minHeight: '48px',
            marginTop: '40px' // 为横幅留出空间
          }}>
            {!sidebarCollapsed && (
              <Title level={4} style={{ 
                margin: 0, 
                color: 'var(--color-text-primary)',
                fontSize: '18px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                代码市场
              </Title>
            )}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                width: sidebarCollapsed ? '100%' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-primary)',
                fontSize: '16px'
              }}
            />
          </div>

          {/* 功能菜单 */}
          <Menu
            mode="inline"
            items={sideMenuItems}
            inlineCollapsed={sidebarCollapsed}
            style={{
              border: 'none',
              background: 'transparent',
              marginTop: '8px',
              height: 'calc(100% - 140px)', // 预留头部和底部空间
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
            theme={isDarkMode ? 'dark' : 'light'}
            selectedKeys={[]} // 可以根据路由动态设置选中项
          />

          {/* 底部用户操作 */}
          <div style={{ 
            position: 'absolute', 
            bottom: '16px', 
            left: sidebarCollapsed ? '8px' : '16px',
            right: sidebarCollapsed ? '8px' : '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.04)' : `1px solid var(--color-border-primary)`,
            paddingTop: '8px'
          }}>
            <Button 
              type="text" 
              icon={<HeartOutlined />}
              style={{ 
                textAlign: sidebarCollapsed ? 'center' : 'left',
                color: isDarkMode ? '#fff' : '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                padding: sidebarCollapsed ? '8px' : '8px 12px',
                height: '36px',
                width: '100%'
              }}
              title={sidebarCollapsed ? '我的收藏' : ''}
            >
              {!sidebarCollapsed && '我的收藏'}
            </Button>
            <Button 
              type="text" 
              icon={<StarOutlined />}
              style={{ 
                textAlign: sidebarCollapsed ? 'center' : 'left',
                color: isDarkMode ? '#fff' : '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                padding: sidebarCollapsed ? '8px' : '8px 12px',
                height: '36px',
                width: '100%'
              }}
              title={sidebarCollapsed ? '我的作品' : ''}
            >
              {!sidebarCollapsed && '我的作品'}
            </Button>
            <Button 
              type="text" 
              icon={<SettingOutlined />}
              style={{ 
                textAlign: sidebarCollapsed ? 'center' : 'left',
                color: isDarkMode ? '#fff' : '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                padding: sidebarCollapsed ? '8px' : '8px 12px',
                height: '36px',
                width: '100%'
              }}
              title={sidebarCollapsed ? '设置' : ''}
            >
              {!sidebarCollapsed && '设置'}
            </Button>
          </div>
        </Sider>

        {/* ===== 主内容区域 ===== */}
        <Layout style={{ marginLeft: sidebarCollapsed ? 64 : 240, transition: 'margin-left 0.2s ease' }}>
          {/* ===== 顶部导航栏 ===== */}
          <Header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: isDarkMode ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
            boxShadow: 'var(--shadow-sm)',
            padding: '0 24px',
            position: 'sticky',
            top: '40px',
            zIndex: 99
          }}>
            {/* 左侧：移动端菜单 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuVisible(true)}
                style={{ display: 'none' }} // 在移动端显示
                className="mobile-menu-btn"
              />
            </div>
            
            {/* 中间：搜索框 */}
            <div style={{ 
              flex: 1, 
              maxWidth: '600px', 
              margin: '0 0 0 24px',
              position: 'relative'
            }}>
              <div className="neumorphic-search-container">
                <Input
                  placeholder="搜索代码、标签、作者..."
                  size="large"
                  className="neumorphic-search-input"
                />
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  className="neumorphic-search-button"
                />
              </div>
            </div>
            
            {/* 右侧：功能按钮 */}
            <Space>
              {/* 夜间模式切换 */}
              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<BulbOutlined />}
                className="neumorphic-switch"
              />

              {/* 购物车 */}
              <Badge count={3} size="small">
                <Button 
                  type="text" 
                  icon={<ShoppingCartOutlined />} 
                  className="neumorphic-button"
                />
              </Badge>

              {/* 用户头像 */}
              <Button 
                type="text" 
                icon={<UserOutlined />} 
                className="neumorphic-button"
              />

              {/* API 测试按钮 */}
              <Button 
                type="primary" 
                icon={<ApiOutlined />}
                onClick={ping}
                className="neumorphic-primary-button"
              >
                测试 API
              </Button>
            </Space>
          </Header>
          
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
