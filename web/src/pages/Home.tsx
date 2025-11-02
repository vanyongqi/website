import CodeCard from "@/components/CodeCard"
import { Code2, Server, Layers, Wrench, Smartphone, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"

import { useTheme } from "@/contexts/ThemeContext"

export default function Home() {
  const { theme } = useTheme()
  // 生成代码项目数据
  const generateCodes = () => {
    const codes = []
    const heights: ("short" | "medium" | "tall")[] = ["short", "medium", "tall"]
    const languages = ["JavaScript", "TypeScript", "Python", "React", "Vue", "Next.js", "Java", "C++", "Go"]
    const frameworks = ["React", "Vue", "Next.js", "Nuxt", "Express", "Django", "Flask", "Spring", null]
    const tags = [
      "UI组件", "管理系统", "电商平台", "数据可视化", "API", "工具库", 
      "后台管理", "移动端", "小程序", "全栈", "前端框架", "后端服务"
    ]
    const authors = ["DeveloperA", "CodeMaster", "TechPro", "DevStudio", "CodeLab", "TechTeam", "DevHub", "CodeSpace"]
    
    // 使用代码相关的预览图
    const previews = [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400", // 代码
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    ]

    const projectTitles = [
      "React 管理后台系统", "Vue 电商平台", "Next.js 博客系统", 
      "数据可视化组件库", "Express API 框架", "Python 爬虫工具",
      "移动端 UI 组件", "全栈开发模板", "小程序商城", "后台管理系统",
      "实时聊天系统", "文件上传组件", "图表可视化库", "权限管理系统",
      "支付集成SDK", "图片处理工具", "数据表格组件", "表单构建器",
      "拖拽编辑器", "代码生成器"
    ]

    for (let i = 0; i < 20; i++) {
      const height = heights[Math.floor(Math.random() * heights.length)]
      const language = languages[Math.floor(Math.random() * languages.length)]
      const framework = frameworks[Math.floor(Math.random() * frameworks.length)] || undefined
      const randomTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
      const price = Math.random() > 0.3 ? Math.floor(Math.random() * 200) + 9 : 0 // 30% 免费
      
      codes.push({
        id: i + 1,
        title: projectTitles[i % projectTitles.length],
        author: authors[Math.floor(Math.random() * authors.length)],
        preview: previews[i % previews.length] + `&sig=${i}`,
        price,
        downloads: Math.floor(Math.random() * 5000) + 50,
        rating: Math.random() * 2 + 3, // 3-5星
        language,
        framework,
        likes: Math.floor(Math.random() * 300) + 10,
        comments: Math.floor(Math.random() * 50),
        tags: randomTags,
        height,
      })
    }
    
    return codes
  }

  const codes = generateCodes()

  // 分类导航数据 - 类比参考网站
  const categories = [
    {
      icon: Code2,
      title: "前端框架",
      description: "React Vue 组件库",
      href: "/explore?category=frontend",
      color: "text-cyan-400",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: Server,
      title: "后端服务",
      description: "API框架 微服务",
      href: "/explore?category=backend",
      color: "text-purple-400",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Layers,
      title: "全栈项目",
      description: "管理系统 电商平台",
      href: "/explore?category=fullstack",
      color: "text-pink-400",
      bgGradient: "from-pink-500/10 to-rose-500/10",
      borderColor: "border-pink-500/30"
    },
    {
      icon: Wrench,
      title: "工具库",
      description: "开发工具 实用组件",
      href: "/explore?category=tools",
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: Smartphone,
      title: "移动开发",
      description: "React Native Flutter",
      href: "/explore?category=mobile",
      color: "text-green-400",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: BarChart3,
      title: "数据可视化",
      description: "图表库 Dashboard",
      href: "/explore?category=visualization",
      color: "text-indigo-400",
      bgGradient: "from-indigo-500/10 to-violet-500/10",
      borderColor: "border-indigo-500/30"
    }
  ]

  // 活动数据 - 图片形式，增加数量以适应宽度
  const activities = [
    { 
      title: "视频爆款活动", 
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=200&fit=crop",
      href: "/explore?activity=video"
    },
    { 
      title: "万圣节活动", 
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=200&fit=crop",
      href: "/explore?activity=halloween"
    },
    { 
      title: "新用户注册送¥50", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=200&fit=crop",
      href: "/explore?activity=register"
    },
    { 
      title: "双十一限时优惠", 
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=200&fit=crop",
      href: "/explore?activity=double11"
    },
    { 
      title: "热门代码精选", 
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=200&fit=crop",
      href: "/explore?activity=hot"
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="pl-4 pr-2 lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-6">
        {/* 活动图片栏 - 一行横向展示，适应宽度 */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {activities.map((activity, idx) => (
            <Link
              key={idx}
              to={activity.href}
              className="group relative aspect-video overflow-hidden rounded-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-sm font-bold text-white drop-shadow-lg">{activity.title}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* 分类导航卡片 - 扁平设计，适应宽度 */}
        <div className="mb-8 flex gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.href}
                to={category.href}
                className={`group relative flex flex-1 items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 transition-all hover:border-opacity-60 hover:shadow-lg ${
                  theme === "light"
                    ? `bg-gradient-to-br from-blue-50/80 to-cyan-50/60 border-blue-200/30 border-[0.5px]`
                    : `bg-gradient-to-br ${category.bgGradient} ${category.borderColor}`
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${
                  theme === "light" ? "text-cyan-600" : category.color
                }`} />
                <div className="flex-1 min-w-0">
                  <h3 className={`mb-0.5 text-sm font-bold truncate ${
                    theme === "light"
                      ? "text-slate-900 group-hover:text-cyan-700"
                      : "text-white group-hover:text-white/90"
                  }`}>
                    {category.title}
                  </h3>
                  <p className={`text-xs truncate ${
                    theme === "light"
                      ? "text-slate-600 group-hover:text-slate-700"
                      : "text-slate-400 group-hover:text-slate-300"
                  }`}>
                    {category.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 瀑布流布局 */}
        <div 
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
          style={{
            columnGap: '1rem',
          }}
        >
          {codes.map((code) => (
            <div key={code.id} className="break-inside-avoid mb-4">
              <CodeCard {...code} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}