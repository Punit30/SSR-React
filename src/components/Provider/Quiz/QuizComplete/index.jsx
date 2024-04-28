import { Box, Typography } from "@mui/material"
import React from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { IoCheckmarkCircle } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetLayout } from "../../../../app/GlobalObjects/store/reducers/Layout"
import { resetQuiz } from "../../../../app/GlobalObjects/store/reducers/provider/Quiz"
import HelpModalButton from "../../../common/HelpModalButton"
import Button from "../../../utilities/Button"

function QuizComplete(props) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<Box className="f f-c g12 justify-s-b h100" padding={{ xs: "0px 16px", sm: "0px 24px", md: "60px 54px 20px" }}>
			<Box className="f f-c g12 justify-center h100" maxWidth="512px" alignItems={{ xs: "center", sm: "start" }}>
				<IoCheckmarkCircle size="40px" color="#28A745" />
				<Typography
					textAlign={{ xs: "center", sm: "start" }}
					fontFamily="Poppins"
					fontWeight="600"
					fontSize={{ xs: "24px", md: "32px" }}
					lineHeight={{ xs: "32px", md: "44px" }}
					color="#1b1c20"
				>
					Assessment submitted
				</Typography>
				<Button
					id="schedule_interview_call"
					className="track_button"
					type="button"
					variant="contained"
					color="purple"
					onClick={() => {
						if (props.isParentVettedProvider) {
							navigate("/provider/vetting/interview")
						} else {
							navigate("/login")
						}

						dispatch(resetLayout())
						dispatch(resetQuiz())
					}}
				>
					{props.isParentVettedProvider ? "Schedule interview" : "Go to your dashboard"}{" "}
					<FiArrowUpRight size="18px" />
				</Button>
			</Box>
			<Box className="justify-end" display={{ xs: "none", sm: "none", md: "flex" }}>
				<HelpModalButton />
			</Box>
		</Box>
	)
}

export default QuizComplete
