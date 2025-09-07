// src/components/navigation/desktop/DesktopNavigationMenu.tsx
"use client"

import { useState, useRef } from "react"
import { navigationItems, type NavigationItem } from "../NavigationConstants"
import DesktopNavigationItem from "./DesktopNavigationItem"
import DesktopFlyoutMenu from "./DesktopFlyoutMenu"

interface DesktopNavigationMenuProps {
  className?: string
  theme?: "dark" | "light"
  currentPage?: string
}

export default function DesktopNavigationMenu({
                                                className = "",
                                                theme = "dark",
                                                currentPage
                                              }: DesktopNavigationMenuProps) {
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null)
  const [flyoutItemHovered, setFlyoutItemHovered] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Helper function to check if a navigation item is the current page
  const isCurrentPage = (item: NavigationItem): boolean => {
    if (!currentPage) return false

    // Direct match
    if (item.name.toLowerCase() === currentPage.toLowerCase()) return true

    // Check if the current page starts with the item path (for subpages)
    if (item.href && currentPage.toLowerCase().startsWith(item.href.toLowerCase().replace("/", ""))) {
      return true
    }

    // For items with submenus, check if any subitem matches
    if (item.submenuThemes) {
      for (const theme of item.submenuThemes) {
        if (theme.href && currentPage.toLowerCase().startsWith(theme.href.toLowerCase().replace("/", ""))) {
          return true
        }
        if (theme.subLinks) {
          for (const subLink of theme.subLinks) {
            if (subLink.href && currentPage.toLowerCase().startsWith(subLink.href.toLowerCase().replace("/", ""))) {
              return true
            }
          }
        }
      }
    }

    if (item.submenuItems) {
      for (const subItem of item.submenuItems) {
        if (subItem.href && currentPage.toLowerCase().startsWith(subItem.href.toLowerCase().replace("/", ""))) {
          return true
        }
      }
    }

    return false
  }

  const handleMouseEnter = (itemName: string) => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveFlyout(itemName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveFlyout(null)
      setFlyoutItemHovered(null)
    }, 150)
  }

  const handleFlyoutMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleFlyoutMouseLeave = () => {
    setActiveFlyout(null)
    setFlyoutItemHovered(null)
  }

  const handleFlyoutItemHover = (itemName: string) => (isHovered: boolean) => {
    setFlyoutItemHovered(isHovered ? itemName : null)
  }

  // New function to handle flyout link clicks
  const handleFlyoutLinkClick = () => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Close the flyout immediately
    setActiveFlyout(null)
    setFlyoutItemHovered(null)
  }

  return (
    <>
      {/* Desktop Navigation Items */}
      <div className={`flex justify-center ${className}`}>
        <div className="flex items-center space-x-8">
          {navigationItems.map((item) => (
            <DesktopNavigationItem
              key={item.name}
              item={item}
              isActive={activeFlyout === item.name}
              isFlyoutHovered={flyoutItemHovered === item.name}
              isCurrentPage={isCurrentPage(item)}
              theme={theme}
              onMouseEnterAction={handleMouseEnter(item.name)}
              onMouseLeaveAction={handleMouseLeave}
            />
          ))}
        </div>
      </div>

      {/* Desktop Flyout Menus */}
      {navigationItems
        .filter(item => item.hasSubmenu)
        .map((item) => (
          <DesktopFlyoutMenu
            key={`flyout-${item.name}`}
            isOpen={activeFlyout === item.name}
            items={item.submenuItems || []}
            themes={item.submenuThemes}
            theme={theme}
            onMouseEnterAction={handleFlyoutMouseEnter}
            onMouseLeaveAction={handleFlyoutMouseLeave}
            onItemHoverAction={handleFlyoutItemHover(item.name)}
            onLinkClickAction={handleFlyoutLinkClick}
          />
        ))}
    </>
  )
}