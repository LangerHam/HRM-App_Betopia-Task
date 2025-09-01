"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
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
    href: "/dashboard/departments",
    icon: Building2,
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: Clock,
  },
  {
    title: "Payroll",
    href: "/dashboard/payroll",
    icon: DollarSign,
  },
  {
    title: "Recruitment",
    href: "/dashboard/recruitment",
    icon: UserPlus,
  },
  {
    title: "Performance",
    href: "/dashboard/performance",
    icon: TrendingUp,
  },
  {
    title: "Leaves",
    href: "/dashboard/leaves",
    icon: Calendar,
  },
  {
    title: "Holidays",
    href: "/dashboard/holidays",
    icon: CalendarDays,
  },
]

const otherItems = [
  {
    title: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-bold text-sm">B</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-gray-100">betopia</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">group</p>
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
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-3">OTHER</p>
            <div className="space-y-1">
              {otherItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
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
      </SheetContent>
    </Sheet>
  )
}
