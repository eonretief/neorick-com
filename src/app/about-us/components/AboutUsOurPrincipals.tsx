"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"

export default function AboutUsOurPrincipals() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const principalsRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Set initial hidden state immediately on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states immediately
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 40,
                opacity: 0,
            })

            gsap.set(contentRef.current, {
                y: 30,
                opacity: 0,
            })

            gsap.set(principalsRef.current?.children || [], {
                y: 30,
                opacity: 0,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Animation function
    const runAnimation = () => {
        const ctx = gsap.context(() => {
            // Set initial states immediately
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
                    contentRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.3",
                )
                .to(
                    principalsRef.current?.children || [],
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

    // Reset animation function
    const resetAnimation = () => {
        const ctx = gsap.context(() => {
            // Reset to initial hidden state
            gsap.set([titleRef.current, subtitleRef.current], {
                y: 40,
                opacity: 0,
            })

            gsap.set(contentRef.current, {
                y: 30,
                opacity: 0,
            })

            gsap.set(principalsRef.current?.children || [], {
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
                {/* Column structure with three rows */}
                <div className="flex flex-col items-center text-center space-y-8 2xl:space-y-16">
                    {/* Row 1: Title and Subtitle */}
                    <div className="w-full">
                        <h2
                            ref={titleRef}
                            className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                        >
                            Anchored in Experience. Advancing the Future.
                        </h2>

                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-4xl mx-auto leading-tight">
                            In an era of endless promises, true value emerges when commitment becomes consistent action.
                        </p>
                    </div>

                    {/* Row 2: Content Paragraphs */}
                    <div
                        ref={contentRef}
                        className="w-full max-w-5xl 2xl:max-w-7xl space-y-6 text-sm text-light text-neutral-900 leading-relaxed"
                    >
                        <p>
                            At Neorick, our commitments go beyond mere words; they are the foundation of every client relationship and
                            every technological solution we create. Since 1975, three guiding principles have shaped our journey from
                            a regional point-of-sale provider to a global technology partner serving multiple sectors. These
                            principles have informed our approach through technological advancements, market changes, and geographic
                            expansion, and they continue to define how we support organizations across various industries and
                            continents. They reflect not only our beliefs but also how we operate daily to deliver meaningful impact
                            and lasting value in an increasingly complex digital landscape.
                        </p>
                    </div>

                    {/* Row 3: Column Structure with Principles */}
                    <div
                        ref={principalsRef}
                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 pt-8 justify-center 2xl:[grid-template-columns:400px_400px_400px] 2xl:justify-self-center 2xl:mx-auto"
                    >
                        {/* Principle 1 */}
                        <div className="border border-neutral-700/24 rounded-lg p-6 lg:p-8 bg-white duration-300 2xl:max-w-lg">
                            <h3 className="text-lg lg:text-xl font-bold uppercase tracking-[0.04em] text-primary-500 mb-4">Trust</h3>
                            <p className="text-sm text-neutral-900/70 leading-relaxed">
                                We build lasting partnerships through transparency, honesty, and shared growth. Since 1975, clients have
                                trusted us for open communication, clear insights, and long-term commitment. This approach has shaped
                                our journey from a regional provider to a global partner clients return to with confidence.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div className="border border-neutral-700/24  rounded-lg p-6 lg:p-8 bg-white duration-300 2xl:max-w-lg">
                            <h3 className="text-lg lg:text-xl font-bold uppercase tracking-[0.04em] text-primary-500 mb-4">
                                Quality
                            </h3>
                            <p className="text-sm text-neutral-900/70 leading-relaxed">
                                We pursue excellence in everything we do. Our solutions are crafted with care, tested thoroughly, and
                                meet the highest standards. This focus on quality has driven our growth from local to global, earning
                                recognition worldwide. We continuously improve, invest in talent, and apply the latest technologies to
                                ensure our services consistently exceed expectations.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div className="border border-neutral-700/24 rounded-lg p-6 lg:p-8 bg-white duration-300 2xl:max-w-lg">
                            <h3 className="text-lg lg:text-xl font-bold uppercase tracking-[0.04em] text-primary-500 mb-4">Value</h3>
                            <p className="text-sm text-neutral-900/70 leading-relaxed">
                                We measure success by the impact we deliver. Our focus goes beyond technology to create lasting
                                advantages, operational gains, and growth opportunities. From optimizing municipal systems to advancing
                                AI and modeling, we stay committed to meaningful returns. Every solution, strategy, and insight is
                                shaped by our promise to deliver real value.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
