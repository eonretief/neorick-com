"use server"

import { z } from "zod"

// Validation schema
const contactFormSchema = z.object({
    firstName: z.string().min(1, "This field is required").max(50, "First name is too long"),
    lastName: z.string().min(1, "This field is required").max(50, "Last name is too long"),
    company: z.string().min(1, "This field is required").max(100, "Company name is too long"),
    industry: z.string().min(1, "This field is required"),
    email: z.email({ error: "Please enter a valid email address" }),
    contactNumber: z.string()
        .min(10, "Contact number must be at least 10 digits")
        .max(20, "Contact number is too long")
        .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
    contactConsent: z.boolean().optional().default(false),
    turnstileToken: z.string().min(1, "Please complete the security verification"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export interface ActionResult {
    success: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
}

// Verify Turnstile token with Cloudflare
async function verifyTurnstileToken(token: string): Promise<boolean> {
    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY!,
                response: token,
            }),
        })

        const result = await response.json()
        return result.success === true
    } catch (error) {
        console.error('Turnstile verification error:', error)
        return false
    }
}

// Send notification to Slack
async function sendSlackNotification(formData: Omit<ContactFormData, 'turnstileToken'>): Promise<boolean> {
    try {
        const webhookUrl = process.env.SLACK_WEBHOOK_URL

        if (!webhookUrl) {
            console.error('SLACK_WEBHOOK_URL environment variable not configured')
            return false
        }

        // Format marketing consent display
        const contactConsentText = formData.contactConsent ? "Yes" : "No"

        // Format the message for Slack
        const slackMessage = {
            text: "New Contact Form Submission",
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "New Contact Form Submission"
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Name:*\n${formData.firstName} ${formData.lastName}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Company:*\n${formData.company}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Industry:*\n${formData.industry}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Email:*\n${formData.email}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Phone:*\n${formData.contactNumber}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Marketing Consent:*\n${contactConsentText}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Submitted:*\n${new Date().toLocaleString()}`
                        }
                    ]
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Message:*\n${formData.message}`
                    }
                },
                {
                    type: "divider"
                }
            ]
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        })

        if (!response.ok) {
            console.error('Failed to send Slack notification:', response.status, response.statusText)
            return false
        }

        return true
    } catch (error) {
        console.error('Error sending Slack notification:', error)
        return false
    }
}

export async function submitContactForm(data: ContactFormData): Promise<ActionResult> {
    try {
        // Validate the data
        const validatedData = contactFormSchema.parse(data)

        // Verify Turnstile token
        const isTurnstileValid = await verifyTurnstileToken(validatedData.turnstileToken)
        if (!isTurnstileValid) {
            return {
                success: false,
                error: "Security verification failed. Please try again.",
                fieldErrors: {
                    turnstile: ["Please complete the security verification"]
                }
            }
        }

        // Remove turnstile token from data before processing
        const { turnstileToken, ...formData } = validatedData

        // Send Slack notification
        const slackSent = await sendSlackNotification(formData)
        if (!slackSent) {
            console.warn('Failed to send Slack notification, but form submission will continue')
        }

        // Here you would typically also:
        // 1. Save to the database
        // 2. Send email notification
        // 3. Integrate with CRM
        // 4. Send confirmation email

        console.log("Contact form submission:", formData)

        return { success: true }

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return validation errors
            const fieldErrors = error.issues.reduce((acc: Record<string, string[]>, err) => {
                const path = err.path.join(".")
                if (!acc[path]) acc[path] = []
                acc[path].push(err.message)
                return acc
            }, {})

            return {
                success: false,
                error: "Please correct the errors below",
                fieldErrors
            }
        }

        console.error("Contact form submission error:", error)
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later."
        }
    }
}