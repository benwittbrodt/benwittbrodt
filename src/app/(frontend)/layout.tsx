import React from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import './styles.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata = {
  title: { default: 'Ben Wittbrodt', template: '%s | Ben Wittbrodt' },
  description: 'Personal site of Ben Wittbrodt — articles, background, and contact.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans text-lg text-gray-800 antialiased min-h-screen flex flex-col">
        <Nav />
        {children}
        <Footer />
        <Script
          src="https://analytics.811mapleton.com/script.js"
          strategy="afterInteractive"
          data-domains="benwittbrodt.com,www.benwittbrodt.com"
          data-website-id="f6e16ae8-6b12-4ee7-8ad3-700a551b6162"
        />
      </body>
    </html>
  )
}
