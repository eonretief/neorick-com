// src/components/navigation/desktop/DesktopFlyoutMenu.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import type { SubmenuItem, SubmenuTheme } from "../NavigationConstants"

interface DesktopFlyoutMenuProps {
  isOpen: boolean
  items: SubmenuItem[]
  themes?: SubmenuTheme[]
  theme?: "dark" | "light"
  onMouseEnterAction: () => void
  onMouseLeaveAction: () => void
  onItemHoverAction: (isHovered: boolean) => void
  onLinkClickAction?: () => void // New prop for handling link clicks
}

export default function DesktopFlyoutMenu({
                                            isOpen,
                                            items,
                                            themes,
                                            onMouseEnterAction,
                                            onMouseLeaveAction,
                                            onItemHoverAction,
                                            onLinkClickAction
                                          }: DesktopFlyoutMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true)
    }
  }, [isOpen, shouldRender])

  useEffect(() => {
    if (menuRef.current && contentRef.current) {
      if (isOpen) {
        // Set the initial "rolled up" state
        gsap.set(menuRef.current, {
          transformOrigin: "top center",
          scaleY: 0,
          rotationX: -90,
          opacity: 1,
          display: "block"
        })

        gsap.set(contentRef.current, {
          y: -30,
          opacity: 0
        })

        // Create the opening timeline
        const tl = gsap.timeline()

        tl.to(menuRef.current, {
          scaleY: 1,
          rotationX: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.8)"
        })
          .to(contentRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }, "-=0.3")

      } else if (shouldRender) {
        // Create closing timeline
        const tl = gsap.timeline({
          onComplete: () => {
            setShouldRender(false)
          }
        })

        tl.to(contentRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in"
        })
          .to(menuRef.current, {
            scaleY: 0,
            rotationX: -90,
            opacity: 1,
            duration: 0.4,
            ease: "back.in(1.7)",
            onComplete: () => {
              gsap.set(menuRef.current, { display: "none" })
            }
          }, "-=0.15")
      }
    }
  }, [isOpen, shouldRender])

  const handleMenuMouseEnter = () => {
    onMouseEnterAction()
    onItemHoverAction(true)
  }

  const handleMenuMouseLeave = () => {
    onMouseLeaveAction()
    onItemHoverAction(false)
  }

  const handleLinkClick = () => {
    // Close the flyout menu when any link is clicked
    onLinkClickAction?.()
  }

  if (!shouldRender) return null

  return (
    <div
      ref={menuRef}
      className="absolute left-0 top-[94px] w-full bg-primary-900 shadow-lg z-[9999] overflow-hidden"
      onMouseEnter={handleMenuMouseEnter}
      onMouseLeave={handleMenuMouseLeave}
      style={{
        transformOrigin: "top center",
        display: "none"
      }}
    >
      <div
        ref={contentRef}
        className="mx-auto w-full max-w-[98%] lg:max-w-9/12"
      >
        <div className="p-8 pt-16 pb-16">
          {/* Render themed content if available */}
          {themes && themes.length > 0 ? (
            <div className="flex justify-start gap-20 2xl:gap-56">
              {themes.map((theme, index) => (
                <div key={index} className="text-white">
                  {/* Theme heading */}
                  <Link
                    href={theme.href}
                    className="block mb-6 hover:text-primary-500 transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.04em] text-white">
                      {theme.title}
                    </h3>
                  </Link>

                  {/* Sub-links */}
                  <div className="space-y-6">
                    {theme.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subLink.href}
                        className="group block text-sm font-light text-white/56 hover:text-primary-500 transition-colors duration-200"
                        onClick={handleLinkClick}
                      >
                        <span className="relative inline-block">
                          {subLink.name}
                          <span className="absolute -bottom-0.5 left-0 h-px bg-primary-500 w-0 group-hover:w-full transition-all duration-200 ease-out"></span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : items.length > 0 ? (
            /* Fallback to the regular grid layout for simple items */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <div key={index} className="text-white">
                  <Link
                    href={item.href}
                    className="block p-4 hover:bg-primary-500 transition-colors duration-200 rounded"
                    onClick={handleLinkClick}
                  >
                    <h3 className="text-sm font-medium uppercase tracking-[0.1em]">
                      {item.name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-white text-center py-8">
              <p className="text-sm font-medium uppercase tracking-[0.1em] opacity-75">
                Content coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}