import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, FileText } from "lucide-react"
import { getAllExams } from "@/lib/parser"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  const exams = getAllExams()

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-in text-center duration-700 fade-in slide-in-from-top-4">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            AWS Cloud Practitioner Quiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Practice exams for AWS Certified Cloud Practitioner (CLF-C02)
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>50 minutes per exam</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>50 questions each</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/study">
              <Button
                variant="outline"
                size="lg"
                className="transition-all hover:scale-105"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Study Guide & Notes
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, index) => (
            <Card
              key={exam.id}
              className="animate-in transition-all fade-in slide-in-from-bottom-4 hover:scale-105 hover:shadow-xl"
              style={{
                animationDelay: `${index * 50}ms`,
                animationDuration: "500ms",
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                      <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{exam.title}</CardTitle>
                      <CardDescription>
                        {exam.questions.length} questions
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/quiz/${exam.id}`}>
                  <Button className="w-full transition-transform hover:scale-105">
                    Start Exam
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Exam Instructions</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Each exam contains 50 questions covering all AWS Cloud
                Practitioner topics
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>You have 50 minutes to complete each exam</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Some questions may have multiple correct answers - read
                carefully
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>You can review your answers at the end of the exam</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>A passing score is typically 70% or higher</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
