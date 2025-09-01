import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendPillProps {
  direction: "up" | "down"
  percentage: number
  className?: string
}

export function TrendPill({ direction, percentage, className }: TrendPillProps) {
  const isPositive = direction === "up"

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        isPositive
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/15 dark:text-red-400",
        className,
      )}
    >
      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      <span>{percentage}%</span>
    </div>
  )
}
