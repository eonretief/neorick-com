"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LegalPageLayout from "@/components/legal/LegalPageLayout"
import { privacyPolicySections } from "./sections"
import { useEffect } from "react"
import { track } from "@vercel/analytics"

export default function PrivacyPolicyPage() {
    useEffect(() => {
        track("Page View", {
            page: "privacy-policy",
            pageType: "legal",
        })
    }, [])

    return (
        <div className="h-screen w-screen overflow-hidden">
            {/* Header - fixed at the top */}
            <Header theme="light" currentPage="privacy-policy" />

            {/* Legal page content */}
            <LegalPageLayout
                title="Privacy Policy"
                lastUpdated="September 5, 2025"
                sections={privacyPolicySections}
                currentPage="privacy-policy"
            />

            {/* Footer - fixed at bottom */}
            <Footer theme="light" bgColor="bg-[#f8f9fa]" className="fixed bottom-0 left-0 w-full z-20" />
        </div>
    )
}
