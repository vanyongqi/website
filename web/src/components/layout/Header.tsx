import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Bell, Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./Sidebar"

export default function Header() {
  return (
    <>
      {/* 移动端侧边栏按钮 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">打开侧边栏</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <Sidebar isMobile={true} />
            </SheetContent>
          </Sheet>


          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* 桌面端顶部栏（简化版，主要显示操作按钮） */}
      <header className="hidden lg:block sticky top-[2.5rem] z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ height: '4rem' }}>
        <div className="flex items-center gap-4 px-6 h-full">
          {/* 搜索框 */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                <div className="relative">
                  <Search className="h-4 w-4 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                  <div className="absolute inset-0 h-4 w-4 rounded-full bg-cyan-400/30 blur-[3px] group-hover:bg-purple-400/40 transition-all duration-300" />
                </div>
              </div>
              <Input
                type="search"
                placeholder="搜索代码、项目..."
                className="pl-11 pr-4 w-full rounded-full bg-slate-800/50 border-slate-700/50 focus-visible:border-purple-500/50 focus-visible:bg-slate-800/70 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all focus-visible:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              />
            </div>
          </div>

          {/* 右侧操作按钮 */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
