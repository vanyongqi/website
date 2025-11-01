import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BannerProps {
  isVisible: boolean
  onClose: () => void
}

export default function Banner({ isVisible, onClose }: BannerProps) {
  if (!isVisible) return null

  return (
    <div className="relative w-full h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white py-2.5 px-4 z-50 flex items-center">
      <div className="w-full flex items-center justify-center gap-3 text-sm relative">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="font-medium">
            新用户注册即送 ¥50 代金券！立即注册 →
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 h-6 w-6 p-0 text-white hover:text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
