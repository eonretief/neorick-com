"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import IconListItem from "@/components/ui/IconListItem"
import { CheckBadgeIcon, ArrowsUpDownIcon, ShieldCheckIcon, ArrowPathIcon, ScaleIcon} from "@heroicons/react/24/outline"

export default function ArtificialIntelligenceModelOps() {
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
                            Managing Models for Longevity
                        </h2>
                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                            Deploy and maintain AI models sustainably.
                        </p>
                        <p>
                            ModelOps ensures that models are consistently monitored, updated, and scaled. Our focus is
                            on reliability, which helps maintain optimal AI performance over time while reducing downtime
                            and maximizing impact. By treating models as living assets, we integrate automated pipelines
                            and governance to enable seamless evolution that aligns with your business dynamics and
                            ethical standards. Achieving success in ModelOps is essential; it acts as the bridge from AI
                            experimentation to real-world value and allows you to capture bottom-line gains through
                            consistent performance and cost efficiencies.
                        </p>
                        <h3 className="font-bold text-2xl text-primary-500 pt-8">Why ModelOps Matters</h3>
                        <p>
                            Intelligent models are only as good as their ongoing management; without ModelOps, even the
                            best algorithms degrade, leading to lost opportunities and wasted investments. By getting
                            ModelOps right, we bridge the gap between AI potential and bottom-line results, ensuring
                            models deliver consistent, scalable impact that reduces costs, boosts revenue, and sustains
                            competitive advantage in dynamic markets.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center lg:justify-center">
                        <div ref={principalsRef} className="space-y-6 2xl:max-w-[70%] w-full max-w-md lg:max-w-none">
                            <div className="text-center">
                                <h3 className="font-bold text-2xl text-neutral-900 mb-8">Principals for Effective ModelOps</h3>
                            </div>

                            <IconListItem
                                icon={CheckBadgeIcon}
                                title="Reliability First"
                                description="Prioritize robust monitoring to detect drifts early, preventing costly failures and ensuring models deliver consistent business value in production environments."
                            />

                            <IconListItem
                                icon={ArrowsUpDownIcon}
                                title="Scalability without Sacrifice"
                                description="Design for growth by automating resource allocation, allowing models to handle increasing loads while optimizing costs and maintaining ethical standards for sustainable ROI."
                            />

                            <IconListItem
                                icon={ShieldCheckIcon}
                                title="Ethical Governance Embedded"
                                description="Integrate bias checks and transparency from deployment, safeguarding against risks that could erode trust and financial gains, turning AI into a defensible asset."
                            />

                            <IconListItem
                                icon={ArrowPathIcon}
                                title="Iterative Value Capture"
                                description="Use feedback loops for continuous refinement, aligning model evolution with business metrics to capture incremental improvements that compound into significant bottom-line impact."
                            />

                            <IconListItem
                                icon={ScaleIcon}
                                title="Operational Simplicity"
                                description="Streamline pipelines to reduce maintenance burdens, focusing on automation that frees teams for innovation while maximizing the economic return on your AI investments."
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
