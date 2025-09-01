import type { Employee } from "@/lib/types/employee"

const API_BASE = "/api/employees"

export const employeeApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await fetch(API_BASE)
    if (!response.ok) {
      throw new Error("Failed to fetch employees")
    }
    return response.json()
  },

  getById: async (id: string): Promise<Employee> => {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch employee")
    }
    return response.json()
  },

  create: async (employee: Omit<Employee, "id">): Promise<Employee> => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
    if (!response.ok) {
      throw new Error("Failed to create employee")
    }
    return response.json()
  },

  update: async (id: string, employee: Partial<Employee>): Promise<Employee> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
    if (!response.ok) {
      throw new Error("Failed to update employee")
    }
    return response.json()
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete employee")
    }
  },
}
