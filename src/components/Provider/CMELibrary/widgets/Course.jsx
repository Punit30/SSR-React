import { Box, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { RESOURCE_FORMAT_LIST } from "../../../../Constants/data-types/cme-formats"
import _ from "lodash"
import { FiCheck, FiLoader, FiPlay } from "react-icons/fi"
import { IoPlay } from "react-icons/io5"

const STYLES = {
	completed: {
		backgroundColor: "#EAFEEF",
		color: "#28A745",
	},
	onGoing: {
		backgroundColor: "#FFF8EA",
		color: "#E8930B",
	},
	notStarted: {
		backgroundColor: "#EAEBF2",
		color: "#717385",
	},
}

const STATUS = {
	COMPLETED: { label: "Completed", icon: <FiCheck size="14px" />, colorClass: STYLES.completed },
	IN_PROGRESS: { label: "On going", icon: <IoPlay size="14px" />, colorClass: STYLES.onGoing },
	YET_TO_ATTEMPT: { label: "Not started", icon: <FiLoader size="14px" />, colorClass: STYLES.notStarted },
}

function Course({ cmeCourse }) {
	const navigate = useNavigate()

	return (
		<Box
			onClick={() => navigate(`/dashboard/provider/cme-library/view/${cmeCourse.id}`)}
			className="f g24 align-start justify-s-b cursor-pointer"
			sx={{
				":hover": {
					backgroundColor: "#F9F9FB",
				},
			}}
			padding={{ xs: "10px 16px", sm: "10px 24px" }}
		>
			<Box className="f g16" maxWidth="600px">
				<Typography fontSize="20px" color="#814CD6" lineHeight="20px">
					{RESOURCE_FORMAT_LIST[cmeCourse.cmeCourseFormat]}
				</Typography>
				<Box className="f f-c g4">
					<Typography
						color="#1B1C20"
						fontSize="14px"
						fontWeight="500"
						lineHeight="20px"
						textTransform="capitalize"
					>
						{cmeCourse.title}
					</Typography>
					<Box className="f f-c g6">
						<Typography
							color="#9A9CB0"
							fontSize="12px"
							fontWeight="500"
							lineHeight="18px"
							textTransform="capitalize"
						>
							{cmeCourse.description}
						</Typography>
						<Box className="f flex-wrap g4">
							<Typography
								noWrap
								className="f align-center justify-center b-r6"
								width="fit-content"
								padding="2px 8px"
								sx={{ backgroundColor: "#F2EDFC" }}
								color="#814CD6"
								fontSize="12px"
								fontWeight="500"
								lineHeight="18px"
							>
								{cmeCourse.credits} Credit
							</Typography>
							{cmeCourse.providerCourse.isStateRequired ? (
								<Typography
									noWrap
									className="f align-center justify-center b-r6"
									width="fit-content"
									padding="2px 8px"
									sx={{ backgroundColor: "#eafeef" }}
									color="#28a745"
									fontSize="12px"
									fontWeight="500"
									lineHeight="18px"
								>
									State required
								</Typography>
							) : null}
							{_.map(cmeCourse.topics, (topic, index) => (
								<Typography
									key={index}
									className="f align-center justify-center b-r6"
									width="fit-content"
									padding="2px 8px"
									sx={{ backgroundColor: "#EAEBF2" }}
									color="#717385"
									fontSize="12px"
									fontWeight="500"
									lineHeight="18px"
									textTransform="capitalize"
								>
									{topic}
								</Typography>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className="f f-c justify-end g10">
				<Typography
					noWrap
					className="f g2 align-center justify-center b-r6"
					width="fit-content"
					padding="2px 8px"
					sx={STATUS[cmeCourse.providerCourse?.cmeCourseStatus].colorClass}
					fontSize="12px"
					fontWeight="500"
					lineHeight="20px"
				>
					{STATUS[cmeCourse.providerCourse?.cmeCourseStatus].icon}{" "}
					{STATUS[cmeCourse.providerCourse?.cmeCourseStatus].label}
				</Typography>
			</Box>
		</Box>
	)
}

export default Course
