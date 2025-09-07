"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import gsap from "gsap"

interface LegalSection {
    id: string
    title: string
    content: React.ReactNode
}

interface LegalNavigationProps {
    currentPage: "privacy-policy" | "terms-of-use" | "cookie-policy"
    sections: LegalSection[]
    activeSection: string
    onSectionClickAction: (sectionId: string) => void
}

const legalMenuStructure = [
    {
        id: "privacy",
        title: "Privacy",
        items: [
            { id: "privacy-policy", title: "Privacy Policy", href: "/privacy-policy" },
            { id: "cookie-policy", title: "Cookie Policy", href: "/cookie-policy" },
            { id: "paia-manual", title: "PAIA Manual", href: "/legal/paia-manual-2025-09-05.pdf", isPdf: true },
        ],
    },
    {
        id: "terms",
        title: "Terms",
        items: [{ id: "terms-of-use", title: "Terms of Use", href: "/terms-of-use" }],
    },
]

export default function LegalNavigation({
                                            currentPage,
                                            sections,
                                            activeSection,
                                            onSectionClickAction,
                                        }: LegalNavigationProps) {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
        new Set([
            // Auto-expand the group that contains the current page
            legalMenuStructure.find((group) => group.items.some((item) => item.id === currentPage))?.id || "",
        ]),
    )
    const subsectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const chevronRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const isAnimating = useRef<{ [key: string]: boolean }>({})

    const toggleGroupExpansion = (groupId: string) => {
        // Prevent multiple animations on the same group
        if (isAnimating.current[groupId]) return

        const isCurrentlyExpanded = expandedGroups.has(groupId)

        // If opening a section, close all others first
        if (!isCurrentlyExpanded) {
            // Get all currently expanded groups except the current group
            const otherExpandedGroups = Array.from(expandedGroups).filter((id) => id !== groupId)

            // Close all other expanded groups
            otherExpandedGroups.forEach((otherGroupId) => {
                if (isAnimating.current[otherGroupId]) return

                isAnimating.current[otherGroupId] = true
                const otherSubsectionElement = subsectionRefs.current[otherGroupId]
                const otherChevronElement = chevronRefs.current[otherGroupId]

                if (otherSubsectionElement) {
                    gsap.to(otherSubsectionElement, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            isAnimating.current[otherGroupId] = false
                        },
                    })
                }

                if (otherChevronElement) {
                    gsap.to(otherChevronElement, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                    })
                }
            })

            // Update state to close all other groups
            setExpandedGroups(new Set([groupId]))
        }
        const subsectionElement = subsectionRefs.current[groupId]
        const chevronElement = chevronRefs.current[groupId]

        isAnimating.current[groupId] = true

        if (isCurrentlyExpanded) {
            // Animate collapse
            if (subsectionElement) {
                gsap.to(subsectionElement, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setExpandedGroups(new Set())
                        isAnimating.current[groupId] = false
                    },
                })
            }

            // Animate chevron rotation
            if (chevronElement) {
                gsap.to(chevronElement, {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                })
            }
        } else {
            // State was already updated above when closing others

            // Animate expansion (will happen after state update)
            if (subsectionElement) {
                // Set initial state
                gsap.set(subsectionElement, { height: 0, opacity: 0 })

                // Animate to auto height
                gsap.to(subsectionElement, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => {
                        isAnimating.current[groupId] = false

                        // Animate in the subsection items with stagger
                        const items = subsectionElement.querySelectorAll("button, a")
                        if (items.length > 0) {
                            gsap.fromTo(
                                items,
                                {
                                    y: -10,
                                    opacity: 0,
                                },
                                {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.3,
                                    stagger: 0.05,
                                    ease: "power2.out",
                                },
                            )
                        }
                    },
                })
            }

            // Animate chevron rotation
            if (chevronElement) {
                gsap.to(chevronElement, {
                    rotation: 90,
                    duration: 0.3,
                    ease: "power2.inOut",
                })
            }
        }
    }

    // Initialize chevron rotations on mount
    useEffect(() => {
        legalMenuStructure.forEach((group) => {
            const chevronElement = chevronRefs.current[group.id]
            if (chevronElement) {
                gsap.set(chevronElement, {
                    rotation: expandedGroups.has(group.id) ? 90 : 0,
                })
            }
        })
    }, []) // Only run once on mount

    return (
        <nav className="p-6 h-full">
            <h3 className="text-sm font-semibold text-[#252525] uppercase tracking-[0.08em] mb-6">Legal Information</h3>

            <div className="space-y-1">
                {legalMenuStructure.map((group) => (
                    <div key={group.id}>
                        {/* Group header with dropdown toggle */}
                        <button
                            onClick={() => toggleGroupExpansion(group.id)}
                            className="flex items-center w-full px-3 py-2 text-sm font-medium text-[#252525] rounded transition-colors hover:text-primary-500 hover:bg-primary-50/50 cursor-pointer"
                            aria-label={`Toggle ${group.title} sections`}
                        >
                            <div className="flex-1 text-left">{group.title}</div>

                            {/* Chevron icon */}
                            <div
                                ref={(el) => {
                                    chevronRefs.current[group.id] = el
                                }}
                                className="transform-gpu ml-1"
                            >
                                <ChevronRightIcon className="h-4 w-4 text-[#252525]/50" />
                            </div>
                        </button>

                        {/* Sub-items for the group */}
                        {expandedGroups.has(group.id) && (
                            <div
                                ref={(el) => {
                                    subsectionRefs.current[group.id] = el
                                }}
                                className="ml-4 mt-2 space-y-1 overflow-hidden"
                            >
                                {group.items.map((item) =>
                                    item.isPdf ? (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full text-left px-3 py-2 text-sm rounded transition-colors text-[#252525]/70 hover:text-primary-500 hover:bg-primary-50/50"
                                        >
                                            {item.title}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                                                currentPage === item.id
                                                    ? "bg-primary-50 text-primary-500 font-medium"
                                                    : "text-[#252525]/70 hover:text-primary-500 hover:bg-primary-50/50"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ),
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    )
}
