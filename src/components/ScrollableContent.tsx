// src/components/ScrollableContent.tsx
"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register GSAP plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin)
}

interface ScrollableSection {
    id: string
    content: React.ReactNode
    className?: string
}

interface ScrollableContentProps {
    sections: ScrollableSection[]
    className?: string
    snapDuration?: number
    snapEase?: string
    enableKeyboardNavigation?: boolean
    enableWheelSnap?: boolean
    snapThreshold?: number
    onSectionChange?: (sectionIndex: number, sectionId: string) => void
}

// Define the methods that will be exposed via ref
export interface ScrollableContentRef {
    goToSection: (index: number) => void
    goToSectionById: (sectionId: string) => void
    getCurrentSection: () => number
}

const ScrollableContent = forwardRef<ScrollableContentRef, ScrollableContentProps>(
    (
        {
            sections,
            className = "",
            snapDuration = 0.8,
            snapEase = "power2.inOut",
            enableKeyboardNavigation = true,
            enableWheelSnap = true,
            onSectionChange,
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const sectionsRef = useRef<HTMLDivElement[]>([])
        const [currentSection, setCurrentSection] = useState(0)
        const [isSnapping, setIsSnapping] = useState(false)
        const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
        const lastReportedSection = useRef(0)
        const [isTablet, setIsTablet] = useState(false)

        useEffect(() => {
            const checkScreenSize = () => {
                // Tablet is between 768px (md) and 1024px (lg)
                const isTabletSize = window.innerWidth >= 768 && window.innerWidth < 1024
                setIsTablet(isTabletSize)
            }

            checkScreenSize()
            window.addEventListener("resize", checkScreenSize)
            return () => window.removeEventListener("resize", checkScreenSize)
        }, [])

        // Initialize section refs
        useEffect(() => {
            sectionsRef.current = sectionsRef.current.slice(0, sections.length)
        }, [sections.length])

        // Helper function to detect which section is currently visible
        const detectCurrentSection = useCallback(() => {
            if (!containerRef.current || !sectionsRef.current.length) return

            const container = containerRef.current
            const scrollTop = container.scrollTop
            const containerHeight = container.clientHeight

            // Find the section that takes up the most viewport space
            let mostVisibleSection = 0
            let maxVisibleArea = 0

            sectionsRef.current.forEach((section, index) => {
                if (!section) return

                const rect = section.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()

                // Calculate visible area relative to container
                const visibleTop = Math.max(rect.top, containerRect.top)
                const visibleBottom = Math.min(rect.bottom, containerRect.bottom)
                const visibleArea = Math.max(0, visibleBottom - visibleTop)

                if (visibleArea > maxVisibleArea) {
                    maxVisibleArea = visibleArea
                    mostVisibleSection = index
                }
            })

            // Update the current section if it has changed
            if (mostVisibleSection !== lastReportedSection.current) {
                lastReportedSection.current = mostVisibleSection
                setCurrentSection(mostVisibleSection)
                onSectionChange?.(mostVisibleSection, sections[mostVisibleSection].id)

                // Update the URL hash to match the current section
                const newHash = sections[mostVisibleSection].id
                if (window.location.hash !== `#${newHash}`) {
                    const newUrl = `${window.location.pathname}#${newHash}`
                    window.history.replaceState({}, "", newUrl)
                }
            }
        }, [sections, onSectionChange])

        // Set up the scroll listener for real-time section detection
        useEffect(() => {
            const container = containerRef.current
            if (!container) return

            const handleScroll = () => {
                if (!isSnapping) {
                    detectCurrentSection()
                }
            }

            // Use throttled scroll detection
            let scrollTimeout: NodeJS.Timeout
            const throttledScroll = () => {
                if (scrollTimeout) clearTimeout(scrollTimeout)
                scrollTimeout = setTimeout(handleScroll, 50)
            }

            container.addEventListener("scroll", throttledScroll)

            // Initial detection
            setTimeout(detectCurrentSection, 100)

            return () => {
                container.removeEventListener("scroll", throttledScroll)
                if (scrollTimeout) clearTimeout(scrollTimeout)
            }
        }, [detectCurrentSection, isSnapping])

        // Handle hash navigation on mount and hash changes
        useEffect(() => {
            const handleHashChange = () => {
                const hash = window.location.hash.replace("#", "")

                if (hash) {
                    const sectionIndex = sections.findIndex((section) => section.id === hash)

                    if (sectionIndex !== -1) {
                        snapToSection(sectionIndex, false) // false = don't update URL again
                    }
                }
            }

            // Handle initial hash on the mount
            handleHashChange()

            // Listen for hash changes
            window.addEventListener("hashchange", handleHashChange)

            return () => {
                window.removeEventListener("hashchange", handleHashChange)
            }
        }, [sections])

        // Snap to the section function with optional URL update
        const snapToSection = useCallback(
            (index: number, updateUrl = true) => {
                if (!containerRef.current || !sectionsRef.current[index] || isSnapping || isTablet) return

                setIsSnapping(true)
                setCurrentSection(index)
                lastReportedSection.current = index

                // Update URL hash if requested
                if (updateUrl && sections[index]) {
                    const newUrl = `${window.location.pathname}#${sections[index].id}`
                    window.history.pushState({}, "", newUrl)
                }

                // Notify the parent component of the section change
                onSectionChange?.(index, sections[index].id)

                gsap.to(containerRef.current, {
                    scrollTo: { y: sectionsRef.current[index], offsetY: 0 },
                    duration: snapDuration,
                    ease: snapEase,
                    onComplete: () => {
                        setIsSnapping(false)
                        // Re-detect the section after animation to ensure accuracy
                        setTimeout(detectCurrentSection, 100)
                    },
                })
            },
            [snapDuration, snapEase, isSnapping, sections, onSectionChange, detectCurrentSection, isTablet],
        )

        // Public method to navigate to the section by ID
        const goToSectionById = useCallback(
            (sectionId: string) => {
                const sectionIndex = sections.findIndex((section) => section.id === sectionId)
                if (sectionIndex !== -1) {
                    snapToSection(sectionIndex)
                }
            },
            [sections, snapToSection],
        )

        // Public method to get the current section
        const getCurrentSection = useCallback(() => currentSection, [currentSection])

        // Expose methods via ref
        useImperativeHandle(
            ref,
            () => ({
                goToSection: (index: number) => {
                    if (index >= 0 && index < sections.length) {
                        snapToSection(index)
                    }
                },
                goToSectionById,
                getCurrentSection,
            }),
            [sections.length, snapToSection, goToSectionById, getCurrentSection],
        )

        // Listen for custom scrollToSection events
        useEffect(() => {
            const handleScrollToSection = (event: CustomEvent) => {
                const { sectionIndex } = event.detail
                if (sectionIndex >= 0 && sectionIndex < sections.length) {
                    snapToSection(sectionIndex)
                }
            }

            window.addEventListener("scrollToSection", handleScrollToSection as EventListener)
            return () => {
                window.removeEventListener("scrollToSection", handleScrollToSection as EventListener)
            }
        }, [snapToSection, sections.length])

        // Keyboard navigation
        useEffect(() => {
            if (!enableKeyboardNavigation || isTablet) return

            const handleKeyDown = (e: KeyboardEvent) => {
                if (isSnapping) return

                switch (e.key) {
                    case "ArrowDown":
                    case "PageDown":
                        e.preventDefault()
                        if (currentSection < sections.length - 1) {
                            snapToSection(currentSection + 1)
                        }
                        break
                    case "ArrowUp":
                    case "PageUp":
                        e.preventDefault()
                        if (currentSection > 0) {
                            snapToSection(currentSection - 1)
                        }
                        break
                    case "Home":
                        e.preventDefault()
                        snapToSection(0)
                        break
                    case "End":
                        e.preventDefault()
                        snapToSection(sections.length - 1)
                        break
                }
            }

            window.addEventListener("keydown", handleKeyDown)
            return () => window.removeEventListener("keydown", handleKeyDown)
        }, [currentSection, sections.length, snapToSection, enableKeyboardNavigation, isSnapping, isTablet])

        // Implement wheel-based snap scrolling
        useEffect(() => {
            if (!enableWheelSnap || !containerRef.current || isTablet) return

            const container = containerRef.current

            const handleWheel = (e: WheelEvent) => {
                if (isSnapping) {
                    e.preventDefault()
                    return
                }

                // Clear existing timeout
                if (wheelTimeoutRef.current) {
                    clearTimeout(wheelTimeoutRef.current)
                }

                // Set a timeout to detect when scrolling has stopped
                wheelTimeoutRef.current = setTimeout(() => {
                    if (!container || !sectionsRef.current.length) return

                    const scrollTop = container.scrollTop
                    const containerHeight = container.clientHeight

                    // Find the section that's most visible
                    let mostVisibleSection = 0
                    let maxVisibleArea = 0

                    sectionsRef.current.forEach((section, index) => {
                        if (!section) return

                        const sectionTop = section.offsetTop
                        const sectionHeight = section.clientHeight
                        const sectionBottom = sectionTop + sectionHeight

                        // Calculate the visible area of this section
                        const visibleTop = Math.max(scrollTop, sectionTop)
                        const visibleBottom = Math.min(scrollTop + containerHeight, sectionBottom)
                        const visibleArea = Math.max(0, visibleBottom - visibleTop)

                        if (visibleArea > maxVisibleArea) {
                            maxVisibleArea = visibleArea
                            mostVisibleSection = index
                        }
                    })

                    // Only snap if we're not already at the target section
                    if (mostVisibleSection !== currentSection) {
                        snapToSection(mostVisibleSection)
                    }
                }, 150) // Wait for 150 ms after wheel stops
            }

            container.addEventListener("wheel", handleWheel, { passive: false })
            return () => {
                container.removeEventListener("wheel", handleWheel)
                if (wheelTimeoutRef.current) {
                    clearTimeout(wheelTimeoutRef.current)
                }
            }
        }, [currentSection, snapToSection, enableWheelSnap, isSnapping, isTablet])

        return (
            <div
                ref={containerRef}
                data-scroll-container
                className={`overflow-y-auto scroll-smooth mt-[80px] lg:mt-[94px] h-[calc(100svh-80px-60px)] md:h-auto lg:h-[calc(100svh-94px)] ${className}`}
            >
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        id={section.id}
                        ref={(el) => {
                            if (el) sectionsRef.current[index] = el
                        }}
                        className={`min-h-[calc(100svh-80px-60px)] md:min-h-fit md:py-8 md:mb-8 lg:h-[calc(100svh-94px)] lg:py-0 lg:mb-0 flex flex-col ${section.className || ""}`}
                        data-section-index={index}
                        data-section-id={section.id}
                    >
                        <div className="flex-1 flex flex-col">{section.content}</div>
                    </div>
                ))}
            </div>
        )
    },
)

ScrollableContent.displayName = "ScrollableContent"

export default ScrollableContent
