"use client"

import {useEffect, useState} from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ContactModal from "@/components/ContactModal"
import {track} from "@vercel/analytics"

export default function Home() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    useEffect(() => {
        track("Page View", {
            page: "home",
            pageTitle: "Home",
        })
    }, [])

    const handleContactClick = () => {
        track("Contact Modal Opened")
        setIsContactModalOpen(true)
    }

    const handleContactModalClose = () => {
        setIsContactModalOpen(false)
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
                <source src="/assets/videos/background.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-[#1B263B] opacity-50 z-10"/>

            <Header/>

            <div className="absolute top-[25%] w-full z-20 flex flex-col items-center text-center px-4">
                <h1
                    className="text-4xl md:text-5xl lg:text-7xl font-medium font-raleway text-white"
                    style={{fontFamily: "Raleway, sans-serif"}}
                >
                    Less friction. <br className="sm:hidden"/>
                    <span className="text-[#29A3DD]">More flow.</span>
                </h1>
                <p className="mt-4 text-xs sm:text-sm md:text-base lg:text-md text-white font-sans font-light max-w-4xl pt-4">
                    A world reimagined without complexity or clutter, turning obstacles into opportunity.
                </p>

                <div className="sm:hidden mt-8 pt-48">
                    <button
                        onClick={handleContactClick}
                        className="text-white text-sm font-bold tracking-[0.1em] uppercase border border-[#29A3DD] rounded-[6px] py-3 px-4 hover:bg-[#29A3DD] hover:text-white transition"
                    >
                        Contact Us
                    </button>
                </div>
            </div>

            <Footer className="absolute bottom-0 left-0 w-full z-20"/>

            {/* Contact Modal */}
            <ContactModal
                isOpen={isContactModalOpen}
                onCloseAction={handleContactModalClose}
            />
        </div>
    )
}