import HeroSection from "@/components/HeroSection"
import AboutUsOurJourney from "./AboutUsOurJourney"
import React from "react"
import AboutUsOurApproach from "@/app/about-us/components/AboutUsOurApproach"
import AboutUsOurPrincipals from "@/app/about-us/components/AboutUsOurPrincipals"
import AboutUsCallToAction from "@/app/about-us/components/AboutUsCallToAction"

export interface AboutUsSectionsConfig {
    id: string
    title?: string
    content: React.ReactNode
    className?: string
}

export const aboutUsSections: AboutUsSectionsConfig[] = [
    {
        id: "our-journey",
        title: "Our Journey",
        content: (
            <div className="min-h-full flex flex-col lg:h-full lg:justify-center">
                <div className="flex-shrink-0">
                    <HeroSection
                        backgroundImage="/assets/images/1438634588.jpg"
                        subtitle="About Us"
                        title={{
                            normal: "Committed to ",
                            highlight: "Excellence"
                        }}
                        description="Since 1975, Neorick has grown from a bold one-person vision into a global technology and data partner trusted across industries and continents."
                        statement="Guided by our commitment to solve the hardest problems with clarity and innovation, we continue to blend strategy, science, and scalable solutions to help organisations navigate complexity, embrace transformation, and lead with confidence in a rapidly evolving digital world."
                        className=""
                    />
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0 lg:mt-[-60px]">
                    <AboutUsOurJourney />
                </div>
            </div>
        )
    },
    {
        id: "our-approach",
        title: "Our Approach",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <AboutUsOurApproach />
                </div>
            </div>
        )
    },
    {
        id: "our-principals",
        title: "Our Principals",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <AboutUsOurPrincipals />
                </div>
            </div>
        )
    },
    {
        id: "call-to-action",
        title: "Get in Touch",
        content: (
            <div className="h-full bg-primary-900 flex items-center justify-center overflow-hidden">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <AboutUsCallToAction />
                </div>
            </div>
        )
    }
]