"use client";

import { SearchBar } from "@/components/ui/search-bar";
import { UserNav } from "@/components/ui/user-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";

export function DashboardHeader() {
  const { user } = useAppSelector((state) => state.auth);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="h-16  border-border bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-foreground">
            👋 Hello {user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-sm text-muted-foreground">{getGreeting()}</p>
        </div>
        <div className="md:hidden">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <SearchBar placeholder="Search" className="hidden sm:block" />

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <UserNav />
      </div>
    </header>
  );
}
