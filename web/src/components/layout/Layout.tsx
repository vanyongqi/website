import { useState, createContext, useContext, useEffect, type ReactNode } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Banner from "./Banner"

interface SidebarContextType {
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  isExpanded: false,
  setIsExpanded: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const marginLeft = isDesktop ? (isExpanded ? '224px' : '80px') : '0'

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className="flex min-h-screen relative">
        {/* 顶部横幅 - 固定定位，占据整个屏幕宽度 */}
        <div className="fixed top-0 left-0 right-0 z-50 w-screen h-10">
          <Banner />
        </div>

        {/* 桌面端侧边栏 */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* 主内容区 - 根据侧边栏状态动态调整位置 */}
        <div
          className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
          style={{
            marginLeft: marginLeft,
            paddingTop: '2.5rem' // 为横幅留出空间 (h-10 = 2.5rem = 40px)
          }}
        >
          <Header />
          <main className="flex-1 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}