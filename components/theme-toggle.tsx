"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted] = useState(true)

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="h-9 w-9 transition-transform hover:scale-110 hover:rotate-12"
    >
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 scale-100 rotate-0 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
