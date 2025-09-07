import type React from "react"

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div
            className={`mx-auto w-full max-w-[98%] md:max-w-[95%] lg:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[60%] ${className}`}
        >
            {children}
        </div>
    )
}
