"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Button from "@/components/ui/Button"
import ContactModal from "@/components/ContactModal"
import { track } from "@vercel/analytics"
import Container from "@/components/ui/Container"

export default function DataFoundationsCallToAction() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const paragraphRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, paragraphRef.current, buttonRef.current], {
                y: 40,
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
                    paragraphRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4",
                )
                .to(
                    buttonRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.2",
                )
        }, sectionRef)

        return () => ctx.revert()
    }

    // Reset animation function
    const resetAnimation = () => {
        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, paragraphRef.current, buttonRef.current], {
                y: 40,
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

    const handleContactClick = () => {
        track("Contact Modal Opened", {
            source: "data-foundations-cta",
        })
        setIsContactModalOpen(true)
    }

    const handleContactModalClose = () => {
        setIsContactModalOpen(false)
    }

    return (
        <>
            <section
                ref={sectionRef}
                className="w-full min-h-[calc(100svh-80px-60px)] lg:min-h-[calc(100svh-94px-60px)] bg-primary-900 flex items-center justify-center py-8 sm:py-16"
            >
                <Container className="px-6">
                    {/* Centered column with three rows */}
                    <div className="flex flex-col items-center justify-center text-center space-y-8">
                        {/* Row 1: Header */}
                        <div className="w-full">
                            <h2
                                ref={titleRef}
                                className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-white max-w-2xl 2xl:max-w-4xl mx-auto"
                            >
                                Ready to Streamline Your Platforms?
                            </h2>
                        </div>

                        {/* Row 2: Paragraph */}
                        <div className="w-full pt-8">
                            <p ref={paragraphRef} className="text-sm font-light text-white/80 mx-auto max-w-lg leading-relaxed">
                                At Neorick, we engineer platforms and automation that cut through complexity, delivering
                                resilient systems that boost efficiency and innovation. With our proven expertise, we
                                ensure every solution aligns with your goals, focusing on real impact and long-term value.
                                Let's explore how we can transform your operations into a seamless, future-ready ecosystem.
                            </p>
                        </div>

                        {/* Row 3: Button */}
                        <div ref={buttonRef} className="w-full pt-16">
                            <Button variant="primary" size="lg" onClick={handleContactClick} theme="light" className="mx-auto">
                                Get in Touch
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isContactModalOpen} onCloseAction={handleContactModalClose} />
        </>
    )
}
