import HeroSection from "@/components/HeroSection"
import type React from "react"
import ArtificialIntelligenceOverview from "./ArtificialIntelligenceOverview"
import ArtificialIntelligenceCallToAction from "./ArtificialIntelligenceCallToAction"
import ArtificialIntelligenceMachineLearning from "./ArtificialIntelligenceMachineLearning"
import ArtificialIntelligenceGenerativeAI from "./ArtificialIntelligenceGenerativeAI"
import ArtificialIntelligenceAgenticSystems from "./ArtificialIntelligenceAgenticSystems"
import ArtificialIntelligenceModelOps from "./ArtificialIntelligenceModelOps"

export interface DataFoundationsSectionsConfig {
    id: string
    title?: string
    content: React.ReactNode
    className?: string
}

export const artificialIntelligenceSections: DataFoundationsSectionsConfig[] = [
    {
        id: "overview",
        title: "Overview",
        content: (
            <div className="min-h-full flex flex-col lg:h-full lg:justify-center">
                <div className="flex-shrink-0">
                    <HeroSection
                        backgroundImage="/assets/images/1438634588.jpg"
                        subtitle="Artificial Intelligence"
                        title={{
                            normal: "Intelligent Systems. ",
                            highlight: "Measurable impact.",
                        }}
                        description="Neorick applies AI to solve real problems, blending technology with human insight for sustainable results."
                        statement="We commit to responsible implementation, ensuring AI enhances your operations without unnecessary complexity or risks."
                        className=""
                    />
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0 lg:mt-[-60px]">
                    <ArtificialIntelligenceOverview />
                </div>
            </div>
        ),
    },
    {
        id: "machine-learning",
        title: "Machine Learning",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <ArtificialIntelligenceMachineLearning />
                </div>
            </div>
        ),
    },
    {
        id: "generative-ai",
        title: "Generative AI",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <ArtificialIntelligenceGenerativeAI />
                </div>
            </div>
        ),
    },
    {
        id: "agentic-systems",
        title: "Agentic Systems",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <ArtificialIntelligenceAgenticSystems />
                </div>
            </div>
        ),
    },
    {
        id: "model-ops",
        title: "ModelOps",
        content: (
            <div className="min-h-full bg-white flex items-center justify-center">
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <ArtificialIntelligenceModelOps />
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
                    <ArtificialIntelligenceCallToAction />
                </div>
            </div>
        ),
    },
]
