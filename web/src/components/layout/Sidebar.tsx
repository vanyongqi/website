import { Menu as MenuIcon, Heart, Star, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type SidebarProps = {
  isDarkMode: boolean
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  sideMenuItems: any[]
}

export function Sidebar({ isDarkMode, sidebarCollapsed, setSidebarCollapsed, sideMenuItems }: SidebarProps) {
  return (
    <aside
      className={
        sidebarCollapsed
          ? 'w-16 fixed left-0 top-0 h-screen z-[98] overflow-hidden transition-[width] duration-200 bg-background border-r'
          : 'w-60 fixed left-0 top-0 h-screen z-[98] overflow-hidden transition-[width] duration-200 bg-background border-r'
      }
    >
      <div className={`mt-10 flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} h-12 border-b`}>
        {!sidebarCollapsed && (
          <div className="m-0 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            代码市场
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <MenuIcon className="w-5 h-5" />
        </Button>
      </div>

      <nav className="mt-2 px-1 h-[calc(100%-140px)] overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1 list-none">
          {sideMenuItems.map((item) => (
            <li key={item.key}>
              <Link
                to={item.key === 'hot' ? '/' : `/${item.key}`}
                className={`flex items-center rounded-md transition-all ${sidebarCollapsed ? 'justify-center w-full h-10' : 'gap-2 px-2 py-2'} hover:bg-accent`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
                {!sidebarCollapsed && <span className="truncate text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`absolute bottom-4 ${sidebarCollapsed ? 'left-2 right-2' : 'left-4 right-4'} flex flex-col gap-1 border-t pt-2`}>
        <Button variant="ghost" className={`${sidebarCollapsed ? 'justify-center' : 'justify-start'} h-9 w-full`} title={sidebarCollapsed ? '我的收藏' : ''}>
          <Heart className="w-4 h-4 icon-muted icon-hover" />
          {!sidebarCollapsed && <span className="ml-2 text-sm">我的收藏</span>}
        </Button>
        <Button variant="ghost" className={`${sidebarCollapsed ? 'justify-center' : 'justify-start'} h-9 w-full`} title={sidebarCollapsed ? '我的作品' : ''}>
          <Star className="w-4 h-4 icon-muted icon-hover" />
          {!sidebarCollapsed && <span className="ml-2 text-sm">我的作品</span>}
        </Button>
        <Button variant="ghost" className={`${sidebarCollapsed ? 'justify-center' : 'justify-start'} h-9 w-full`} title={sidebarCollapsed ? '设置' : ''}>
          <Settings className="w-4 h-4 icon-muted icon-hover" />
          {!sidebarCollapsed && <span className="ml-2 text-sm">设置</span>}
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar


