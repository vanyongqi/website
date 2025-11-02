import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Bell, Menu, Search, Sun, Moon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./Sidebar"
import { useTheme } from "@/contexts/ThemeContext"

interface HeaderProps {
  topOffset?: string
}

export default function Header({ topOffset = '2.5rem' }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* 移动端侧边栏按钮 */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden ${
        theme === "light"
          ? "bg-blue-50/95 border-blue-200/50"
          : "bg-background/95"
      }`}>
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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              title={theme === "light" ? "切换到夜间模式" : "切换到白天模式"}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-slate-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={theme === "light" ? "text-slate-700 hover:text-cyan-600 hover:bg-blue-100/50" : ""}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={theme === "light" ? "text-slate-700 hover:text-cyan-600 hover:bg-blue-100/50" : ""}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* 桌面端顶部栏（简化版，主要显示操作按钮） */}
      <header className={`hidden lg:block sticky z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        theme === "light"
          ? "bg-blue-50/95 border-blue-200/50"
          : "bg-background/95"
      }`} style={{ top: topOffset, height: '4rem' }}>
        <div className="flex items-center gap-4 px-6 h-full">
          {/* 搜索框 */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                <div className="relative">
                  <Search className={`h-4 w-4 transition-colors duration-300 ${
                    theme === "light"
                      ? "text-cyan-500 group-hover:text-cyan-600"
                      : "text-cyan-400 group-hover:text-purple-400"
                  }`} />
                  <div className={`absolute inset-0 h-4 w-4 rounded-full blur-[3px] transition-all duration-300 ${
                    theme === "light"
                      ? "bg-cyan-500/30 group-hover:bg-cyan-600/40"
                      : "bg-cyan-400/30 group-hover:bg-purple-400/40"
                  }`} />
                </div>
              </div>
              <Input
                type="search"
                placeholder="搜索代码、项目..."
                className={`pl-11 pr-4 w-full rounded-full transition-all ${
                  theme === "light"
                    ? "bg-blue-50/90 border-blue-200/60 focus-visible:border-cyan-500/50 focus-visible:bg-blue-50 focus-visible:shadow-[0_0_15px_rgba(6,182,212,0.3)] focus-visible:ring-cyan-500/30 focus-visible:ring-2 hover:bg-blue-100/80 hover:border-cyan-400/50 text-slate-900 placeholder:text-slate-500"
                    : "bg-slate-800/50 border-slate-700/50 focus-visible:border-purple-500/50 focus-visible:bg-slate-800/70 focus-visible:shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:bg-slate-800/60 hover:border-cyan-500/30"
                }`}
              />
            </div>
          </div>

          {/* 右侧操作按钮 */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              title={theme === "light" ? "切换到夜间模式" : "切换到白天模式"}
              className="hover:bg-slate-800/50 dark:hover:bg-slate-200/50"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-slate-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={theme === "light" ? "text-slate-700 hover:text-cyan-600 hover:bg-blue-100/50" : ""}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${
                theme === "light" ? "text-slate-700 hover:text-cyan-600 hover:bg-blue-100/50" : ""
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center ${
                theme === "light" 
                  ? "bg-cyan-500 text-white" 
                  : "bg-primary text-primary-foreground"
              }`}>
                0
              </span>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
