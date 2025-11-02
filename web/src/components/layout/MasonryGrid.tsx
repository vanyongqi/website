import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MasonryGridProps {
  children: ReactNode[]
  columns?: {
    default?: number
    lg?: number
    md?: number
    sm?: number
  }
  gap?: number
  className?: string
}

export default function MasonryGrid({ 
  children, 
  columns = { default: 4, lg: 3, md: 2, sm: 1 },
  gap = 4,
  className 
}: MasonryGridProps) {
  return (
    <div
      className={cn(
        "columns-1",
        columns.sm && `sm:columns-${columns.sm}`,
        columns.md && `md:columns-${columns.md}`,
        columns.lg && `lg:columns-${columns.lg}`,
        columns.default && `xl:columns-${columns.default}`,
        `gap-${gap}`,
        className
      )}
      style={{
        columnCount: columns.default || 4,
        columnGap: `${gap * 0.25}rem`,
      }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="break-inside-avoid mb-4"
          style={{ marginBottom: `${gap * 0.25}rem` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
