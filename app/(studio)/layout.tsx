import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Sellf Engage Studio',
  robots: {index: false, follow: false},
}

export default function StudioRootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="tr">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}
