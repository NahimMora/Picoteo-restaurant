import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Notification from '@/Components/Notification'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import AuthProvider from '@/Components/AuthProvider'
import QueryProvider from '@/Components/QueryProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PICOTEO',
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
        <AuthProvider>
          <QueryProvider>
            <div>
              <Notification/>
              <Navbar/>
              {children}
              <Footer/>
              <ToastContainer position='bottom-right' theme='dark' autoClose={3000}/>
            </div>
          </QueryProvider>
        </AuthProvider>
        </body>
    </html>
  )
}
