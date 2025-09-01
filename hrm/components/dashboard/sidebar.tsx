"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  DollarSign,
  UserPlus,
  TrendingUp,
  Calendar,
  CalendarDays,
  HelpCircle,
  Settings,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    href: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "Departments",
    href: "/dashboard/placeholder",
    icon: Building2,
  },
  {
    title: "Attendance",
    href: "/dashboard/placeholder",
    icon: Clock,
  },
  {
    title: "Payroll",
    href: "/dashboard/placeholder",
    icon: DollarSign,
  },
  {
    title: "Recruitment",
    href: "/dashboard/placeholder",
    icon: UserPlus,
  },
  {
    title: "Performance",
    href: "/dashboard/placeholder",
    icon: TrendingUp,
  },
  {
    title: "Leaves",
    href: "/dashboard/placeholder",
    icon: Calendar,
  },
  {
    title: "Holidays",
    href: "/dashboard/placeholder",
    icon: CalendarDays,
  },
]

const otherItems = [
  {
    title: "Support",
    href: "/dashboard/placeholder",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/placeholder",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex w-64 bg-background border-r border-border flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">betopia</h1>
            <p className="text-xs text-muted-foreground">group</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2 px-3">OTHER</p>
        <div className="space-y-1">
          {otherItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
