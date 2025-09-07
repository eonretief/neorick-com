"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import Container from "./ui/Container"

export interface HeroSectionProps {
    backgroundImage?: string
    title: {
        normal: string
        highlight: string
    }
    subtitle?: string
    description?: string
    statement?: string
    className?: string
}

export default function HeroSection({
                                        backgroundImage,
                                        title,
                                        subtitle,
                                        description,
                                        statement,
                                        className = "",
                                    }: HeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const statementRef = useRef<HTMLParagraphElement>(null)

    // Animation setup
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 })

            // Set initial states
            gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, statementRef.current], {
                y: 40,
                opacity: 0,
            })

            // Animate elements in sequence
            if (subtitleRef.current) {
                tl.to(subtitleRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                })
            }

            if (titleRef.current) {
                tl.to(
                    titleRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    subtitleRef.current ? "-=0.3" : 0,
                )
            }

            if (descriptionRef.current) {
                tl.to(
                    descriptionRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4",
                )
            }

            if (statementRef.current) {
                tl.to(
                    statementRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.3",
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className={`relative h-[50vh] sm:h-[48vh] md:h-[52vh] lg:h-[50vh] xl:h-[30vh] 2xl:h-[24vh] flex items-center justify-center ${className}`}
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Background overlay for better text readability */}
            {backgroundImage && <div className="absolute inset-0 bg-primary-900/85" />}

            <div className="relative z-10 w-full h-full flex items-center">
                <Container>
                    <div className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:py-0">
                        {/* Mobile-first: stacked vertically and centre-aligned on small screens */}
                        {/* Desktop: two-column layout with 65/35 split on xl+ screens (keeping tablets in mobile layout) */}
                        <div className="flex flex-col items-center text-center xl:grid xl:grid-cols-20 xl:gap-16 xl:items-center xl:text-left space-y-8 xl:space-y-0">
                            {/* Title Section - 65% width */}
                            <div className="w-full xl:text-left xl:col-span-13">
                                {/* Subtitle */}
                                {subtitle && (
                                    <p
                                        ref={subtitleRef}
                                        className="text-xs md:text-xs lg:text-md xl:pl-1 font-medium uppercase tracking-[0.08em] text-white/56 mb-4"
                                    >
                                        {subtitle}
                                    </p>
                                )}

                                {/* Title */}
                                <h1
                                    ref={titleRef}
                                    className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-raleway uppercase leading-tight tracking-[0.08em] xl:w-[80%] 2xl:w-[70%]"
                                >
                                    <span className="text-white">{title.normal}</span>
                                    <span className="text-primary-500">{title.highlight}</span>
                                </h1>
                            </div>

                            {/* Description & Statement Section - 35% width */}
                            {(description || statement) && (
                                <div className="flex flex-col items-center xl:items-end space-y-4 w-full xl:col-span-7">
                                    {/* Description */}
                                    {description && (
                                        <p
                                            ref={descriptionRef}
                                            className="text-sm font-semibold md:text-base lg:text-lg text-white/90 leading-relaxed text-center xl:text-right max-w-lg"
                                        >
                                            {description}
                                        </p>
                                    )}

                                    {/* Statement */}
                                    {statement && (
                                        <p
                                            ref={statementRef}
                                            className="text-xs md:text-sm font-light text-white/70 leading-relaxed text-center xl:text-right max-w-lg"
                                        >
                                            {statement}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
}
