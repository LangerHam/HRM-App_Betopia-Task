import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Employee } from "@/lib/types/employee"

interface EmployeeState {
  employees: Employee[]
  filteredEmployees: Employee[]
  selectedEmployee: Employee | null
  searchQuery: string
  departmentFilter: string
  statusFilter: string
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
  }
}

const initialState: EmployeeState = {
  employees: [],
  filteredEmployees: [],
  selectedEmployee: null,
  searchQuery: "",
  departmentFilter: "all",
  statusFilter: "all",
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
}

export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/employees")
    if (!response.ok) {
      throw new Error("Failed to fetch employees")
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
  }
})

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData: Omit<Employee, "id">, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })
      if (!response.ok) {
        throw new Error("Failed to create employee")
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, ...employeeData }: Employee, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })
      if (!response.ok) {
        throw new Error("Failed to update employee")
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const deleteEmployee = createAsyncThunk("employees/deleteEmployee", async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete employee")
    }
    return id
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
  }
})

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredEmployees = filterEmployees(state)
    },
    setDepartmentFilter: (state, action: PayloadAction<string>) => {
      state.departmentFilter = action.payload
      state.filteredEmployees = filterEmployees(state)
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
      state.filteredEmployees = filterEmployees(state)
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload
    },
    clearFilters: (state) => {
      state.searchQuery = ""
      state.departmentFilter = "all"
      state.statusFilter = "all"
      state.filteredEmployees = state.employees
    },
    setPagination: (state, action: PayloadAction<Partial<EmployeeState["pagination"]>>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false
        state.employees = action.payload
        state.filteredEmployees = action.payload
        state.pagination.total = action.payload.length
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create employee
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.employees.push(action.payload)
        state.filteredEmployees = filterEmployees(state)
        state.pagination.total += 1
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id)
        if (index !== -1) {
          state.employees[index] = action.payload
          state.filteredEmployees = filterEmployees(state)
        }
      })
      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp) => emp.id !== action.payload)
        state.filteredEmployees = filterEmployees(state)
        state.pagination.total -= 1
      })
  },
})

function filterEmployees(state: EmployeeState): Employee[] {
  let filtered = state.employees

  if (state.searchQuery) {
    filtered = filtered.filter(
      (emp) =>
        emp.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(state.searchQuery.toLowerCase()),
    )
  }

  if (state.departmentFilter !== "all") {
    filtered = filtered.filter((emp) => emp.department === state.departmentFilter)
  }

  if (state.statusFilter !== "all") {
    filtered = filtered.filter((emp) => emp.status === state.statusFilter)
  }

  return filtered
}

export const {
  setSearchQuery,
  setDepartmentFilter,
  setStatusFilter,
  setSelectedEmployee,
  clearFilters,
  setPagination,
} = employeeSlice.actions

export default employeeSlice.reducer
