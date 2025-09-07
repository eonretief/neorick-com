// src/components/navigation/mobile/HamburgerButton.tsx
"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

interface HamburgerButtonProps {
  isOpen: boolean
  onClickAction: () => void
  className?: string
  theme?: "dark" | "light"
}

export default function HamburgerButton({
                                          isOpen,
                                          onClickAction,
                                          className = "",
                                          theme = "dark"
                                        }: HamburgerButtonProps) {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)

  const lineColor = theme === "light" ? "bg-[#252525]" : "bg-white"

  useEffect(() => {
    const tl = gsap.timeline()

    if (isOpen) {
      // Transform to X
      tl.to(line1Ref.current, {
        y: 8,
        rotation: 45,
        duration: 0.3,
        ease: "power2.out"
      })
        .to(line2Ref.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.3")
        .to(line3Ref.current, {
          y: -8,
          rotation: -45,
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.3")
    } else {
      // Transform back to hamburger
      tl.to(line1Ref.current, {
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      })
        .to(line2Ref.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.2")
        .to(line3Ref.current, {
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.3")
    }
  }, [isOpen])

  return (
    <button
      onClick={onClickAction}
      className={`relative w-8 h-8 flex flex-col justify-center items-center ${className}`}
      aria-label="Toggle menu"
    >
      <div
        ref={line1Ref}
        className={`w-6 h-0.5 ${lineColor} mb-1.5 transform-gpu origin-center`}
      />
      <div
        ref={line2Ref}
        className={`w-6 h-0.5 ${lineColor} mb-1.5 transform-gpu`}
      />
      <div
        ref={line3Ref}
        className={`w-6 h-0.5 ${lineColor} transform-gpu origin-center`}
      />
    </button>
  )
}