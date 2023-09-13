import './globals.css'
import type { Metadata } from 'next'
import { Varela_Round as Font } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { cookies } from 'next/headers'

const font = Font({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metis - Daily Planner',
  description: 'Planner that meets all of your daily, weekly, monthly, or even yearly needs!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cookies().get("theme")?.value === "Dark" ? "dark scroll-none" : "scroll-none"}>
      <body className={`bg-gray-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 max-w-full w-screen min-h-screen scroll-none ${font.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
