import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendPill } from "@/components/ui/trend-pill"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    direction: "up" | "down"
    percentage: number
  }
  className?: string
}

export function KPICard({ title, value, subtitle, trend, className }: KPICardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {trend && <TrendPill direction={trend.direction} percentage={trend.percentage} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
