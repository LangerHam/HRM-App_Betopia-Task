"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface HiringSourceData {
  label: string
  value: number
  color: string
}

interface HiringSourcesChartProps {
  data: HiringSourceData[]
}

export function HiringSourcesChart({ data }: HiringSourcesChartProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hiring Sources</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                className="text-xs fill-gray-600 dark:fill-gray-400"
              />
              <YAxis axisLine={false} tickLine={false} className="text-xs fill-gray-600 dark:fill-gray-400" />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Bar key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
