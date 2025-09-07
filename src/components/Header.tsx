// src/components/Header.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { track } from "@vercel/analytics"
import Button from "./ui/Button"
import DesktopNavigationMenu from "./navigation/desktop/DesktopNavigationMenu"
import MobileNavigationMenu from "./navigation/mobile/MobileNavigationMenu"
import ContactModal from "./ContactModal"
import Container from "./ui/Container"

interface HeaderProps {
    theme?: "dark" | "light"
    currentPage?: string
}

export default function Header({ theme = "dark", currentPage }: HeaderProps) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const handleContactClick = () => {
        track("Contact Modal Opened")
        setIsContactModalOpen(true)
    }

    const handleContactModalClose = () => {
        setIsContactModalOpen(false)
    }

    return (
        <>
            <header className="absolute top-0 left-0 w-full z-[9998] h-[80px] md:h-[86px] lg:h-[90px] xl:h-[94px]">
                <Container>
                    <nav aria-label="Global" className="grid grid-cols-3 xl:grid-cols-3 items-center p-6 h-full">
                        {/* Logo */}
                        <div className="flex justify-start">
                            <div className="w-52">
                                <Link href="/">
                                    <Image src="/assets/logos/logo-dark.svg" alt="Company Logo" width={197} height={48} priority />
                                </Link>
                            </div>
                        </div>

                        {/* Desktop nav */}
                        <div className="hidden xl:block">
                            <DesktopNavigationMenu theme={theme} currentPage={currentPage} />
                        </div>

                        {/* Mobile nav spacer */}
                        <div className="xl:hidden" />

                        {/* Right */}
                        <div className="flex justify-end items-center">
                            <div className="hidden xl:block">
                                <Button variant="outline" size="md" onClick={handleContactClick} theme={theme}>
                                    Contact Us
                                </Button>
                            </div>
                            {/* Mobile hamburger button */}
                            <div className="xl:hidden">
                                <MobileNavigationMenu theme={theme} currentPage={currentPage} />
                            </div>
                        </div>
                    </nav>
                </Container>
            </header>

            {/* Contact Modal */}
            <ContactModal isOpen={isContactModalOpen} onCloseAction={handleContactModalClose} />
        </>
    )
}
