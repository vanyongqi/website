import { Layout, Typography, Button, Menu } from 'antd'
import { MenuOutlined, HeartOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { Title } = Typography

type SidebarProps = {
  isDarkMode: boolean
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  sideMenuItems: any[]
}

export function Sidebar({ isDarkMode, sidebarCollapsed, setSidebarCollapsed, sideMenuItems }: SidebarProps) {
  return (
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
      <div style={{ 
        padding: sidebarCollapsed ? '16px 8px' : '16px',
        borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.04)' : `1px solid var(--color-border-primary)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarCollapsed ? 'center' : 'space-between',
        minHeight: '48px',
        marginTop: '40px'
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

      <Menu
        mode="inline"
        items={sideMenuItems}
        inlineCollapsed={sidebarCollapsed}
        style={{
          border: 'none',
          background: 'transparent',
          marginTop: '8px',
          height: 'calc(100% - 140px)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
        theme={isDarkMode ? 'dark' : 'light'}
        selectedKeys={[]}
      />

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
            color: 'var(--color-text-primary)',
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
            color: 'var(--color-text-primary)',
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
            color: 'var(--color-text-primary)',
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
  )
}

export default Sidebar


