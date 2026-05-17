import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MarkdownContent } from "@/components/markdown-content"
import { ArrowLeft, BookOpen } from "lucide-react"
import fs from "fs"
import path from "path"

async function getStudyContent(slug: string) {
  const filePath = path.join(process.cwd(), "docs", "sections", `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, "utf-8")
  
  const titleMatch = fileContent.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : slug.replace(/_/g, " ").toUpperCase()
  
  return {
    title,
    content: fileContent,
    slug,
  }
}

export async function generateStaticParams() {
  const sectionsDir = path.join(process.cwd(), "docs", "sections")
  const files = fs.readdirSync(sectionsDir)

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(".md", ""),
    }))
}

export default async function StudyContentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getStudyContent(slug)

  if (!content) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="sticky top-0 z-10 border-b bg-white shadow-sm backdrop-blur-sm dark:bg-gray-900/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/study">
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-transform hover:scale-105"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Study Guide
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h1 className="text-xl font-semibold">{content.title}</h1>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Practice Quizzes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-2xl bg-white px-8 py-10 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <MarkdownContent content={content.content} />
        </article>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="flex gap-4">
            <Link href="/study" className="flex-1">
              <Button
                variant="outline"
                className="w-full transition-all hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Topics
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full transition-all hover:scale-105">
                Practice with Quizzes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
