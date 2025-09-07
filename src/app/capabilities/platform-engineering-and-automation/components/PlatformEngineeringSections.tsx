import HeroSection from "@/components/HeroSection"
import type React from "react"
import PlatformEngineeringOverview from "./PlatformEngineeringOverview"
import PlatformEngineeringCloud from "./PlatformEngineeringCloud"
import PlatformEngineeringApplicationModernization from "./PlatformEngineeringApplicationModernization"
import PlatformEngineeringCallToAction from "./PlatformEngineeringCallToAction"
import PlatformEngineeringIntegrationInteroperability from "./PlatformEngineeringIntegrationInteroperability"
import PlatformEngineeringAutomationOrchestration from "./PlatformEngineeringAutomationOrchestration"

export interface PlatformEngineeringSectionsConfig {
    id: string
    title?: string
    content: React.ReactNode
    className?: string
}

export const platformEngineeringSections: PlatformEngineeringSectionsConfig[] = [
    {
        id: "overview",
        title: "Overview",
        content: (
            <div className="min-h-full flex flex-col lg:h-full lg:justify-center">
                <div className="flex-shrink-0">
                    <HeroSection
                        backgroundImage="/assets/images/1438634588.jpg"
                        subtitle="Platform Engineering & Automation"
                        title={{
                            normal: "From Legacy to ",
                            highlight: "Velocity",
                        }}
                        description="Neorick engineers platforms that automate the routine, freeing your teams to focus on what drives your business forward."
                        statement="We prioritize simplicity in design and implementation, ensuring systems that are resilient, scalable, and aligned with your goals - delivering value that lasts without constant upkeep."
                        className=""
                    />
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0 lg:mt-[-60px]">
                    <PlatformEngineeringOverview />
                </div>
            </div>
        ),
    },
    {
        id: "cloud-migrations",
        title: "Cloud Architecture & Migrations",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <PlatformEngineeringCloud />
                </div>
            </div>
        ),

    },
    {
        id: "application-modernization",
        title: "Application Modernization",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <PlatformEngineeringApplicationModernization />
                </div>
            </div>
        ),

    },
    {
        id: "integration-interoperability",
        title: "Integration & Interoperability",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <PlatformEngineeringIntegrationInteroperability />
                </div>
            </div>
        ),
    },
    {
        id: "automation-orchestration",
        title: "Automation & Orchestration",
        content: (
            <div className="min-h-full flex flex-col lg:h-full">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <PlatformEngineeringAutomationOrchestration />
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
                    <PlatformEngineeringCallToAction />
                </div>
            </div>
        ),
    }
]
