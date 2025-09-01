import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  role: string
  email: string
  avatar: string
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
}

if (typeof window !== "undefined") {
  const savedAuth = localStorage.getItem("auth")
  if (savedAuth) {
    try {
      const parsedAuth = JSON.parse(savedAuth)
      Object.assign(initialState, parsedAuth)
    } catch (error) {
      console.error("Failed to parse saved auth:", error)
    }
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user

      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state))
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth")
      }
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
