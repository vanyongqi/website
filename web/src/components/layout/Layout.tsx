import { useState, createContext, useContext, useEffect, type ReactNode } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Banner from "./Banner"
import ChatWidget from "@/components/chat/ChatWidget"

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
  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(() => {
    // 从 localStorage 读取横幅状态
    const saved = localStorage.getItem('bannerVisible')
    return saved !== null ? saved === 'true' : true
  })

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const handleBannerClose = () => {
    setIsBannerVisible(false)
    localStorage.setItem('bannerVisible', 'false')
  }

  const marginLeft = isDesktop ? (isExpanded ? '224px' : '80px') : '0'
  const topOffset = isBannerVisible ? '2.5rem' : '0'
  const paddingTop = isBannerVisible ? '2.5rem' : '0'

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className="flex min-h-screen relative">
        {/* 顶部横幅 - 固定定位，占据整个屏幕宽度 */}
        {isBannerVisible && (
          <div className="fixed top-0 left-0 right-0 z-50 w-screen h-10">
            <Banner isVisible={isBannerVisible} onClose={handleBannerClose} />
          </div>
        )}

        {/* 桌面端侧边栏 */}
        <aside className="hidden lg:block">
          <Sidebar topOffset={topOffset} />
        </aside>

        {/* 主内容区 - 根据侧边栏状态动态调整位置 */}
        <div
          className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
          style={{
            marginLeft: marginLeft,
            paddingTop: paddingTop
          }}
        >
          <Header topOffset={topOffset} />
          <main className={`flex-1 bg-gradient-to-br ${
            theme === "light" 
              ? "from-blue-50 via-cyan-50/50 to-blue-50"
              : "from-slate-950 via-purple-950/20 to-slate-950"
          }`}>
            {children}
          </main>
        </div>
        
        {/* 智能客服机器人 */}
        <ChatWidget />
      </div>
    </SidebarContext.Provider>
  )
}