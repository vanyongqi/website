import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Star, Clock, CheckCircle, Package, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 模拟数据
const purchasedCodes = [
  {
    id: 1,
    title: "React 管理后台系统",
    seller: "TechPro",
    price: 99,
    purchasedDate: "2024-02-01",
    language: "TypeScript",
    downloads: 3,
    rating: 5
  },
  {
    id: 2,
    title: "Vue 电商平台",
    seller: "CodeMaster",
    price: 149,
    purchasedDate: "2024-01-20",
    language: "JavaScript",
    downloads: 1,
    rating: 4
  },
]

const favorites = [
  {
    id: 1,
    title: "Next.js 博客系统",
    seller: "DevStudio",
    price: 199,
    language: "TypeScript",
    favoritedDate: "2024-02-10"
  },
  {
    id: 2,
    title: "数据可视化组件库",
    seller: "TechTeam",
    price: 89,
    language: "JavaScript",
    favoritedDate: "2024-02-05"
  },
]

const orders = [
  {
    id: 1,
    codeTitle: "React 管理后台系统",
    seller: "TechPro",
    price: 99,
    status: "completed",
    date: "2024-02-01",
    payment: "已支付"
  },
  {
    id: 2,
    codeTitle: "Vue 电商平台",
    seller: "CodeMaster",
    price: 149,
    status: "completed",
    date: "2024-01-20",
    payment: "已支付"
  },
]

import { useTheme } from "@/contexts/ThemeContext"

export default function BuyerCenter() {
  const { theme } = useTheme()
  const [selectedTab, setSelectedTab] = useState("purchased")

  const bgGradient = theme === "light" 
    ? "from-blue-50 via-cyan-50/60 to-blue-50"
    : "from-slate-950 via-purple-950 to-slate-950"
  const textColor = theme === "light" ? "text-slate-900" : "text-white"
  
  // 卡片背景和边框样式
  const cardBg = theme === "light"
    ? "bg-white/60 border-blue-200/20 border-[0.5px]"
    : "bg-slate-900/50 border-slate-800"
  
  const cardTitleColor = theme === "light" ? "text-slate-600" : "text-slate-400"
  const itemBg = theme === "light"
    ? "bg-blue-50/40 border-blue-200/15 border-[0.5px]"
    : "bg-slate-800/50 border-slate-700"
  const itemTextColor = theme === "light" ? "text-slate-700" : "text-white"
  const itemSubtextColor = theme === "light" ? "text-slate-500" : "text-slate-400"
  const tabsBg = theme === "light"
    ? "bg-white/60 border-blue-200/30"
    : "bg-slate-900/50 border-slate-800"

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} ${textColor} pl-4 pr-2 lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-6`}>
      <div className="max-w-7xl mx-auto py-8">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            买家中心
          </h1>
          <p className={theme === "light" ? "text-slate-600" : "text-slate-400"}>管理你的购买、收藏和订单</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>已购买</CardTitle>
              <ShoppingBag className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{purchasedCodes.length}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>个代码项目</p>
            </CardContent>
          </Card>

          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>收藏夹</CardTitle>
              <Heart className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-400">{favorites.length}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>个收藏项目</p>
            </CardContent>
          </Card>

          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>总订单</CardTitle>
              <Package className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{orders.length}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>个已完成订单</p>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容 */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className={`${tabsBg} border backdrop-blur-sm`}>
            <TabsTrigger value="purchased" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              已购买
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              收藏夹
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              订单记录
            </TabsTrigger>
          </TabsList>

          {/* 已购买 */}
          <TabsContent value="purchased" className="space-y-4">
            <Card className={`${cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>已购买的代码</CardTitle>
                <CardDescription>你可以随时下载和使用这些代码</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchasedCodes.map((code) => (
                    <div
                      key={code.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-colors ${
                        theme === "light"
                          ? "bg-blue-50/40 border-blue-200/15 border-[0.5px] hover:border-cyan-400/30 hover:bg-blue-50/60"
                          : "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${itemTextColor}`}>{code.title}</h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            已购买
                          </Badge>
                        </div>
                        <div className={`flex flex-wrap items-center gap-4 text-sm ${itemSubtextColor}`}>
                          <span>开发者: {code.seller}</span>
                          <span>¥{code.price}</span>
                          <span>购买日期: {code.purchasedDate}</span>
                          <span>{code.language}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span>{code.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                        <Link to={`/code/${code.id}`}>
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                            查看详情
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 收藏夹 */}
          <TabsContent value="favorites" className="space-y-4">
            <Card className={`${cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>我的收藏</CardTitle>
                <CardDescription>收藏的代码项目，方便后续购买</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-colors ${
                        theme === "light"
                          ? "bg-purple-50/40 border-purple-200/15 border-[0.5px] hover:border-pink-400/30 hover:bg-purple-50/60"
                          : "bg-slate-800/50 border-slate-700 hover:border-pink-500/50"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${itemTextColor}`}>{item.title}</h3>
                          <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50">
                            <Heart className="h-3 w-3 mr-1 fill-pink-400" />
                            已收藏
                          </Badge>
                        </div>
                        <div className={`flex flex-wrap items-center gap-4 text-sm ${itemSubtextColor}`}>
                          <span>开发者: {item.seller}</span>
                          <span className={`font-semibold ${theme === "light" ? "text-slate-900" : "text-purple-400"}`}>¥{item.price}</span>
                          <span>{item.language}</span>
                          <span>收藏时间: {item.favoritedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Link to={`/code/${item.id}`}>
                          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0">
                            立即购买
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          取消收藏
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 订单记录 */}
          <TabsContent value="orders" className="space-y-4">
            <Card className={`${cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>订单记录</CardTitle>
                <CardDescription>查看所有购买订单的详细信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-colors ${
                        theme === "light"
                          ? "bg-purple-50/40 border-purple-200/15 border-[0.5px] hover:border-purple-400/30 hover:bg-purple-50/60"
                          : "bg-slate-800/50 border-slate-700 hover:border-purple-500/50"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${itemTextColor}`}>{order.codeTitle}</h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            已完成
                          </Badge>
                        </div>
                        <div className={`flex flex-wrap items-center gap-4 text-sm ${itemSubtextColor}`}>
                          <span>开发者: {order.seller}</span>
                          <span>价格: ¥{order.price}</span>
                          <span>日期: {order.date}</span>
                          <span>支付: {order.payment}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Link to={`/code/${order.id}`}>
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                            查看详情
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

