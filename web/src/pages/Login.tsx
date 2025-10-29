// 导入 React 的 hooks（钩子函数）
import { useState } from 'react'
// 导入 Ant Design 的组件
import { Card, Form, Input, Button, Typography, Space, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// 从 Typography 组件中解构出 Title 组件
const { Title, Text } = Typography

/**
 * 登录页面组件
 * 这是一个 React 函数组件，用于用户登录
 */
export default function Login() {
  // 使用 useState hook 来管理组件的状态（数据）
  // username 是用户名，setUsername 是更新用户名的函数
  const [username, setUsername] = useState('')
  // password 是密码，setPassword 是更新密码的函数
  const [password, setPassword] = useState('')
  // loading 表示是否正在提交表单
  const [loading, setLoading] = useState(false)

  /**
   * 处理表单提交的函数
   * 当用户点击登录按钮时会调用这个函数
   */
  const handleSubmit = async () => {
    // 检查用户名和密码是否为空
    if (!username || !password) {
      message.warning('请输入用户名和密码')
      return
    }

    // 设置加载状态为 true，显示加载动画
    setLoading(true)
    
    try {
      // 模拟发送登录请求到后端
      // 这里暂时用 setTimeout 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 显示成功消息
      message.success(`欢迎回来，${username}！`)
      
      // 这里将来会调用真实的登录 API
      console.log('登录信息:', { username, password: '***' })
      
    } catch (error) {
      // 如果登录失败，显示错误消息
      message.error('登录失败，请检查用户名和密码')
    } finally {
      // 无论成功还是失败，都要关闭加载状态
      setLoading(false)
    }
  }

  // 返回 JSX（类似 HTML 的语法，但可以写 JavaScript）
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh' 
    }}>
      {/* 登录卡片 */}
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 400,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        {/* 登录标题 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>
            用户登录
          </Title>
          <Text type="secondary">
            请输入您的用户名和密码
          </Text>
        </div>

        {/* 登录表单 */}
        <Form
          name="login"
          onFinish={handleSubmit} // 当表单提交时调用 handleSubmit 函数
          autoComplete="off" // 关闭浏览器自动完成
        >
          {/* 用户名输入框 */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' }, // 必填验证
              { min: 3, message: '用户名至少3个字符!' } // 最小长度验证
            ]}
          >
            <Input
              prefix={<UserOutlined />} // 输入框前面的图标
              placeholder="请输入用户名"
              size="large" // 大尺寸
              value={username} // 绑定到 username 状态
              onChange={(e) => setUsername(e.target.value)} // 当输入改变时更新状态
            />
          </Form.Item>

          {/* 密码输入框 */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' }, // 必填验证
              { min: 6, message: '密码至少6个字符!' } // 最小长度验证
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />} // 输入框前面的图标
              placeholder="请输入密码"
              size="large" // 大尺寸
              value={password} // 绑定到 password 状态
              onChange={(e) => setPassword(e.target.value)} // 当输入改变时更新状态
            />
          </Form.Item>

          {/* 登录按钮 */}
          <Form.Item>
            <Button 
              type="primary" // 主要按钮样式（蓝色）
              htmlType="submit" // 提交按钮
              size="large" // 大尺寸
              loading={loading} // 显示加载状态
              block // 占满整行
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </Form.Item>
        </Form>

        {/* 其他操作 */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Space>
            <Button type="link" size="small">
              忘记密码？
            </Button>
            <Button type="link" size="small">
              注册账号
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}
