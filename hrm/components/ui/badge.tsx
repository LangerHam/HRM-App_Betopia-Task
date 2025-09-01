"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useTheme } from "next-themes";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    const baseClasses =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

    const variantClasses = mounted
      ? {
          default:
            resolvedTheme === "dark"
              ? "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200"
              : "border-transparent bg-gray-900 text-white hover:bg-gray-800",
          secondary:
            resolvedTheme === "dark"
              ? "border-transparent bg-gray-800 text-gray-100 hover:bg-gray-700"
              : "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
          destructive:
            resolvedTheme === "dark"
              ? "border-transparent bg-red-600 text-red-50 hover:bg-red-700"
              : "border-transparent bg-red-500 text-white hover:bg-red-600",
          outline:
            resolvedTheme === "dark"
              ? "border-gray-700 text-gray-100 hover:bg-gray-800"
              : "border-gray-200 text-gray-900 hover:bg-gray-50",
          success:
            resolvedTheme === "dark"
              ? "border-transparent bg-green-900 text-green-100 hover:bg-green-800"
              : "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
          warning:
            resolvedTheme === "dark"
              ? "border-transparent bg-yellow-900 text-yellow-100 hover:bg-yellow-800"
              : "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          info:
            resolvedTheme === "dark"
              ? "border-transparent bg-blue-900 text-blue-100 hover:bg-blue-800"
              : "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        }
      : {
          default: "border-transparent bg-gray-900 text-white hover:bg-gray-800",
          secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
          destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
          outline: "border-gray-200 text-gray-900 hover:bg-gray-50",
          success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
          warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        };

    return <span ref={ref} className={cn(baseClasses, variantClasses[variant], className)} {...props} />;
  }
);

Badge.displayName = "Badge";

export { Badge };
