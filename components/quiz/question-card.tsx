"use client"

import { Question } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface QuestionCardProps {
  question: Question
  selectedAnswers: string[]
  onAnswerChange: (answers: string[]) => void
  showCorrectAnswer?: boolean
}

export function QuestionCard({
  question,
  selectedAnswers,
  onAnswerChange,
  showCorrectAnswer = false,
}: QuestionCardProps) {
  const handleSingleChoice = (value: string) => {
    onAnswerChange([value])
  }

  const handleMultipleChoice = (optionLetter: string, checked: boolean) => {
    if (checked) {
      onAnswerChange([...selectedAnswers, optionLetter])
    } else {
      onAnswerChange(selectedAnswers.filter((a) => a !== optionLetter))
    }
  }

  const getOptionLetter = (option: string): string => {
    return option.split(".")[0].trim()
  }

  const isCorrectOption = (optionLetter: string): boolean => {
    return question.correctAnswer.includes(optionLetter)
  }

  const isSelectedOption = (optionLetter: string): boolean => {
    return selectedAnswers.includes(optionLetter)
  }

  const getOptionClassName = (optionLetter: string): string => {
    if (!showCorrectAnswer) return ""

    const isCorrect = isCorrectOption(optionLetter)
    const isSelected = isSelectedOption(optionLetter)

    if (isCorrect && isSelected) {
      return "border-green-500 bg-green-50 dark:bg-green-950"
    }
    if (isCorrect && !isSelected) {
      return "border-green-300 bg-green-50 dark:bg-green-950"
    }
    if (!isCorrect && isSelected) {
      return "border-red-500 bg-red-50 dark:bg-red-950"
    }
    return ""
  }

  return (
    <div className="space-y-4">
      <div className="animate-in rounded-lg border bg-white p-6 shadow-sm transition-shadow duration-500 fade-in slide-in-from-right-4 hover:shadow-md dark:bg-gray-900">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 transition-transform hover:scale-110 dark:bg-blue-900 dark:text-blue-300">
            {question.id}
          </span>
          <p className="text-lg leading-relaxed">{question.question}</p>
        </div>

        {question.isMultipleChoice && !showCorrectAnswer && (
          <p className="mb-4 text-sm text-orange-600 dark:text-orange-400">
            Select multiple answers
          </p>
        )}

        <div className="space-y-3">
          {question.isMultipleChoice ? (
            question.options.map((option, index) => {
              const optionLetter = getOptionLetter(option)
              return (
                <div
                  key={optionLetter}
                  className={`flex items-start gap-3 rounded-lg border p-4 transition-all hover:scale-[1.02] hover:shadow-sm ${getOptionClassName(optionLetter)}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Checkbox
                    id={`q${question.id}-${optionLetter}`}
                    checked={selectedAnswers.includes(optionLetter)}
                    onCheckedChange={(checked) =>
                      handleMultipleChoice(optionLetter, checked as boolean)
                    }
                    disabled={showCorrectAnswer}
                  />
                  <Label
                    htmlFor={`q${question.id}-${optionLetter}`}
                    className="flex-1 cursor-pointer leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              )
            })
          ) : (
            <RadioGroup
              value={selectedAnswers[0] || ""}
              onValueChange={handleSingleChoice}
              disabled={showCorrectAnswer}
            >
              {question.options.map((option, index) => {
                const optionLetter = getOptionLetter(option)
                return (
                  <div
                    key={optionLetter}
                    className={`flex items-start gap-3 rounded-lg border p-4 transition-all hover:scale-[1.02] hover:shadow-sm ${getOptionClassName(optionLetter)}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <RadioGroupItem
                      value={optionLetter}
                      id={`q${question.id}-${optionLetter}`}
                    />
                    <Label
                      htmlFor={`q${question.id}-${optionLetter}`}
                      className="flex-1 cursor-pointer leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          )}
        </div>

        {showCorrectAnswer && (
          <div className="mt-4 rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950">
            <p className="font-semibold text-green-700 dark:text-green-300">
              Correct Answer: {question.correctAnswer.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
