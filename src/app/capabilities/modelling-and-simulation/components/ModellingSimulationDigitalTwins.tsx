"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { ModellingSimulationDigitalTwinsImage} from "@/app/capabilities/modelling-and-simulation/assets/DigitalTwinsImage"

export default function ModellingSimulationDigitalTwins() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

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
                                More than a Reflection. A Revelation.
                            </h2>

                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                                Mirror assets with virtual replicas to predict and improve performance.
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
                                    {/* Row 1 - Digital twins description */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    Digital twins replicate physical systems virtually. We use them to monitor, predict issues, and optimize, reducing costs and downtime. By creating exact digital counterparts, we enable real-time analysis and scenario testing, turning data into proactive tools that enhance asset longevity and operational reliability.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Row 2 - Use Cases */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-primary-500 mb-6">Use Cases</h3>

                                                <div className="space-y-4 text-sm">
                                                    <div>
                                                        <span className="font-bold text-neutral-900">Manufacturing.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Mirror production lines to test upgrades and reduce downtime in factories.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Healthcare.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Simulate patient care equipment for better resource allocation and safety.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Energy.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Model infrastructure like wind turbines to optimize output and maintenance schedules.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Transportation.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Replicate vehicle fleets for predictive logistics and route efficiency.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 2 - Two rows */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Row 1 - Benefits */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-6">
                                                <h3 className="text-lg font-bold text-primary-500 mb-6">Benefits</h3>

                                                <div className="space-y-6 text-sm">
                                                    <div>
                                                        <span className="font-bold text-neutral-900">Real-time monitoring.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Continuously track asset performance to detect anomalies early and respond proactively.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Predictive maintenance.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Anticipate equipment failures in advance to avoid costly downtime and extend asset lifespan.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Cost reduction.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Optimize systems through virtual testing and scenario analysis, reducing real-world operational costs.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Improved decision making.</span>{" "}
                                                        <span className="text-neutral-700">
                                                            Simulate potential changes in a risk-free environment to support faster, data-driven decisions.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Row 2 - Closing CTA */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    <span className="font-bold">Turn your assets into oracles.</span> While others guess, you'll know. While they react, you'll anticipate. Digital twins aren't just technology—they're your competitive advantage in a world where downtime costs millions and foresight pays dividends. Let's build your digital advantage.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 3 - Two rows */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Row 1 - Image */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center items-center">
                                            <div className="flex justify-center items-center h-full">
                                                <ModellingSimulationDigitalTwinsImage className="w-full h-auto max-h-full object-contain" />
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Row 2 - "We don't just build..." */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    We don't just build digital twins — we design them as part of an integrated, value-focused framework. From discovery and data integration to real-time simulation and continuous refinement, our approach ensures every model serves a purpose, scales with confidence, and stays aligned with operational goals.
                                                </p>
                                                <p className="mt-4">
                                                    This builds trust and positions your team as methodical and client-centric.
                                                </p>
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