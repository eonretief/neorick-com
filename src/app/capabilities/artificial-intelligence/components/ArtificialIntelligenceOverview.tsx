"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"

import { ArtificialIntelligenceOverviewImage } from "@/app/capabilities/artificial-intelligence/assets/OverviewImage"

export default function ArtificialIntelligenceOverview() {
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

    // Animation function
    const runAnimation = () => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 })

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
                        stagger: 0.2,
                    },
                    "-=0.3",
                )
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
                {/* Row 2: Two-column content */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center">
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <h2
                            ref={titleRef}
                            className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                        >
                            Accelerating Intelligent Innovation
                        </h2>
                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                            Harnessing AI for Ethical, Practical Impact
                        </p>
                        <p>
                            In an era where AI promises endless possibilities, the real challenge is deploying it
                            responsibly to solve tangible problems. At Neorick, we craft AI solutions that blend cutting-
                            edge models with human-centered design, ensuring they integrate seamlessly into your workflows
                            for measurable gains in efficiency, insight, and growth. By prioritizing ethics and simplicity,
                            we avoid overhyped applications, focusing instead on AI that adapts to your needs while
                            mitigating risks like bias or complexity.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center items-start">
                        <ArtificialIntelligenceOverviewImage className="w-64 sm:w-72 md:w-80 lg:w-[400px] xl:w-[450px] 2xl:w-[600px] max-w-full h-auto" />
                    </div>
                </div>
            </Container>
        </section>
    )
}
