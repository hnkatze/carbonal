import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import QueryProvider from "@/providers/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL("https://elcarbonalfc.com"),
  title: "El Carbonal FC",
  description: "Sitio oficial del club de fútbol El Carbonal, equipo de Bonito Oriental, Colón, Honduras. Fundado en 2017.",
  keywords: [
    "El Carbonal FC",
    "fútbol Bonito Oriental",
    "fútbol Colón Honduras",
    "club de fútbol Honduras",
    "equipo de fútbol 2017",
    "El Carbonal Bonito Oriental",
    "fútbol hondureño",
    "liga de fútbol Honduras"
  ],
  author: "El Carbonal FC",
  openGraph: {
    title: "El Carbonal FC",
    description: "Sitio oficial del club de fútbol El Carbonal, Bonito Oriental, Colón, Honduras. Fundado en 2017.",
    type: "website",
    locale: "es_HN",
    url: "https://elcarbonalfc.com/",
    siteName: "El Carbonal FC",
    images: [
      {
        url: "/assets/logo1.png",
        width: 800,
        height: 600,
        alt: "Logo El Carbonal FC"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "El Carbonal FC",
    description: "Sitio oficial del club de fútbol El Carbonal, Bonito Oriental, Colón, Honduras. Fundado en 2017.",
    images: ["/assets/logo1.png"]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
