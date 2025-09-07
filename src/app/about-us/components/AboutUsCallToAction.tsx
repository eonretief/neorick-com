"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Button from "@/components/ui/Button"
import ContactModal from "@/components/ContactModal"
import { track } from "@vercel/analytics"
import Container from "@/components/ui/Container"

export default function AboutUsCallToAction() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const paragraphRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states immediately
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
            const tl = gsap.timeline({ delay: 0.3 })
            // Set initial states immediately
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
                    "-=0.3",
                )
        }, sectionRef)

        return () => ctx.revert()
    }

    // Reset animation function
    const resetAnimation = () => {
        const ctx = gsap.context(() => {
            // Reset to initial hidden state
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
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
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
                threshold: 0.5,
                rootMargin: "0px",
            },
        )

        observer.observe(sectionRef.current)

        return () => {
            observer.disconnect()
        }
    }, [hasAnimated])

    const handleContactClick = () => {
        track("Contact Modal Opened", {
            source: "about-us-cta",
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
                                className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-white max-w-2xl mx-auto"
                            >
                                Ready to Partner with Purpose?
                            </h2>
                        </div>

                        {/* Row 2: Paragraph */}
                        <div className="w-full pt-8">
                            <p ref={paragraphRef} className="text-sm font-light text-white/80 mx-auto max-w-lg leading-relaxed">
                                At Neorick, our story is one of enduring commitment to trust, quality, and real impact. We build
                                solutions that simplify complexity and deliver lasting value. With over 50 years of evolution from
                                regional innovators to global partners, we stand ready to collaborate on your challenges. Let's connect
                                to explore how our expertise can drive your success.
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
