"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { MapIcon, ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"

export default function DataFoundationsDataProducts() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const bentoMobileRef = useRef<HTMLDivElement>(null)
    const bentoDesktopRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Data for the bento grid items
    const bentoItems = [
        {
            icon: MapIcon,
            title: "Map",
            description:
                "We map your business objectives to the data landscape, identifying where data creates real advantage. From efficiency gains to new markets, we help create a clear roadmap to ensure every data product delivers measurable impact.",
            gridClass: "sm:row-span-2", // Tall on desktop
        },
        {
            icon: CurrencyDollarIcon,
            title: "Monetize",
            description:
                "Activate your data assets. We deploy and integrate data products to unlock new revenue streams, create significant operational efficiencies, and secure lasting market advantages",
            gridClass: "sm:row-span-1", // Short on desktop
        },
        {
            icon: ChartBarIcon,
            title: "Measure",
            description:
                "Engineer value from day one. We design data products with success metrics built into their core, defining clear KPIs to ensure their ROI is transparent and guaranteed.",
            gridClass: "sm:row-span-1", // Short on desktop
        },
        {
            icon: ArrowTrendingUpIcon,
            title: "Maximize",
            description:
                "Drive exponential returns by embedding data products into core workflows. We foster widespread adoption and continuous iteration to ensure the value of your data assets grows and compounds over time.",
            gridClass: "sm:row-span-2", // Tall on desktop
        },
    ]

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
                .to(
                    bentoMobileRef.current?.children || [],
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.1,
                    },
                    "-=0.3",
                )
                .to(
                    bentoDesktopRef.current?.querySelectorAll(".bento-item") || [],
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.1,
                    },
                    "-=0.6",
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
                <div
                    ref={contentRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center lg:min-h-[600px]"
                >
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed lg:flex lg:flex-col lg:justify-center">
                        <div>
                            <h2
                                ref={titleRef}
                                className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                            >
                                Turning Data into Tangible Assets
                            </h2>
                            <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                                Create reusable data products that deliver ongoing value.
                            </p>
                            <p className="text-md">
                                In a data-saturated world, scattered silos lead to inefficiency and untapped potential. At Neorick, we
                                change that by crafting data products—reusable, high-quality assets engineered like software, with
                                built-in ownership, standards, and focus on real outcomes. This asset-first mentality elevates data from
                                a mere resource to a strategic driver, fueling innovation, efficiency, and sustained growth while
                                ensuring your investments generate lasting returns.
                            </p>
                            <h3 className="font-bold text-2xl text-primary-500 pt-8 pb-4">Data on the Balance Sheet</h3>
                            <p className="text-md">
                                In today's economy, data isn't just information—it's a capitalizable asset that belongs on your balance
                                sheet, much like patents or software. At Neorick, we design data products as high-value, reusable items
                                with clear ownership, lifecycle management, and quantifiable ROI. This asset-oriented approach shifts
                                data from an operational expense to a strategic investment, enabling amortization of development costs,
                                appreciation through reuse, and direct contributions to revenue growth and competitive advantage.
                            </p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col justify-start items-center space-y-6">
                        {/* Framework heading */}
                        <div className="text-center">
                            <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-2">
                                Our Framework for Asset Value Creation
                            </h3>
                            <p className="text-sm text-neutral-900/70">
                                A systematic approach to transforming data into valuable business assets
                            </p>
                        </div>

                        <div className="w-3/4 sm:w-full md:w-full lg:w-4/5 xl:w-[80%] max-w-full flex justify-center items-start flex-1">
                            {/* Mobile: Single column */}
                            <div ref={bentoMobileRef} className="flex flex-col gap-4 w-full sm:hidden">
                                {bentoItems.map((item) => {
                                    const IconComponent = item.icon
                                    return (
                                        <div key={item.title} className="relative">
                                            <div className="absolute inset-0 rounded-lg" />
                                            <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-6 min-h-[120px]">
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

                            {/* Tablet+: 2x2 Bento Grid with asymmetric heights */}
                            <div ref={bentoDesktopRef} className="hidden sm:grid sm:grid-cols-2 gap-4 w-full h-full max-h-[480px]">
                                {/* Column 1 - Map (tall) + Measure (short) */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Map - Tall */}
                                    <div className="bento-item relative flex-[1.1]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Map</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[0].description}</p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Measure - Short */}
                                    <div className="bento-item relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <ChartBarIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Measure</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[2].description}</p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>
                                </div>

                                {/* Column 2 - Monetize (short) + Maximize (tall) */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Monetize - Short */}
                                    <div className="bento-item relative flex-1">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CurrencyDollarIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Monetize</h4>
                                            </div>
                                            <p className="text-sm text-neutral-900 leading-relaxed">{bentoItems[1].description}</p>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-neutral-700/24" />
                                    </div>

                                    {/* Maximize - Tall */}
                                    <div className="bento-item relative flex-[1.1]">
                                        <div className="absolute inset-0 rounded-lg" />
                                        <div className="relative flex h-full flex-col overflow-hidden rounded-lg p-4 lg:p-6 2xl:p-8">
                                            <div className="flex items-center gap-2 mb-2">
                                                <ArrowTrendingUpIcon className="w-5 h-5 text-primary-500" />
                                                <h4 className="text-lg font-bold text-neutral-900">Maximize</h4>
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
