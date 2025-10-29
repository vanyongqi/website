// ===== 首页组件 =====
// 瀑布流布局的代码展示页面（类似 Pinterest/liblib.art）

// 导入 React hooks
import { useState } from 'react'
// 导入 Ant Design 的组件
import { Card, Input, Tag, Avatar, Typography, Space, Button } from 'antd'
// 导入 Ant Design 的图标
import { HeartOutlined, EyeOutlined, DownloadOutlined, SearchOutlined, CodeOutlined } from '@ant-design/icons'
// 导入瀑布流布局组件
import Masonry from 'react-masonry-css'
// 导入样式
import './Home.css'

const { Title, Text } = Typography
const { Search } = Input

/**
 * 首页组件 - 瀑布流布局
 * 展示代码项目，使用瀑布流（Masonry）布局，类似 Pinterest 的风格
 */
interface HomeProps {
  isDarkMode?: boolean
}

export default function Home({ isDarkMode = false }: HomeProps) {
  // 搜索关键词状态
  const [searchValue, setSearchValue] = useState('')

  /**
   * 生成示例代码数据
   * 每个代码项目有不同的高度，形成瀑布流效果
   */
  const codeItems = [
    {
      id: 1,
      title: 'React 购物车组件',
      description: '一个完整的 React 购物车组件，包含添加、删除、数量更新等功能。代码简洁易懂，适合学习使用。',
      image: 'https://via.placeholder.com/300x200?text=React+Cart',
      tags: ['React', 'TypeScript', '购物车'],
      price: 29,
      views: 1234,
      likes: 89,
      author: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      height: 280, // 卡片高度（随机，模拟瀑布流）
    },
    {
      id: 2,
      title: 'Vue3 数据可视化',
      description: '基于 Vue3 和 ECharts 的数据可视化组件，支持多种图表类型。',
      image: 'https://via.placeholder.com/300x400?text=Vue3+Chart',
      tags: ['Vue3', 'ECharts', '数据可视化'],
      price: 39,
      views: 2345,
      likes: 156,
      author: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      height: 380,
    },
    {
      id: 3,
      title: 'Node.js 文件上传',
      description: '完整的 Node.js 文件上传解决方案，支持多文件上传、进度条、文件类型验证等功能。',
      image: 'https://via.placeholder.com/300x250?text=Node+Upload',
      tags: ['Node.js', 'Express', '文件上传'],
      price: 35,
      views: 3456,
      likes: 234,
      author: '王五',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      height: 320,
    },
    {
      id: 4,
      title: 'Python 爬虫框架',
      description: '一个简单易用的 Python 爬虫框架，支持多线程、代理池、数据存储等功能。帮助开发者快速构建爬虫项目。',
      image: 'https://via.placeholder.com/300x350?text=Python+Crawler',
      tags: ['Python', '爬虫', 'Scrapy'],
      price: 49,
      views: 4567,
      likes: 345,
      author: '赵六',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      height: 400,
    },
    {
      id: 5,
      title: '微信小程序 UI 组件库',
      description: '一套精美的微信小程序 UI 组件库，包含按钮、卡片、表单等常用组件。',
      image: 'https://via.placeholder.com/300x180?text=WeChat+UI',
      tags: ['微信小程序', 'UI组件', 'WeChat'],
      price: 25,
      views: 5678,
      likes: 412,
      author: '孙七',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      height: 260,
    },
    {
      id: 6,
      title: 'Go 微服务框架',
      description: '基于 Go 语言的微服务框架，支持服务发现、负载均衡、熔断器等功能。高性能、易扩展。',
      image: 'https://via.placeholder.com/300x300?text=Go+Microservice',
      tags: ['Go', '微服务', 'Gin'],
      price: 59,
      views: 6789,
      likes: 521,
      author: '周八',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      height: 360,
    },
    {
      id: 7,
      title: 'Flutter 动画库',
      description: 'Flutter 动画组件库，提供丰富的动画效果，让应用更加生动有趣。',
      image: 'https://via.placeholder.com/300x220?text=Flutter+Animation',
      tags: ['Flutter', '动画', 'Dart'],
      price: 32,
      views: 7890,
      likes: 678,
      author: '吴九',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      height: 300,
    },
    {
      id: 8,
      title: 'React Native 导航',
      description: 'React Native 导航解决方案，支持底部导航、侧边栏、路由跳转等功能。',
      image: 'https://via.placeholder.com/300x280?text=RN+Navigation',
      tags: ['React Native', '导航', '路由'],
      price: 38,
      views: 8901,
      likes: 745,
      author: '郑十',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
      height: 340,
    },
    {
      id: 9,
      title: 'Docker 部署脚本',
      description: '一键 Docker 部署脚本，支持多环境配置、自动构建、服务编排等功能。简化部署流程。',
      image: 'https://via.placeholder.com/300x240?text=Docker+Deploy',
      tags: ['Docker', '部署', 'DevOps'],
      price: 42,
      views: 9012,
      likes: 823,
      author: '钱十一',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
      height: 310,
    },
    {
      id: 10,
      title: 'TypeScript 工具库',
      description: 'TypeScript 常用工具函数库，包含日期处理、字符串操作、数组处理等功能。类型安全，易于使用。',
      image: 'https://via.placeholder.com/300x320?text=TS+Utils',
      tags: ['TypeScript', '工具库', 'utils'],
      price: 28,
      views: 10123,
      likes: 912,
      author: '孙十二',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
      height: 390,
    },
    {
      id: 11,
      title: 'CSS 动画效果',
      description: '精美的 CSS 动画效果集合，包含加载动画、过渡效果、3D 变换等。纯 CSS 实现，无依赖。',
      image: 'https://via.placeholder.com/300x200?text=CSS+Animation',
      tags: ['CSS', '动画', '效果'],
      price: 19,
      views: 11234,
      likes: 1089,
      author: '李十三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivy',
      height: 280,
    },
    {
      id: 12,
      title: '算法题解合集',
      description: 'LeetCode 热门算法题解，包含详细注释和多种解法。适合算法学习和面试准备。',
      image: 'https://via.placeholder.com/300x350?text=Algorithms',
      tags: ['算法', 'LeetCode', '面试'],
      price: 45,
      views: 12345,
      likes: 1234,
      author: '王十四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
      height: 400,
    },
  ]

  /**
   * 瀑布流的响应式断点配置
   * 不同屏幕尺寸显示不同数量的列
   */
  const breakpointColumnsObj = {
    default: 4, // 默认4列
    1920: 5, // 超大屏幕5列
    1600: 4, // 大屏幕4列
    1200: 3, // 中等屏幕3列
    768: 2, // 平板2列
    576: 1, // 手机1列
  }

  // 返回 JSX
  return (
    <div className={isDarkMode ? 'dark-mode' : ''} style={{ 
      padding: '0 24px', 
      maxWidth: '1800px', 
      margin: '0 auto', 
      paddingTop: '24px',
      background: 'transparent',
      minHeight: '100vh'
    }}>
      {/* ===== 筛选标签栏 ===== */}
      <div style={{ 
        marginBottom: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <Text strong style={{ color: 'var(--color-text-primary)' }}>筛选：</Text>
        {['全部', 'React', 'Vue', 'Node.js', 'Python', '移动端', 'UI组件'].map(tag => (
          <Button 
            key={tag}
            type={searchValue === tag ? 'primary' : 'default'}
            size="small"
            onClick={() => setSearchValue(tag)}
            style={{ 
              borderRadius: '16px',
              background: searchValue === tag ? 'var(--color-primary-500)' : 'var(--color-bg-elevated)',
              borderColor: searchValue === tag ? 'var(--color-primary-500)' : 'var(--color-border-secondary)',
              color: searchValue === tag ? 'white' : 'var(--color-text-primary)',
              boxShadow: searchValue === tag ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* ===== 瀑布流代码展示区域 ===== */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {codeItems.map((item) => (
          <Card
            key={item.id}
            hoverable
            className="neumorphic-card"
            style={{
              background: isDarkMode 
                ? 'linear-gradient(145deg, #2d3748, #1a2332)' 
                : 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
              border: 'none',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: isDarkMode
                ? '8px 8px 16px rgba(0, 0, 0, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.08)'
                : '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
              transition: 'all var(--transition-base)'
            }}
            cover={
              <div
                style={{
                  height: `${item.height}px`,
                  background: `linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* 背景视频 */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                  }}
                >
                  <source src="https://liblibai-online.liblib.cloud/img/2509cd139f904e7a825c47e6ed687e62/afb8a7a7d29ce2bf0cba4fe5f477cf462b5dbffa2a3e5a841826705cdba993b6.mp4" type="video/mp4" />
                </video>
                
                {/* 遮罩层 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.3)',
                  zIndex: 2
                }} />
                
                {/* 作者信息 - 左下角 */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  zIndex: 3
                }}>
                  <Avatar src={item.avatar} size="small" />
                  <Text style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
                    {item.author}
                  </Text>
                </div>

                {/* 代码预览图标 - 右上角 */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  backdropFilter: 'blur(10px)',
                  zIndex: 3
                }}>
                  <CodeOutlined />
                </div>
                
                {/* 作品标题 - 居中 */}
                <div style={{
                  position: 'relative',
                  zIndex: 3,
                  textAlign: 'center',
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}>
                  {item.title}
                </div>
              </div>
            }
            actions={[
              <div key="views" style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-text-secondary)',
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #374151, #283548)' 
                  : 'linear-gradient(145deg, #f1f3f4, #e8eaed)',
                padding: '6px 8px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer',
                border: 'none',
                boxShadow: isDarkMode
                  ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
                  : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0, 0, 0, 0.05)',
                flex: 1,
                minHeight: '28px'
              }}>
                <EyeOutlined style={{ fontSize: '12px' }} />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>{item.views}</span>
              </div>,
              <div key="likes" style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-text-secondary)',
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #374151, #283548)' 
                  : 'linear-gradient(145deg, #f1f3f4, #e8eaed)',
                padding: '6px 8px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer',
                border: 'none',
                boxShadow: isDarkMode
                  ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
                  : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0, 0, 0, 0.05)',
                flex: 1,
                minHeight: '28px'
              }}>
                <HeartOutlined style={{ fontSize: '12px' }} />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>{item.likes}</span>
              </div>,
              <div key="download" style={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-text-secondary)',
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #374151, #283548)' 
                  : 'linear-gradient(145deg, #f1f3f4, #e8eaed)',
                padding: '6px 8px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer',
                border: 'none',
                boxShadow: isDarkMode
                  ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2)'
                  : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0, 0, 0, 0.05)',
                flex: 1,
                minHeight: '28px'
              }}>
                <DownloadOutlined style={{ fontSize: '12px' }} />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>下载</span>
              </div>,
            ]}
          >
            {/* 卡片标题和描述 */}
            <Card.Meta
              title={
                <Title level={5} style={{ 
                  marginBottom: '8px',
                  color: 'var(--color-text-primary)'
                }}>
                  {item.title}
                </Title>
              }
              description={
                <Text style={{ 
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.description}
                </Text>
              }
            />

            {/* 标签区域 */}
            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
              <Space wrap size={[0, 8]}>
                {item.tags.map((tag) => (
                  <Tag 
                    key={tag} 
                    color="blue"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'var(--color-primary-50)',
                      borderColor: isDarkMode 
                        ? 'rgba(59, 130, 246, 0.3)' 
                        : 'var(--color-primary-200)',
                      color: isDarkMode 
                        ? 'rgba(147, 197, 253, 0.9)' 
                        : 'var(--color-primary-600)'
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </Space>
            </div>


            {/* 价格和操作按钮 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: isDarkMode 
                  ? '1px solid rgba(255, 255, 255, 0.1)' 
                  : '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <div>
                <Text strong style={{ 
                  fontSize: '20px', 
                  color: 'var(--color-primary-500)',
                  marginRight: '8px'
                }}>
                  ¥{item.price}
                </Text>
                <Text 
                  type="secondary" 
                  style={{ 
                    fontSize: '12px',
                    textDecoration: 'line-through',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'var(--color-text-tertiary)'
                  }}
                >
                  ¥{item.price + 10}
                </Text>
              </div>
              <Button 
                type="primary" 
                size="small"
                className="neumorphic-buy-button"
                style={{
                  background: 'linear-gradient(145deg, var(--color-primary-500), var(--color-primary-600))',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 8px rgba(14, 165, 233, 0.3), -4px -4px 8px rgba(14, 165, 233, 0.1)',
                  color: 'white',
                  fontWeight: 600
                }}
              >
                立即购买
              </Button>
            </div>
          </Card>
        ))}
      </Masonry>
    </div>
  )
}