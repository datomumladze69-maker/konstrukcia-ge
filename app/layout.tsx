import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
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

  keywords: [
    "გასაქირავებელი ხარაჩო",
    "გასაქირავებელი დოკი",
    "გასაქირავებელი ლამინატი",
    "გასაქირავებელი დანგრატი",
    "გასაქირავებელი მეშალკა",
    "მეშალკა ქირით",
    "ხარაჩო ქირით",
    "დოკი ქირით",
    "ლამინატი ქირით",
    "დანგრატი ქირით",
    "სამშენებლო მასალის გაქირავება",
    "სამშენებლო ტექნიკის გაქირავება",
    "სამშენებლო დანადგარების გაქირავება",
    "სამშენებლო ინვენტარის გაქირავება",
    "სამშენებლო მასალები",
    "სამშენებლო ტექნიკა",
    "სამშენებლო დანგრატი",
    "სამშენებლო ლამინატი",
    "სამშენებლო მეშალკა",
    "სამშენებლო ხარაჩო",
    "სამშენებლო დოკი",
    "დოკი",
    "ხარაჩო",
    "მეშალკა",
    "ლამინატი",
    "დანგრატი",
    "სახლის ასაშენებელი მასალა",
    "სამშენებლო მასალა",
    "construction rental",
    "construction equipment",
    "scaffolding rental",
    "KONSTRUKCIA.GE",
  ],

  authors: [{ name: "KONSTRUKCIA.GE" }],

  creator: "KONSTRUKCIA.GE",

  publisher: "KONSTRUKCIA.GE",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "KONSTRUKCIA.GE | სამშენებლო ტექნიკის გაქირავება",

    description:
      "ხარაჩოს, დოკის, მეშალკის, ლამინატის და სამშენებლო ტექნიკის გაქირავება.",

    url: "/",

    siteName: "KONSTRUKCIA.GE",

    locale: "ka_GE",

    type: "website",

    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 630,
        alt: "KONSTRUKCIA.GE სამშენებლო ტექნიკის გაქირავება",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "KONSTRUKCIA.GE | სამშენებლო ტექნიკის გაქირავება",

    description:
      "სამშენებლო ტექნიკის და ინვენტარის გაქირავება საქართველოში.",

    images: ["/cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "construction",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
