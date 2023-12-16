import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Notification from '@/Components/Notification'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PICOTEO 🍕',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Notification/>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
