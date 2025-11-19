import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Offiong Restaurant - Fine Dining Experience',
  description: 'Experience authentic Nigerian cuisine at Offiong Restaurant. Premium quality meals prepared with passion.',
  generator: 'v0.app',
  icons: {
    icon: '/images/shhhhhh.png',
    apple: '/images/shhhhhh.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
