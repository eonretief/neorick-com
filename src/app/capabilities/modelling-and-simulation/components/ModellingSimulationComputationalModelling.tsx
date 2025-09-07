"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Container from "@/components/ui/Container"
import { ModellingSimulationComputationalModellingImage} from "@/app/capabilities/modelling-and-simulation/assets/ComputationalModellingImage"

export default function ModellingSimulationComputationalModelling() {
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
                {/* Row 2: Two-column content */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-start">
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <h2
                            ref={titleRef}
                            className="text-3xl lg:text-4xl 2xl:text-6xl font-black uppercase leading-tight tracking-[0.04em] text-neutral-900 mb-4"
                        >
                            Unlocking Nature’s Code
                        </h2>
                        <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight pb-8">
                            Decode phenomena for deeper understanding.
                        </p>
                        <p>
                            We create models that represent real processes mathematically. This allows testing scenarios
                            safely, accelerating breakthroughs in science and business. Our computational models leverage
                            advanced algorithms to simulate intricate systems, providing precise predictions and optimizations
                            that inform strategic decisions without the need for costly physical trials.
                        </p>
                        <h3 className="font-bold text-2xl text-primary-500 pt-8">Common Use Cases</h3>
                        <p>
                            <span className="font-bold">Process Simulation.</span> Simulate operational workflows to
                            pinpoint inefficiencies and test enhancements in a safe, virtual setting, streamlining real-
                            world operations.
                        </p>
                        <p>
                            <span className="font-bold">Trend Prediction.</span> Model market or environmental dynamics
                            to anticipate future scenarios, empowering proactive strategies that mitigate risks and seize
                            opportunities.
                        </p>
                        <p>
                            <span className="font-bold">Optimization.</span> Fine-tune variables in intricate systems
                            like supply chains or resource allocation, achieving peak efficiency and substantial cost
                            reductions.
                        </p>
                        <p>
                            <span className="font-bold">Fluid Dynamics.</span> Replicate fluid behaviors in engineering
                            or physical systems to analyze flows, pressures, and interactions, accelerating design
                            innovations and reducing experimental costs.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center items-center min-h-[320px]">
                        <div className="w-3/4 sm:w-full md:w-full lg:w-4/5 xl:w-[80%] max-w-full flex justify-center">
                            <ModellingSimulationComputationalModellingImage className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
