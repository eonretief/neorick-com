// src/components/legal/LegalPageLayout.tsx
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import LegalNavigation from "./LegalNavigation"
import Container from "../ui/Container"

interface LegalSection {
    id: string
    title: string
    content: React.ReactNode
}

interface LegalPageLayoutProps {
    title: string
    lastUpdated: string
    sections: LegalSection[]
    currentPage: "privacy-policy" | "terms-of-use" | "cookie-policy"
}

export default function LegalPageLayout({ title, lastUpdated, sections, currentPage }: LegalPageLayoutProps) {
    const [activeSection, setActiveSection] = useState("header")
    const contentScrollRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    // Detect which section is currently visible
    const detectActiveSection = () => {
        if (!contentScrollRef.current) return

        const container = contentScrollRef.current
        const containerHeight = container.clientHeight

        // Check the header first
        const headerElement = sectionRefs.current["header"]
        if (headerElement) {
            const rect = headerElement.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            const visibleTop = Math.max(rect.top, containerRect.top)
            const visibleBottom = Math.min(rect.bottom, containerRect.bottom)
            const visibleArea = Math.max(0, visibleBottom - visibleTop)

            if (visibleArea > containerHeight * 0.3) {
                setActiveSection("header")
                return
            }
        }

        // Check sections
        for (const section of sections) {
            const element = sectionRefs.current[section.id]
            if (element) {
                const rect = element.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()
                const visibleTop = Math.max(rect.top, containerRect.top)
                const visibleBottom = Math.min(rect.bottom, containerRect.bottom)
                const visibleArea = Math.max(0, visibleBottom - visibleTop)

                if (visibleArea > containerHeight * 0.3) {
                    setActiveSection(section.id)
                    return
                }
            }
        }
    }

    // Set up scroll listener
    useEffect(() => {
        const container = contentScrollRef.current
        if (!container) return

        const handleScroll = () => {
            detectActiveSection()
        }

        container.addEventListener("scroll", handleScroll)

        // Initial detection
        setTimeout(detectActiveSection, 100)

        return () => {
            container.removeEventListener("scroll", handleScroll)
        }
    }, [sections])

    // Handle hash navigation on page load and hash changes
    useEffect(() => {
        const handleHashNavigation = () => {
            const hash = window.location.hash.replace("#", "")
            if (hash && sectionRefs.current[hash]) {
                // Small delay to ensure the page has rendered
                setTimeout(() => {
                    scrollToSection(hash)
                }, 100)
            }
        }

        // Handle initial hash on the mount
        handleHashNavigation()

        // Listen for hash changes
        window.addEventListener("hashchange", handleHashNavigation)

        return () => {
            window.removeEventListener("hashchange", handleHashNavigation)
        }
    }, [])

    // Scroll to section function
    const scrollToSection = (sectionId: string) => {
        const element = sectionRefs.current[sectionId]
        if (element && contentScrollRef.current) {
            const container = contentScrollRef.current
            const elementTop = element.offsetTop - 40 // Add 40 px offset to show the heading
            container.scrollTo({ top: Math.max(0, elementTop), behavior: "smooth" })
        }
    }

    const getCurrentSectionTitle = () => {
        if (activeSection === "header") return ""
        const currentSection = sections.find((section) => section.id === activeSection)
        return currentSection?.title || ""
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="fixed top-[80px] lg:top-[94px] left-0 right-0 z-30 h-[60px] lg:h-[80px] backdrop-blur-md border-b border-black/10 shadow-sm bg-primary-900/95">
                <Container className="h-full">
                    <div className="flex items-center px-6 h-full">
                        {/* Leading line */}
                        <div className="w-4 lg:w-8 h-px bg-white/56 mr-4"></div>

                        {/* Page and section title */}
                        <div className="flex items-center">
                            {/* Desktop layout - single line */}
                            <span className="hidden sm:block text-xs font-normal uppercase tracking-[0.08em] text-white/56">
                {title}
                                {/*{getCurrentSectionTitle() && (*/}
                                {/*  <>*/}
                                {/*    <span className="mx-2">/</span>*/}
                                {/*    {getCurrentSectionTitle()}*/}
                                {/*  </>*/}
                                {/*)}*/}
              </span>

                            {/* Mobile layout - two lines */}
                            <div className="block sm:hidden text-xs font-normal uppercase tracking-[0.08em] text-white/56 leading-tight">
                                <div>
                                    {title}
                                    {/*<span className="mx-2">/</span>*/}
                                </div>
                                {/*{getCurrentSectionTitle() && <div>{getCurrentSectionTitle()}</div>}*/}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Main content area */}
            <div className="pt-[140px] lg:pt-[174px] pb-[60px] min-h-screen">
                <Container className="h-full">
                    {/* Mobile Layout - Single scrollable column */}
                    <div className="lg:hidden">
                        <div ref={contentScrollRef} className="h-[calc(100vh-200px)] overflow-y-auto py-6">
                            {/* Navigation at the top for mobile */}
                            <div className="bg-white mb-6">
                                <LegalNavigation
                                    currentPage={currentPage}
                                    sections={sections}
                                    activeSection={activeSection}
                                    onSectionClickAction={scrollToSection}
                                />
                            </div>

                            {/* Content follows navigation */}
                            <div className="px-6">
                                {/* Header Section */}
                                <div
                                    ref={(el) => {
                                        sectionRefs.current["header"] = el
                                    }}
                                    className="pt-16"
                                >
                                    <h1 className="text-3xl font-bold text-neutral-900 -mt-8 mb-4">{title}</h1>
                                    <p className="text-sm text-neutral-900/56 mb-8">Last updated: {lastUpdated}</p>
                                </div>

                                {/* Content Sections */}
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        ref={(el) => {
                                            sectionRefs.current[section.id] = el
                                        }}
                                        className="text-sm text-neutral-900 py-6"
                                    >
                                        <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                                        <div className="prose prose-gray max-w-none leading-relaxed">{section.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout - Grid with fixed navigation (unchanged) */}
                    <div className="hidden lg:grid grid-cols-12 gap-0 min-h-[calc(100vh-254px)]">
                        {/* Left Column - Fixed Navigation (3/12) */}
                        <div className="col-span-3 bg-white sticky top-0 h-[calc(100vh-234px)]">
                            <div className="h-full">
                                <LegalNavigation
                                    currentPage={currentPage}
                                    sections={sections}
                                    activeSection={activeSection}
                                    onSectionClickAction={scrollToSection}
                                />
                            </div>
                        </div>

                        {/* Right Column - Scrollable Content (9/12) */}
                        <div className="col-span-9 bg-white">
                            <div ref={contentScrollRef} className="h-[calc(100vh-234px-60px)] overflow-y-auto px-8 mt-8">
                                {/* Header Section */}
                                <div
                                    ref={(el) => {
                                        sectionRefs.current["header"] = el
                                    }}
                                    className="pt-16"
                                >
                                    <h1 className="text-5xl font-bold text-neutral-900 -mt-8 mb-4">{title}</h1>
                                    <p className="text-sm text-neutral-900/56 mb-8">Last updated: {lastUpdated}</p>
                                </div>

                                {/* Content Sections */}
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        ref={(el) => {
                                            sectionRefs.current[section.id] = el
                                        }}
                                        className="text-sm text-neutral-900 py-6"
                                    >
                                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                                        <div className="prose prose-gray max-w-none leading-relaxed">{section.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
