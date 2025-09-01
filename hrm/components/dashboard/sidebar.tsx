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
    href: "#",
    icon: Building2,
  },
  {
    title: "Attendance",
    href: "#",
    icon: Clock,
  },
  {
    title: "Payroll",
    href: "#",
    icon: DollarSign,
  },
  {
    title: "Recruitment",
    href: "#",
    icon: UserPlus,
  },
  {
    title: "Performance",
    href: "#",
    icon: TrendingUp,
  },
  {
    title: "Leaves",
    href: "#",
    icon: Calendar,
  },
  {
    title: "Holidays",
    href: "#",
    icon: CalendarDays,
  },
]

const otherItems = [
  {
    title: "Support",
    href: "#",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "#",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex w-64 bg-background border-r border-border flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center">
          <img
            src="/Logo2.png" 
            alt="Betopia Group"
            className="h-15 w-auto lg:h-16"
          />
        </div>
      </div><br/>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2 px-3">
          OTHER
        </p>
        <div className="space-y-1">
          {otherItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
