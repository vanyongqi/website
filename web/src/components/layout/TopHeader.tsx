import { Layout, Button, Space, Switch, Badge, Input } from 'antd'
import { MenuOutlined, MoonOutlined, BulbOutlined, ShoppingCartOutlined, UserOutlined, ApiOutlined, SearchOutlined } from '@ant-design/icons'

const { Header } = Layout

type TopHeaderProps = {
  isDarkMode: boolean
  toggleDarkMode: () => void
  onOpenMobileMenu: () => void
  onPing: () => void
}

export function TopHeader({ isDarkMode, toggleDarkMode, onOpenMobileMenu, onPing }: TopHeaderProps) {
  return (
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onOpenMobileMenu}
          style={{ display: 'none' }}
          className="mobile-menu-btn"
        />
      </div>

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

      <Space>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<BulbOutlined />}
          className="neumorphic-switch"
        />

        <Badge count={3} size="small">
          <Button 
            type="text" 
            icon={<ShoppingCartOutlined />} 
            className="neumorphic-button"
          />
        </Badge>

        <Button 
          type="text" 
          icon={<UserOutlined />} 
          className="neumorphic-button"
        />

        <Button 
          type="primary" 
          icon={<ApiOutlined />}
          onClick={onPing}
          className="neumorphic-primary-button"
        >
          测试 API
        </Button>
      </Space>
    </Header>
  )
}

export default TopHeader


