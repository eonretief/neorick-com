"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { DataFoundationsDataStrategyImage } from "@/app/capabilities/data-and-digital-foundations/assets/DataStrategyImage"

export default function DataFoundationsDataStrategy() {
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
                {/* Row 2: Two-column content */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-start">
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <h2
                            ref={titleRef}
                            className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                        >
                            Charting a Clear Path Forward
                        </h2>
                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                            Elevate your data from asset to advantage: A precise strategy that mandates action and delivers real
                            results.
                        </p>
                        <p>
                            We help you build a data strategy that's practical and tied directly to your business aims. This means
                            identifying key data sources, setting priorities, and creating a roadmap that avoids waste and focuses on
                            outcomes like faster insights and reduced risks. Our framework ensures data becomes a core part of how you
                            operate, not an afterthought.
                        </p>
                        <h3 className="font-bold text-2xl text-primary-500 pt-8">Our Framework</h3>
                        <p>
                            <span className="font-bold">Assess Current Data Maturity.</span> Evaluate your existing data landscape to pinpoint
                            strengths, gaps, and quick wins without overcomplicating the process.
                        </p>
                        <p>
                            <span className="font-bold">Define Measurable Objectives.</span> Set clear, achievable goals aligned with your business
                            priorities, ensuring every data initiative delivers tangible value.
                        </p>
                        <p>
                            <span className="font-bold">Integrate with Existing Processes.</span> Seamlessly weave data strategies into your daily
                            operations, minimizing disruption and maximizing adoption across teams.
                        </p>
                        <p>
                            <span className="font-bold">Monitor and Adapt over Time.</span> Establish ongoing reviews to refine your approach, keeping
                            it flexible and responsive to evolving needs.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center items-center min-h-[320px]">
                        <div className="w-3/4 sm:w-full md:w-full lg:w-4/5 xl:w-[80%] max-w-full flex justify-center">
                            <DataFoundationsDataStrategyImage className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
