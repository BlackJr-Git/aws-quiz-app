"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Timer } from "@/components/quiz/timer"
import { QuestionCard } from "@/components/quiz/question-card"
import { ProgressBar } from "@/components/quiz/progress-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Exam } from "@/lib/types"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

const EXAM_DURATION = 50 * 60

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const examId = parseInt(params.id as string)

  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`/api/exams/${examId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch exam")
        }
        const data = await response.json()
        setExam(data)
      } catch (error) {
        console.error("Error fetching exam:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExam()
  }, [examId])

  const handleAnswerChange = (
    questionId: number,
    selectedAnswers: string[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswers,
    }))
  }

  const handleNext = () => {
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (!exam) return

    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    const result = {
      examId: exam.id,
      examTitle: exam.title,
      answers,
      questions: exam.questions,
      timeSpent,
    }

    localStorage.setItem("quizResult", JSON.stringify(result))
    router.push(`/results/${exam.id}`)
  }

  const handleTimeUp = () => {
    handleSubmit()
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading exam...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Exam not found
          </h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const currentQuestion = exam.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 border-b bg-white shadow-sm backdrop-blur-sm dark:bg-gray-900/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="transition-transform hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Exit
              </Button>
              <h1 className="text-xl font-semibold">{exam.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Answered: {getAnsweredCount()} / {exam.questions.length}
              </div>
              <Timer initialTime={EXAM_DURATION} onTimeUp={handleTimeUp} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={exam.questions.length}
            />
          </div>

          <QuestionCard
            question={currentQuestion}
            selectedAnswers={answers[currentQuestion.id] || []}
            onAnswerChange={(selectedAnswers) =>
              handleAnswerChange(currentQuestion.id, selectedAnswers)
            }
          />

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Exam
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-10 gap-2">
            {exam.questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all hover:scale-110 ${
                  index === currentQuestionIndex
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                    : answers[question.id]
                      ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
