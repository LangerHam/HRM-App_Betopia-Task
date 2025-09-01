"use client"

import { Button } from "@/components/ui/button"
import { EmployeeTable } from "@/components/employees/employee-table"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { EmptyState } from "@/components/ui/empty-state"
import { Plus, Filter, Users } from "lucide-react"
import { useEmployees } from "@/hooks/useEmployees"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EmployeesPage() {
  const { employees, isLoading, error, handleClearFilters } = useEmployees()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Employees</h1>
            <p className="text-muted-foreground">Employee information</p>
          </div>
        </div>
        <Alert variant="destructive">
          <AlertDescription>Failed to load employees: {error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Employee information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            Add New Employee
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-lg border border-border p-4 md:p-6">
        {employees.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No employees found"
            description="No employees match your current filters. Try adjusting your search criteria."
            action={
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <EmployeeTable employees={employees} />
          </div>
        )}
      </div>
    </div>
  )
}
