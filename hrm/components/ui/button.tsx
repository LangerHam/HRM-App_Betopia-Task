"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: mounted
      ? resolvedTheme === "dark"
        ? "bg-white text-slate-900 hover:bg-slate-200"
        : "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-slate-900 text-white hover:bg-slate-800",
    outline: mounted
      ? resolvedTheme === "dark"
        ? "border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:text-slate-50"
        : "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900"
      : "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    ghost: mounted
      ? resolvedTheme === "dark"
        ? "hover:bg-slate-800 hover:text-slate-50"
        : "hover:bg-slate-100 hover:text-slate-900"
      : "hover:bg-slate-100 hover:text-slate-900",
    destructive: mounted
      ? resolvedTheme === "dark"
        ? "bg-red-900 text-red-50 hover:bg-red-800"
        : "bg-red-500 text-white hover:bg-red-600"
      : "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
