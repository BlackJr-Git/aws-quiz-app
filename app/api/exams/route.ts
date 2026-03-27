import { NextResponse } from 'next/server'
import { getAllExams } from '@/lib/parser'

export async function GET() {
  try {
    const exams = getAllExams()
    const examsList = exams.map(exam => ({
      id: exam.id,
      title: exam.title,
      questionCount: exam.questions.length
    }))
    
    return NextResponse.json(examsList)
  } catch (error) {
    console.error('Error fetching exams:', error)
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 })
  }
}
