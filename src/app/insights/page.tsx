"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

import {track} from "@vercel/analytics"

export default function Home() {
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <Header theme="light" currentPage="insights"/>

            <Footer className="absolute bottom-0 left-0 w-full z-20" theme="light" bgColor="bg-[#f8f9fa]"/>
        </div>
    )
}
