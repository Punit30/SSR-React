import { FiFileText, FiLink, FiVideo, FiVolume1 } from "react-icons/fi"

export const FILE_TYPES = [
	{ value: "LINK", label: "Link" },
	{ value: "AUDIO", label: "Audio" },
	{ value: "VIDEO", label: "Video" },
	{ value: "DOCUMENT", label: "Document" },
]

export const RESOURCE_FORMAT_TYPE = [
	{ value: "INTERACTIVE_MULTI_MEDIA", label: "Interactive multi media" },
	{ value: "JOURNAL_ARTICLE", label: "Journal article" },
	{ value: "PODCASTS", label: "Podcasts" },
	{ value: "AUDIO_CONTENT", label: "Audio content" },
	{ value: "VIDEO_RECORDINGS", label: "Video recordings" },
]

export const CREDIT_LIST = [
	{ value: "0.00", label: "0.00" },
	{ value: "0.25", label: "0.25" },
	{ value: "0.50", label: "0.50" },
	{ value: "0.75", label: "0.75" },
	{ value: "1.00", label: "1.00" },
	{ value: "1.25", label: "1.25" },
	{ value: "1.50", label: "1.50" },
	{ value: "1.75", label: "1.75" },
	{ value: "2.00", label: "2.00" },
	{ value: "2.25", label: "2.25" },
	{ value: "2.50", label: "2.50" },
]

export const FORMAT_LIST = {
	"Interactive multi-media": "INTERACTIVE_MULTI_MEDIA",
	"Journal articles": "JOURNAL_ARTICLE",
	Podcasts: "PODCASTS",
	"Audio content": "AUDIO_CONTENT",
	"Video Recordings": "VIDEO_RECORDINGS",
}

export const RESOURCE_FORMAT_LIST = {
	INTERACTIVE_MULTI_MEDIA: <FiLink />,
	JOURNAL_ARTICLE: <FiFileText />,
	VIDEO_RECORDINGS: <FiVideo />,
	PODCASTS: <FiVolume1 />,
	AUDIO_CONTENT: <FiVolume1 />,
}

// export const CME_RATING = {
// 	"Very satisfied": "VERY_SATISFIED",
// 	Satisfied: "SATISFIED",
// 	Neutral: "NEUTRAL",
// 	Dissatisfied: "DISSATISFIED",
// 	"Very dissatisfied": "VERY_DISSATISFIED",
// }

export const CME_RATING_LIST = [
	{ value: "VERY_SATISFIED", label: "Very Satisfied" },
	{ value: "SATISFIED", label: "Satisfied" },
	{ value: "NEUTRAL", label: "Neutral" },
	{ value: "DISSATISFIED", label: "Dissatisfied" },
	{ value: "VERY_DISSATISFIED", label: "Very Dissatisfied" },
]

export const CREDIT_TYPES = [
	{ value: "AMA PRA Category 1", label: "AMA PRA Category 1" },
	{ value: "Psychology", label: "Psychology" },
	{ value: "Social Work", label: "Social Work" },
	{ value: "Pharmacy", label: "Pharmacy" },
	{ value: "Nursing", label: "Nursing" },
	{ value: "Dietitian", label: "Dietitian" },
	{ value: "Physical Therapy or Occupational Therapy", label: "Physical Therapy or Occupational Therapy" },
	{ value: "None", label: "None" },
]
