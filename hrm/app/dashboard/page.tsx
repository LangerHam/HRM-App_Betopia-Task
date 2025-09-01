"use client"

import { useEffect } from "react"
import { KPICard } from "@/components/ui/kpi-card"
import { EmployeeCompositionChart } from "@/components/charts/emp-comp-chart"
import { HiringSourcesChart } from "@/components/charts/hiring-chart"
import { AttendanceTable } from "@/components/attendance/att"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setKPIs, setCharts, setAttendance, setLoading } from "@/lib/store/dashboardSlice"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { kpis, charts, attendance, isLoading } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setLoading(true))

      try {
        const [kpisResponse, chartsResponse, attendanceResponse] = await Promise.all([
          fetch("/api/kpis"),
          fetch("/api/charts"),
          fetch("/api/attendance"),
        ])

        const [kpisData, chartsData, attendanceData] = await Promise.all([
          kpisResponse.json(),
          chartsResponse.json(),
          attendanceResponse.json(),
        ])

        dispatch(setKPIs(kpisData))
        dispatch(setCharts(chartsData))
        dispatch(setAttendance(attendanceData))
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchDashboardData()
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard
          title="Total Employees"
          value={kpis?.totalEmployees || 0}
          subtitle="Employee"
          trend={kpis?.trends.find((t) => t.kpi === "totalEmployees")}
        />
        <KPICard
          title="Job View"
          value={kpis?.jobView || 0}
          subtitle="Viewers"
          trend={kpis?.trends.find((t) => t.kpi === "jobView")}
        />
        <KPICard
          title="Job Applied"
          value={kpis?.jobApplied || 0}
          subtitle="Applicants"
          trend={kpis?.trends.find((t) => t.kpi === "jobApplied")}
        />
        <KPICard
          title="Resigned Employees"
          value={kpis?.resigned || 0}
          subtitle="Employee"
          trend={kpis?.trends.find((t) => t.kpi === "resigned")}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {charts?.composition && <EmployeeCompositionChart data={charts.composition} />}
        {charts?.sources && <HiringSourcesChart data={charts.sources} />}
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Employer Attendance</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Late
            </Button>
            <Button variant="outline" size="sm">
              Day-off
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <AttendanceTable attendance={attendance} />
        </div>
      </div>
    </div>
  )
}
