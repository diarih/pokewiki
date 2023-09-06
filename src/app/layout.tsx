import Providers from '@/utils/lib/Providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FavProvider } from '@/context/FavContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PokeWiki',
  description: 'Find Your Perfect Pokemon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className}`}>
        <FavProvider>
          <Providers>
            <div className="navbar bg-base-300">
              <div className="navbar-start">
              </div>
              <div className="navbar-center">
                <a href="/" className="btn btn-ghost normal-case text-xl">PokeWiki</a>
              </div>
              <div className="navbar-end">
              </div>
            </div>
            {children}
          </Providers>
        </FavProvider>
      </body>
    </html>
  )
}
