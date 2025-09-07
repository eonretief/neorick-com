// src/components/navigation/NavigationConstants.tsx
export interface NavigationItem {
    name: string
    href: string
    hasSubmenu: boolean
    submenuItems?: SubmenuItem[]
    submenuThemes?: SubmenuTheme[]
}

export interface SubmenuItem {
    name: string
    href: string
}

export interface SubmenuTheme {
    title: string
    href: string
    subLinks: SubmenuItem[]
}

// Base paths to avoid repetition
const PATHS = {
    capabilities: "/capabilities",
    insights: "/insights",
    aboutUs: "/about-us",
} as const

// Capability themes configuration
const CAPABILITY_THEMES = {
    dataFoundations: {
        slug: "data-and-digital-foundations",
        title: "Data and Digital Foundations",
        subLinks: [
            { name: "Data Strategy", anchor: "data-strategy" },
            { name: "Data Governance", anchor: "data-governance" },
            { name: "Data Platforms and Architecture", anchor: "data-architecture" },
            { name: "Data Engineering", anchor: "data-engineering" },
            { name: "Data Products", anchor: "data-products" },
        ],
    },
    platformEngineering: {
        slug: "platform-engineering-and-automation",
        title: "Platform Engineering and Automation",
        subLinks: [
            { name: "Cloud and Migrations", anchor: "cloud-migrations" },
            { name: "Application Modernisation", anchor: "application-modernization" },
            { name: "Integration and Interoperability", anchor: "integration-interoperability" },
            { name: "Automation and Orchestration", anchor: "automation-orchestration" },
        ],
    },
    artificialIntelligence: {
        slug: "artificial-intelligence",
        title: "Artificial Intelligence",
        subLinks: [
            { name: "Machine Learning", anchor: "machine-learning" },
            { name: "Generative AI", anchor: "generative-ai" },
            { name: "Agentic Systems", anchor: "agentic-systems" },
            { name: "ModelOps", anchor: "model-ops" },
        ],
    },
    modelling: {
        slug: "modelling-and-simulation",
        title: "Modelling and Simulation",
        subLinks: [
            { name: "Computational Modelling", anchor: "computational-modelling" },
            { name: "Digital Twins", anchor: "digital-twins" },
        ],
    },
} as const

// Helper function to build capability theme with full URLs
const buildCapabilityTheme = (config: (typeof CAPABILITY_THEMES)[keyof typeof CAPABILITY_THEMES]): SubmenuTheme => ({
    title: config.title,
    href: `${PATHS.capabilities}/${config.slug}`,
    subLinks: config.subLinks.map((link) => ({
        name: link.name,
        href: `${PATHS.capabilities}/${config.slug}#${link.anchor}`,
    })),
})

// Generate navigation items with computed paths
export const navigationItems: NavigationItem[] = [
    {
        name: "Capabilities",
        href: "", // Empty href makes it non-clickable
        hasSubmenu: true,
        submenuThemes: [
            buildCapabilityTheme(CAPABILITY_THEMES.dataFoundations),
            buildCapabilityTheme(CAPABILITY_THEMES.platformEngineering),
            buildCapabilityTheme(CAPABILITY_THEMES.artificialIntelligence),
            buildCapabilityTheme(CAPABILITY_THEMES.modelling),
        ],
    },
    {
        name: "Insights",
        href: PATHS.insights,
        hasSubmenu: false,
    },
    {
        name: "About Us",
        href: PATHS.aboutUs,
        hasSubmenu: false,
    },
]

export const mobileNavigationItems: NavigationItem[] = [
    ...navigationItems,
    {
        name: "Legal",
        href: "",
        hasSubmenu: true,
        submenuItems: [
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms of Use", href: "/terms-of-use" },
            { name: "Cookie Policy", href: "/cookie-policy" },
        ],
    },
]
