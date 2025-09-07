import Link from "next/link"
import Container from "./ui/Container"

interface FooterProps {
    className?: string
    theme?: "dark" | "light"
    bgColor?: string
}

export default function Footer({ className = "", theme = "dark", bgColor }: FooterProps) {
    // Theme-based text colours
    const textColorWithOpacity = theme === "light" ? "text-neutral-900 opacity-50" : "text-white opacity-50"
    const hoverColor = "hover:opacity-75"

    return (
        <footer className={`fixed bottom-0 left-0 w-full z-20 h-[60px] ${bgColor ? bgColor : ""} ${className}`}>
            <Container className="h-full">
                <div className="flex items-center justify-between px-6 h-full text-center sm:text-left">
                    <div
                        className={`
                w-full sm:w-auto 
                ${textColorWithOpacity} text-[0.4rem] lg:text-[0.6rem] font-medium uppercase tracking-[0.1em]
            `}
                    >
                        © {new Date().getFullYear()} Neorick (PTY) Ltd. All rights reserved.
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                        <Link
                            href="/privacy-policy"
                            className={`
                    ${textColorWithOpacity} ${hoverColor} text-[0.4rem] lg:text-[0.6rem] font-medium uppercase tracking-[0.1em] 
                    transition-opacity
                `}
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms-of-use"
                            className={`
                    ${textColorWithOpacity} ${hoverColor} text-[0.4rem] lg:text-[0.6rem] font-medium uppercase tracking-[0.1em] 
                    transition-opacity
                `}
                        >
                            Terms of Use
                        </Link>

                        <Link
                            href="/cookie-policy"
                            className={`
                    ${textColorWithOpacity} ${hoverColor} text-[0.4rem] lg:text-[0.6rem] font-medium uppercase tracking-[0.1em] 
                    transition-opacity
                `}
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
