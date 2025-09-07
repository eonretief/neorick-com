import React from "react";
import Link from "next/link";

export const cookiePolicySections = [
    {
        id: "introduction",
        title: "",
        content: (
            <div className="space-y-4">
                <p>
                    When you use NEORICK (PTY) LTD's website at https://www.neorick.com/ ("our website"), we use cookies
                    and similar technologies to enhance your experience and provide our services effectively.
                </p>
                <p>
                    <strong>"Cookies"</strong> are small text files that are placed on your device by a web server when you
                    visit our website. Cookies may be first-party cookies (placed by us) or third-party cookies (placed by
                    other service providers).
                </p>
                <p>
                    <strong>"Web beacons"</strong> (also known as pixel tags or clear GIFs) are tiny graphics that may be
                    included on our website to deliver or communicate with cookies, track performance, and monitor visitor activity.
                </p>
                <p className="font-bold">
                    By continuing to use our website, you consent to our use of cookies as described in this policy and
                    our <Link href="/privacy-policy" className="text-primary-500 hover:text-primary-900 transition-colors">Privacy Policy</Link>.
                </p>
            </div>
        )
    },
    {
        id: "types-of-cookies",
        title: "What Types of Cookies Do We Use?",
        content: (
            <div className="space-y-6">
                <p>The following table describes the types of cookies we may use on our website:</p>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-left font-semibold w-1/4">Cookie Type</th>
                            <th className="border border-gray-300 p-3 text-left font-semibold w-3/4">Purpose and Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top font-medium">
                                Strictly Necessary Cookies
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                These cookies are essential for our website to function properly and cannot be switched off.
                                They are usually set in response to actions you take, such as setting privacy preferences,
                                logging in, or filling in forms. You can set your browser to block these cookies, but some
                                parts of our website may not work properly.
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top font-medium">
                                Performance Cookies
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                These cookies collect information about how you use our website, such as which pages you
                                visit most often. All information is aggregated and anonymous. These cookies help us
                                improve how our website works and understand user behavior patterns.
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top font-medium">
                                Functional Cookies
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                These cookies enable enhanced functionality and personalisation, such as remembering your
                                preferences, language settings, or login details. They may be set by us or by third-party
                                providers whose services we use. If you disable these cookies, some functionality may not work properly.
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top font-medium">
                                Marketing/Targeting Cookies
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                These cookies may be set by our advertising partners to build a profile of your interests
                                and show you relevant advertisements on other websites. They work by uniquely identifying
                                your browser and device. If you disable these cookies, you will experience less targeted advertising.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        id: "third-party-services",
        title: "Third-Party Services",
        content: (
            <div className="space-y-4">
                <p>
                    <strong>Google Analytics:</strong> Our website uses Google Analytics, a web analytics service provided
                    by Google. Google Analytics uses cookies to help us analyse how users interact with our website. The
                    information generated by cookies about your use of our website may be transmitted to and stored by
                    Google on servers outside South Africa. You can opt out of Google Analytics by downloading and installing
                    the browser plug-in available at:{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout"
                       className="text-primary-500 hover:text-primary-900 transition-colors underline"
                       target="_blank"
                       rel="noopener noreferrer">
                        https://tools.google.com/dlpage/gaoptout
                    </a>
                </p>
                <p>
                    <strong>Social Media:</strong> Our website may include social media features and widgets. These features
                    may collect information about your visit and may set cookies to enable proper functionality. Your
                    interactions with these features are governed by the privacy policies of the respective social media companies.
                </p>
            </div>
        )
    },
    {
        id: "legal-basis",
        title: "Legal Basis for Processing",
        content: (
            <div className="space-y-4">
                <p>
                    Under the Protection of Personal Information Act (POPIA), we process information collected through
                    cookies based on the following legal grounds:
                </p>
                <ul className="space-y-2 list-disc ml-6">
                    <li><strong>Consent:</strong> For marketing/targeting cookies and non-essential functionality</li>
                    <li><strong>Legitimate Interests:</strong> For performance and analytics cookies to improve our website and services</li>
                    <li><strong>Necessary for Service Provision:</strong> For strictly necessary cookies required for website functionality</li>
                </ul>
                <p>
                    You may withdraw your consent at any time by adjusting your browser settings or contacting us directly.
                </p>
            </div>
        )
    },
    {
        id: "your-choices",
        title: "Your Cookie Choices",
        content: (
            <div className="space-y-4">
                <p>
                    <strong>Browser Settings:</strong> Most browsers automatically accept cookies, but you can modify your
                    browser settings to decline cookies or alert you when cookies are being sent. Please note that if you
                    disable cookies, some features of our website may not function properly.
                </p>
                <p>
                    <strong>Opt-Out Options:</strong> For interest-based advertising, you can opt out by visiting:
                </p>
                <ul className="space-y-1 list-disc ml-6">
                    <li>
                        Network Advertising Initiative:{" "}
                        <a href="https://optout.networkadvertising.org/"
                           className="text-primary-500 hover:text-primary-900 transition-colors underline"
                           target="_blank"
                           rel="noopener noreferrer">
                            https://optout.networkadvertising.org/
                        </a>
                    </li>
                    <li>
                        Digital Advertising Alliance:{" "}
                        <a href="https://optout.aboutads.info/"
                           className="text-primary-500 hover:text-primary-900 transition-colors underline"
                           target="_blank"
                           rel="noopener noreferrer">
                            https://optout.aboutads.info/
                        </a>
                    </li>
                </ul>
                <p>
                    <strong>Mobile Devices:</strong> For mobile devices, you can adjust advertising preferences through
                    your device settings (iOS: Settings {">"} Privacy {">"} Advertising; Android: Settings {">"} Google {">"} Ads).
                </p>
            </div>
        )
    },
    {
        id: "data-retention-and-security",
        title: "Data Retention and Security",
        content: (
            <div className="space-y-4">
                <p>
                    <strong>Retention:</strong> Cookie information is retained for different periods depending on the cookie type:
                </p>
                <ul className="space-y-1 list-disc ml-6">
                    <li>Session cookies: Deleted when you close your browser</li>
                    <li>Persistent cookies: Stored until their expiration date or until you delete them</li>
                    <li>Analytics cookies: Typically retained for up to 26 months</li>
                    <li>Marketing cookies: Usually retained for up to 12 months</li>
                </ul>
                <p>
                    <strong>Security:</strong> We implement appropriate technical and organisational measures to protect
                    cookie information from unauthorised access, alteration, or disclosure in accordance with POPIA requirements.
                </p>
                <p>
                    <strong>International Transfers:</strong> Some cookie information may be transferred to service providers
                    outside South Africa. We ensure appropriate safeguards are in place for such transfers in compliance with POPIA.
                </p>
            </div>
        )
    },
    {
        id: "your-rights",
        title: "Your Rights",
        content: (
            <div className="space-y-4">
                <p>Under POPIA, you have the following rights regarding information collected through cookies:</p>
                <ul className="space-y-1 list-disc ml-6">
                    <li>Right to access information collected about you</li>
                    <li>Right to correct inaccurate information</li>
                    <li>Right to delete information in certain circumstances</li>
                    <li>Right to object to processing based on legitimate interests</li>
                    <li>Right to withdraw consent where processing is based on consent</li>
                    <li>Right to lodge a complaint with the Information Regulator</li>
                </ul>
                <p>
                    To exercise these rights, please contact us using the details below. We will respond to your request
                    within 30 days.
                </p>
            </div>
        )
    },
    {
        id: "updates",
        title: "Updates to This Policy",
        content: (
            <div className="space-y-4">
                <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices, technology,
                    or legal requirements. When we make material changes, we will notify you by posting the updated policy
                    on our website with a new effective date.
                </p>
                <p>
                    We recommend that you review this policy periodically to stay informed about our cookie practices.
                </p>
            </div>
        )
    },
    {
        id: "contact-us",
        title: "Contact Us",
        content: (
            <div className="space-y-6">
                <p>
                    Please contact us at{" "}
                    <a href="mailto:legal@neorick.com"
                       className="text-primary-500 hover:text-primary-900 transition-colors">
                        legal@neorick.com
                    </a>
                    {" "}if you have any questions or concerns about this Cookie Policy or our use of cookies. You can
                    also write to us at Neorick (Pty) Ltd, First floor, Willowbridge Centre, Carl Cronje Drive, Cape Town,
                    7530 Attention: Legal.
                </p>
            </div>
        )
    }
]