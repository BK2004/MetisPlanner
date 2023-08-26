import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={`bg-gray-200 dark:bg-neutral-900 max-w-full w-screen min-h-screen ${inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
