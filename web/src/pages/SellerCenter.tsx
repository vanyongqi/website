import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Package, TrendingUp, DollarSign, Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 模拟数据
const myCodes = [
  {
    id: 1,
    title: "React 管理后台系统",
    price: 99,
    sales: 156,
    views: 3420,
    status: "published",
    createdAt: "2024-01-15",
    language: "TypeScript",
    category: "前端框架"
  },
  {
    id: 2,
    title: "Vue 电商平台",
    price: 149,
    sales: 89,
    views: 2156,
    status: "published",
    createdAt: "2024-01-20",
    language: "JavaScript",
    category: "全栈项目"
  },
  {
    id: 3,
    title: "Express API 框架",
    price: 79,
    sales: 0,
    views: 567,
    status: "draft",
    createdAt: "2024-02-01",
    language: "JavaScript",
    category: "后端服务"
  },
]

const orders = [
  {
    id: 1,
    codeTitle: "React 管理后台系统",
    buyer: "客户A",
    price: 99,
    status: "completed",
    date: "2024-02-10",
    payment: "已支付"
  },
  {
    id: 2,
    codeTitle: "Vue 电商平台",
    buyer: "客户B",
    price: 149,
    status: "pending",
    date: "2024-02-12",
    payment: "待支付"
  },
]

import { useTheme } from "@/contexts/ThemeContext"

export default function SellerCenter() {
  const { theme } = useTheme()
  const [selectedTab, setSelectedTab] = useState("codes")

  // 统计数据
  const stats = {
    totalSales: 245,
    totalRevenue: 25680,
    totalCodes: myCodes.length,
    pendingOrders: orders.filter(o => o.status === "pending").length
  }

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              卖家中心
            </h1>
            <p className={theme === "light" ? "text-slate-600" : "text-slate-400"}>管理你的代码作品，查看销售数据</p>
          </div>
          <Link to="/seller/publish">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-purple-500/50">
              <Plus className="mr-2 h-4 w-4" />
              发布新代码
            </Button>
          </Link>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>总销量</CardTitle>
              <Package className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{stats.totalSales}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>个代码已售出</p>
            </CardContent>
          </Card>

          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>总收入</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">¥{stats.totalRevenue.toLocaleString()}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>累计收入</p>
            </CardContent>
          </Card>

          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>我的代码</CardTitle>
              <TrendingUp className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-400">{stats.totalCodes}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>个代码项目</p>
            </CardContent>
          </Card>

          <Card className={`${cardBg} backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className={`text-sm font-medium ${cardTitleColor}`}>待处理订单</CardTitle>
              <Package className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{stats.pendingOrders}</div>
              <p className={`text-xs mt-1 ${itemSubtextColor}`}>个订单待处理</p>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容 */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className={`${tabsBg} border backdrop-blur-sm`}>
            <TabsTrigger value="codes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              我的代码
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              订单管理
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              数据分析
            </TabsTrigger>
          </TabsList>

          {/* 我的代码 */}
          <TabsContent value="codes" className="space-y-4">
            <Card className={`${cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>代码列表</CardTitle>
                <CardDescription>管理你发布的代码项目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCodes.map((code) => (
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
                          <Badge
                            variant={code.status === "published" ? "default" : "secondary"}
                            className={code.status === "published" 
                              ? "bg-green-500/20 text-green-400 border-green-500/50" 
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                            }
                          >
                            {code.status === "published" ? "已发布" : "草稿"}
                          </Badge>
                        </div>
                        <div className={`flex flex-wrap items-center gap-4 text-sm ${itemSubtextColor}`}>
                          <span>¥{code.price}</span>
                          <span>销量: {code.sales}</span>
                          <span>浏览: {code.views}</span>
                          <span>{code.language}</span>
                          <span>{code.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4 mr-1" />
                          删除
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 订单管理 */}
          <TabsContent value="orders" className="space-y-4">
            <Card className={`${cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>订单列表</CardTitle>
                <CardDescription>查看和管理你的销售订单</CardDescription>
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
                          <Badge
                            variant={order.status === "completed" ? "default" : "secondary"}
                            className={order.status === "completed" 
                              ? "bg-green-500/20 text-green-400 border-green-500/50" 
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                            }
                          >
                            {order.status === "completed" ? "已完成" : "待处理"}
                          </Badge>
                        </div>
                        <div className={`flex flex-wrap items-center gap-4 text-sm ${itemSubtextColor}`}>
                          <span>买家: {order.buyer}</span>
                          <span>价格: ¥{order.price}</span>
                          <span>日期: {order.date}</span>
                          <span>支付: {order.payment}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="analytics" className="space-y-4">
            <Card className={`${cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle>销售数据分析</CardTitle>
                <CardDescription>查看详细的销售统计和趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-400">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                  <p>数据分析功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

