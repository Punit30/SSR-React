import { makeColor } from "../../../utilities/Button"

export const STYLES = {
	breadcrumb: {
		link: {
			color: "#667085",
			fontSize: "14px",
			fontWeight: "400",
			lineHeight: "20px",
			letterSpacing: "0.28px",
			textDecoration: "none",
			":hover": {
				textDecoration: "underline",
			},
		},
	},
	button: {
		fontSize: "12px",
		fontWeight: "500",
		lineHeight: "18px",
		padding: "6px 12px",
		...makeColor({
			bgColor: "transparent",
			bgHoverColor: "#fff",
			borderColor: "#fff",
			borderHoverColor: "#fff",
			color: "#fff",
			colorHover: "#814CD6",
			shadowColor: "none",
			disbabledBgColor: "transparent",
			disabledBorderColor: "#B1B3C4",
			disabledColor: "#B1B3C4",
		}),
	},
	boxIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "8px",
		backgroundColor: "ECE4FB",
		fontSize: "16px",
		color: "#814cd6",
		minWidth: "32px",
		minHeight: "32px",
		maxWidth: "32px",
		maxHeight: "32px",
		border: "1px solid #ECE4FB",
	},
	jointProviderShip: {
		header: {
			color: "#717385",
			fontSize: "14px",
			fontWeight: "600",
			lineHeight: "20px",
		},
		description: {
			color: "#717385",
			fontSize: "14px",
			fontWeight: "400",
			lineHeight: "20px",
		},
	},
}

export const MAPPER_STYLES = {
	keyInfo: {
		details: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "6px",
		},
		text: {
			color: "#1B1C20",
			fontSize: "12px",
			fontWeight: "500",
			lineHeight: "18px",
		},
		tags: {
			display: "flex",
			padding: "2px 8px",
			justifyContent: "center",
			alignItems: "center",
			gap: "4px",
			borderRadius: "6px",
			background: "#F5F7FA",
			color: "#717385",
			fontSize: "12px",
			fontWeight: "500",
			lineHeight: "18px",
		},
	},
}

export const DATA_VALUES = {
	id: null,
	isJointProvider: false,
	title: "",
	description: "",
	credit: "",
	creditType: [],
	publishDate: "",
	expirationDate: "",
	courseFormat: "",
	courseType: "LINK",
	tags: [],
	specialty: [],
	topics: [],
	state: [],
	overview: "",
	feedbackLink: "",
	file: "",
	cmeCourseLink: "",
}
