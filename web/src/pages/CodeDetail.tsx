import { useParams } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { Heart, ShoppingCart, Star, Download, Code2, Calendar, User, Tag, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// 模拟数据
const codeDetail = {
  id: 1,
  title: "React 管理后台系统",
  description: "一个功能完整、开箱即用的 React 管理后台系统。包含用户管理、权限控制、数据可视化等核心功能，采用 TypeScript + React + Ant Design 构建，代码结构清晰，易于二次开发。",
  seller: {
    name: "TechPro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechPro",
    rating: 4.8,
    sales: 156
  },
  price: 99,
  originalPrice: 199,
  discount: 50,
  language: "TypeScript",
  framework: "React",
  category: "前端框架",
  tags: ["管理系统", "React", "TypeScript", "Ant Design", "权限管理"],
  features: [
    "完整的用户权限管理系统",
    "响应式设计，支持移动端",
    "丰富的表格和表单组件",
    "数据可视化图表",
    "代码注释完善，易于维护",
    "包含详细的使用文档"
  ],
  previewImages: [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  ],
  rating: 4.8,
  reviews: 45,
  sales: 156,
  createdAt: "2024-01-15",
  updatedAt: "2024-02-01",
  codeSize: "2.5MB",
  version: "1.2.0"
}

const reviews = [
  {
    id: 1,
    user: "开发者A",
    rating: 5,
    comment: "代码质量很高，结构清晰，非常适合二次开发！",
    date: "2024-02-10"
  },
  {
    id: 2,
    user: "开发者B",
    rating: 4,
    comment: "功能完整，文档详细，就是价格稍微有点贵。",
    date: "2024-02-05"
  },
]

export default function CodeDetail() {
  const { id } = useParams<{ id: string }>()
  const { theme } = useTheme()
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleBuy = () => {
    // 购买逻辑
    console.log("购买代码:", id)
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const bgGradient = theme === "light" 
    ? "from-blue-50 via-cyan-50/60 to-blue-50"
    : "from-slate-950 via-purple-950 to-slate-950"
  const textColor = theme === "light" ? "text-slate-900" : "text-white"

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} ${textColor} pl-4 pr-2 lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-6`}>
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 预览图 */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-slate-800 relative">
                <img
                  src={codeDetail.previewImages[selectedImage]}
                  alt={codeDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {codeDetail.previewImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index ? "bg-cyan-400 w-8" : "bg-slate-600 hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* 基本信息 */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{codeDetail.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {codeDetail.seller.name}
                      </span>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {codeDetail.createdAt}
                      </span>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        {codeDetail.rating} ({codeDetail.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 leading-relaxed">{codeDetail.description}</p>

                <div className="flex flex-wrap gap-2">
                  {codeDetail.tags.map((tag) => (
                    <Badge key={tag} className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div>
                    <div className="text-sm text-slate-400">编程语言</div>
                    <div className="text-lg font-semibold text-cyan-400">{codeDetail.language}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">框架</div>
                    <div className="text-lg font-semibold text-purple-400">{codeDetail.framework}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">版本</div>
                    <div className="text-lg font-semibold text-pink-400">{codeDetail.version}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">大小</div>
                    <div className="text-lg font-semibold text-yellow-400">{codeDetail.codeSize}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 功能特性 */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>核心功能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {codeDetail.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 评价 */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>用户评价 ({codeDetail.reviews})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-800 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.user}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-slate-400">{review.date}</span>
                      </div>
                      <p className="text-slate-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：购买卡片 */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle>立即购买</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-cyan-400">¥{codeDetail.price}</span>
                  <span className="text-lg text-slate-500 line-through">¥{codeDetail.originalPrice}</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                    {codeDetail.discount}% OFF
                  </Badge>
                </div>

                <Separator className="bg-slate-800" />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">销量</span>
                    <span className="text-white font-semibold">{codeDetail.sales}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">评价</span>
                    <span className="text-white font-semibold">{codeDetail.rating} ({codeDetail.reviews})</span>
                  </div>
                </div>

                <Separator className="bg-slate-800" />

                <div className="space-y-3">
                  <Button
                    onClick={handleBuy}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-purple-500/50"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    立即购买
                  </Button>
                  <Button
                    onClick={handleFavorite}
                    variant="outline"
                    className="w-full border-slate-700 text-white hover:bg-pink-500/10 hover:border-pink-500/50"
                    size="lg"
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isFavorited ? "fill-pink-400 text-pink-400" : ""}`} />
                    {isFavorited ? "已收藏" : "收藏"}
                  </Button>
                </div>

                <Separator className="bg-slate-800" />

                {/* 开发者信息 */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 p-0.5">
                      <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center">
                        <User className="h-6 w-6 text-cyan-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{codeDetail.seller.name}</div>
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        {codeDetail.seller.rating} · 已售 {codeDetail.seller.sales}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                    查看开发者主页
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

