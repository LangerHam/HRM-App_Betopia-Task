"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "next-themes";

interface CompositionData {
  label: string;
  value: number;
  color: string;
}

interface EmployeeCompositionChartProps {
  data: CompositionData[];
}

export function EmployeeCompositionChart({
  data,
}: EmployeeCompositionChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const bgColor = mounted
    ? resolvedTheme === "dark"
      ? "bg-slate-950 border-slate-800"
      : "bg-white border-gray-200"
    : "bg-white border-gray-200";

  const textColor = mounted
    ? resolvedTheme === "dark"
      ? "#D1D5DB"
      : "#374151"
    : "#374151";

  const mutedTextColor = mounted
    ? resolvedTheme === "dark"
      ? "#9CA3AF"
      : "#6B7280"
    : "#6B7280";

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
  }) => {
    if (!cx || !cy || !midAngle || !innerRadius || !outerRadius || !percent) {
      return null;
    }
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`rounded-lg border shadow-sm ${bgColor}`}>
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold" style={{ color: textColor }}>
          Employee Composition
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: mutedTextColor, fontSize: 12 }}>
                    {value} (
                    {
                      (entry as unknown as { payload: { value: number } })
                        .payload.value
                    }
                    )
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <p style={{ color: mutedTextColor, fontSize: 14 }}>
            {total} employee total
          </p>
        </div>
      </div>
    </div>
  );
}
