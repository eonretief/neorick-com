"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import IconListItem from "@/components/ui/IconListItem"
import { CheckCircleIcon, UsersIcon, LockClosedIcon, ShieldCheckIcon, ScaleIcon } from "@heroicons/react/24/outline"

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
                            Safeguarding Data with Purpose
                        </h2>
                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                            Establish rules that protect and empower, without overcomplicating things.
                        </p>
                        <p>
                            Strong governance means clear policies for data quality, security, and access. We set up frameworks that
                            ensure compliance while making data trustworthy and easy to use across teams. This leads to fewer errors,
                            better collaboration, and data you can rely on for critical choices.
                        </p>
                        <h3 className="font-bold text-2xl text-primary-500 pt-8">Why Governance Matters</h3>
                        <p>
                            In a data-driven world, governance isn't just about rules—it's the foundation for turning data into a
                            reliable asset. Without it, organizations face risks like inaccurate insights, breaches, or regulatory
                            fines, leading to lost trust and opportunities. Effective governance minimizes errors, fosters
                            collaboration, and enables confident decision-making, ultimately driving sustainable growth and
                            efficiency.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center lg:justify-center">
                        <div ref={principalsRef} className="space-y-6 2xl:max-w-[70%] w-full max-w-md lg:max-w-none">
                            <div className="text-center">
                                <h3 className="font-bold text-2xl text-neutral-900 mb-8">Pillars of Effective Governance</h3>
                            </div>

                            <IconListItem
                                icon={CheckCircleIcon}
                                title="Data Quality"
                                description="Ensure accuracy, completeness, and timeliness to build reliable insights and avoid costly mistakes."
                            />

                            <IconListItem
                                icon={UsersIcon}
                                title="Data Stewardship"
                                description="Assign clear ownership and responsibilities to maintain standards and foster accountability across teams."
                            />

                            <IconListItem
                                icon={LockClosedIcon}
                                title="Data Security"
                                description="Implement robust controls and encryption to protect against breaches and unauthorized access."
                            />

                            <IconListItem
                                icon={ShieldCheckIcon}
                                title="Data Privacy"
                                description="Safeguard personal information through consent management and privacy-by-design principles to build trust."
                            />

                            <IconListItem
                                icon={ScaleIcon}
                                title="Data Compliance"
                                description="Align with regulations and standards to avoid penalties and ensure ethical data handling."
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
