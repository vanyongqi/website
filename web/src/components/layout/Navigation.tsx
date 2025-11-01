import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Compass, Images, Users, TrendingUp } from "lucide-react"

const navItems = [
  {
    title: "探索",
    href: "/explore",
    icon: Compass,
    description: "发现最新的艺术作品和创意",
  },
  {
    title: "画廊",
    href: "/gallery",
    icon: Images,
    description: "浏览精选的艺术作品集",
  },
  {
    title: "艺术家",
    href: "/artists",
    icon: Users,
    description: "了解优秀的艺术家和创作者",
  },
  {
    title: "趋势",
    href: "/trending",
    icon: TrendingUp,
    description: "查看当前最热门的作品",
  },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || 
                          (item.href !== "/" && location.pathname.startsWith(item.href))
          
          return (
            <NavigationMenuItem key={item.href}>
              <Link to={item.href}>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
