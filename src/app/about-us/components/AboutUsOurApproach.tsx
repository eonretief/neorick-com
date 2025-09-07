"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import Container from "@/components/ui/Container"

export default function AboutUsOurApproach() {
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
                        Adapt by Design. Not by Force.
                    </h2>

                    <p ref={subtitleRef} className="text-md lg:text-lg text-neutral-900/56 max-w-7xl leading-tight">
                        When the landscape shifts, true strength lies not just in standing firm but in remaining relevant.
                    </p>
                </div>

                {/* Row 2: Two-column content */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Column 1 */}
                    <div className="space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                        <p>
                            At Neorick, we recognize the importance of staying relevant in a rapidly changing world. The story of the
                            Choluteca Bridge in Honduras serves as both our inspiration and cautionary tale.
                        </p>

                        <p>
                            Known as "the bridge to nowhere," the Choluteca Bridge was designed by Japanese engineers to withstand the
                            most severe weather conditions in a hurricane-prone region. When Hurricane Mitch devastated Honduras in
                            1998, the bridge stood firm—a testament to excellent engineering and robust design.
                        </p>

                        <p>
                            However, the immense force of the hurricane completely redirected the Choluteca River, carving a new path
                            that bypassed the bridge entirely. The structure remained intact, but suddenly found itself spanning dry
                            land, with the river flowing elsewhere. It was still perfectly functional, but entirely irrelevant.
                        </p>
                        <Image
                            src="/assets/images/4071938265.jpg"
                            alt=""
                            width={600}
                            height={400}
                            className="md:block lg:hidden rounded-lg object-cover w-full h-auto pt-4 pb-4"
                        />
                        <p>
                            This powerful metaphor guides our philosophy at Neorick. In today's rapidly evolving technological
                            landscape, solutions must not only be technically sound but must also remain relevant as the environment
                            changes. True resilience comes not just from withstanding disruption but from adapting effectively when
                            the landscape shifts beneath us.
                        </p>
                        <p>
                            By questioning every assumption and returning to first principles, we create solutions that address root
                            causes rather than symptoms. The result is adaptable architectures that drive measurable business value by
                            focusing resources precisely where they matter most. Our experience confirms what great innovators have
                            always known: the most elegant solutions are rarely the most complex; they're the ones that precisely
                            target the fundamental drivers of success.
                        </p>
                        <p className="hidden 2xl:block">
                            In a world overwhelmed by data and technological complexity, we've mastered the art of distillation. Where
                            others see impenetrable challenges, we recognize patterns; where conventional approaches add layers of
                            complication, we strip away the extraneous to reveal the fundamental drivers of change and value. This
                            commitment to clarity defines our approach to deliberately cutting through noise to break down complex
                            problems into their essential building blocks.
                        </p>
                    </div>

                    {/* Column 2 - Row structure */}
                    <div className="flex flex-col space-y-8 items-center justify-around">
                        {/* Row 1: Text content */}
                        <div className="-mt-8 md:mt-0 2xl:hidden space-y-6 text-sm text-light text-neutral-900 leading-relaxed">
                            <p>
                                In a world overwhelmed by data and technological complexity, we've mastered the art of distillation.
                                Where others see impenetrable challenges, we recognize patterns; where conventional approaches add
                                layers of complication, we strip away the extraneous to reveal the fundamental drivers of change and
                                value. This commitment to clarity defines our approach to deliberately cutting through noise to break
                                down complex problems into their essential building blocks.
                            </p>
                        </div>

                        {/* Row 2: Image */}
                        <div className="hidden lg:block flex justify-center lg:justify-start">
                            <div className="relative w-full max-w-md lg:max-w-lg 2xl:max-w-2xl 2xl:-mt-8">
                                <Image
                                    src="/assets/images/4071938265.jpg"
                                    alt=""
                                    width={600}
                                    height={400}
                                    className="rounded-lg object-cover w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
