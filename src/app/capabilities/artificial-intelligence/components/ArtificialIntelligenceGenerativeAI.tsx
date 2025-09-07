"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { ArtificialIntelligenceGenerativeAIImage } from "@/app/capabilities/artificial-intelligence/assets/GenerativeAIImage"

export default function ArtificialIntelligenceGenerativeAI() {
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
                                Synthetic Brilliance Unleashed
                            </h2>

                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                                Secure, seamless shifts that unlock flexibility.
                            </p>
                        </div>

                        {/* Grid content - Updated to 2-column layout */}
                        <div className="flex items-center justify-center">
                            <div
                                ref={contentRef}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 w-full h-full"
                            >
                                {/* COLUMN 1 - Two blocks stacked vertically */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Top block - Generative AI Tools text */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    Our generative AI tools produce text, images, or code tailored to your needs.
                                                    We emphasize integration and ethics to ensure outputs are useful and
                                                    aligned with your goals. By focusing on responsible deployment, we turn
                                                    generative capabilities into practical assets that enhance creativity,
                                                    streamline processes, and drive innovation without ethical compromises or
                                                    integration hurdles.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Bottom block - Benefits section */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6">
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-bold text-primary-500 mb-4">Benefits</h3>

                                                <div className="space-y-4 text-sm">
                                                    <div>
                                                        <span className="font-bold text-neutral-900">Accelerated creativity.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Instantly generate high-quality content, code, and designs to drastically shorten your innovation cycles.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Boosted efficiency.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Automate repetitive tasks and streamline complex workflows, freeing your team to focus on strategic, high-impact work.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Scalable innovation.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Adapt outputs to growing needs, fostering continuous improvement.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="font-bold text-neutral-900">Hyper personalization.</span>{" "}
                                                        <span className="text-neutral-900">
                                                            Deliver unique, tailored experiences to every customer at scale, significantly increasing engagement and loyalty.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* COLUMN 2 - Two blocks stacked vertically */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Top block - Image */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center items-center">
                                            <div className="flex justify-center items-center h-full">
                                                <ArtificialIntelligenceGenerativeAIImage className="w-full h-auto max-h-full object-contain" />
                                            </div>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Bottom block - Experience text */}
                                    <div className="relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 justify-center">
                                            <div className="space-y-4 text-sm text-neutral-900 leading-relaxed">
                                                <p>
                                                    We bring decades of hands-on experience to cloud architecture and
                                                    migration, crafting tailored strategies that minimize risks and maximize
                                                    ROI. Our team applies best practices from initial audits to post-launch
                                                    refinements, ensuring a seamless transition aligned with your business
                                                    objectives.
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