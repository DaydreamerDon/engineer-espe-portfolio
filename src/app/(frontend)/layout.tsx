import type { Metadata } from 'next'

import localFont from 'next/font/local'
import React from 'react'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = localFont({
  display: 'swap',
  src: './fonts/Inter-Variable.ttf',
  variable: '--font-inter',
  weight: '100 900',
})

const spaceGrotesk = localFont({
  display: 'swap',
  src: './fonts/SpaceGrotesk-Variable.ttf',
  variable: '--font-space-grotesk',
  weight: '300 700',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${spaceGrotesk.variable} h-full`} lang="en">
      <head>
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="h-full">{children}</body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  description:
    'Portfolio of Esperidion Saquin, a civil engineer and QAQC specialist focused on quality, compliance, and project delivery.',
  openGraph: {
    description:
      'Portfolio of Esperidion Saquin, a civil engineer and QAQC specialist focused on quality, compliance, and project delivery.',
    title: 'Esperidion Saquin | Civil Engineer & QAQC Specialist',
    type: 'website',
  },
  title: 'Esperidion Saquin | Civil Engineer & QAQC Specialist',
  twitter: {
    card: 'summary_large_image',
  },
}
