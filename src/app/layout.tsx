import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
      <body className={`bg-gray-200 dark:bg-neutral-900 max-w-full w-screen h-screen ${inter.className}`}>
        <div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-8 grid-rows-4 gap-4 container w-screen h-screen max-w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
