"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useTheme } from "next-themes";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, onCheckedChange, onChange, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      onChange?.(event);
      onCheckedChange?.(checked);
    };

    // Dynamic classes based on theme
    const borderColor = mounted
      ? resolvedTheme === "dark"
        ? "border-gray-600"
        : "border-gray-300"
      : "border-gray-300";

    const bgColor = mounted
      ? resolvedTheme === "dark"
        ? "bg-gray-800"
        : "bg-white"
      : "bg-white";

    const focusRing = mounted
      ? resolvedTheme === "dark"
        ? "focus:ring-blue-600"
        : "focus:ring-blue-500"
      : "focus:ring-blue-500";

    const labelColor = mounted
      ? resolvedTheme === "dark"
        ? "text-gray-200"
        : "text-gray-900"
      : "text-gray-900";

    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          className={cn(
            "h-4 w-4 rounded focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            borderColor,
            bgColor,
            focusRing,
            className
          )}
          onChange={handleChange}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelColor
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
