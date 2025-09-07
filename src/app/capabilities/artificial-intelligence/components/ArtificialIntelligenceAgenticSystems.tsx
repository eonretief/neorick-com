"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import Container from "@/components/ui/Container"
import { ArtificialIntelligenceAgenticSystemsImage} from "@/app/capabilities/artificial-intelligence/assets/AgenticSystemsImage";

export default function ArtificialIntelligenceAgenticSystems() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)

    // Business challenges data
    const businessChallenges = [
        {
            title: "Siloed Operations",
            description: "Agents bridge disconnected systems for unified, automated processes."
        },
        {
            title: "Manual Bottlenecks",
            description: "Autonomous agents eliminate repetitive tasks and accelerate workflows."
        },
        {
            title: "Scalability Limits",
            description: "AI agents adapt and scale with your growing business demands."
        },
        {
            title: "Decision Delays",
            description: "Real-time reasoning capabilities enable faster, more informed decision-making."
        }
    ]

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 40,
                opacity: 0,
            })

            gsap.set(contentRef.current?.children || [], {
                y: 30,
                opacity: 0,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Animation function
    const runAnimation = () => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
            })
                .to(
                    subtitleRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4",
                )
                .to(
                    contentRef.current?.children || [],
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.15,
                    },
                    "-=0.2",
                )
        }, sectionRef)

        return () => ctx.revert()
    }

    // Reset animation function
    const resetAnimation = () => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 40,
                opacity: 0,
            })

            gsap.set(contentRef.current?.children || [], {
                y: 30,
                opacity: 0,
            })
        }, sectionRef)

        return () => ctx.revert()
    }

    // Intersection Observer setup
    useEffect(() => {
        if (!sectionRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        if (!hasAnimated) {
                            setHasAnimated(true)
                            runAnimation()
                        }
                    } else {
                        if (hasAnimated) {
                            setHasAnimated(false)
                            resetAnimation()
                        }
                    }
                })
            },
            {
                threshold: [0.1, 0.5],
                rootMargin: "0px",
            },
        )

        observer.observe(sectionRef.current)

        const rect = sectionRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (isVisible && !hasAnimated) {
            setTimeout(() => {
                setHasAnimated(true)
                runAnimation()
            }, 100)
        }

        return () => {
            observer.disconnect()
        }
    }, [hasAnimated])

    const handlePreviousChallenge = () => {
        setCurrentChallengeIndex((prev) =>
            prev === 0 ? businessChallenges.length - 1 : prev - 1
        )
    }

    const handleNextChallenge = () => {
        setCurrentChallengeIndex((prev) =>
            prev === businessChallenges.length - 1 ? 0 : prev + 1
        )
    }

    const currentChallenge = businessChallenges[currentChallengeIndex]

    return (
        <section ref={sectionRef} className="w-full bg-white py-8 sm:py-16">
            <Container className="px-6">
                {/* Wrapper div that centers and constrains the content */}
                <div className="flex justify-center">
                    <div className="w-full lg:w-[95%]">
                        {/* Title and subtitle section */}
                        <div className="text-left mb-8 2xl:mb-16">
                            <h2
                                ref={titleRef}
                                className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                            >
                                Autonomy with Purpose, Intelligence with Integrity
                            </h2>

                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                                Activate autonomous agents that reason, decide, and deliver.
                            </p>
                        </div>

                        {/* Three-column grid content */}
                        <div className="flex items-center justify-center">
                            <div
                                ref={contentRef}
                                className="grid grid-cols-1 gap-4 lg:grid-cols-3 w-full h-full"
                            >
                                {/* COLUMN 1 - Two rows */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Row 1 - "What happens when..." */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4 text-sm text-primary-500 leading-relaxed">
                                                <h3 className="text-lg font-semibold text-primary-500 mb-4">
                                                    What happens when machines act with intention rather than just follow instructions?
                                                </h3>
                                                <p className="text-neutral-900">
                                                    Agentic AI marks a shift from a mere tool to a collaborator,
                                                    navigating complex situations and influencing outcomes while
                                                    prioritizing human judgment, ethics, and purpose.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Row 2 - Business Challenges with navigation */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-primary-500 text-center mb-8">Business Challenges</h3>

                                                <div className="flex items-center justify-between">
                                                    <button
                                                        onClick={handlePreviousChallenge}
                                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                        aria-label="Previous challenge"
                                                    >
                                                        <ChevronLeftIcon className="w-5 h-5 text-neutral-600" />
                                                    </button>

                                                    <div className="flex-1 mx-4 text-center">
                                                        <div className="space-y-2">
                                                            <div className="text-sm font-bold text-neutral-900">
                                                                {currentChallenge.title}
                                                            </div>
                                                            <div className="text-sm text-neutral-900">
                                                                {currentChallenge.description}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleNextChallenge}
                                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                        aria-label="Next challenge"
                                                    >
                                                        <ChevronRightIcon className="w-5 h-5 text-neutral-600" />
                                                    </button>
                                                </div>

                                                {/* Pagination dots */}
                                                <div className="flex justify-center space-x-2 mt-4">
                                                    {businessChallenges.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentChallengeIndex(index)}
                                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                                index === currentChallengeIndex
                                                                    ? 'bg-primary-500'
                                                                    : 'bg-neutral-700/24'
                                                            }`}
                                                            aria-label={`Go to challenge ${index + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 2 - Two rows */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Row 1 - "We build AI agents..." */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    We build AI agents that handle complex tasks with oversight.
                                                    This automates workflows while maintaining control, boosting
                                                    efficiency in dynamic environments. Our agents incorporate
                                                    advanced reasoning to adapt in real-time, ensuring they
                                                    operate within ethical boundaries and deliver reliable
                                                    results that scale with your business needs.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Row 2 - Image */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center items-center">
                                            <div className="flex justify-center items-center h-full">
                                                <ArtificialIntelligenceAgenticSystemsImage className="w-full h-auto max-h-full object-contain" />
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 3 - Our Framework */}
                                <div className="flex flex-col gap-4 h-full">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-6r">
                                                <h3 className="text-lg font-bold text-primary-500 mb-8">Our Framework</h3>

                                                <div className="space-y-6 text-sm">
                                                    <div>
                                                        <span className="font-bold text-neutral-900">Assess.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Evaluate business needs and environments to identify ideal tasks for
                                                            agent deployment, ensuring alignment with goals and minimal disruption.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Architect.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Design the agent's reasoning core, action mechanisms, and integration
                                                            points with a focus on modularity and scalability.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Activate.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Deploy agents in controlled phases, testing autonomy and
                                                            performance in real-world scenarios for seamless rollout.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Assure.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Implement ongoing monitoring, ethical guardrails, and iterative
                                                            refinements to maintain safety, reliability, and value over time.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}