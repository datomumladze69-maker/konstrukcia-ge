import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://konstrukcia-ge.vercel.app"),

  title: {
    default:
      "KONSTRUKCIA.GE | სამშენებლო ტექნიკის და ინვენტარის გაქირავება",
    template: "%s | KONSTRUKCIA.GE",
  },

  description:
    "სამშენებლო ტექნიკის, ხარაჩოს, დოკის, ლამინატის, მეშალკის და სამშენებლო ინვენტარის გაქირავება საქართველოში.",

  verification: {
    google: "YckTo6t5ArwpUKUIYclMhQzHiK3k2wQiSBuwYIKqSqQ",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ka"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
