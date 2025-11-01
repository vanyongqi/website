// ===== 首页组件 =====
// 瀑布流布局的代码展示页面（类似 Pinterest/liblib.art）

// 导入 React hooks
import { useState } from 'react'
// 导入 shadcn/ui 组件
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// 导入 lucide-react 图标
import { Heart, Eye, Download, Search, Code } from 'lucide-react'
// 导入瀑布流布局组件
import Masonry from 'react-masonry-css'
// 导入样式
import './Home.css'

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
    500: 1, // 手机1列
  }

  // 返回 JSX（shadcn/ui + Tailwind）
  // 组合过滤：标题或标签或作者任一命中
  const filtered = codeItems.filter((item) => {
    if (!searchValue) return true;
    const v = searchValue.toLowerCase();
    return (
      item.title.toLowerCase().includes(v) ||
      item.author.toLowerCase().includes(v) ||
      item.tags.some((t: string) => t.toLowerCase().includes(v))
    );
  });

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* 筛选与发布 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center flex-wrap gap-3">
          <span className="text-sm text-foreground/80">筛选：</span>
          {['全部','React','Vue','Node.js','Python','移动端','UI组件'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchValue(tag === '全部' ? '' : tag)}
              className={'chip ' + (searchValue === tag ? 'chip-active' : '')}
            >
              {tag}
            </button>
          ))}
        </div>
        <Button className="h-10">
          <Code className="w-4 h-4 mr-2" /> 发布代码
        </Button>
      </div>

      {/* 瀑布流布局 */}
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {filtered.map((item) => (
          <Card key={item.id} className="mb-4 neumo-card">
            <CardHeader className="p-0">
              <div className="relative cover-gradient rounded-md overflow-hidden" style={{ height: item.height }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                  <source src="https://liblibai-online.liblib.cloud/img/2509cd139f904e7a825c47e6ed687e62/afb8a7a7d29ce2bf0cba4fe5f477cf462b5dbffa2a3e5a841826705cdba993b6.mp4" type="video/mp4" />
                </video>
                <div className="cover-overlay"></div>
                <div className="relative z-10 h-full w-full flex items-center justify-center text-white text-base font-semibold">
                  预览：{item.title}
                </div>
                <div className="relative z-10 absolute bottom-0 inset-x-0 p-2 flex items-center justify-between text-white text-xs">
                  <span className="opacity-90">￥{item.price}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Eye className="w-4 h-4 icon-muted icon-hover" /> {item.views}</span>
                    <span className="inline-flex items-center gap-1"><Heart className="w-4 h-4 icon-muted icon-hover" /> {item.likes}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <h3 className="text-base font-semibold mb-1.5 leading-tight">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="chip text-xs">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2.5">
                <Avatar className="avatar-md">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.author.slice(0,1)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{item.author}</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between px-3 py-2.5">
              <span className="font-bold text-lg" style={{color: '#667eea'}}>￥{item.price}</span>
              <button type="button" className="btn-buy text-sm">
                <Download className="w-4 h-4" />
                立即购买
              </button>
            </CardFooter>
          </Card>
        ))}
      </Masonry>
    </div>
  )
}