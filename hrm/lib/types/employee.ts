export interface Employee {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  employeeId: string
  department: string
  designation: string
  type: "Office" | "Remote"
  status: "Permanent" | "Contract" | "Intern"
  joinDate: string
  salary: number
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  name: string
  avatar: string
  email: string
  phone: string
  role: string
  reimbursement: number
  status: "On-Time" | "Sick Leave" | "Late"
  date: string
}
