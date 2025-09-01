import { NextResponse } from "next/server"
import type { AttendanceRecord } from "@/lib/types/employee"

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "#U1323",
    name: "David Do",
    avatar: "/professional-man.png",
    email: "capiproduct@gmail.com",
    phone: "09842742274",
    role: "HR Manager",
    reimbursement: 9500000,
    status: "On-Time",
    date: "2024-01-15",
  },
  {
    id: "2",
    employeeId: "#U1323",
    name: "Gabriel Cho",
    avatar: "/professional-woman-developer.png",
    email: "ducphu.forwork@gmail.com",
    phone: "09842742274",
    role: "Developer",
    reimbursement: 9500000,
    status: "Sick Leave",
    date: "2024-01-15",
  },
  {
    id: "3",
    employeeId: "#U1323",
    name: "Van Pelt",
    avatar: "/professional-woman-designer.png",
    email: "example@gmail.com",
    phone: "09842742274",
    role: "UI/UX Designer",
    reimbursement: 9500000,
    status: "Late",
    date: "2024-01-15",
  },
  {
    id: "4",
    employeeId: "#U1323",
    name: "Patrick Jane",
    avatar: "/professional-man-account.png",
    email: "example@gmail.com",
    phone: "09842742274",
    role: "Account",
    reimbursement: 9500000,
    status: "On-Time",
    date: "2024-01-15",
  },
]

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(mockAttendance)
}
