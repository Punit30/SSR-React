import { FiCheck, FiLoader } from "react-icons/fi"
import { IoPlay } from "react-icons/io5"
import { makeColor } from "../../../utilities/Button"

export const STYLES = {
	completed: {
		color: "#28A745",
	},
	onGoing: {
		color: "#E8930B",
	},
	notStarted: {
		color: "#717385",
	},
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
			bgColor: "#FFF",
			bgHoverColor: "#eaebf2",
			borderColor: "#FFF",
			borderHoverColor: "#eaebf2",
			color: "#814CD6",
			colorHover: "#814CD6",
			shadowColor: "#eaebf2",
			disbabledBgColor: "#B1B3C4",
			disabledBorderColor: "#B1B3C4",
			disabledColor: "#fff",
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
	status: "YET_TO_ATTEMPT",
}

export const STATUS = {
	COMPLETED: { label: "Completed", icon: <FiCheck size="14px" />, colorClass: STYLES.completed },
	IN_PROGRESS: { label: "On going", icon: <IoPlay size="14px" />, colorClass: STYLES.onGoing },
	YET_TO_ATTEMPT: { label: "Not started", icon: <FiLoader size="14px" />, colorClass: STYLES.notStarted },
}
