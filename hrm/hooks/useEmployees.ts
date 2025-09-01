"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  setSearchQuery,
  setDepartmentFilter,
  setStatusFilter,
  clearFilters,
} from "@/lib/store/employeeSlice"
import type { Employee } from "@/lib/types/employee"

export function useEmployees() {
  const dispatch = useAppDispatch()
  const {
    employees,
    filteredEmployees,
    selectedEmployee,
    searchQuery,
    departmentFilter,
    statusFilter,
    isLoading,
    error,
    pagination,
  } = useAppSelector((state) => state.employees)

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees())
    }
  }, [dispatch, employees.length])

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  const handleDepartmentFilter = (department: string) => {
    dispatch(setDepartmentFilter(department))
  }

  const handleStatusFilter = (status: string) => {
    dispatch(setStatusFilter(status))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const handleCreateEmployee = async (employeeData: Omit<Employee, "id">) => {
    return dispatch(createEmployee(employeeData))
  }

  const handleUpdateEmployee = async (employee: Employee) => {
    return dispatch(updateEmployee(employee))
  }

  const handleDeleteEmployee = async (id: string) => {
    return dispatch(deleteEmployee(id))
  }

  const refreshEmployees = () => {
    dispatch(fetchEmployees())
  }

  return {
    employees: filteredEmployees,
    allEmployees: employees,
    selectedEmployee,
    searchQuery,
    departmentFilter,
    statusFilter,
    isLoading,
    error,
    pagination,
    handleSearch,
    handleDepartmentFilter,
    handleStatusFilter,
    handleClearFilters,
    handleCreateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    refreshEmployees,
  }
}
