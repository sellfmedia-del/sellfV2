import type {Metadata} from 'next'

export const metadata: Metadata = {title: 'Sellf Partners Studio', robots: {index: false, follow: false}}

export default function PartnersStudioLayout({children}: {children: React.ReactNode}) {
  return children
}
