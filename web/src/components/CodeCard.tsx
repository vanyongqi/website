import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Download, DollarSign, Star, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface CodeCardProps {
  id: number
  title: string
  author: string
  authorAvatar?: string
  preview: string // 代码预览图或项目截图
  price: number
  downloads: number
  rating?: number
  language: string // 编程语言
  framework?: string // 框架
  likes: number
  comments?: number
  tags: string[]
  height?: "short" | "medium" | "tall"
}

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-500",
  Python: "bg-green-500",
  React: "bg-cyan-500",
  Vue: "bg-emerald-500",
  "Next.js": "bg-black",
  Java: "bg-red-500",
  "C++": "bg-blue-600",
  Go: "bg-cyan-400",
}

export default function CodeCard({
  id,
  title,
  author,
  authorAvatar,
  preview,
  price,
  downloads,
  rating = 0,
  language,
  framework,
  likes,
  comments = 0,
  tags,
  height = "medium",
}: CodeCardProps) {
  const { theme } = useTheme()
  
  // 根据高度设置不同的预览图高度，模拟瀑布流效果
  const previewHeights = {
    short: "h-52",
    medium: "h-72",
    tall: "h-96",
  }

  const languageColor = languageColors[language] || "bg-gray-500"

  const cardBg = theme === "light"
    ? "bg-gradient-to-br from-blue-50/80 via-cyan-50/60 to-blue-50/80"
    : "bg-gradient-to-br from-slate-900/50 to-slate-800/50"

  const borderColor = theme === "light"
    ? "border-blue-200/15 border-[0.5px]"
    : "border-purple-500/8 border-[0.5px]"

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer backdrop-blur-sm",
      cardBg,
      borderColor
    )}>
      <Link to={`/codes/${id}`}>
        <div className="relative overflow-hidden">
          {/* 代码预览图/项目截图 */}
          <div className={cn(
            "relative w-full",
            previewHeights[height],
            theme === "light"
              ? "bg-gradient-to-br from-blue-100/40 via-cyan-100/30 to-blue-100/40"
              : "bg-gradient-to-br from-purple-900/30 via-slate-900 to-cyan-900/30"
          )}>
            <img
              src={preview}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* 价格标签 */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-background/90 text-foreground font-semibold gap-1">
                <DollarSign className="h-3 w-3" />
                {price === 0 ? "免费" : `¥${price}`}
              </Badge>
            </div>

            {/* 编程语言标签 */}
            <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap max-w-[calc(100%-6rem)]">
              <Badge className={cn("text-white border-none flex-shrink-0 whitespace-nowrap", languageColor)}>
                <Code className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{language}</span>
              </Badge>
              {framework && (
                <Badge variant="secondary" className="text-xs flex-shrink-0 whitespace-nowrap">
                  <span className="truncate">{framework}</span>
                </Badge>
              )}
            </div>

            {/* 悬停时显示的操作按钮 */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Button size="sm" variant="secondary" className="gap-2">
                <Heart className="h-4 w-4" />
                收藏
              </Button>
              <Button size="sm" variant="secondary" className="gap-2">
                <Share2 className="h-4 w-4" />
                分享
              </Button>
            </div>

            {/* 底部信息 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-xs">
                      {authorAvatar || author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{author}</span>
                </div>
                {rating > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
            </div>
          </div>
        </div>
        
        {/* 卡片内容 */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold line-clamp-1 flex-1">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs">{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {downloads > 1000 ? `${(downloads / 1000).toFixed(1)}K` : downloads}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {likes}
            </span>
            {comments > 0 && (
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {comments}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  )
}
