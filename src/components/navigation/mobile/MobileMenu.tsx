// src/components/navigation/mobile/MobileMenu.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid"
import { track } from "@vercel/analytics"
import gsap from "gsap"
import type { NavigationItem, SubmenuTheme } from "../NavigationConstants"

interface MobileMenuProps {
    isOpen: boolean
    onCloseAction: () => void
    navigationItems: NavigationItem[]
    theme?: "dark" | "light"
    currentPage?: string
    onContactClick?: () => void
}

interface MenuLevel {
    type: "main" | "submenu" | "theme"
    title?: string
    items: any[]
    parentItem?: NavigationItem | SubmenuTheme
}

export default function MobileMenu({
                                       isOpen,
                                       onCloseAction,
                                       navigationItems,
                                       theme = "dark",
                                       currentPage,
                                       onContactClick,
                                   }: MobileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const [menuStack, setMenuStack] = useState<MenuLevel[]>([{ type: "main", items: navigationItems }])
    const currentLevel = menuStack[menuStack.length - 1]

    // Theme-based colors
    const bgColor = theme === "light" ? "bg-white" : "bg-primary-900"
    const textColor = theme === "light" ? "text-[#252525]" : "text-white"
    const hoverBgColor = theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/10"
    const hoverTextColor = "hover:text-primary-500"
    const iconColor = theme === "light" ? "text-[#252525]/50" : "text-white/50"
    const borderColor = theme === "light" ? "border-[#252525]/10" : "border-white/10"

    // Helper function to check if a navigation item is the current page
    const isCurrentPage = (item: any): boolean => {
        if (!currentPage) return false

        // Direct match
        if (item.name?.toLowerCase() === currentPage.toLowerCase()) return true
        if (item.title?.toLowerCase() === currentPage.toLowerCase()) return true

        // Check if the current page starts with the item path (for subpages)
        return (
            item.href &&
            item.href.trim() !== "" &&
            currentPage.toLowerCase().startsWith(item.href.toLowerCase().replace("/", ""))
        )
    }

    // Helper function to check if the item is clickable
    const isClickable = (item: any): boolean => {
        return item.href && item.href.trim() !== ""
    }

    useEffect(() => {
        if (!menuRef.current || !panelRef.current) return

        if (isOpen) {
            // Show the menu
            menuRef.current.style.display = "flex"

            // Initial states
            gsap.set(menuRef.current, { y: "-100%", scaleY: 0, transformOrigin: "top center" })
            gsap.set(panelRef.current, { opacity: 0, y: -30 })

            // Animate in
            const tl = gsap.timeline()
            tl.to(menuRef.current, { y: "0%", scaleY: 1, duration: 0.5, ease: "power3.out" }).to(
                panelRef.current,
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
                "-=0.2",
            )
        } else {
            // Animate out
            const tl = gsap.timeline({
                onComplete: () => {
                    if (menuRef.current) menuRef.current.style.display = "none"
                    setMenuStack([{ type: "main", items: navigationItems }])
                },
            })
            tl.to(panelRef.current, { opacity: 0, y: -30, duration: 0.2, ease: "power2.in" }).to(
                menuRef.current,
                { y: "-100%", scaleY: 0, duration: 0.4, ease: "power3.in" },
                "-=0.1",
            )
        }
    }, [isOpen, navigationItems])

    // Slide helpers
    const slideForward = (nextLevel: MenuLevel) => {
        if (!panelRef.current) return
        gsap.to(panelRef.current, {
            x: -20,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                setMenuStack((prev) => [...prev, nextLevel])
                if (!panelRef.current) return
                gsap.fromTo(
                    panelRef.current,
                    { x: 20, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                )
            },
        })
    }

    const slideBack = () => {
        if (menuStack.length <= 1 || !panelRef.current) return
        gsap.to(panelRef.current, {
            x: 20,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                setMenuStack((prev) => prev.slice(0, -1))
                if (!panelRef.current) return
                gsap.fromTo(
                    panelRef.current,
                    { x: -20, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                )
            },
        })
    }

    const navigateToSubmenu = (item: NavigationItem) => {
        if (!item.hasSubmenu) return
        slideForward({
            type: "submenu",
            title: item.name,
            items: item.submenuThemes || item.submenuItems || [],
            parentItem: item,
        })
    }

    const navigateToTheme = (theme: SubmenuTheme) => {
        slideForward({ type: "theme", title: theme.title, items: theme.subLinks, parentItem: theme })
    }

    const navigateBack = () => slideBack()

    const handleLinkClick = () => {
        onCloseAction()
    }

    const handleItemClick = (item: NavigationItem) => {
        if (item.hasSubmenu) {
            navigateToSubmenu(item)
        } else if (isClickable(item)) {
            onCloseAction() // Close the menu when navigating
        }
        // If not clickable and no submenu, do nothing
    }

    const handleContactClick = () => {
        track("Contact Modal Opened")
        onCloseAction() // Close mobile menu first
        onContactClick?.() // Then open contact modal
    }

    return (
        <div
            ref={menuRef}
            className={`fixed inset-0 ${bgColor} z-[10100] flex-col`} // sits above floating bar
            style={{ display: "none" }}
        >
            {/* Static header (not transformed) */}
            <div className="flex items-center justify-between p-2 min-h-[80px] relative z-20">
                <div className="flex items-center flex-1 ml-4">
                    {currentLevel.type !== "main" && (
                        <button
                            onClick={navigateBack}
                            className={`flex items-center justify-center w-8 h-8 ${textColor} ${hoverTextColor} transition-colors cursor-pointer`}
                            aria-label="Go back"
                        >
                            <ChevronLeftIcon className="h-6 w-6 pointer-events-none" />
                        </button>
                    )}
                </div>
                {currentLevel.type === "main" && <div className="flex-1" />}
                {/* Removed the separate close button from the menu header */}
                <div className="flex items-center justify-end flex-1">
                    <div className="w-8 h-8" />
                </div>
            </div>

            {/* Sliding panel (the only element being translated/faded) */}
            <div ref={panelRef} className="h-[calc(100%-80px)] flex flex-col relative z-10">
                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {currentLevel.type === "main" && (
                            <div className="space-y-4">
                                {navigationItems.map((item, index) => {
                                    const isActive = isCurrentPage(item)
                                    const clickable = isClickable(item)

                                    if (clickable && !item.hasSubmenu) {
                                        return (
                                            <div key={index}>
                                                <Link
                                                    href={item.href}
                                                    onClick={handleLinkClick}
                                                    className={`w-full flex items-center justify-between p-2 text-left ${isActive ? "text-primary-500" : textColor} ${hoverBgColor} rounded-lg transition-colors group`}
                                                >
                          <span
                              className={`text-sm font-normal uppercase tracking-[0.08em] ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                          >
                            {item.name}
                          </span>
                                                </Link>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div key={index}>
                                            <button
                                                onClick={() => handleItemClick(item)}
                                                className={`w-full flex items-center justify-between p-2 text-left ${isActive ? "text-primary-500" : textColor} ${hoverBgColor} rounded-lg transition-colors group ${!clickable && !item.hasSubmenu ? "cursor-default" : ""}`}
                                                disabled={!clickable && !item.hasSubmenu}
                                            >
                        <span
                            className={`text-sm font-normal uppercase tracking-[0.08em] ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                        >
                          {item.name}
                        </span>
                                                {item.hasSubmenu && (
                                                    <ChevronRightIcon
                                                        className={`h-6 w-6 ${isActive ? "text-primary-500" : iconColor} ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {currentLevel.type === "submenu" && (
                            <div className="space-y-4">
                                {currentLevel.items.map((item: any, index: number) => {
                                    const isActive = isCurrentPage(item)
                                    if (item.subLinks && item.subLinks.length > 0) {
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => navigateToTheme(item)}
                                                className={`w-full flex items-center justify-between p-2 text-left ${isActive ? "text-primary-500" : textColor} ${hoverBgColor} rounded-lg transition-colors group`}
                                            >
                        <span
                            className={`text-sm font-normal uppercase tracking-[0.04em] ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                        >
                          {item.title}
                        </span>
                                                <ChevronRightIcon
                                                    className={`h-6 w-6 ${isActive ? "text-primary-500" : iconColor} ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                                                />
                                            </button>
                                        )
                                    } else {
                                        return (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                className={`w-full block p-2 text-left ${isActive ? "text-primary-500" : textColor} ${hoverBgColor} rounded-lg transition-colors group`}
                                            >
                        <span
                            className={`text-sm font-normal uppercase tracking-[0.05em] ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                        >
                          {item.name}
                        </span>
                                            </Link>
                                        )
                                    }
                                })}
                            </div>
                        )}

                        {currentLevel.type === "theme" && (
                            <div className="space-y-4">
                                {currentLevel.items.map((item: any, index: number) => {
                                    const isActive = isCurrentPage(item)
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={handleLinkClick}
                                            className={`w-full block p-2 text-left ${isActive ? "text-primary-500" : theme === "light" ? "text-[#252525]/56" : "text-white/56"} ${hoverBgColor} rounded-lg transition-colors group`}
                                        >
                      <span
                          className={`text-sm font-light tracking-[0.04em] ${isActive ? "" : `group-${hoverTextColor.replace("hover:", "")}`} transition-colors`}
                      >
                        {item.name}
                      </span>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-6 border-t ${borderColor}`}>
                    <button
                        onClick={handleContactClick}
                        className="w-full block bg-primary-500 text-white py-4 px-6 rounded-lg font-bold text-base uppercase tracking-[0.08em] hover:bg-primary-500/90 transition-colors text-center"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    )
}
