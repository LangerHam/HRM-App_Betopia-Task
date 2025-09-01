"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "./store/store"
import { ThemeProvider } from "next-themes"
    
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </Provider>
  )
}
