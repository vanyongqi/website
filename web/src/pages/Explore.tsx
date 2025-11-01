import CodeCard from "@/components/CodeCard"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export default function Explore() {
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
    
    const previews = [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
    ]

    const projectTitles = [
      "React 管理后台系统", "Vue 电商平台", "Next.js 博客系统", 
      "数据可视化组件库", "Express API 框架", "Python 爬虫工具",
      "移动端 UI 组件", "全栈开发模板", "小程序商城", "后台管理系统",
      "实时聊天系统", "文件上传组件", "图表可视化库", "权限管理系统",
      "支付集成SDK", "图片处理工具", "数据表格组件", "表单构建器",
      "拖拽编辑器", "代码生成器", "移动端框架", "微服务架构",
      "Serverless 模板", "GraphQL API", "实时协作系统", "数据分析平台",
      "监控告警系统", "自动化测试", "CI/CD 模板", "Docker 部署方案"
    ]

    for (let i = 0; i < 40; i++) {
      const height = heights[Math.floor(Math.random() * heights.length)]
      const language = languages[Math.floor(Math.random() * languages.length)]
      const framework = frameworks[Math.floor(Math.random() * frameworks.length)] || undefined
      const randomTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
      const price = Math.random() > 0.3 ? Math.floor(Math.random() * 200) + 9 : 0
      
      codes.push({
        id: i + 1,
        title: projectTitles[i % projectTitles.length],
        author: authors[Math.floor(Math.random() * authors.length)],
        preview: previews[i % previews.length] + `&sig=${i}`,
        price,
        downloads: Math.floor(Math.random() * 5000) + 50,
        rating: Math.random() * 2 + 3,
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

  return (
    <div className="min-h-screen py-8">
      <div className="pl-4 pr-2 lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-6">
        {/* 筛选栏 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">探索代码</h1>
            <p className="text-muted-foreground">发现更多优质代码项目</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
        </div>

        {/* 瀑布流布局 */}
        <div 
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
          style={{ columnGap: '1rem' }}
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