import { Button, Typography } from 'antd'

const { Text } = Typography

export function TopBanner() {
  return (
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
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
      >
        ✕
      </Button>
    </div>
  )
}

export default TopBanner


