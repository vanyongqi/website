import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WorkCardProps {
  id: number
  title: string
  artist: string
  artistAvatar?: string
  image: string
  likes: number
  comments?: number
  views?: number
  tags: string[]
  height?: "short" | "medium" | "tall"
}

export default function WorkCard({
  id,
  title,
  artist,
  artistAvatar,
  image,
  likes,
  comments = 0,
  views = 0,
  tags,
  height = "medium",
}: WorkCardProps) {
  // 根据高度设置不同的图片高度，模拟瀑布流效果
  const imageHeights = {
    short: "h-52",
    medium: "h-72",
    tall: "h-96",
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <Link to={`/works/${id}`}>
        <div className="relative overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className={`
              w-full object-cover transition-transform duration-500 group-hover:scale-110
              ${imageHeights[height]}
            `}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* 悬停时显示的操作按钮 */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    {artistAvatar || artist.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{artist}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
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
            </div>
            <h3 className="font-semibold text-sm mb-1">{title}</h3>
          </div>
        </div>
        
        {/* 卡片内容 */}
        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">{artist.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{artist}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {likes}
            </span>
            {views > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {views}
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
