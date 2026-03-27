import { Question, Exam } from "./types"
import fs from "fs"
import path from "path"

export function parseMarkdownExam(content: string, examId: number): Exam {
  const lines = content.split("\n")
  const questions: Question[] = []

  let currentQuestion: Partial<Question> | null = null
  let currentOptions: string[] = []
  let questionNumber = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Match question number (e.g., "1. Question text")
    const questionMatch = line.match(/^(\d+)\.\s+(.+)/)
    if (questionMatch) {
      // Save previous question if exists
      if (currentQuestion && currentOptions.length > 0) {
        currentQuestion.options = currentOptions
        questions.push(currentQuestion as Question)
      }

      questionNumber = parseInt(questionMatch[1])
      currentQuestion = {
        id: questionNumber,
        question: questionMatch[2],
        options: [],
        correctAnswer: [],
        isMultipleChoice: false,
      }
      currentOptions = []
      continue
    }

    // Match options (e.g., "- A. Option text" or "    - A. Option text")
    const optionMatch = line.match(/^-\s+([A-E])\.\s+(.+)/)
    if (optionMatch && currentQuestion) {
      const optionLetter = optionMatch[1]
      const optionText = optionMatch[2]
      currentOptions.push(`${optionLetter}. ${optionText}`)
      continue
    }

    // Match answer (e.g., "Correct answer: D" or "Correct answer: B, E")
    const answerMatch = line.match(/Correct answer:\s*([A-E](?:,\s*[A-E])*)/)
    if (answerMatch && currentQuestion) {
      const answers = answerMatch[1].split(",").map((a) => a.trim())
      currentQuestion.correctAnswer = answers
      currentQuestion.isMultipleChoice = answers.length > 1

      // Check if question text mentions "Choose TWO" or similar
      if (
        currentQuestion.question &&
        currentQuestion.question.match(/\(Choose\s+(TWO|THREE|FOUR)\)/i)
      ) {
        currentQuestion.isMultipleChoice = true
      }
    }
  }

  // Save last question
  if (currentQuestion && currentOptions.length > 0) {
    currentQuestion.options = currentOptions
    questions.push(currentQuestion as Question)
  }

  // Extract title from content
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : `Practice Exam ${examId}`

  return {
    id: examId,
    title,
    questions,
  }
}

export function getAllExams(): Exam[] {
  const examsDir = path.join(process.cwd(), "docs", "practice-exam")
  const files = fs.readdirSync(examsDir)

  const examFiles = files
    .filter((file) => file.startsWith("practice-exam-") && file.endsWith(".md"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/practice-exam-(\d+)\.md/)?.[1] || "0")
      const numB = parseInt(b.match(/practice-exam-(\d+)\.md/)?.[1] || "0")
      return numA - numB
    })

  const exams: Exam[] = []

  for (const file of examFiles) {
    const examId = parseInt(file.match(/practice-exam-(\d+)\.md/)?.[1] || "0")
    const filePath = path.join(examsDir, file)
    const content = fs.readFileSync(filePath, "utf-8")
    const exam = parseMarkdownExam(content, examId)
    exams.push(exam)
  }

  return exams
}

export function getExamById(id: number): Exam | null {
  const examsDir = path.join(process.cwd(), "docs", "practice-exam")
  const fileName = `practice-exam-${id}.md`
  const filePath = path.join(examsDir, fileName)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const content = fs.readFileSync(filePath, "utf-8")
  return parseMarkdownExam(content, id)
}
