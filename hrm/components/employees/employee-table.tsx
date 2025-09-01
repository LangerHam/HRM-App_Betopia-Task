"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { DataTable } from "@/components/ui/data-table"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEmployees } from "@/hooks/useEmployees"
import type { Employee } from "@/lib/types/employee"

interface EmployeeTableProps {
  employees: Employee[]
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const { handleDeleteEmployee } = useEmployees()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const handleDelete = async (id: string, name: string) => {
    try {
      await handleDeleteEmployee(id)
      console.log(`Employee deleted: ${name} has been removed from the system.`)
    } catch (error) {
      console.error("Failed to delete employee. Please try again.")
    }
  }

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Employee Name",
      cell: ({ row }) => {
        const employee = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{employee.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "employeeId",
      header: "Employee ID",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <StatusBadge status={row.getValue("type")} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const employee = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400"
                onClick={() => handleDelete(employee.id, employee.name)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return <DataTable columns={columns} data={employees} searchKey="name" searchPlaceholder="Search employees..." />
}
