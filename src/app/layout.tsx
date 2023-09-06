import './globals.css'
import { Fira_Code, Inter } from 'next/font/google'

const sansFont = Inter({ variable: '--sans-font', subsets: ['latin'] })
const monoFont = Fira_Code({ variable: '--mono-font', subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
