# HRM-Application

A Human Resource Management (HRM) dashboard built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, and **shadcn/ui** components.  
The app includes authentication, dashboard KPIs, charts, employee management, and attendance tracking.


------------------------------------------------------------------------

## 🚀 Run Steps

```bash
# Navigate to the project root
cd hrm

# Install dependencies
npm install

# (Optional) If you encounter issues with package-lock.json 
npm ci

# Start the development server
npm run dev

------------------------------------------------------------------------

## ⏱️ Time Spent

**Total:** `15 Hours: 26 Minutes`\

------------------------------------------------------------------------

## 📝 Notes on Assumptions / Shortcuts

- I did simplify authentication — the login page accepts any credentials and just stores a mock user + token in Redux. This way, I could implement route protection and state handling without wiring up a full auth system.  
- Had to fix ESLint and TypeScript issues (no-explicit-any, no-empty-object-type, unused vars) so that the project builds successfully on Vercel.  
- Changed the use of Tailwind’s `dark:` classes for theme switching, after realizing the `resolvedTheme` approach caused components like tables not to re-render properly.  

------------------------------------------------------------------------

## Bonus: Employees Screen

 Implemented an **Employees screen** under `/dashboard/employees`.\
- Displays employee data in a searchable, filterable, and sortable
table.\
- Integrates with the `useEmployees` hook for managing state and
deletion logic.