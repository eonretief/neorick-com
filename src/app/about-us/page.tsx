"use client"

import { useState, useRef } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollableContent, { type ScrollableContentRef } from "@/components/ScrollableContent"
import ScrollProgressBar from "@/components/ScrollProgressBar"
import { aboutUsSections } from "./components/AboutUsSections"
import { track } from "@vercel/analytics"

export default function AboutUsPage() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [currentSectionId, setCurrentSectionId] = useState("")
    const scrollableRef = useRef<ScrollableContentRef>(null)

    const handleSectionChange = (sectionIndex: number, sectionId: string) => {
        setCurrentSectionIndex(sectionIndex)
        setCurrentSectionId(sectionId)

        // Track analytics
        track("Section View", {
            page: "about-us",
            section: sectionId,
            sectionIndex: sectionIndex
        })
    }

    return (
        <div className="h-screen w-screen overflow-hidden">
            {/* Header - fixed at the top */}
            <Header theme="light" currentPage="about-us" />

            {/* Scroll Progress Bar - slides out from under header */}
            <ScrollProgressBar
                sections={aboutUsSections}
                pageTitle="About Us"
                theme="light"
                currentSectionIndex={currentSectionIndex}
                currentSectionId={currentSectionId}
            />

            {/* Scrollable content area */}
            <ScrollableContent
                ref={scrollableRef}
                sections={aboutUsSections}
                snapDuration={0.8}
                snapEase="power2.inOut"
                enableKeyboardNavigation={true}
                enableWheelSnap={true}
                onSectionChange={handleSectionChange}
            />

            {/* Footer - fixed at bottom */}
            <Footer theme="light" bgColor="bg-[#f8f9fa]" className="fixed bottom-0 left-0 w-full z-20" />
        </div>
    )
}