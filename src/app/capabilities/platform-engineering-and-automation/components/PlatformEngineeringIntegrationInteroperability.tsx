"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { ShareIcon, RocketLaunchIcon, BoltIcon, SparklesIcon } from "@heroicons/react/24/outline"

export default function DataFoundationsDataProducts() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const bentoMobileRef = useRef<HTMLDivElement>(null)
    const bentoDesktopRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    const bentoItems = [
        {
            icon: ShareIcon,
            title: "Unified Ecosystem",
            description:
                "We unify your disparate systems into a single, cohesive ecosystem. This eliminates data silos and provides a single source of truth, enabling your teams to make smarter, faster decisions based on a complete view of your business.",
        },
        {
            icon: RocketLaunchIcon,
            title: "Future-Proof Architecture",
            description:
                "Our framework is engineered for what's next. We ensure your systems can grow and evolve alongside your business, easily integrating new technologies without overhauling your entire infrastructure, protecting your investment for the long term.",
        },
        {
            icon: BoltIcon,
            title: "Seamless Automation",
            description:
                "We simplify the complexities of system interoperability, allowing applications to work together effortlessly. This enables you to automate key workflows, freeing your teams to focus on strategic tasks that drive innovation and growth.",
        },
        {
            icon: SparklesIcon,
            title: "Accelerated Innovation",
            description:
                "True innovation happens when your technology works for you. Our framework provides the foundation you need to build and deploy new capabilities faster, empowering your business to reach its full potential.",
        },
    ]

    // Set initial hidden state
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
            gsap.set(bentoMobileRef.current?.children || [], {
                y: 30,
                opacity: 0,
            })
            gsap.set(bentoDesktopRef.current?.querySelectorAll(".bento-item") || [], {
                y: 30,
                opacity: 0,
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const runAnimation = () => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()
            tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
                .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
                .to(contentRef.current?.children || [], {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.15,
                }, "-=0.2")
                .to(bentoMobileRef.current?.children || [], {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.1,
                }, "-=0.3")
                .to(bentoDesktopRef.current?.querySelectorAll(".bento-item") || [], {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.1,
                }, "-=0.6")
        }, sectionRef)
        return () => ctx.revert()
    }

    const resetAnimation = () => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, subtitleRef.current], { y: 40, opacity: 0 })
            gsap.set(contentRef.current?.children || [], { y: 30, opacity: 0 })
            gsap.set(bentoMobileRef.current?.children || [], { y: 30, opacity: 0 })
            gsap.set(bentoDesktopRef.current?.querySelectorAll(".bento-item") || [], { y: 30, opacity: 0 })
        }, sectionRef)
        return () => ctx.revert()
    }

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
            { threshold: [0.1, 0.5], rootMargin: "0px" },
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
        return () => observer.disconnect()
    }, [hasAnimated])

    return (
        <section ref={sectionRef} className="w-full bg-white flex items-center justify-center py-8 sm:py-16">
            <Container className="px-6">
                <div
                    ref={contentRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch lg:min-h-[600px]"
                >
                    {/* Column 1 */}
                    <div className="h-full flex flex-col justify-center space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <div>
                            <h2
                                ref={titleRef}
                                className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                            >
                                Connecting Systems Seamlessly
                            </h2>
                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                                Break silos for unified operations and ecosystems.
                            </p>
                            <p className="text-md">
                                Our integrations ensure data and apps work together smoothly, creating cohesive ecosystems that enhance
                                efficiency and provide a complete business view. Using APIs, middleware, and standards, we connect
                                disparate systems to enable real-time data exchange and holistic visibility, all while minimizing custom
                                workarounds and focusing on reliable, scalable connections that support your operations without added
                                complexity.
                            </p>
                            <h3 className="font-bold text-2xl text-primary-500 pt-8 pb-4">Why Unified Integration Matters</h3>
                            <p className="text-md">
                                In fragmented environments, silos lead to inefficiencies, errors, and missed opportunities. Our approach
                                to interoperability breaks these barriers, fostering a connected digital landscape where systems
                                communicate effortlessly and unlock better collaboration, faster insights, and a foundation for
                                innovation that aligns with your strategic goals.
                            </p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="h-full flex flex-col justify-center items-center space-y-6">
                        <div className="text-center">
                            <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-2">
                                Our Framework for Seamless Integration
                            </h3>
                            <p className="text-sm text-neutral-900/70">
                                A systematic approach to creating interconnected systems that drive business value
                            </p>
                        </div>

                        <div className="w-3/4 sm:w-full md:w-full lg:w-4/5 xl:w-[90%] max-w-full h-full flex justify-center items-start flex-1">
                            {/* Mobile: Single column */}
                            <div ref={bentoMobileRef} className="flex flex-col gap-4 w-full sm:hidden">
                                {bentoItems.map((item) => {
                                    const IconComponent = item.icon
                                    return (
                                        <div key={item.title} className="relative">
                                            <div className="absolute inset-0 rounded-lg" />
                                            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg p-6 min-h-[120px]">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <IconComponent className="w-5 h-5 text-primary-500" />
                                                    <h4 className="text-lg font-bold text-neutral-900">{item.title}</h4>
                                                </div>
                                                <p className="text-sm text-neutral-900 leading-relaxed">{item.description}</p>
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Desktop: 2x2 Bento Grid */}
                            <div ref={bentoDesktopRef} className="hidden sm:grid sm:grid-cols-2 gap-4 w-full h-full">
                                <div className="flex flex-col gap-4 h-full">
                                    <div className="bento-item relative flex-[1.1]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <ShareIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Unified Ecosystem</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[0].description}</p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    <div className="bento-item relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <RocketLaunchIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Future-Proof Architecture</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[1].description}</p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 h-full">
                                    <div className="bento-item relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <BoltIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Seamless Automation</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[2].description}</p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    <div className="bento-item relative flex-[1.1]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <SparklesIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Accelerated Innovation</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[3].description}</p>
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
