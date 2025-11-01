import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Compass, 
  TrendingUp, 
  Heart, 
  Code,
  FolderOpen,
  Star,
  Menu,
  Settings,
  Sparkles,
  MoreHorizontal,
  Info,
  Shield,
  FileText
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSidebar } from "./Layout"

const navItems = [
  {
    title: "首页",
    href: "/",
    icon: Home,
    color: "text-blue-500",
  },
  {
    title: "探索",
    href: "/explore",
    icon: Compass,
    color: "text-purple-500",
  },
  {
    title: "热门",
    href: "/trending",
    icon: TrendingUp,
    color: "text-red-500",
  },
  {
    title: "收藏",
    href: "/favorites",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "我的项目",
    href: "/my-projects",
    icon: FolderOpen,
    color: "text-green-500",
  },
]

const categoryItems = [
  {
    title: "前端框架",
    href: "/category/frontend",
    icon: Code,
    color: "text-cyan-500",
  },
  {
    title: "后端服务",
    href: "/category/backend",
    icon: Code,
    color: "text-orange-500",
  },
  {
    title: "精选项目",
    href: "/category/featured",
    icon: Star,
    color: "text-yellow-500",
  },
]

interface SidebarProps {
  isMobile?: boolean
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const { isExpanded, setIsExpanded } = useSidebar()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const location = useLocation()
  
  const sidebarWidth = isExpanded ? "w-56" : "w-20"
  const sidebarClasses = isMobile 
    ? `h-full ${sidebarWidth} flex flex-col transition-all duration-300`
    : `fixed left-0 top-[2.5rem] h-[calc(100vh-2.5rem)] ${sidebarWidth} border-r bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 z-40 flex flex-col transition-all duration-300 shadow-2xl`

  return (
    <>
      <aside className={sidebarClasses}>
        {/* Logo 区域 */}
        <div className="flex items-center justify-center px-4 border-b border-purple-500/20" style={{ height: '4rem' }}>
          {isExpanded ? (
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Code className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                代码商城
              </span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center justify-center">
              <div className="relative">
                <Code className="h-6 w-6 text-cyan-400" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
            </Link>
          )}
        </div>

        {/* 展开/收起按钮 */}
        <div className="px-4 py-2 border-b border-purple-500/20">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-center transition-all",
              isExpanded ? "justify-start" : ""
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
            {isExpanded && <span className="ml-2 text-xs">收起</span>}
          </Button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
                    isExpanded ? "gap-3 px-3 py-2.5" : "justify-center px-2 py-2.5",
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white shadow-lg shadow-purple-500/20"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  )}
                  title={!isExpanded ? item.title : undefined}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", item.color, isActive && "scale-110")} />
                  {isExpanded && (
                    <span className="flex-1">{item.title}</span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-r" />
                  )}
                </Link>
              )
            })}
          </div>

          {isExpanded && (
            <>
              <Separator className="my-4 bg-purple-500/20" />

              {/* 分类 */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  分类
                </div>
                {categoryItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-lg text-sm font-medium transition-all",
                      isExpanded ? "gap-3 px-3 py-2.5" : "justify-center px-2 py-2.5",
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                    )}
                    title={!isExpanded ? item.title : undefined}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
                    {isExpanded && <span className="flex-1">{item.title}</span>}
                  </Link>
                )
                })}
              </div>
            </>
          )}
          
          {/* 收起状态下显示分类图标 */}
          {!isExpanded && (
            <div className="space-y-1 mt-4">
              {categoryItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center justify-center px-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                    )}
                    title={item.title}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
                  </Link>
                )
              })}
            </div>
          )}
        </nav>

        {/* 底部操作区 */}
        <div className="border-t border-purple-500/20 space-y-2 p-4">
          {/* 更多按钮 */}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-center transition-all text-slate-300 hover:text-white hover:bg-slate-800/50",
              isExpanded ? "justify-start" : ""
            )}
            onClick={() => setIsMoreOpen(true)}
            title={!isExpanded ? "更多" : undefined}
          >
            <MoreHorizontal className="h-5 w-5 flex-shrink-0 text-purple-400" />
            {isExpanded && <span className="ml-2 flex-1 text-left">更多</span>}
          </Button>

          {/* 用户信息 */}
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all group",
              isExpanded ? "" : "justify-center"
            )}
            title={!isExpanded ? "个人资料" : undefined}
          >
            <Avatar className="h-8 w-8 ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                用户
              </AvatarFallback>
            </Avatar>
            {isExpanded && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate text-white">开发者</div>
                  <div className="text-xs text-slate-400 truncate">developer@example.com</div>
                </div>
                <Settings className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
              </>
            )}
          </Link>
        </div>
      </aside>

      {/* 更多信息对话框 */}
      <Dialog open={isMoreOpen} onOpenChange={setIsMoreOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              关于代码商城
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              我们致力于为开发者和用户提供最好的代码分享和购买体验
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* 为什么选择代码商城 */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-cyan-400" />
                为什么选择代码商城
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                我们致力于为开发者和用户提供最好的代码分享和购买体验
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-500/20">
                  <Code className="h-6 w-6 text-cyan-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">优质代码</h4>
                  <p className="text-xs text-slate-400">
                    汇集精选的开源项目和代码模板，覆盖各种开发场景
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-500/20">
                  <Sparkles className="h-6 w-6 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">活跃社区</h4>
                  <p className="text-xs text-slate-400">
                    与全球开发者交流，分享技术心得和开发经验
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-purple-500/20">
                  <TrendingUp className="h-6 w-6 text-pink-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">热门趋势</h4>
                  <p className="text-xs text-slate-400">
                    追踪最新的技术趋势，发现热门项目和流行框架
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-purple-500/20" />

            {/* 关于代码商城 */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-400" />
                关于代码商城
              </h3>
              <p className="text-sm text-slate-300">
                一个专注于代码分享和售卖的平台，连接开发者与用户，让每一行代码都能创造价值。
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            {/* 快速链接 */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Compass className="h-5 w-5 text-cyan-400" />
                快速链接
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                <Link to="/explore" className="p-3 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all text-sm text-slate-300 hover:text-white">
                  探索作品
                </Link>
                <Link to="/gallery" className="p-3 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all text-sm text-slate-300 hover:text-white">
                  画廊
                </Link>
                <Link to="/artists" className="p-3 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all text-sm text-slate-300 hover:text-white">
                  艺术家
                </Link>
              </div>
            </section>

            <Separator className="bg-purple-500/20" />

            {/* 法律信息 */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                法律信息
              </h3>
              <div className="space-y-2">
                <Link to="/privacy" className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all text-sm text-slate-300 hover:text-white">
                  <FileText className="h-4 w-4" />
                  <span>隐私政策</span>
                </Link>
                <Link to="/terms" className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all text-sm text-slate-300 hover:text-white">
                  <FileText className="h-4 w-4" />
                  <span>服务条款</span>
                </Link>
              </div>
            </section>

            {/* 版权信息 */}
            <div className="pt-4 border-t border-purple-500/20 text-center">
              <p className="text-xs text-slate-400">
                © {new Date().getFullYear()} 代码商城. 保留所有权利。
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}