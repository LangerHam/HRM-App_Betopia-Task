"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Avatar({ className, ...props }: AvatarProps) {
  return <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <img className={cn("aspect-square h-full w-full object-cover", className)} {...props} />;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const bgColor = mounted
    ? resolvedTheme === "dark"
      ? "bg-slate-800 text-slate-400"
      : "bg-slate-100 text-slate-600"
    : "bg-slate-100 text-slate-600";

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full",
        bgColor,
        className
      )}
      {...props}
    />
  );
}
