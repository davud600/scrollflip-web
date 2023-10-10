import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserProvider from '@/context/userContext'
import ArticleProvider from '@/context/articleContext'
import Navbar from '@/components/Navigation/Navbar'
import Wishlist from '@/components/Wishlist/Wishlist'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scrollflip',
  description: 'Flip through Worlds Latest News!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: 'white' }}>
        <UserProvider>
          <ArticleProvider>
            <Navbar />
            <Wishlist />
            {children}
          </ArticleProvider>
        </UserProvider>
      </body>
    </html>
  )
}
