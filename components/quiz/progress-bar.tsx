"use client"

import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="animate-in space-y-2 duration-300 fade-in">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="transition-all">
          Question {current} of {total}
        </span>
        <span className="font-semibold transition-all">
          {Math.round(percentage)}%
        </span>
      </div>
      <Progress
        value={percentage}
        className="h-2 transition-all duration-500"
      />
    </div>
  )
}
