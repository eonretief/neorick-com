import type React from "react"
import type { SVGProps } from "react"

interface IconListItemProps {
    icon: React.ComponentType<SVGProps<SVGSVGElement>>
    title: string
    description: string
    iconBgColor?: string
    iconColor?: string
    titleColor?: string
    descriptionColor?: string
    className?: string
}

export default function IconListItem({
                                         icon: Icon,
                                         title,
                                         description,
                                         iconBgColor = "",
                                         iconColor = "text-primary-500",
                                         descriptionColor = "text-neutral-900",
                                         className = "",
                                     }: IconListItemProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div className="flex-1">
                <p className={`text-sm leading-relaxed ${descriptionColor}`}><span className="font-bold">{title}.</span> {description}</p>
            </div>
        </div>
    )
}