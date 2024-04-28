import { Box, CssBaseline, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

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
};

const HeaderCom = ({ title, children }) => (
  <Box className="f f-c g6">
    <Typography component="h4" sx={STYLES.heading}>
      {title}
    </Typography>
    <Box className="f f-c g24">{children}</Box>
  </Box>
);

function TermsAndConditionsPage() {
  return (
    <>
      <CssBaseline />
      <Box className="f f-c w100">
        <Box
          className="f f-c g8 align-center w100"
          padding="88px 16px"
          sx={{ backgroundColor: "#F9F9FB" }}
        >
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
                Terms of use
              </Typography>
              {/* <Typography
								color="#717385"
								textAlign="center"
								fontSize="18px"
								fontWeight="400"
								lineHeight="26px"
							>
								By accessing our website, you are agreeing to be bound by these terms of service, all
								applicable laws and regulations, and agree that you are responsible for compliance with
								any applicable local laws.
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
            <Typography component="p" sx={STYLES.paragraph}>
              Welcome to Inclusive Plus Inc. (“Inclusive Plus,” the “Company,”
              “we,” “our,” or “us”). These terms of use (as amended, restated,
              supplemented, or otherwise modified from time to time, “Terms of
              Use”) apply to all of our products and services, which include,
              without limitation, the online website located at inclusiveplus.co
              and any user portal accessible thereon (the “Website”), any mobile
              phone application that can be used to access our platform and
              services if and when made available in the future (the “App”), our
              Products (as defined below), any services, material, or content
              provided by Inclusive Plus or our employees or contractors in
              connection with your use of our Products, any physical and
              intangible property of Inclusive Plus, any software provided on or
              in connection with the foregoing, and any other products or
              services made available by Inclusive Plus in the future (all of
              such products and services, collectively, our “Services”). These
              Terms of Use apply throughout the entire duration of your use of
              all or any portion of our Services. These Terms of Use apply
              whether you simply browse or access all or a portion of our
              Services without an account (a “Visitor”) or you create a User
              Account (as defined below) (a “Registered User”). Visitors and
              Registered Users are referred to collectively herein as “Users” or
              “you.”
            </Typography>
            <Typography component="p" sx={STYLES.paragraph}>
              We provide Users of our Services with access to certain content,
              products, and services related to continuing education required to
              be completed to maintain various professional licenses
              (“Continuing Education”) from each accrediting body from which
              Inclusive Plus desires to obtain such accreditation, which may
              include, without limitation, live streaming media (e.g., webcasts
              and groupcasts), on-demand streaming media, audio and video
              courses, simulated testing software, quizzes, interactive
              simulations, presentation materials, publications, blogs, and
              similar content types that are eligible for Continuing Education
              credits or that are supplemental to Continuing Education
              accredited materials (“Continuing Education Materials”). We also
              provide a publicly accessible directory containing the names of
              medical professionals (“Providers”) who have purchased the right,
              and otherwise meet our then-current requirements, to be listed in
              the directory (the “Directory”). The Continuing Education
              Materials and Directory are collectively referred to herein as our
              “Products.”
            </Typography>
            <Typography component="p" sx={STYLES.paragraph}>
              These Terms of Use as well as any other additional terms made
              available to you by Inclusive Plus from time to time constitute a
              legally binding agreement between Inclusive Plus and you,
              governing your use of our Services. By accessing or using all or
              any part of our Services, or by clicking to accept or agree to the
              Terms of Use when this option is made available to you, you
              acknowledge that you have read and accept, and agree to become
              bound and to abide by, these Terms of Use. If you are entering
              into these Terms of Use on behalf of a company, organization, or
              other business entity, you represent and warrant that you are
              authorized to enter into these Terms of Use on behalf of such
              company, organization, or other business entity. If you do not
              agree to these Terms of Use, please do not use or access all or
              any part of our Services in any way.{" "}
              <Typography component="span" display="inline" sx={STYLES.heading}>
                IF YOU PURCHASE THE SUBSCRIPTION SERVICE (AS DEFINED BELOW),
                YOUR SUBSCRIPTION WILL BE AUTOMATICALLY RENEWED PURSUANT TO THE
                MECHANISMS SET FORTH IN SECTION 6.3 UNLESS YOU CANCEL AS
                DESCRIBED IN SECTION 6.3. ADDITIONALLY, IN SOME LOCATIONS, SUCH
                AS CALIFORNIA, YOU MIGHT HAVE A “COOLING OFF PERIOD” FOLLOWING
                YOUR PURCHASE IN WHICH YOU MAY CANCEL YOUR SUBSCRIPTION.
              </Typography>
            </Typography>
            <Typography component="p" sx={STYLES.paragraph}>
              If you utilize or access the Services through an Enterprise
              Customer (as defined below) pursuant to an Enterprise Agreement
              (as defined below) (such Users, “Enterprise Users”), your use of
              our Services is governed by both these Terms of Use and those
              terms in the applicable separate agreement(s) between Inclusive
              Plus and the third-party commercial customer (“Enterprise
              Customer”) to which your User Account is linked. You may request a
              copy of the applicable separate agreement(s) (the “Enterprise
              Agreement”) from the Enterprise Customer with which you are
              associated, but Inclusive Plus has no separate obligation to
              provide you with a copy and may be prohibited from doing so based
              on confidentiality restrictions in the relevant Enterprise
              Agreement. We have attempted to summarize the most material terms
              of such agreements generally as they pertain to you in these Terms
              of Use, but this is not an exhaustive summary nor is it
              necessarily accurate as it relates to the specific Enterprise
              Agreement to which you may be subject, and reference should be
              made to such Enterprise Agreement in its entirety for a fulsome
              understanding of the terms to which your use of our Services may
              be subject, if you are an Enterprise User. If any provision of
              these Terms of Use conflicts with the Enterprise Agreement to
              which you are subject, the Enterprise Agreement controls.
            </Typography>
            <HeaderCom title="1. Privacy and Security">
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus respects your privacy and is committed to
                protecting it through our compliance with our Privacy Policy (as
                amended, restated, supplemented, or otherwise modified from time
                to time, the “Privacy Policy”). For more information, please
                review our Privacy Policy, located at{" "}
                <Typography
                  component={Link}
                  href="/privacy-policy"
                  sx={{
                    ...STYLES.heading,
                    color: "#814cd7",
                    display: "inline",
                    textDecoration: "none",
                  }}
                >
                  Privacy policy
                </Typography>
                .
              </Typography>
            </HeaderCom>
            <HeaderCom title="2. Changes to Our Terms of Use">
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus may, in our sole discretion, change, modify,
                supplement, amend, or remove all or any part of our Terms of Use
                at any time and from time to time. Any modification will be
                emailed to Registered Users and posted on this page and become
                effective from the date of such posting, and from such effective
                date will supersede all prior versions in their entirety. The
                “Last Modified” date at the bottom of the page reflects when the
                most recent modifications became effective. You are deemed to
                have agreed to the most current version of our Terms of Use by
                accessing or using our Services in whole or in part, or by
                clicking to accept or agree to the Terms of Use when this option
                is made available to you, beginning on the “Last Modified” date.
                If you do not agree to a modification, your sole recourse is to
                terminate your use of our Services in their entirety
                immediately. Inclusive Plus encourages you to periodically
                review our Terms of Use to stay informed about any
                modifications.
              </Typography>
            </HeaderCom>
            <HeaderCom title="3. Eligibility">
              <Typography component="p" sx={STYLES.paragraph}>
                You may use the Services only if you can form a binding contract
                with Inclusive Plus, and only in compliance with these Terms of
                Use and all applicable local, state, national, and international
                laws, rules, and regulations.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus does not permit individuals under 18 years of age
                to use our Services, with the exception of Users accessing the
                Directory as a Visitor who are at least 13 years of age. By
                using our Services, other than accessing the Directory as a
                Visitor, you represent and warrant that you are at least 18
                years of age and that if you are under 18 years of age, you
                understand that your use of the Services is unauthorized,
                unlicensed, and in violation of these Terms of Use.
                Notwithstanding the foregoing, Users under 18 years of age but
                over 13 years of age may access the Directory to search for
                listed Providers as Visitors if they obtain the appropriate
                parental consents in writing and provide such parental consents
                to Inclusive Plus in advance of utilizing or accessing the
                Directory. In no event shall any person under 13 years of age
                access, use, view, or interact with the Services in any way, and
                Inclusive Plus disclaims any and all liability with respect
                thereto.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus does not permit individuals outside of the United
                States to use our Services. Our Services are controlled,
                operated, and administered from the United States. If you access
                our Services from a location outside the United States, you are
                responsible for compliance with all local laws and do so at your
                own risk. You agree that you will not use Inclusive Plus
                Services in any country or in any manner prohibited by any
                applicable laws, restrictions, or regulations.
              </Typography>
            </HeaderCom>
            <HeaderCom title="4. Service Types and Products">
              <HeaderCom title="4.1 Public Areas">
                <Typography component="p" sx={STYLES.paragraph}>
                  The Website includes public areas that are generally
                  accessible to Visitors and contain information about Inclusive
                  Plus and the Services. Visitors may access such public areas
                  as well as view the Directory free of charge and without
                  creating a User Account.
                </Typography>
              </HeaderCom>
              <HeaderCom title="4.2 Products. One of our Products is access to Continuing Education Materials">
                <Typography component="p" sx={STYLES.paragraph}>
                  In order to access Continuing Education Materials, Users shall
                  (i) create a User Account and become a Registered User, (ii)
                  complete our baseline assessment quiz (“Baseline Assessment”),
                  (iii) provide evidence in form and substance satisfactory to
                  Inclusive Plus in its sole discretion that they are a licensed
                  Provider in the fields of specialty and holding licenses from
                  the accrediting bodies from which they purport to be licensed,
                  and (iv) unless they are an Enterprise Customer, purchase
                  either the Subscription Service or the Limited Service (as
                  defined below).{" "}
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  Our other Product is the Directory listing service. To be
                  listed on the Directory, Users shall (A) create a User Account
                  and become a Registered User, (B) complete the Baseline
                  Assessment, (C) provide evidence in form and substance
                  satisfactory to Inclusive Plus in its sole discretion that
                  they are a licensed Provider in the fields of specialty and
                  holding licenses from the accrediting bodies from which they
                  purport to be licensed, and (D) unless they are an Enterprise
                  Customer, purchase a version of either the Subscription
                  Service or the Limited Service that provides Registered Users
                  with the right to create a Directory listing. Registered Users
                  who wish to be listed on the Directory as having completed a
                  certain minimum level of training on the Inclusive Plus
                  Platform (in whatever format, style, or language that such
                  certification includes as determined by Inclusive Plus in its
                  sole discretion at any time and from time to time and which is
                  subject to change at any time and from time to time in
                  Inclusive Plus’s sole discretion) (the “Certification”) shall
                  complete the Baseline Assessment as well as the requisite
                  curriculum of Continuing Education Materials dictated by
                  Inclusive Plus to achieve such Certification, which such
                  Registered Users acknowledge may change at any time and from
                  time to time, including the addition of new requirements that
                  the Registered User must complete in the future in order to
                  maintain a listing in the Directory or maintain the
                  Certification, and which may involve subscribing for
                  additional Limited Service or the Subscription Service at the
                  Registered User’s sole cost and expense to access. Inclusive
                  Plus determines, in its sole discretion, the terms on which a
                  Registered User’s listing in the Directory may carry this
                  Certification, including as to the length of time the
                  Certification will remain in place and whether it is available
                  at all, how the Certification is displayed and the verbiage
                  used to describe it, and future requirements that might apply
                  to use of the Certification.
                </Typography>
              </HeaderCom>
              <HeaderCom title="4.3 Subscription Tiers">
                <Typography component="p" sx={STYLES.paragraph}>
                  At this time, Registered Users may either purchase a
                  subscription-based version of the Services that provides
                  access to all of Inclusive Plus’s Products (“Subscription
                  Service”) or access to individual Continuing Education
                  course(s) or only those Continuing Education Materials that
                  the Registered User selects, or solely to the Directory
                  listing service, as selected by the Registered User at the
                  time of checkout (“Limited Service”). When accessed through an
                  Enterprise Customer, these are referred to as the “Enterprise
                  Subscription Service” and the “Enterprise Limited Service.”
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  At all times, the particular features or Products offered on
                  the Subscription Service, the Limited Service (and each
                  permutation thereof), the Enterprise Subscription Service, or
                  the Enterprise Limited Service (and each permutation thereof)
                  are determined by Inclusive Plus in our sole discretion and
                  are subject to change at any time and from to time in our sole
                  discretion. Each User acknowledges and agrees that different
                  scopes of Services, including access to different scopes of
                  Continuing Education Materials or the ability to create a
                  Directory listing, are included in each of the subscription
                  packages described above, and the scope of Services and length
                  of time of access to the Services included in each may change
                  from time to time and at any time in Inclusive Plus’s sole
                  discretion without notice or refund to Users. You should
                  carefully confirm the scope of Services offered in each
                  package before making a purchase and you shall assume all risk
                  of changes to that scope in the future.
                </Typography>
              </HeaderCom>
            </HeaderCom>
            <HeaderCom title="5. User Accounts">
              <Typography component="p" sx={STYLES.paragraph}>
                To access most of our Services, you must become a Registered
                User by signing up for a user account (“User Account”). To
                create a User Account, Users are required to provide their first
                and last name, relevant degree(s), medical license number(s) and
                state(s) and/or accrediting body of licensure as well as copies
                of all licenses the User purports to hold, medical specialty,
                phone number, email address, and any other information Inclusive
                Plus may reasonably request from time to time, and verify their
                phone number and email address using whichever procedures
                Inclusive Plus in its sole discretion deems necessary or
                advisable. You agree to provide true, accurate, current, and
                complete information to, and as requested by, Inclusive Plus in
                creating and continuing to use your User Account. If any of your
                information changes, you agree to update your information as
                soon as possible. If Inclusive Plus suspects that your
                information is not true, complete, current, or accurate, we may
                suspend or terminate your User Account and associated access to
                any or all of the Services for which you have subscribed in
                whole or in part in our sole discretion.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Providers listed on the Directory have the sole responsibility
                for the content and maintenance of their listing, other than the
                form and content of any certification of Inclusive Plus, and
                whether the listing includes such certification, as described
                above. Each Registered User that has a Directory listing agrees
                that they will update information in the listing as soon as a
                change occurs, and represents and warrants that all information
                they supply in the listing in the Directory is true, complete,
                current, and accurate. If Inclusive Plus suspects that the
                information is not true, complete, current, and accurate,
                Inclusive Plus may remove the Registered User’s listing from the
                Directory in its sole discretion.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                If you are an Enterprise User, you should use the organizational
                code provided to you by the Enterprise Customer to whom your
                User Account relates when creating a User Account and create a
                User Account using your organizational email address with the
                relevant Enterprise Customer, and otherwise utilize whatever
                other procedures are outlined in the materials provided to you
                by the relevant Enterprise Customer with respect to onboarding.
                If you are already a Registered User at the time that you become
                eligible to be an Enterprise User, you must either create a new
                User Account using your e-mail address associated with the
                Enterprise Customer and apply the organizational code provided
                by the Enterprise Customer, or reach out to Inclusive Plus
                directly to arrange for manual migration of your User Account.
                Note that failure to terminate any active Subscription Service
                or Limited Service on an existing User Account when you create a
                User Account as an Enterprise User, or to appropriately migrate
                your User Account, may result in your payment of fees to
                Inclusive Plus that have already been paid by the relevant
                Enterprise Customer as your User Account autorenewal features
                apply, none of which will be refunded. Further, no refunds are
                due for the remaining period on your Subscription Service or
                Limited Service when you create a new User Account, or migrate
                your existing User Account, to be an Enterprise User.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                You are responsible for maintaining the confidentiality of your
                User Account information and password. You are also responsible
                for all activities that occur under your User Account. You shall
                not assign or otherwise transfer your User Account to any other
                person or entity. You shall notify us immediately if you know of
                or suspect unauthorized use of your User Account. Inclusive Plus
                is not liable for any losses caused by any unauthorized use of
                your User Account. You shall not register for more than one User
                Account (subject to the limited right of pre-existing Registered
                Users to create a new User Account only if they become eligible
                to be an Enterprise User), create a User Account on behalf of
                someone else, or create a User Account using a false or
                misleading identity. If your User Account is revoked for any
                reason, you shall not register for a new User Account using
                another name or through other means. You also shall not use the
                User Account of any other User at any time.{" "}
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus reserves the right to terminate your User Account
                at any time and from time to time, in whole or in part, for any
                or no reason, including, without limitation, if we believe that
                you have breached these Terms of Use in any way. Inclusive Plus
                specifically disclaims any and all liability for the deletion or
                failure to store any data or information associated with your
                User Account provided by you or otherwise maintained or
                transmitted to Inclusive Plus by a Third-Party Service (as
                defined below).
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                You may delete your User Account at any time by contacting
                Inclusive Plus directly at{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="mailto:info@inclusiveplus.co"
                  sx={STYLES.link}
                >
                  info@inclusiveplus.co
                </Typography>
                . The extent to which your User information is retained by us
                following deletion is determined by our Privacy Policy. If you
                delete your User Account while you have an active Subscription
                Service, Limited Service, Enterprise Subscription Service, or
                Enterprise Limited Service, then you will immediately lose
                access to such subscription and the associated Products and are
                not entitled to any refund or rebate of any kind.
              </Typography>
            </HeaderCom>
            <HeaderCom title="6. Payment and Cancellation">
              <HeaderCom title="6.1 Processing">
                <Typography component="p" sx={STYLES.paragraph}>
                  Payments and purchases are processed via a third-party
                  integrated payment processor, which is subject to change at
                  any time and from time to time at Inclusive Plus’s sole
                  discretion. Transactions processed via a third-party payment
                  processor are subject to the terms of use and privacy policies
                  of the applicable payment processor. Inclusive Plus takes no
                  responsibility and assumes no liability for any actions or
                  omissions of such third party. To the extent permitted by
                  applicable law and subject to our Privacy Policy, you
                  acknowledge, agree, and authorize that we may use certain
                  third-party payment processors and service providers to
                  process payments, manage debit and credit card information,
                  and detect and prevent fraud.
                </Typography>
              </HeaderCom>
              <HeaderCom title="6.2 Agreement to Pay">
                <Typography component="p" sx={STYLES.paragraph}>
                  (a) Limited Service. To use the Limited Service, unless you
                  are an Enterprise User, you shall pay the charges shown to you
                  at the time of purchase for the individual Continuing
                  Education Materials or Directory listing service that you
                  select, and your User Account and payment method you provide
                  at checkout will be charged immediately upon purchase for the
                  full amount due. Applicable taxes and other charges, as well
                  as additional terms communicated to you at the time of
                  checkout, might apply. If you are subscribing for a Limited
                  Service solely to purchase access to Continuing Education
                  Materials, the charges you incur at checkout are the only
                  charges for which you are responsible. If the Limited Service
                  you purchase access to includes the Directory listing service,
                  then Section 6.3 also applies to your purchase.{" "}
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  (b) Subscription Service. To use our Subscription Service,
                  unless you are an Enterprise User, you shall initially pay the
                  charges shown to you at the time of purchase for the
                  subscription option you select, and your User Account and
                  payment method you provide at checkout will be charged
                  immediately upon purchase for the initial subscription period
                  you select. You further agree to pay such future charges in
                  the amounts, at the frequency, and in the time periods
                  communicated to you at checkout. Applicable taxes and other
                  charges might apply. Your initial purchase may be subject to a
                  minimum commitment duration, or you may receive discounts from
                  the full price depending on the commitment duration you select
                  or any deals or promotions that may be effective at the time
                  you subscribe. Your purchase is subject in all respects to any
                  additional pricing, terms, and conditions shown or made
                  available to you by Inclusive Plus during the subscription and
                  payment process as well as Section 6.3.{" "}
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  (c) Enterprise Service. If you are an Enterprise User, access
                  to the Enterprise Subscription Service or Enterprise Limited
                  Service is purchased on your behalf by an Enterprise Customer.
                  When an Enterprise Customer purchases Enterprise Services for
                  Enterprise Users, the relevant Enterprise Users identified in
                  writing to Inclusive Plus by the relevant Enterprise Customer
                  have access to the Enterprise Subscription Service or the
                  Enterprise Limited Service set forth in the relevant
                  Enterprise Agreement until the Enterprise Agreement is
                  terminated or expires, without the need for the Enterprise
                  Users to make any payments on their own, other than for a la
                  carte features such as may be made available in the future, or
                  additional upgrades that may not be part of the package
                  selected by the relevant Enterprise Customer.
                </Typography>
              </HeaderCom>
              <HeaderCom title="6.3 Auto-Renewal">
                <Typography component="p" sx={STYLES.paragraph}>
                  If you are an Enterprise User, the renewal terms of your
                  access to the Services are subject in all respects to the
                  relevant Enterprise Agreement.{" "}
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  If you are not an Enterprise User but do subscribe for the
                  Subscription Service or a Limited Service that includes the
                  Directory listing service, your Subscription Service or
                  Limited Service membership automatically extends for
                  successive renewal periods of the duration selected at the
                  time of your purchase, at the then-current non-promotional
                  subscription rate unless otherwise specified to you at the
                  time of purchase. If you do not cancel your Subscription
                  Service or relevant Limited Services by the date specified for
                  cancellation for the applicable billing cycle at the time of
                  your original purchase, you authorize us to charge you for the
                  next billing cycles included in the renewed subscription term.
                  Inclusive Plus may change the price for recurring subscription
                  fees from time to time and at any time without notice to you
                  and you shall pay the rates then currently in effect for the
                  version of the Subscription Service or relevant Limited
                  Service you select or have in effect on the date your
                  subscription renews. Price changes take effect at the start of
                  the next subscription period following the date of the price
                  change. If you do not agree to the price change, you shall
                  cancel by the date specified for cancellation for the
                  applicable billing cycle at the time of your original
                  purchase. If you purchased a multiple-period prepayment plan
                  or you were eligible for a promotional rate but are no longer
                  eligible for that rate as of your subscription renewal date,
                  then your subscription renews at our then-current
                  non-promotional subscription rates at the start of the next
                  subscription period. If you wish to renew and we are currently
                  offering promotional rates at such time, you shall renew your
                  subscription prior to the termination of your current plan in
                  order to take advantage of such rates. If you fail to renew
                  your subscription for any Subscription Service or relevant
                  Limited Service before its scheduled expiration date, then the
                  then-current non-promotional subscription rate will apply.
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  In some cases (for example, if a User scores a minimum score
                  on our Baseline Assessment), we may offer a temporary period
                  of free access to some or all of our Services for certain
                  Users. If we require it, you shall still provide credit card
                  information when registering to use all or any portion of the
                  Services at the time you create a User Account, even if you
                  are temporarily using them for free. Once the period of your
                  free use communicated to you by Inclusive Plus expires, you
                  authorize Inclusive Plus to automatically charge the payment
                  method on file for the Subscription Service or Limited Service
                  that you selected at the time you began your free use of the
                  relevant Services immediately upon expiration of the period of
                  your free use and subject to such terms and conditions as are
                  communicated to you at the time you enroll in the free
                  Services.
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  Every purchase on the Services is subject to such additional
                  purchase terms as are communicated to you at the time of
                  purchase, and to the extent of a conflict with these Terms of
                  Use, such additional terms supersede these Terms of Use.
                </Typography>
              </HeaderCom>
              <HeaderCom title="6.4 Cancellation">
                <Typography component="p" sx={STYLES.paragraph}>
                  (a) Cancellation of Subscription Service or Limited Service.
                  If you are not an Enterprise User but do subscribe for the
                  Subscription Service or Directory listing service as a Limited
                  Service, you may cancel your Subscription Service or such
                  Limited Service subscription at any time by contacting
                  Customer Support at{" "}
                  <Typography
                    target="_blank"
                    component={Link}
                    href="mailto:info@inclusiveplus.co"
                    sx={STYLES.link}
                  >
                    info@inclusiveplus.co
                  </Typography>
                  . If you terminate your Subscription Service or such Limited
                  Service subscription, you will continue to have access to our
                  Subscription Service or such Limited Service through the last
                  date of the then-current subscription period for which you
                  have paid. It is not possible to terminate any subscriptions
                  for any Limited Service other than the Directory as all orders
                  are immediately and completely fulfilled.
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  (b) Cancellation of Enterprise Subscription Service or
                  Enterprise Limited Service. The Enterprise Customer paying for
                  your access to the Services as an Enterprise User controls
                  such access, and they and we may terminate your access to our
                  Services at any time, including by expiration, termination, or
                  non-renewal of the relevant Enterprise Agreement. You agree
                  that we are not liable to you or any third party for any
                  termination or cancellation of your access to, or use of, our
                  Services. If you are no longer eligible to receive our
                  Services from an Enterprise Customer as determined by the
                  Enterprise Customer in its sole discretion, the Enterprise
                  Customer may terminate your access to our Services without
                  termination of the Enterprise Agreement. You may cancel your
                  Services subscription as an Enterprise User at any time by
                  contacting Customer Support at{" "}
                  <Typography
                    target="_blank"
                    component={Link}
                    href="mailto:info@inclusiveplus.co"
                    sx={STYLES.link}
                  >
                    info@inclusiveplus.co
                  </Typography>{" "}
                  or, if applicable, by following whichever other cancellation
                  procedures are advised to you by Inclusive Plus or the
                  relevant Enterprise Customer.
                </Typography>
                <Typography component="p" sx={STYLES.paragraph}>
                  (c) Effect of Cancellation or Non-Payment. If your credit or
                  debit account has been closed or your payment method is
                  otherwise invalid such that we or the Third-Party Services
                  with which we work are not able to collect payment for an
                  upcoming billing cycle, or if the Enterprise Agreement to
                  which your User Account relates expires, terminates, or is
                  otherwise not renewed, your subscription may not renew and we
                  may disable or suspend your User Account, effective as of the
                  end of your current billing cycle, in our sole discretion,
                  until payment for the next billing cycle is made. If payment
                  is not collected in a timely manner, then Inclusive Plus will
                  communicate this failed collection, at which point a continued
                  non-payment will result in total loss of access to all
                  Services, and we may terminate the associated User Account.
                  For information on your rights with respect to the deletion of
                  your User Account, please see our Privacy Policy.
                </Typography>
              </HeaderCom>
              <HeaderCom title="6.5 Refunds">
                <Typography component="p" sx={STYLES.paragraph}>
                  Inclusive Plus does not provide refunds or credits for any
                  cancellations, terminations, or use of only a partial
                  subscription period for any or no reason in any event unless
                  Inclusive Plus decides otherwise in its sole discretion. You
                  represent and warrant that you understand that you are not
                  entitled to any refunds in any situations.
                </Typography>
              </HeaderCom>
              <HeaderCom title="6.6 Modifications">
                <Typography component="p" sx={STYLES.paragraph}>
                  Inclusive Plus reserves the right to revise the terms of the
                  agreement to pay, prices charged for the Services, and
                  cancellation policies, at any time and from time to time.
                </Typography>
              </HeaderCom>
              <HeaderCom title="6.7 Denominations">
                <Typography component="p" sx={STYLES.paragraph}>
                  All prices are quoted in U.S. Dollars unless otherwise
                  indicated.
                </Typography>
              </HeaderCom>
            </HeaderCom>
            <HeaderCom title="7. Modifications and Access to our Services">
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus reserves the right, at any time and from time to
                time, to modify or discontinue, temporarily or permanently, to
                you or to Users generally, our Services (or any part thereof)
                with or without notice. We may permanently or temporarily
                terminate or suspend your access to our Services without notice
                or liability for any reason, including if we determine that you
                violated any provision of these Terms of Use, or for no reason.
                Upon termination for any reason or no reason, you continue to be
                bound by these Terms of Use. Inclusive Plus shall not be liable
                to you or to any third party for any modification, suspension,
                or discontinuance of our Services, in whole or in part.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                You understand and agree that there may be interruptions in our
                Services, Services access, or access to your User Account due to
                circumstances both within and outside of our control, such as
                instances of system failure, maintenance, repair, or
                malfunction. We take all reasonable steps to ensure that the
                Website and App (if made available in the future) are available
                24 hours every day, 365 days per year. However, websites do
                sometimes encounter downtime due to server and other technical
                issues. Where possible we will try to give you advance warning
                of maintenance issues but shall not be obliged to do so. We have
                no liability to you or any other person or entity as a result of
                unavailability of our Services for any reason.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus does not represent or warrant that our Services
                will be compatible or interoperable with your web browser,
                hardware, software, equipment, or device. Currently, Inclusive
                Plus is optimized for desktop browsing. Furthermore, you
                acknowledge that compatibility and interoperability problems can
                cause the performance of your web browser, hardware, software,
                equipment, or device to diminish or fail completely, and may
                result in permanent damage, loss of data, and corruption of your
                software and files. You acknowledge and agree that Inclusive
                Plus has no liability to you for any losses suffered resulting
                from or arising in connection with compatibility and
                interoperability problems. The quality (e.g., the resolution) of
                streaming content, as well as the download speed of downloadable
                content, may be affected by a variety of factors, such as your
                location, the content being streamed or downloaded and the speed
                of your Internet connection. Inclusive Plus makes no
                representation or warranty regarding access to content available
                through or in connection with Services, such as Continuing
                Education Materials, including the quality of streaming content
                and the download speed of downloadable content.
              </Typography>
            </HeaderCom>
            <HeaderCom title="8. Electronic Communications ">
              <Typography component="p" sx={STYLES.paragraph}>
                Visiting the Website, accessing the App (if made available in
                the future), and sending emails to Inclusive Plus constitute
                electronic communications. Our delivery of our Services to you
                is dependent on your consent to receiving electronic
                communications, particularly via email.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                You consent to receive communications from Inclusive Plus about
                these Terms of Use, the Privacy Policy, our Services (including
                announcing new content or features, sending you introductory
                materials, reminding you to complete unfinished coursework,
                reminders about auto-renewal or subscription expirations,
                customer service, and other Service-related communications), and
                any notifications that may be required by law or for other
                business purposes through electronic means, including, without
                limitation, email, push notifications, or by posting on the
                Website or App (if made available in the future). You may also
                from time to time receive promotional communications from
                Inclusive Plus. These promotional communications, as well as
                other communications you may receive such as emails containing
                educational content and some emails related to your direct use
                of the Services as a User may be opted out of by emailing{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="mailto:info@inclusiveplus.co"
                  sx={STYLES.link}
                >
                  info@inclusiveplus.co
                </Typography>
                . If you later decide that you do not want to receive future
                electronic communications from Inclusive Plus, you may send an
                email to{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="mailto:info@inclusiveplus.co"
                  sx={STYLES.link}
                >
                  info@inclusiveplus.co
                </Typography>
                . Other electronic communications, for example, about our Terms
                of Use and Privacy Policy, other operational aspects of our
                Services, and notifications required by law or for other
                business purposes unrelated to your direct use of our Services,
                cannot be opted out of. You may still choose to opt out of such
                electronic communications, but in such case, we will terminate
                your User Account and/or access to our Services.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                The delivery of any communication from us is effective when it
                is sent by us, regardless of whether you read the communication
                when you receive it or whether you actually receive the
                communication. You agree that all communications sent to you
                electronically satisfy any legal requirement that such
                communications be in writing.
              </Typography>
            </HeaderCom>
            <HeaderCom title="9. Tracking Continuing Education Credits">
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus is not responsible for the tracking of any
                Continuing Education credits or for reporting Continuing
                Education credits earned while you use the Services to any
                person or entity. You agree that you shall print any Continuing
                Education certificate(s) awarded to you and present such
                certificates or other evidence of completion required to the
                relevant organization in charge of your Continuing Education
                reporting, and that Inclusive Plus has no liability for or
                responsibility with respect to ensuring your Continuing
                Education compliance in any jurisdiction.{" "}
              </Typography>
            </HeaderCom>
            <HeaderCom title="10. Third Party Services, Accounts, and Links">
              <Typography component="p" sx={STYLES.paragraph}>
                Certain services made available via our Services, or that our
                Services are integrated with or with which our Services might
                otherwise interact, are delivered by third party websites,
                services, and applications that are not owned or controlled by
                Inclusive Plus (“Third-Party Services”). Some Third-Party
                Services are required to make our Services available to you, and
                others, while not required, will optimize and maximize your
                experience of the Services. An example of a Third-Party Service
                which you are required to use in order to utilize our Services
                is our third-party payment processor as described above. An
                example of a Third-Party Service that is not required but that
                might maximize your experience, if we make it available, is the
                option to access our Services by using OAuth (Open
                Authorization) logins through a Third-Party Service. When you
                utilize a Third-Party Service in connection with your use of our
                Services, you authorize us or another Third-Party Service to
                access and collect certain data from, and provide certain data
                to, each such Third-Party Service (“Third-Party Data”).
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus does not own or control, and does not endorse or
                assume any responsibility for, any such Third-Party Services.
                You use such Third-Party Services at your own risk and expressly
                relieve Inclusive Plus from any and all liability arising out
                of, relating to, or in connection with your use of any
                Third-Party Services. If you access a Third-Party Service from
                our Services, share your personal information on or through any
                Third-Party Services, or use a Third-Party Service to register
                for, log in to or otherwise utilize our Services, you do so at
                your own risk, and you understand that those Third-Party
                Services may have their own terms of use and privacy policies,
                and that these Terms of Use and our Privacy Policy do not apply
                to your use of such Third-Party Services. You further agree that
                Inclusive Plus is not responsible or liable for any acts,
                errors, or omissions of any Third-Party Service or for the
                accuracy, completeness, availability, or timeliness of the
                information provided by such Third-Party Services to Inclusive
                Plus or for any decisions you make on the basis of the
                information provided. If a Third-Party Service stops providing
                access to some or all of the features or functionality currently
                or historically available or stops providing access to such
                features and functionality on reasonable terms, as determined by
                Inclusive Plus in our sole discretion, we may stop providing
                access to certain features or functionality of our Service that
                depending on such features or functionality of Third-Party
                Services that are no longer available. By using any product,
                service, or functionality originating from our Services, you
                hereby acknowledge and consent that Inclusive Plus may share
                such information and data with any Third-Party Service with whom
                Inclusive Plus has a contractual relationship to provide the
                requested product, service, or functionality. You may withdraw
                your consent to the collection and use of Third-Party Data by
                deleting your User Account.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Our Services may contain links to other websites or content that
                we derive from third parties (“Linked Websites”). The Linked
                Websites are not under the control of Inclusive Plus, and
                Inclusive Plus is not responsible for the contents of any Linked
                Website. Inclusive Plus has not reviewed all of the material
                made available on such Linked Websites nor any other materials,
                products, or advertising on the Linked Websites, and Inclusive
                Plus does not represent or warrant as to the accuracy, currency,
                content, fitness, lawfulness, or quality of the material, goods
                or services available through Linked Websites. Inclusive Plus
                provides these links to you only as a convenience, and the
                inclusion of any link does not imply endorsement by Inclusive
                Plus of the site or any association with its operators.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                When you click a link to a Linked Website or Third-Party Service
                while using our Services, or use a Third-Party Service that is
                integrated with our Services, we may, but will not always,
                notify you that you have left our Services or that you are using
                such Third-Party Services at that time.
              </Typography>
            </HeaderCom>
            <HeaderCom title="11. Promotions">
              <Typography component="p" sx={STYLES.paragraph}>
                In addition to the terms and conditions of these Terms of Use,
                any periodic discounts, contests, sweepstakes, surveys, games,
                loyalty programs, or similar promotions (collectively,
                “Promotions”) made available through our Services may be
                governed by specific rules that are separate from these Terms of
                Use. By participating in any such Promotion, you will become
                subject to those rules, which may vary from these Terms of Use.
                We urge you to review any specific rules applicable to a
                particular Promotion, which will be linked with such Promotion,
                and to review our Privacy Policy which, in addition to these
                Terms of Use, governs any information you submit in connection
                with such Promotion. To the extent that the terms and conditions
                of such rules conflict with these Terms of Use, the terms and
                conditions of such rules will control.
              </Typography>
            </HeaderCom>
            <HeaderCom title="12. Directory Search Ranking ">
              <Typography component="p" sx={STYLES.paragraph}>
                The ranking of Providers shown to Users in search results on the
                Directory depends on a variety of factors, including, without
                limitation, Registered User search parameters (e.g., Provider
                location, medical specialty, and gender) and other Registered
                User preferences (e.g., previous searches, saved Providers and
                location from which the Registered User is searching). Inclusive
                Plus does not guarantee to Registered Users any minimum page
                views of any Directory listing, that any Directory listing will
                appear in any search results or in any particular order in any
                search results, or that any Registered User listed in the
                Directory will achieve any exposure whatsoever or obtain any new
                patients at all based on their listing in the Directory, which
                each User listed in the Directory acknowledges may be zero in
                each case.{" "}
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus further disclaims any and all liability to Users
                that utilize the Directory in order to locate a new Provider or
                as Visitors as to whether any Providers shown in response to a
                User’s search meet all User search parameters or as to the
                quality, availability, or relevant credentials of any Provider.
                Listing of a Provider in the Directory does not constitute a
                recommendation, endorsement, or suggestion by Inclusive Plus
                with respect to that Provider, whether such Provider’s listing
                contains the Certification or otherwise, and you are advised
                that Inclusive Plus does not routinely conduct background checks
                or any other investigations of any kind of the Providers on the
                Directory. By entering a search in the Directory, each User
                represents and warrants that such User understands that the
                Certification is merely an indication that the Provider has
                completed a minimum level of training on the Inclusive Plus
                Platform and is not a recommendation, endorsement, or suggestion
                by Inclusive Plus. Inclusive Plus does not represent or warrant,
                and expressly disclaims all representations and warranties, (a)
                that any Provider in the Directory currently holds the relevant
                license in the fields of specialty and from the accrediting
                bodies from which they purport to be licensed or that any other
                information in a Provider’s listing is accurate, complete, or
                current, (b) that Providers shown in response to a User search
                are appropriate or desirable for the User’s needs, or (c) as to
                the quality, knowledge, or skill of any Provider listed in the
                Directory.{" "}
              </Typography>
            </HeaderCom>
            <HeaderCom title="13. Intellectual Property">
              <Typography component="p" sx={STYLES.paragraph}>
                Inclusive Plus grants you a non-exclusive, non-transferable,
                revocable, limited, royalty-free license to view, access, and
                use our Services strictly in accordance with these Terms of Use
                and in any event solely for your personal, non-commercial use as
                contemplated herein. Our Services and all content included as
                part of our Services, such as text, graphics, logos, images,
                illustrations, patents, trademarks, service marks, copyrights,
                photographs, audio, videos, music, as well as the compilation
                thereof, and any software used on our Services, and all
                intellectual property rights related thereto, are the property
                of Inclusive Plus and/or any licensor of Continuing Education
                Materials to Inclusive Plus, and are protected by copyright and
                other laws that protect intellectual property and proprietary
                rights. You agree to observe and abide by all copyright and
                other proprietary notices, legends, or other restrictions
                contained in any such content and to not make any changes
                thereto. The Platform includes third-party open-source software
                (“OSS”). Any OSS provided hereunder is provided pursuant to such
                OSS’s license terms and conditions. Inclusive Plus does not own
                or control any such OSS. The OSS that Inclusive Plus currently
                uses are Google Tag Manager, Google Analytics, and Calendly.
                Each OSS that we use has its own terms of use and privacy
                policies, and these Terms of Use and our Privacy Policy do not
                apply to the OSS. The terms and conditions of the applicable OSS
                that Inclusive Plus currently uses are available at the
                following links:{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="https://marketingplatform.google.com/about/tag-manager/"
                  sx={STYLES.link}
                >
                  https://marketingplatform.google.com/about/tag-manager/
                </Typography>
                ;{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="https://marketingplatform.google.com/about/analytics/"
                  sx={STYLES.link}
                >
                  https://marketingplatform.google.com/about/analytics/
                </Typography>
                ;{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="https://policies.google.com/terms?hl=en"
                  sx={STYLES.link}
                >
                  https://policies.google.com/terms?hl=en
                </Typography>
                ;{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="https://calendly.com/terms"
                  sx={STYLES.link}
                >
                  https://calendly.com/terms
                </Typography>
                . By using the Platform as contemplated herein, each User
                represents and warrants that such User has read and understood,
                and covenants that such User will comply with, the terms and
                conditions of the applicable OSS licenses. The OSS that we use
                are Third-Party Services hereunder, and all terms applicable to
                Third-Party Services apply to your use of OSS as part of your
                use of the Platform.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                You shall not modify, copy, distribute, publish, transmit,
                perform, reproduce, reuse, resell, license, reverse engineer,
                participate in the transfer or sale of, create derivative works
                of, or in any way exploit any of the intellectual property or
                content found on our Services, or our Services or any component
                thereof, in whole or in part. Inclusive Plus content and each
                portion of the Services is not for resale. You agree that you do
                not acquire any ownership rights in any protected content. We do
                not grant you any licenses, express or implied, to the
                intellectual property of Inclusive Plus or our licensors except
                as expressly authorized by these Terms of Use and your use of
                our Services and any and all intellectual property thereon for
                any purpose not expressly permitted by these Terms of Use is
                strictly prohibited.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                By sending descriptions, information, or photographs to the
                Company, including, without limitation, to enable the Company to
                offer a Directory listing to you, you expressly grant the
                Company a worldwide, transferable, sublicensable, perpetual,
                irrevocable, royalty-free, and non-exclusive license to publicly
                display, use, reproduce, modify, publish, archive, store,
                transmit, create derivative works from, and distribute such
                descriptions, information or photographs in any form, media,
                software or technology of any kind now existing or developed in
                the future, without notification to and/or approval from you.
                Without limiting the generality of the previous sentence, you
                also grant the Company the right to use your descriptions,
                information, and photographs and any facts, data, ideas,
                concepts, or know-how contained therein as if they were Ideas
                (as defined below).
              </Typography>
            </HeaderCom>
            <HeaderCom title="13.1 DMCA Notice">
              <Typography component="p" sx={STYLES.paragraph}>
                Since we respect artist and content owner rights, it is our
                policy to respond to alleged infringement notices that comply
                with the Digital Millennium Copyright Act of 1998 (“DMCA”). If
                you believe that your work has been copied and posted on the
                Services in a way that constitutes copyright infringement,
                please notify our copyright agent (as set forth in the DMCA, a
                federal law that provides recourse for copyright owners who
                believe that material appearing on the Internet infringes their
                rights under U.S. copyright law). We will respond to notices of
                alleged infringement that comply with the DMCA. For your
                complaint to be valid under the DMCA, you must provide the
                following information in writing:
              </Typography>
              <ol style={{ margin: "0px", ...STYLES.paragraph }}>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    An electronic or physical signature of a person authorized
                    to act on behalf of the copyright owner;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    Identification of the copyrighted work that you claim has
                    been infringed;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    Identification of the material that is claimed to be
                    infringing and where it is located on the Services;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    Information reasonably sufficient to permit us to contact
                    you, such as your address, telephone number, and email
                    address;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    A statement that you have a good faith belief that use of
                    the material in the manner complained of is not authorized
                    by the copyright owner, its agent, or law; and
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    A statement made under penalty of perjury, that the above
                    information is accurate, and that you are the copyright
                    owner or are authorized to act on behalf of the owner.
                  </Typography>
                </li>
              </ol>
              <Typography component="p" sx={STYLES.paragraph}>
                The above information must be submitted to our agent for notice
                of claims of copyright or other intellectual property
                infringement, who can be reached by email at{" "}
                <Typography
                  target="_blank"
                  component={Link}
                  href="mailto:info@inclusiveplus.co"
                  sx={STYLES.link}
                >
                  info@inclusiveplus.co
                </Typography>
                . UNDER FEDERAL LAW, IF YOU KNOWINGLY MISREPRESENT THAT ONLINE
                MATERIAL IS INFRINGING, YOU MAY BE SUBJECT TO CRIMINAL
                PROSECUTION FOR PERJURY AND CIVIL PENALTIES, INCLUDING MONETARY
                DAMAGES, COURT COSTS, AND ATTORNEYS’ FEES.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                Please note that this procedure is exclusively for notifying us
                and our affiliates that your copyrighted material has been
                infringed. The preceding requirements are intended to comply
                with our rights and obligations under the DMCA, including 17
                U.S.C. §512(c), but do not constitute legal advice. It may be
                advisable to contact an attorney regarding your rights and
                obligations under the DMCA and other applicable laws.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                In accordance with the DMCA and other applicable law, the
                Company has adopted a policy of terminating, in appropriate
                circumstances, Users who are deemed to be repeat infringers. The
                Company may also at its sole discretion limit access to the
                Services and/or terminate the User Accounts or access of any
                Users who infringe any intellectual property rights of others,
                whether or not there is any repeat infringement.
              </Typography>
            </HeaderCom>
            <HeaderCom title="14. Ideas">
              <Typography component="p" sx={STYLES.paragraph}>
                You may choose to or we may invite you to submit comments or
                ideas about our Services, including, without limitation,
                suggestions about how to improve our Services or our Products
                (“Idea” or “Ideas”). By submitting any Idea, you agree that your
                disclosure is gratuitous, unsolicited, and without restriction
                and will not place Inclusive Plus under any fiduciary or other
                obligation, and that we are free to use the Idea without any
                additional compensation to you, and/or to disclose the Idea on a
                non-confidential basis or otherwise to anyone. You further
                acknowledge that, by acceptance of your submission, Inclusive
                Plus does not waive any rights to use similar or related ideas
                previously known to Inclusive Plus, or developed by its
                employees, or obtained from sources other than you.
              </Typography>
            </HeaderCom>
            <HeaderCom title="15. Prohibited Uses">
              <Typography component="p" sx={STYLES.paragraph}>
                As a condition of your use of our Services, you shall not use
                our Services for any purpose that is unlawful or prohibited by
                these Terms of Use. You shall not use our Services in any manner
                which could damage, disable, overburden, or impair our Services
                or interfere with any other party’s use and enjoyment of our
                Services. You shall not obtain or attempt to obtain any
                materials or information through any means not intentionally
                made available or provided for through our Services or screen
                record and tape any portion of any material accessed through our
                Services. Without limiting the generality of the foregoing, by
                accessing and using the Services, you agree to comply with the
                following:
              </Typography>
              <ol style={{ margin: "0px", ...STYLES.paragraph }}>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall comply with all applicable laws in your use of the
                    Services and will not use the Services for any unlawful
                    purpose;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not access or use the Services to collect any
                    market research for a competing business;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not use any robot, spider, scraper, or other
                    automated means to access the Services for any purpose
                    without our express written permission; provided, however,
                    we grant the operators of public search engines permission
                    to use spiders to copy materials from the public portions of
                    the Website for the sole purpose of and solely to the extent
                    necessary for creating publicly available searchable indices
                    of the materials;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not impersonate any person or entity or falsely
                    state or otherwise misrepresent your affiliation with a
                    person or entity, particularly in regards to any information
                    presented in the Directory;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not interfere with or attempt to interrupt the
                    proper operation of the Services through the use of any
                    virus, device, information collection or transmission
                    mechanism, software, or routine, or access or attempt to
                    gain access to any data, files, or passwords through
                    hacking, password or data mining, or any other means;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not circumvent, disable or otherwise interfere
                    with security related features of the Services;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not attempt to or actually access the Services by
                    any means other than through Company-provided platforms or
                    public website access;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not attempt to decipher, decompile, disassemble,
                    reverse engineer, or otherwise attempt to discover or
                    determine the source code of any web pages used to provide
                    the Services;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not use the Services in a manner inconsistent with
                    the intended use of the Services;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not modify, adapt, translate, or create derivative
                    works based upon the Services, except and only to the extent
                    expressly permitted by the Company herein or to the extent
                    the foregoing restriction is expressly prohibited by
                    applicable law; and
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    You shall not allow usage by others in such a way as to
                    violate these Terms of Use.
                  </Typography>
                </li>
              </ol>
            </HeaderCom>
            <HeaderCom title="16. No Professional Advice">
              <Typography component="p" sx={STYLES.paragraph}>
                THE OPINIONS, RECOMMENDATIONS AND PERSPECTIVES EXPRESSED VIA THE
                SERVICES ARE THOSE OF THE AUTHORS ONLY AND DO NOT NECESSARILY
                REFLECT THE OPINIONS, IDEAS OR RECOMMENDATIONS OF INCLUSIVE
                PLUS, THE INSTITUTIONS WITH WHICH AUTHORS ARE AFFILIATED, OR
                THEIR RESPECTIVE AFFILIATES, SUBSIDIARIES, EDITORIAL BOARDS,
                CLINICAL OR OTHER ADVISORY BOARDS, CONSULTANTS, AND/OR THE
                COMMERCIAL SUPPORTERS OF ANY OF THE FOREGOING. CLINICAL JUDGMENT
                MUST GUIDE EACH PROVIDER IN WEIGHING THE BENEFIT OF ANY
                DIAGNOSTIC INTERVENTION OR TREATMENT APPROACH AGAINST THE RISK
                OF THE INTERVENTION OR TREATMENT. DOSAGE, INDICATIONS AND
                METHODS OF USE FOR PRODUCTS REFERRED TO VIA THE SERVICES ARE NOT
                NECESSARILY THE SAME AS INDICATED IN THE PACKAGE INSERT FOR THE
                PRODUCT AND MAY REFLECT THE CLINICAL EXPERIENCE OR EXPERTISE OF
                THE INDIVIDUAL AUTHOR. ANY DIAGNOSTIC PROCEDURES OR TREATMENTS
                SHOULD NOT BE UTILIZED BY PROVIDERS OR OTHER HEALTHCARE
                PROFESSIONALS WITHOUT EVALUATION OF THEIR PATIENTS’ CONDITIONS,
                AND OF POSSIBLE CONTRAINDICATIONS OR RISKS AND WITHOUT A REVIEW
                OF ANY APPLICABLE MANUFACTURER’S PRODUCT INFORMATION AND
                COMPARISON WITH THE RECOMMENDATIONS OF OTHER AUTHORITIES. THE
                CONTINUING EDUCATION MATERIALS ARE NOT INTENDED AS, AND YOU
                SHALL NOT UNDERSTAND, TREAT, OR CONSTRUE THEM AS, MEDICAL
                ADVICE. INCLUSIVE PLUS MAKES NO GUARANTEE THAT INFORMATION
                CONTAINED IN OUR SERVICES, INCLUDING IN THE CONTINUING EDUCATION
                MATERIALS, IS ERROR FREE OR THAT ANY RECOMMENDATIONS WILL BE
                USEFUL OR WILL SUBSTITUTE FOR LICENSED MEDICAL EDUCATION.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                THE INFORMATION CONTAINED IN OUR SERVICES, OTHER THAN LISTINGS
                IN THE DIRECTORY, IS INTENDED SOLELY FOR USE BY PROVIDERS. THE
                INFORMATION CONTAINED IN OUR SERVICES IS NOT A SUBSTITUTE FOR
                ADVICE FROM A PROFESSIONAL WHO IS AWARE OF THE FACTS AND
                CIRCUMSTANCES OF ANY INDIVIDUAL PATIENT SITUATION, NOR IS IT
                INTENDED FOR CONSUMERS, PATIENTS, OR NON-PROVIDERS. INCLUSIVE
                PLUS EXPRESSLY RECOMMENDS THAT YOU SEEK ADVICE FROM A LICENSED
                PROFESSIONAL.
              </Typography>
            </HeaderCom>
            <HeaderCom title="17. Accuracy of Information; products, content, and specifications">
              <Typography component="p" sx={STYLES.paragraph}>
                We attempt to ensure that information provided by Inclusive Plus
                on or in connection with the Services is complete, accurate, and
                current. Despite our efforts, such information may occasionally
                be inaccurate, incomplete, or out of date. Accordingly, we make
                no representation or warranties as to the completeness,
                accuracy, or currency of such information, including all
                descriptions, images, references, features, content,
                specifications, products, and prices of products and services
                described or depicted on the Services. Such information is also
                subject to change at any time without notice. Descriptions and
                images of, and references to, third-party products or services
                available in connection with the Services do not imply Inclusive
                Plus’s endorsement of such third-party products or services. The
                inclusion of any products or services on the Services at a
                particular time does not imply or warrant that these products or
                services will be available at any time. It is your
                responsibility to ascertain and obey all applicable local,
                state, federal and international laws (including minimum age
                requirements) in regard to the possession, use and sale of any
                item purchased from or in connection with the Services.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                The Company may, in our sole discretion, provide descriptions of
                the Services and Continuing Education Materials that are
                available on the Website, but we do not warrant that the
                descriptions are accurate, complete, reliable, current, or
                error-free, or that any Services or Continuing Education
                Materials will be available, even if noted as so on our Website.
                Such information and the availability of any Services or
                Continuing Education Material are subject to change at any time
                without notice.
              </Typography>
            </HeaderCom>
            <HeaderCom title="18. Disclaimer of Warranties">
              <Typography component="p" sx={STYLES.paragraph}>
                YOU EXPRESSLY UNDERSTAND AND AGREE THAT:
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                YOUR USE OF OUR SERVICES IS ENTIRELY AT YOUR SOLE RISK. OUR
                SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS.
                CHANGES ARE PERIODICALLY MADE TO OUR SERVICES AND MAY BE MADE AT
                ANY TIME WITHOUT NOTICE TO YOU. INCLUSIVE PLUS AND ITS
                SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES,
                AGENTS, PARTNERS, AND LICENSORS EXPRESSLY DISCLAIM ALL
                REPRESENTATIONS AND WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
                IMPLIED, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                WITHOUT LIMITING THE GENERALITY OF THE FOREGOING OR ANY OTHER
                DISCLAIMER SET FORTH HEREIN, INCLUSIVE PLUS AND ITS
                SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES,
                AGENTS, PARTNERS, AND LICENSORS MAKE NO REPRESENTATION OR
                WARRANTY:
              </Typography>
              <ol style={{ margin: "0px", ...STYLES.paragraph }}>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    THAT OUR SERVICES OR ANY THIRD-PARTY SERVICES WILL MEET YOUR
                    REQUIREMENTS;{" "}
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
                    ERROR-FREE;{" "}
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    AS TO THE ACCURACY, RELIABILITY, COMPLETENESS, OR
                    CORRECTNESS OF ANY CONTENT ON OUR SERVICES OR ANY ANALYSIS
                    OR RECOMMENDATIONS PROVIDED TO YOU THROUGH OUR SERVICES;{" "}
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    AS TO WHETHER THE QUALITY OF ANY PRODUCTS, SERVICES,
                    INFORMATION OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU
                    THROUGH OUR SERVICES WILL MEET YOUR EXPECTATIONS;{" "}
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    AS TO THE CREDIBILITY, APPROPRIATENESS FOR YOUR NEEDS, OR
                    QUALITY OF ANY PROVIDERS LISTED ON THE DIRECTORY;
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    AS TO THE ACCURACY, RELIABILITY, COMPLETENESS, OR
                    CORRECTNESS OF ANY INFORMATION IN ANY PROVIDER LISTING ON
                    THE DIRECTORY; OR{" "}
                  </Typography>
                </li>
                <li>
                  <Typography component="p" sx={STYLES.paragraph}>
                    AS TO WHETHER ANY ERRORS ON OUR SERVICES WILL BE CORRECTED.{" "}
                  </Typography>
                </li>
              </ol>
              <Typography component="p" sx={STYLES.paragraph}>
                ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH USE OF OUR
                SERVICES IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU
                ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR
                LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH
                MATERIAL.{" "}
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                U.S. FEDERAL LAW, SOME STATES AND PROVINCES, AND OTHER
                JURISDICTIONS DO NOT ALLOW THE EXCLUSION AND LIMITATIONS OF
                CERTAIN IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS MAY NOT
                APPLY TO YOU. THESE TERMS OF USE GIVE YOU SPECIFIC LEGAL RIGHTS,
                AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM STATE TO
                STATE. THE DISCLAIMERS AND EXCLUSIONS UNDER THESE TERMS OF USE
                WILL NOT APPLY TO THE EXTENT PROHIBITED BY APPLICABLE LAW.{" "}
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY
                YOU FROM INCLUSIVE PLUS OR FROM OUR SERVICES CREATES ANY
                REPRESENTATION OR WARRANTY NOT EXPRESSLY STATED IN THE TERMS OF
                USE.
              </Typography>
            </HeaderCom>
            <HeaderCom title="19. Limitation of Liability">
              <Typography component="p" sx={STYLES.paragraph}>
                YOU EXPRESSLY UNDERSTAND AND AGREE THAT IN NO EVENT SHALL
                INCLUSIVE PLUS, ITS SUBSIDIARIES, ITS AFFILIATES, THEIR
                RESPECTIVE OFFICERS, DIRECTORS, AGENTS, EMPLOYEES, OR PARTNERS,
                OR ANY OF ITS OR THEIR RESPECTIVE THIRD-PARTY SERVICE PROVIDERS,
                LICENSORS AND SUPPLIERS (“INDEMNIFIED PARTIES”) BE LIABLE TO ANY
                PERSON, INCLUDING, WITHOUT LIMITATION, ANY USER, FOR ANY DIRECT,
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR
                PUNITIVE DAMAGES, OR ANY OTHER DAMAGES WHATSOEVER, INCLUDING,
                WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE,
                DATA OR OTHER INTANGIBLE LOSSES (EVEN IF WE HAVE BEEN ADVISED OF
                THE POSSIBILITY OF SUCH DAMAGES), ARISING OUT OF, OR RESULTING
                FROM, (A) THE USE OR THE INABILITY TO USE THE SERVICES; (B) THE
                USE OF ANY CONTENT OR OTHER MATERIAL ON THE SERVICES OR
                APPLICATIONS LINKED TO OUR APPLICATIONS, OR ANY ERRORS,
                MISTAKES, OR INACCURACIES OF ANY SUCH CONTENT OR ANY LOSS OR
                DAMAGE INCURRED AS A RESULT OF THE USE OF ANY SUCH CONTENT, (C)
                THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES
                RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES
                PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS
                ENTERED INTO THROUGH OR FROM THE SERVICES; (D) UNAUTHORIZED
                ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA OR
                UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS; (E) STATEMENTS OR
                CONDUCT OF ANY THIRD PARTY ON OUR SERVICES; (F) ANY BUGS,
                VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO
                OR THROUGH OUR SERVICES BY ANY THIRD PARTY; (F) ANY USE OF THE
                DIRECTORY; OR (H) ANY OTHER MATTER RELATING TO THE SERVICES.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                YOU UNDERSTAND AND AGREE THAT THE CANCELLATION OR TERMINATION OF
                YOUR SUBSCRIPTION AND/OR DELETION OF YOUR USER ACCOUNTIS YOUR
                SOLE RIGHT AND REMEDY WITH RESPECT TO ANY DISPUTE WITH US
                INCLUDING, WITHOUT LIMITATION, ANY DISPUTE RELATED TO, OR
                ARISING OUT OF: (I) THESE TERMS & CONDITIONS OR OUR ENFORCEMENT
                OR APPLICATION THEREOF; (II) ANY PRACTICE OR POLICY OF INCLUSIVE
                PLUS INCLUDING THESE TERMS OF USE AND OUR PRIVACY POLICY, OR OUR
                ENFORCEMENT OR APPLICATION OF THESE POLICIES; (III) THE CONTENT
                AVAILABLE THROUGH THE SERVICES OR ANY CHANGE IN CONTENT PROVIDED
                THROUGH THE SERVICES AND/OR APPLICATIONS THROUGH THE SERVICES;
                (IV) YOUR ABILITY TO ACCESS AND/OR USE OUR SERVICES; (V) THE
                AMOUNT OR TYPES OF OUR FEES OR CHARGES, SURCHARGES, APPLICABLE
                TAXES, OR BILLING METHODS, OR ANY CHANGE TO OUR FEES OR CHARGES,
                APPLICABLE TAXES, OR BILLING METHODS; OR (VI) ANY OTHER MATTER
                RELATING TO OUR SERVICES INCLUDING THOSE LISTED IN THE
                IMMEDIATELY PRECEDING PARAGRAPH.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                THE MAXIMUM LIABILITY OF THE INDEMNIFIED PARTIES TO YOU UNDER
                ALL CIRCUMSTANCES FOR ALL LOSSES NEVER EXCEEDS THE AMOUNT PAID
                BY YOU, IF ANY, FOR ACCESSING OUR SERVICES OR $100, WHICHEVER IS
                GREATER. IF ANY PORTION OF THIS LIMITATION OF LIABILITY IS FOUND
                TO BE INVALID, LIABILITY IS LIMITED TO THE FULLEST EXTENT
                PERMITTED BY LAW. YOU AGREE THAT THIS LIMITATION OF LIABILITY
                REPRESENTS A REASONABLE ALLOCATION OF RISK AND IS A FUNDAMENTAL
                ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN INCLUSIVE PLUS AND
                YOU AND THAT INCLUSIVE PLUS WOULD NOT PROVIDE THE SERVICES TO
                YOU WITHOUT SUCH LIMITATIONS.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                ANY CAUSE OF ACTION BY YOU ARISING OUT OF OR RELATING TO THE
                SERVICES, OR THESE TERMS OF USE MUST BE INSTITUTED WITHIN ONE
                (1) YEAR AFTER THE CAUSE OF ACTION AROSE OR BE FOREVER WAIVED
                AND BARRED. ALL ACTIONS SHALL BE SUBJECT TO THE LIMITATIONS SET
                FORTH IN THESE TERMS OF USE.
              </Typography>
            </HeaderCom>
            <HeaderCom title="20. Indemnification">
              <Typography component="p" sx={STYLES.paragraph}>
                You shall indemnify, defend, and hold harmless the Indemnified
                Parties from and against any claims, damages, losses, costs,
                liabilities, expenses, and causes of action (whether in
                contract, tort (including, without limitation, negligence), or
                otherwise) (including, without limitation, reasonable attorney's
                fees) (collectively, “Losses”) relating to or arising out of
                your use of or inability to use our Services, your violation of
                any Terms of Use, your violation of any rights of a third party,
                or your violation of any applicable laws, rules, or regulations,
                or any matter specified in Section 19. Inclusive Plus reserves
                the right, at its own cost, to assume the exclusive defense and
                control of any matter otherwise subject to indemnification by
                you, in which event you shall fully cooperate with Inclusive
                Plus in asserting any available defenses.
              </Typography>
            </HeaderCom>

            <HeaderCom title="21. Governing Law">
              <Typography component="p" sx={STYLES.paragraph}>
                These Terms of Use are governed by and construed in accordance
                with the laws of the United States of America and the State of
                Delaware, without regard to its conflicts of law provisions. Use
                of our Services is unauthorized in any jurisdiction that does
                not give effect to all provisions of these Terms of Use.
              </Typography>
            </HeaderCom>
            <HeaderCom title="22. Arbitration">
              <Typography component="p" sx={STYLES.paragraph}>
                For any dispute with Inclusive Plus, you shall first contact us
                directly to attempt to resolve the dispute with us informally.
              </Typography>
              <Typography component="p" sx={STYLES.paragraph}>
                In the event that you and Inclusive Plus are not able to resolve
                any dispute arising out of or concerning these Terms of Use or
                our Services whether in contract, tort, or otherwise at law or
                in equity for damages or any other relief, then such dispute is
                resolved only by final and binding arbitration pursuant to the
                Federal Arbitration Act, conducted by a single neutral
                arbitrator, and administered by the American Arbitration
                Association, or a similar arbitration service selected by the
                parties, in New York, New York, or virtually if the parties
                mutually agree as to the virtual format and the virtual JAMS
                venue where such arbitration is to take place, and you shall
                submit to such procedure. The arbitrator’s award is final, and
                judgment may be entered upon it in any court having
                jurisdiction. The losing party shall reimburse the prevailing
                party for its costs and reasonable attorney’s fees.
              </Typography>
            </HeaderCom>

            <HeaderCom title="23. Class Action and Jury Trial Waiver ">
              <Typography component="p" sx={STYLES.paragraph}>
                WITH RESPECT TO ALL PERSONS AND ENTITIES, ALL CLAIMS MUST BE
                BROUGHT IN THE PARTIES’ INDIVIDUAL CAPACITY AND NOT AS A
                PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION,
                COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER
                REPRESENTATIVE PROCEEDING. THIS WAIVER APPLIES TO CLASS
                ARBITRATION, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY
                NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS. YOU AGREE THAT,
                BY ENTERING INTO THESE TERMS OF USE, YOU AND INCLUSIVE PLUS ARE
                EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A
                CLASS ACTION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL
                ACTION, OR OTHER REPRESENTATIVE PROCEEDING OF ANY KIND.
              </Typography>
            </HeaderCom>
            <HeaderCom title="24. Assignment">
              <Typography component="p" sx={STYLES.paragraph}>
                You shall not transfer, delegate, or assign these Terms of Use,
                or any rights or licenses granted hereunder. Inclusive Plus may
                transfer, delegate, or assign these Terms of Use and any rights
                and licenses granted hereunder in its sole discretion. Any
                attempted transfer, delegation, or assignment in violation
                hereof is null and void.
              </Typography>
            </HeaderCom>

            <HeaderCom title="25. Severability">
              <Typography component="p" sx={STYLES.paragraph}>
                Except as otherwise provided herein, if any provision of these
                Terms of Use is found to be invalid, the invalidity of such
                provision does not affect the validity of the remaining
                provisions of these Terms of Use, which remain in full force and
                effect.
              </Typography>
            </HeaderCom>

            <HeaderCom title="26. Headings and Interpretation">
              <Typography component="p" sx={STYLES.paragraph}>
                The Section headings used herein are for convenience only and
                are of no legal force or effect.
              </Typography>
            </HeaderCom>
            <HeaderCom title="27. Entire Agreement">
              <Typography component="p" sx={STYLES.paragraph}>
                These Terms of Use, together with the Enterprise Agreement with
                respect to Enterprise Users, constitute the entire agreement
                between the User and Inclusive Plus with respect to our
                Services, and it supersedes all prior or contemporaneous
                communications and proposals, whether electronic, oral, or
                written, between the User and Inclusive Plus with respect to our
                Services. A printed version of this agreement and of any notice
                given in electronic form is admissible in judicial or
                administrative proceedings to the same extent and subject to the
                same conditions as other business documents and records
                originally generated and maintained in printed form.
              </Typography>
            </HeaderCom>
            <HeaderCom title="28. Termination">
              <Typography component="p" sx={STYLES.paragraph}>
                You may terminate these Terms of Use by discontinuing your use
                of all parts of our Services. Inclusive Plus may, in its sole
                discretion and without prior notice, immediately terminate your
                User Account and access to all or any part of our Services.
                Inclusive Plus is not liable to you or any third party for any
                termination of your User Account or access to the Services.
              </Typography>
            </HeaderCom>
            <HeaderCom title="29. Violations of These Terms of Use; Waiver ">
              <Typography component="p" sx={STYLES.paragraph}>
                Please report any violations of the Terms of Use to Inclusive
                Plus. Upon receiving such a report of a possible violation,
                Inclusive Plus in its sole discretion may investigate the matter
                and take such action as Inclusive Plus determines to be
                appropriate. No waiver by you or Inclusive Plus of any breach,
                default, or failure to exercise any right allowed under these
                Terms of Use constitutes a waiver of any preceding or subsequent
                breach, default, waiver, or forfeiture of any similar or future
                rights under these Terms of Use. As such, Inclusive Plus’s
                failure to exercise or enforce any right or provision of these
                Terms of Use does not constitute a waiver of such right or
                provision, and Inclusive Plus may at any time choose to take an
                action that it is permitted or legally entitled to take, even if
                Inclusive Plus has not taken such an action in the past in a
                same or similar situation.
              </Typography>
            </HeaderCom>
            <HeaderCom title="30. California Residents ">
              <Typography component="p" sx={STYLES.paragraph}>
                The provider of services is Inclusive Plus Inc. If you are a
                California resident, in accordance with Cal. Civ. Code §1789.3,
                you may report complaints to the Complaint Assistance Unit of
                the Division of Consumer Services of the California Department
                of Consumer Affairs by contacting them in writing at 1625 North
                Market Blvd., Suite N 112 Sacramento, CA 95834, or by telephone
                at (800) 952-5210 (California residents only) or (916) 445-1254
                (Sacramento area/out of state).
              </Typography>
            </HeaderCom>
            <HeaderCom title="31. Apple-Specific Terms">
              <Typography component="p" sx={STYLES.paragraph}>
                In addition to your agreement with the foregoing terms and
                conditions, and notwithstanding anything to the contrary herein,
                the following provisions apply with respect to your use of any
                version of any App that is compatible with the iOS operating
                system of Apple Inc. (“Apple”), if and when made available by
                the Company. Apple is not a party to these Terms of Use and does
                not own and is not responsible for the App(s). Apple is not
                providing any warranty for the App(s) except, if applicable, to
                refund the purchase price for it. Apple is not responsible for
                maintenance or other support services for the App(s) and shall
                not be responsible for any other claims, losses, liabilities,
                damages, costs, or expenses with respect to the App(s),
                including any third-party product liability claims, claims that
                the App(s) fails to conform to any applicable legal or
                regulatory requirement, claims arising under consumer protection
                or similar legislation, and claims with respect to intellectual
                property infringement. Any inquiries or complaints relating to
                the use of the App(s), including those pertaining to
                intellectual property rights, must be directed to Inclusive Plus
                pursuant to the contact information provided below. The license
                you have been granted herein is limited to a non-transferable
                license to use the App(s) on an Apple-branded product that runs
                Apple’s iOS operating system and is owned or controlled by you,
                or as otherwise permitted by the Usage Rules set forth in
                Apple’s App Store Terms of Service. In addition, you must comply
                with the terms of any third-party agreement applicable to you
                when using the App(s), such as your wireless data service
                agreement. Apple and Apple’s subsidiaries are third-party
                beneficiaries of these Terms of Use and, upon your acceptance of
                the terms and conditions of these Terms of Use, will have the
                right (and will be deemed to have accepted the right) to enforce
                these Terms of Use against you as a third-party beneficiary
                thereof; notwithstanding the foregoing, Inclusive Plus’s right
                to enter into, rescind or terminate any variation, waiver or
                settlement under these Terms of Use is not subject to the
                consent of any third party.
              </Typography>
            </HeaderCom>
            <HeaderCom title="32. Contact Information ">
              <Typography component="p" sx={STYLES.paragraph}>
                If you have any questions or comments about our Terms of Use or
                the Services, or if you believe that Inclusive Plus has not
                adhered to our Terms of Use, please contact Inclusive Plus by
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
  );
}

export default TermsAndConditionsPage;
