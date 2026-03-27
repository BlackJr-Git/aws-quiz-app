export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string[]
  isMultipleChoice: boolean
}

export interface Exam {
  id: number
  title: string
  questions: Question[]
}

export interface QuizState {
  examId: number
  currentQuestionIndex: number
  answers: Record<number, string[]>
  startTime: number
  timeRemaining: number
}

export interface QuizResult {
  examId: number
  examTitle: string
  score: number
  totalQuestions: number
  answers: Record<number, string[]>
  questions: Question[]
  timeSpent: number
}
