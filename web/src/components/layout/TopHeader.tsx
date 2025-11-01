import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Menu, Moon, Sun, ShoppingCart, User, Server, Search } from 'lucide-react'

type TopHeaderProps = {
  isDarkMode: boolean
  toggleDarkMode: () => void
  onOpenMobileMenu: () => void
  onPing: () => void
}

export function TopHeader({ isDarkMode, toggleDarkMode, onOpenMobileMenu, onPing }: TopHeaderProps) {
  return (
    <div className="sticky top-0 z-[99] bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-6">
          <div className="text-lg font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            代码市场
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[500px] mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="搜索代码、标签、作者..." 
              className="pl-10 h-9 bg-muted/50 border-0 focus-visible:ring-1" 
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-9">
            <Sun className="w-4 h-4 mr-1.5" />
            <span className="text-sm">主题</span>
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="w-4 h-4" />
          </Button>
          <Button className="h-9 ml-2" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <span className="text-sm text-white">发布代码</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopHeader


