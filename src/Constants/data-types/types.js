export const USER_TYPES = [
	{ value: "patient", label: "Patient" },
	{ value: "provider", label: "Provider" },
	{ value: "medical groups", label: "Medical Groups" },
	{ value: "investor", label: "Investor" },
	{ value: "employer", label: "Employer" },
	{ value: "payer", label: "Payer" },
]

export const ISSUE_TYPES = [
	{ value: "technical issue", label: "Technical issue" },
	{ value: "content issue", label: "Content issue" },
	{ value: "feedback / feature request", label: "Feedback / Feature request" },
	{ value: "other support", label: "Other support" },
]

// provider events if event os onboarded or pending user get redirected to dashboard or else get redirected to signup
export const PROFILE_EVENTS = {
	REGISTERED: 1, // redirect to otp_verification page
	OTP_VERIFIED: 2, // redirect to educational page
	QUALIFIED: 4, // redirect to baseline info page
	LICENSE_APPROVED: 4, // redirect to baseline info page
	LICENSE_SUSPENDED: 4, // redirect to baseline info page
	LICENSE_REJECTED: 4, // redirect to baseline info page
	BACKGROUND_INFORMATION_SUBMITTED: 5, // redirect to quiz page
	QUIZ_PENDING: 5, // redirect to quiz page
}