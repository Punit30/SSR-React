import { Box, CssBaseline, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

const STYLES = {
	paragraph: {
		color: "#717385",
		fontSize: "14px",
		fontWeight: "400",
		lineHeight: "22px",
	},
	heading: {
		textAlign: "left",
		color: "#1B1C20",
		fontSize: "14px",
		fontWeight: "600",
		lineHeight: "22px",
	},
	link: {
		display: "inline",
		color: "#814CD6",
		fontSize: "14px",
		fontWeight: "400",
		lineHeight: "22px",
		textDecoration: "none",
	},
}

const HeaderCom = ({ title, children }) => (
	<Box className="f f-c g6">
		<Typography component="h4" sx={STYLES.heading}>
			{title}
		</Typography>
		<Box className="f f-c g24">{children}</Box>
	</Box>
)

function PrivacyPolicyPage() {
	return (
		<>
			<CssBaseline />
			<Box className="f f-c w100">
				<Box className="f f-c g8 align-center w100" padding="88px 16px" sx={{ backgroundColor: "#F9F9FB" }}>
					<Box className="f f-c g8 align-center w100" maxWidth="720px">
						<Typography
							color="#814CD6"
							textAlign="center"
							fontSize="16px"
							fontWeight="600"
							lineHeight="24px"
						>
							Current as of Feb 17, 2024
						</Typography>
						<Box className="f f-c g24 align-center">
							<Typography
								color="#1B1C20"
								textAlign="center"
								fontFamily="Poppins"
								fontSize="48px"
								fontWeight="600"
								lineHeight="58px"
							>
								Privacy Policy
							</Typography>
							{/* <Typography
								color="#717385"
								textAlign="center"
								fontSize="18px"
								fontWeight="400"
								lineHeight="26px"
							>
								Your privacy is important to us at Inclusive. We respect your privacy regarding any information we may collect from you across our website and strive to be as transparent as possible.
							</Typography> */}
						</Box>
					</Box>
				</Box>
				<Box
					className="f f-c g8 align-center w100"
					padding="56px 16px 152px"
					sx={{ backgroundColor: "#FFFFFF" }}
				>
					<Box className="f f-c g24 w100" maxWidth="720px">
						<Box display="inline">
							<Typography component="p" sx={STYLES.paragraph} display="inline">
								Inclusive Plus Inc. (“Inclusive Plus,” “Company,” “we,” “our,” or “us”) respects your
								privacy and is committed to protecting it through our compliance with this Privacy
								Policy (as amended, restated, supplemented, or otherwise modified from time to time, the
								“Privacy Policy”). Capitalized terms used and not defined in this Privacy Policy have
								the meanings given to them in our Terms of Use as in effect from time to time, available
								at
							</Typography>{" "}
							<Typography
								component={Link}
								href="/terms-of-use"
								sx={{ ...STYLES.heading, color: "#814cd7", display: "inline", textDecoration: "none" }}
							>
								Terms of Use
							</Typography>
							.
						</Box>
						<Typography component="p" sx={STYLES.paragraph}>
							This Privacy Policy explains how we collect, use, share, and protect information in relation
							to our Services, and the choices you can make about the collection and use of your
							information. This Privacy Policy applies throughout the entire duration of your use of all
							or any portion of our Services. This Privacy Policy applies to information we collect
							whether you are a Visitor or a Registered User.
						</Typography>
						<Typography component="p" sx={STYLES.paragraph}>
							This Privacy Policy constitutes a legally binding agreement between Inclusive Plus and you,
							governing your use of our Services. By accessing or using all or any part of our Services,
							or by clicking to accept or agree to the Privacy Policy when this option is made available
							to you, you acknowledge that you have read and accept, and agree to become bound and to
							abide by, this Privacy Policy. If you are entering into this Privacy Policy on behalf of a
							company, organization, or other business entity, you represent and warrant that you are
							authorized to enter into this Privacy Policy on behalf of such company, organization, or
							other business entity. If you do not agree to this Privacy Policy, please do not use or
							access all or any part of our Services in any way.
						</Typography>
						<HeaderCom title="1. Changes to Our Privacy Policy">
							<Typography component="p" sx={STYLES.paragraph}>
								Inclusive Plus may, in our sole discretion, change, modify, supplement, amend, or remove
								all or any part of our Privacy Policy at any time and from time to time. Any
								modification will be emailed to you and posted on this page and become effective from
								the date of such posting, and from such effective date will supersede all prior versions
								in their entirety. The “Last Modified” date at the bottom of the page reflects when the
								most recent modifications became effective. You are deemed to have agreed to the most
								current version of our Privacy Policy by accessing or using our Services in whole or in
								part, or by clicking to accept or agree to the Privacy Policy when this option is made
								available to you, beginning on the “Last Modified” date. If you do not agree to a
								modification, your sole recourse is to terminate your use of our Services in their
								entirety immediately. Inclusive Plus encourages you to periodically review our Privacy
								Policy to stay informed about any modifications.
							</Typography>
						</HeaderCom>
						<HeaderCom title="2. Information We Collect and How We Collect It">
							<Typography component="p" sx={STYLES.paragraph}>
								The information we collect depends on how you interact with Inclusive Plus, the
								particular Products or features you use within our Services, and the choices you make
								about how to share data with Inclusive Plus.
							</Typography>
						</HeaderCom>
						<HeaderCom title="2.1 Information Collected from You">
							<Typography component="p" sx={STYLES.paragraph}>
								Inclusive Plus collects certain information from you, which you provide to us in
								connection with establishing a User Account, creating a listing in our Directory, or
								otherwise when interacting with the Services. The information you provide is:
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(a) Personal information and identifiers. Inclusive Plus collects each Registered User’s
								first and last name, professional mailing address, billing address, email address,
								telephone number, and photograph. Inclusive Plus also collects usernames, passwords, and
								login credentials that allow Registered Users to access their User Accounts.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(b) Demographic information. Inclusive Plus collects each Registered User’s age, race,
								gender identity, sexuality, and preferred pronouns.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(c) Provider information. Inclusive Plus collects each Registered User’s employer
								identity and job title with such employer, employment status, resume, practice website
								link, languages in which the Registered User provides care, types of insurance accepted,
								years of practice, medical license number(s) and state(s) and/or accrediting body(ies)
								of issuance as well as copies of such licenses, academic degrees as well as copies of
								such degrees, each Registered User’s self-reported area(s) of specialty as a Provider,
								and other information that is required for Registered Users who wish to be listed on the
								Directory to populate a complete listing.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(d) Activity information. Inclusive Plus collects each Registered User’s responses to
								the Baseline Assessment, as well as responses to, and data regarding performance on,
								subsequent quizzes, questionnaires, and other interactive tests or activities of similar
								nature available through the Services. We also collect information relating to all
								Users’ activity while using the Services, including, without limitation, registration
								for and attendance at live and recorded events, Continuing Education Materials viewed,
								purchased, or utilized, and Continuing Education credits claimed.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(e) Payment information. If you make a purchase or other financial transaction through
								our Services, Inclusive Plus collects your credit or debit card number, financial
								account information, and other payment information. We also maintain a record of your
								payment, purchase, and subscription history for all transactions with Inclusive Plus.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(f) Communications. Inclusive Plus collects photos, documents, or other files you upload
								in connection with our Services. Inclusive Plus also collects and retains all email and
								other communications from Users, including any content or information you provide in
								connection with customer service communications.
							</Typography>
						</HeaderCom>
						<HeaderCom title="2.2 Information Collected Automatically">
							<Typography component="p" sx={STYLES.paragraph}>
								When you use our Services, including as a Visitor, technologies we use automatically
								collect certain information, including, without limitation:
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(a) Log file information. Your browser automatically provides log file information each
								time you access our Services. It may also be reported when the content of our Services
								is downloaded to your browser or device. Our servers automatically record certain log
								file information, including your web request, IP address, browser type, referring/exit
								pages and URLs, number of clicks, and how you interact with links on the Service, domain
								names, landing pages, pages viewed, and other such information.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(b) Device information. When you access our Services, Inclusive Plus collects certain
								information about the device that you use to access the Services, including device
								identifiers. Device identifiers are small data files or similar data structures stored
								on or associated with your device, which uniquely identify your device. This data
								includes your device type, operating system, browser, language, server resolution, and
								time spent on our pages.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(c) Geolocation data. Inclusive Plus collects geolocation data, such as through GPS, IP
								address, and other data from sensors on or around your device, depending in part on your
								device and account settings. Depending on these settings, this may include precise
								location data, for example location coordinates.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(d) Cookies. Inclusive Plus may use cookies and similar technologies to collect
								information about how you use our Services and to provide features to you. Our Services
								use pixel tags, web beacons, local storage, and similar tracking technologies
								(collectively referred to as “Cookies”) that are created when you use our Services and
								are stored on your computer or mobile device. You may refuse to accept browser Cookies
								by activating the appropriate setting on your browser or updating your User Account
								settings. However, if you do so, you may be unable to access certain features of our
								Services. Our Service may use local stored objects (“Flash Cookies”) to collect and
								store information about your preferences and navigation to, from and on our Services.
								Our Services and emails may contain small electronic files known as web beacons (also
								referred to as clear gifs, pixel tags, and single-pixel gifs) that permit Inclusive Plus
								to collect statistics, for example, counting Users who have visited those pages or
								opened an email, recording the popularity of certain content, and verifying system and
								server integrity.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(e) Other Usage Information. Whenever you use our Services, we track the pages that you
								view, the amount of time that you spend viewing each page, the Continuing Education
								Materials that you browse and utilize, the length of time you spend engaging with any
								particular Continuing Education Materials, and your behavior and engagement with the
								Services generally. We also track, if you are a User who utilizes the Directory to
								search for a Provider, the search parameters you input into the search function of the
								Directory as well as the search results that you are shown when you enter those search
								parameters.
							</Typography>
						</HeaderCom>
						<HeaderCom title="2.3 Information Collected from Third Parties">
							<Typography component="p" sx={STYLES.paragraph}>
								Inclusive Plus may receive information about you from various third-party sources as
								described below. As further described in the Terms of Use, Inclusive Plus takes no
								responsibility and assumes no liability for any actions or omissions of any such third
								party. By linking your Third-Party Services to your User Account, as and when that
								option is made available to you, or by using such Third-Party Services in connection
								with the Services, you grant us and the relevant Third-Party Services the right, power,
								and authority to act on your behalf to access and transmit your personal information to
								one another.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(a) Analytic Providers. Inclusive Plus uses third-party analytic providers, such as
								Google Analytics, to understand how Users engage with our Services. These providers
								collect information regarding your interaction with our Services, such as the pages you
								visit, the time spent on those pages, and the links you click on. This information helps
								Inclusive Plus improve Services and your User experience.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(b) Payment Processors. Inclusive Plus uses third-party payment processors to process
								subscriptions and payments. These processors collect your payment-related information,
								such as credit/debit card or other financial information and billing address, and may
								provide it to us, in addition to a record of your transaction history with such
								third-party payment processors.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(c) Advertising and Marketing Partners. Inclusive Plus’s advertising and marketing
								partners, including, without limitation, Hubspot and Meta Ads, share information with us
								about the performance and effectiveness of advertisements and promotional campaigns on
								the Services. This includes metrics on User engagement and conversions, which assists
								Inclusive Plus in evaluating and optimizing our marketing strategies.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(d) Employment and License Verification. Inclusive Plus may collect information from
								your employer, if your employer is an Enterprise Customer, regarding your employment
								status, organizational email address, and job title, to determine your eligibility to
								use our Services as an Enterprise User. Additionally, Inclusive Plus collects
								information from medical licensing boards or other entities from whom you purport to
								hold licenses in order to validate and confirm that you actually hold the licenses that
								you have represented to Inclusive Plus that you hold.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(e) Continuing Education Material Usage. Inclusive Plus collects information from our
								licensors about your viewing and usage of Continuing Education Materials, which are
								licensed to Inclusive Plus by licensors or to our licensors by Inclusive Plus. This
								includes tracking your progress, assessing completion of modules, and ensuring
								compliance with Continuing Education requirements or mutually providing information
								required to issue Continuing Education certificates to you.
							</Typography>
						</HeaderCom>
						<HeaderCom title="2.4. Information We Create or Generate">
							<Typography component="p" sx={STYLES.paragraph}>
								Using the information we collect, Inclusive Plus actively generates new information to
								enhance your experience with our Services. This includes, but is not limited to,
								recommendations of Continuing Education Materials you might utilize that are tailored to
								your individual preferences, needs, and learning objectives. Our system analyzes your
								provided data, such as learning preferences, past Continuing Education Material
								interaction, and feedback, to custom-design a courseload that aligns with your
								educational goals and learning style. As part of marketing and fulfilling the Services,
								Inclusive Plus may take photos and/or videos of attendees, exhibitors, and faculty
								featured in or attending our Continuing Education Materials, as well as any other
								participants in our Continuing Education Materials. These photos and videos may be used
								in marketing materials, including our Website. Should you wish for an identifiable photo
								of you not to be used for any purpose, you must advise Inclusive Plus in advance of
								utilizing the relevant Continuing Education Materials in writing by emailing{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								.
							</Typography>
						</HeaderCom>
						<HeaderCom title="2.5 Information from Publicly Available Sources or Elsewhere">
							<Typography component="p" sx={STYLES.paragraph}>
								Inclusive Plus may collect information about you from publicly available sources. We may
								combine this information from publicly available sources with your personal information
								for the purposes described in this Privacy Policy. Inclusive Plus may also reach out to
								medical licensing boards or other entities from whom you purport to hold licenses in
								order to validate and confirm that you actually hold the licenses that you have
								represented to Inclusive Plus that you hold.
							</Typography>
						</HeaderCom>

						<HeaderCom title="3. How We Use your Personal Information">
							<Typography component="p" sx={STYLES.paragraph}>
								(a) Product and Service delivery. Inclusive Plus uses your information to provide and
								deliver our Services, including to maintain your User Account, improve and maintain our
								Services, make Continuing Education Materials available to you, identify new Continuing
								Education Materials that should be made available, publish your listing in the Directory
								(if applicable), generate Continuing Education certificates for Continuing Education
								Materials that you have completed (if applicable), verify Registered Users’ identities,
								to provide personalized content and recommendations about how you can maximize your use
								of the Services, and to otherwise fulfill all of the functions of the Services that are
								necessary for you to utilize the Services.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(b) Business operations. Inclusive Plus uses your information for business operations
								purposes, such as billing, accounting, improving our internal operations, security (both
								physical and electronic), detecting fraudulent or illegal activity, and meeting our
								legal obligations.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(c) Product Improvement, Development, and Research. Inclusive Plus uses your information
								to improve our Services and features, develop new services and features including
								additional Continuing Education Materials, and conduct user research including through
								surveys and interviews.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(d) Personalization. Inclusive Plus uses your information to understand you and your
								preferences to enhance your experience and enjoyment using our Services.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(e) Customer support. Inclusive Plus uses your information to provide customer support
								and respond to your questions.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(f) Communications. Inclusive Plus uses your information to send you communications
								about the Services, including educational content, notices regarding new Continuing
								Education Materials, notices regarding incomplete courses or Continuing Education
								Materials that you have started but not finished, Continuing Education certificates that
								you have earned, invoices, purchase confirmations, technical notices, Service updates,
								security alerts, reminders, support, and administrative messages.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(g) Marketing. Inclusive Plus uses your information to communicate with you about new
								services, offers, promotions, rewards, upcoming events, and other information about our
								Services.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(h) Analytics. Inclusive Plus uses your information to monitor our Service analytics,
								including the total number of Users, traffic, and usage patterns.
							</Typography>
						</HeaderCom>
						<HeaderCom title="4. How and When We Share Your Information with Third Parties">
							<Typography component="p" sx={STYLES.paragraph}>
								(a) Third-Party Services. We share your information with Third-Party Services made
								available via our Services, or that our Services are integrated with or with which our
								Services might otherwise interact in order to provide you with the Services, including,
								without limitation, third-party payment processors and Google Analytics. These may also
								include service providers to us, such as vendors or agents working on our behalf to help
								us facilitate the provision of the Services to you, like outsourced customer service
								representatives. Some Third-Party Services are required to make our Services available
								to you and Inclusive Plus may share your information, as well as information obtained
								from tools like Cookies, with Third-Party Services. For example, when you provide
								payment data to make a purchase, Inclusive Plus will disclose such data to its
								then-current third-party payment processor as necessary for payment processing. The
								relevant Third-Party Services will be given access to your information as is reasonably
								necessary to provide the Services. The Third-Party Services we use and share information
								with may change from time to time.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(b) Financial services. We may provide your payment information and purchase history to
								third parties that assist us with fraud prevention, credit risk reduction, or other
								related financial services.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(c) Corporate transactions. Inclusive Plus may disclose your information as part of a
								corporate transaction or proceeding such as a merger, financing, acquisition,
								bankruptcy, dissolution, or a transfer, divestiture, or sale of all or a portion of our
								business or assets.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(d) Legal, safety, and law enforcement. Inclusive Plus may access, disclose, and
								preserve your information, when we believe in our sole discretion that doing so is
								necessary to (i) comply with applicable law; (ii) respond to valid legal process,
								including from law enforcement or other government agencies; (iii) protect and defend
								the rights or property of Inclusive Plus; (iv) operate and maintain the security of our
								Services and investigate violations of our Terms of Use and this Privacy Policy; and/or
								(v) act under exigent circumstances to protect information of Users or the safety of
								Users or the public. Inclusive Plus will only share the information we are required to
								disclose by law and only when we are required to do so.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(e) Other Partners. Inclusive Plus may share your information with other third parties,
								including, without limitation, Enterprise Customers to verify Enterprise User
								eligibility, licensors of Inclusive Plus Continuing Education Materials to ensure
								compliance with our and their obligations under such licenses, and investors or
								potential business partners for the purposes of evaluating potential transactions or
								relationships with them, or operationalizing those transactions or relationships.
								Additionally, any information you provide to complete your Directory listing, such as
								professional credentials and contact details, will be made available to the general
								public and visitors of the Directory.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(f) Anonymized Data. We may remove parts of data that can identify you and share, sell,
								rent, trade, license, use, and disclose anonymized data with other parties for research,
								analytical or other purposes. We may also combine your information with other
								information in a way that it is no longer associated with you and share that aggregated
								information.
							</Typography>
						</HeaderCom>
						<HeaderCom title="5. How and How Long We Store Your Information">
							<HeaderCom title="5.1 Security of Stored Information">
								<Typography component="p" sx={STYLES.paragraph}>
									Inclusive Plus takes the security of your information very seriously. We use
									commercially reasonable safeguards, including AWS Key Management Service for data at
									rest and in transit, to protect your information from loss, misuse, unauthorized
									access, and disclosure. However, given the nature of communications and information
									processing technology, we cannot and do not guarantee that your information will be
									absolutely safe from access, alteration, or destruction by a breach of any of our
									physical, technical, and managerial safeguards.
								</Typography>
								<Typography component="p" sx={STYLES.paragraph}>
									Please do your part to help us. You are responsible for maintaining the secrecy of
									your unique password and User Account information, and for controlling access to
									emails and other communications between you and Inclusive Plus. We are not
									responsible for any lost, stolen, or compromised passwords or for any activity on
									your User Account via unauthorized password activity.
								</Typography>
							</HeaderCom>
							<HeaderCom title="5.2 External Data Storage Sites">
								<Typography component="p" sx={STYLES.paragraph}>
									Inclusive Plus may store your data on servers provided by third-party hosting
									vendors with whom we have contracted.
								</Typography>
							</HeaderCom>
							<HeaderCom title="5.3 Duration of Information Storage">
								<Typography component="p" sx={STYLES.paragraph}>
									Inclusive Plus stores your information only so long as we need it to provide our
									Services to you, fulfill the purposes described in this Privacy Policy, comply with
									our legal obligations, resolve disputes, and enforce or comply with our agreements
									with third parties such as licensors of Continuing Education Materials. Inclusive
									Plus retains most personal data for up to two years from the date it is no longer
									used by Inclusive Plus and may retain some personal data for a longer period to
									comply with our legal obligations in relation to that personal data.
								</Typography>
							</HeaderCom>
							<HeaderCom title="5.4 Data Transfer">
								<Typography component="p" sx={STYLES.paragraph}>
									Inclusive Plus, its affiliates, or service providers may transfer information that
									we collect about you, including personal information, across borders and from your
									country or jurisdiction to other countries or jurisdictions around the world. If you
									are located in the European Union or other regions with laws governing data
									collection and use that may differ from U.S. law, please note that we may transfer
									information, including personal information, to a country and jurisdiction that does
									not have the same data protection laws as your jurisdiction. Our Services are not
									designed to be accessed or used outside of the United States, and Users in other
									countries are not permitted to use our Services. By using or accessing our Services,
									you consent to the transfer of information to the U.S. or to any other country in
									which Inclusive Plus, its affiliates, or service providers maintain facilities and
									the use and disclosure of information about you as described in this Privacy Policy.
									The data protection and other laws of other countries might be different from the
									laws of the United States. When we transfer the information of a resident of the
									United States globally we will take reasonable steps to protect your information and
									will otherwise store and process your information in compliance with applicable
									laws.
								</Typography>
							</HeaderCom>
						</HeaderCom>
						<HeaderCom title="6. Your Rights and Choices">
							<Typography component="p" sx={STYLES.paragraph}>
								You have choices about how your information is collected and used.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								You can notify us of your preferences when you make a User Account. You can access or
								modify at any time the information associated with your User Account, if applicable,
								through the settings available in your User Account. Note, however, that if you choose
								not to provide information that is necessary, or if you choose to delete information or
								opt out of certain functionality, then some services or features of our Services may not
								be available or fully functional for you.
							</Typography>
						</HeaderCom>
						<HeaderCom title="6.1 Communication Preferences">
							<Typography component="p" sx={STYLES.paragraph}>
								We respect your privacy and give you an opportunity to opt out of receiving
								announcements of certain information:
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								(a) Emails. When you create a User Account, your email will be automatically enrolled to
								receive email communications from Inclusive Plus including Services-related notices,
								updates, improvements, offers, or other communications which may contain important
								information about your use of our Services or your User Account, or promotional or
								educational communications or the other communications described above. Users may opt
								out of receiving certain communications from Inclusive Plus by emailing{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								. Please note that it may take up to fourteen (14) days for changes to take effect. If
								you opt out of promotional emails, we may continue to send Service-related emails, which
								you may not opt out of. If you do not wish to receive Service-related emails, please
								delete your User Account. Please note that opting out of email communications may
								prevent you from receiving messages that are critical to the function and your use of
								our Services and as a result we may elect in our sole discretion to terminate your User
								Account.
							</Typography>
						</HeaderCom>
						<HeaderCom title="6.2 Cookie Options">
							<Typography component="p" sx={STYLES.paragraph}>
								Upon accessing the Website for the first time from a given device or browser, you will
								be given a choice as to which Cookies, if any, you would like to accept from the
								Website. Cookies help us offer convenient features, such as remembering your User
								Account settings and recognizing your browser. We also use the information we collect
								via Cookies to generate and compile statistics about Users and their use of our Services
								to monitor traffic on our Services, analyze trends, develop marketing programs, detect,
								and prevent fraud and security incidents, and improve our design and content. If you do
								not want us to collect information using Cookies, you can make such a selection in the
								relevant banner when accessing our Website, or change your browser to reject Cookies
								from the Website or to alert you before a Cookie is placed on your computer at any time
								in the future. Each browser is different, so you should check your browser’s “Help” menu
								to learn how to change your Cookie preferences. Please note that Cookie-based opt-outs
								only apply to the specific device and browser on which the opt-out Cookie is applied. If
								you accept a Cookie, you can delete it at any time through your web browser. If you
								choose not to accept Cookies, you may not be able to enjoy all the features available
								through our Services. Unless you have adjusted your browser settings or User Account
								settings so that your browser or device refuses Cookies, our system will issue Cookies
								when you direct your browser to our Services. Note that Flash Cookies are not managed by
								the same browser settings as are used for browser Cookies.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								The Network Advertising Alliance (“NAI”) and the Digital Advertising Alliance (“DAA”)
								offer opt-out tools to help you manage your choices for participating companies that use
								Cookies for Interest-Based Advertising and cross-app advertising. For more information
								about these tools please visit: NAI Opt-Out Page and DAA Opt-Out Page. You can also opt
								out of Google Cookies by installing Google Analytics’ opt-out browser add-on at{" "}
								<Typography
									target="_blank"
									component={Link}
									href="https://tools.google.com/dlpage/gaoptout"
									sx={STYLES.link}
								>
									https://tools.google.com/dlpage/gaoptout
								</Typography>
								, and/or the Google Advertising Cookie out-out browser add-on.
							</Typography>
							<Typography component="p" sx={STYLES.paragraph}>
								You may also be able to limit interest-based advertising through the settings on your
								device by selecting “limit ad tracking” (iOS) or “opt-out of interest-based ads”
								(Android) or otherwise following the most recent published instructions for your device
								and operating system. To learn more about interest-based advertising and how you may be
								able to opt out of some of this advertising, you may wish to visit the NAI’s online
								resources, at{" "}
								<Typography
									target="_blank"
									component={Link}
									href="http://www.networkadvertising.org/choices"
									sx={STYLES.link}
								>
									http://www.networkadvertising.org/choices
								</Typography>
								, and/or the DAA’s resources at www.aboutads.info/choices. You may also be able to opt
								out of some, but not all, interest-based ads served by mobile ad networks by visiting{" "}
								<Typography
									target="_blank"
									component={Link}
									href="http://youradchoices.com/appchoices"
									sx={STYLES.link}
								>
									http://youradchoices.com/appchoices
								</Typography>{" "}
								and downloading the mobile AppChoices app. Please note that if you opt out of such
								tracking, no further data collection or tracking of this nature will occur and the
								random identifier we assigned to your device previously will be removed, such that at a
								later stage, if you decide to opt back in, we will not be able to track you using the
								same identifier as you used before you opted out.
							</Typography>
						</HeaderCom>
						<HeaderCom title="6.3 Right to Know">
							<Typography component="p" sx={STYLES.paragraph}>
								You have a right to know the information we have collected about you. You may request
								your information by contacting us at{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								. using the email address tied to your User Account. You also have a right to request
								additional information about our collection, use, disclosure, selling, or sharing of
								such information.
							</Typography>
						</HeaderCom>
						<HeaderCom title="6.4 Right to Correct.">
							<Typography component="p" sx={STYLES.paragraph}>
								You have a right to request that we correct inaccurate information about you. You can
								update your information at any time by logging into your User Account or by contacting
								us at{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								. using the email address tied to your User Account.
							</Typography>
						</HeaderCom>
						<HeaderCom title="6.5 Right to Delete">
							<Typography component="p" sx={STYLES.paragraph}>
								You have a right to delete your personal information. To delete your personal
								information or User Account, email{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								. with your full name and the email subject “Delete my account - [Full Name].” Subject
								to certain exceptions set out below, on receipt of a verifiable request from you,
								Inclusive Plus will delete your personal information from our records and direct any
								Third-Party Services to delete your personal information from their records. When you
								delete your personal information, our Services will no longer be available to you.
								Please note that there may be times when we may not be able to comply with requests to
								delete your personal information or User Account. For example, we may be unable to
								comply with your request if maintaining your User Account or personal information is
								necessary to:
							</Typography>
							<ul style={{ margin: "0px", ...STYLES.paragraph }}>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Complete the transaction for which the personal information was collected,
										fulfill the terms of a written warranty or product recall conducted in
										accordance with federal law, provide a good or service requested by you, or
										reasonably anticipated within the context of our ongoing business relationship
										with you, or otherwise perform a contract between you and us;
									</Typography>
								</li>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Detect security incidents, protect against malicious, deceptive, fraudulent, or
										illegal activity, or prosecute those responsible for that activity;
									</Typography>
								</li>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Debug to identify and repair errors that impair existing intended functionality;
									</Typography>
								</li>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Comply with applicable law, including various state data privacy laws to which
										we may be subject;
									</Typography>
								</li>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Enable solely internal uses that are reasonably aligned with your expectations
										based on your relationship with us;
									</Typography>
								</li>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Comply with an existing legal obligation; or
									</Typography>
								</li>
								<li>
									<Typography component="p" sx={STYLES.paragraph}>
										Otherwise use your personal information, internally, in a lawful manner that is
										compatible with the context in which you provided the information.
									</Typography>
								</li>
							</ul>
						</HeaderCom>
						<HeaderCom title="6.6 Option to Opt Out of the Sale or Disclosure of Your Information">
							<Typography component="p" sx={STYLES.paragraph}>
								You may have a right, under certain privacy and data protection laws, as applicable, to
								opt out of the sale or disclosure of your personal information. If you exercise your
								right to opt out of the sale or disclosure of your personal information, we will refrain
								from selling or disclosing your personal information, unless you subsequently provide
								express authorization for the sale or disclosure of your personal information. To opt
								out of the sale or disclosure of your personal information, email{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								. with your full name and the email subject “Opt out of information selling for [Full
								Name].” If you are accessing our Services in California, Colorado, Connecticut, Nevada,
								Virginia, or Utah, please see Section 6.7 below.
							</Typography>
						</HeaderCom>
						<HeaderCom title="6.7 Your State’s Privacy Rights">
							<HeaderCom title="(a) California Privacy Rights.">
								<Typography component="p" sx={STYLES.paragraph}>
									Section 2 sets forth the categories of personal information, including sensitive
									personal information, that Inclusive Plus collects and processes about you, a
									description of each category, and the sources from which we obtain each category.
									Under the California Consumer Privacy Act (“CCPA”) and California Privacy Rights Act
									(“CPRA”), you have a right to request information about our collection, use, and
									disclosure of your personal information over the prior 12 months, and ask that we
									provide you with the following information: Categories of and specific pieces of
									personal information we have collected about you;
								</Typography>
								<ul style={{ margin: "0px", ...STYLES.paragraph }}>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Categories of sources from which we collect personal information;
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Purposes for collecting, using, or selling personal information;
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Categories of third parties with which we share personal information;
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Categories of personal information disclosed about you for a business
											purpose;
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											If applicable, categories of personal information sold about you and the
											categories of third parties to which the personal information was sold, by
											category or categories of personal information for each third party to which
											the personal information was sold;
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											The categories of information we have disclosed to any third party for any
											third party’s direct marketing purposes during the preceding year; and
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											The names and addresses of third parties that received such information, or
											if the nature of their business cannot be determined from the name, then
											examples of the products or services marketed.
										</Typography>
									</li>
								</ul>
								<Typography component="p" sx={STYLES.paragraph}>
									Further, pursuant to the CPRA, you have the right to opt out of our sharing or
									disclosing your personalized data to third parties in certain circumstances, and to
									request that we correct any inaccuracies in your personal information. You may make
									such a request by contacting us as provided in Section 8. California law also
									requires that we disclose how we respond to “do-not-track” requests from our Users.
									At this time, we do not currently respond to “do-not-track” requests from our Users’
									browsers and we do not use your personal data for any automated decision-making or
									data profiling. Under California Civil Code Section 1798.83, also known as the
									“Shine the Light” law, California residents who have provided personal information
									to a business may request information about whether the business has disclosed
									personal information to any third parties for the third parties’ direct marking
									purposes.
								</Typography>
							</HeaderCom>
							<HeaderCom title="(b) Colorado, Connecticut, Virginia, Nevada, and Utah Privacy Rights">
								<Typography component="p" sx={STYLES.paragraph}>
									Colorado, Connecticut, Virginia, Nevada, and Utah each provide their state residents
									with rights to:
								</Typography>
								<ul style={{ margin: "0px", ...STYLES.paragraph }}>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Notice atCollection: You have a right to receive notice of our practices
											before or when we collect your information, including the categories of
											information and sensitive personal information collected, the purposes for
											which such information is collected or used, whether such information is
											sold or shared, and how long such information is retained. You can find
											those details in this Privacy Policy under the headers above.
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Rights to Request Correction or Deletion: You also have rights to request
											that we correct inaccurate information about you or delete your information.
											To delete your account or correct inaccurate information about you, please
											email us at{" "}
											<Typography
												target="_blank"
												component={Link}
												href="mailto:info@inclusiveplus.co"
												sx={STYLES.link}
											>
												info@inclusiveplus.co
											</Typography>
											. using the email address tied to your User Account. Please note that there
											may be legal reasons for us to keep your data, such as if we receive a law
											enforcement request asking us to preserve data.
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Right to Opt-Out/Right to Limit Use and Disclosure of Sensitive Personal
											Information: You have a right to opt-out from the “sale” or “sharing” of
											your personal information. Other than as described with respect to a
											potential corporate transaction in Section 4(c), Inclusive Plus does not
											sell your personal information. However, we do use services that help
											deliver interest-based marketing and advertising to you outside of Inclusive
											Plus. You also have a right to limit our use of sensitive personal
											information for purposes other than to provide Inclusive Plus. Please email{" "}
											<Typography
												target="_blank"
												component={Link}
												href="mailto:info@inclusiveplus.co"
												sx={STYLES.link}
											>
												info@inclusiveplus.co
											</Typography>
											. if you do not wish for us or our partners to share information relating to
											your use of Inclusive Plus for marketing and advertising purposes. Inclusive
											Plus does not sell or share the personal information of children or teens.
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Right Against Discrimination: Inclusive Plus will never discriminate against
											you for exercising these rights. You may designate, in writing or through a
											power of attorney, an authorized agent to exercise these rights on your
											behalf. Before accepting such a request from an agent, we will require the
											agent to provide proof you have authorized them to act on your behalf, and
											we may need you to verify your identity directly with us.
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Data portability. You have the right to request a copy of your personal
											information in a machine-readable format up to two times per calendar year.
											This allows you to obtain and reuse your data for your own purposes across
											different services. If you are a Utah resident, this only applies to
											processing carried out by automated means.
										</Typography>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Colorado, Connecticut, and Virginia also provide their state residents with
											rights to:
										</Typography>
										<ul style={STYLES.paragraph}>
											<li>
												<Typography component="p" sx={STYLES.paragraph}>
													Correct inaccuracies in their personal information, taking into
													account the nature of the information and the purposes of the
													processing; and
												</Typography>
											</li>
											<li>
												<Typography component="p" sx={STYLES.paragraph}>
													Opt out of profiling in furtherance of decisions that produce legal
													or similarly significant effects.
												</Typography>
											</li>
										</ul>
									</li>
									<li>
										<Typography component="p" sx={STYLES.paragraph}>
											Nevada provides its residents with a limited right to opt out of certain
											personal information sales. Residents who wish to exercise this sale opt-out
											right may submit a request by emailing{" "}
											<Typography
												target="_blank"
												component={Link}
												href="mailto:info@inclusiveplus.co"
												sx={STYLES.link}
											>
												info@inclusiveplus.co
											</Typography>
											.
										</Typography>
									</li>
								</ul>
								<Typography component="p" sx={STYLES.paragraph}>
									To exercise any of these rights or appeal a decision regarding a consumer rights
									request, please submit a request by emailing{" "}
									<Typography
										target="_blank"
										component={Link}
										href="mailto:info@inclusiveplus.co"
										sx={STYLES.link}
									>
										info@inclusiveplus.co
									</Typography>
									.
								</Typography>
							</HeaderCom>
						</HeaderCom>
						<HeaderCom title="7. Individuals Under 18 Years of Age">
							<Typography component="p" sx={STYLES.paragraph}>
								Inclusive Plus does not permit individuals under 18 years of age to use our Services,
								with the exception of accessing the Directory as a Visitor. If, however, you authorize a
								child between the age of 13 and 17 to use our Directory as a Visitor by providing them a
								device associated with your Inclusive Plus account and providing Inclusive Plus with
								prior written evidence of your parental consent to such use, any information associated
								with such use will be treated as your information in accordance with this Privacy
								Policy. Inclusive Plus does not knowingly collect personal information from individuals
								under 13 years of age. If we learn that we have collected or received personal
								information from an individual under 13 years of age, we will delete that information.
								We encourage parents and guardians to be involved in the online activities (including
								wireless Internet browsing) of their children to ensure that no information is collected
								from a child without parental or guardian permission. If you believe we might have any
								information from or about a child under 18 who does not have the requisite parental
								consent to use the Directory, please contact us at{" "}
								<Typography
									component={Link}
									target="_blank"
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								.
							</Typography>
						</HeaderCom>
						<HeaderCom title="8. Contact Information">
							<Typography component="p" sx={STYLES.paragraph}>
								If you have any questions or comments about our Privacy Policy, or if you believe that
								Inclusive Plus has not adhered to our Privacy Policy, please contact Inclusive Plus by
								emailing{" "}
								<Typography
									target="_blank"
									component={Link}
									href="mailto:info@inclusiveplus.co"
									sx={STYLES.link}
								>
									info@inclusiveplus.co
								</Typography>
								.
							</Typography>
						</HeaderCom>
						<Typography component="p" sx={STYLES.paragraph}>
							Inclusive Plus, Inc.<br></br>
							1201 W. Diversity Apt. 2C<br></br>
							Chicago, IL 60614
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	)
}

export default PrivacyPolicyPage
