"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import IconListItem from "@/components/ui/IconListItem"
import { AdjustmentsHorizontalIcon, EyeIcon, ArrowsUpDownIcon, LinkIcon } from "@heroicons/react/24/outline"
import Link from "next/link";

export default function DataFoundationsDataGovernance() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const principalsRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 40,
                opacity: 0,
            })

            gsap.set(contentRef.current, {
                y: 30,
                opacity: 0,
            })

            gsap.set(principalsRef.current?.children || [], {
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
                    contentRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.2",
                )
                .to(
                    principalsRef.current?.children || [],
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

            gsap.set(contentRef.current, {
                y: 30,
                opacity: 0,
            })

            gsap.set(principalsRef.current?.children || [], {
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
        <section ref={sectionRef} className="w-full bg-white flex items-center justify-center py-8 sm:py-16">
            <Container className="px-6">
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center">
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <h2
                            ref={titleRef}
                            className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                        >
                            Automating with Intelligence
                        </h2>
                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                            Orchestrate workflows that adapt and optimize.
                        </p>
                        <p>
                            We build automation that goes beyond tasks, creating adaptive systems for end-to-end processes.
                            This leads to faster operations, fewer errors, and resources focused on high-value work. Our
                            solutions emphasize intelligent orchestration, ensuring workflows evolve with your business
                            for sustained efficiency and innovation.
                        </p>
                        <h3 className="font-bold text-2xl text-primary-500 pt-8">The Power of Adaptive Orchestration</h3>
                        <p>
                            Adaptive orchestration integrates rules-based logic and real-time monitoring to make processes
                            resilient and proactive. This not only streamlines daily operations but also positions your
                            organization to handle unexpected changes, turning automation into a strategic tool that drives
                            long-term agility and cost savings.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center lg:justify-center">
                        <div ref={principalsRef} className="space-y-6 2xl:max-w-[70%] w-full max-w-md lg:max-w-none">
                            <div className="text-center">
                                <h3 className="font-bold text-2xl text-neutral-900 mb-8">Foundations for Effective Automation</h3>
                            </div>

                            <IconListItem
                                icon={AdjustmentsHorizontalIcon}
                                title="Adaptive Logic"
                                description="Systems that self-adjust based on real-time data and conditions for optimal performance."
                            />

                            <IconListItem
                                icon={EyeIcon}
                                title="Monitoring Tools"
                                description="Built-in dashboards for oversight, quick issue detection, and continuous improvement."
                            />

                            <IconListItem
                                icon={ArrowsUpDownIcon}
                                title="Scalable Design"
                                description="Grow effortlessly with increasing demands, avoiding redesigns as your needs evolve."
                            />

                            <IconListItem
                                icon={LinkIcon}
                                title="Seamless Integration"
                                description="Connect with existing systems using standards like APIs for unified operations."
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
