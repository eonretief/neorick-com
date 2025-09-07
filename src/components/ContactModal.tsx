"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { Turnstile } from "@marsidev/react-turnstile"
import gsap from "gsap"
import { submitContactForm, type ContactFormData, type ActionResult } from "@/actions/contact"
import { track } from "@vercel/analytics"

interface ContactModalProps {
    isOpen: boolean
    onCloseAction: () => void
}

interface ValidationErrors {
    [key: string]: string
}

interface FormData extends ContactFormData {
    privacyConsent: boolean
    contactConsent: boolean
}

// Country codes for phone number validation (sorted alphabetically by country name)
const COUNTRY_CODES = [
    { code: "", country: "Select country code" },
    { code: "+93", country: "Afghanistan" },
    { code: "+355", country: "Albania" },
    { code: "+213", country: "Algeria" },
    { code: "+684", country: "American Samoa" },
    { code: "+376", country: "Andorra" },
    { code: "+244", country: "Angola" },
    { code: "+672", country: "Antarctica" },
    { code: "+374", country: "Armenia" },
    { code: "+297", country: "Aruba" },
    { code: "+61", country: "Australia" },
    { code: "+43", country: "Austria" },
    { code: "+994", country: "Azerbaijan" },
    { code: "+973", country: "Bahrain" },
    { code: "+880", country: "Bangladesh" },
    { code: "+375", country: "Belarus" },
    { code: "+32", country: "Belgium" },
    { code: "+501", country: "Belize" },
    { code: "+229", country: "Benin" },
    { code: "+975", country: "Bhutan" },
    { code: "+591", country: "Bolivia" },
    { code: "+387", country: "Bosnia and Herzegovina" },
    { code: "+267", country: "Botswana" },
    { code: "+55", country: "Brazil" },
    { code: "+246", country: "British Indian Ocean Territory" },
    { code: "+673", country: "Brunei" },
    { code: "+359", country: "Bulgaria" },
    { code: "+226", country: "Burkina Faso" },
    { code: "+257", country: "Burundi" },
    { code: "+855", country: "Cambodia" },
    { code: "+237", country: "Cameroon" },
    { code: "+1", country: "Canada" },
    { code: "+238", country: "Cape Verde" },
    { code: "+236", country: "Central African Republic" },
    { code: "+235", country: "Chad" },
    { code: "+56", country: "Chile" },
    { code: "+86", country: "China" },
    { code: "+57", country: "Colombia" },
    { code: "+269", country: "Comoros" },
    { code: "+682", country: "Cook Islands" },
    { code: "+506", country: "Costa Rica" },
    { code: "+385", country: "Croatia" },
    { code: "+53", country: "Cuba" },
    { code: "+357", country: "Cyprus" },
    { code: "+420", country: "Czech Republic" },
    { code: "+243", country: "Democratic Republic of the Congo" },
    { code: "+45", country: "Denmark" },
    { code: "+253", country: "Djibouti" },
    { code: "+670", country: "East Timor" },
    { code: "+593", country: "Ecuador" },
    { code: "+20", country: "Egypt" },
    { code: "+503", country: "El Salvador" },
    { code: "+240", country: "Equatorial Guinea" },
    { code: "+291", country: "Eritrea" },
    { code: "+372", country: "Estonia" },
    { code: "+251", country: "Ethiopia" },
    { code: "+500", country: "Falkland Islands" },
    { code: "+298", country: "Faroe Islands" },
    { code: "+679", country: "Fiji" },
    { code: "+358", country: "Finland" },
    { code: "+33", country: "France" },
    { code: "+594", country: "French Guiana" },
    { code: "+689", country: "French Polynesia" },
    { code: "+241", country: "Gabon" },
    { code: "+220", country: "Gambia" },
    { code: "+995", country: "Georgia" },
    { code: "+49", country: "Germany" },
    { code: "+233", country: "Ghana" },
    { code: "+350", country: "Gibraltar" },
    { code: "+30", country: "Greece" },
    { code: "+299", country: "Greenland" },
    { code: "+590", country: "Guadeloupe" },
    { code: "+502", country: "Guatemala" },
    { code: "+224", country: "Guinea" },
    { code: "+245", country: "Guinea-Bissau" },
    { code: "+592", country: "Guyana" },
    { code: "+509", country: "Haiti" },
    { code: "+504", country: "Honduras" },
    { code: "+852", country: "Hong Kong" },
    { code: "+36", country: "Hungary" },
    { code: "+354", country: "Iceland" },
    { code: "+91", country: "India" },
    { code: "+62", country: "Indonesia" },
    { code: "+98", country: "Iran" },
    { code: "+964", country: "Iraq" },
    { code: "+353", country: "Ireland" },
    { code: "+972", country: "Israel" },
    { code: "+39", country: "Italy" },
    { code: "+225", country: "Ivory Coast" },
    { code: "+81", country: "Japan" },
    { code: "+962", country: "Jordan" },
    { code: "+7", country: "Kazakhstan" },
    { code: "+254", country: "Kenya" },
    { code: "+686", country: "Kiribati" },
    { code: "+383", country: "Kosovo" },
    { code: "+965", country: "Kuwait" },
    { code: "+996", country: "Kyrgyzstan" },
    { code: "+856", country: "Laos" },
    { code: "+371", country: "Latvia" },
    { code: "+961", country: "Lebanon" },
    { code: "+266", country: "Lesotho" },
    { code: "+231", country: "Liberia" },
    { code: "+218", country: "Libya" },
    { code: "+423", country: "Liechtenstein" },
    { code: "+370", country: "Lithuania" },
    { code: "+352", country: "Luxembourg" },
    { code: "+853", country: "Macao" },
    { code: "+261", country: "Madagascar" },
    { code: "+265", country: "Malawi" },
    { code: "+960", country: "Maldives" },
    { code: "+60", country: "Malaysia" },
    { code: "+223", country: "Mali" },
    { code: "+356", country: "Malta" },
    { code: "+692", country: "Marshall Islands" },
    { code: "+596", country: "Martinique" },
    { code: "+222", country: "Mauritania" },
    { code: "+230", country: "Mauritius" },
    { code: "+52", country: "Mexico" },
    { code: "+691", country: "Micronesia" },
    { code: "+373", country: "Moldova" },
    { code: "+377", country: "Monaco" },
    { code: "+976", country: "Mongolia" },
    { code: "+382", country: "Montenegro" },
    { code: "+212", country: "Morocco" },
    { code: "+258", country: "Mozambique" },
    { code: "+95", country: "Myanmar" },
    { code: "+264", country: "Namibia" },
    { code: "+674", country: "Nauru" },
    { code: "+977", country: "Nepal" },
    { code: "+31", country: "Netherlands" },
    { code: "+599", country: "Netherlands Antilles" },
    { code: "+687", country: "New Caledonia" },
    { code: "+64", country: "New Zealand" },
    { code: "+505", country: "Nicaragua" },
    { code: "+227", country: "Niger" },
    { code: "+234", country: "Nigeria" },
    { code: "+683", country: "Niue" },
    { code: "+850", country: "North Korea" },
    { code: "+389", country: "North Macedonia" },
    { code: "+47", country: "Norway" },
    { code: "+968", country: "Oman" },
    { code: "+92", country: "Pakistan" },
    { code: "+680", country: "Palau" },
    { code: "+970", country: "Palestine" },
    { code: "+507", country: "Panama" },
    { code: "+675", country: "Papua New Guinea" },
    { code: "+595", country: "Paraguay" },
    { code: "+51", country: "Peru" },
    { code: "+63", country: "Philippines" },
    { code: "+48", country: "Poland" },
    { code: "+351", country: "Portugal" },
    { code: "+974", country: "Qatar" },
    { code: "+242", country: "Republic of the Congo" },
    { code: "+262", country: "Reunion" },
    { code: "+40", country: "Romania" },
    { code: "+7", country: "Russia" },
    { code: "+250", country: "Rwanda" },
    { code: "+290", country: "Saint Helena" },
    { code: "+508", country: "Saint Pierre and Miquelon" },
    { code: "+685", country: "Samoa" },
    { code: "+378", country: "San Marino" },
    { code: "+239", country: "Sao Tome and Principe" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+221", country: "Senegal" },
    { code: "+381", country: "Serbia" },
    { code: "+248", country: "Seychelles" },
    { code: "+232", country: "Sierra Leone" },
    { code: "+65", country: "Singapore" },
    { code: "+421", country: "Slovakia" },
    { code: "+386", country: "Slovenia" },
    { code: "+677", country: "Solomon Islands" },
    { code: "+252", country: "Somalia" },
    { code: "+27", country: "South Africa" },
    { code: "+82", country: "South Korea" },
    { code: "+34", country: "Spain" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+249", country: "Sudan" },
    { code: "+597", country: "Suriname" },
    { code: "+268", country: "Swaziland" },
    { code: "+46", country: "Sweden" },
    { code: "+41", country: "Switzerland" },
    { code: "+963", country: "Syria" },
    { code: "+886", country: "Taiwan" },
    { code: "+992", country: "Tajikistan" },
    { code: "+255", country: "Tanzania" },
    { code: "+66", country: "Thailand" },
    { code: "+228", country: "Togo" },
    { code: "+690", country: "Tokelau" },
    { code: "+676", country: "Tonga" },
    { code: "+216", country: "Tunisia" },
    { code: "+90", country: "Turkey" },
    { code: "+993", country: "Turkmenistan" },
    { code: "+688", country: "Tuvalu" },
    { code: "+256", country: "Uganda" },
    { code: "+380", country: "Ukraine" },
    { code: "+971", country: "United Arab Emirates" },
    { code: "+44", country: "United Kingdom" },
    { code: "+1", country: "United States" },
    { code: "+598", country: "Uruguay" },
    { code: "+998", country: "Uzbekistan" },
    { code: "+678", country: "Vanuatu" },
    { code: "+58", country: "Venezuela" },
    { code: "+84", country: "Vietnam" },
    { code: "+681", country: "Wallis and Futuna" },
    { code: "+967", country: "Yemen" },
    { code: "+260", country: "Zambia" },
    { code: "+263", country: "Zimbabwe" },
]

// Industry options for the custom dropdown
const INDUSTRY_OPTIONS = [
    { value: "", label: "Select your industry" },
    { value: "Aerospace & Defense", label: "Aerospace & Defense" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Communications", label: "Communications" },
    { value: "Education", label: "Education" },
    { value: "Energy & Materials", label: "Energy & Materials" },
    { value: "Energy", label: "Energy" },
    { value: "Engineering & Construction", label: "Engineering & Construction" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Healthcare & Life Sciences", label: "Healthcare & Life Sciences" },
    { value: "Logistics & Supply Chain", label: "Logistics & Supply Chain" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Media & Entertainment", label: "Media & Entertainment" },
    { value: "Other", label: "Other" },
    { value: "Public Sector", label: "Public Sector" },
    { value: "Retail & Consumer Goods", label: "Retail & Consumer Goods" },
    { value: "Technology & Software", label: "Technology & Software" },
    { value: "Travel & Transportation", label: "Travel & Transportation" },
]

export default function ContactModal({ isOpen, onCloseAction }: ContactModalProps) {
    const contentRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const successContentRef = useRef<HTMLDivElement>(null)
    const turnstileRef = useRef<any>(null)

    // Form state
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        company: "",
        industry: "",
        email: "",
        contactNumber: "",
        message: "",
        turnstileToken: "",
        privacyConsent: false,
        contactConsent: false,
    })

    const [countryCode, setCountryCode] = useState("")
    const [showCountryDropdown, setShowCountryDropdown] = useState(false)
    const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                firstName: "",
                lastName: "",
                company: "",
                industry: "",
                email: "",
                contactNumber: "",
                message: "",
                turnstileToken: "",
                privacyConsent: false,
                contactConsent: false,
            })
            setCountryCode("")
            setShowCountryDropdown(false)
            setShowIndustryDropdown(false)
            setErrors({})
            setSubmitSuccess(false)
            setSubmitError(null)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            track("Contact Modal Opened")
        }
    }, [isOpen])

    const handleClose = (closeMethod: string) => {
        track("Contact Modal Closed", { method: closeMethod })
        onCloseAction()
    }

    // Handle clicking outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest(".country-dropdown-container")) {
                setShowCountryDropdown(false)
            }
            if (!target.closest(".industry-dropdown-container")) {
                setShowIndustryDropdown(false)
            }
        }

        if (showCountryDropdown || showIndustryDropdown) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [showCountryDropdown, showIndustryDropdown])

    // Animation setup when modal opens
    useEffect(() => {
        if (isOpen && contentRef.current && titleRef.current && descriptionRef.current) {
            const ctx = gsap.context(() => {
                gsap.set([titleRef.current, descriptionRef.current], {
                    y: 30,
                    opacity: 0,
                })

                const tl = gsap.timeline({ delay: 0.1 })

                tl.to(titleRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                }).to(
                    descriptionRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "-=0.2",
                )
            }, contentRef)

            return () => ctx.revert()
        }
    }, [isOpen])

    // Animation for success modal
    useEffect(() => {
        if (submitSuccess && successContentRef.current) {
            // Set the initial state
            gsap.set(successContentRef.current, {
                scale: 0.8,
                opacity: 0,
            })

            // Animate in with a bounce effect
            gsap.to(successContentRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
            })
        }
    }, [submitSuccess])

    // Handle Turnstile success
    const handleTurnstileSuccess = (token: string) => {
        setFormData((prev) => ({ ...prev, turnstileToken: token }))
        setErrors((prev) => ({ ...prev, turnstile: "", turnstileToken: "" }))
    }

    // Handle Turnstile error
    const handleTurnstileError = () => {
        setFormData((prev) => ({ ...prev, turnstileToken: "" }))
        setErrors((prev) => ({ ...prev, turnstile: "Security verification failed. Please try again." }))
    }

    // Validation functions
    const validateEmail = (email: string): string | null => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim()) return "This field is required"
        if (!emailRegex.test(email)) return "Please enter a valid email address"
        return null
    }

    const validatePhone = (phone: string): string | null => {
        if (!phone.trim()) return "This field is required"
        const phoneRegex = /^[\d\s\-$$$$]{7,15}$/
        if (!phoneRegex.test(phone)) return "Please enter a valid phone number"
        return null
    }

    const validateRequired = (value: string): string | null => {
        if (!value.trim()) return "This field is required"
        return null
    }

    const validateMessage = (message: string): string | null => {
        if (!message.trim()) return "This field is required"
        if (message.length < 10) return "Message must be at least 10 characters"
        if (message.length > 1000) return "Message is too long (max 1000 characters)"
        return null
    }

    // Real-time validation
    const validateField = (name: string, value: string) => {
        let error: string | null = null

        switch (name) {
            case "firstName":
            case "lastName":
            case "company":
            case "industry":
                error = validateRequired(value)
                break
            case "email":
                error = validateEmail(value)
                break
            case "contactNumber":
                error = validatePhone(value)
                break
            case "message":
                error = validateMessage(value)
                break
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error || "",
        }))

        return error === null
    }

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear submit errors
        setSubmitError(null)

        // Validate field on blur for better UX
        if (e.type === "blur") {
            validateField(name, value)
        }
    }

    // Fixed the checkbox handler to handle both checkboxes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData((prev) => ({ ...prev, [name]: checked }))
        setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Validate the entire form
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {}

        // Validate all fields
        const firstNameError = validateRequired(formData.firstName)
        const lastNameError = validateRequired(formData.lastName)
        const companyError = validateRequired(formData.company)
        const industryError = validateRequired(formData.industry)
        const emailError = validateEmail(formData.email)
        const phoneError = validatePhone(formData.contactNumber)
        const messageError = validateMessage(formData.message)

        if (firstNameError) newErrors.firstName = firstNameError
        if (lastNameError) newErrors.lastName = lastNameError
        if (companyError) newErrors.company = companyError
        if (industryError) newErrors.industry = industryError
        if (emailError) newErrors.email = emailError
        if (phoneError) newErrors.contactNumber = phoneError
        if (messageError) newErrors.message = messageError

        if (!countryCode) {
            newErrors.countryCode = "Please select a country code"
        }

        if (!formData.privacyConsent) {
            newErrors.privacyConsent = "Please agree to the privacy policy"
        }

        if (!formData.turnstileToken) {
            newErrors.turnstile = "Please complete the security verification"
        }

        // Note: contactConsent is optional, so no validation error needed

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        setSubmitError(null)

        try {
            // Combine country code with the phone number
            const fullContactNumber = `${countryCode} ${formData.contactNumber}`

            const submissionData: ContactFormData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                company: formData.company,
                industry: formData.industry,
                email: formData.email,
                contactNumber: fullContactNumber,
                message: formData.message,
                contactConsent: formData.contactConsent,
                turnstileToken: formData.turnstileToken,
            }

            const result: ActionResult = await submitContactForm(submissionData)

            if (result.success) {
                // Animate out the form with scale effect
                gsap.to(contentRef.current, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.4,
                    ease: "back.in(1.7)",
                    onComplete: () => {
                        setSubmitSuccess(true)
                        // Auto-close after success (optional)
                        setTimeout(() => {
                            onCloseAction()
                        }, 2500)
                    },
                })
            } else {
                setSubmitError(result.error || "An error occurred")
                if (result.fieldErrors) {
                    setErrors((prev) => ({
                        ...prev,
                        ...Object.fromEntries(Object.entries(result.fieldErrors!).map(([key, messages]) => [key, messages[0]])),
                    }))
                }

                // Reset Turnstile on error
                if (turnstileRef.current) {
                    turnstileRef.current.reset()
                }
                setFormData((prev) => ({ ...prev, turnstileToken: "" }))
            }
        } catch (error) {
            console.error("Form submission error:", error)
            setSubmitError("An unexpected error occurred. Please try again.")

            // Reset Turnstile on error
            if (turnstileRef.current) {
                turnstileRef.current.reset()
            }
            setFormData((prev) => ({ ...prev, turnstileToken: "" }))
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitSuccess) {
        return (
            <Dialog open={isOpen} onClose={() => handleClose("backdrop")} className="relative z-[10300]">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-primary-900/80 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-6 pt-6 pb-6 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95 lg:max-w-2xl"
                        >
                            <div ref={successContentRef} className="text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-6">
                                    <svg
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>

                                <DialogTitle className="text-2xl font-bold font-raleway text-primary-900 uppercase tracking-[0.08em] mb-4">
                                    Thank You!
                                </DialogTitle>

                                <p className="text-sm text-primary-900/70 leading-relaxed mb-6">
                                    Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                                </p>

                                <button
                                    onClick={() => handleClose("success-close-button")}
                                    className="inline-flex justify-center rounded-[6px] bg-primary-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-sm hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onClose={() => handleClose("backdrop")} className="relative z-[10300]">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-primary-900/80 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-6 pt-6 pb-6 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95 lg:max-w-3xl"
                    >
                        {/* Close button */}
                        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                            <button
                                type="button"
                                onClick={() => handleClose("x-button")}
                                className="rounded-md bg-transparent text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div ref={contentRef}>
                            {/* Icon placeholder */}
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 mb-6">
                                <svg
                                    className="h-6 w-6 text-primary-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    />
                                </svg>
                            </div>

                            <div className="text-center">
                                {/* Title */}
                                <DialogTitle
                                    ref={titleRef}
                                    as="h3"
                                    className="text-2xl font-bold font-raleway text-primary-900 uppercase tracking-[0.08em] mb-4"
                                >
                                    Get in Touch
                                </DialogTitle>

                                {/* Description */}
                                <div className="mb-8">
                                    <p ref={descriptionRef} className="text-sm text-primary-900/70 leading-relaxed">
                                        Ready to transform your business? Let&apos;s discuss how we can help you build data and technology
                                        solutions that cut through complexity and drive real results.
                                    </p>
                                </div>

                                {/* Global Error */}
                                {submitError && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[6px]">
                                        <p className="text-sm text-red-600">{submitError}</p>
                                    </div>
                                )}

                                {/* Contact Form */}
                                <form onSubmit={handleSubmit} className="space-y-6 mb-6">
                                    {/* Line 1: First Name & Last Name */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                            >
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                onBlur={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-[6px] border ${errors.firstName ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm placeholder-primary-900/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && (
                                                <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.firstName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                            >
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                onBlur={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-[6px] border ${errors.lastName ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm placeholder-primary-900/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    {/* Line 2: Company & Industry */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="company"
                                                className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                            >
                                                Company *
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                onBlur={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-[6px] border ${errors.company ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm placeholder-primary-900/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter your company name"
                                            />
                                            {errors.company && <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.company}</p>}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="industry"
                                                className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                            >
                                                Industry *
                                            </label>
                                            {/* Custom Industry Dropdown */}
                                            <div className="relative industry-dropdown-container">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                                                    className={`w-full px-4 py-3 rounded-[6px] border ${errors.industry ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-left flex items-center justify-between`}
                                                >
                          <span className={`truncate ${!formData.industry ? "text-primary-900/40" : ""}`}>
                            {formData.industry
                                ? INDUSTRY_OPTIONS.find((opt) => opt.value === formData.industry)?.label
                                : "Select your industry"}
                          </span>
                                                    <ChevronDownIcon className="h-4 w-4 ml-2 flex-shrink-0" />
                                                </button>

                                                {showIndustryDropdown && (
                                                    <div className="absolute top-full left-0 w-full max-h-48 overflow-auto bg-white border border-primary-900/20 rounded-[6px] shadow-lg z-50 mt-1">
                                                        {INDUSTRY_OPTIONS.map((option, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData((prev) => ({
                                                                        ...prev,
                                                                        industry: option.value,
                                                                    }))
                                                                    setShowIndustryDropdown(false)
                                                                    setErrors((prev) => ({ ...prev, industry: "" }))
                                                                }}
                                                                disabled={option.value === ""}
                                                                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                                    option.value === ""
                                                                        ? "text-primary-900/40 cursor-default"
                                                                        : `hover:bg-primary-50 ${formData.industry === option.value ? "bg-primary-100 text-primary-900" : "text-primary-900"}`
                                                                }`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.industry && <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.industry}</p>}
                                        </div>
                                    </div>

                                    {/* Line 3: Email & Contact Number */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                            >
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onBlur={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-[6px] border ${errors.email ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm placeholder-primary-900/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                                                placeholder="Enter your email address"
                                            />
                                            {errors.email && <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contactNumber"
                                                className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                            >
                                                Contact Number *
                                            </label>
                                            <div className="flex">
                                                {/* Custom Country Code Dropdown */}
                                                <div className="relative country-dropdown-container">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                        className={`w-20 px-2 py-3 rounded-l-[6px] border border-r-0 ${errors.countryCode ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-left flex items-center justify-between`}
                                                    >
                            <span className={`truncate pl-2 ${!countryCode ? "text-primary-900/40" : ""}`}>
                              {countryCode || "+00"}
                            </span>
                                                        <ChevronDownIcon className="h-3 w-3 ml-1 flex-shrink-0" />
                                                    </button>

                                                    {showCountryDropdown && (
                                                        <div className="absolute top-full left-0 w-72 max-h-48 overflow-auto bg-white border border-primary-900/20 rounded-[6px] shadow-lg z-50 mt-1">
                                                            {COUNTRY_CODES.map((country, index) => (
                                                                <button
                                                                    key={`${country.code}-${index}`}
                                                                    data-country-index={index}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setCountryCode(country.code)
                                                                        setShowCountryDropdown(false)
                                                                        setErrors((prev) => ({ ...prev, countryCode: "" }))
                                                                    }}
                                                                    disabled={country.code === ""}
                                                                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                                        country.code === ""
                                                                            ? "text-primary-900/40 cursor-default"
                                                                            : `hover:bg-primary-50 focus:bg-primary-100 ${countryCode === country.code ? "bg-primary-100 text-primary-900" : "text-primary-900"}`
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <span className="w-12 flex-shrink-0 font-medium text-right">{country.code}</span>
                                                                        {country.code && <span className="text-primary-900/60 ml-1">-</span>}
                                                                        <span className="ml-2">{country.country}</span>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Phone Number Input */}
                                                <input
                                                    type="tel"
                                                    id="contactNumber"
                                                    name="contactNumber"
                                                    value={formData.contactNumber}
                                                    onChange={handleInputChange}
                                                    onBlur={handleInputChange}
                                                    className={`flex-1 px-4 py-3 rounded-r-[6px] border ${errors.contactNumber || errors.countryCode ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm placeholder-primary-900/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                                                    placeholder="123 456 7890"
                                                />
                                            </div>
                                            {errors.countryCode && (
                                                <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.countryCode}</p>
                                            )}
                                            {errors.contactNumber && (
                                                <p className="mt-1 text-xs text-red-600 text-left pl-2">{errors.contactNumber}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Line 4: Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-xs font-medium uppercase tracking-[0.08em] text-primary-900 pl-2 mb-2 text-left"
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            onBlur={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-[6px] border ${errors.message ? "border-red-300 bg-red-50" : "border-primary-900/20"} bg-white text-primary-900 text-sm placeholder-primary-900/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical`}
                                            placeholder="Tell us about your project or how we can help..."
                                        />
                                        <div className="flex justify-between mt-1">
                                            {errors.message && <p className="text-xs text-red-600 text-left pl-2">{errors.message}</p>}
                                            <p className="text-xs text-primary-900/40 text-right">{formData.message.length}/1000</p>
                                        </div>
                                    </div>

                                    {/* Privacy Policy Agreement */}
                                    <div className="flex items-start space-x-3 text-left">
                                        <input
                                            type="checkbox"
                                            id="privacyConsent"
                                            name="privacyConsent"
                                            checked={formData.privacyConsent}
                                            onChange={handleCheckboxChange}
                                            className="mt-1 h-4 w-4 text-primary-500 focus:ring-primary-500 border-primary-900/20 rounded"
                                        />
                                        <div>
                                            <label
                                                htmlFor="privacyConsent"
                                                className="text-xs text-primary-900/60 leading-relaxed cursor-pointer"
                                            >
                                                By submitting, you consent to Neorick processing your information in accordance with our{" "}
                                                <a
                                                    href="/privacy-policy"
                                                    className="text-primary-500 hover:text-primary-900 underline transition-colors"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Privacy Policy
                                                </a>
                                                . *
                                            </label>
                                            {errors.privacyConsent && (
                                                <p className="mt-1 text-xs text-red-600 text-left">{errors.privacyConsent}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Communication Consent Agreement */}
                                    <div className="flex items-start space-x-3 text-left">
                                        <input
                                            type="checkbox"
                                            id="contactConsent"
                                            name="contactConsent"
                                            checked={formData.contactConsent}
                                            onChange={handleCheckboxChange}
                                            className="mt-1 h-4 w-4 text-primary-500 focus:ring-primary-500 border-primary-900/20 rounded"
                                        />
                                        <div>
                                            <label
                                                htmlFor="contactConsent"
                                                className="text-xs text-primary-900/60 leading-relaxed cursor-pointer"
                                            >
                                                Yes, I would like to receive marketing communications from Neorick.
                                            </label>
                                            {errors.contactConsent && (
                                                <p className="mt-1 text-xs text-red-600 text-left">{errors.contactConsent}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cloudflare Turnstile - Left-aligned */}
                                    <div className="flex items-start -ml-4">
                                        <div className="w-4 flex-shrink-0"></div> {/* Spacer to align with checkboxes */}
                                        <div className="flex flex-col">
                                            <Turnstile
                                                ref={turnstileRef}
                                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                                onSuccess={handleTurnstileSuccess}
                                                onError={handleTurnstileError}
                                                onExpire={() => {
                                                    setFormData((prev) => ({ ...prev, turnstileToken: "" }))
                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        turnstile: "Security verification expired. Please try again.",
                                                    }))
                                                }}
                                                options={{
                                                    theme: "light",
                                                    size: "normal",
                                                }}
                                            />
                                            {errors.turnstile && <p className="mt-2 text-xs text-red-600">{errors.turnstile}</p>}
                                        </div>
                                    </div>
                                </form>

                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-16">
                                    <button
                                        type="button"
                                        onClick={() => handleClose("cancel-button")}
                                        disabled={isSubmitting}
                                        className="flex-1 inline-flex justify-center rounded-[6px] bg-transparent px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-primary-900/70 border border-primary-900/20 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onClick={handleSubmit}
                                        className="flex-1 inline-flex justify-center items-center rounded-[6px] bg-primary-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-sm hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
