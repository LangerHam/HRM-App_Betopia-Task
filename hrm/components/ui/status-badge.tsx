import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "On-Time" | "Sick Leave" | "Late" | "Permanent" | "Remote" | "Office"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case "On-Time":
      case "Permanent":
        return "success"
      case "Sick Leave":
        return "warning"
      case "Late":
        return "destructive"
      case "Remote":
        return "info"
      case "Office":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Badge variant={getVariant(status)} className={cn("text-xs", className)}>
      {status}
    </Badge>
  )
}
