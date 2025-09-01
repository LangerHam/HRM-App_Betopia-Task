"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";

interface HiringSourceData {
  label: string;
  value: number;
  color: string;
}

interface HiringSourcesChartProps {
  data: HiringSourceData[];
}

export function HiringSourcesChart({ data }: HiringSourcesChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Theme-aware colors
  const bgColor = mounted
    ? resolvedTheme === "dark"
      ? "bg-slate-950 border-slate-800"
      : "bg-white border-gray-200"
    : "bg-white border-gray-200";

  const textColor = mounted
    ? resolvedTheme === "dark"
      ? "#D1D5DB" 
      : "#6B7280" 
    : "#6B7280";

  const gridColor = mounted
    ? resolvedTheme === "dark"
      ? "#374151" 
      : "#E5E7EB" 
    : "#E5E7EB";

  return (
    <div className={`rounded-lg border shadow-sm ${bgColor}`}>
      <div className="p-6 pb-4">
        <h3
          className="text-lg font-semibold"
          style={{ color: textColor }}
        >
          Hiring Sources
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                style={{ fill: textColor, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                style={{ fill: textColor, fontSize: 12 }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
