"use client"

import { useState, useRef } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollableContent, { type ScrollableContentRef } from "@/components/ScrollableContent"
import ScrollProgressBar from "@/components/ScrollProgressBar"
import { platformEngineeringSections } from "./components/PlatformEngineeringSections"
import { track } from "@vercel/analytics"
import { useEffect } from "react"

export default function PlatformEngineeringPage() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [currentSectionId, setCurrentSectionId] = useState("")
    const scrollableRef = useRef<ScrollableContentRef>(null)

    useEffect(() => {
        track("Page View", {
            page: "platform-engineering-and-automation",
            pageTitle: "Platform Engineering & Automation",
        })
    }, [])

    const handleSectionChange = (sectionIndex: number, sectionId: string) => {
        setCurrentSectionIndex(sectionIndex)
        setCurrentSectionId(sectionId)

        // Track analytics
        track("Section View", {
            page: "platform-engineering-and-automation",
            section: sectionId,
            sectionIndex: sectionIndex,
        })
    }

    return (
        <div className="h-screen w-screen overflow-hidden">
            {/* Header - fixed at the top */}
            <Header theme="light" currentPage="data-and-digital-foundations" />

            {/* Scroll Progress Bar - slides out from under header */}
            <ScrollProgressBar
                sections={platformEngineeringSections}
                pageTitle="Platform Engineering & Automation"
                theme="light"
                currentSectionIndex={currentSectionIndex}
                currentSectionId={currentSectionId}
            />

            {/* Scrollable content area */}
            <ScrollableContent
                ref={scrollableRef}
                sections={platformEngineeringSections}
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
