import { NextResponse } from "next/server"

export async function GET() {
  const chartData = {
    composition: [
      {
        label: "Male",
        value: 299,
        color: "#3b82f6", 
      },
      {
        label: "Female",
        value: 557,
        color: "#10b981", 
      },
    ],
    sources: [
      {
        label: "Direct",
        value: 25,
        color: "#10b981", 
      },
      {
        label: "Wework",
        value: 35,
        color: "#3b82f6", 
      },
      {
        label: "LinkedIn",
        value: 30,
        color: "#1f2937", 
      },
      {
        label: "Hired",
        value: 45,
        color: "#f97316", 
      },
      {
        label: "Internal",
        value: 15,
        color: "#6366f1", 
      },
      {
        label: "Referral",
        value: 40,
        color: "#10b981",
      },
      {
        label: "Others",
        value: 25,
        color: "#6b7280", 
      },
    ],
  }

  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(chartData)
}
