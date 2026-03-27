import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Nunito_Sans,
  JetBrains_Mono,
} from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
})

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://aws-quiz-app-psi.vercel.app"),
  title: {
    default: "AWS Cloud Practitioner Quiz - Practice Exams CLF-C02",
    template: "%s | AWS Quiz App",
  },
  description:
    "Practice for AWS Certified Cloud Practitioner (CLF-C02) exam with 23 interactive practice tests. 50 questions each with 50-minute timer. Free online quiz tool to prepare for your AWS certification.",
  keywords: [
    "AWS",
    "Cloud Practitioner",
    "CLF-C02",
    "practice exam",
    "quiz",
    "certification",
    "Amazon Web Services",
    "cloud computing",
    "AWS exam prep",
    "free practice test",
    "AWS certification",
    "cloud certification",
  ],
  authors: [{ name: "AWS Quiz App" }],
  creator: "AWS Quiz App",
  publisher: "AWS Quiz App",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aws-quiz-app-psi.vercel.app",
    title: "AWS Cloud Practitioner Quiz - Practice Exams CLF-C02",
    description:
      "Practice for AWS Certified Cloud Practitioner exam with 23 interactive tests. 50 questions each, 50-minute timer. Free online quiz tool.",
    siteName: "AWS Quiz App",
    images: [
      {
        url: "aws-quiz-app-psi.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWS Cloud Practitioner Quiz - Practice Exams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Cloud Practitioner Quiz - Practice Exams CLF-C02",
    description:
      "Practice for AWS Certified Cloud Practitioner exam with 23 interactive tests. 50 questions each with 50-minute timer.",
    images: ["https://aws-quiz-app-psi.vercel.app/og-image.jpg"],
    creator: "@awsquizapp",
  },
  alternates: {
    canonical: "https://aws-quiz-app-psi.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        nunitoSans.variable,
        jetbrainsMonoHeading.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
