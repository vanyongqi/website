import { Button } from '@/components/ui/button'

export function TopBanner() {
  return (
    <div className="sticky top-0 z-[100] shadow-xs text-white text-[15px] font-medium tracking-[0.3px] px-6 py-2 text-center bg-gradient-to-br from-primary to-secondary">
      <span className="inline-block font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
        🎉 新用户注册即送 100 积分，限时优惠进行中！
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        ✕
      </Button>
    </div>
  )
}

export default TopBanner


