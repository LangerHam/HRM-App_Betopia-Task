import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AttendanceRecord } from "@/lib/types/employee"

interface KPIData {
  totalEmployees: number
  jobView: number
  jobApplied: number
  resigned: number
  trends: {
    kpi: string
    direction: "up" | "down"
    percentage: number
  }[]
}

interface ChartData {
  composition: { label: string; value: number; color: string }[]
  sources: { label: string; value: number; color: string }[]
}

interface DashboardState {
  kpis: KPIData | null
  charts: ChartData | null
  attendance: AttendanceRecord[]
  isLoading: boolean
  error: string | null
}

const initialState: DashboardState = {
  kpis: null,
  charts: null,
  attendance: [],
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setKPIs: (state, action: PayloadAction<KPIData>) => {
      state.kpis = action.payload
    },
    setCharts: (state, action: PayloadAction<ChartData>) => {
      state.charts = action.payload
    },
    setAttendance: (state, action: PayloadAction<AttendanceRecord[]>) => {
      state.attendance = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setLoading, setKPIs, setCharts, setAttendance, setError } = dashboardSlice.actions
export default dashboardSlice.reducer
