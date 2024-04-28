import { Box, IconButton, Typography } from "@mui/material"
import React from "react"
import { FiCheck, FiClock, FiHelpCircle, FiMinusCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const STYLES = {
	indexing: {
		display: "flex",
		alignCenter: "center",
		justifyContent: "center",
		padding: "2px 12px",
		borderRadius: "32px",
		border: "1px solid #814CD6",
		background: "#814CD6",
		color: "#FFF",
		fontSize: "12px",
		fontWeight: "500",
		lineHeight: "18px",
	},
	status: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "4px",
		padding: "4px 10px",
		fontSize: "14px",
		fontWeight: "500",
		lineHeight: "20px",
		borderRadius: "6px",
	},
	completed: {
		background: "#eafeef",
		color: "#14882f",
	},
	pending: {
		color: "#e8930b",
		background: "#fff8ea",
	},
	disabled: {
		background: "#eaebf2",
		color: "#717385",
	},
}

const STATUS = {
	pending: {
		sx: STYLES.pending,
		icon: <FiClock size="14px" />,
		label: "Pending",
	},
	disabled: {
		sx: STYLES.disabled,
		icon: <FiMinusCircle size="14px" />,
		label: "Disabled",
	},
	completed: {
		sx: STYLES.completed,
		icon: <FiCheck size="14px" />,
		label: "Completed",
	},
}

function TodoCard({ task, index, openHelpModal = () => {}, setHelpText = () => {} }) {
	const navigate = useNavigate()
	const status = STATUS[task.status.toLowerCase()]

	return (
		<Box
			onClick={() =>
				navigate(task.redirectionLink !== null && task.status === "PENDING" ? task.redirectionLink : "#")
			}
			maxWidth="924px"
			className="f f-c g16 p16 b-r12"
			border="1px solid #EAEBF2"
			sx={{
				textDecoration: "none",
				backgroundColor: "#FFF",
				":hover": {
					borderColor: task.status === "PENDING" ? "#814cd6" : "#EAEBF2",
					cursor: task.status === "PENDING" ? "pointer" : "auto",
				},
			}}
		>
			<Box className="f align-center justify-s-b">
				{task.isOptional ? (
					<Box className="f align-center g2">
						<Typography sx={STYLES.indexing}>Optional</Typography>
						<IconButton
							id="help_modal"
							className="track_button"
							sx={{ padding: "4px", borderRadius: "50%" }}
							onClick={(e) => {
								e.stopPropagation()
								setHelpText(task.helperText)
								openHelpModal()
							}}
						>
							<FiHelpCircle size="20px" />
						</IconButton>
					</Box>
				) : (
					<Typography sx={STYLES.indexing}>Step {index + 1}</Typography>
				)}
				<Box className="f align-center g8">
					<Typography sx={{ ...STYLES.status, ...status.sx }}>
						{status.icon}
						{status.label}
					</Typography>
				</Box>
			</Box>
			<Box className="f f-c">
				<Typography color="#1B1C20" fontSize="14px" fontWeight="500" lineHeight="20px">
					{task.taskName}
				</Typography>
				<Typography color="#9A9CB0" fontSize="14px" fontWeight="400" lineHeight="20px">
					{task.description}
				</Typography>
			</Box>
		</Box>
	)
}

export default TodoCard
