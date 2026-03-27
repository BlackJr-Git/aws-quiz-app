"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestionCard } from "@/components/quiz/question-card"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { QuizResult, Question } from "@/lib/types"
import { CheckCircle, XCircle, Home, RotateCcw } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    const savedResult = localStorage.getItem("quizResult")
    if (savedResult) {
      const data = JSON.parse(savedResult)

      let correctCount = 0
      data.questions.forEach((question: Question) => {
        const userAnswer = data.answers[question.id] || []
        const correctAnswer = question.correctAnswer.sort()
        const userAnswerSorted = userAnswer.sort()

        if (
          JSON.stringify(correctAnswer) === JSON.stringify(userAnswerSorted)
        ) {
          correctCount++
        }
      })

      setResult({
        ...data,
        score: correctCount,
        totalQuestions: data.questions.length,
      })
    }
  }, [])

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            No results found
          </h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const percentage = (result.score / result.totalQuestions) * 100
  const passed = percentage >= 70
  const timeSpentMinutes = Math.floor(result.timeSpent / 60)
  const timeSpentSeconds = result.timeSpent % 60

  const getQuestionResult = (question: Question): boolean => {
    const userAnswer = result.answers[question.id] || []
    const correctAnswer = question.correctAnswer.sort()
    const userAnswerSorted = userAnswer.sort()
    return JSON.stringify(correctAnswer) === JSON.stringify(userAnswerSorted)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Card className="mb-8 animate-in duration-700 fade-in slide-in-from-top-4">
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Exam Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="mb-2 text-xl font-semibold">
                  {result.examTitle}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Time spent: {timeSpentMinutes}m {timeSpentSeconds}s
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Your Score</span>
                  <span className="text-2xl font-bold">
                    {result.score} / {result.totalQuestions}
                  </span>
                </div>
                <Progress value={percentage} className="h-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Percentage
                  </span>
                  <span className="text-lg font-semibold">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div
                className={`rounded-lg p-6 text-center ${
                  passed
                    ? "bg-green-50 dark:bg-green-950"
                    : "bg-red-50 dark:bg-red-950"
                }`}
              >
                {passed ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-xl font-bold text-green-700 dark:text-green-300">
                        Congratulations! You Passed!
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        You scored above the 70% passing threshold
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-xl font-bold text-red-700 dark:text-red-300">
                        Keep Practicing
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        You need 70% or higher to pass
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setShowAnswers(!showAnswers)}
                  variant="outline"
                  className="flex-1 transition-all hover:scale-105"
                >
                  {showAnswers ? "Hide" : "Show"} Detailed Answers
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  className="flex-1 transition-all hover:scale-105"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
                <Button
                  onClick={() => router.push(`/quiz/${result.examId}`)}
                  variant="outline"
                  className="flex-1 transition-all hover:scale-105"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
              </div>
            </CardContent>
          </Card>

          {showAnswers && (
            <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold">Question Review</h2>
              {result.questions.map((question, index) => {
                const isCorrect = getQuestionResult(question)
                return (
                  <div
                    key={question.id}
                    className="animate-in space-y-2 fade-in slide-in-from-bottom-2"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: "400ms",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 animate-in text-green-600 duration-300 zoom-in" />
                      ) : (
                        <XCircle className="h-5 w-5 animate-in text-red-600 duration-300 zoom-in" />
                      )}
                      <span className="font-semibold">
                        Question {index + 1} -{" "}
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <QuestionCard
                      question={question}
                      selectedAnswers={result.answers[question.id] || []}
                      onAnswerChange={() => {}}
                      showCorrectAnswer={true}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
