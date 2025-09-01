"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Default to light mode until mounted
  const borderColor = mounted
    ? resolvedTheme === "dark"
      ? "border-slate-800"
      : "border-slate-200"
    : "border-slate-200";

  const bgColor = mounted
    ? resolvedTheme === "dark"
      ? "bg-slate-950"
      : "bg-white"
    : "bg-white";

  const placeholderColor = mounted
    ? resolvedTheme === "dark"
      ? "placeholder:text-slate-400"
      : "placeholder:text-slate-500"
    : "placeholder:text-slate-500";

  const focusRing = mounted
    ? resolvedTheme === "dark"
      ? "focus-visible:ring-slate-300 dark:ring-offset-slate-950"
      : "focus-visible:ring-slate-950 focus-visible:ring-offset-white"
    : "focus-visible:ring-slate-950 focus-visible:ring-offset-white";

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
        borderColor,
        bgColor,
        placeholderColor,
        focusRing,
        className
      )}
      {...props}
    />
  );
}
