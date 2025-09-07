"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LegalPageLayout from "@/components/legal/LegalPageLayout"
import { termsOfUseSections } from "./sections"
import { useEffect } from "react"
import { track } from "@vercel/analytics"

export default function TermsOfUsePage() {
    useEffect(() => {
        track("Page View", {
            page: "terms-of-use",
            pageType: "legal",
        })
    }, [])

    return (
        <div className="h-screen w-screen overflow-hidden">
            {/* Header - fixed at the top */}
            <Header theme="light" currentPage="terms-of-use" />

            {/* Legal page content */}
            <LegalPageLayout
                title="Terms of Use"
                lastUpdated="September 5, 2025"
                sections={termsOfUseSections}
                currentPage="terms-of-use"
            />

            {/* Footer - fixed at bottom */}
            <Footer theme="light" bgColor="bg-[#f8f9fa]" className="fixed bottom-0 left-0 w-full z-20" />
        </div>
    )
}
