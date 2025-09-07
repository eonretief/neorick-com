import React from "react";

export const privacyPolicySections = [
    {
        id: "introduction",
        title: "",
        content: (
            <div className="space-y-4">
                <p>
                    NEORICK (PTY) LTD operates https://www.neorick.com/ and is committed to protecting your privacy and
                    complying with applicable data protection and privacy laws. This Privacy Policy will inform you as to
                    how we process your Personal Information and tell you about your privacy rights and how the law
                    protects you (as Data Subject).
                </p>
                <p className="font-bold">
                    By submitting Personal Information to NEORICK, it will be seen as your consent to us to process the
                    Personal Information. Reference to "consent", "your consent" or "your explicit consent" shall include
                    the ticking of a tick box or clicking on a "Submit", "Sign in" or "Accept and Continue" button on our
                    site(s).
                </p>
            </div>
        )
    },
    {
        id: "important-information-and-who-we-are",
        title: "Important Information and Who We Are",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <h3 className="font-semibold mb-3">Purpose of this Privacy Policy</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                This Privacy Policy aims to give you information on how NEORICK processes Personal
                                Information through your use of our website, including any data you may provide when you
                                contact us using the "Contact Us"-form or Personal Information we process when you send to
                                us or receive from us other electronic communications (i.e. emails, electronic forms or any
                                of our social media sites).
                            </li>
                            <li>
                                This website is not intended for children and we do not knowingly collect data relating to
                                children.
                            </li>
                            <li>
                                It is important that you read this Privacy Policy so that you are fully aware of how and
                                why we are using your Personal Information. This Privacy Policy supplements other notices
                                and privacy policies and is not intended to override them.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Responsible Party</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                Unless otherwise stated under this privacy Policy, NEORICK (Pty) Ltd is the Responsible
                                Party and responsible for your Personal Information (collectively referred to as "NEORICK",
                                "we", "us" or "our" in this Privacy Policy).
                            </li>
                            <li>
                                We have appointed an information officer (IO) who is responsible for overseeing questions
                                in relation to this Privacy Policy. If you have any questions about this Privacy Policy,
                                including any requests, please contact the IO using the details set out below.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Contact Details</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                <div className="mb-2 font-medium">Our Information Officer's contact details:</div>
                                <ol className="numeric-list space-y-2">
                                    <li>Attention: Legal</li>
                                    <li>
                                        Email Address:{" "}
                                        <a href="mailto:legal@neorick.com"
                                           className="text-primary-500 hover:text-primary-900 transition-colors">
                                            legal@neorick.com
                                        </a>
                                    </li>
                                    <li>
                                        Registered Address: First floor, Willowbridge Centre, Carl Cronje Drive, Cape Town,
                                        7530
                                    </li>
                                    <li>
                                        Postal Address: First floor, Willowbridge Centre, Carl Cronje Drive, Cape Town, 7530
                                    </li>
                                </ol>
                            </li>
                            <li>
                                You have the right to make a complaint at any time to the Information Regulator's office
                                (IR), the Republic of South Africa's authority for data protection issues (
                                <a href="https://www.justice.gov.za/inforeg/"
                                   className="text-primary-500 hover:text-primary-900 transition-colors underline"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    https://www.justice.gov.za/inforeg/
                                </a>
                                ). We would, however, appreciate the chance to deal with your concerns before you approach
                                the IR, so please contact us in the first instance.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Changes to the Privacy Policy and Your Duty to Inform us of Changes</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                We keep our Privacy Policy under regular review. This version was last updated on the date
                                in the footer below. Archived versions (if available) can be obtained by contacting us.
                                Any changes made to our Privacy Policy in future will be posted on our website or made
                                available during your engagement with NEORICK. The new version will apply the moment it is
                                published on our website or incorporated by reference in any communication.
                            </li>
                            <li>
                                It is important that the Personal Information we hold about you is accurate and current.
                                Please keep us informed if your Personal Information changes during your relationship with us.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Integration into Other Sites</h3>
                        <div className="ml-8">
                            <p>
                                This Privacy Policy applies to our website(s) and our electronic communications only. We
                                do not exercise control over the sites who provide services or products to NEORICK as part
                                of their own offering. These other sites may place their own cookies or other files on your
                                computer, collect data or solicit Personal Information from you. We cannot be held
                                responsible for any wrongful handling of end users' information by other sites.
                            </p>
                        </div>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Third-Party Links</h3>
                        <div className="ml-8">
                            <p>
                                Our website may include links to Third-Party websites, plug-ins and applications. Clicking
                                on those links or enabling those connections may allow third parties to collect or share
                                data about you. If you disclose your Personal Information to a Third-Party, such as an
                                entity which operates a website linked to this website or our social media sites (if any),
                                <span className="font-bold">{" "}
                                    NEORICK SHALL NOT BE LIABLE FOR ANY LOSS OR DAMAGE, HOWSOEVER ARISING, SUFFERED BY YOU
                                    AS A RESULT OF THE DISCLOSURE OF SUCH INFORMATION TO THE THIRD-PARTY
                                </span>.
                                This is because we do not regulate or control how that Third-Party uses your Personal
                                Information. You should always ensure that you read the privacy policy of any Third-Party.
                                When you leave our website, we encourage you to read the privacy policy of every website
                                you visit.
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "data-we-collect-about-you",
        title: "Data We Collect About You",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            Personal Information means the information as per the Definitions. It does not include data
                            where the identity has been removed (anonymous data).
                        </p>
                    </li>

                    <li>
                        <p className="mb-3">
                            We may collect, use, store and transfer different kinds of Personal Information about you which
                            we have grouped together. When you decide to engage with us, we may collect Personal
                            Information in the following ways:
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                <strong>Identity Data</strong> includes first name, last name, username or similar
                                identifier.
                            </li>
                            <li>
                                <strong>Contact Data</strong> includes billing address, physical address, email address and
                                telephone numbers;
                            </li>
                            <li>
                                <strong>Financial Data</strong> includes banking details and/or payment card details;
                            </li>
                            <li>
                                <strong>Transaction Data</strong> includes details about payments to and from you and other
                                details of Services you have accessed on our website;
                            </li>
                            <li>
                                <strong>Technical Data</strong> includes internet protocol (IP) address, your login data,
                                browser type and version, time zone setting and location, browser plug-in types and
                                versions, operating system and platform, and other technology on the device(s) you use to
                                access this website;
                            </li>
                            <li>
                                <strong>Usage Data</strong> includes information about how you use our website(s) and
                                Services. This information shall include the full Uniform Resource Locators (URL)
                                clickstream to, through and from our website (including the date and time) and the
                                Services you viewed or searched for, page response times, download errors, length of
                                visits to certain pages, page interaction information (such as scrolling, clicks, and
                                mouse-overs) and methods used to browse away from the page and any phone number used to
                                call us, service transaction instructions from and to you via our APIs; or
                            </li>
                            <li>
                                <strong>Marketing and Communications Data</strong> includes your preferences in receiving
                                marketing from us and our third parties and your communication preferences.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <p>
                            We also collect, use and share <strong>Aggregated Data</strong> and <strong>Pattern Data</strong>
                            such as (but not limited to) statistical or demographic data or service and/or product
                            transactional data for any purpose. Aggregated Data or Pattern Data could be derived from your
                            Personal Information but is not considered Personal Information in law as this data will not
                            directly or indirectly reveal your (the data subject's) identity. For example, we may
                            aggregate your Usage Data to calculate the percentage of users accessing a specific website
                            feature or executing a specific transaction type (where applicable). However, if we combine or
                            connect Aggregated Data or Pattern Data with your Personal Information so that it can directly
                            or indirectly identify you, we will treat the combined data as Personal Information which will
                            be used in accordance with this Privacy Policy.
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>Submission of Personal information:</strong> When you choose to provide Personal
                            Information to us, you agree to provide accurate and current information, and not to
                            impersonate or misrepresent any person or entity or falsely state or otherwise misrepresent
                            your affiliation with anyone or anything.
                        </p>
                    </li>

                    <li>
                        <p>
                            We do not collect any Special Personal Information about you, however, in the rare event that
                            we do such Special Personal Information shall be collected as per your consent.
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>Submission of Personal Information on Behalf of Another:</strong> If you provide
                            information on behalf of someone else, then it is your responsibility to obtain the necessary
                            consent from the person/User before making the Personal Information available to us. On
                            receipt of Personal Information, we assume that the necessary consent has been obtained and
                            will process the Personal Information as per your instructions. By submitting such Personal
                            Information on behalf of another person, you indemnify us against any Third-Party claim, where
                            such Third-Party claim relates to Personal Information that has been processed without the
                            necessary consent or other available exception allowed by law.
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>If you Fail to Provide Personal Information:</strong> Where we need to collect
                            Personal Information by law, or under the terms of a contract we have with you, and you fail
                            to provide that data when requested, we may not be able to perform the contract we have or are
                            trying to enter into with you (for example, to provide you with Services (including Services
                            for no charge)). In this case, we may have to cancel a Service you have with us, but we will
                            notify you if this is the case at the time.
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "how-is-personal-information-collected",
        title: "How is Personal Information Collected",
        content: (
            <div className="space-y-6">
                <p>We use different methods to collect data from and about you including through:</p>

                <ol className="alpha-list space-y-4">
                    <li>
                        <h3 className="font-semibold mb-3">Direct Interactions.</h3>
                        <p className="mb-3">You may directly provide us with your Personal Information when you:-</p>
                        <ol className="roman-list space-y-3">
                            <li>subscribe to our newsletter or blog (if any);</li>
                            <li>engage with us via Zoom, Skype or any other Video conferencing facility;</li>
                            <li>
                                receive/apply/sign up for any of our Services (subject to the specific service terms and
                                conditions);
                            </li>
                            <li>give us feedback;</li>
                            <li>access our facilities/offices;</li>
                            <li>send us a message; or</li>
                            <li>
                                contact us via our contact page on our website WhatsApp or other social media sites
                                messaging platforms we may subscribe to.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Automated Technologies or Interactions.</h3>
                        <p>
                            As you interact with our Services or website, we will automatically collect Technical Data
                            about your equipment, browsing actions, patterns and device(s). We collect this Personal
                            Information by using cookies (see section 4) below), server logs and other similar
                            technologies. We may also receive Technical Data about you if you visit other websites
                            employing our cookies.
                        </p>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Third Parties or Publicly Available Sources.</h3>
                        <p className="mb-3">
                            We will receive Personal Information about you from various third parties and public sources
                            as set out below:
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                <div className="mb-2 font-medium">Technical Data from the Following Parties:</div>
                                <ol className="numeric-list space-y-2">
                                    <li>
                                        analytics providers such as Google ("How Google uses information from sites or apps
                                        that use our services", (located at{" "}
                                        <a href="https://policies.google.com/technologies/partner-sites"
                                           className="text-primary-500 hover:text-primary-900 transition-colors underline"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            https://policies.google.com/technologies/partner-sites
                                        </a>);
                                    </li>
                                    <li>advertising networks; and</li>
                                    <li>search information providers.</li>
                                </ol>
                            </li>
                            <li>
                                Contact, Financial and Transaction Data from providers of technical, payment and delivery
                                services.
                            </li>
                            <li>
                                Technical and Transactional Data from Third-Party service providers that provide a service,
                                subject to your consent to us to collect the information.
                            </li>
                            <li>Identity and Contact Data from data brokers or aggregators.</li>
                            <li>Identity and Contact Data from publicly available sources such as CIPC.</li>
                        </ol>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "cookies",
        title: "Cookies",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            Our website(s) makes use of cookies to help us understand our users better. Cookies are small
                            pieces of information sent by an organisation to your computer or other device and stored on
                            your hard drive to allow that website to recognise you when you visit. Cookies do not harm
                            your computer or any files on your computer. Depending on the type of cookie we use, cookies
                            also allow us to make our websites more user friendly.
                        </p>
                    </li>

                    <li>
                        <p>
                            NEORICK may use Third-Party vendors, including but not limited to Google and MSN/Bing to show
                            NEORICK-related ads on sites on the internet. Third party vendors use cookies to serve ads
                            based on a user's prior visits to our site(s) or other websites. Users may opt-out of
                            Google's use of cookies by visiting the Google Advertising Settings Page or the Network
                            Advertising Initiative's opt-out page for other Third-Party vendors' use of cookies.
                        </p>
                    </li>

                    <li>
                        <p>
                            You should be able to adjust your browser so that your computer does not accept cookies. If
                            you do this, you will still be able to browse the website but the functions that allow you to
                            access pages that require you to login, will not be available.
                        </p>
                    </li>

                    <li>
                        <p>
                            You can, alternatively, adjust your browser to notify you when a website attempts to put a
                            cookie on your computer. How you adjust your browser to stop it accepting, or to notify you
                            of, cookies will depend on the type of internet browser programme your computer uses.
                        </p>
                    </li>

                    <li>
                        <p>
                            Please remember, cookies do not contain Identity, Contacts, Financial Information. We do not
                            exchange cookies with any Third-Party websites or external data suppliers.
                        </p>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Examples of cookies we may use:</h3>
                        <ol className="roman-list space-y-3">
                            <li><strong>Session Cookies:</strong> We use Session Cookies to operate our Services.</li>
                            <li>
                                <strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences
                                and various settings.
                            </li>
                            <li><strong>Security Cookies:</strong> We use Security Cookies for security purposes.</li>
                        </ol>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "how-we-use-your-personal-information",
        title: "How We Use Your Personal Information",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p className="mb-3">
                            We will not sell your Personal Information. We will only use Personal Information within the
                            framework of the law. Most commonly, we will use Personal Information in the following
                            circumstances:
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                where you have given us your consent (for our engagement or for the engagement between you
                                and a Third Party); or
                            </li>
                            <li>
                                where we need to perform the contract, we are about to enter into or have entered into
                                with you; or
                            </li>
                            <li>
                                where it is necessary for our legitimate interests (or those of a Third-Party) and your
                                interests and fundamental rights do not override those interests; or
                            </li>
                            <li>where we need to comply with a legal obligation.</li>
                        </ol>
                    </li>

                    <li>
                        <p>
                            We will get your consent before sending third-party direct-marketing communications to you via
                            email or text message. You have the right to withdraw consent to marketing at any time by
                            contacting us or using such automated facilities made available by us.
                        </p>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Purposes for which we will use Personal Information:</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                We have set out in the table below a description of all the ways we plan to use Personal
                                Information, and which of the legal bases we rely on to do so. We have also identified
                                what our legitimate interests are where appropriate.
                            </li>
                            <li>
                                Note that we may process Personal Information for more than one lawful ground depending on
                                the specific purpose for which we are using the data. Please contact us if you need
                                details about the specific legal ground we are relying on to process your Personal
                                Information where more than one ground has been set out in the table below.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <p className="mb-3">
                            NEORICK only shares Personal Information with other organisations or individuals outside of
                            NEORICK in the following circumstances:
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                We have your consent. We may require informed consent for the sharing of any Special
                                Personal Information (where applicable).
                            </li>
                            <li>
                                We may provide such information to collaborating companies or other trusted organisations
                                or persons for the purpose of processing Personal Information on our behalf. We require
                                that these parties agree to process such information based on our instructions and in
                                compliance with this Privacy Policy and any other appropriate confidentiality and security
                                measures.
                            </li>
                            <li>
                                <div className="mb-2">
                                    We have a good faith belief that access, use, preservation or disclosure of such
                                    information is reasonably necessary to:
                                </div>
                                <ol className="numeric-list space-y-2">
                                    <li>
                                        satisfy any applicable law, regulation, legal process or enforceable governmental
                                        request;
                                    </li>
                                    <li>
                                        enforce applicable Terms of Use, including investigation of potential violations
                                        thereof;
                                    </li>
                                    <li>
                                        detect, prevent, or otherwise address fraud, security or technical issues; and
                                    </li>
                                    <li>
                                        protect against imminent harm to the rights, property or safety of NEORICK, users
                                        of this website or the public as required or permitted by law.
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>

                {/* Data Processing Table */}
                <div className="overflow-x-auto mt-8">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-left font-semibold w-2/5">Purpose/Activity</th>
                            <th className="border border-gray-300 p-3 text-left font-semibold w-1/5">Type of Data</th>
                            <th className="border border-gray-300 p-3 text-left font-semibold w-2/5">
                                Lawful Basis for Processing
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) To receive NEORICK newsletters/communication as a client</div>
                                <div className="mt-2">
                                    (b) To sign you up for our newsletter where you're not a client of NEORICK yet
                                </div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>(b) Contact</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>Existing Customer (as per POPIA) of NEORICK</div>
                                <div className="mt-2">Your Consent</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                <div className="mb-2">To perform in accordance with our service agreement:</div>
                                <div>(a) Deliver the services</div>
                                <div>(b) Manage payments, fees and charges</div>
                                <div>Collect and recover money owed to us</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>(b) Contact</div>
                                <div>(c) Financial</div>
                                <div>(d) Transaction</div>
                                <div>(e) Marketing and Communications</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Consent</div>
                                <div>(b) Performance of a contract with you</div>
                                <div>(c) Necessary for our legitimate interests (to recover debts due to us)</div>
                                <div className="mt-3 text-xs bg-primary-500/24 p-2 rounded">
                                    <strong>TAKE NOTE:</strong> we do not store Financial Information (card details) – we
                                    use third party service providers to execute transactions where you use your card. You
                                    should read their privacy policy
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                <div className="mb-2">To manage our relationship with you which will include:</div>
                                <div>(a) Notifying you about changes to our terms or privacy policy.</div>
                                <div>(b) Asking you to leave a review or take a survey.</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>(b) Contact</div>
                                <div>(c) Profile</div>
                                <div>(d) Marketing and Communications</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Performance of a contract with you</div>
                                <div>(b) Necessary to comply with a legal obligation</div>
                                <div>
                                    (c) Necessary for our legitimate interests (to keep our records updated and to study
                                    how customers use our services)
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                To reply to your submission via our "Contact-Us" page.
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>Contact Details</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                Consent
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                To administer and protect our business, website(s) and other electronic platforms
                                (including troubleshooting, data analysis, testing, system maintenance, support, reporting
                                and hosting of data).
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>(b) Contact</div>
                                <div>(c) Technical</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>
                                    (a) Necessary for our legitimate interests (for running our business, provision of
                                    administration and IT services, network security, to prevent fraud and in the context
                                    of a business reorganisation or group restructuring exercise)
                                </div>
                                <div>(b) Necessary to comply with a legal obligation</div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                To deliver relevant website content and advertisements to you and measure or understand the
                                effectiveness of the advertising we serve to you.
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>(b) Contact</div>
                                <div>(c) Profile</div>
                                <div>(d) Usage</div>
                                <div>(e) Marketing and Communications</div>
                                <div>(f) Technical</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                Necessary for our legitimate interests (to study how customers use our services, to develop
                                them, to grow our business and to inform our marketing strategy).
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                To use data analytics to improve our website(s), services, marketing, customer
                                relationships and experiences.
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Technical</div>
                                <div>(b) Usage</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                Necessary for our legitimate interests (to define types of customers for our services, to
                                keep our website updated and relevant, to develop our business and to inform our marketing
                                strategy).
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-3 align-top">
                                To make suggestions and recommendations to you about services that may be of interest to you.
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                <div>(a) Identity</div>
                                <div>(b) Contact</div>
                                <div>(c) Technical</div>
                                <div>(d) Usage</div>
                                <div>(f) Marketing and Communications</div>
                            </td>
                            <td className="border border-gray-300 p-3 align-top">
                                Necessary for our legitimate interests (to develop our services and grow our business).
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <ol className="alpha-list space-y-4" style={{ counterReset: 'alpha-counter 4' }}>
                    <li>
                        <h3 className="font-semibold mb-3">Marketing:</h3>
                        <p className="mb-3">
                            We strive to provide you with choices regarding certain Personal Information uses, particularly
                            around marketing and advertising.
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                <h4 className="font-medium mb-2">Promotional Offers from Us</h4>
                                <ol className="numeric-list space-y-2">
                                    <li>
                                        When you acquired any of our Services we will deal with you as a Customer under the
                                        POPIA.
                                    </li>
                                    <li>
                                        As a customer we may use your Identity, Contact, Technical and Usage to form a view on
                                        what we think you may want or need, or what may be of interest to you. This is how we
                                        decide which services and offers may be relevant for you (we call this marketing).
                                    </li>
                                    <li>
                                        As a customer you will receive marketing communications from us if you have not opted
                                        out of receiving that marketing.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h4 className="font-medium mb-2">Third-Party Marketing</h4>
                                <ol className="numeric-list space-y-2">
                                    <li>
                                        We will get your express opt-in consent before we share your Personal Information
                                        with any third party for marketing purposes.
                                    </li>
                                    <li>
                                        <strong>TAKE NOTE:</strong> We may provide (without your consent) third party
                                        marketing parties/advertisers with anonymous aggregate information (Aggregate Data
                                        (see above)) about our users (for example, we may inform them that 500 men aged under
                                        30 have clicked on a specific product or advertisement on any given day). We may also
                                        use such aggregate information to help advertisers reach the kind of audience they want
                                        to target (for example, women in a specific region). We may make use of the Personal
                                        Information we have collected from you to enable us to comply with our advertisers'
                                        wishes by displaying their advertisement to that target audience. <strong>IMPORTANT:
                                        We do not disclose information about identifiable individuals to our advertisers</strong>.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h4 className="font-medium mb-2">Opting Out</h4>
                                <ol className="numeric-list space-y-2">
                                    <li>
                                        You can ask us or third parties to stop sending you marketing messages at any time by
                                        using the [unsubscribe] button on the email communication or by contacting us at any
                                        time and requesting to opt-out of our marketing services.
                                    </li>
                                    <li>
                                        Where you opt out of receiving these marketing messages, this will not apply to Personal
                                        Information provided to us as a result of a product/service purchase, warranty
                                        registration (where applicable), service experience or other transactions.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h4 className="font-medium mb-2">Cookies:</h4>
                                <p>
                                    You can set your browser to refuse all or some browser cookies, or to alert you when
                                    websites set or access cookies. If you disable or refuse cookies, please note that some
                                    parts of this website may become inaccessible or not function properly.
                                </p>
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Change of Purpose.</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                We will only use your Personal Information for the purposes for which we collected it, unless
                                we reasonably consider that we need to use it for another reason and that reason is compatible
                                with the original purpose. If you wish to get an explanation as to how the processing for the
                                new purpose is compatible with the original purpose, please contact us.
                            </li>
                            <li>
                                If we need to use your Personal Information for an unrelated purpose, we will notify you and we
                                will explain the legal basis which allows us to do so.
                            </li>
                            <li>
                                Please note that we may process your Personal Information without your knowledge or consent, in
                                compliance with the above rules, where this is required or permitted by law.
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "disclosures-of-personal-information",
        title: "Disclosures of Personal Information",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p className="mb-3">
                            We may share Personal Information with the parties set out below for the purposes set out in
                            the table above.
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                <strong>Internal Third-Parties</strong> as set out in the <em>Definitions</em>. Where we
                                share Personal Information to our group (affiliates, collaborating companies/partners/agents),
                                we ensure your Personal Information is protected by requiring all our collaborating companies
                                to follow this Policy when processing your Personal Information.
                            </li>
                            <li>
                                <strong>External Third-Parties</strong> as set out in the <em>Definitions</em>.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <p>
                            We require all Third-Parties to respect the security of your Personal Information and to treat
                            it in accordance with the law. We do not allow Third-Party organisations or persons to use your
                            Personal Information for their own purposes and only permit them to process your Personal
                            Information for specified purposes and in accordance with our instructions.
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "international-transfers",
        title: "International Transfers",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            Some of our External Third-Parties may be based outside your country so their processing of
                            your Personal Information could involve a transfer of data outside your country.
                        </p>
                    </li>

                    <li>
                        <p className="mb-3">
                            Whenever we transfer your Personal Information out of your country, we ensure a similar degree
                            of protection is afforded to it by ensuring at least one of the following safeguards is
                            implemented:
                        </p>
                        <ol className="roman-list space-y-3">
                            <li>
                                We will only transfer your Personal Information to countries that have appropriate data
                                protection and privacy legislation to protect your Personal Information.
                            </li>
                            <li>
                                Where we use certain service providers, we conclude an agreement with them to confirm that
                                your Personal Information is confidential, they can only process on our instructions and
                                that they should establish and maintain appropriate technological and organisational
                                measurements to protect your Personal Information.
                            </li>
                            <li>
                                Where we use providers based in the US, we may transfer data to them if they are part of
                                the Privacy Shield which requires them to provide protection to personal information similar
                                to the conditions under the POPI Act, which we believe are good principles to ensure
                                compliance.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <p>
                            By submitting your Personal Information to us you consent to the transfer of your Personal
                            Information outside the borders of your country (when required).
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "data-security",
        title: "Data Security",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            We have put in place appropriate technological and organisational measures to prevent Personal
                            Information from being accidentally lost, used or accessed in an unauthorised way, altered or
                            disclosed. In addition, we limit access to Personal Information to those persons and other
                            third-parties who have a legitimate need to know. They will only process Personal Information
                            on our instructions, and they are subject to a duty of confidentiality.
                        </p>
                    </li>

                    <li>
                        <p>
                            We have put in place procedures to deal with any suspected Personal Information breach and will
                            notify you and any applicable regulator of a breach where we are legally required to do so.
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "data-retention",
        title: "Data Retention",
        content: (
            <div className="space-y-6">
                <h3 className="font-semibold mb-4">For how long will we use your Personal Information?</h3>

                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            We will only retain your Personal Information for as long as reasonably necessary to fulfil the
                            purposes we collected it for, including for the purposes of satisfying any legal or regulatory
                            requirements. We may retain your Personal Information for a longer period in the event of a
                            complaint or if we reasonably believe there is a prospect of litigation in respect of our
                            relationship with you.
                        </p>
                    </li>

                    <li>
                        <p>
                            To determine the appropriate retention period for Personal Information, we consider the amount,
                            nature and sensitivity of the Personal Information, the potential risk of harm from unauthorised
                            use or disclosure of your Personal Information, the purposes for which we process your Personal
                            Information and whether we can achieve those purposes through other means, and the applicable
                            legal, regulatory, tax, accounting or other requirements.
                        </p>
                    </li>

                    <li>
                        <p>
                            In some circumstances you can ask us to delete your data: see your legal rights below for
                            further information.
                        </p>
                    </li>

                    <li>
                        <p>
                            In some circumstances we will anonymise your Personal Information (so that it can no longer be
                            associated with you) for research or statistical purposes, in which case we may use this
                            information indefinitely without further notice to you.
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "social-media",
        title: "Social Media",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            Our website(s) or Services may, in certain circumstances, provide you with social plug-ins from
                            various social media networks. If you choose to interact with a social network such as Facebook
                            or YouTube (for example by registering an account, view a YouTube video on our website(s) or
                            click on the links from our website), your activity on our website(s) will also be made
                            available to that social network. This is necessary for the performance of your contract with us
                            which allows you to interact with a social network. If you are logged in on one of these social
                            networks during your visit to our website(s) or are interacting with one of the social plug-ins,
                            the social network might add this information to your respective profile on this network based on
                            your privacy settings. If you would like to prevent this type of information transfer, please
                            log out of your social network account before you enter our website(s), or change the necessary
                            privacy settings, where possible.
                        </p>
                    </li>

                    <li>
                        <p>
                            Communication, engagement and actions taken through external social media networks that we
                            participate in are custom to the terms and conditions as well as the privacy policies held with
                            each social media platform respectively.
                        </p>
                    </li>

                    <li>
                        <p>
                            You are advised to use social media networks wisely and communicate/engage with them with due
                            care and caution in regard to their own privacy policies (if any).
                            <span className="font-bold">{" "}
                                PLEASE NOTE: WE WILL NEVER ASK FOR PERSONAL OR SENSITIVE INFORMATION THROUGH SOCIAL MEDIA
                                NETWORKS AND ENCOURAGE USERS, WISHING TO DISCUSS SENSITIVE DETAILS OR TO RESOLVE
                                ISSUES/CONCERNS, TO CONTACT US THROUGH PRIMARY COMMUNICATION CHANNELS SUCH AS BY TELEPHONE OR
                                EMAIL.
                            </span>
                        </p>
                    </li>

                    <li>
                        <p>
                            Our social media network page(s) may share web links to relevant web pages. By default, some
                            social media platforms shorten lengthy URL's. You are advised to exercise caution and due care
                            before clicking on any shortened URL's published on social media platforms by this website.
                            Despite our best efforts to ensure that only genuine URL's are published, many social media
                            platforms are prone to spam and hacking and therefore our website and its owners cannot be held
                            liable for any damages or implications caused by visiting any shortened links.
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "your-legal-rights",
        title: "Your Legal Rights",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p className="mb-3">
                            Under certain circumstances, you have the following rights under data protection laws in relation
                            to your Personal Information:
                        </p>
                        <ol className="roman-list space-y-4">
                            <li>
                                <strong>Request for Access to Personal Information</strong> (commonly known as a "data subject
                                access request"). There may be a fee associated with this request – see b) below. This enables
                                you to receive a copy of the Personal Information we hold about you and to check that we are
                                lawfully processing it.
                            </li>

                            <li>
                                <strong>Request Correction</strong> of the Personal Information that we hold about you. This
                                enables you to have any incomplete or inaccurate data we hold about you corrected, though we
                                may need to verify the accuracy of the new data you provide to us.
                            </li>

                            <li>
                                <strong>Request Erasure</strong> of your Personal Information. This enables you to ask us to
                                delete or remove Personal Information where there is no good reason for us continuing to
                                process it. You also have the right to ask us to delete or remove your Personal Information
                                where you have successfully exercised your right to object to processing (see iv) below),
                                where we may have processed your information unlawfully or where we are required to erase
                                your Personal Information to comply with local law. Note, however, that we may not always be
                                able to comply with your request of erasure for specific legal reasons which will be notified
                                to you, if applicable, at the time of your request. <span className="font-bold">Take Note:</span>
                                Erasure of your Personal Information shall further not limit our rights in terms of Aggregate
                                Data and Pattern Data.
                            </li>

                            <li>
                                <strong>Object to Processing</strong> of your Personal Information where we are relying on a
                                legitimate interest (or those of a third-party) and there is something about your particular
                                situation which makes you want to object to processing on this ground, as you feel it impacts
                                on your fundamental rights and freedoms. In some cases, we may demonstrate that we have
                                compelling legitimate grounds to process your information which override your rights and
                                freedoms.
                            </li>

                            <li>
                                <strong>Request Restriction of Processing</strong> of your Personal Information. This enables
                                you to ask us to suspend the processing of your Personal Information in the following scenarios:
                                <ol className="numeric-list space-y-2 mt-3">
                                    <li>If you want us to establish the data's accuracy.</li>
                                    <li>
                                        Where our use of the data is unlawful, but you do not want us to erase it.
                                    </li>
                                    <li>
                                        Where you need us to hold the data even if we no longer require it as you need it to
                                        establish, exercise or defend legal claims.
                                    </li>
                                    <li>
                                        You have objected to our use of your data, but we need to verify whether we have
                                        overriding legitimate grounds to use it.
                                    </li>
                                </ol>
                            </li>

                            <li>
                                <strong>Request the Transfer</strong> of your Personal Information to you or to a third-party.
                                We will provide to you, or a third-party you have chosen, your Personal Information in a
                                structured, commonly used, machine-readable format. Note that this right only applies to
                                automated information which you initially provided consent for us to use or where we used the
                                information to perform a contract with you. Contact us if you need to transfer your Personal
                                Information.
                            </li>

                            <li>
                                <strong>Withdraw Consent</strong> at any time where we are relying on consent to process your
                                Personal Information. However, this will not affect the lawfulness of any processing carried
                                out before you withdraw your consent. If you withdraw your consent, we may not be able to
                                provide certain Services to you. We will advise you if this is the case at the time you
                                withdraw your consent.
                            </li>

                            <li>
                                If you wish to exercise any of the rights set out above, please contact us at the details
                                mentioned 1)c) above.
                            </li>
                        </ol>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Fee required:</h3>
                        <p>
                            Apart from any prescribed fees under any applicable data protection legislation, you will not
                            have to pay a fee to access your Personal Information (or to exercise any of the other rights).
                            However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or
                            excessive. Alternatively, we could refuse to comply with your request in these circumstances.
                        </p>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">What we may need from you:</h3>
                        <p>
                            We may need to request specific information from you to help us confirm your identity and ensure
                            your right to access your Personal Information (or to exercise any of your other rights). This
                            is a security measure to ensure that Personal Information is not disclosed to any person who has
                            no right to receive it. We may also contact you to ask you for further information in relation
                            to your request to speed up our response.
                        </p>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">Time limit to respond:</h3>
                        <p>
                            We try to respond to all legitimate requests within 30 (thirty) days. Occasionally it could take
                            us longer than 30 (thirty) days if your request is particularly complex or you have made a number
                            of requests. In this case, we will notify you and keep you updated.
                        </p>
                    </li>
                </ol>
            </div>
        )
    },
    {
        id: "definitions",
        title: "Definitions",
        content: (
            <div className="space-y-6">
                <ol className="alpha-list space-y-4">
                    <li>
                        <p>
                            <strong>Data Subject</strong> means the person to whom Personal Information relates and, in this
                            document, refers to you as the party providing Personal Information that will be processed by
                            NEORICK or a relevant third-party.
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>Legitimate Interest</strong> means the interest of our organisation in conducting and
                            managing our organisation to enable us to give you the best and most secure experience. We make
                            sure we consider and balance any potential impact on you (both positive and negative) and your
                            rights before we process your Personal Information for our legitimate interests. We do not use
                            your Personal Information for activities where our interests are overridden by the impact on you
                            (unless we have your consent or are otherwise required or permitted to by law). You can obtain
                            further information about how we assess our legitimate interests against any potential impact on
                            you in respect of specific activities by contacting us.
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>Performance of Contract</strong> means processing your data where it is necessary for the
                            performance of a contract to which you are a party or to take steps at your request before
                            entering into such a contract.
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>Personal Information</strong> means information relating to an identifiable, living,
                            natural person, and where it is applicable, an identifiable, existing juristic person, including,
                            but not limited to (related to our business): information relating to the race, gender, sex,
                            pregnancy, marital status, national, ethnic or social origin, colour, sexual orientation, age,
                            physical or mental health, well-being, disability, religion, conscience, belief, culture, language
                            and birth of the person, information relating to financial history of the person; any identifying
                            number, symbol, e-mail address, physical address, telephone number, location information, online
                            identifier or other particular assignment to the person; the personal opinions, views or preferences
                            of the person; correspondence sent by the person that is implicitly or explicitly of a private or
                            confidential nature or further correspondence that would reveal the contents of the original
                            correspondence;
                        </p>
                    </li>

                    <li>
                        <p>
                            <strong>Responsible Party</strong> means a public or private body or any other person which, alone
                            or in conjunction with others, determines the purpose of and means for processing Personal
                            Information.
                        </p>
                    </li>

                    <li>
                        <p><strong>Services</strong> has the same meaning as per our Terms of Services.</p>
                    </li>

                    <li>
                        <p>
                            <strong>Special Personal Information</strong> means information that may be sensitive information,
                            such as details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual
                            orientation, political opinions, trade union membership, information about your health, and
                            biometric information or criminal convictions and offences.
                        </p>
                    </li>

                    <li>
                        <h3 className="font-semibold mb-3">THIRD-PARTIES</h3>
                        <ol className="roman-list space-y-3">
                            <li>
                                <strong>Internal Third-Parties:</strong> Partners, affiliates, employees, shareholders,
                                directors and/or agents of NEORICK (if applicable), acting as joint responsible parties or
                                operators and who may also provide IT and system administration services and undertake
                                leadership reporting.
                            </li>
                            <li>
                                <strong>External Third-Parties:</strong>
                                <ol className="numeric-list space-y-2 mt-3">
                                    <li>
                                        Service providers acting as operators who provide IT and system administration services.
                                    </li>
                                    <li>
                                        Professional advisers acting as operators or joint Responsible Parties, including
                                        lawyers, bankers, auditors and insurers who provide consultancy, banking, legal,
                                        insurance and accounting services.
                                    </li>
                                    <li>
                                        Regulators and other authorities acting as operators or joint Responsible Parties who
                                        require reporting of processing activities in certain circumstances.
                                    </li>
                                    <li>
                                        Courts of law or any other authorities where we have an obligation under law to share
                                        your Personal Information.
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
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
                    {" "}if you have any questions or concerns about our privacy practices or this Privacy Policy. You can
                    also write to us at Neorick (Pty) Ltd, First floor, Willowbridge Centre, Carl Cronje Drive, Cape Town,
                    7530 Attention: Legal.
                </p>
                <p>
                    If you interact with NEORICK through or on behalf of your organization, then your personal information
                    may also be subject to your organization's privacy practices and you should direct any questions to
                    that organization.
                </p>
            </div>
        )
    }
]