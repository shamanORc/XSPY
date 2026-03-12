import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'X Spy History — AI Content Intelligence',
  description: 'Analise livros, extraia copies bilionárias, gere áudio e domine seu nicho.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: '#16161F', color: '#E8E8F0', border: '1px solid #1E1E2E', fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px' },
          success: { iconTheme: { primary: '#C9A84C', secondary: '#0A0A0F' } },
          error:   { iconTheme: { primary: '#EF4444', secondary: '#0A0A0F' } },
        }} />
      </body>
    </html>
  )
}
