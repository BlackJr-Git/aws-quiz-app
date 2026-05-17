"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface MarkdownContentProps {
  content: string
}

function extractToc(content: string) {
  const lines = content.split("\n")
  const tocLines: string[] = []
  let inToc = false
  let contentStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (i === 0 && line.startsWith("# ")) {
      contentStart = 1
      continue
    }
    if (!inToc && line.match(/^[-*] \[.+\]\(#.+\)/)) {
      inToc = true
    }
    if (inToc) {
      if (line.match(/^[-*\s]+\[.+\]\(#.+\)/) || line.trim() === "") {
        tocLines.push(line)
        contentStart = i + 1
      } else {
        break
      }
    }
  }

  const bodyLines = lines.slice(contentStart).join("\n").trimStart()
  return { tocLines, body: bodyLines }
}

function TocBlock({ tocLines }: { tocLines: string[] }) {
  const [open, setOpen] = useState(false)
  const items = tocLines.filter((l) => l.match(/\[.+\]\(#.+\)/))

  if (items.length === 0) return null

  return (
    <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left font-semibold text-blue-700 dark:text-blue-300"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0" />
        )}
        Sommaire
        <span className="ml-auto text-xs font-normal text-blue-500 dark:text-blue-400">
          {items.length} sections
        </span>
      </button>
      {open && (
        <div className="border-t border-blue-200 px-5 py-4 dark:border-blue-800">
          <ul className="space-y-1">
            {items.map((line, i) => {
              const match = line.match(/(\s*)\[(.+?)\]\((#.+?)\)/)
              if (!match) return null
              const indent = (match[1].length / 2) * 12
              return (
                <li key={i} style={{ paddingLeft: indent }}>
                  <a
                    href={match[3]}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {match[2]}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const { tocLines, body } = extractToc(content)

  return (
    <div>
      <TocBlock tocLines={tocLines} />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: () => null,
          h2: ({ children }) => (
            <h2 className="mb-4 mt-10 border-b-2 border-blue-200 pb-2 text-2xl font-bold text-gray-900 dark:border-blue-800 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-3 mt-7 text-lg font-semibold text-blue-700 dark:text-blue-400">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-2 mt-5 text-base font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-5 list-disc space-y-1.5 text-gray-700 [&_ol]:mt-1.5 [&_ul]:mb-0 [&_ul]:mt-1.5 dark:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-gray-700 [&_ol]:mb-0 [&_ol]:mt-1.5 [&_ul]:mb-0 [&_ul]:mt-1.5 dark:text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 leading-7">{children}</li>
          ),
          a: ({ href, children }) => {
            const isAnchor = href?.startsWith("#")
            return (
              <a
                href={href}
                target={isAnchor ? undefined : "_blank"}
                rel={isAnchor ? undefined : "noopener noreferrer"}
                className="font-medium text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {children}
              </a>
            )
          },
          code: ({ className, children }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="rounded-md bg-pink-50 px-1.5 py-0.5 font-mono text-sm font-medium text-pink-700 dark:bg-pink-950/50 dark:text-pink-300">
                  {children}
                </code>
              )
            }
            return (
              <code className={`${className} block`}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-6 mt-2 overflow-x-auto rounded-xl bg-gray-950 p-5 text-sm text-gray-100 shadow-inner">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-5 flex gap-3 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-3 dark:border-amber-600 dark:bg-amber-950/30">
              <span className="mt-0.5 shrink-0 text-amber-500">💡</span>
              <div className="text-amber-900 dark:text-amber-200">{children}</div>
            </blockquote>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null
            return (
              <span className="my-8 block">
                <Image
                  src={src.startsWith("/") ? src : `/images/${src}`}
                  alt={alt || ""}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-md transition-transform hover:scale-[1.02]"
                  style={{ width: "100%", height: "auto" }}
                />
              </span>
            )
          },
          table: ({ children }) => (
            <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-blue-50 dark:bg-blue-950/50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors odd:bg-white even:bg-gray-50 hover:bg-blue-50/50 dark:odd:bg-transparent dark:even:bg-gray-900/40 dark:hover:bg-blue-950/20">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border-b border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:text-blue-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
              {children}
            </td>
          ),
          hr: () => (
            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />
            </div>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-600 dark:text-gray-400">{children}</em>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  )
}
