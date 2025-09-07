import HeroSection from "@/components/HeroSection"
import type React from "react"
import DataFoundationsOverview from "./DataFoundationsOverview"
import DataFoundationsDataStrategy from "./DataFoundationsDataStrategy"
import DataFoundationsDataGovernance from "./DataFoundationsDataGovernance"
import DataFoundationsDataArchitecture from "./DataFoundationsDataArchitecture"
import DataFoundationsDataEngineering from "./DataFoundationsDataEngineering"
import DataFoundationsDataProducts from "./DataFoundationsDataProducts"
import DataFoundationsCallToAction from "./DataFoundationsCallToAction"

export interface DataFoundationsSectionsConfig {
    id: string
    title?: string
    content: React.ReactNode
    className?: string
}

export const dataFoundationsSections: DataFoundationsSectionsConfig[] = [
    {
        id: "overview",
        title: "Overview",
        content: (
            <div className="min-h-full flex flex-col lg:h-full lg:justify-center">
                <div className="flex-shrink-0">
                    <HeroSection
                        backgroundImage="/assets/images/1438634588.jpg"
                        subtitle="Data & Digital Foundations"
                        title={{
                            normal: "Building Foundations that ",
                            highlight: "Last",
                        }}
                        description="At Neorick, we create data systems that cut through noise, turning information into clear, actionable tools for your team's everyday work."
                        statement="Our approach strips away unnecessary layers, focusing on what truly matters: secure, accessible data that evolves with your needs and drives measurable improvements in efficiency and insight."
                        className=""
                    />
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0 lg:mt-[-60px]">
                    <DataFoundationsOverview />
                </div>
            </div>
        ),
    },
    {
        id: "data-strategy",
        title: "Data Strategy",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <DataFoundationsDataStrategy />
                </div>
            </div>
        ),
    },
    {
        id: "data-governance",
        title: "Data Governance",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <DataFoundationsDataGovernance />
                </div>
            </div>
        ),
    },
    {
        id: "data-architecture",
        title: "Platforms & Architecture",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <DataFoundationsDataArchitecture />
                </div>
            </div>
        ),
    },
    {
        id: "data-engineering",
        title: "Data Engineering",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <DataFoundationsDataEngineering />
                </div>
            </div>
        ),
    },
    {
        id: "data-products",
        title: "Data Products",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <DataFoundationsDataProducts />
                </div>
            </div>
        ),
    },
    {
        id: "call-to-action",
        title: "Get Started",
        content: (
            <div className="h-full bg-primary-900 flex items-center justify-center overflow-hidden">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <DataFoundationsCallToAction />
                </div>
            </div>
        ),
    },
]
