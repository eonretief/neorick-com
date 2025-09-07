"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "./ui/Container"

interface ScrollProgressBarProps {
    sections: Array<{ id: string; title?: string; content: React.ReactNode; className?: string }>
    pageTitle: string
    theme?: "dark" | "light"
    showProgressIndicator?: boolean
    className?: string
    currentSectionIndex?: number
    currentSectionId?: string
}

export default function ScrollProgressBar({
                                              sections,
                                              pageTitle,
                                              // theme = "light",
                                              showProgressIndicator = false,
                                              className = "",
                                              currentSectionIndex = 0,
                                              // currentSectionId = ""
                                          }: ScrollProgressBarProps) {
    const progressBarRef = useRef<HTMLDivElement>(null)
    const progressFillRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    // Theme-based styling
    const bgColor = "bg-primary-900/95"
    const textColor = "text-white/56"
    const progressColor = "bg-primary-500"

    useEffect(() => {
        const handleScroll = () => {
            const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
            if (!scrollContainer) return

            const scrollTop = scrollContainer.scrollTop
            const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
            const progress = Math.min(scrollTop / scrollHeight, 1)

            setScrollProgress(progress)

            // Show progress bar after minimal scroll or when not on the first section
            const shouldShow = scrollTop > 50 || currentSectionIndex > 0
            if (shouldShow !== isVisible) {
                setIsVisible(shouldShow)
            }
        }

        // Initial setup
        const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll)
            handleScroll() // Initial call
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll)
            }
        }
    }, [sections.length, isVisible, currentSectionIndex])

    // Show the progress bar immediately if not on the first section (hash navigation)
    useEffect(() => {
        if (currentSectionIndex > 0 && !isVisible) {
            setIsVisible(true)
        }
    }, [currentSectionIndex, isVisible])

    // Animate visibility
    useEffect(() => {
        if (!progressBarRef.current) return

        const tl = gsap.timeline()

        if (isVisible) {
            tl.to(progressBarRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
            })
        } else {
            tl.to(progressBarRef.current, {
                y: -60,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            })
        }

        return () => {
            tl.kill()
        }
    }, [isVisible])

    // Animate progress fill
    useEffect(() => {
        if (!progressFillRef.current || !showProgressIndicator) return

        gsap.to(progressFillRef.current, {
            scaleX: scrollProgress,
            duration: 0.1,
            ease: "none",
        })
    }, [scrollProgress, showProgressIndicator])

    // Get current section info
    const currentSection = sections[currentSectionIndex] || sections[0]
    const currentSectionTitle = currentSection?.title || ""

    const scrollToSection = (sectionIndex: number) => {
        // Dispatch a custom event that the ScrollableContent can listen to
        const event = new CustomEvent("scrollToSection", {
            detail: { sectionIndex },
        })
        window.dispatchEvent(event)
    }

    return (
        <div
            ref={progressBarRef}
            className={`fixed top-[80px] lg:top-[94px] left-0 right-0 z-30 h-[60px] lg:h-[80px] backdrop-blur-md border-b border-black/10 shadow-sm ${bgColor} ${className}`}
            style={{
                transform: "translateY(-60px)",
                opacity: 0,
            }}
        >
            {/* Progress fill background */}
            {showProgressIndicator && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                    <div
                        ref={progressFillRef}
                        className={`h-full ${progressColor} origin-left`}
                        style={{ transform: "scaleX(0)" }}
                    />
                </div>
            )}

            {/* Content */}
            <Container className="h-full">
                <div className="flex items-center px-6 h-full">
                    {/* Leading line */}
                    <div className="w-4 lg:w-8 h-px bg-white/56 mr-4"></div>

                    {/* Page and section title */}
                    <div className="flex items-center">
                        {/* Desktop layout - single line */}
                        <span className={`hidden sm:block text-xs font-normal uppercase tracking-[0.08em] ${textColor}`}>
              {pageTitle}
                            {currentSectionTitle && (
                                <>
                                    <span className="mx-2">/</span>
                                    {currentSectionTitle}
                                </>
                            )}
            </span>

                        {/* Mobile layout - two lines */}
                        <div
                            className={`block sm:hidden text-xs font-normal uppercase tracking-[0.08em] ${textColor} leading-tight`}
                        >
                            <div>
                                {pageTitle}
                                <span className="mx-2">/</span>
                            </div>
                            {currentSectionTitle && <div>{currentSectionTitle}</div>}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
