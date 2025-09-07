// src/components/navigation/mobile/MobileNavigationMenu.tsx
"use client"

import { useState } from "react"
import HamburgerButton from "./HamburgerButton"
import MobileMenu from "./MobileMenu"
import ContactModal from "../../ContactModal"
import { mobileNavigationItems } from "../NavigationConstants"

interface MobileNavigationMenuProps {
    className?: string
    theme?: "dark" | "light"
    currentPage?: string
}

export default function MobileNavigationMenu({
                                                 className = "",
                                                 theme = "dark",
                                                 currentPage,
                                             }: MobileNavigationMenuProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false)
    }

    const handleContactClick = () => {
        setIsContactModalOpen(true)
    }

    const handleContactModalClose = () => {
        setIsContactModalOpen(false)
    }

    return (
        <>
            <div className={`${className} relative z-[10200]`}>
                <HamburgerButton isOpen={isMobileMenuOpen} onClickAction={handleMobileMenuToggle} theme={theme} />
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onCloseAction={handleMobileMenuClose}
                navigationItems={mobileNavigationItems}
                theme={theme}
                currentPage={currentPage}
                onContactClick={handleContactClick}
            />

            {/* Contact Modal */}
            <ContactModal isOpen={isContactModalOpen} onCloseAction={handleContactModalClose} />
        </>
    )
}
