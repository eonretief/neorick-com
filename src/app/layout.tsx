import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Raleway, Geist } from "next/font/google"

import "@/styles/globals.css"

const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-raleway",
})

const geist = Geist({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist",
})

export const metadata: Metadata = {
    title: "Neorick",
    icons: {
        icon: "/favicon.svg",
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${raleway.variable} ${geist.variable} antialiased`}>
            <body suppressHydrationWarning>
                <Suspense fallback={null}>{children}</Suspense>
            </body>
        </html>
    )
}
