// src/components/ui/Button.tsx
"use client"

import React, { forwardRef } from "react"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"
export type ButtonSize = "sm" | "md" | "lg"

// Base props that are shared between button and anchor variants
interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  theme?: "dark" | "light"
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  children: React.ReactNode
  className?: string
}

// Button-specific props (when no href)
interface ButtonElementProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never
  external?: never
}

// Anchor-specific props (when href is provided)
interface AnchorElementProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  href: string
  external?: boolean
}

export type ButtonProps = ButtonElementProps | AnchorElementProps

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
     variant = "primary",
     size = "md",
     theme = "dark",
     loading = false,
     leftIcon,
     rightIcon,
     fullWidth = false,
     children,
     className = "",
     ...props
   }, ref) => {
    // Base classes that apply to all buttons
    const baseClasses = [
      "inline-flex items-center justify-center",
      "font-bold tracking-[0.08em] uppercase",
      "rounded-[6px] transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ]

    // Theme-based variant styling
    const getVariantClasses = (variant: ButtonVariant, theme: "dark" | "light"): string[] => {
      const variants = {
        primary: {
          dark: [
            "bg-primary-500 text-white",
            "hover:bg-primary-900",
            "focus:ring-primary-500"
          ],
          light: [
            "bg-primary-500 text-white",
            "hover:bg-primary-900",
            "focus:ring-primary-500"
          ]
        },
        secondary: {
          dark: [
            "bg-primary-50 text-primary-900",
            "hover:bg-primary-500 hover:text-white",
            "focus:ring-primary-500"
          ],
          light: [
            "bg-primary-50 text-primary-900",
            "hover:bg-primary-500 hover:text-white",
            "focus:ring-primary-500"
          ]
        },
        outline: {
          dark: [
            "border border-primary-500 text-white bg-transparent",
            "hover:bg-primary-500 hover:text-white",
            "focus:ring-primary-500"
          ],
          light: [
            "border border-primary-500 text-[#252525] bg-transparent",
            "hover:bg-primary-500 hover:text-white",
            "focus:ring-primary-500"
          ]
        },
        ghost: {
          dark: [
            "text-white bg-transparent",
            "hover:text-primary-500",
            "focus:ring-primary-500"
          ],
          light: [
            "text-[#252525] bg-transparent",
            "hover:text-primary-500",
            "focus:ring-primary-500"
          ]
        }
      }

      return variants[variant][theme]
    }

    // Size-specific styling
    const sizeClasses: Record<ButtonSize, string[]> = {
      sm: ["text-xs py-2 px-3", "gap-1"],
      md: ["text-sm py-3 px-4", "gap-2"],
      lg: ["text-base py-4 px-6", "gap-3"]
    }

    // Combine all classes
    const buttonClasses = [
      ...baseClasses,
      ...getVariantClasses(variant, theme),
      ...sizeClasses[size],
      fullWidth && "w-full",
      loading && "cursor-wait",
      className
    ].filter(Boolean).join(" ")

    // Handle loading state
    const buttonContent = (
      <>
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && leftIcon}
        <span className={loading ? "opacity-0" : ""}>{children}</span>
        {!loading && rightIcon && rightIcon}
      </>
    )

    // Check if this should render as a link
    const isLink = "href" in props && props.href

    // Render as the link if href is provided
    if (isLink) {
      const { href, external, ...anchorProps } = props as Extract<ButtonProps, { href: string }>

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={buttonClasses}
          {...anchorProps}
        >
          {buttonContent}
        </a>
      )
    }

    // Render as the button
    const buttonProps = props as Extract<ButtonProps, { href?: never }>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClasses}
        disabled={loading || buttonProps.disabled}
        {...buttonProps}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button