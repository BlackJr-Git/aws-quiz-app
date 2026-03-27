import { NextResponse } from 'next/server'
import { getExamById } from '@/lib/parser'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const examId = parseInt(id)
    
    if (isNaN(examId)) {
      return NextResponse.json({ error: 'Invalid exam ID' }, { status: 400 })
    }
    
    const exam = getExamById(examId)
    
    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 })
    }
    
    return NextResponse.json(exam)
  } catch (error) {
    console.error('Error fetching exam:', error)
    return NextResponse.json({ error: 'Failed to fetch exam' }, { status: 500 })
  }
}
