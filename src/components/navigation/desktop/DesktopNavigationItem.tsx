// src/components/navigation/desktop/DesktopNavigationItem.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import type { NavigationItem } from "../NavigationConstants"

interface DesktopNavigationItemProps {
    item: NavigationItem
    isActive: boolean
    isFlyoutHovered: boolean
    isCurrentPage: boolean
    theme?: "dark" | "light"
    onMouseEnterAction: () => void
    onMouseLeaveAction: () => void
}

export default function DesktopNavigationItem({
                                                  item,
                                                  isActive,
                                                  isFlyoutHovered,
                                                  isCurrentPage,
                                                  theme = "dark",
                                                  onMouseEnterAction,
                                                  onMouseLeaveAction
                                              }: DesktopNavigationItemProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Determine if the item should be highlighted
    const isHighlighted = isActive || isFlyoutHovered || isCurrentPage || isHovered

    // Theme-based colors
    const baseTextColor = theme === "light" ? "text-[#252525]" : "text-white"
    const hoverTextColor = "hover:text-primary-500"

    // Check if the item should be clickable (has href and no submenu, or has href and submenu)
    const isClickable = item.href && item.href.trim() !== ""

    // Base styles for the content
    const contentStyles = `
        flex items-center text-sm font-normal tracking-[0.08em] uppercase transition-all duration-200
        ${isHighlighted
        ? "text-primary-500"
        : `${baseTextColor} ${hoverTextColor}`
    }
        ${item.hasSubmenu && !isClickable ? "cursor-default" : ""}
    `

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (item.hasSubmenu) {
            onMouseEnterAction()
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        onMouseLeaveAction()
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isClickable ? (
                // Render as Next.js Link
                <Link
                    href={item.href}
                    className={contentStyles}
                >
                    <span className="relative">
                        {item.name}
                        {/* Animated underline - only under the text */}
                        <span
                            className={`
                                absolute -bottom-1.5 left-0 h-0.5 bg-primary-500 transition-all duration-200 ease-out
                                ${isHighlighted ? "w-full" : "w-0"}
                            `}
                        />
                    </span>
                    {item.hasSubmenu && (
                        <ChevronDownIcon
                            className={`
                                ml-1 h-4 w-4 transition-all duration-200
                                ${isHighlighted ? "text-primary-500" : ""}
                            `}
                            style={{
                                transform: isActive ? "rotate(180deg)" : "rotate(0deg)"
                            }}
                        />
                    )}
                </Link>
            ) : (
                // Render as the non-clickable span for submenu items
                <span className={contentStyles}>
                    <span className="relative">
                        {item.name}
                        {/* Animated underline - only under the text */}
                        <span
                            className={`
                                absolute -bottom-1.5 left-0 h-0.5 bg-primary-500 transition-all duration-200 ease-out
                                ${isHighlighted ? "w-full" : "w-0"}
                            `}
                        />
                    </span>
                    {item.hasSubmenu && (
                        <ChevronDownIcon
                            className={`
                                ml-1 h-4 w-4 transition-all duration-200
                                ${isHighlighted ? "text-primary-500" : ""}
                            `}
                            style={{
                                transform: isActive ? "rotate(180deg)" : "rotate(0deg)"
                            }}
                        />
                    )}
                </span>
            )}
        </div>
    )
}