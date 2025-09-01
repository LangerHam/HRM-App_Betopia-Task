"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
  });

  // Colors based on theme
  const borderColor = mounted
    ? resolvedTheme === "dark"
      ? "border-gray-700"
      : "border-gray-200"
    : "border-gray-200";

  const textColor = mounted
    ? resolvedTheme === "dark"
      ? "text-gray-200"
      : "text-gray-800"
    : "text-gray-800";

  const headerTextColor = mounted
    ? resolvedTheme === "dark"
      ? "text-gray-300"
      : "text-gray-600"
    : "text-gray-600";

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${textColor}`}
            />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event: { target: { value: any } }) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="pl-9"
            />
          </div>
        </div>
      )}
      <div
        className={`rounded-md border ${borderColor} bg-white dark:bg-gray-900 shadow-sm`}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={`border-b ${borderColor}`}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={headerTextColor}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-b ${borderColor} hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={textColor}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={`border-b ${borderColor}`}>
                <TableCell
                  colSpan={columns.length}
                  className={`h-24 text-center ${textColor}`}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
