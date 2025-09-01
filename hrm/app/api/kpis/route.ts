import { NextResponse } from "next/server"

export async function GET() {
  // Mock KPI data matching the dashboard design
  const kpiData = {
    totalEmployees: 856,
    jobView: 3342,
    jobApplied: 77,
    resigned: 17,
    trends: [
      {
        kpi: "totalEmployees",
        direction: "up" as const,
        percentage: 10.0,
      },
      {
        kpi: "jobView",
        direction: "up" as const,
        percentage: 22.0,
      },
      {
        kpi: "jobApplied",
        direction: "up" as const,
        percentage: 12.0,
      },
      {
        kpi: "resigned",
        direction: "down" as const,
        percentage: 7.0,
      },
    ],
  }

  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(kpiData)
}
