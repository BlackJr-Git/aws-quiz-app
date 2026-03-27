"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  initialTime: number
  onTimeUp: () => void
}

export function Timer({ initialTime, onTimeUp }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp()
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining, onTimeUp])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  const isWarning = timeRemaining <= 300
  const isCritical = timeRemaining <= 60

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-lg font-semibold transition-all ${
        isCritical
          ? "animate-pulse border-red-500 bg-red-50 text-red-700 shadow-lg dark:bg-red-950 dark:text-red-300"
          : isWarning
            ? "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
            : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900"
      }`}
    >
      <Clock className={`h-5 w-5 ${isCritical ? "animate-spin" : ""}`} />
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}
