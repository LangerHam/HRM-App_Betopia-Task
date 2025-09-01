"use client";

import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { AttendanceRecord } from "@/lib/types/employee";

interface AttendanceTableProps {
  attendance: AttendanceRecord[];
}

export function AttendanceTable({ attendance }: AttendanceTableProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
  }

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "employeeId",
      header: "Employee ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={record.avatar || "/placeholder.svg"}
                alt={record.name}
              />
              <AvatarFallback>{record.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-800 dark:text-gray-400">
              {record.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "reimbursement",
      header: "Reimbursement",
      cell: ({ row }) => {
        const amount = row.getValue("reimbursement") as number;
        return (
          <span className="font-mono text-sm text-gray-700 dark:text-gray-400">
            $ {amount.toLocaleString()}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Attendance",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={attendance}
      searchKey="name"
      searchPlaceholder="Search attendance..."
    />
  );
}
