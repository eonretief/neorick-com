"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { DataFoundationsDataArchitectureImage } from "@/app/capabilities/data-and-digital-foundations/assets/DataArchitectureImage"

export default function DataFoundationsDataPlatformsAndArchitecture() {
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
                    <div className="w-full lg:w-[80%]">
                        {/* Title and subtitle section - now aligned with grid */}
                        <div className="text-left mb-8 2xl:mb-16">
                            <h2
                                ref={titleRef}
                                className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                            >
                                Designing Systems that Scale Simply
                            </h2>

                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                                Build flexible platforms that handle growth without the hassle.
                            </p>
                        </div>

                        {/* Grid content */}
                        <div className="flex items-center justify-center">
                            <div
                                ref={contentRef}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3 w-full h-full lg:h-[80%]"
                            >
                                {/* COLUMN 1 - Two blocks stacked vertically */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* First block in column 1 */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    We architect data platforms that break down silos and ensure seamless access. Using modular
                                                    designs, we prioritize scalability, security, and ease of integration, turning raw data into a
                                                    unified resource that supports innovation and quick adaptations. Our platforms are built to
                                                    evolve with your business, minimizing maintenance while maximizing reliability.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Second block in column 1 */}
                                    <div className="relative flex-[2]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
                                            <div className="flex-1 space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <div className="mt-6 flex justify-center">
                                                    <DataFoundationsDataArchitectureImage className="w-full h-auto" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 2 - Three blocks stacked vertically */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Modular Components */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center items-start">
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-3">Modular Components</h3>
                                            <p className="text-sm text-neutral-900 leading-relaxed">
                                                We use composable building blocks that allow easy updates and integrations, reducing downtime
                                                and costs.
                                            </p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Security by Design */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center items-start">
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-3">Security by Design</h3>
                                            <p className="text-sm text-neutral-900 leading-relaxed">
                                                Embed robust protections from the start, ensuring data is safe, compliant, and resilient without
                                                added layers of complexity.
                                            </p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Seamless Integration */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center items-start">
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-3">Seamless Integration</h3>
                                            <p className="text-sm text-neutral-900 leading-relaxed">
                                                Enable effortless connectivity across systems and teams, breaking silos for unified data flow
                                                and collaboration.
                                            </p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 3 - Two blocks stacked vertically */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Benefits of Modern Platforms - now takes up roughly 60% of height */}
                                    <div className="relative flex-[3]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div>
                                                <h3 className="text-2xl font-bold text-primary-500 mb-4">Benefits of Modern Platforms</h3>
                                                <div className="space-y-4 text-sm">
                                                    <p className="text-neutral-900">
                                                        Our architecture delivers lasting value by focusing on efficiency and adaptability.
                                                    </p>
                                                    <div className="space-y-6 pt-6">
                                                        <p>
                                                            <span className="font-bold text-neutral-900">Enhanced collaboration.</span>{" "}
                                                            <span className="text-neutral-900">
                                Break down silos for seamless team access and unified insights.
                              </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-bold text-neutral-900">Improved decision-making.</span>{" "}
                                                            <span className="text-neutral-900">
                                Enable faster, data-driven choices with reliable, scalable systems.
                              </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-bold text-neutral-900">Cost reductions.</span>{" "}
                                                            <span className="text-neutral-900">
                                Minimize maintenance and operational overhead through modular designs.
                              </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-bold text-neutral-900">Greater agility.</span>{" "}
                                                            <span className="text-neutral-900">
                                Adapt quickly to business changes without rebuilding from scratch.
                              </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Architecture Patterns - new block taking up roughly 40% of height */}
                                    <div className="relative flex-[2]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div>
                                                <div className="space-y-3 text-sm">
                                                    <p className="text-neutral-900">
                                                        We specialize in designing and implementing leading data architectures like the{" "}
                                                        <strong>Data Lakehouse</strong>, <strong>Data Mesh</strong>, and{" "}
                                                        <strong>Data Fabric</strong>. Whether you need a pure implementation or a hybrid model
                                                        tailored to your unique ecosystem, our expertise ensures your platform is built for what's
                                                        next.
                                                    </p>
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
