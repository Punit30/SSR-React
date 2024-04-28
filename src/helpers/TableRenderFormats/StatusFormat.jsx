import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { BiTimeFive } from "react-icons/bi"
import { FiCheck, FiSlash } from "react-icons/fi"

const useStyles = makeStyles({
	tag: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "4px 12px",
		gap: "4px",
		borderRadius: "4px",
		textAlign: "center",
		fontWeight: "500 !important",
		fontSize: "12px !important",
		lineHeight: "20px !important",
	},
	purple: {
		color: "#814cd6",
		background: "#f2edfc",
	},
	red: {
		background: "#fff1f3",
		color: "#ef4444",
	},
	yellow: {
		background: "#fff8ea",
		color: "#e8930b",
	},
	green: {
		background: "#eafeef",
		color: "#14882f",
	},
	listText: {
		textTransform: "capitalize",
		whiteSpace: "pre-wrap",
		wordWrap: "break-word",
		textAlign: "initial !important",
	},
})

export const DirectoryStatusFormat = (props) => {
	const classes = useStyles()

	const STATUS =
		props.value === "ONBOARDED"
			? { icon: FiCheck, title: "Onboarded", colorClass: classes.green }
			: props.value === "PENDING" ||
			  props.value === "VERIFIED" ||
			  props.value === "APPROVED" ||
			  props.value === "REGISTERED"
			? { icon: BiTimeFive, title: "In progress", colorClass: classes.yellow }
			: { icon: FiSlash, title: "Rejected", colorClass: classes.red }

	return (
		<Typography className={`${classes.tag} ${STATUS.colorClass} ${classes.tagText}`}>
			<STATUS.icon size="16px" />
			{STATUS.title}
		</Typography>
	)
}

export const ProfileStatusFormat = (props) => {
	const classes = useStyles()

	const colorClass = props.value === "Yes" ? classes.green : classes.red

	return <Typography className={`${classes.tag} ${colorClass} ${classes.tagText}`}>{props.value}</Typography>
}

export const ListFormat = (props) => {
	const classes = useStyles()

	return (
		<Box className="f flex-wrap g6">
			{props.value.length !== 0 ? (
				props.value.map((item, index) => {
					return (
						<Typography className={`${classes.tag} ${classes.purple} ${classes.listText}`} key={index}>
							{item}
						</Typography>
					)
				})
			) : (
				<Typography fontWeight="500" fontSize="12px" lineHeight="20px" color="#717385">
					-
				</Typography>
			)}
		</Box>
	)
}
