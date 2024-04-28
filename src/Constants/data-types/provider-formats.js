export const VETTED_TAGS = [
	{ value: false, label: "Non-vetted" },
	{ value: true, label: "Vetted" },
]

export const DIRECTORY_OPTIONS = [
	{ value: "ONBOARDED", label: "On-boarded" },
	{ value: "PENDING", label: "In-progress" },
	{ value: "REJECTED", label: "Rejected" },
	{ value: "SUSPENDED", label: "Suspended" },
]

export const INTERVIEW_OPTIONS = [
	{ value: "INTERVIEW_PENDING", label: "Pending" },
	{ value: "INTERVIEW_CLEARED", label: "Passed" },
	{ value: "INTERVIEW_FAILED", label: "Failed" },
]

export const STATUS_TAGS = [
	{
		value: "APPROVED",
		label: "Approved",
		backgroundColor: "#EAFEEF",
		fontColor: "#14882F",
	},
	{
		value: "PENDING",
		label: "Pending approval",
		backgroundColor: "#FFF8EA",
		fontColor: "#E8930B",
	},
	{
		value: "REJECTED",
		label: "Rejected",
		backgroundColor: "#FFF1F3",
		fontColor: "#DC2626",
	},
]

export const IS_LGBTQIA_OPTIONS = {
	Yes: "YES",
	No: "NO",
	"I prefer not to answer": "PREFER_NOT_TO_ANSWER",
}

export const NOTABLE_EEXPERIENCE_OPTIONS = [
	"Involvement in LGBTQIA+ research",
	"Over 50% of your patients identify as LGBTQIA+",
	"Membership: WPATH/GLMA/AGLP",
	"Participation in LGBTQIA+ advocacy work",
]

export const KNOWLEDGE_LEVEL_OPTIONS = {
	"No knowledge": "NO_KNOWLEDGE",
	"Minimal knowledge": "MINIMAL_KNOWLEDGE",
	"Basic knowledge": "BASIC_KNOWLEDGE",
	"Adequate knowledge": "ADEQUATE_KNOWLEDGE",
	"Superior knowledge": "SUPERIOR_KNOWLEDGE",
}

export const CONFIDENCE_LEVEL_OPTIONS = {
	"Not confident at all": "NOT_CONFIDENT_AT_ALL",
	"Slightly confident": "SLIGHTLY_CONFIDENT",
	"Somewhat confident": "SOMEWHAT_CONFIDENT",
	"Fairly confident": "FAIRLY_CONFIDENT",
	"Completely confident": "COMPLETELY_CONFIDENT",
}

export const PRACTICE_YEARS_OPTIONS = {
	"0-5 years": "YEARS_0_5",
	"6-10 years": "YEARS_6_10",
	"11-20 years": "YEARS_11_20",
	"21-30 years": "YEARS_21_30",
	"31+ years": "YEARS_31_PLUS",
}
export const AGE_GROUP_OPTIONS = {
	"18-30 years old": "YEARS_18_30",
	"31-40 years old": "YEARS_31_40",
	"41-50 years old": "YEARS_41_50",
	"51-60 years old": "YEARS_51_60",
	"61+ years old": "YEARS_61_PLUS",
}

export const RACE_OPTIONS = {
	White: "WHITE",
	"Hispanic Or Latino": "HISPANIC_OR_LATINO",
	Black: "BLACK",
	Asian: "ASIAN",
	"American Indian Or Alaska Native": "AMERICAN_INDIAN_OR_ALASKA_NATIVE",
	"Middle Eastern Or North African": "MIDDLE_EASTERN_OR_NORTH_AFRICAN",
	"Native Hawaiian Or Pacific Islander": "NATIVE_HAWAIIAN_OR_PACIFIC_ISLANDER",
}
