"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { PlatformEngineeringCloudImage } from "@/app/capabilities/platform-engineering-and-automation/assets/CloudImage"

export default function DataFoundationsDataPlatformsAndArchitecture() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state for all elements
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 50,
                opacity: 0,
            })

            // Get all bento grid items for consistent animation
            const bentoItems = contentRef.current?.children || []
            gsap.set(bentoItems, {
                y: 40,
                opacity: 0,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Animation function with improved timing
    const runAnimation = () => {
        if (!titleRef.current || !subtitleRef.current || !contentRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            // Animate title first
            tl.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            })
                // Animate subtitle with slight overlap
                .to(subtitleRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                }, "-=0.3")
                // Animate bento grid items with stagger
                .to(contentRef.current?.children || [], {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: {
                        amount: 0.4,
                        from: "start"
                    },
                }, "-=0.2")
        }, sectionRef)

        return () => ctx.revert()
    }

    // Reset animation function with consistent values
    const resetAnimation = () => {
        if (!titleRef.current || !subtitleRef.current || !contentRef.current) return

        const ctx = gsap.context(() => {
            // Reset all elements to initial state
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })

            gsap.set(contentRef.current?.children || [], {
                y: 40,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }, sectionRef)

        return () => ctx.revert()
    }

    // Improved Intersection Observer setup
    useEffect(() => {
        if (!sectionRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
                        if (!hasAnimated) {
                            setHasAnimated(true)
                            // Small delay to ensure smooth animation start
                            requestAnimationFrame(() => {
                                runAnimation()
                            })
                        }
                    } else if (entry.intersectionRatio < 0.05) {
                        if (hasAnimated) {
                            setHasAnimated(false)
                            resetAnimation()
                        }
                    }
                })
            },
            {
                threshold: [0, 0.05, 0.15, 0.5],
                rootMargin: "-10% 0px -10% 0px",
            },
        )

        observer.observe(sectionRef.current)

        // Check initial visibility with improved logic
        const checkInitialVisibility = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const isVisible = rect.top < (window.innerHeight * 0.8) && rect.bottom > (window.innerHeight * 0.2)

            if (isVisible && !hasAnimated) {
                setHasAnimated(true)
                // Use requestAnimationFrame for better timing
                requestAnimationFrame(() => {
                    runAnimation()
                })
            }
        }

        // Check on mount and scroll
        checkInitialVisibility()

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
                                Migrating to the Cloud with Confidence
                            </h2>

                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                                Secure, seamless shifts that unlock flexibility.
                            </p>
                        </div>

                        {/* Grid content */}
                        <div className="flex items-center justify-center">
                            <div
                                ref={contentRef}
                                className="flex flex-col lg:grid lg:grid-cols-3 gap-4 w-full h-full lg:h-[80%]"
                            >
                                {/* COLUMN 1 - Takes 2/3 of width (2:1 ratio) on desktop, full width on mobile */}
                                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                                    {/* First row - Introduction paragraph */}
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    We design cloud architectures tailored to your needs, handling migrations that minimize disruption. This results in cost savings, better performance, and environments ready for future demands. Our focus on simplicity ensures a smooth transition, turning cloud adoption into a strategic advantage rather than a challenge.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-[#4a5459]/24" />
                                    </div>

                                    {/* Second row - Two columns: Unlock Edge Benefits and Image - side by side on desktop, stacked on mobile */}
                                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 flex-1">
                                        {/* Unlock Edge Benefits */}
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-lg" />
                                            <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary-500 mb-4">Unlock Edge Benefits</h3>
                                                    <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                        <p>
                                                            Process data closer to its source to enhance performance, achieve faster speeds, reduce latency, and increase efficiency, which facilitates smoother migrations for real-time applications. Save costs by minimizing expensive data transfers to central clouds and optimizing resource use during architectural changes. Improve security by limiting exposure during transmission, while also enhancing user experiences with quicker response times.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-[#4a5459]/24" />
                                        </div>

                                        {/* Image */}
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-lg" />
                                            <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
                                                <div className="flex-1 space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                    <div className="flex justify-center items-center h-full">
                                                        <PlatformEngineeringCloudImage className="w-full h-auto" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-[#4a5459]/24" />
                                        </div>
                                    </div>
                                </div>

                                {/* COLUMN 2 - Our Expertise - Takes 1/3 of width (2:1 ratio) on desktop, full width on mobile */}
                                <div className="lg:col-span-1 relative">
                                    <div className="absolute inset-0 rounded-lg" />
                                    <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                        <div>
                                            <h3 className="text-xl font-bold text-primary-500 mb-4">Our Expertise</h3>
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p className="pb-4">
                                                    We bring decades of hands-on experience to cloud architecture and migration, with tailored strategies that minimize risks and maximize ROI. Our team applies best practices from initial audits to post-launch refinements, ensuring a seamless transition aligned with your business objectives.
                                                </p>
                                                <div className="space-y-6 text-sm">
                                                    <p>
                                                        <span className="font-bold text-neutral-900">Assessment and planning.</span> Evaluate your current setup to create a customized roadmap.
                                                    </p>
                                                    <p>
                                                        <span className="font-bold text-neutral-900">Secure data transfer.</span> Implement encryption and controls for safe, compliant moves.
                                                    </p>
                                                    <p>
                                                        <span className="font-bold text-neutral-900">Optimization post-migration.</span> Fine-tune for peak efficiency and ongoing scalability.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-[#4a5459]/24" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}