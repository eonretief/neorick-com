import HeroSection from "@/components/HeroSection"
import type React from "react"
import ModellingSimulationOverview from "./ModellingSimulationOverview"
import ModellingSimulationComputationalModelling from "./ModellingSimulationComputationalModelling"
import ModellingSimulationDigitalTwins from "./ModellingSimulationDigitalTwins"
import ModellingSimulationCallToAction from "./ModellingSimulationCallToAction"

export interface DataFoundationsSectionsConfig {
    id: string
    title?: string
    content: React.ReactNode
    className?: string
}

export const modellingSimulationSections: DataFoundationsSectionsConfig[] = [
    {
        id: "overview",
        title: "Overview",
        content: (
            <div className="min-h-full flex flex-col lg:h-full lg:justify-center">
                <div className="flex-shrink-0">
                    <HeroSection
                        backgroundImage="/assets/images/1438634588.jpg"
                        subtitle="Modelling & Simulation"
                        title={{
                            normal: "Rehearse the Future. ",
                            highlight: "Today.",
                        }}
                        description="Neorick uses computational models to simulate and understand complex systems, providing clarity for strategic decisions."
                        statement="We build models that are grounded, transparent, and designed to serve, enhancing decision-making while staying aligned with your strategic and ethical priorities."
                        className=""
                    />
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0 lg:mt-[-60px]">
                    <ModellingSimulationOverview />
                </div>
            </div>
        ),
    },
    {
        id: "computational-modelling",
        title: "Computational Modelling",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <ModellingSimulationComputationalModelling />
                </div>
            </div>
        ),
    },
    {
        id: "digital-twins",
        title: "Digital Twins",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <ModellingSimulationDigitalTwins />
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
                    <ModellingSimulationCallToAction />
                </div>
            </div>
        ),
    },
]
