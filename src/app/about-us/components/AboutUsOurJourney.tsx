"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"

export default function AboutUsOurJourney() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states immediately
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
            // Reset to initial hidden state
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
                        // Reset when section goes out of view
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

        // Fallback: trigger animation immediately if section is already visible
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
                {/* Row 1: Header section */}
                <div className="text-left mb-8 2xl:mb-16">
                    <h2
                        ref={titleRef}
                        className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                    >
                        50+ Years of Innovation{" "}
                    </h2>

                    <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                        Built on curiosity and guided by innovation, our journey spans five decades of turning ideas into impact
                        across markets and domains.
                    </p>
                </div>

                {/* Row 2: Two-column content */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <p>
                            Founded in 1975 as a one-person operation, Neorick began with a clear mission: delivering innovative
                            technology solutions for South Africa's public sector. Our founder pioneered integration solutions for
                            early Point of Sale systems for Western Cape municipalities, establishing our reputation as a trusted
                            technology partner focused on simplifying complex interfaces.
                        </p>

                        <p>
                            The following decades saw strategic expansion of our offerings and expertise. From developing mobile data
                            capture solutions in the 1980s to creating sophisticated property valuation systems through the 1990s, we
                            continually adapted to meet evolving market needs while expanding our footprint across multiple South
                            African provinces.
                        </p>

                        <p>
                            Our 2006 rebranding as Neorick marked our evolution beyond the public sector. We ventured into new
                            industries with solutions spanning banking and payment systems, property zoning technology, and renewable
                            energy computational models. Our 2012 expansion into defense demonstrated our ability to apply our
                            expertise to highly specialized technical domains requiring precision and reliability.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <p>
                            A strategic pivot to cloud-native solutions in 2013, followed by the integration of AI and machine
                            learning as core components across all offerings, positioned us at the forefront of technological
                            innovation. Between 2014 and 2020, we expanded into multiple industries including financial services,
                            telecommunications, and energy, while developing specialized expertise in computational modeling and
                            advanced analytics.
                        </p>

                        <p>
                            Our global footprint grew with UK offices opening in 2023, followed by expansion into UAE markets. In
                            2024, we added comprehensive research offerings focused on market analysis and investment opportunity
                            assessments. Our 2025 acquisition of Visyon Group further strengthened our international presence across
                            UK and EU markets.
                        </p>

                        <p>
                            Today, Neorick serves clients worldwide from our offices in South Africa and the United Kingdom. While
                            we've grown exponentially from our one-person beginnings, our original ethos of innovation, adaptation,
                            and client-focused solutions remains at the heart of everything we do.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
